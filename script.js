const randomBakeryName = () => {
    let names = ["Zsuzsi", "Erzsi", "Márton", "Ági", "Zalán", "Péter", "Zoli", "Dani", "Kristóf", "Lili"]
    return names[Math.floor(Math.random() * names.length)]
}

let session = new Session(randomBakeryName(), 0, 0, [new Upgrade("finger", 15, "autoclicks"), new Upgrade("grandma", 100, "bakes cookies"),
    new Upgrade("factory", 1000, "produces cookies in large quantities"), new Upgrade("alchemy", 50000, "turns gold into cookies")])

window.onload = () => {
    session.upgrades.forEach(element => {
        createUpgrades(element)
    })
    changeText()
}

setInterval(() => {
    session.cookies += session.cps
    changeText()
}, 1000)

let cookieImage = false;
const getCookie = () => {
    if (cookieImage)
        document.getElementById("cookieImage").src = "img/cookie.png"
    else
        document.getElementById("cookieImage").src = "img/cookie2.png"
    cookieImage = !cookieImage
    session.cookies += 1
    changeText()
}

const changeText = () => {
    numberText = document.getElementById("numberOfCookies")
    cPsText = document.getElementById("cookiesPerSec")
    bakeryName = document.getElementById("bakeryName")

    numberText.innerHTML = `you have ${session.cookies.toFixed(2)} cookies`
    cPsText.innerHTML = `cookies / second: ${session.cps.toFixed(2)}`
    bakeryName.innerHTML = `${session.name}'s bakery`

    session.upgrades.forEach(obj => {
        document.getElementById(`${obj.name}Price`).innerHTML = `price: ${obj.price}`
        document.getElementById(`${obj.name}Owned`).innerHTML = `owned: ${obj.owned}`
        if (session.cookies >= obj.price)
            document.getElementById(`${obj.name}Upgrade`).style = "background-color: gray"
    })
}

const buyAction = (objName) => {
    session.upgrades.forEach(obj => {
        if(obj.name == objName) {
            if (session.cookies >= obj.price) {
                session.cookies -= obj.price
                obj.price = Math.ceil(obj.price * 2.5)
                obj.owned += 1
                session.cps += obj.price / 10
                document.getElementById(`${obj.name}Owned`).innerHTML = `owned: ${obj.owned}`
                document.getElementById(`${obj.name}Price`).innerHTML = `price: ${obj.price}`
                document.getElementById(`${obj.name}Upgrade`).style = "background-color: rgb(90,90,90)"
            }
        }
    })
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
    ownedParagraph.innerHTML = `owned: ${obj.owned}`
    div.appendChild(ownedParagraph)

    let buyButton = document.createElement("button")
    buyButton.innerHTML = "Buy"
    buyButton.onclick = function () {
        buyAction(obj.name)
        return false
    }
    div.appendChild(buyButton)

    document.getElementsByClassName("upgradeBar")[0].appendChild(div)
}

const exportSave = () => {
    window.prompt("Copy the following data", btoa(JSON.stringify(session)))
}

const importSave = () => {
    let data = window.prompt("Paste in the exported data")
    if(data.trim().length == 0) {
        alert("Please paste in something")
    } else {
        data = atob(data)
        let newSession = new Session()
        newSession.fromJSON(JSON.parse(`${data}`))
        for(let i = 0; i < newSession.upgrades.length; i++) {
            let newUpgrade = new Upgrade()
            newUpgrade.fromJSON(newSession.upgrades[i])
            newSession.upgrades[i] = newUpgrade
        }
        session = newSession
    }
}

const changeName = () => {
    let data = window.prompt("What should your bakery's name be?")
    if(data.trim().length == 0) {
        alert("Please enter something")
    } else {
        session.name = data
        changeText()
    }
}