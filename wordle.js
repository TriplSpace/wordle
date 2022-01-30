var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// Event listeners
document.addEventListener("onclick", mouseClickHandler, false);

// basic object for the grid box
function gridBox(x, y, width, height, solid = false, border = true, fillColor = "#3f3f3f", edgeColor = "#252525"){
	let box = Object.create(Box.prototype);
  box.x = x;
  box.y = y;
  box.letter = "";
  box.width = width;
  box.height = height;
  box.isSolid = solid;
  box.hasBorder = border;
  box.fill = fillColor;
  box.edge = edgeColor;
  return box;
}
Box.prototype.draw = function(){
	ctx.beginPath();
  ctx.rect(this.x, this.y, this.width, this.height);
  ctx.fillStyle = this.edgeColor;
  if(this.hasBorder) ctx.stroke();
  ctx.fillStyle = this.fill;
  if(this.isSolid) ctx.fill();
  if(this.letter != ""){
      ctx.font = "16px Arial";
      ctx.fillStyle = "#000000";
      ctx.fillText(this.letter, (this.x+this.width-16)/2, (this.y+this.height-32)/2);
  }
  ctx.closePath();
}

// basic object for the keyboard key


// basic object for the state of the game



// Make an object, letteredBox, that inherits from Box?
//  - Has slightly diff draw method that draws a letter centered in the box?

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
