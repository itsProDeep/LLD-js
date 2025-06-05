class RatesService {
  constructor(initialRates = []) {
    this.rates = new Map();
    initialRates.forEach(({ currency, rateInUSD }) => {
      this.rates.set(currency, rateInUSD);
    });
  }

  updateRates(newRates) {
    newRates.forEach(({ currency, rateInUSD }) => {
      this.rates.set(currency, rateInUSD);
    });
  }

  getRate(currency) {
    if (!this.rates.has(currency)) {
      throw new Error(`Rate not available for ${currency}`);
    }
    return this.rates.get(currency);
  }

  getAllRates() {
    return Object.fromEntries(this.rates);
  }
}

module.exports = RatesService;