import pandas as pd
import numpy as np
import torch
import torch.nn as nn
from torch.utils.data import Dataset, DataLoader
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
import json
import sys
import os
import matplotlib.pyplot as plt
from sklearn.metrics import accuracy_score

def setup_cuda():
    if not torch.cuda.is_available():
        print("CUDA is not available. Using CPU instead.")
        return torch.device('cpu')
    
    # Get CUDA device info
    cuda_device = torch.cuda.get_device_properties(0)
    print(f"Using CUDA device: {cuda_device.name}")
    print(f"CUDA Version: {torch.version.cuda}")
    print(f"CUDA Capability: {cuda_device.major}.{cuda_device.minor}")
    
    # Check for RTX 5090 with CUDA 12.0
    if cuda_device.major >= 12:  # RTX 5090 has CUDA capability 12.0
        print("\nWARNING: Your RTX 5090 GPU requires a newer version of PyTorch.")
        print("Please follow these steps to install the correct version:")
        print("\n1. First, uninstall current PyTorch:")
        print("pip uninstall torch torchvision torchaudio")
        print("\n2. Then install the nightly build with CUDA 12.1 support:")
        print("pip install --pre torch torchvision torchaudio --index-url https://download.pytorch.org/whl/nightly/cu121")
        print("\n3. Verify the installation:")
        print("python -c \"import torch; print(torch.cuda.is_available()); print(torch.version.cuda)\"")
        print("\nFor now, falling back to CPU training...")
        return torch.device('cpu')
    
    # Configure CUDA
    device = torch.device('cuda')
    torch.cuda.set_device(0)
    torch.backends.cudnn.benchmark = True
    
    return device

# Set device
device = setup_cuda()
print(f"\nUsing device: {device}")

# Define the neural network
class FraudDetectionModel(nn.Module):
    def __init__(self, input_size):
        super(FraudDetectionModel, self).__init__()
        self.network = nn.Sequential(
            nn.Linear(input_size, 64),
            nn.ReLU(),
            nn.Dropout(0.2),
            nn.Linear(64, 32),
            nn.ReLU(),
            nn.Dropout(0.2),
            nn.Linear(32, 1),
            nn.Sigmoid()
        )
    
    def forward(self, x):
        return self.network(x)

# Custom dataset class
class TransactionDataset(Dataset):
    def __init__(self, features, labels):
        self.features = torch.FloatTensor(features)
        self.labels = torch.FloatTensor(labels)
    
    def __len__(self):
        return len(self.features)
    
    def __getitem__(self, idx):
        return self.features[idx], self.labels[idx]

def load_and_preprocess_data():
    # Load the training data
    print("Loading Fraud24.csv...")
    df = pd.read_csv('Fraud24.csv')
    print(f"Loaded {len(df)} transactions")
    
    # Select features and target
    features = ['step', 'amount', 'oldbalanceOrg', 'newbalanceOrig', 'oldbalanceDest', 'newbalanceDest']
    X = df[features].values
    y = df['isFraud'].values
    
    print(f"Features shape: {X.shape}")
    print(f"Target shape: {y.shape}")
    
    # Scale the features
    scaler = StandardScaler()
    X = scaler.fit_transform(X)
    
    return X, y, scaler, features

def plot_training_metrics(train_losses, train_accuracies, test_accuracies, learning_rates):
    # Create figure with subplots
    fig, (ax1, ax2, ax3) = plt.subplots(3, 1, figsize=(10, 15))
    
    # Plot training loss
    ax1.plot(train_losses, label='Training Loss')
    ax1.set_title('Training Loss over Epochs')
    ax1.set_xlabel('Epoch')
    ax1.set_ylabel('Loss')
    ax1.legend()
    ax1.grid(True)
    
    # Plot accuracies
    ax2.plot(train_accuracies, label='Training Accuracy')
    ax2.plot(test_accuracies, label='Test Accuracy')
    ax2.set_title('Training and Test Accuracy over Epochs')
    ax2.set_xlabel('Epoch')
    ax2.set_ylabel('Accuracy (%)')
    ax2.legend()
    ax2.grid(True)
    
    # Plot learning rate
    ax3.plot(learning_rates, label='Learning Rate')
    ax3.set_title('Learning Rate over Epochs')
    ax3.set_xlabel('Epoch')
    ax3.set_ylabel('Learning Rate')
    ax3.legend()
    ax3.grid(True)
    
    # Adjust layout and save
    plt.tight_layout()
    plt.savefig('training_metrics.png')
    print("\nTraining metrics plot saved as 'training_metrics.png'")

