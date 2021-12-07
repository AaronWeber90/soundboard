import {soundData} from "./sounds.js"
import {quotes} from "./quotes.js"

console.log(quotes)

const allBtn = document.querySelectorAll(".btn")

function playSound(i) {
    let audioVar = new Audio(soundData[i].url)
    // audioVar.load()
    audioVar.play()
    toggleDisable(1)
    soundEnd(audioVar, i)
    changeVolume(audioVar)
    volumeInput.addEventListener("change", () => changeVolume(audioVar))
}

function showActive(i) {
    allBtn[i].classList.add("active")
}

function toggleDisable(disabledVar) {
    for (let btn of allBtn) {
    btn.disabled = disabledVar
    }
}

function soundEnd(audioVar, i) {
    audioVar.onended = () => {
    console.log("SOUND END")
    toggleDisable(0)
    allBtn[i].classList.remove("active")
    }
}

for (let i= 0; i < allBtn.length; i++) {
    allBtn[i].addEventListener("click", function() {
        playSound(i)
        showActive(i)
    })
}

const navbtn = document.getElementById("nav-btn")
const menuEl = document.querySelector(".menu-container")
navbtn.addEventListener("click", () => {
    menuEl.classList.toggle("menu-closed")
    if (menuEl.classList.contains("menu-closed")) {
        navbtn.innerHTML = `<i class="fas fa-bars"></i>`
        document.body.style.overflow = "auto"
    } else {
        navbtn.innerHTML = `<i class="fas fa-times"></i>`
        document.body.style.overflow = "hidden"
    }
})

const gridSizeInput = document.getElementById("grid-size")
const gridSizeLabel = document.getElementById("grid-size-label")
const soundContainer = document.querySelector(".sound-container")
gridSizeInput.addEventListener("change", () => {
    let gridVar = ""
    gridSizeLabel.textContent = "Grid Size: " + gridSizeInput.value
    switch (gridSizeInput.value) {
        case "1":
            gridVar = "1"
            break;
        case "2":
            gridVar = "2" 
            break;
        case "3":
            gridVar = "3"
            break;
    }   
    soundContainer.style.gridTemplateColumns = `repeat(${gridVar}, 1fr)` 
})


const volumeInput = document.getElementById("audio-volume")
const volumeLabel = document.getElementById("audio-volume-label")

function changeVolume(audioVar) {
    audioVar.volume = volumeInput.value / 10
    volumeLabel.textContent = "Volume: " + volumeInput.value
}


function randomQuote() {
    const quoteContainer = document.querySelector(".quote-container")
    const rndNum = Math.floor(Math.random() * quotes.length)
    quoteContainer.innerHTML = ` <p class="quote-text">${quotes[rndNum].quote}</p><p class="quote-owner">- ${quotes[rndNum].owner}</p>`
}
randomQuote()


// TOGGLE THEME
const darkThemeBtn = document.querySelector(".dark-theme-btn")
const lightThemeBtn = document.querySelector(".light-theme-btn")

darkThemeBtn.addEventListener("click", () => {
    document.documentElement.className = "dark-theme";
})

lightThemeBtn.addEventListener("click", () => {
    document.documentElement.className = "light-theme";
})