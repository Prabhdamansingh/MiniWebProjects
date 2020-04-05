const video = document.getElementById("video");
const play = document.getElementById("play");
const stop = document.getElementById("stop");
const progress = document.getElementById("progress");
const timestamp = document.getElementById("timestamp");

toggleVideoStatus = () => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
};

updatePlayIcon = () => {
  if (video.paused) {
    play.innerHTML = ' <i class="fa fa-play fa-2x"></i>';
  } else {
    play.innerHTML = '<i class="fa fa-pause fa-2x"></i>';
  }
};

updateProgress = () => {
  progress.value = (video.currentTime / video.duration) * 100;
  //get min
  let min = Math.floor(video.currentTime / 60);
  if (min < 10) {
    min = "0" + String(min);
  }
  //get sec
  let sec = Math.floor(video.currentTime % 60);
  if (sec < 10) {
    sec = "0" + String(sec);
  }
  timestamp.innerHTML = `${min}:${sec}`;
};

setVideoProgress = () => {
  video.currentTime = (progress.value * video.duration) / 100;
};

stopVideo = () => {
  video.currentTime = 0;
  video.pause();
};

video.addEventListener("click", toggleVideoStatus);
video.addEventListener("play", updatePlayIcon);
video.addEventListener("pause", updatePlayIcon);
video.addEventListener("timeupdate", updateProgress);

play.addEventListener("click", toggleVideoStatus);
stop.addEventListener("click", stopVideo);
progress.addEventListener("change", setVideoProgress);
