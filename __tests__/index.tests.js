const CheckOut = require("../index");

const rules = [
    {item: "A", unitPrice: 50, specialPrice: {units: 3, price: 130}},
    {item: "B", unitPrice: 30, specialPrice: {units: 2, price: 45}},
    {item: "C", unitPrice: 20},
    {item: "D", unitPrice: 15}
];

describe("CheckOut", () => {
    it("returns 0 given empty shopping cart", () => {
        const co = new CheckOut(rules);
        co.scan("");
        expect(co.total).toBe(0);
    })
})