const assert = require('assert');
const RatesService = require('../services/RatesService');
const ConversionService = require('../services/ConversionService');

const rates = new RatesService([
  { currency: 'USD', rateInUSD: 1 },
  { currency: 'INR', rateInUSD: 0.012 },
]);
const converter = new ConversionService(rates);

describe('Currency Conversion', function () {
  it('should convert INR to USD correctly', function () {
    const result = converter.convert({ fromCurrency: 'INR', toCurrency: 'USD', amount: 100, transactionFee: 0 });
    assert.strictEqual(result.toFixed(2), (100 * 0.012).toFixed(2));
  });
});