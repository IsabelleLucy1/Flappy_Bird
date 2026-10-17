//board
let board;
let boardWidth = 360;
let boardHeight = 640;
let context;

//bird sets the dimesnions and positioning on grid
let birdWidth =34;
let birdHeight =24;
let birdX = boardWidth/8;
let birdY = boardHeight/2;
let birdImg;



//object to store bird location
let bird = {
    x : birdX,
    y : birdY,
    width : birdWidth,
    height : birdHeight
}

//Pipes
let pipeArray =[];
let pipeWidth = 64;
let pipeHeight = 512;
let pipeX = boardWidth;
let pipeY = 0;

let topPipeImg;
let bottomPipeImg;

//physics
let VelocityX = -2;//amount pipes will move left while running
let VelocityY = 0;//bird jump speed
let gravity = 0.4;

let gameOver = false;
let score = 0;
let pipeInterval;
let highestScore = 0;
let pipeSpawnInterval = 1500;
let selectedMode = "Normal";
let difficultyButtons;

function updateHighestScore() {
    if (score > highestScore) {
        highestScore = score;
    }
}

//sets the dimensions for the background
window.onload = function() {
    board = document.getElementById("board")
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d"); //used for drawing on board
    difficultyButtons = document.getElementById("difficulty-buttons");
    difficultyButtons.addEventListener("click", function(event) {
        const button = event.target.closest("button[data-interval]");
        if (!button || !gameOver) {
            return;
        }

        pipeSpawnInterval = Number(button.dataset.interval);
        selectedMode = button.dataset.mode;
        restartGame();
    });
//adds the bird into the canvas
    

    //load images
    birdImg = new Image();
    birdImg.src = "./flappybirdgirl.png";
    birdImg.onload = function() {
        context.drawImage(birdImg, bird.x ,bird.y ,bird.width ,bird.height)
    }

    //loads the top pipe image
    topPipeImg = new Image();
    topPipeImg.src = "./toppipe.png";
    
    //loads the bottom pipe image
    bottomPipeImg = new Image();
    bottomPipeImg.src = "./bottompipe.png";
    requestAnimationFrame(update);

    placePipes();
    startPipeTimer();

    document.addEventListener("keydown", moveBird);
}
//loops or updates the canvas
function update() {

    requestAnimationFrame(update);

    if (gameOver) {
        drawGameOver();
        return;
    }
    //clears the previous frame
    context.clearRect(0,0, board.width, board.height);
    
    //bird update
    VelocityY += gravity;
    //bird.y += VelocityY;
    bird.y = Math.max(bird.y + VelocityY, 0); //applies gravity and doesnt let it go past canvas

    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);

    if (bird.y > board.height){
        endGame();
    }
    //pipes

    for (let i = 0; i < pipeArray.length; i++){
        let pipe = pipeArray[i];
        pipe.x += VelocityX;//shifts the pipe each second
        context.drawImage(pipe.image, pipe.x, pipe.y, pipe.width, pipe.height);

        //Updates score each pipe it passes
        if (!pipe.passed && bird.x > pipe.x + pipe.width){
            score += 0.5; //2 pipes = 1 point
            pipe.passed = true;
            updateHighestScore();

        }
        if (detectCollision(bird, pipe)){
            endGame();
        }

    
    }

    //clears the pipes when off screen
    //for memory issues

    //checks the pipes that are off the canvas
    while (pipeArray.length > 0 && pipeArray[0].x < -pipeWidth)
    {
        pipeArray.shift();
        //removes first element from the right
    }
    //displays the scores
    context.fillStyle = "White";
    context.font = "30px sans-serif";
    context.fillText("Score: " + score, 10, 32);
    context.fillText("Best: " + highestScore, 10, 62);
    drawModeIndicator();

    if (gameOver) {
        drawGameOver();
    }
}

function drawGameOver() {
    context.fillStyle = "rgba(0, 0, 0, 0.65)";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = "white";
    context.textAlign = "center";
    context.font = "bold 36px sans-serif";
    context.fillText("GAME OVER", board.width / 2, board.height / 2 - 20);
    context.font = "22px sans-serif";
    context.fillText("Score: " + score, board.width / 2, board.height / 2 + 20);
    context.fillText("Best: " + highestScore, board.width / 2, board.height / 2 + 52);
    context.font = "18px sans-serif";
    context.fillText("Press X to restart", board.width / 2, board.height / 2 + 88);
    context.textAlign = "start";
    drawModeIndicator();
}

function drawModeIndicator() {
    context.fillStyle = "white";
    context.font = "16px sans-serif";
    context.textAlign = "right";
    context.fillText("Mode: " + selectedMode, board.width - 10, 28);
    context.textAlign = "start";
}

function placePipes() {

    if (gameOver) {
        return;
    }
    //
    let randomPipeY = pipeY - pipeHeight/4 - Math.random()*(pipeHeight/2);
    let openingSpace = board.height/4;

    let topPipe = {
        image: topPipeImg,
        x : pipeX,
        y : randomPipeY,
        width : pipeWidth,
        height : pipeHeight,
        passed : false
    }

    pipeArray.push(topPipe);

    let bottomPipe = {
        image : bottomPipeImg,
        x : pipeX,
        y : randomPipeY + pipeHeight + openingSpace,
        width : pipeWidth,
        height : pipeHeight,
        passed: false
    }
    pipeArray.push(bottomPipe);
}

function startPipeTimer() {
    clearInterval(pipeInterval);
    pipeInterval = setInterval(placePipes, pipeSpawnInterval);
}

function endGame() {
    gameOver = true;
    clearInterval(pipeInterval);
    pipeInterval = undefined;
    difficultyButtons.hidden = false;
}

function restartGame() {
    bird.y = birdY;
    VelocityY = 0;
    pipeArray = [];
    score = 0;
    gameOver = false;
    difficultyButtons.hidden = true;
    placePipes();
    startPipeTimer();
}

function moveBird(e) {
    if (gameOver) {
        if (e.code === "KeyX") {
            restartGame();
        }
        return;
    }

    if (e.code === "Space" || e.code === "ArrowUp") {
        VelocityY = -6;
    }

}

function detectCollision(a, b) {
    return  a.x < b.x + b.width && 
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.y + a.height > b.y;
}