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