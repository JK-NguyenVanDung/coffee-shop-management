export function numbToCurrency(price) {

    return new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'VND' }).format(parseInt(price))
  }

  export function numbToDecimal(price) {

    return new Intl.NumberFormat('it-IT').format(parseInt(price))
  }