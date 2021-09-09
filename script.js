let cookies = 0
let cps = 0 

let fingerPrice = 15
let fingersOwned = 0

let grandmaPrice = 100
let grandmasOwned = 0

let factoryPrice = 1000
let factoriesOwned = 0

let alchemyPrice = 50000
let alchemyOwned = 0

setInterval(() => { 
    cookies += cps
    changeText()
}, 1000)

const getCookie = () => {
    cookies += 1 
    changeText()
}

const changeText = () => {
    numberText = document.getElementById("numberOfCookies")
    cPsText = document.getElementById("cookiesPerSec")

    numberText.innerHTML = `you have ${cookies.toFixed(2)} cookies`
    cPsText.innerHTML = `cookies / second: ${cps}`

    if(cookies >= fingerPrice)
        document.getElementById("fingerUpgrade").style = "background-color: gray"
    if(cookies >= grandmaPrice)
        document.getElementById("grandmaUpgrade").style = "background-color: gray"
    if(cookies >= factoryPrice)
        document.getElementById("factoryUpgrade").style = "background-color: gray"
    if(cookies >= alchemyPrice)
        document.getElementById("alchemyUpgrade").style = "background-color: gray"
}

const buyFinger = () => {
    if(cookies >= fingerPrice) {
        fingersOwned += 1
        cookies -= fingerPrice
        fingerPrice = Math.ceil(fingerPrice * 1.5)
        cps += 0.2
        changeText()
        document.getElementById("fingerPrice").innerHTML = `price: ${fingerPrice}`
        document.getElementById("fingerOwned").innerHTML = `owned: ${fingersOwned}`
        document.getElementById("fingerUpgrade").style = "background-color: rgb(90,90,90)"
    }
} 
const buyGrandma = () => {
    if(cookies >= grandmaPrice) {
        grandmasOwned += 1
        cookies -= grandmaPrice
        grandmaPrice = Math.ceil(grandmaPrice * 2)
        cps += 1
        changeText()
        document.getElementById("grandmaPrice").innerHTML = `price: ${grandmaPrice}`
        document.getElementById("grandmaOwned").innerHTML = `owned: ${grandmasOwned}`
        document.getElementById("grandmaUpgrade").style = "background-color: rgb(90,90,90)"
    }
}
const buyFactory = () => {
    if(cookies >= factoryPrice) {
        factoriesOwned += 1
        cookies -= factoryPrice 
        factoryPrice = Math.ceil(factoryPrice * 1.5)
        cps += 10
        changeText()
        document.getElementById("factoryPrice").innerHTML = `price: ${factoryPrice}`
        document.getElementById("factoryOwned").innerHTML = `owned: ${factoriesOwned}`
        document.getElementById("factoryUpgrade").style = "background-color: rgb(90,90,90)"
    }
} 
const buyAlchemy = () => {
    if(cookies >= alchemyPrice) {
        alchemyOwned += 1
        cookies -= alchemyPrice 
        alchemyPrice = Math.ceil(alchemyPrice * 2)
        cps += 100
        changeText()
        document.getElementById("alchemyPrice").innerHTML = `price: ${alchemyPrice}`
        document.getElementById("alchemyOwned").innerHTML = `owned: ${alchemyOwned}`
        document.getElementById("alchemyUpgrade").style = "background-color: rgb(90,90,90)"
    }
}