// script.js

let startTime, elapsedTime = 0, timerInterval;
let isRunning = false;
const timerDisplay = document.getElementById("timer");
const startStopBtn = document.getElementById("startStopBtn");
const lapBtn = document.getElementById("lapBtn");
const resetBtn = document.getElementById("resetBtn");
const lapsList = document.getElementById("lapsList");

function timeToString(time) {
    let diffInHrs = Math.floor(time / 3600000);
    let diffInMin = Math.floor((time % 3600000) / 60000);
    let diffInSec = Math.floor((time % 60000) / 1000);

    const formattedHrs = diffInHrs.toString().padStart(2, "0");
    const formattedMin = diffInMin.toString().padStart(2, "0");
    const formattedSec = diffInSec.toString().padStart(2, "0");

    return `${formattedHrs}:${formattedMin}:${formattedSec}`;
}

function start() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        timerDisplay.textContent = timeToString(elapsedTime);
    }, 1000);
    startStopBtn.textContent = "Stop";
    lapBtn.disabled = false;
    isRunning = true;
}

function stop() {
    clearInterval(timerInterval);
    startStopBtn.textContent = "Start";
    lapBtn.disabled = true;
    isRunning = false;
}

function reset() {
    stop();
    elapsedTime = 0;
    timerDisplay.textContent = "00:00:00";
    lapsList.innerHTML = "";
}

function lap() {
    const lapTime = timeToString(elapsedTime);
    const lapItem = document.createElement("li");
    lapItem.textContent = `Lap ${lapsList.children.length + 1}: ${lapTime}`;
    lapsList.appendChild(lapItem);
}

startStopBtn.addEventListener("click", () => {
    isRunning ? stop() : start();
});

resetBtn.addEventListener("click", reset);

lapBtn.addEventListener("click", lap);
