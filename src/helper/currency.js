export function numbToCurrency(price) {
    return new Intl.NumberFormat("vi-VI", {
      style: "currency",
      currency: "VND",
    }).format(parseInt(price));
  }