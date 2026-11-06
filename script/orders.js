import { orders } from "../data/orders.js";
import { products, loadProductsFetch } from "../data/products.js";
import { deliveryOptions } from "../data/delivery.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { formatPrice } from "./utils/money.js";
import { loadCartFetch, addToCart } from "../data/cart.js";

async function loadPage(){
    try{
        await Promise.all([
            loadProductsFetch(),
            loadCartFetch()
        ]);

    } catch (error){
        console.error('Unexpected error', error);
    }
    renderOrder();
}
loadPage();

function renderOrder(){
        let html = '';
        orders.forEach((order) => {
            let productsHTML = '';

            order.products.forEach((orderProduct) => {
                const estimatedDeliveryDate = dayjs(orderProduct.estimatedDeliveryTime);
                const estimatedDeliveryTime = estimatedDeliveryDate.format('MMMM D');

                const matchingProduct = products.find((product) => {
                    return product.id === orderProduct.productId;
                });

                productsHTML += `
                    <div class="order-details-grid js-order-details-grid">
                        <div class="product-image-container">
                            <img src="${matchingProduct.image}">
                        </div>

                        <div class="product-details">
                            <div class="product-name">
                                ${matchingProduct.name}
                            </div>
                            <div class="product-delivery-date">
                                Arriving on: ${estimatedDeliveryTime}
                            </div>
                            <div class="product-quantity">
                                Quantity: ${orderProduct.quantity}
                            </div>
                            <button class="buy-again-button button-primary js-buy-again-button" data-product-id="${matchingProduct.id}">
                                <img class="buy-again-icon" src="images/icons/buy-again.png">
                                <span class="buy-again-message">Buy it again</span>
                            </button>
                        </div>

                        <div class="product-actions">
                            <a href="tracking.html">
                                <button class="track-package-button button-secondary">
                                Track package
                                </button>
                            </a>
                        </div>
                    </div>
                    `
            });

            html += `
                <div class="order-container">
                    <div class="order-header js-order-header">
                        ${renderOrderHeader(order)}
                    </div>
                    ${productsHTML}
                </div>`
        });
        document.querySelector('.js-orders-grid')
            .innerHTML = html;

    function renderOrderHeader(order){
        const orderTimeDate = dayjs(order.orderTime);
        const orderTime = orderTimeDate.format('MMMM D')

        return `
            <div class="order-header-left-section">
                <div class="order-date">
                    <div class="order-header-label">Order Placed:</div>
                    <div>${orderTime}</div>
                </div>
                <div class="order-total">
                    <div class="order-header-label">Total:</div>
                    <div>$${formatPrice(order.totalCostCents)}</div>
                </div>
            </div>

            <div class="order-header-right-section">
                <div class="order-header-label">Order ID:</div>
                <div>${order.id}</div>
            </div>
            `
    }

    document.querySelectorAll('.js-buy-again-button')
        .forEach((button) => {
            button.addEventListener('click', () => {
                const productId = button.dataset.productId;
                addToCart(productId, 1);
            })
        })
}


