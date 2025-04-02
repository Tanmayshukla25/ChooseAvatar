    let startButton = document.getElementById("startGame");
    let screens = document.querySelectorAll(".screen");
    let avatars = document.querySelectorAll(".avatar");
    let timerElement = document.querySelector(".timer span");
    let scoreElement = document.querySelector(".score span");
    let imagesArea = document.querySelector(".imagesArea");

    let selectedAvatarSrc = null;
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
            selectedAvatarSrc = avatar.querySelector("img").src;
      
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

            if (timeLeft < 0) {
                clearInterval(gameInterval);
                clearInterval(imageInterval);
                endGame();
            }
        }, 1000);
        generateImages();
        imageInterval = setInterval(generateImages, 1000);
    }

    function generateImages() {
        if (!selectedAvatarSrc) return;

        let img = document.createElement("img");
        img.src = selectedAvatarSrc;
        img.classList.add("game-object");
        img.style.left = getARandomNumber("x") + "px"
        img.style.top = getARandomNumber("y") + "px"


        img.addEventListener("click", () => {
            score += 1;
            scoreElement.innerText = score;
            img.remove();
        });

        imagesArea.appendChild(img);
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
function getARandomNumber(axis) {
    let area = imagesArea.getBoundingClientRect(); 
    let maxX = area.width - 50;  
    let maxY = area.height - 50; 

    if (axis === "x") {
        return Math.max(10, Math.floor(Math.random() * maxX));
    } else {
        return Math.max(10, Math.floor(Math.random() * maxY));
    }
}