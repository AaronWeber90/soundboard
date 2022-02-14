import {soundData} from "./sounds.js";

let soundContainer = document.querySelector(".sound-container");
const favoriteSoundsBtn = document.querySelector(".favorite-sounds-btn");
const allSoundsBtn = document.querySelector(".all-sounds-btn");

let audio = null;
let soundsArr = [...soundData];
let favSoundsArr = [];
let showFavoriteSounds = false;
let volume = 0.9;

// RENDER SOUND BUTTON
function renderSoundBtn(sound, index, arr) {
  const soundBtn = document.createElement("div");
  soundBtn.classList.add("sound-btn");
  soundBtn.textContent = sound.name;
  const soundStatusEl = document.createElement("div");
  soundStatusEl.classList.add("sound-status");
  soundBtn.appendChild(soundStatusEl);

  const soundProgress = document.createElement("progress");
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
    if (showFavoriteSounds) {
      favSoundsArr = favSoundsArr.map((item) => {
        return item.id === sound.id
          ? {
              ...item,
              isFavorite: !item.isFavorite,
            }
          : item;
      });
      soundsArr = soundsArr.map((item) => {
        return item.id === sound.id
          ? {
              ...item,
              isFavorite: !item.isFavorite,
            }
          : item;
      });
      favSoundsArr = favSoundsArr.filter((item) => item.isFavorite);
      renderSoundContainer(favSoundsArr);
    } else {
      soundsArr = soundsArr.map((item) => {
        return item.id === sound.id
          ? {
              ...item,
              isFavorite: !item.isFavorite,
            }
          : item;
      });
      favSoundsArr = soundsArr.filter((item) => item.isFavorite);
      renderSoundContainer(soundsArr);
    }
    console.log(soundsArr);
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
    <div class="no-favorites-text">No favorites. Press and hold a sound to save them as favorite.</div>
    <p class="no-favorites-icon"><i class="fas fa-exclamation-triangle"></i></p>
    `;
  }
}
renderSoundContainer(soundData);

// RENDER ALL SOUNDS
allSoundsBtn.addEventListener("click", () => {
  showFavoriteSounds = false;
  renderSoundContainer(soundsArr);
});

// RENDER FAVORITE SOUNDS
favoriteSoundsBtn.addEventListener("click", () => {
  showFavoriteSounds = true;
  // const favoriteSounds = favSoundsArr.map((sound) => sound.isFavorite);
  // console.log(favoriteSounds);
  renderSoundContainer(favSoundsArr);
});

//PLAY SOUND
function playSound(soundBtn, arr, sound) {
  // START AUDIO
  if (audio === null) {
    audio = new Audio(arr[sound.id - 1].url);
    audio.volume = volume;
    audio.play();
    soundBtn.classList.add("active");
    setSoundStatus(sound.id, '<i class="fas fa-pause-circle"></i>');
    durationTimeNew();

    // let durationTime = null;
    // let durationTime = setInterval(() => {
    //   document.querySelector(".active .sound-progress").value = Math.ceil(
    //     (audio.currentTime / audio.duration) * 100
    //   );
    //   console.log(parseInt(document.querySelector(".active progress").value));
    // soundEnd(soundBtn, audio, durationTime);
    // console.log(durationTime);
    // }, 10);

    // START NEXT AUDIO WHILE ACTIVE SOUND
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
    audio.volume = volume;
    audio.play();
    setSoundStatus(sound.id, '<i class="fas fa-pause-circle"></i>');
    // PAUSE ACTIVE AUDIO
  } else if (!audio.paused) {
    audio.pause();
    setSoundStatus(sound.id, '<i class="fas fa-play-circle"></i>');
    // durationTimeNew();
    // clearInterval(durationTime);
    // isPaused = true;

    //PLAY AFTER PAUSED
  } else {
    audio.volume = volume;
    audio.play();
    setSoundStatus(sound.id, '<i class="fas fa-pause-circle"></i>');
  }
  // console.log(audio.duration);
  // console.log(audio.currentTime);
  soundEnd(soundBtn, audio, sound);
}

// SOUND END
function soundEnd(soundBtn, audio, sound) {
  audio.onended = () => {
    // console.log(durationTime);
    // durationTime = null;
    // console.log(durationTime);
    // console.log(typeof durationTime, durationTime);
    // durationTimeNew("pause");
    setSoundStatus(sound.id, "");
    console.log(newIntervall);
    durationTimeNew();
    document.querySelector(".active .sound-progress").value = "0";
    soundBtn.classList.remove("active");
  };
}

// RENDER SOUND STATUS ICON
function setSoundStatus(soundId, content) {
  const allSoundStatusEl = document.querySelectorAll(".sound-status");
  allSoundStatusEl[soundId - 1].innerHTML = content;
}

// let newIntervall = null;
// function durationTimeNew() {
//   clearInterval(newIntervall);
//   newIntervall = null;
//   newIntervall = setInterval(progressRunning, 10);
//   function progressRunning() {
//     if (Math.ceil((audio.currentTime / audio.duration) * 100) < 100) {

//       document.querySelector(".active .sound-progress").value = Math.ceil(
//         (audio.currentTime / audio.duration) * 100
//       );
//       console.log(Math.ceil((audio.currentTime / audio.duration) * 100));
//       console.log(newIntervall);
//     } else {
//       console.log(Math.ceil((audio.currentTime / audio.duration) * 100));
//       clearInterval(newIntervall);
//       newIntervall = null;
//       console.log(newIntervall);

//     }
//   }
// }

function durationTimeNew() {
  let newIntervall = null;
  if (newIntervall) {
    newIntervall = null;
    clearInterval(newIntervall);
  } else {
    newIntervall = setInterval(() => {
      document.querySelector(".active .sound-progress").value = Math.ceil(
        (audio.currentTime / audio.duration) * 100
      );
    }, 10);
  }
}

// function move() {
//   const element = document.getElementById("myBar");
//   let width = 0;
//   let id = setInterval(frame, 10);
//   function frame() {
//     if (width == 100) {
//       clearInterval(id);
//     } else {
//       width++;
//       element.style.width = width + "%";
//     }
//   }
// }

// VOLUME LOGIC
const volumeInput = document.getElementById("audio-volume");
const volumeLabel = document.getElementById("audio-volume-label");
const volumeIcon = document.querySelector(".volume-icon");
volumeInput.addEventListener("change", changeVolume);

function changeVolume() {
  volume = volumeInput.value / 10;
  volumeLabel.textContent = "Volume: " + volumeInput.value;
  if (audio) audio.volume = volume;
  if (volume === 0) {
    volumeIcon.innerHTML = `<i class="fas fa-volume-mute nav-list-icon"></i>`;
  } else {
    volumeIcon.innerHTML = `<i class="fas fa-volume-up nav-list-icon">`;
  }
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
