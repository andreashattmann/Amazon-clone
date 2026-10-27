export let cart = JSON.parse(localStorage.getItem('cart')) || [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2,
    deliveryOptionId: '1'
},
{
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1,
    deliveryOptionId: '2'
}];

function saveLocalStorage(){
    //Oppdaterer localStorage nøkkelen 'cart' til å bli det oppdaterte versjonen av cart.
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId){
    //Tar inn Id verdien til selector knyttet til produktet du har valgt. Vet hvilken selector den skal velge på grunn av at hver selector har ulik productId.
    const quantity = Number(document.querySelector(`.js-product-quantity-${productId}`).value);
    const productIndex = cart.findIndex((product) => {
        return product.productId === productId;
    });
    if(productIndex !== -1){
        cart[productIndex].quantity += quantity;
    } else{
        cart.push({
            productId,
            quantity,
            deliveryOptionId: '1'
        });
    }
    saveLocalStorage();
}

export function calculateCartQuantity(){
    let cartQuantity = 0;
    cart.forEach((product) => {
        cartQuantity += product.quantity;
    });
    return cartQuantity;
}

export function removeProduct(productId){
    const updatedCart = cart.filter((cartProduct) => {
        return cartProduct.productId !== productId;
    })
    cart = updatedCart;
    saveLocalStorage();
}

export function updateQuantity(productId, newQuantity){
    const product = cart.find((cartProduct) => {
        return cartProduct.productId === productId;
    });
    product.quantity = newQuantity;
    saveLocalStorage();
}
