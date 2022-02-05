import {soundData} from "./sounds.js";

let soundContainer = document.querySelector(".sound-container");
const favoriteSoundsBtn = document.querySelector(".favorite-sounds-btn");
const allSoundsBtn = document.querySelector(".all-sounds-btn");
let audio = null;

let favSoundsArr = [];

// RENDER SOUND BUTTON
function renderSoundBtn(sound, index, arr) {
  const soundBtn = document.createElement("div");
  // const soundBtnTop = document.createElement("div");
  // const soundBtnBottom = document.createElement("div");
  soundBtn.classList.add("sound-btn");
  soundBtn.textContent = sound.name;

  const favoriteIconEl = document.createElement("div");
  favoriteIconEl.textContent = sound.isFavorite ? "❤️" : "🤍";
  favoriteIconEl.classList.add("favorite-sound-icon");
  favoriteIconEl.addEventListener("mousedown", () => mouseDown(sound));
  favoriteIconEl.addEventListener("mouseup", () => mouseUp());

  sound.isFavorite && soundBtn.classList.add("sound-favorite");
  soundBtn.appendChild(favoriteIconEl);
  soundBtn.addEventListener("click", () => playSound(soundBtn, arr, sound));
  soundContainer.appendChild(soundBtn);
}

let timer = null;
const tempo = 1000;
const mouseDown = (sound) => {
  timer = setTimeout(() => {
    favSoundsArr = soundData.map((item) => {
      return item.id === sound.id
        ? {
            ...item,
            isFavorite: !item.isFavorite,
          }
        : item;
    });
    console.log(favSoundsArr);

    // console.log({
    //   ...sound,
    //   isFavorite: !sound.isFavorite,
    // });
    // return {
    //   ...sound,
    //   isFavorite: !sound.isFavorite,
    // };
  }, tempo);
};
const mouseUp = () => {
  clearTimeout(timer);
};

// RENDER SOUND CONTAINER
function renderSoundContainer(arr) {
  soundContainer.innerHTML = "";
  arr.forEach((sound, index, arr) =>
    renderSoundBtn(sound, index, arr, sound.id)
  );
}
renderSoundContainer(soundData);

// RENDER ALL SOUNDS
allSoundsBtn.addEventListener("click", () => renderSoundContainer(soundData));

// RENDER FAVORITE SOUNDS
favoriteSoundsBtn.addEventListener("click", () => {
  const favoriteSounds = favSoundsArr.filter((sound) => sound.isFavorite);
  renderSoundContainer(favoriteSounds);
});

//PLAY SOUND
function playSound(soundBtn, arr, sound) {
  if (audio === null) {
    audio = new Audio(arr[sound.id - 1].url);
    audio.play();
    soundBtn.classList.add("active");
  } else if (!soundBtn.classList.contains("active")) {
    audio.pause();
    audio.currentTime = 0;
    for (let btn of document.querySelectorAll(".sound-btn")) {
      btn.classList.remove("active");
    }
    audio = new Audio(soundData[sound.id - 1].url);
    soundBtn.classList.add("active");
    audio.play();
  } else if (!audio.paused) {
    audio.pause();
  } else {
    audio.play();
  }
  soundEnd(soundBtn, audio);
}

// SOUND END
function soundEnd(soundBtn, audio) {
  audio.onended = () => {
    soundBtn.classList.remove("active");
  };
}

// MENU LOGIC
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

// VOLUME LOGIC
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
