window.addEventListener("load", () => {
    const container = document.getElementById("background");
    if (!container) return;

    const imgSrc = "strawberries.png";
    const count = 20;
    const size = 80;
    const pageHeight = Math.max(document.body.scrollHeight, window.innerHeight)

    const exclusionElements = document.querySelectorAll(".headerStuff, .secMain");
    const exclusions = Array.from(exclusionElements).map(el => {
        const rect = el.getBoundingClientRect();
        return {
            left: rect.left,
            top: rect.top + window.scrollY,
            right: rect.right,
            bottom: rect.bottom + window.scrollY
        };
    });

    function isInExclusion(x, y, exlusions, size) {
        for (const rect of exlusions) {
            if (x + size > rect.left && x < rect.right &&
                y + size > rect.top && y < rect.bottom
            ) {
                return true;
            }
        }
        return false;
    }
    for (let i = 0; i < count; i++) {
        let x, y;
        do {
            x = Math.random() * (window.innerWidth - size);
            y = Math.random() * (pageHeight - size);
        } while (isInExclusion(x, y, exclusions, size));

        const img = document.createElement("img");
        img.src = imgSrc;
        img.className = "background-img";
        img.style.left = x + "px";
        img.style.top = y + "px";
        img.style.width = size + "px";
        img.style.height = size + "px";
        img.style.position = "absolute";

        container.appendChild(img);
    }
})