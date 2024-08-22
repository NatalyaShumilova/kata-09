
class CheckOut {
    constructor(rules) {
        this.total = 0;
        this.rules = rules;
        this.scanned = Object.fromEntries(Object.keys(rules).map(k => [k, 0]));
    }

    refreshTotal() {
        this.total = 0;

        Object.entries(this.scanned).forEach(([item, count]) => {

            const specials = this.rules[item].specialPrice?.sort((a, b) => b.units - a.units);
            const unitPrice = this.rules[item].unitPrice;
            if(!specials || count < specials[specials.length - 1].units) {
                this.total += count * unitPrice;
            } else {
                let remainingCount = count // the items we haven't counted

                specials.forEach(s => { 
                    if (remainingCount >= s.units) {
                        const numberOfDiscounts = Math.floor(remainingCount/s.units)
                        remainingCount -= s.units * numberOfDiscounts;
                        this.total += numberOfDiscounts * s.price;
                    }
                })
                
                const unitCost = remainingCount * unitPrice;
                this.total += unitCost;
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