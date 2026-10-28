import { formatPrice } from "../script/utils/money.js";
//Automated Testing
console.log('Converts cents into dollars');
if(formatPrice(2095) === '20.95'){
    console.log('passed');
} else{
    console.log('failed');
}

console.log('Tests with number 0');
if(formatPrice(0) === '0.00'){
    console.log('passed');
} else{
    console.log('failed');
}

console.log('Rounding up from .5')
if(formatPrice(2000.5) === '20.01'){
    console.log('passed');
} else{
    console.log('failed');
}
