const start = document.getElementById("start");
const stop = document.getElementById("stop");
const restart = document.getElementById("restart");


let timeLeft = 1500;
let interval;

const updateTimer = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    timer.innerHTML =
        `${minutes.toString().padStart(2,"0")}:${seconds.toString().padStart(2,'0')}`;
}

const startTimer = () => {
    interval = setInterval(() => {
        timeLeft--;
        updateTimer();

        if (timeLeft === 0) {
            clearInterval(interval);
            alert("Time's up!");
            timeLeft = 1500;
        }
    }, 1000)
}

const stopTimer = () => clearInterval(interval);

const restartTimer = () => {
    clearInterval(interval);
    timeLeft = 1500;
    updateTimer();
}

start.addEventListener("click", startTimer);
stop.addEventListener("click", stopTimer);
restart.addEventListener("click", restartTimer);