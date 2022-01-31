var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// Event listeners
// document.addEventListener("onclick", mouseClickHandler, false);

/* Found the colors used!
  green: #6aaa64
  darkenedGreen: #538d4e
  yellow: #c9b458
  darkenedYellow: #b59f3b
  lightGray: #d8d8d8
  gray: #86888a
  darkGray: #939598
  white: #fff
  black: #212121

  font-family: 'Clear Sans', 'Helvetica Neue', Arial, sans-serif
  font-size: 16px
  keyboard-height: 200px
  game-max-width: 500px
  ==== We'll be using darkmode theme ======
  background: #121213
  color-present: #b59f3b
  color-correct: #538d4e
  color-absent: #3a3a3c
  tile-text-color: #d7dadc
  key-text-color: #d7dadc
  key-evaluated-text-color: #d7dadc
  key-bg: #818384
  key-bg-present: #b59f3b
  key-bg-correct: #538d4e
  key-bg-absent: #3a3a3c
*/

// A dict to store the basic object colors for easy switching
let statusColors = {"absent": "#3a3a3c", "present": "#b59f3b", "correct": "#538d4e", "key":"#86888a"};
// gridBox object (for the game board)
class gridBox{
  constructor(x, y, solid = false){
    this.x = x;
    this.y = y;
    this.ltr = "";
    this.width = 62.0; // All boxes are 62x62
    this.height = 62.0;
    this.isSolid = solid;
    this.status = "absent";
  }
  draw(){
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.strokeStyle = statusColors[this.status];
    ctx.fillStyle = statusColors[this.status];
    ctx.stroke();
    if (this.isSolid) ctx.fill();
    if (this.letter != "") {
      ctx.font = "bold 30px Helvetica Neue";
      ctx.fillStyle = "#d7dadc";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(this.ltr, this.x + this.width/2, this.y + this.height/2);
    }
    ctx.closePath();
  }
}

// keyBox object (for the keys on the keyboard)
class keyBox{
  constructor(x, y, width, height, text){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.txt = text;
    this.status = "key";
  }
  draw(){
    //radius for the arc to create rounded keys
    let radius = 4;
    // Trace rounded box
    ctx.beginPath();
    ctx.moveTo(this.x + radius, this.y);
    ctx.lineTo(this.x + this.width - radius, this.y);
    ctx.quadraticCurveTo(this.x + this.width, this.y, this.x + this.width, this.y + radius);
    ctx.lineTo(this.x + this.width, this.y + this.height - radius);
    ctx.quadraticCurveTo(this.x + this.width, this.y + this.height, this.x + this.width - radius, this.y + this.height);
    ctx.lineTo(this.x + radius, this.y + this.height);
    ctx.quadraticCurveTo(this.x, this.y + this.height, this.x, this.y + this.height - radius);
    ctx.lineTo(this.x, this.y + radius);
    ctx.quadraticCurveTo(this.x, this.y, this.x + radius, this.y);
    // Fill box
    ctx.fillStyle = statusColors[this.status];
    ctx.fill();
    // Add text
    ctx.font = "bold 14px Helvetica Neue";
    ctx.fillStyle = "#d7dadc";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(this.txt, this.x + this.width/2, this.y + this.height/2);
  }
}


// basic object for the state of the game
function gameState(selectedWord, wordsGuessed){
  let gState = Object.create(Key.prototype);
  key.x = x;
  key.y = y;
  key.width = width;
  key.height = height;
  key.fill = fillColor;
  return key;

}

// builds the game board (might be a 'nicer' way to write this)
let gridRows = 6;
let gridCols = 5;
let grid = [];
function gridInit(){
  let padding = 5;
  let gridX = (canvas.width - (gridCols*62 + (gridCols - 1)*padding)) / 2;
  let gridY = 50;
  for(let r = 0; r < gridRows; r++){
      grid[r] = [];
      for(let c = 0; c < gridCols; c++){
          let x = gridX + (c * (62 + padding));
          let y = gridY + (r * (62 + padding));
          grid[r][c] = new gridBox(x, y);
      }
  }
}

