// board will contain the current state of the board. It helps to determine the score per tile
let board;

// Score will track the total score
let score = 0;

// Refers to the total rows and columns
let rows = 4;
let columns = 4;

let is2048Exist = false;
let is4096Exist = false;
let is8192Exist = false;

// We are going to contain array of arrays (nested array also known as matrix) on the board

// Create a function that will set the game board
function setGame()
{

	// Initialize a 4x4 game board with all tiles set to 0
	board = 
	[
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0]
	];

	// Create the game board on the HTML document
	for(let r = 0; r < rows; r++)
	{
		for(let c = 0; c < columns; c++)
		{

			// Using document.createElement we were able to create an element 
			let tile = document.createElement("div");

			// Use concatenate (+) to combine the values of r and c.
			tile.id = r + "-" + c;

			let num = board[r][c];

			updateTile(tile, num);

			document.getElementById("board").append(tile);
		}
	}


	// This will set two randome tile into 2
	setOne();
	setOne();

}

// Create a function that updates the appearance of a tile based on its number
function updateTile(tile, num){

	// clear the tile:
	tile.innerText = "";

	// Clear the classList to avoid multiple classes 
	tile.classList.value = "";


	tile.classList.add("tile");


	if(num > 0)
	{
		tile.innerText = num;

		if(num <= 4096)
		{
			tile.classList.add("x" + num);
		}
		else
		{
			tile.classList.add("x8192");
		}

	}
}


// Event that triggers the webpage finishe loading. Its like saying "Wait until everything on the page is ready"
window.onload = function()
{
	setGame();
}


