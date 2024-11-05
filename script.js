let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let interval;
let isRunning = false;
let lapCount = 1;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const millisecondsDisplay = document.getElementById('milliseconds');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapList = document.getElementById('lapList');

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', recordLap);

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        interval = setInterval(updateTimer, 10);
        startBtn.disabled = true;
    }
}

function pauseTimer() {
    isRunning = false;
    clearInterval(interval);
    startBtn.disabled = false;
}

function resetTimer() {
    isRunning = false;
    clearInterval(interval);
    minutes = 0;
    seconds = 0;
    milliseconds = 0;
    lapCount = 1;
    updateDisplay();
    lapList.innerHTML = '';
    startBtn.disabled = false;
}

function updateTimer() {
    milliseconds++;
    if (milliseconds === 100) {
        milliseconds = 0;
        seconds++;
        if (seconds === 60) {
            seconds = 0;
            minutes++;
        }
    }
    updateDisplay();
}

function updateDisplay() {
    minutesDisplay.textContent = padNumber(minutes);
    secondsDisplay.textContent = padNumber(seconds);
    millisecondsDisplay.textContent = padNumber(milliseconds);
}

function padNumber(number) {
    return number.toString().padStart(2, '0');
}

function recordLap() {
    if (isRunning) {
        const lapTime = `${padNumber(minutes)}:${padNumber(seconds)}:${padNumber(milliseconds)}`;
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapCount} - ${lapTime}`;
        lapList.insertBefore(lapItem, lapList.firstChild);
        lapCount++;
    }
} 