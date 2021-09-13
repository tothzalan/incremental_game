class Session {
    constructor(name, cookies, cps, upgrades) {
        this._name = name
        this._cookies = cookies
        this._cps = cps
        this._upgrades = upgrades
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
    get upgrades() {
        return this._upgrades
    }
    set upgrades(upgrades) {
        this._upgrades = upgrades
    }
    fromJSON(obj) {
        this._name = obj._name
        this._cookies = obj._cookies
        this._cps = obj._cps
        this._upgrades = obj._upgrades
    }
}