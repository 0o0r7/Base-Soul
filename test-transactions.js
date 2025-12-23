// Test script to fetch Base transactions for 404stranger.base.eth
// This is a temporary test file

import { createPublicClient, http } from 'viem';
import { base } from 'viem/chains';

const BASE_RPC = 'https://mainnet.base.org'; // Public Base RPC
const ENS_NAME = '404stranger.base.eth';

async function resolveENS(ensName) {
  try {
    console.log(`🔍 Resolving ENS name: ${ensName}`);
    
    const client = createPublicClient({
      chain: base,
      transport: http(BASE_RPC),
    });
    
    // Try to resolve the name
    // Note: Base uses a different resolver, might need to check if it's a .base.eth or regular ENS
    console.log(`📡 Using viem to resolve...`);
    
    // For .base.eth names, we might need a different approach
    // Let's try both methods
    
    // Method 1: Try direct resolution (if it's a standard ENS)
    try {
      const address = await client.getEnsAddress({ name: ensName });
      if (address) {
        console.log(`✅ Resolved address (standard ENS): ${address}`);
        return address;
      }
    } catch (e) {
      console.log(`⚠️  Standard ENS resolution failed: ${e.message}`);
    }
    
    // Method 2: Try BaseScan API as fallback
    const baseScanUrl = `https://api.basescan.org/api?module=resolver&action=addr&name=${ensName}`;
    console.log(`📡 Trying BaseScan API: ${baseScanUrl}`);
    
    const response = await fetch(baseScanUrl);
    const data = await response.json();
    
    if (data.status === '1' && data.result) {
      console.log(`✅ Resolved address (BaseScan): ${data.result}`);
      return data.result;
    }
    
    console.log('❌ Could not resolve ENS name');
    return null;
  } catch (error) {
    console.error('❌ Error resolving ENS:', error);
    return null;
  }
}

async function getTransactions(address) {
  try {
    console.log(`\n📊 Fetching transactions for: ${address}`);
    
    const client = createPublicClient({
      chain: base,
      transport: http(BASE_RPC),
    });
    
    // Method 1: Try BaseScan API (more reliable for transaction history)
    const apiUrl = `https://api.basescan.org/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=desc`;
    
    console.log(`📡 Calling BaseScan API...`);
    const response = await fetch(apiUrl);
    const data = await response.json();
    
    if (data.status === '1' && data.result && data.result.length > 0) {
      console.log(`✅ Found ${data.result.length} transactions (BaseScan)`);
      return data.result.slice(0, 10); // Return first 10
    }
    
    // Method 2: Try using viem to get recent transactions via logs
    console.log(`📡 Trying viem getLogs method...`);
    try {
      const currentBlock = await client.getBlockNumber();
      const fromBlock = currentBlock - BigInt(10000); // Last ~10000 blocks
      
      // Get Transfer events
      const TRANSFER_TOPIC = '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef';
      const addressLower = address.toLowerCase().replace('0x', '');
      const addressTopic = `0x${'0'.repeat(24)}${addressLower}`;
      
      const logs = await client.getLogs({
        address: undefined, // All addresses
        event: {
          type: 'event',
          name: 'Transfer',
          inputs: [
            { type: 'address', indexed: true, name: 'from' },
            { type: 'address', indexed: true, name: 'to' },
            { type: 'uint256', indexed: false, name: 'value' },
          ],
        },
        args: {
          from: address as `0x${string}`,
        },
        fromBlock,
        toBlock: currentBlock,
      });
      
      if (logs.length > 0) {
        console.log(`✅ Found ${logs.length} transfer events (viem)`);
        return logs.slice(0, 10).map((log, i) => ({
          hash: log.transactionHash,
          blockNumber: log.blockNumber.toString(),
          from: log.args.from,
          to: log.args.to,
        }));
      }
    } catch (e) {
      console.log(`⚠️  viem method failed: ${e.message}`);
    }
    
    console.log(`⚠️  No transactions found`);
    return [];
  } catch (error) {
    console.error('❌ Error fetching transactions:', error);
    return [];
  }
}

async function test() {
  console.log('🚀 Testing Base transaction access for:', ENS_NAME);
  console.log('='.repeat(60));
  
  // Step 1: Resolve ENS name
  const address = await resolveENS(ENS_NAME);
  
  if (!address) {
    console.log('\n❌ Could not resolve ENS name.');
    console.log('\n💡 Possible reasons:');
    console.log('   1. The ENS name might not be registered on Base');
    console.log('   2. The name might need to be resolved differently');
    console.log('   3. Try checking on BaseScan: https://basescan.org/');
    return;
  }
  
  // Step 2: Get transactions
  const transactions = await getTransactions(address);
  
  if (transactions.length > 0) {
    console.log('\n📋 Sample transactions:');
    transactions.forEach((tx, i) => {
      console.log(`\n${i + 1}. Hash: ${tx.hash}`);
      console.log(`   From: ${tx.from}`);
      console.log(`   To: ${tx.to}`);
      console.log(`   Value: ${(parseInt(tx.value) / 1e18).toFixed(6)} ETH`);
      console.log(`   Block: ${tx.blockNumber}`);
    });
  } else {
    console.log('\n⚠️  No transactions found for this address');
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('✅ Test completed!');
}

// Run the test
test().catch(console.error);

