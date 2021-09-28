class Building {
    constructor(name, price, description) {
        this._name = name
        this._price = price
        this._description = description
        this._owned = 0
    }
    get name() {
        return this._name
    }
    set name(name) {
        this._name = name
    }
    get price() {
        return this._price
    }
    set price(price) {
        this._price = price
    }
    get description() {
        return this._description
    }
    get owned() {
        return this._owned
    }
    set owned(owned) {
        this._owned = owned
    }
    fromJSON(obj) {
        this._name = obj._name
        this._price = obj._price
        this._description = obj._description
        this._owned = obj._owned
    }
}