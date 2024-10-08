require("jest");
const CheckOut = require("../index");

const rules = {
   A: {unitPrice: 50, specialPrice: [{units: 3, price: 130}, {units: 5, price: 100}]},
   B: {unitPrice: 30, specialPrice: [{units: 2, price: 45}]},
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

    it("returns correct sum given repeating items", () => {
        const co = new CheckOut(rules);
        co.scan("AA");
        expect(co.total).toBe(100);
        co.scan("A");
        expect(co.total).toBe(130);
        co.scan("A");
        expect(co.total).toBe(180);
        co.scan("A");
        expect(co.total).toBe(100);
        co.scan("A");
        expect(co.total).toBe(150);
        co.scan("A");
        expect(co.total).toBe(200);
        co.scan("A");
        expect(co.total).toBe(230);
    })

    it("returns correct sum given multiple repeating items", () => {
        const co1 = new CheckOut(rules);
        co1.scan("AAAB");
        expect(co1.total).toBe(160);
        co1.scan("B");
        expect(co1.total).toBe(175);
        co1.scan("D");
        expect(co1.total).toBe(190);

        const co2 = new CheckOut(rules);
        co2.scan("DABABA");
        expect(co2.total).toBe(190);
    })

    it("returns correct sum after every scanned item", () => {
        const co = new CheckOut(rules);
        co.scan("A");
        expect(co.total).toBe(50);
        co.scan("B");
        expect(co.total).toBe(80);
        co.scan("A");
        expect(co.total).toBe(130);
        co.scan("A");
        expect(co.total).toBe(160);
        co.scan("B");
        expect(co.total).toBe(175);
    })

    it("returns the correct sun given multiple discounts", () => {
        const co = new CheckOut(rules);
        co.scan("AAA");
        expect(co.total).toBe(130);
        co.scan("AA");
        expect(co.total).toBe(100)
    })
})