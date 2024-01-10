let container = document.querySelector(`.album`);
let playlist = document.querySelector(`.playlist`);
let album = getAlbum();

if (!album) {
  renderError();
} else {
  renderAlbumCover();

  let tracks = album.tracklist;

  renderTracks(tracks);

  function setupAudio() {
    let trackNodes = document.querySelectorAll(`.track`);
    for (let i = 0; i < trackNodes.length; i++) {
      let track = tracks[i];
      let node = trackNodes[i];
      let timeNode = node.querySelector(`.time`);
      let img = node.querySelector(`.img-play`);
      // let imgPlay = node.querySelector(`.img-play`);
      // let imgPause = node.querySelector(`.img-playing`);
      let audio = node.querySelector(`.audio`);
      let progressBar = node.querySelector(`.progress-bar`)
      node.addEventListener(`click`, function () {
        if (track.isPlaying) {
          track.isPlaying = false;
          audio.pause();
          img.src = `assets/play.png`;
          // imgPause.classList.add(`d-none`)
          // imgPlay.classList.remove(`d-none`)
        } else {
          track.isPlaying = true;
          audio.play();
          img.src = `assets/pause.png`;
          updateProgress();
          // imgPause.classList.remove(`d-none`);
          // imgPlay.classList.add(`d-none`);
        }
      });
      function updateProgress() {
        // Нарисовать актуальное время
        let time = getTime(audio.currentTime);
        if (timeNode.innerHTML != time) {
          timeNode.innerHTML = time;
          progressBar.style.width = audio.currentTime*100/audio.duration + `%`;
        }
        // Нужно ли вызвать её ещё раз?
        if (track.isPlaying) {
          requestAnimationFrame(updateProgress);
        }
      }
    }
  }

  function getTime(time) {
    let currentSec = Math.floor(time);
    let mins = Math.floor(currentSec / 60);
    let secs = currentSec % 60;
    if (mins < 10) {
      mins = `0` + mins;
    }
    if (secs < 10) {
      secs = `0` + secs;
    }
    return `${mins}:${secs}`;
  }
  setupAudio();
}


function renderTracks(tracks) {
  for (let i = 0; i < tracks.length; i++) {
    let track = tracks[i];
    playlist.innerHTML += `<li class="track list-group-item d-flex flex-wrap">
              <div class="d-flex align-items-center w-100">
                <img
                  src="assets/play.png"
                  alt=""
                  class="me-3 img-play"
                  height="28px"
                />
                <div>
                  <div class="">${track.title}</div>
                  <div class="text-secondary">${track.author}</div>
                </div>
                
                <div class="ms-auto time">${track.time}</div>
              </div>
              <div class="progress">
                <div class="progress-bar bg-dark" role="progressbar" style="width: 0%"></div>
              </div>
              <audio class="audio" src="${track.src}"></audio>
            </li>`;
  }
}
function getAlbum() {
  let search = new URLSearchParams(window.location.search);
  let id = search.get(`i`);
  return (albums[id]);
}
function renderError() {
  container.innerHTML = `ошибка, редирект на главную через 5 секунд`;
}
function renderAlbumCover() {
  container.innerHTML = `<div class="card">
            <div class="row">
              <div class="col-md-6 col-12">
                <img src="${album.img}" alt="" class="img-fluid" />
              </div>
              <div class="col-md-6 col-12">
                <div class="card-body p-4">
                  <div class="d-flex justify-content-between">
                    <h5 class="card-title">${album.title}</h5>
                    <span class="e-mark">🅴</span>
                  </div>
                  <p class="card-text mb-2">
                    ${album.description}
                  </p>
                  <p class="card-text">
                    <small class="text-muted">Альбом выпущен в ${album.year} году</small>
                  </p>
                </div>
              </div>
            </div>
          </div>`;
}