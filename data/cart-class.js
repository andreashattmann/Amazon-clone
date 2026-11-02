//Object Oriented Programming (OOP) - Class
class Cart{
    cartProdcts;
    #localStorageKey;

    constructor(localStorageKey) {
        this.#localStorageKey = localStorageKey;
        this.#loadFromStorage();
    }

    #loadFromStorage(){
        this.cartProdcts = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [{
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 2,
            deliveryOptionId: '1'
        },
        {
            productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
            quantity: 1,
            deliveryOptionId: '2'
        }];
    }

    saveLocalStorage(){
        localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartProdcts));
    }

    addToCart(productId, quantity){
        const productIndex = this.cartProdcts.findIndex((product) => {
            return product.productId === productId;
        });
        if(productIndex !== -1){
            this.cartProdcts[productIndex].quantity += quantity;
        } else{
            this.cartProdcts.push({
                productId,
                quantity,
                deliveryOptionId: '1'
            });
        }
        this.saveLocalStorage();
    }

    calculateCartQuantity(){
        let cartQuantity = 0;
        this.cartProdcts.forEach((product) => {
            cartQuantity += product.quantity;
        });
        return cartQuantity;
    }

    removeProduct(productId){
    const updatedCart = this.cartProdcts.filter((cartProduct) => {
        return cartProduct.productId !== productId;
    })
    this.cartProdcts = updatedCart;
    this.saveLocalStorage();
    }

    updateQuantity(productId, newQuantity){
        const product = this.cartProdcts.find((cartProduct) => {
            return cartProduct.productId === productId;
        });
        product.quantity = newQuantity;
        this.saveLocalStorage();
    }

    updateDeliveryOption(productId, deliveryOptionId){
        const product = this.cartProdcts.find((cartProduct) => {
            return cartProduct.productId === productId;
        })
        product.deliveryOptionId = deliveryOptionId;
        this.saveLocalStorage();
    }
}



const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');

console.log(cart);
console.log(businessCart);

