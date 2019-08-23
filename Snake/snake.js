//Get myCanvas and get the context 
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext("2d");

/*  
* grid - Size of each cell of the grid.  
* Also, to make sure that the apple and snake are on the same coordinates.  
*/
const grid = 30;  

//score - The total number of apples the user has eaten. 
let score = 0;

/*
snake      - The player
* x        - The snake's x postion 
* y        - The snake's y postion
* vx       - The snake's velocity x
* vy       - The snake's velocity y
* cells    - How long the snake will be 
* maxCells - The max number of cells the snake will be at
*/
let snake = {
    x: grid * 5,
    y: grid * 5,
    vx: grid,
    vy: 0,
    cells: [],
    maxCells: 1,

};

/*
* x - The apple's x postion
* y - The apple's y postion
*  grid - is used to make sure 
* that the apple and snake are on the same coordinates. 
*/
let apple = {
    x: grid * 5,
    y: grid * 5

}

/*
hideButton - When the button is pressed hide it and call the main function.
*/
function hideButton() {
	
	//Hide the button 
    document.getElementById('menuButton').style.visibility = 'hidden';
    
	//Call main every 100 milliseconds
	setInterval(main, 100);
}

//main - The function that most of the program relies on.
function main() {
	//Clear the canvas. The canvas will be available for drawing again. 
    ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	//Draw the background to #262626
    document.getElementById('myCanvas').style.background = '#262626';
	
	//Call these functions
    drawSnake();
	drawApple();
    snakeBoundaries();
     
}
//drawSnake - Draw the snake, snake's velocity and the score
function drawSnake() {
	
	//When the snake moves 
    snake.x += snake.vx;
    snake.y += snake.vy;

	//adds one or more elements to the beginning of the snake array
    snake.cells.unshift({
        x: snake.x,
        y: snake.y
    });

	//Make sure that the snake cells is less then the maxCells
	if (snake.cells.length > snake.maxCells) {
        snake.cells.pop();
    }

	//Draw the snake
    for (let index = 0; index < snake.cells.length; index++) {
        ctx.beginPath();
        ctx.fillStyle = "#FFF";
        ctx.fillRect(snake.cells[index].x, snake.cells[index].y, grid - 1, grid - 1);
        ctx.closePath();
		
		/* If the snake touches the apple
		*  Add the score and make the snake bigger
		*/
        if (snake.cells[0].x === apple.x && snake.cells[0].y === apple.y) {
            snake.maxCells++;
            score++;
            apple.x = Math.floor((Math.random() * 15) + 0) * grid;
            apple.y = Math.floor((Math.random() * 15) + 0) * grid;
        }
		
		//If the snake eats its own tail.
        for (let i = index + 1; i < snake.cells.length; i++) {
            if (snake.cells[0].x === snake.cells[i].x && snake.cells[i].y === snake.cells[0].y) {
                window.location.reload();


            }
        }

        // Draw Score
        ctx.font = "72px Arial";
        ctx.fillStyle = "rgba(255, 255, 255, 0.25)";
        ctx.fillText(score, canvas.width / 2, canvas.height / 2);

    }
}

//snakeBoundaries - If the snake moves out of boundaries change the snake's position. 
function snakeBoundaries() {
	
	//Left Canvas 
    if (snake.x < 0) {
        snake.x = canvas.width - grid;

    } 
	//Right Canvas
	else if (snake.x >= canvas.width) {
        snake.x = 0;

    } 
	//Top Canvas
	else if (snake.y < 0) {
        snake.y = canvas.height - grid;

    } 
	
	//Bottom Canvas
	else if (snake.y >= canvas.height) {
        snake.y = 0;
    }

}

//drawApple - Draw Apple to the canvas
function drawApple() {
    // Draw Apple
    ctx.beginPath();
    ctx.fillStyle = "#AF1E2D";
    ctx.fillRect(apple.x, apple.y, grid - 1, grid - 1);
    ctx.closePath();
}

//If the user hits Left or A,Up or W,Right or D and Down or S
document.addEventListener("keydown", function(evt) {
    //Left or A
    if (evt.which === 37 || evt.which === 65 && snake.vx === 0) {
        snake.vx = -grid;
        snake.vy = 0;
    }
    //Up or W
    else if (evt.which === 38 || evt.which === 87 && snake.vy === 0) {
        snake.vy = -grid;
        snake.vx = 0;
    }
    //Right or D
    else if (evt.which === 39 || evt.which === 68 && snake.vx === 0) {
        snake.vx = grid;
        snake.vy = 0;
    }
    //Down or S
    else if (evt.which === 40 || evt.which === 83 && snake.vy === 0) {
        snake.vy = grid;
        snake.vx = 0;
    }
});