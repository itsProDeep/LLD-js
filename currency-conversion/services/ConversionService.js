class ConversionService {
  constructor(ratesService) {
    this.ratesService = ratesService;
  }

  convert({ fromCurrency, toCurrency, amount, transactionFee = 0, otherCharges = 0 }) {
    const fromRate = this.ratesService.getRate(fromCurrency);
    const toRate = this.ratesService.getRate(toCurrency);

    const usdValue = amount * fromRate;
    let convertedAmount = usdValue / toRate;

    return convertedAmount - transactionFee - otherCharges;
  }
}

module.exports = ConversionService;