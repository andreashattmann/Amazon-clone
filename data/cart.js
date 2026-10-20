export const cart = [];

export function addToCart(productId){
    //Tar inn Id verdien til selector knyttet til produktet du har valgt. Vet hvilken selector den skal velge på grunn av at hver selector har ulik productId.
    const quantity = Number(document.querySelector(`.js-product-quantity-${productId}`).value);
    const productIndex = cart.findIndex((product) => {
        return product.productId === productId;
    });
    if(productIndex !== -1){
        cart[productIndex].quantity++;
    } else{
        cart.push({
            productId,
            quantity
        });
    }
}
