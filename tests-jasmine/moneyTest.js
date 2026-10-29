import { formatPrice } from "../script/utils/money.js";

describe('test suite: formatprice', () => {
    it('converts cents into dollar',  () => {
        expect(formatPrice(2095)).toEqual('20.95');
    });

    it('works with 0', () => {
        expect(formatPrice(0)).toEqual('0.00');
    });

    it('rounds up', () => {
        expect(formatPrice(2000.5)).toEqual('20.01');
    });
});
