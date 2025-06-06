module.exports = function mockRatesProvider() {
  return [
    { currency: 'USD', rateInUSD: 1 },
    { currency: 'INR', rateInUSD: 0.012 },
    { currency: 'EUR', rateInUSD: 1.1 },
    { currency: 'JPY', rateInUSD: 0.007 },
  ];
};