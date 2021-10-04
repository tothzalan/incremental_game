const randomBakeryName = () => {
    let names = ["Zsuzsi", "Erzsi", "Márton", "Ági", "Zalán", "Péter", "Zoli", "Dani", "Kristóf", "Lili"]
    return names[Math.floor(Math.random() * names.length)]
}

let session = new Session(randomBakeryName(), 0, 0, [new Building("finger", 15, "autoclicks"), new Building("grandma", 100, "bakes cookies"),
    new Building("factory", 1000, "produces cookies in large quantities"), new Building("alchemy", 50000, "turns gold into cookies")])

window.onload = () => {
    session.buildings.forEach(building => {
        createBuildings(building)
    })
    changeText()
}

setInterval(() => {
    session.cookies += session.cps
    changeText()
}, 1000)

setInterval(() => {
    localStorage.setItem("session", btoa(JSON.stringify(session)))
}, 60000)

let cookieImage = false
const getCookie = () => {
    if (cookieImage)
        document.getElementById("cookieImage").src = "img/cookie.png"
    else
        document.getElementById("cookieImage").src = "img/cookie2.png"
    cookieImage = !cookieImage
    session.cookies += 1
    changeText()
}

const baseToSession = (data) => {
    data = atob(data) 
    let newSession = new Session()
    newSession.fromJSON(JSON.parse(`${data}`))
    for(let i = 0; i < newSession.buildings.length; i++) {
        let newBuilding = new Building()
        newBuilding.fromJSON(newSession.buildings[i])
        newSession.buildings[i] = newBuilding
    }
    return newSession
}

const loadProgress = () => {
    let storedSession = localStorage.getItem("session")
    session = baseToSession(storedSession) 
}
if(localStorage["session"]) {
    loadProgress()
}

const changeText = () => {
    numberText = document.getElementById("numberOfCookies")
    cPsText = document.getElementById("cookiesPerSec")
    bakeryName = document.getElementById("bakeryName")

    numberText.innerHTML = `you have ${session.cookies.toFixed(2)} cookies`
    cPsText.innerHTML = `cookies / second: ${session.cps.toFixed(2)}`
    bakeryName.innerHTML = `${session.name}'s bakery`

    session.buildings.forEach(building => {
        document.getElementById(`${building.name}Price`).innerHTML = `price: ${building.price}`
        document.getElementById(`${building.name}Owned`).innerHTML = `owned: ${building.owned}`
        if (session.cookies >= building.price) {
            document.getElementById(`${building.name}Building`).style = "background-color: gray;"
            let childNodes = document.getElementById(`${building.name}Building`).childNodes
            childNodes.forEach(node => {
                node.style = "color: #32612D; font-weight: 800"
            })
        }
    })
}

const buyAction = (buildingName) => {
    session.buildings.forEach(building => {
        if(building.name == buildingName) {
            if (session.cookies >= building.price) {
                session.cookies -= building.price
                building.price = Math.ceil(building.price * 2.5)
                building.owned += 1
                session.cps += building.price / 10
                document.getElementById(`${building.name}Owned`).innerHTML = `owned: ${building.owned}`
                document.getElementById(`${building.name}Price`).innerHTML = `price: ${building.price}`
                document.getElementById(`${building.name}Building`).style = "background-color: rgb(90,90,90);" 
                let childNodes = document.getElementById(`${building.name}Building`).childNodes
                childNodes.forEach(node => {
                    node.style = "color: yellow; font-weight: 400"
                })
            }
        }
    })
}

const createBuildings = (building) => {
    let div = document.createElement("div")
    div.classList.add("buildingItem")
    div.id = `${building.name}Building`

    let nameParagraph = document.createElement("p")
    nameParagraph.innerHTML = building.name
    div.appendChild(nameParagraph)

    let priceParagraph = document.createElement("p")
    priceParagraph.innerHTML = `price: ${building.price}`
    priceParagraph.id = `${building.name}Price`
    div.appendChild(priceParagraph)

    let descParagraph = document.createElement("p")
    descParagraph.innerHTML = building.description
    div.appendChild(descParagraph)

    let ownedParagraph = document.createElement("p")
    ownedParagraph.id = `${building.name}Owned`
    ownedParagraph.innerHTML = `owned: ${building.owned}`
    div.appendChild(ownedParagraph)

    let buyButton = document.createElement("button")
    buyButton.innerHTML = "Buy"
    buyButton.onclick = function () {
        buyAction(building.name)
        return false
    }
    div.appendChild(buyButton)

    document.getElementsByClassName("buildingBar")[0].appendChild(div)
}

const exportSave = () => {
    window.prompt("Copy the following data", btoa(JSON.stringify(session)))
}

const importSave = () => {
    let data = window.prompt("Paste in the exported data")
    if(data.trim().length == 0) {
        alert("Please paste in something")
    } else {
        session = baseToSession(data) 
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

const resetProgress = () => {
    if(window.confirm("Do you really want to reset?")) {
        session = new Session(session.name, 0, 0, [new Building("finger", 15, "autoclicks"), new Building("grandma", 100, "bakes cookies"),
            new Building("factory", 1000, "produces cookies in large quantities"), new Building("alchemy", 50000, "turns gold into cookies")])
        localStorage.clear()
    }
}

let buildingsHidden = false
const toggleBuildings = () => {
    document.getElementsByClassName("buildingBar")[0].style = `display: ${buildingsHidden ? "visible" : "none"}`
    buildingsHidden = !buildingsHidden
}

let statsHidden = false 
const toggleStats = () => {
    document.getElementsByClassName("statsBar")[0].style = `display: ${statsHidden ? "visible" : "none"}`
    statsHidden = !statsHidden
}