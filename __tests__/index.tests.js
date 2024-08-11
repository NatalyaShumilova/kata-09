const CheckOut = require("../index");

const rules = {
   A: {unitPrice: 50, specialPrice: {units: 3, price: 130}},
   B: {unitPrice: 30, specialPrice: {units: 2, price: 45}},
   C: {unitPrice: 20},
   D: {unitPrice: 15}
};

describe("CheckOut", () => {
    it("returns 0 given empty shopping cart", () => {
        const co = new CheckOut(rules);
        co.scan("");
        expect(co.total).toBe(0);
    })

    it("returns correct sum given unique items", () => {
        const co1 = new CheckOut(rules);
        co1.scan("A");
        expect(co1.total).toBe(50);

        const co2 = new CheckOut(rules);
        co2.scan("AB");
        expect(co2.total).toBe(80);

        const co3 = new CheckOut(rules);
        co3.scan("CDBA");
        expect(co3.total).toBe(115);
    })
})