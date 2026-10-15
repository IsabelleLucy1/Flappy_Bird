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


//sets the dimensions for the background
window.onload = function() {
    board = document.getElementById("board")
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d"); //used for drawing on board
//adds the bird into the canvas
    

    //load images
    birdImg = new Image();
    birdImg.src = "./flappybird.png";
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
    setInterval(placePipes, 1500); //every 1.5 seconds new pipe

    document.addEventListener("keydown", moveBird);
}
//loops or updates the canvas
function update() {
    requestAnimationFrame(update);
    //clears the previous frame
    context.clearRect(0,0, board.width, board.height);
    
    //bird update
    VelocityY += gravity;
    bird.y += VelocityY;
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);

    //pipes

    for (let i = 0; i < pipeArray.length; i++){
        let pipe = pipeArray[i];
        pipe.x += VelocityX;//shifts the pipe each second
        context.drawImage(pipe.image, pipe.x, pipe.y, pipe.width, pipe.height);
    }
}

function placePipes() {
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

function moveBird(e) {
    if (e.code === "Space" || e.code === "ArrowUp" || e.code === "KeyX") {
        //jump
        VelocityY = -6;
    }

}