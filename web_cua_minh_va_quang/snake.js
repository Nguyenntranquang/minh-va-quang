
//board
var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context; 
var score = 0;
var is2x = false
//snake head
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

var velocityX = 0;
var velocityY = 0;

var snakeBody = [];

//food
var foodX;
var foodY;

var gameOver = false;

window.onload = function() {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d"); //used for drawing on the board
    if (score % 3 == 0 && score >= 3) {
        is2x = true;
    }
    placeFood();
    document.addEventListener("keyup", changeDirection);
    // update();
    setInterval(update, 1000/10); //100 milliseconds
}
function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText(`Score: ${score}`, 8, 20);
  }

function update() {
    if (gameOver) {
        return;
    }
    context.font = "16px Arial";
    context.textAlign = "center";
    context.textBaseline = "middle"
    context.fillStyle = "white";
    context.fillText(`Score: ${score}`, 8, 20);

    context.fillStyle="black";
    context.fillRect(0, 0, board.width, board.height);

    context.font = "20px Courier New";
    context.textAlign = "center";
    context.textBaseline = "middle"
    context.fillStyle = "white";
    context.fillText(`Score: ${score}`, board.width /2, blockSize*1);

    if (is2x) {
        context.fillStyle="red";
        context.fillRect(foodX, foodY, blockSize*2, blockSize*2);
    }
    else {
        context.fillStyle="red";
        context.fillRect(foodX, foodY, blockSize, blockSize);
    }



    if ((snakeX == foodX && snakeY == foodY)) {
        snakeBody.push([foodX, foodY]);
        score ++;
        if (is2x) {
            placeFood2X();
        }
        placeFood();

    }

    for (let i = snakeBody.length-1; i > 0; i--) {
        snakeBody[i] = snakeBody[i-1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle="white";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    //game over conditions
    if (snakeX < 0 || snakeX > cols*blockSize || snakeY < 0 || snakeY > rows*blockSize) {
        gameOver = true;
        alert("Game Over");
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            alert("Game Over");
        }
    }
}

function changeDirection(e) {
    if (e.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }
    else if (e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
    else if (e.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}


function placeFood() {
    //(0-1) * cols -> (0-19.9999) -> (0-19) * 25
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
    for (let i = 0; i < snakeBody.length; i++) {
        if (foodX == snakeBody[i][0] && foodY == snakeBody[i][1] ) {
            placeFood();
        }}
    return foodX, foodY
}
function placeFood2X() {
    foodX = Math.floor(Math.random() * cols) * blockSize*2;
    foodY = Math.floor(Math.random() * rows) * blockSize*2;
    for (let i = 0; i < snakeBody.length; i++) {
        if (foodX == snakeBody[i][0] && foodY == snakeBody[i][1] ) {
            placeFood();
        }}
    return foodX, foodY
}