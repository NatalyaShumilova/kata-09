
class CheckOut {
    constructor(rules) {
        this.total = 0;
        this.rules = rules;
        this.scanned = Object.fromEntries(Object.keys(rules).map(k => [k, 0]));
    }

    refreshTotal() {
        this.total = 0;

        Object.entries(this.scanned).forEach(([item, count]) => {

            const special = this.rules[item].specialPrice;
            const unitPrice = this.rules[item].unitPrice;

            if(!special || count < special.units) {
                this.total += count * unitPrice;
            } else {
                const specialCost = Math.floor(count/special.units) * special.price;
                const unitCost = count%special.units * unitPrice;
                this.total += specialCost + unitCost;
            }
        })
    }

    scan(items) {
        [...items].forEach(i => {
            this.scanned[i] ++;
        })
        this.refreshTotal();
    }
     
} 

module.exports = CheckOut;