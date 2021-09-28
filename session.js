class Session {
    constructor(name, cookies, cps, buildings) {
        this._name = name
        this._cookies = cookies
        this._cps = cps
        this._buildings = buildings 
    }
    get name() {
        return this._name
    }
    set name(name) {
        this._name = name
    }
    get cookies() {
        return this._cookies
    }
    set cookies(cookies) {
        this._cookies = cookies
    }
    get cps() {
        return this._cps
    }
    set cps(cps) {
        this._cps = cps
    }
    get buildings() {
        return this._buildings
    }
    set buildings(buildings) {
        this._buildings = buildings 
    }
    fromJSON(obj) {
        this._name = obj._name
        this._cookies = obj._cookies
        this._cps = obj._cps
        this._buildings = obj._buildings
    }
}