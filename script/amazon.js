import { cart } from "../data/cart.js";
import { products } from '../data/products.js'

let productsHTML = '';
products.forEach((product) => {
    productsHTML += `
    <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${product.priceCents / 100}
          </div>

          <div class="product-quantity-container">
          <!--ProductId for produktet settes inn i klassenavnet for å gjennkjenne hvilken selector du velger.-->
            <select class="js-product-quantity-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button js-add-to-cart button-primary" data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>`;
});
document.querySelector('.products-grid').innerHTML = productsHTML;

function addToCart(productId){
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

function updateCartQuantity(){
    let cartQuantity = 0;
    cart.forEach((product) => {
        cartQuantity += product.quantity;
    });
    document.querySelector('.js-cart-quantity')
        .innerHTML = cartQuantity;
}

//Objekt som samler timeOutId knyttet til produktet du trykket på sin productId.
const addedMessageTimeouts = {};
function displayAdded(productId){
    const addedToCart = document.querySelector(`.js-added-to-cart-${productId}`);
    addedToCart.classList.add('added-to-cart-visible');
    
    //Variabel som blir verdien til propertien med samme key som productId
    const previousTimeout = addedMessageTimeouts[productId];
    //Hvis productId har en timeoutId vil den cleares.
    if(previousTimeout){
        clearTimeout(previousTimeout);
    }
    const timeOutId = setTimeout(() => {
        addedToCart.classList.remove('added-to-cart-visible');
    }, 2000);

    //timeOutId knyttes til productId, f.eks: 'productId': 7, legges til i objekt 
    addedMessageTimeouts[productId] = timeOutId;
}

document.querySelectorAll('.js-add-to-cart')
    .forEach((button) => {
        button.addEventListener('click', () => {
            //Tar inn Id´en som ble knyttet til knappens data-attributt da løkken kjøres.
            const productId = button.dataset.productId;
            addToCart(productId);
            updateCartQuantity();
            displayAdded(productId);
            console.log(cart);
        });
    });

