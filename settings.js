const inputName = document.getElementById("nameInput");
const saveBtnName = document.getElementById("nameSaveBtn");
const imageInput = document.getElementById("pfpinput");
const profileImage = document.getElementById("pfpimg");
const saveBtn = document.getElementById("saveBtn");

imageInput.addEventListener('change', function() {
    const file = this.files[0];
    console.log("File selected", file);
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            console.log("Reader results:", e.target.result);
            profileImage.src = e.target.result;
            profileImage.style.display = "block";
        };
        reader.readAsDataURL(file);
    }
});

saveBtnName.addEventListener("click", () => {
    const name = inputName.value;
    localStorage.setItem("username", name);
    alert("Name Saved!");
})

saveBtn.addEventListener("click", () => {
    if (!profileImage.getAttribute("src")) {
        profileImage.src = "strawberries.png";
        localStorage.setItem("profilePic", profileImage.src);
        alert("You got Guest picture!");
        return;
    } else {
        localStorage.setItem("profilePic", profileImage.src);
        alert("Profile Picture Saved!");
    }
});