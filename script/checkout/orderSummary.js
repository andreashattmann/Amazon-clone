import { cart,removeProduct, calculateCartQuantity, updateQuantity, updateDeliveryOption } from "../../data/cart.js";
import { products } from "../../data/products.js";
import { formatPrice } from "../utils/money.js";
//Default export
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { deliveryOptions } from "../../data/delivery.js";

export function renderOrderSummary(){
    let cartSummaryHTML = '';
    cart.forEach((cartProduct) => {
        const productId = cartProduct.productId;
        const deliveryOption = cartProduct.deliveryOptionId;

        const matchingProduct = products.find((product) => {
            return product.id === productId;
        });

        const deliveryOptionId = deliveryOptions.find((option) => {
            return option.id === deliveryOption;
        });

        const today = dayjs();
        const deliveryDate = today.add(deliveryOptionId.deliveryDays, 'days');
        const dateFormat = deliveryDate.format('dddd, MMMM D');

        cartSummaryHTML += `
            <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
                <div class="delivery-date">
                    Delivery date: ${dateFormat}
                </div>

                <div class="cart-item-details-grid">
                    <img class="product-image"
                    src="${matchingProduct.image}">

                    <div class="cart-item-details">
                    <div class="product-name">
                        ${matchingProduct.name}
                    </div>
                    <div class="product-price">
                        ${formatPrice(matchingProduct.priceCents)}
                    </div>
                    <div class="product-quantity">
                        <span>
                        Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartProduct.quantity}</span>
                        </span>
                        <span class="update-quantity-link js-update-quantity-link link-primary" onClick="" data-product-id="${matchingProduct.id}">
                        Update
                        </span>
                        <input class="quantity-input js-quantity-input js-quantity-input-${matchingProduct.id}" data-product-id="${matchingProduct.id}" style="width: 30px">
                        <span class="save-quantity-link js-save-quantity-link link-primary" onClick="" onkeydown="" data-product-id="${matchingProduct.id}">
                        Save
                        </span>
                        <span class="delete-quantity-link js-delete-button link-primary" onClick="" data-product-id="${matchingProduct.id}">
                        Delete
                        </span>
                    </div>
                    </div>

                    <div class="delivery-options">
                    <div class="delivery-options-title">
                        Choose a delivery option:
                    </div class="js-delivery-Option">
                        ${deliverOptionsHTML(matchingProduct, cartProduct)}
                    </div>
                </div>
            </div>`;
    });

    document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

    function deliverOptionsHTML(matchingProduct, cartProduct){
        let html = '';
        deliveryOptions.forEach((deliveryOption) => {
            const today = dayjs();
            const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
            const dateFormat = deliveryDate.format('dddd, MMMM D');

            const price = deliveryOption.priceCents === 0 ? 'Free' : formatPrice(deliveryOption.priceCents);

            const isChecked = deliveryOption.id === cartProduct.deliveryOptionId;

            html += `
                <div class="delivery-option js-delivery-option"
                    data-product-id="${matchingProduct.id}"
                    data-delivery-option-id="${deliveryOption.id}">
                    <input type="radio" 
                    ${isChecked ? 'checked' : ''}
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}"
                    data-product-id="${matchingProduct.id}">
                    <div>
                    <div class="delivery-option-date">
                        ${dateFormat}
                    </div>
                    <div class="delivery-option-price">
                        ${price} - Shipping
                    </div>
                    </div>
                </div>`;
        });
        return html;
    }   

    document.querySelectorAll('.js-delivery-option')
        .forEach((element) => {
            element.addEventListener('click', () => {
                const {productId, deliveryOptionId} = element.dataset;
                updateDeliveryOption(productId, deliveryOptionId);
                
                renderOrderSummary();
            });
        });


    function updateCartQuantity(){
            document.querySelector('.js-checkout-quantity')
                .innerHTML = calculateCartQuantity();
    }

    document.querySelectorAll('.js-delete-button')
        .forEach((deleteLink) => {
            deleteLink.addEventListener('click', () => {
                const productId = deleteLink.dataset.productId;
                const productContainer = document.querySelector(`.js-cart-item-container-${productId}`);
                removeProduct(productId);
                productContainer.remove();
                updateCartQuantity('.js-checkout-quantity');
            });
    });

    function updateProductQuantity(productId){
        document.querySelector(`.js-cart-item-container-${productId}`)
            .classList.remove('is-editing-quantity');

        const newQuantity = Number(document.querySelector(`.js-quantity-input-${productId}`).value);

        if(Number.isInteger(newQuantity) && newQuantity >= 1 && newQuantity < 1000){
            updateQuantity(productId, newQuantity);

            document.querySelector(`.js-quantity-label-${productId}`)
                .innerHTML = newQuantity;
            document.querySelector('.js-checkout-quantity')
                .innerHTML = calculateCartQuantity();
        }
    }

    document.querySelectorAll('.js-update-quantity-link')
        .forEach((updateLink) => {
            const productId = updateLink.dataset.productId;
            updateLink.addEventListener('click', () => {
                document.querySelector(`.js-cart-item-container-${productId}`)
                    .classList.add('is-editing-quantity');
            });
        });

    document.querySelectorAll('.js-save-quantity-link')
        .forEach((saveLink) => {
            saveLink.addEventListener("click", () => {
                const productId = saveLink.dataset.productId;

                updateProductQuantity(productId);
            });
        });

    document.querySelectorAll('.js-quantity-input')
        .forEach((input) => {
            input.addEventListener('keydown', (event) =>{
                const productId = input.dataset.productId;
                if(event.key === 'Enter'){
                    updateProductQuantity(productId)
                }
            })
        });

    updateCartQuantity('.js-checkout-quantity');
}