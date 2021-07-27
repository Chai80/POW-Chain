class UTXO {
  constructor(owner, amount, publicKey) {
    this.owner = owner;
    this.amount = amount;
    this.spent = false;
    this.publicKey = publicKey;
  }

}

module.exports = UTXO;
