class DrumKit {
  constructor() {
    this.pads = document.querySelectorAll(".pad");

    this.curentKick = "./sounds/kick-classic.wav";
    this.curentSnare = "./sounds/snare-acoustic01.wav";
    this.curentHihat = "./sounds/hihat-acoustic01.wav";

    this.selects = document.querySelectorAll("select");
    this.muteBtns = document.querySelectorAll(".mute");
    this.tempoSlider = document.querySelector(".tempo-slider");

    this.kickAudio = document.querySelector(".kick-sound");
    this.snareAudio = document.querySelector(".snare-sound");
    this.hihatAudio = document.querySelector(".hihat-sound");

    this.playBtn = document.querySelector(".play");

    this.index = 0;
    this.bpm = 150;
    this.isPlaying = null;
  }

  activePad() {
    this.classList.toggle("active");
  }

  repeat() {
    let step = this.index % 8;
    const activeBars = document.querySelectorAll(`.b${step}`);
    activeBars.forEach((bar) => {
      bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;

      if (bar.classList.contains("active")) {
        if (bar.classList.contains("kick-pad")) {
          this.kickAudio.currentTime = 0;
          this.kickAudio.play();
        }
        if (bar.classList.contains("snare-pad")) {
          this.snareAudio.currentTime = 0;
          this.snareAudio.play();
        }
        if (bar.classList.contains("hihat-pad")) {
          this.hihatAudio.currentTime = 0;
          this.hihatAudio.play();
        }
      }
    });

    this.index++;
  }

  changeTempo(e) {
    const tempoText = document.querySelector(".tempo-nr");
    this.bpm = e.target.value;
    tempoText.innerText = e.target.value;
  }

  updateTempo(e) {
    clearInterval(this.isPlaying);
    this.isPlaying = null;
    this.bpm = e.target.value;

    const playBtn = document.querySelector(".play");
    if (playBtn.classList.contains("active")) {
      this.start();
    }
  }

  muteSound(e) {
    if (e.target.getAttribute("data-track") === "kick-track") {
      if (e.target.classList.contains("active")) {
        this.kickAudio.volume = 0;
      } else {
        this.kickAudio.volume = 1;
      }
    }
    if (e.target.getAttribute("data-track") === "snare-track") {
      if (e.target.classList.contains("active")) {
        this.snareAudio.volume = 0;
      } else {
        this.snareAudio.volume = 1;
      }
    }
    if (e.target.getAttribute("data-track") === "hihat-track") {
      if (e.target.classList.contains("active")) {
        this.hihatAudio.volume = 0;
      } else {
        this.hihatAudio.volume = 1;
      }
    }
  }

  changeSound(e) {
    const selectionName = e.target.name;
    const selectionValue = e.target.value;

    switch (selectionName) {
      case "kick-select":
        this.kickAudio.src = selectionValue;
        break;
      case "snare-select":
        this.snareAudio.src = selectionValue;
        break;
      case "hihat-select":
        this.hihatAudio.src = selectionValue;
        break;
    }
  }
  updateBtn() {
    if (!this.isPlaying) {
      this.playBtn.innerText = "stop";
    } else {
      this.playBtn.innerText = "play";
    }
  }
  start() {
    const interval = (60 / this.bpm) * 1000;

    if (!this.isPlaying) {
      this.isPlaying = setInterval(() => {
        this.repeat();
      }, interval);
    } else {
      clearInterval(this.isPlaying);
      this.isPlaying = null;
    }
  }
}

const drumKit = new DrumKit();

drumKit.pads.forEach((pad) => {
  pad.addEventListener("click", drumKit.activePad);
  pad.addEventListener("animationend", function () {
    this.style.animation = "";
  });
});

drumKit.playBtn.addEventListener("click", () => {
  drumKit.updateBtn();
  drumKit.start();
});

drumKit.selects.forEach((select) => {
  select.addEventListener("change", function (e) {
    drumKit.changeSound(e);
  });
});

drumKit.muteBtns.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    btn.classList.toggle("active");
    drumKit.muteSound(e);
  });
});

drumKit.tempoSlider.addEventListener("input", function (e) {
  drumKit.changeTempo(e);
});

drumKit.tempoSlider.addEventListener("change", function (e) {
  drumKit.updateTempo(e);
});
