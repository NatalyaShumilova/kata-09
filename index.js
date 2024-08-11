
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
                const discounted = Math.floor(count/special.units) * special.price;
                const unit = count%special.units * unitPrice;
                this.total += discounted + unit;
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