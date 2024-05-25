document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".grid button");
    const imageUrl1 = "img.png"; // First image
    const imageUrl2 = "bomb.png"; // Second image

    // Initialize all buttons with the first image
    buttons.forEach((button) => {
        const img = document.createElement("img");
        img.src = imageUrl1;
        button.appendChild(img);

        button.addEventListener("click", function () {
            if (!button.classList.contains("clicked")) {
                button.classList.add("clicked");
                img.style.display = "block"; // Show the image
                button.disabled = true; // Disable further clicks

                // If the button contains the second image, reveal all images
                if (img.src.includes(imageUrl2)) {
                    revealAllImages();
                } else {
                    // Check if there are any buttons left with the first image
                    if (checkRemainingImageUrl1() === 0) {
                        revealAllImages();
                    }
                }
            }
        });
    });

    // Handle the apply button click event
    document.getElementById("applyBtn").addEventListener("click", function () {
        const numButtons = parseInt(document.getElementById("numButtons").value);
        
        // Reset all buttons
        buttons.forEach((button) => {
            const img = button.querySelector("img");
            img.src = imageUrl1;
            img.style.display = "none";
            button.classList.remove("clicked");
            button.disabled = false;
        });

        // Randomly select numButtons buttons to change their image
        const selectedButtons = [];
        while (selectedButtons.length < numButtons) {
            const randomIndex = Math.floor(Math.random() * buttons.length);
            if (!selectedButtons.includes(randomIndex)) {
                selectedButtons.push(randomIndex);
            }
        }

        selectedButtons.forEach((index) => {
            const button = buttons[index];
            const img = button.querySelector("img");
            img.src = imageUrl2;
        });
    });

    // Function to reveal all images
    function revealAllImages() {
        buttons.forEach((button) => {
            const img = button.querySelector("img");
            img.style.display = "block";
            button.disabled = true;
        });
    }

    // Function to check remaining buttons with the first image
    function checkRemainingImageUrl1() {
        let count = 0;
        buttons.forEach((button) => {
            const img = button.querySelector("img");
            if (img.src.includes(imageUrl1) && !button.classList.contains("clicked")) {
                count++;
            }
        });
        return count;
    }
});
