const inputName = document.getElementById("nameInput");
const saveBtn = document.getElementById("saveBtn");
const imageInput = document.getElementById("pfpinput");
const profileImage = document.getElementById("pfpimg");

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


saveBtn.addEventListener("click", () => {
    const name = inputName.value;
    localStorage.setItem("username", name);

    if (!profileImage.src) {
        alert("Please upload a photo first!");
        return;
    }
    localStorage.setItem("profilePic", profileImage.src);
    alert("Settings Saved!");

});