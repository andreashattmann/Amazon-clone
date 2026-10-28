//Default import
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

export const deliveryOptions = [{
    id: '1',
    deliveryDays: 7,
    priceCents: 0
}, {
    id: '2',
    deliveryDays: 3,
    priceCents: 499,
}, {
    id: '3',
    deliveryDays: 1,
    priceCents: 999
}];
function isWeekend(date){
    const dateformat = date.format('dddd');
    return dateformat === 'Saturday' || dateformat === 'Sunday';
}

export function calculateDeliveryDate(deliveryOption){
    let remainingDays = deliveryOption.deliveryDays;
    let deliveryDate = dayjs();

    while(remainingDays > 0){
        deliveryDate = deliveryDate.add(1, 'days');
        if(!isWeekend(deliveryDate)){
            remainingDays--;
        }
    }

    return deliveryDate.format('dddd, MMMM D');
}