// draws the game board
function drawGrid(){
    for(let r = 0; r < gridRows; r++){
      for(let c = 0; c < gridCols; c++){
        grid[r][c].draw();
      }
    }
}

gridInit();
grid[0][0].ltr = "D";
grid[0][1].ltr = "E";
grid[0][2].ltr = "M";
grid[0][3].ltr = "O";
grid[0][4].ltr = "!";
drawGrid();

// Builds the keyboard in a dictionary, keyed by letter
let keysDict = {};
function keyboardInit(){
    // Basic values
    let offset = (canvas.width - 484)/2;
    let hPadding = 6.0;
    let vPadding = 8.0;
    let boardY = canvas.height - 200.0;
    let kWidth = 43.0;
    let kHeight = 58.0;

    // Make row 1
    let row = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
    for(let i = 0; i < 10; i++){
        let kX = i*(kWidth + hPadding) + offset;
        let kY = boardY;
        keysDict[row[i]] = new keyBox(kX, kY, kWidth, kHeight, row[i]);
    }
    
    kWidth = 43.59; // The keys are a little wider for the bottom 2 rows
    // Make row 2
    row = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
    for(i = 0; i < 9; i++){
      kX = i*(kWidth + hPadding) + kWidth/2 + offset;
      kY = boardY + kHeight + vPadding;
      keysDict[row[i]] = new keyBox(kX, kY, kWidth, kHeight, row[i]);
    }

    // ENTER key
    kY = boardY + 2 * (kHeight + vPadding);
    keysDict["ENTER"] = new keyBox(offset, kY, 64.5, kHeight, "ENTER");

    // Make row 3
    row = ["Z", "X", "C", "V", "B", "N", "M"];
    for(i = 1; i < 8; i++){
      kX = i*(kWidth + hPadding) + kWidth/2 + offset;
      keysDict[row[i-1]] = new keyBox(kX, kY, kWidth, kHeight, row[i-1]);
    }
    
    // DEL key
    keysDict["DEL"] = new keyBox(keysDict["L"].x, kY, 64.5, kHeight, "DEL");
}
// draws the keyboard
function drawKeyboard(){
    for(let [ltr, key] of Object.entries(keysDict)){
        key.draw();
    }
}

keyboardInit();
drawKeyboard();

function mouseClickHandler(e){
    // Get the mouse location
    let mX = e.clientX - canvas.offsetLeft;
    let mY = e.clientY - canvas.offsetTop;
    // This SHOULD be able to return a dict with the one key that was pressed (if any)
    let clicked = keysDict.filter(k => (k.x <= mX) && ((k.x + k.width) >= mX)).filter(k => (k.y <= mY) && ((k.y + k.height) >= mY));
    // We then check to see if we actually got a key
    if(clicked.length == 1){
      // If we got one, and only one, key, then we can work with that!
      // We'll make a function that takes the LETTER/TEXT of the key as an arg, which handles updating the board and stuff
      // Why a separate function, you ask? To make it easier for us to add in physical keyboard functionality
      // I may leave this part up to you, John, because you said you were looking at the game state stuff
    }
}
// Func that checks if the mouse is over a given box
//  - Use mouseover event??? Look into ways this can be done

// Func that returns letter of which key was clicked (if one was clicked), 0 otherwise

/* Click event handler
		- Ask which key was clicked
    	- If a letter:
      	add to input if inputlen < 5
        otherwise do nothing
      - If backspace:
      	pop last letter from input
      - If enter:
      	if inputlen == 5, run comparison
        otherwise do nothing
      - If 0, do nothing
*/

// Answer selector - runs once at start of game, then starts draw loop

/* Input comparator
		- Checks latest input string
    	- If input[i] == answer[i], make corresponding box green (inc keyboard)
      - Else if input[i] in answer, make corresponding box yellow
      - Else, make corresponding box black/grey
      - If all passed, game win
      - Else increment row
      	- If row > 5 (so 6 tries total), game over
*/

/* Draw loop
		- Constantly updates wordleGrid and keyboard
*/
