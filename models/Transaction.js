const {utxos} = require('../db')

class Transaction {
  constructor(inputs, outputs) {
    this.inputs = inputs;
    this.outputs = outputs;
  }

  execute(){
    this.inputs.forEach((input) =>{
      input.spent = true;
    });

    this.outputs.forEach((output)=>{
      utxos.push(output);
      //should push all output UTXOS into blockchain class UTXO array
    })
  }

}

module.exports = Transaction;
