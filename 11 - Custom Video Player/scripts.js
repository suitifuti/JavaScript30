const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullScreen = player.querySelector('#fullScreen');


function togglePlay() {
    // if(video.paused) {
    //     video.play();
    // }
    // else {
    //     video.pause();
    // }

    const method = video.paused ? 'play' : 'pause';
    video[method](); //bracket notation, you can use it for dynamic property/method access
}

function updateButton() {
    const btn = this.paused ? '►' : '❚ ❚' ;
    toggle.innerText = btn;

}

function skip() {
    console.log(this.dataset.skip);
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
    console.log(this.name);
    console.log(this.value);
    video[this.name] = this.value;
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
    console.log(e);
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration; //divide the offset by the width and that will give a % that we can multiply by the video duration
    console.log(scrubTime)
    video.currentTime = scrubTime;
}

function handleFullScreen() {
    video.requestFullscreen();
}

video.addEventListener('click', togglePlay)
video.addEventListener('play', updateButton)
video.addEventListener('pause', updateButton)
video.addEventListener('timeupdate', handleProgress)


toggle.addEventListener('click', togglePlay)

skipButtons.forEach(button => {
    button.addEventListener('click', skip)
});

ranges.forEach(range => {
    range.addEventListener('change', handleRangeUpdate)
})

let mouseDown = false;

progress.addEventListener('click', scrub)
progress.addEventListener('mousemove', (e) => mouseDown && scrub(e))
progress.addEventListener('mousedown', () => mouseDown = true);
progress.addEventListener('mouseup', () => mouseDown = false);

fullScreen.addEventListener('click', handleFullScreen)