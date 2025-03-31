document.addEventListener("DOMContentLoaded", () => {
    let startButton = document.getElementById("startGame");
    let screens = document.querySelectorAll(".screen");
    let avatars = document.querySelectorAll(".avatar");
    let timerElement = document.querySelector(".timer span");
    let scoreElement = document.querySelector(".score span");
    let imagesArea = document.querySelector(".imagesArea");

    let selectedAvatar = null;
    let timeLeft = 30;
    let score = 0;
    let gameInterval;
    let imageInterval;

    function showScreen(screenIndex) {
        screens.forEach(screen => screen.classList.add("gayab"));
        screens[screenIndex].classList.remove("gayab");
    }

    startButton.addEventListener("click", () => {
        showScreen(1);
    });

    avatars.forEach((avatar) => {
        avatar.addEventListener("click", () => {
            selectedAvatar = avatar.querySelector("h5").innerText;
            console.log(`Selected Avatar: ${selectedAvatar}`);
            showScreen(2);
            startGame();
        });
    });

    function startGame() {
      
        timeLeft = 30;
        score = 0;
        timerElement.innerText = timeLeft;
        scoreElement.innerText = score;
        imagesArea.innerHTML = "";

        gameInterval = setInterval(() => {
            timeLeft--;
            timerElement.innerText = timeLeft;

            if (timeLeft <= 0) {
                clearInterval(gameInterval);
                clearInterval(imageInterval);
                endGame();
            }
        }, 1000);

        generateImages();

        imageInterval = setInterval(() => {
            generateImages();
        }, 2000);
    }

    function generateImages() {
     

        if (imagesArea.children.length < 15) { 
            let img = document.createElement("img");
            let randomIndex = Math.floor(Math.random() * 5) + 1;
           
           img.src ="./images/images1123.png";   
            img.alt = "Game Object";
            img.classList.add("game-object");

            img.addEventListener("click", () => {
                score += 1;
                scoreElement.innerText = score;
                img.remove();
            });

            imagesArea.appendChild(img);
            
        } else {
            console.log("Image limit reached (5)");
        }
    }

    function endGame() {
        alert(`Time's up! Your final score is: ${score}`);
        resetGame();
        showScreen(1);
    }

    function resetGame() {
        clearInterval(gameInterval);
        clearInterval(imageInterval);
        imagesArea.innerHTML = "";
        timeLeft = 30;
        score = 0;
        timerElement.innerText = timeLeft;
        scoreElement.innerText = score;
    }
});
