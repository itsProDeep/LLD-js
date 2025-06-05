class TransactionManager {
  constructor() {
    this.transactions = [];
  }

  logTransaction(transaction) {
    this.transactions.push(transaction);
  }

  findTransaction(id) {
    return this.transactions.find(t => t.id === id);
  }

  getAllTransactions() {
    return this.transactions;
  }

  getTransactionsInWindow(startTime, endTime) {
    return this.transactions.filter(txn => txn.timestamp >= startTime && txn.timestamp <= endTime);
  }
}

module.exports = TransactionManager;