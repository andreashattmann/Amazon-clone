import { orders } from "../data/orders.js";
import { products, loadProductsFetch } from "../data/products.js";
import { deliveryOptions } from "../data/delivery.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { formatPrice } from "./utils/money.js";
import { loadCartFetch } from "../data/cart.js";

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

export function renderOrder(){
    let html = '';
    orders.forEach((order) => {
        html += `
            <div class="order-header js-order-header">
                ${renderOrderHeader()}
            </div>`

        order.products.forEach((orderProduct) => {
            const estimatedDeliveryString = dayjs(order.estimatedDeliveryTime);
            const estimatedDeliveryTime = estimatedDeliveryString.format('MMMM D');

            const matchingProduct = products.find((product) => {
                return product.id === orderProduct.productId;
            });

            html += `
                <div class="order-details-grid js-order-details-grid">
                    <div class="product-image-container">
                        <img src="images/products/athletic-cotton-socks-6-pairs.jpg">
                    </div>

                    <div class="product-details">
                        <div class="product-name">
                            Black and Gray Athletic Cotton Socks - 6 Pairs
                        </div>
                        <div class="product-delivery-date">
                            Arriving on: August 15
                        </div>
                        <div class="product-quantity">
                            Quantity: 1
                        </div>
                        <button class="buy-again-button button-primary">
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
                </div>`
        });
    });
    document.querySelector('.js-order-container')
        .innerHTML = html;
}

function renderOrderHeader(){
    let html = '';
    orders.forEach((order) => {
        const orderTimeString = dayjs(order.orderTime);
        const orderDate = orderTimeString.format('MMMM D')

        html = `
                <div class="order-header-left-section">
                    <div class="order-date">
                        <div class="order-header-label">Order Placed:</div>
                        <div>${orderDate}</div>
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
    })
    return html;
}