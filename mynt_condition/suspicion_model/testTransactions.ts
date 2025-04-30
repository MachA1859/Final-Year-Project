import { fetchTransactionsFromPython } from './mockTransactionsWithSuspicion';

async function testTransactions() {
  try {
    console.log('Fetching transactions from Python file...');
    const transactions = await fetchTransactionsFromPython();
    
    console.log(`Successfully fetched ${transactions.length} transactions`);
    
    // Print first 3 transactions as a sample
    console.log('\nSample transactions:');
    transactions.slice(0, 3).forEach((t, index) => {
      console.log(`\nTransaction ${index + 1}:`);
      console.log(`ID: ${t.id}`);
      console.log(`Name: ${t.name}`);
      console.log(`Amount: ${t.amount}`);
      console.log(`Type: ${t.type}`);
      console.log(`Suspicious Probability: ${t.suspiciousProbability}`);
      console.log(`Model Score: ${t.model_score}`);
      console.log(`Amount Score: ${t.amount_score}`);
    });
    
  } catch (error) {
    console.error('Error testing transactions:', error);
  }
}

// Run the test
testTransactions(); 