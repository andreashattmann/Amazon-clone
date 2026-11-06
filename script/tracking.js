import { loadProductsFetch, products } from "../data/products.js";
import { orders } from "../data/orders.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

async function loadPage(){
    try{
        await Promise.all([
            loadProductsFetch()
        ]);

    } catch (error){
        console.error('Unexpected error', error);
    }
    renderTracking();
}
loadPage();

function renderTracking(){
    const url = new URL(window.location.href);
    const orderId = url.searchParams.get('orderId');
    const productId = url.searchParams.get('productId');

    const matchingProduct = products.find((product) => {
        return productId === product.id;
    });

    const matchingOrder = orders.find((order) => {
        return orderId === order.id;
    })

    const matchingOrderProduct = matchingOrder.products.find((orderProduct) => {
        return productId === orderProduct.productId;
    })

    const deliveryDateDayjs = dayjs(matchingOrderProduct.estimatedDeliveryTime);
    const estimatedDelivery = deliveryDateDayjs.format('dddd, MMMM D')

    const html = `
        <div class="order-tracking">
            <a class="back-to-orders-link link-primary" href="orders.html">
            View all orders
            </a>

            <div class="delivery-date">
            Arriving on ${estimatedDelivery}
            </div>

            <div class="product-info">
            ${matchingProduct.name}
            </div>

            <div class="product-info">
            Quantity: ${matchingOrderProduct.quantity}
            </div>

            <img class="product-image" src="${matchingProduct.image}">

            <div class="progress-labels-container">
            <div class="progress-label">
                Preparing
            </div>
            <div class="progress-label current-status">
                Shipped
            </div>
            <div class="progress-label">
                Delivered
            </div>
            </div>

            <div class="progress-bar-container">
            <div class="progress-bar"></div>
            </div>
        </div>`;

    document.querySelector('.main')
        .innerHTML = html;
}