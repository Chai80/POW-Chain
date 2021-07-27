class Blockchain {
  constructor() {
    this.blocks = [];
    this.mempool = [];
    this.utxos = [];
  }
  addBlock(block) {
    this.blocks.push(block);
  }
  blockHeight() {
    return this.blocks.length;
  }
  adddTransaction(tx){
    this.mempool.push(tx);
  }
}


module.exports = Blockchain;
