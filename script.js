class Upgrade {
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
}

let upgrades = [new Upgrade("finger", 15, "autoclicks"), new Upgrade("grandma", 100, "bakes cookies"),
new Upgrade("factory", 1000, "produces cookies in large quantities"), new Upgrade("alchemy", 50000, "turns gold into cookies")]


let cookies = 0
let cps = 0

setInterval(() => {
    cookies += cps
    changeText()
}, 1000)

let cookieImage = false;
const getCookie = () => {
    if (cookieImage)
        document.getElementById("cookieImage").src = "img/cookie.png"
    else
        document.getElementById("cookieImage").src = "img/cookie2.png"
    cookieImage = !cookieImage
    cookies += 1
    changeText()
}

const changeText = () => {
    numberText = document.getElementById("numberOfCookies")
    cPsText = document.getElementById("cookiesPerSec")

    numberText.innerHTML = `you have ${cookies.toFixed(2)} cookies`
    cPsText.innerHTML = `cookies / second: ${cps.toFixed(2)}`

    upgrades.forEach(obj => {
        if(cookies >= obj.price)
            document.getElementById(`${obj.name}Upgrade`).style = "background-color: gray"
    })
}



const buyAction = (obj) => {
    if (cookies > obj.price) {
        cookies -= obj.price
        obj.price = Math.ceil(obj.price * 2.5)
        obj.owned += 1
        cps += obj.price / 10
        document.getElementById(`${obj.name}Owned`).innerHTML = `owned: ${obj.owned}`
        document.getElementById(`${obj.name}Price`).innerHTML = `price: ${obj.price}`
        document.getElementById(`${obj.name}Upgrade`).style = "background-color: rgb(90,90,90)"
    }
}

const createUpgrades = (obj) => {
    let div = document.createElement("div")
    div.classList.add("upgradeItem")
    div.id = `${obj.name}Upgrade`

    let nameParagraph = document.createElement("p")
    nameParagraph.innerHTML = obj.name
    div.appendChild(nameParagraph)

    let priceParagraph = document.createElement("p")
    priceParagraph.innerHTML = `price: ${obj.price}`
    priceParagraph.id = `${obj.name}Price`
    div.appendChild(priceParagraph)

    let descParagraph = document.createElement("p")
    descParagraph.innerHTML = obj.description
    div.appendChild(descParagraph)

    let ownedParagraph = document.createElement("p")
    ownedParagraph.id = `${obj.name}Owned`
    ownedParagraph.innerHTML = "owned: 0"
    div.appendChild(ownedParagraph)

    let buyButton = document.createElement("button")
    buyButton.innerHTML = "Buy"
    buyButton.onclick = function () {
        buyAction(obj)
        return false
    }
    div.appendChild(buyButton)

    document.getElementsByClassName("upgradeBar")[0].appendChild(div)
}


window.onload = () => {
    upgrades.forEach(element => {
        createUpgrades(element)
    })
}