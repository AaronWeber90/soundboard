import {soundData} from "./sounds.js"

const allBtn = document.querySelectorAll(".btn")

function playSound(i) {
    let audioVar = new Audio(soundData[i].url)
    // audioVar.load()
    audioVar.play()
    toggleDisable(1)
    console.log(audioVar)
    soundEnd(audioVar, i)
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



//const catAudio = new Audio("../sounds/meow.mp3")
// const duration = catAudio.duration;
/*
for (let i = 0; i < allBtn.length; i++) {
    let audioVar = new Audio(allSounds[i])
    allBtn[i].addEventListener("click", function playSound() {
  //      for (let btn of allBtn) {
   //         btn.disabled = true
   //         currentTime = 0;
     //   } 
        console.log("hi")
        audioVar.load()
        audioVar.play()
        console.log(audioVar)
    })
}

stopBtn.addEventListener("click", () => {
    catAudio.pause()
    console.log("STOP")
})
*/