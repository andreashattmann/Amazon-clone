//utils relatert til penger
export function formatPrice(pricCents){
    return (Math.round(pricCents) / 100).toFixed(2);
}