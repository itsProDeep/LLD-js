const readline = require('readline');
const RatesService = require('../services/RatesService');
const ConversionService = require('../services/ConversionService');
const Transaction = require('../models/Transaction');
const TransactionManager = require('../services/TransactionManager');
const getRates = require('../utils/mockRatesProvider');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const ratesService = new RatesService(getRates());
const conversionService = new ConversionService(ratesService);
const transactionManager = new TransactionManager();

function prompt() {
  rl.question('Enter fromCurrency, toCurrency, amount, fee (comma-separated): ', (answer) => {
    const [fromCurrency, toCurrency, amountStr, feeStr] = answer.split(',');
    const amount = parseFloat(amountStr);
    const fee = parseFloat(feeStr);

    try {
      const converted = conversionService.convert({ fromCurrency, toCurrency, amount, transactionFee: fee });
      const txn = new Transaction({ fromCurrency, toCurrency, amount, convertedAmount: converted, transactionFee: fee });
      transactionManager.logTransaction(txn);
      console.log('Converted Amount:', converted);
      console.log('Transaction ID:', txn.id);
    } catch (err) {
      console.error('Error:', err.message);
    }
    prompt();
  });
}

prompt();