// This function handles the user's keyboard input when they press arrow keys
function handleSlide(event)
{
	// console.log(event.code);
	event.preventDefault();

	if(["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.code))
	{
		// Add an IF statement that will be based on which arrow key was pressed
		if(event.code == "ArrowLeft" && canMoveLeft())
		{
			slideLeft();
			setOne();
		}
		else if(event.code == "ArrowRight" && canMoveRight())
		{
			slideRight();
			setOne();
		}
		else if(event.code == "ArrowUp" && canMoveUp())
		{
			slideUp();
			setOne();
		}
		else if(event.code == "ArrowDown" && canMoveDown())
		{
			slideDown();
			setOne();
		}
	}

	document.getElementById('score').innerText = score;

	setTimeout(()=>
	{
		if(hasLost())
		{
			alert("Game over! You lost the game. Game wil restart.");
			restartGame();
			alert("Click any arrow key to restart.");
		}
		else
		{
			checkWin();
		}
	}, 100)
}

function restartGame()
{
	board = 
	[
		[0,0,0,0],
		[0,0,0,0],
		[0,0,0,0],
		[0,0,0,0]
	];

	score = 0;
	// Create a new tile
	setOne();
}

// EventListener
document.addEventListener("keydown", handleSlide);

function slideLeft()
{
	for(let r= 0; r < rows; r++)
	{
		// Get current array from the row
		//[0, 2, 2, 8] => [4, 8, 0, 0] / [16, 0, 0, 0]
		let row = board[r]; 
		let originalRow = row.slice();

		//[2, 0, 2, 4] => [4, 4, 0, 0]
		row = slide(row);

		// Updating the current state of the board.
		board[r] = row;

		// add for loop that will change the tiles.
		for(let c = 0; c < columns; c++)
		{
			let tile = document.getElementById(r + "-" + c)
			let num = board[r][c];

			if(originalRow[c] != num && num != 0)
			{
				tile.style.animation = "slide-from-right 0.3s"
				setTimeout
				(() =>
					{
						tile.style.animation ="";
					}, 300
				)
			}
			updateTile(tile, num);
		}
	}
}

function slideRight()
{
	for(let r  = 0; r < rows; r++)
	{
		
		// [4, 2, 2, 0] => [0, 0, 4, 4]
		let row = board[r];
		let originalRow = row.slice();

		//[0, 2, 2, 4]
		row = row.reverse();

		// [4, 4, 0, 0]
		row = slide(row);

		//[0, 0, 4, 4]
		row = row.reverse();

		board[r] = row;

		// Add a for loop that updates the tiles
		for(let c = 0; c < columns; c++)
		{
			let tile = document.getElementById(r + "-" +c);
			let num = board[r][c];

			if (originalRow[c] != num && num !=0)
			{
				tile.style.animation = "slide-from-left 0.3s"

				setTimeout
				(() =>
					{
						tile.style.animation ="";
					}, 300
				)

			}

			updateTile(tile, num);

		}


	}
}

function slideUp(){
	for(let c = 0; c < columns; c++)
	{
		// the elements of the col from the current iteration?
		let col = board.map(row => row[c]);
		let originalCol = col.slice();

		col =slide(col);


		// update the id of the title
		for(let r = 0 ; r< rows; r++)
		{
			board[r][c] = col[r]
			let tile = document.getElementById(r + "-" + c);
			let num = board[r][c];

			if(originalCol[r] != num && num != 0)
			{
				tile.style.animation = "slide-from-bottom 0.3s"
				setTimeout
				(() =>
					{
						tile.style.animation ="";
					}, 300
				)

			}

			updateTile(tile, num);
		}

	}
}

function slideDown()
{
	for(let c=0; c < columns; c++)
	{
		let col = board.map(row => row[c]);
		let originalCol = col.slice();
		

		col = col.reverse();

		col = slide(col);

		col = col.reverse();

		// update the id of the title
		for(let r = 0 ; r< rows; r++)
		{
			board[r][c] = col[r]

			let tile = document.getElementById(r + "-" + c);
			let num = board[r][c];

			if (originalCol[r] != num && num != 0)
			{
				tile.style.animation = "slide-from-top 0.3s";

				setTimeout
				(() =>
					{
						tile.style.animation ="";
					}, 300
				)
			}

			updateTile(tile, num);
		}

	}
}

function filterZero(row)
{
	// This filter will remove the zero elements / values from out array
	return row.filter(num => num != 0);
}

function slide(row)
{
	//[2, 0, 2, 4] to [4, 4, 0, 0]
	// getting rid of the zeros
	row = filterZero(row);
	// [2, 2, 4] to [4, 0, 4];

	// [2, 2, 4]
	//This for loop will check if there are 2 adjacent equal numbers and will combine them then change the value of the second number to 0.
	for(let i = 0; i < row.length; i++)
	{
		if(row[i] == row[i+1])
		{
			row[i] *= 2;
			row[i+1] = 0;
			score += row[i];
		}
	}
	// [4, 0, 4] to [4,4] and then to [4,4,0,0]

	// [4,4]
	row = filterZero(row);

	// [4,4]
	// add zeroes back
	while(row.length < columns)
	{
		row.push(0);
	}

	// after the while loop, the output is [4,4,0,0]
	return row;

}

// Create a function that checks if there is an empty tile or none in the board
// Return boolean.
function hasEmptyTile()
{
	for(let r= 0; r < rows; r++)
	{
		for(let c = 0; c < columns; c++)
		{
			if(board[r][c] == 0)
			{
				return true;
			}
		}
	}

	return false;
}


// Create a function called setOne that randomly creates / add a tile in the board
function setOne()
{
	// early exit if there is no available slot for the tile:
	if(!hasEmptyTile())
	{
		return;
	}

	// The found variable will tell if we are able to find a slot or position or coordinate for the tile that will be added
	let found = false;

	while(!found)
	{
		// Math.random gets a number
		// Math.floor removes the decimal number
		let r = Math.floor(Math.random() * rows);
		let c = Math.floor(Math.random() * columns);

		if(board[r][c] == 0)
		{
			board[r][c] = 2;
			let tile = document.getElementById(r + "-" + c);
			updateTile(tile, board[r][c]);

			found = true
		}



	}

	// console.log(board)
}



// Create a function that checks if its possible to move going left.
function canMoveLeft()
{
	for(let r=0; r < rows; r++)
	{
		for(let c=0; c < columns; c++)
		{
			if(board[r][c] != 0)
			{
				// Check if the position to the left of the current tile is equal to its self
				if (board[r][c] == board[r][c-1] || board[r][c-1] == 0) 
				{
					return true;
				}
			}
		}
	}
	return false;
}


function canMoveRight()
{
	for(let r=0; r < rows; r++)
	{
		for(let c=0; c<columns; c++)
		{
			if (board[r][c] != 0)
			{
				if (board[r][c] == board[r][c+1] || board[r][c+1] == 0) 
				{
					return true;
				}
			}
		}
	}
	return false;
}

function canMoveUp()
{
	for(let c = 0; c < columns; c++)
	{
		for(let r = 1 ; r < rows; r++)
		{
			if (board[r][c] != 0)
			{
				if (board[r-1][c] == 0 || board[r-1][c] == board[r][c])
				{
					return true;
				}
			}
		}
	}
	return false;
}

function canMoveDown()
{
	for(let c=0; c < columns; c++)
	{
		for(let r= rows - 2; r >= 0; r--)
		{
			if(board[r][c] !=0)
			{
				if (board[r+1][c] == 0 || board[r+1][c] == board[r][c])
				{
					return true;
				}
			}
		}
	}
	return false;
}

// This function will check if the player won the game by reaching the 3 tresholds (2048, 4096, and 8192)
function checkWin()
{
	for(let r= 0; r < rows; r++)
	{
		for(let c=0; c < columns; c++)
		{
			if (board[r][c] == 2048 && is2048Exist == false)
			{
				alert ('You win! You got the 2048');
				is2048Exist = true;
			}
			else if (board[r][c] == 4096 && is4096Exist == false)
			{
				alert('You are unstoppable at 4096! You are fantastically unstoppable!');
				is4096Exist = true;
			}
			else if (board[r][c] == 8192 && is8192Exist == false)
			{
				alert('You have reached 8192! You are incredibly awesome!');
				is8192Exist = true;
			}
		}	
	}
}


// Create a function that will check if the user lost
function hasLost()
{
	for(let r=0; r < rows; r++)
	{
		for(let c=0; c < columns; c++)
		{
			if(board[r][c] == 0)
			{
				return false;
			}

			let currentTile = board[r][c];
			if (r > 0 && board[r - 1][c] === currentTile ||
                r < rows - 1 && board[r + 1][c] === currentTile ||
                c > 0 && board[r][c - 1] === currentTile ||
                c < columns - 1 && board[r][c + 1] === currentTile)
			{
				return false;
			}
		}
	}

	return true;
}