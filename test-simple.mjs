// Simple test to check Base transactions access
// Testing with 404stranger.base.eth

const ENS_NAME = '404stranger.base.eth';

async function testBaseScan() {
  console.log('🚀 Testing Base transaction access');
  console.log('='.repeat(60));
  console.log(`📋 Target: ${ENS_NAME}\n`);
  
  // Method 1: Try BaseScan API v2 for name resolution
  console.log('1️⃣ Trying BaseScan API v2 for name resolution...');
  const resolveUrl = `https://api.basescan.org/v2/api?module=resolver&action=addr&name=${ENS_NAME}`;
  console.log(`   URL: ${resolveUrl}`);
  
  try {
    const resolveRes = await fetch(resolveUrl);
    const resolveData = await resolveRes.json();
    console.log(`   Response:`, JSON.stringify(resolveData, null, 2));
    
    if (resolveData.status === '1' && resolveData.result && resolveData.result !== '0x0000000000000000000000000000000000000000') {
      console.log(`   ✅ Resolved to: ${resolveData.result}`);
      await getTransactionsForAddress(resolveData.result);
      return;
    }
  } catch (e) {
    console.log(`   ⚠️  API v2 error: ${e.message}`);
  }
  
  // Method 2: Try direct web search/scraping approach
  console.log('\n2️⃣ Trying direct BaseScan web interface...');
  console.log(`   💡 BaseScan web: https://basescan.org/name/${ENS_NAME}`);
  
  // Method 3: Try with address format if we can get it manually
  console.log('\n3️⃣ If you have the Ethereum address, we can test with that directly.');
  console.log(`   Example: node test-simple.mjs 0x1234...`);
  
  // Method 3: Manual check suggestion
  console.log('\n3️⃣ Manual check options:');
  console.log(`   • BaseScan: https://basescan.org/name/${ENS_NAME}`);
  console.log(`   • Or search: https://basescan.org/`);
}

async function getTransactionsForAddress(addressOrName) {
  console.log(`\n📊 Fetching transactions for: ${addressOrName}`);
  
  // Try API v2 first
  const apiUrlV2 = `https://api.basescan.org/v2/api?module=account&action=txlist&address=${addressOrName}&startblock=0&endblock=99999999&sort=desc&page=1&offset=10`;
  console.log(`   Trying API v2...`);
  
  try {
    const response = await fetch(apiUrlV2);
    const data = await response.json();
    
    console.log(`   Status: ${data.status}`);
    console.log(`   Message: ${data.message || 'OK'}`);
    
    if (data.status === '1' && data.result && Array.isArray(data.result) && data.result.length > 0) {
      console.log(`   ✅ Found ${data.result.length} transactions!`);
      console.log(`\n   Sample transactions:`);
      data.result.slice(0, 5).forEach((tx, i) => {
        console.log(`\n   ${i + 1}. Hash: ${tx.hash}`);
        console.log(`      From: ${tx.from}`);
        console.log(`      To: ${tx.to}`);
        if (tx.value) {
          console.log(`      Value: ${(parseInt(tx.value) / 1e18).toFixed(6)} ETH`);
        }
        console.log(`      Block: ${tx.blockNumber}`);
        if (tx.timeStamp) {
          console.log(`      Time: ${new Date(parseInt(tx.timeStamp) * 1000).toLocaleString()}`);
        }
      });
      return true;
    } else {
      console.log(`   ⚠️  No transactions found`);
      if (data.message && data.message !== 'OK') {
        console.log(`   Message: ${data.message}`);
      }
    }
  } catch (error) {
    console.log(`   ❌ API v2 Error: ${error.message}`);
  }
  
  // Fallback: Try v1 (might still work for some endpoints)
  console.log(`   Trying API v1 as fallback...`);
  const apiUrlV1 = `https://api.basescan.org/api?module=account&action=txlist&address=${addressOrName}&startblock=0&endblock=99999999&sort=desc&page=1&offset=10`;
  
  try {
    const response = await fetch(apiUrlV1);
    const data = await response.json();
    
    if (data.status === '1' && data.result && Array.isArray(data.result) && data.result.length > 0) {
      console.log(`   ✅ Found ${data.result.length} transactions (v1)!`);
      return true;
    }
  } catch (error) {
    console.log(`   ❌ API v1 also failed`);
  }
  
  return false;
}

// Run test
testBaseScan().catch(console.error);

