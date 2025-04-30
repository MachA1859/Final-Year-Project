import { NextResponse } from 'next/server';
import * as fs from 'fs';
import * as path from 'path';

export async function GET() {
  try {
    const pythonFilePath = path.join(process.cwd(), 'mynt_condition', 'suspicion_model', 'mock_transaction_suspicion.py');
    const fileContent = fs.readFileSync(pythonFilePath, 'utf-8');
    
    // Extract the transactions array from the Python file
    const transactionsMatch = fileContent.match(/transactions\s*=\s*\[([\s\S]*?)\]/);
    if (!transactionsMatch) {
      throw new Error('Could not find transactions array in Python file');
    }
    
    // Convert Python array to JavaScript array
    const pythonArray = transactionsMatch[1];
    const jsArray = pythonArray
      .replace(/'/g, '"') // Replace single quotes with double quotes
      .replace(/True/g, 'true') // Convert Python True to JavaScript true
      .replace(/False/g, 'false') // Convert Python False to JavaScript false
      .replace(/None/g, 'null'); // Convert Python None to JavaScript null
    
    // Parse the JavaScript array
    const transactions = JSON.parse(`[${jsArray}]`);
    
    // Map the transactions to include suspiciousProbability
    const mappedTransactions = transactions.map((t: any) => ({
      ...t,
      suspiciousProbability: t.suspicion,
      type: t.type,
      pending: t.pending || false,
      image: t.image || undefined,
      isFraud: null
    }));

    return NextResponse.json(mappedTransactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch transactions' },
      { status: 500 }
    );
  }
} 