function getRandomQuote() {
    fetch('https://api.api-ninjas.com/v2/randomquotes?category=success,wisdom', {
        headers: {
            "X-Api-Key": "YUM54AyzTFvUdZ1wJE09zf7alzaOXvNDVUrOujWf"
        }
    })

    .then(response => response.json())
        .then(data => {
            document.getElementById("quote").textContent = data[0].quote;
            document.getElementById("author").textContent = "- " + data[0].author;
        });
}
const randBtn = document.getElementById("quoteBtn");
randBtn.addEventListener("click", getRandomQuote);

const usernameSpan = document.getElementById("userName");
const savedName = localStorage.getItem("username");
const pfpImg = document.getElementById("pfpImg");
const savedPfp = localStorage.getItem("profilePic");
if (savedName) {
    usernameSpan.textContent = savedName;
}

if (savedPfp) {
    pfpImg.src = savedPfp;
    pfpImg.style.display = "block";

}

/*To Do list */

const inputBox = document.getElementById("taskInput");
const listContainer = document.getElementById("listContainer");
const addBtn = document.getElementById("addBtn");

function addTask() {
    if (inputBox.value === '') {
        alert("you must write something");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
}

addBtn.addEventListener("click", addTask);


listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();

    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove()
        saveData();
    }
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask();

// The charts part//

let studyChart;

function getDailyStudyData() {
    const sessions = JSON.parse(localStorage.getItem("sessions")) || [];
    const totals = {};

    sessions.forEach(s => {
        totals[s.date] = (totals[s.date] || 0) + s.minutes;
    });

    return totals;
}

function renderStudyChart() {
    const totals = getDailyStudyData();

    studyChart = new Chart(document.getElementById("studyChart"), {
        type: "bar",
        data: {
            labels: Object.keys(totals),
            datasets: [{
                label: "Study Minutes",
                data: Object.values(totals),
                backgroundColor: "#EF5B62",
                borderColor: "#EF5B62",
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    })
}

document.addEventListener("DOMContentLoaded", () => { renderStudyChart(); });