def train_model(X, y):
    # Split the data
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    print(f"Training set size: {len(X_train)}")
    print(f"Test set size: {len(X_test)}")
    
    # Create datasets and dataloaders
    train_dataset = TransactionDataset(X_train, y_train)
    test_dataset = TransactionDataset(X_test, y_test)
    
    # Configure DataLoader
    train_loader = DataLoader(train_dataset, batch_size=64, shuffle=True, 
                            num_workers=0, pin_memory=True)
    test_loader = DataLoader(test_dataset, batch_size=64, shuffle=False,
                           num_workers=0, pin_memory=True)
    
    # Initialize model and move to device
    model = FraudDetectionModel(X.shape[1]).to(device)
    criterion = nn.BCELoss()
    optimizer = torch.optim.Adam(model.parameters(), lr=0.001)
    
    # Initialize lists to track metrics
    train_losses = []
    train_accuracies = []
    test_accuracies = []
    learning_rates = []
    
    # Training loop
    num_epochs = 10
    for epoch in range(num_epochs):
        model.train()
        total_loss = 0
        all_preds = []
        all_labels = []
        
        for batch_X, batch_y in train_loader:
            try:
                # Move data to device
                batch_X, batch_y = batch_X.to(device), batch_y.to(device)
                
                optimizer.zero_grad()
                outputs = model(batch_X)
                loss = criterion(outputs, batch_y.unsqueeze(1))
                loss.backward()
                optimizer.step()
                
                total_loss += loss.item()
                
                # Store predictions and labels
                preds = (outputs > 0.5).float()
                all_preds.extend(preds.cpu().numpy())
                all_labels.extend(batch_y.cpu().numpy())
                
            except RuntimeError as e:
                print(f"Error during training: {e}")
                print("\nPlease make sure you have installed the correct PyTorch version for your RTX 5090:")
                print("pip install --pre torch torchvision torchaudio --index-url https://download.pytorch.org/whl/nightly/cu121")
                sys.exit(1)
        
        # Calculate training metrics
        avg_loss = total_loss / len(train_loader)
        train_accuracy = accuracy_score(all_labels, all_preds) * 100
        
        # Evaluate on test set
        model.eval()
        test_preds = []
        test_labels = []
        with torch.no_grad():
            for batch_X, batch_y in test_loader:
                batch_X, batch_y = batch_X.to(device), batch_y.to(device)
                outputs = model(batch_X)
                preds = (outputs > 0.5).float()
                test_preds.extend(preds.cpu().numpy())
                test_labels.extend(batch_y.cpu().numpy())
        
        test_accuracy = accuracy_score(test_labels, test_preds) * 100
        
        # Store metrics
        train_losses.append(avg_loss)
        train_accuracies.append(train_accuracy)
        test_accuracies.append(test_accuracy)
        learning_rates.append(optimizer.param_groups[0]['lr'])
        
        # Print training progress
        print(f'Epoch [{epoch+1}/{num_epochs}], Loss: {avg_loss:.4f}, '
              f'Train Accuracy: {train_accuracy:.2f}%, Test Accuracy: {test_accuracy:.2f}%, '
              f'LR: {optimizer.param_groups[0]["lr"]:.6f}')
    
    # Plot training metrics
    plot_training_metrics(train_losses, train_accuracies, test_accuracies, learning_rates)
    
    return model

