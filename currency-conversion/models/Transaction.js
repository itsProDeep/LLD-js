const { v4: uuidv4 } = require('uuid');

class Transaction {
  constructor({ fromCurrency, toCurrency, amount, convertedAmount, transactionFee }) {
    this.id = uuidv4();
    this.timestamp = Date.now();
    this.fromCurrency = fromCurrency;
    this.toCurrency = toCurrency;
    this.amount = amount;
    this.convertedAmount = convertedAmount;
    this.transactionFee = transactionFee;
  }
}

module.exports = Transaction;
