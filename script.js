const state = {
  tracks: [],
  index: 0,
  isShuffle: false,
  isRepeat: false
};

const trackGrid = document.getElementById("trackGrid");
const audio = document.getElementById("audio");
const nowCover = document.getElementById("nowCover");
const nowTitle = document.getElementById("nowTitle");
const nowArtist = document.getElementById("nowArtist");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");
const seekBar = document.getElementById("seekBar");
const volumeBar = document.getElementById("volumeBar");

const playPauseBtn = document.getElementById("playPauseBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const shuffleBtn = document.getElementById("shuffleBtn");
const repeatBtn = document.getElementById("repeatBtn");

init();

async function init() {
  const res = await fetch("data/tracks.json");
  state.tracks = await res.json();
  renderTrackCards();
  loadTrack(0);
  audio.volume = Number(volumeBar.value);
}

function renderTrackCards() {
  trackGrid.innerHTML = state.tracks
    .map(
      (track, i) => `
      <article class="track-card ${i === state.index ? "active" : ""}" data-index="${i}">
        <img src="${track.cover}" alt="${track.title}" />
        <h3>${track.title}</h3>
        <p>${track.artist}</p>
      </article>
    `
    )
    .join("");

  document.querySelectorAll(".track-card").forEach((card) => {
    card.addEventListener("click", () => {
      loadTrack(Number(card.dataset.index));
      audio.play();
      syncPlayButton();
    });
  });
}

function loadTrack(index) {
  state.index = index;
  const track = state.tracks[state.index];
  audio.src = track.audio;
  nowCover.src = track.cover;
  nowTitle.textContent = track.title;
  nowArtist.textContent = track.artist;
  highlightActiveCard();
  seekBar.value = 0;
  currentTimeEl.textContent = "0:00";
}

function highlightActiveCard() {
  document.querySelectorAll(".track-card").forEach((card, i) => {
    card.classList.toggle("active", i === state.index);
  });
}

function syncPlayButton() {
  playPauseBtn.textContent = audio.paused ? "▶" : "⏸";
}

function formatTime(sec) {
  if (!Number.isFinite(sec)) return "0:00";
  const min = Math.floor(sec / 60);
  const rem = Math.floor(sec % 60)
    .toString()
    .padStart(2, "0");
  return `${min}:${rem}`;
}

function nextTrack() {
  if (state.isShuffle) {
    let rnd = state.index;
    while (rnd === state.index && state.tracks.length > 1) {
      rnd = Math.floor(Math.random() * state.tracks.length);
    }
    loadTrack(rnd);
  } else {
    loadTrack((state.index + 1) % state.tracks.length);
  }
  audio.play();
  syncPlayButton();
}

function prevTrack() {
  loadTrack((state.index - 1 + state.tracks.length) % state.tracks.length);
  audio.play();
  syncPlayButton();
}

playPauseBtn.addEventListener("click", () => {
  if (audio.paused) audio.play();
  else audio.pause();
  syncPlayButton();
});

nextBtn.addEventListener("click", nextTrack);
prevBtn.addEventListener("click", prevTrack);

shuffleBtn.addEventListener("click", () => {
  state.isShuffle = !state.isShuffle;
  shuffleBtn.classList.toggle("toggled", state.isShuffle);
});

repeatBtn.addEventListener("click", () => {
  state.isRepeat = !state.isRepeat;
  repeatBtn.classList.toggle("toggled", state.isRepeat);
});

audio.addEventListener("loadedmetadata", () => {
  durationEl.textContent = formatTime(audio.duration);
});

audio.addEventListener("timeupdate", () => {
  if (!audio.duration) return;
  const pct = (audio.currentTime / audio.duration) * 100;
  seekBar.value = pct;
  currentTimeEl.textContent = formatTime(audio.currentTime);
});

seekBar.addEventListener("input", () => {
  if (!audio.duration) return;
  audio.currentTime = (Number(seekBar.value) / 100) * audio.duration;
});

volumeBar.addEventListener("input", () => {
  audio.volume = Number(volumeBar.value);
});

audio.addEventListener("ended", () => {
  if (state.isRepeat) {
    audio.currentTime = 0;
    audio.play();
    return;
  }
  nextTrack();
});

audio.addEventListener("pause", syncPlayButton);
audio.addEventListener("play", syncPlayButton);