def get_amount_score(amount):
    """Calculate suspicion score based on transaction amount."""
    abs_amount = abs(amount)  # Use absolute value for scoring
    
    if abs_amount > 10000:
        return np.random.uniform(9.5, 10.0)  # Very high suspicion
    elif 5000 <= abs_amount <= 10000:
        return np.random.uniform(8.5, 9.5)   # High suspicion
    elif 3000 <= abs_amount < 5000:
        return np.random.uniform(7.5, 8.5)   # Elevated suspicion
    elif 1000 <= abs_amount < 3000:
        return np.random.uniform(6.0, 7.5)   # Moderate suspicion
    elif 500 <= abs_amount < 1000:
        return np.random.uniform(4.5, 6.0)   # Low suspicion
    elif 100 <= abs_amount < 500:
        return np.random.uniform(3.0, 4.5)   # Minimal suspicion
    elif 50 <= abs_amount < 100:
        return np.random.uniform(2.0, 3.0)   # Very low suspicion
    else:
        return np.random.uniform(1.0, 2.0)   # Normal transaction

def analyze_mock_transactions(model, scaler, features):
    # Load mock transactions
    print("Loading mock transactions...")
    try:
        # Import the mock transactions module
        from mock_transactions import transactions as mock_data
    except ImportError:
        print("Error: Could not import mock_transactions. Make sure the file exists and contains a 'transactions' list.")
        return []
    
    print(f"Loaded {len(mock_data)} mock transactions")
    
    # Prepare mock transactions for prediction
    mock_features = []
    for transaction in mock_data:
        feature_values = [transaction.get(feature, 0) for feature in features]
        mock_features.append(feature_values)
    
    mock_features = scaler.transform(mock_features)
    mock_features = torch.FloatTensor(mock_features).to(device)
    
    # Get predictions
    model.eval()
    with torch.no_grad():
        try:
            predictions = model(mock_features)
        except RuntimeError as e:
            print(f"Error during prediction: {e}")
            print("\nPlease make sure you have installed the correct PyTorch version for your RTX 5090:")
            print("pip install --pre torch torchvision torchaudio --index-url https://download.pytorch.org/whl/nightly/cu121")
            sys.exit(1)
    
    # Create new transactions with combined suspicion scores
    suspicious_transactions = []
    for i, transaction in enumerate(mock_data):
        # Get model prediction (0-1) and convert to 1-10 scale with more nuance
        raw_score = float(predictions[i].item())
        
        # Apply a non-linear transformation to get more nuanced scores
        # This will make the model more sensitive to potential fraud
        if raw_score < 0.5:
            # For non-fraud cases, use a gentler curve
            model_score = 1 + (raw_score * 2)  # Maps 0-0.5 to 1-2
        else:
            # For potential fraud cases, use a steeper curve
            model_score = 2 + ((raw_score - 0.5) * 16)  # Maps 0.5-1 to 2-10
        
        # Get amount-based score (1-10)
        amount_score = get_amount_score(transaction.get('amount', 0))
        
        # Combine scores (25% model, 75% amount) - amount has 3x more influence
        combined_score = (model_score * 0.25) + (amount_score * 0.75)
        
        # Ensure score is between 1 and 10
        final_score = min(10, max(1, combined_score))
        
        suspicious_transactions.append({
            **transaction,
            'suspicion': round(final_score, 2),
            'model_score': round(model_score, 2),
            'amount_score': round(amount_score, 2)
        })
    
    return suspicious_transactions

def main():
    try:
        # Load and preprocess data
        print("Loading and preprocessing data...")
        X, y, scaler, features = load_and_preprocess_data()
        
        # Train the model
        print("\nTraining model...")
        model = train_model(X, y)
        
        # Analyze mock transactions
        print("\nAnalyzing mock transactions...")
        suspicious_transactions = analyze_mock_transactions(model, scaler, features)
        
        # Save results
        print("\nSaving results...")
        with open('mock_transaction_suspicion.py', 'w') as f:
            f.write("transactions = " + json.dumps(suspicious_transactions, indent=2))
        print("Results saved to mock_transaction_suspicion.py")
        
        # Print some example transactions with their scores
        print("\nExample transactions with scores (1-10 scale):")
        for i, t in enumerate(suspicious_transactions[:5]):
            print(f"\nTransaction {i+1}:")
            print(f"Amount: ${t['amount']:.2f}")
            print(f"Model Score: {t['model_score']}/10")
            print(f"Amount Score: {t['amount_score']}/10")
            print(f"Final Suspicion: {t['suspicion']}/10")
    except Exception as e:
        print(f"Error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main() 