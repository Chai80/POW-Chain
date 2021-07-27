const jayson = require('jayson');
const {startMining, stopMining} = require('./mine');
const {PORT} = require('./config');
const express = require('express');
const app = express();
const cors = require('cors');
const port = 3042;
const Transaction = require('./models/Transaction')
const Blockchain = require('./models/Blockchain');


//npm i crypto-js
//var EC = require('elliptic').ec;
//var ec = new EC('secp256k1');
//const SHA256 = require('crypto-js/SHA256');
//npm install -g nodemon
//npm i elliptic
//npm install --save sha256
//npm install -g nodemon
//npm install
//npm i request

// create a server
const server = jayson.server({
  startMining: function(_, callback) {
    callback(null, 'success!');
    startMining();
  },
  stopMining: function(_, callback) {
    callback(null, 'success!');
    stopMining();
  },
  getBalance: function(address, callback) {
    const ourUTXOs= utxos.filter(x =>{
      return x.owner === address && !x.spent;
    });
    const sum = ourUTXOS.reduce((p,c) =>p + c.amount, 0);
    callback(null, sum);
  }
});


//Import transaction class in the index.js - use transaction properties to create that instance

//import blockchain on index.js whenever someone does a send it adds to the mempool
app.post('/send', (req, res) => {
  //Requests this information from body function client side
  const {publicKey, signature, transaction, recipient} = req.body;
  //From the body request, publicKey is already 'hex'. Do we need to define the key in hex at the bottom below?

  //From the front end, a user can specify a UTXO
  //This would be the input inputuTXO
  //This input UTXO would get spent
  //Create an output UTXO that then belongs to the recipient
  //That would be how the amount transfers
  //Creates a new transaction to be pulled into the mempool.
  const inputuTXO = new UTXO(publicKey, transaction, recipient);
  const outputuTXO = new UTXO(publicKey, transaction, recipient);
  const addedtransaction = new Transaction(inputuTXO , outputuTXO);
  db.blockchain.mempool.push(addedtransaction);

//Server verifies if the digital signature from the transaction is correct
  const key = ec.keyFromPublic(publicKey, 'hex');
  const isVerified = key.verify(SHA256(JSON.stringify(transaction())).toString(), signature);
  if(isVerified) {
      mine();
  }
  else{
    res.send(200, {"result": false})
  }
})



server.http().listen(PORT);
