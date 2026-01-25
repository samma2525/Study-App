const start = document.getElementById("start");
const stop = document.getElementById("stop");
const restart = document.getElementById("restart");
const add5Btn = document.getElementById("add5Btn");
const sub5Btn = document.getElementById("sub5Btn");
const timerDisplay = document.getElementById("timer");


let defaultTime = 1500;
let timeLeft = defaultTime;
let interval;

timerDisplay.textContent = formatTime(timeLeft);

function formatTime(seconds) {
    let m = Math.floor(seconds / 60);
    let sec = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2,'0')}`;
}

add5Btn.addEventListener("click", () => {
    timeLeft += 5 * 60;
    defaultTime += 5 * 60;
    timerDisplay.textContent = formatTime(timeLeft);
})

sub5Btn.addEventListener("click", () => {
    timeLeft -= 5 * 60;
    if (timeLeft < 0) timeLeft = 0;
    defaultTime = Math.max(defaultTime - 5 * 60, 0);
    timerDisplay.textContent = formatTime(timeLeft);
})

const updateTimer = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    timerDisplay.innerHTML =
        `${minutes.toString().padStart(2,"0")}:${seconds.toString().padStart(2,'0')}`;
}

const startTimer = () => {
    interval = setInterval(() => {
        timeLeft--;
        updateTimer();

        if (timeLeft === 0) {
            clearInterval(interval);
            saveSession(defaultTime / 25);
            alert("Time's up!");
            timeLeft = defaultTime;
        }
    }, 1000)
}

const stopTimer = () => clearInterval(interval);

const restartTimer = () => {
    clearInterval(interval);
    timeLeft = defaultTime;
    updateTimer();
}

start.addEventListener("click", startTimer);
stop.addEventListener("click", stopTimer);
restart.addEventListener("click", restartTimer);

function saveSession(minutes) {
    const sessions = JSON.parse(localStorage.getItem("sessions")) || [];

    sessions.push({
        date: new Date().toISOString().split("T")[0],
        mintues: minutes
    });

    localStorage.setItem("sessions", JSON.stringify(sessions));
}