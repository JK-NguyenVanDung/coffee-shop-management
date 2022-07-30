export function numbToCurrency(price) {

    return new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'VND' }).format(parseInt(price))
  }