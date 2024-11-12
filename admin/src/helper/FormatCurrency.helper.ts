export default function FormatCurrency(price: number): string {
    const numericPrice = typeof price === 'number' ? price : parseFloat(price);
    const fixedPrice = numericPrice.toFixed(2);
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(fixedPrice));
}