const Block = require('./models/Block');
const db = require('./db');
const TARGET_DIFFICULTY = BigInt("0x0" + "F".repeat(63));
const Transaction = require('./models/Transaction')
const UTXO = require('./models/UTXO')
const {PUBLIC_KEY} = require('./config');
const BLOCKREWARD = 5;
const EC = require('elliptic').ec;
const SHA256 = require('crypto-js/sha256');
const ec = new EC('secp256k1');
const Blockchain = require('./models/Blockchain')



let mining = true;
mine();

function startMining() {
  mining = true;
  mine();
}

function stopMining() {
  mining = false;
}

function mine() {

  if(!mining) return;

//Creates a
  let block = new Block()
  if(db.blockchain.blocks.length < 1){
      block = new Block("Genesis");
  }

  //Coinbase reward to the solo miner!
  const coinbaseUTXO = new UTXO(PUBLIC_KEY, BLOCKREWARD);
  const coinbaseTX = new Transaction([], [coinbaseUTXO]);
  block.addTransaction(coinbaseTX);

  for(let i = db.blockchain.mempool.length; i > db.blockchain.mempool.length; i--){
    const unaddedTransaction = db.blockchain.mempool.pop();
    block.addTransaction(unaddedTransaction)
  }

  //I would handle the balance changes of the UTXOs by publicKey
  //I would have to set the UTXOs here to spent
  //And then the handle the return UTXO if there is an overspend back to the original address
  //Validate if the UTXO can be accepted
  //How to check if a UTXO is valid - If it's already spent if(UTXO.spent === true){ then do whatever}
  while(BigInt('0x' + block.hash()) >= TARGET_DIFFICULTY) {
    block.nonce++;
  }

  block.execute();

  db.blockchain.addBlock(block);

  console.log(`Mined block #${db.blockchain.blockHeight()} with a hash of ${block.hash()} at nonce ${block.nonce}`);

  setTimeout(mine, 5000);
}

module.exports = {
  startMining,
  stopMining,
};
