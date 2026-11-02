import { formatPrice } from "../../script/utils/money.js";

describe('test suite: formatPrice', () => {
    it('converts cents into dollar',  () => {
        expect(formatPrice(2095)).toEqual('20.95');
    });

    it('works with 0', () => {
        expect(formatPrice(0)).toEqual('0.00');
    });

    it('rounds up', () => {
        expect(formatPrice(2000.5)).toEqual('20.01');
    });

    it('rounds down', () => {
        expect(formatPrice(2000.4)).toEqual('20.00');
    });

    it('works with negative number', () => {
        expect(formatPrice(-2000)).toEqual('-20.00');
    });
});
