
class CheckOut {
    constructor(rules) {
        this.total = 0;
        this.rules = rules;
    }

    scan(items) {
        [...items].forEach(i => {
            this.total += this.rules[i].unitPrice
        })
    }
     
} 

module.exports = CheckOut;