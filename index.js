import {soundData} from "./sounds.js";

const soundContainer = document.querySelector(".sound-container");
// const favoriteSoundsBtn = document.querySelector(".favorite-sounds-btn");
const allSoundsBtn = document.querySelector(".all-sounds-btn");
let audio = "";

// RENDER SOUND BTN
function renderAllSounds() {
  const allSoundBtn = soundData
    .map(
      (item) =>
        `<button class="${
          item.isFavorite ? "sound-btn sound-favorite" : "sound-btn"
        }">${item.name}</button>`
    )
    .join("");
  soundContainer.innerHTML = allSoundBtn;
}
renderAllSounds();

allSoundsBtn.addEventListener("click", () => {
  renderAllSounds();
  addSound();
});

// RENDER FAVORITE SOUNDS
// function renderFavoriteSounds() {
//   const favoriteSounds = soundData
//     .map((item) => {
//       return item.isFavorite
//         ? `<button class="sound-btn sound-favorite">${item.name}</button>`
//         : null;
//     })
//     .join("");
//   soundContainer.innerHTML = favoriteSounds;
// }
// favoriteSoundsBtn.addEventListener("click", () => {
//   renderFavoriteSounds();
//   addSound();
// });

// ADD SOUNDS
function addSound() {
  const allBtn = document.getElementsByClassName("sound-btn");
  for (let i = 0; i < allBtn.length; i++) {
    allBtn[i].addEventListener("click", function () {
      playSound(i, allBtn);
    });
  }
}
addSound();

//PLAY SOUND
function playSound(i, allBtn) {
  if (audio === "") {
    audio = new Audio(soundData[i].url);
    audio.play();
    allBtn[i].classList.add("active");
  } else if (!allBtn[i].classList.contains("active")) {
    audio.pause();
    audio.currentTime = 0;
    for (let btn of allBtn) {
      btn.classList.remove("active");
    }
    audio = new Audio(soundData[i].url);
    allBtn[i].classList.add("active");
    audio.play();
  } else if (!audio.paused) {
    audio.pause();
  } else {
    audio.play();
  }

  volumeInput.addEventListener("change", () => changeVolume(audio));
  soundEnd(audio, i, allBtn);
}

// SOUND END
function soundEnd(audioVar, i, allBtn) {
  audioVar.onended = () => {
    allBtn[i].classList.remove("active");
  };
}

const navbtn = document.getElementById("nav-btn");
const menuEl = document.querySelector(".menu-container");
navbtn.addEventListener("click", () => {
  menuEl.classList.toggle("menu-closed");
  if (menuEl.classList.contains("menu-closed")) {
    navbtn.innerHTML = `<i class="fas fa-bars"></i>`;
    document.body.style.overflow = "auto";
  } else {
    navbtn.innerHTML = `<i class="fas fa-times"></i>`;
    document.body.style.overflow = "hidden";
  }
});

const gridSizeInput = document.getElementById("grid-size");
const gridSizeLabel = document.getElementById("grid-size-label");

gridSizeInput.addEventListener("change", () => {
  let gridVar = "";
  gridSizeLabel.textContent = "Grid Size: " + gridSizeInput.value;
  switch (gridSizeInput.value) {
    case "1":
      gridVar = "1";
      break;
    case "2":
      gridVar = "2";
      break;
    case "3":
      gridVar = "3";
      break;
  }
  soundContainer.style.gridTemplateColumns = `repeat(${gridVar}, 1fr)`;
});

const volumeInput = document.getElementById("audio-volume");
const volumeLabel = document.getElementById("audio-volume-label");

function changeVolume(audioVar) {
  audioVar.volume = volumeInput.value / 10;
  volumeLabel.textContent = "Volume: " + volumeInput.value;
}

// TOGGLE THEME
const darkThemeBtn = document.querySelector(".dark-theme-btn");
const lightThemeBtn = document.querySelector(".light-theme-btn");

darkThemeBtn.addEventListener("click", () => {
  document.documentElement.className = "dark-theme";
});

lightThemeBtn.addEventListener("click", () => {
  document.documentElement.className = "light-theme";
});

//AUDIO SPEED
