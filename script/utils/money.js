//utils relatert til penger
export function formatPrice(pricCents){
    return `$${(pricCents / 100).toFixed(2)}`;
}