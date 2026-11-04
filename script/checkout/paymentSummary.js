import { cart, calculateCartQuantity } from "../../data/cart.js";
import { formatPrice } from "../utils/money.js";
import { products } from "../../data/products.js";
import { deliveryOptions } from "../../data/delivery.js";
import { orders, addOrder } from "../../data/orders.js";

export function renderPaymentSummary(){
    let productPriceCents = 0;
    let shippingPriceCents = 0;

    cart.forEach((cartProduct) => {
        const product = products.find((product) => {
            return cartProduct.productId === product.id;
        });
        productPriceCents += product.priceCents * cartProduct.quantity;

        const shipping = deliveryOptions.find((option) => {
            return option.id === cartProduct.deliveryOptionId;
        });
        shippingPriceCents += shipping.priceCents;
    });
    const totalBeforeTax = productPriceCents + shippingPriceCents;
    const estimatedTaxCents = totalBeforeTax * 0.1;
    const orderTotalCents = totalBeforeTax + estimatedTaxCents;

    const html = `
        <div class="payment-summary-title">
            Order Summary
        </div>
        <div class="payment-summary-row">
            <div class="js-payment-quantity">Items (${calculateCartQuantity()}):</div>
            <div class="payment-summary-money">$${formatPrice(productPriceCents)}</div>
        </div>

        <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatPrice(shippingPriceCents)}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatPrice(totalBeforeTax)}</div>
        </div>

        <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatPrice(estimatedTaxCents)}</div>
        </div>

        <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatPrice(orderTotalCents)}</div>
        </div>

        <button class="place-order-button js-place-order-button button-primary">
            Place your order
        </button>`;
    
    document.querySelector('.js-payment-summary')
        .innerHTML = html;

    document.querySelector('.js-place-order-button')
        .addEventListener('click', async () => {
            try{
                const response = await fetch('https://supersimplebackend.dev/orders', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        cart: cart
                    })
                });

                const order = await response.json();

                addOrder(order);
            } catch (error){
                console.error('Unexpected error:', error);
            }

            window.location.href = 'orders.html';
        });
}


