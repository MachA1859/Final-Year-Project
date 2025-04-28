import { NextResponse } from 'next/server';
import * as tf from '@tensorflow/tfjs';
import fs from 'fs';
import path from 'path';

// Feature engineering functions
const normalizeAmount = (amount: number) => {
  // Log scale for amounts to handle large variations
  return Math.log10(Math.abs(amount) + 1) / 5; // Normalize to 0-1 range
};

const normalizeHour = (hour: number) => {
  // Convert hour to circular coordinates (sin and cos)
  const radians = (hour / 24) * 2 * Math.PI;
  return [Math.sin(radians), Math.cos(radians)];
};

// Create an enhanced MLP model
const createModel = () => {
  // Clear any existing models to prevent variable name conflicts
  tf.disposeVariables();
  
  const model = tf.sequential();

  // Input layer (3 features: normalized amount, sin(hour), cos(hour))
  model.add(tf.layers.dense({ 
    inputShape: [3], 
    units: 32, 
    activation: 'relu',
    kernelRegularizer: tf.regularizers.l2({ l2: 0.01 }),
    name: 'input_layer'
  }));
  
  // Hidden layers with dropout for regularization
  model.add(tf.layers.dropout({ rate: 0.2, name: 'dropout1' }));
  model.add(tf.layers.dense({ 
    units: 16, 
    activation: 'relu',
    kernelRegularizer: tf.regularizers.l2({ l2: 0.01 }),
    name: 'hidden1'
  }));
  
  model.add(tf.layers.dropout({ rate: 0.1, name: 'dropout2' }));
  model.add(tf.layers.dense({ 
    units: 8, 
    activation: 'relu',
    kernelRegularizer: tf.regularizers.l2({ l2: 0.01 }),
    name: 'hidden2'
  }));
  
  // Output layer with sigmoid activation
  model.add(tf.layers.dense({ 
    units: 1, 
    activation: 'sigmoid',
    name: 'output'
  }));

  model.compile({
    optimizer: tf.train.adam(0.001),
    loss: 'binaryCrossentropy',
    metrics: ['accuracy']
  });

  return model;
};

// Generate training data
const generateTrainingData = () => {
  const normalTransactions = [];
  const suspiciousTransactions = [];

  // Generate normal transactions (business hours, reasonable amounts)
  for (let i = 0; i < 1000; i++) {
    const hour = Math.floor(Math.random() * 8) + 9; // 9 AM - 5 PM
    const amount = Math.random() * 1000; // Up to $1000
    normalTransactions.push({
      features: [normalizeAmount(amount), ...normalizeHour(hour)],
      label: 0
    });
  }

  // Generate suspicious transactions (late night or very large amounts)
  for (let i = 0; i < 1000; i++) {
    const isLateNight = Math.random() > 0.5;
    const hour = isLateNight ? Math.floor(Math.random() * 6) + 22 : // 10 PM - 4 AM
                Math.floor(Math.random() * 8) + 9; // 9 AM - 5 PM
    const amount = isLateNight ? Math.random() * 1000 : // Normal amounts at night
                   Math.random() * 5000 + 1000; // Large amounts during day
    suspiciousTransactions.push({
      features: [normalizeAmount(amount), ...normalizeHour(hour)],
      label: 1
    });
  }

  // Combine and shuffle data
  const allData = [...normalTransactions, ...suspiciousTransactions];
  for (let i = allData.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allData[i], allData[j]] = [allData[j], allData[i]];
  }

  return {
    features: allData.map(d => d.features),
    labels: allData.map(d => d.label)
  };
};

// Train the model
const trainModel = async (model: tf.LayersModel) => {
  const { features, labels } = generateTrainingData();
  
  const xs = tf.tensor2d(features);
  const ys = tf.tensor2d(labels, [labels.length, 1]);

  await model.fit(xs, ys, {
    epochs: 50,
    batchSize: 32,
    validationSplit: 0.2,
    callbacks: {
      onEpochEnd: (epoch, logs) => {
        console.log(`Epoch ${epoch}: loss = ${logs?.loss}`);
      }
    }
  });

  // Clean up tensors
  xs.dispose();
  ys.dispose();
};

// Load or create model
let model: tf.LayersModel | null = null;
const MODEL_PATH = path.join(process.cwd(), 'public', 'model.json');

const getModel = async () => {
  if (model) return model;
  
  try {
    // Ensure public directory exists
    const publicDir = path.join(process.cwd(), 'public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    // Try to load existing model
    console.log('Attempting to load model from:', MODEL_PATH);
    const modelJson = fs.readFileSync(MODEL_PATH, 'utf8');
    const modelArtifacts = JSON.parse(modelJson);
    model = await tf.loadLayersModel(tf.io.fromMemory(modelArtifacts));
    console.log('Successfully loaded existing model');
  } catch (error) {
    console.log('Failed to load model, creating new one:', error);
    // Create and train new model if none exists
    model = createModel();
    console.log('Created new model, starting training...');
    await trainModel(model);
    console.log('Training completed, saving model...');
    
    // Save model to file
    const modelArtifacts = await model.save(tf.io.withSaveHandler(async (artifacts) => {
      fs.writeFileSync(MODEL_PATH, JSON.stringify(artifacts));
      return {
        modelArtifactsInfo: {
          dateSaved: new Date(),
          modelTopologyType: 'JSON',
          modelTopologyBytes: new TextEncoder().encode(JSON.stringify(artifacts.modelTopology)).length,
          weightSpecsBytes: new TextEncoder().encode(JSON.stringify(artifacts.weightSpecs)).length,
          weightDataBytes: artifacts.weightData ? (Array.isArray(artifacts.weightData) ? 
            artifacts.weightData.reduce((acc, buf) => acc + buf.byteLength, 0) : 
            artifacts.weightData.byteLength) : 0
        }
      };
    }));
    
    console.log('Model saved successfully');
  }
  
  return model;
};

export async function POST(req: Request) {
  try {
    const { amount, hour } = await req.json();

    if (amount === undefined || hour === undefined) {
      return NextResponse.json(
        { error: 'Amount and Hour are required' },
        { status: 400 }
      );
    }

    // Get or create model
    const model = await getModel();

    // Prepare input features
    const normalizedAmount = normalizeAmount(amount);
    const [hourSin, hourCos] = normalizeHour(hour);
    
    console.log('Input values:', { amount, hour, normalizedAmount, hourSin, hourCos });
    
    const inputTensor = tf.tensor2d([[normalizedAmount, hourSin, hourCos]]);

    // Predict suspiciousness
    const prediction = model.predict(inputTensor) as tf.Tensor;
    const predictionArray = await prediction.array() as number[][];

    console.log('Raw prediction:', predictionArray);

    // Ensure the prediction is a valid number
    let suspiciousProbability = predictionArray[0][0] * 100;
    if (isNaN(suspiciousProbability)) {
      console.error('Invalid prediction value:', predictionArray[0][0]);
      suspiciousProbability = 0; // Default to 0 if prediction is invalid
    }

    // Clean up tensors
    inputTensor.dispose();
    prediction.dispose();

    return NextResponse.json({ 
      suspiciousProbability: suspiciousProbability.toFixed(2) 
    });
  } catch (error) {
    console.error('Error checking transaction:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 