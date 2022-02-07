import {soundData} from "./sounds.js";

let soundContainer = document.querySelector(".sound-container");
const favoriteSoundsBtn = document.querySelector(".favorite-sounds-btn");
const allSoundsBtn = document.querySelector(".all-sounds-btn");
let audio = null;

let favSoundsArr = [...soundData];

// RENDER SOUND BUTTON
function renderSoundBtn(sound, index, arr) {
  const soundBtn = document.createElement("div");
  soundBtn.classList.add("sound-btn");
  soundBtn.textContent = sound.name;

  const soundProgress = document.createElement("progress");
  soundProgress.style.width = "100%";
  soundProgress.max = "100";
  soundProgress.value = "0";
  soundProgress.classList.add("sound-progress");

  soundBtn.appendChild(soundProgress);

  soundBtn.addEventListener("mousedown", () => mouseDown(sound));
  // soundBtn.addEventListener("ontouchstart", () => mouseDown(sound));
  soundBtn.addEventListener("mouseup", () => mouseUp());
  // soundBtn.addEventListener("ontouchend", () => mouseUp());
  sound.isFavorite && soundBtn.classList.add("sound-favorite");
  soundBtn.addEventListener("click", () => playSound(soundBtn, arr, sound));
  soundContainer.appendChild(soundBtn);
}

// LONG HOLD TO FAVORITE
let timer = null;
const tempo = 1000;
const mouseDown = (sound) => {
  timer = setTimeout(() => {
    favSoundsArr = favSoundsArr.map((item) => {
      return item.id === sound.id
        ? {
            ...item,
            isFavorite: !item.isFavorite,
          }
        : item;
    });
    renderSoundContainer(favSoundsArr);
    console.log(favSoundsArr);
  }, tempo);
};
const mouseUp = () => {
  clearTimeout(timer);
};

// RENDER SOUND CONTAINER
function renderSoundContainer(arr) {
  if (arr.length) {
    soundContainer.innerHTML = "";
    arr.forEach((sound, index, arr) =>
      renderSoundBtn(sound, index, arr, sound.id)
    );
  } else {
    soundContainer.innerHTML = `
    <div class="no-favorites-text">No favorites yet. Press and hold a sound to save them as favorite.</div>
    <p class="no-favorites-icon"><i class="fas fa-exclamation-triangle"></i></p>
    `;
  }
}
renderSoundContainer(soundData);

// RENDER ALL SOUNDS
allSoundsBtn.addEventListener("click", () =>
  renderSoundContainer(favSoundsArr)
);

// RENDER FAVORITE SOUNDS
favoriteSoundsBtn.addEventListener("click", () => {
  const favoriteSounds = favSoundsArr.filter((sound) => sound.isFavorite);
  console.log(favoriteSounds);
  renderSoundContainer(favoriteSounds);
});

//PLAY SOUND
function playSound(soundBtn, arr, sound) {
  let durationTime = null;

  if (audio === null) {
    audio = new Audio(arr[sound.id - 1].url);
    audio.play();
    soundBtn.classList.add("active");
    durationTime = setInterval(() => {
      document.querySelector(".active progress").value = Math.ceil(
        (audio.currentTime / audio.duration) * 100
      );
      console.log(parseInt(document.querySelector(".active progress").value));
    }, 10);
  } else if (!soundBtn.classList.contains("active")) {
    audio.pause();
    audio.currentTime = 0;
    for (let btn of document.querySelectorAll(".sound-btn")) {
      btn.classList.remove("active");
    }
    for (let progressBar of document.querySelectorAll(".active progress")) {
      progressBar.value = "0";
    }

    audio = new Audio(soundData[sound.id - 1].url);
    soundBtn.classList.add("active");
    audio.play();
  } else if (!audio.paused) {
    audio.pause();
  } else {
    audio.play();
  }
  console.log(audio.duration);
  console.log(audio.currentTime);
  soundEnd(soundBtn, audio, durationTime);
}

// SOUND END
function soundEnd(soundBtn, audio, durationTime) {
  audio.onended = () => {
    clearInterval(durationTime);
    document.querySelector(".active progress").value = "0";
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

// GRID CONTROL
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
