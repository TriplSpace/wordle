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

// basic object for the grid box
function gridBox(x, y, solid = false, border = true, fillColor = "#121213", edgeColor = "#3a3a3c") {
  let box = Object.create(gridBox.prototype);
  box.x = x;
  box.y = y;
  box.ltr = "";
  box.width = 62; // All boxes are 62x62; box padding is 5 for a total row length of 330
  box.height = 62;
  box.isSolid = solid;
  box.hasBorder = border;
  box.fill = fillColor;
  box.edge = edgeColor;
  return box;
}
gridBox.prototype.draw = function () {
  ctx.beginPath();
  ctx.rect(this.x, this.y, this.width, this.height);
  ctx.strokeStyle = this.edge;
  if (this.hasBorder) ctx.stroke();
  ctx.fillStyle = this.fill;
  if (this.isSolid) ctx.fill();
  if (this.letter != "") {
    ctx.font = "16px Helvetica Neue";
    ctx.fillStyle = "#d7dadc";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(this.ltr, this.x + this.width/2, this.y + this.height/2);
    // How do we center text?
  }
  ctx.closePath();
}

// basic object for the keyboard key
function keyBox(x, y, width, height, fillColor = "#FFFFFF"){
  let key = Object.create(keyBox.prototype);
  key.x = x;
  key.y = y;
  key.width = width;
  key.height = height;
  key.fill = fillColor;
  return key;
}
keyBox.prototype.draw = function(){
  //radius for the arc to create rounded keys
  let radius = 4;
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.stroke();
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
          grid[r][c] = gridBox(x, y);
      }
  }
}

function drawGrid(){
    for(let r = 0; r < gridRows; r++){
      for(let c = 0; c < gridCols; c++){
        grid[r][c].draw();
      }
    }
}

gridInit();
grid[0][0].ltr = "A";
grid[0][1].ltr = "P";
grid[0][2].ltr = "P";
grid[0][3].ltr = "L";
grid[0][4].ltr = "E";
drawGrid();


// Make wordleGrid object (2-D array of letteredBoxes)

// Make keyboard object (dictionary of letteredBoxes)

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
