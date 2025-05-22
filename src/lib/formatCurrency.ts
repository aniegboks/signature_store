export function formatCurrency(
    amount: number,
    currencyCode: string = "USD"
): string {
    try {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: currencyCode.toLocaleUpperCase(),
        }).format(amount);
    } catch (error) {
        console.error("invalid currency code:", currencyCode, error)
        return `${currencyCode.toLocaleUpperCase()}${amount.toFixed(2)}`
    }
}