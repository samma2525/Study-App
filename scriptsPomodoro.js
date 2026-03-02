const start = document.getElementById("start");
const stop = document.getElementById("stop");
const restart = document.getElementById("restart");
const add5Btn = document.getElementById("add5Btn");
const sub5Btn = document.getElementById("sub5Btn");
const timerDisplay = document.getElementById("timer");


let defaultTime = 1500;
let timeLeft = defaultTime;
let interval;
let alarmTimeout;

timerDisplay.textContent = formatTime(timeLeft);

function formatTime(seconds) {
    let m = Math.floor(seconds / 60);
    let sec = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2,'0')}`;
}

add5Btn.addEventListener("click", () => {
    if (interval) return;
    timeLeft += 5 * 60;
    defaultTime += 5 * 60;
    timerDisplay.textContent = formatTime(timeLeft);
})

sub5Btn.addEventListener("click", () => {
    if (interval) return;
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
    if (interval) return;

    const endTime = Date.now() + timeLeft * 1000;

    interval = setInterval(() => {
        timeLeft = Math.max(0, Math.floor((endTime - Date.now()) / 1000));
        updateTimer();

        if (timeLeft <= 0) {
            clearInterval(interval);
            interval = null;

            const studiedMinutes = defaultTime / 60;
            saveSession(studiedMinutes);
            const alarm = document.getElementById("alarmSound");
            alarm.currentTime = 0;
            alarm.play();
            clearTimeout(alarmTimeout)
            alarmTimeout = setTimeout(() => {
                alarm.pause();
                alarm.currentTime = 0;
            }, 5000);
            timeLeft = defaultTime;
            updateTimer();
        }
    }, 1000);
}

const stopTimer = () => {
    clearInterval(interval);
    interval = null;
    const alarm = document.getElementById("alarmSound");
    alarm.pause();
    alarm.currentTime = 0;
    clearTimeout(alarmTimeout);
}

const restartTimer = () => {
    clearInterval(interval);
    timeLeft = defaultTime;
    updateTimer();
    const alarm = document.getElementById("alarmSound");
    alarm.pause();
    alarm.currentTime = 0;
    clearTimeout(alarmTimeout);
}

start.addEventListener("click", startTimer);
stop.addEventListener("click", stopTimer);
restart.addEventListener("click", restartTimer);

function saveSession(minutes) {
    const sessions = JSON.parse(localStorage.getItem("sessions")) || [];

    sessions.push({
        date: new Date().toISOString().split("T")[0],
        minutes: Number(minutes)
    });

    localStorage.setItem("sessions", JSON.stringify(sessions));
}