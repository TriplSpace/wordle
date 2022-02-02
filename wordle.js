// get references to canvas and drawing context
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// wordlist
const wordList = ["aback", "abase", "abate", "abaya", "abbey", "abbot", "abets", "abhor", "abide", "abode", "abort", "about", "above", "abuse", "abuts", "abyss", "ached", "aches", "acids", "acing", "ackee", "acorn", "acres", "acrid", "acted", "actin", "actor", "acute", "adage", "adapt", "added", "adder", "addle", "adept", "adieu", "adios", "adits", "adman", "admin", "admit", "adobe", "adobo", "adopt", "adore", "adorn", "adult", "adzes", "aegis", "aeons", "aerie", "affix", "afire", "afoot", "afore", "after", "again", "agape", "agate", "agave", "agent", "aggro", "agile", "aging", "aglow", "agony", "agora", "agree", "ahead", "ahold", "aided", "aider", "aides", "ailed", "aimed", "aimer", "aioli", "aired", "aisle", "alarm", "album", "alder", "aleph", "alert", "algae", "algal", "alias", "alibi", "alien", "align", "alike", "alive", "alkyd", "alkyl", "allay", "alley", "allot", "allow", "alloy", "allyl", "aloes", "aloft", "aloha", "alone", "along", "aloof", "aloud", "alpha", "altar", "alter", "altos", "alums", "amass", "amaze", "amber", "ambit", "amble", "ambos", "amend", "amide", "amine", "amino", "amiss", "amity", "amnio", "among", "amour", "amped", "ample", "amply", "amuse", "ancho", "angel", "anger", "angle", "angry", "angst", "anima", "anime", "anion", "anise", "ankle", "annas", "annex", "annoy", "annul", "anode", "anole", "antic", "antis", "antsy", "anvil", "aorta", "apace", "apart", "aphid", "apnea", "apple", "apply", "apron", "apses", "apter", "aptly", "aquas", "arbor", "ardor", "areal", "areas", "areca", "arena", "argon", "argot", "argue", "argus", "arias", "arils", "arise", "armed", "armor", "aroma", "arose", "array", "arrow", "arses", "arson", "artsy", "asana", "ascot", "ashen", "ashes", "aside", "asked", "asker", "askew", "aspen", "aspic", "assay", "asses", "asset", "aster", "astir", "asura", "atlas", "atman", "atoll", "atoms", "atone", "atopy", "attic", "audio", "audit", "auger", "aught", "augur", "aunts", "aunty", "aural", "auras", "autos", "auxin", "avail", "avers", "avert", "avian", "avoid", "avows", "await", "awake", "award", "aware", "awash", "awful", "awoke", "axels", "axial", "axils", "axing", "axiom", "axion", "axles", "axons", "azide", "azole", "azure"];

// store basic colors for wordle
const statusColors = {"absent": "#3a3a3c", "present": "#b59f3b", "correct": "#538d4e", "key": "#86888a"};

// register event listener for mouse clicks
canvas.addEventListener("click", mouseClickHandler, false);

// handler for mouse clicks.
function mouseClickHandler(e) {
  // Get the mouse location
  let mX = e.clientX - canvas.offsetLeft;
  let mY = e.clientY - canvas.offsetTop;

  // hold the clicked letter
  let clicked = "";

  // iterate through all the keys in keymap
  for (entry of game.keyboard.keyMap.entries()) {
    // check if click location in the height of current key
    let inHeight = (entry[1].y <= mY) && ((entry[1].y + entry[1].height) >= mY);
    // check if click location in the width of current key
    let inWidth = (entry[1].x <= mX) && ((entry[1].x + entry[1].width) >= mX);

    // if both, set clicked to the entry
    // otherwise clicked will remain an empty string
    if (inHeight && inWidth) {
      clicked = entry[0];
    }
  }
  // call the update function if clicked isn't empty
  if (clicked != "") {
    game.update(clicked);
  }
}

// gridBox object (for the game board)
class gridBox {
  // set up basic aspects of gridBox object
  constructor(x, y, solid = false) {
    this.x = x;
    this.y = y;
    this.ltr = "";
    this.width = 62.0; // All boxes are 62x62
    this.height = 62.0;
    this.isSolid = solid;
    this.status = "absent";
  }

  // draw gridBox
  draw() {
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
      ctx.fillText(this.ltr, (this.x + this.width / 2), (this.y + this.height / 2));
    }
    ctx.closePath();
  }
}

// keyBox object (for the keys on the keyboard)
class keyBox {
  // set up basics of keyBox object
  constructor(x, y, width, height, text) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.txt = text;
    this.status = "key";
  }

  // draw keyBox object
  draw() {
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


// object for the state of game
class gameState {
  constructor(wordList, testing = false) {
    // initialize wordlist to whatever's passed in
    this.wordList = wordList;

    // pick a random target word from the list
    this.target = this.wordList[Math.floor(Math.random() * this.wordList.length)];
    // print the word to console if we're testing
    if (testing) console.log(this.target);

    // set up to hold previous guesses
    this.guesses = [];
  }

  // when enter happens on mouseHandler, calls update
  update(guess, row){ 
    let lettersMatched = 0;
    let updatedRow = [[]];
    for (let i = 0; i < this.target.length(); i++){
      //letter is in the word
      if(guess.includes(this.target[i])){
          if(indexOf(this.target[i]) == indexOf(guess[i])){
            // box color is green
            //grid[row][i].status = "correct"; ?
            updatedRow[[i][0]] = guess[i];
            updatedRow[[i][1]] = "correct";
            lettersMatched++;
          }
          else{
            //box color is yellow
            //grid[row][i].status = "present";?
            updatedRow[[i][0]] = guess[i];
            updatedRow[[i][1]] = "present";

          }
      }
      //box color is grey
      else{
        //grid[row][i].status = "absent"
        updatedRow[[i][0]] = guess[i];
        updatedRow[[i][1]] = "absent";
      }

    }

    if(lettersMatched == 5){
      //correctly guess the word
      alert("Congrats! Word correctly guessed!")
    }
    
    //list of keys to color and associated color
    return updatedRow;
  }


  //Checks latest input string
  // If input[i] == answer[i], make corresponding box green(inc keyboard)
  // Else if input[i] in answer, make corresponding box yellow
  // Else, make corresponding box black / grey
  // If all passed, game win
  // Else increment row
  // If row > 5(so 6 tries total), game over

}

// grid class to set up and maintain the state of the grid
class grid {
  constructor(rows, cols, word) {
    // basic values
    this.grid = [];
    this.rows = rows;
    this.cols = cols;

    // initialize grid, but don't draw
    let padding = 5;
    // set up the x and y for the top left corner
    let gridX = (canvas.width - (this.cols * 62 + (this.cols - 1) * padding)) / 2;
    let gridY = 50;

    // iterate through every gridBox we need
    // draw it at the right location
    for (let r = 0; r < this.rows; r++) {
        this.grid[r] = [];
        for (let c = 0; c < this.cols; c++) {
            let x = gridX + (c * (62 + padding));
            let y = gridY + (r * (62 + padding));
            this.grid[r][c] = new gridBox(x, y);
      }
    }
  }

  // draw grid
  draw() {
    // for each row
    for(let r = 0; r < this.rows; r++) {
      // for each column
      for(let c = 0; c < this.cols; c++) {
        // call the keyBox there's draw method
        this.grid[r][c].draw();
      }
    }
  }

  // update letter in grid at row, col
  updateLetter(letter, row, col) {
    this.grid[row][col].ltr = letter;
  }

  // update color/status of grid box at row, col
  updateColor(status, row, col) {
    this.grid[row][col].status = status;
  }
}

// keyboard class to set up and maintain the state of the keyboard
class keyboard {
  constructor() {
    // map to hold all of the keys and their state
    this.keyMap = new Map();

    // basic values to locate the keyboard and the keys on the canvas
    let offset = (canvas.width - 484) / 2;
    let hPadding = 6.0;
    let vPadding = 8.0;
    let boardY = canvas.height - 200.0;
    let kWidth = 43.0;
    let kHeight = 58.0;

    // set up row 1 of the keyboard
    let row = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
    for (let i = 0; i < 10; i++) {
        let kX = i * (kWidth + hPadding) + offset;
        let kY = boardY;
        this.keyMap.set(row[i], new keyBox(kX, kY, kWidth, kHeight, row[i]));
    }
    
    // update key width for row two
    kWidth = 43.59; // The keys are a little wider for the bottom 2 rows

    // set up row two
    row = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
    for (let i = 0; i < 9; i++) {
      let kX = i * (kWidth + hPadding) + (kWidth / 2) + offset;
      let kY = boardY + kHeight + vPadding;
      this.keyMap.set(row[i], new keyBox(kX, kY, kWidth, kHeight, row[i]));
    }

    // set up enter key
    let kY = boardY + 2 * (kHeight + vPadding);
    this.keyMap.set("ENTER", new keyBox(offset, kY, 64.5, kHeight, "ENTER"));

    // set up row three
    row = ["Z", "X", "C", "V", "B", "N", "M"];
    for (let i = 1; i < 8; i++) {
      let kX = i * (kWidth + hPadding) + (kWidth / 2) + offset;
      this.keyMap.set(row[i - 1], new keyBox(kX, kY, kWidth, kHeight, row[i-1]));
    }
    
    // set up del key
    this.keyMap.set("DEL", new keyBox(this.keyMap.get("L").x, kY, 64.5, kHeight, "DEL"));
  }

  // draw keyboard
  draw() {
    for (let key of this.keyMap.values()) {
      key.draw();
    }
  }

  // update key color
  updateColor(letter, status) {
    // get current keyBox for letter
    let curr = this.keyMap.get(letter);
    // change its status to whatever the new status is
    curr.status = status;
    
    // set the entry in keyMap to the updated keyBox
    this.keyMap.set(letter, curr);
  }
}

// wordle class to set up and maintain the overall game
class wordle {
  constructor(words, testing) {
    // initialize grid with 6 rows, 5 cols
    this.grid = new grid(6, 5);
    this.grid.draw();

    // initialize keyboard
    this.keyboard = new keyboard();
    this.keyboard.draw();

    // initialize game state
    this.gameState = new gameState(words, testing);

    // set initial row and column
    this.currRow = 0;
    this.currCol = 0;
  }

  // update keyboard and keygrid given the key that was just pressed
  update(key) {
    // clear the board
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // handle key being enter, del, or alpha
    if (key == "ENTER") {
      // build the total string for this row's guess
      let guess = 

      // call the gamestate update

      // color everything that's now supposed to be colored

      // increment row
      this.currRow++;

    } else if (key == "DEL") {
      // if del, decrement the column (as long as it's greater than zero)
      // reset the letter for the box to nothing

      // decrement column count
      this.currCol = this.currCol > 0 ? (this.currCol - 1) : 0;
      // if del, remove letter from column
      this.grid.updateLetter("", this.currRow, this.currCol);

    } else {
      // if just an alpha key, set the gridBox at current row and column to that key
      // check that we're within the grid
      if (this.currCol < 5) {
        this.grid.updateLetter(key, this.currRow, this.currCol);

        // then increment the column count
        this.currCol++;
      }
    }

    // redraw grid and keyboard
    this.grid.draw();
    this.keyboard.draw();
  }
}

const game = new wordle(wordList, true);

/*
// Func that checks if the mouse is over a given box
//  - Use mouseover event??? Look into ways this can be done

// Func that returns letter of which key was clicked (if one was clicked), 0 otherwise

 Click event handler
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


// Answer selector - runs once at start of game, then starts draw loop

 Input comparator
		- Checks latest input string
    	- If input[i] == answer[i], make corresponding box green (inc keyboard)
      - Else if input[i] in answer, make corresponding box yellow
      - Else, make corresponding box black/grey
      - If all passed, game win
      - Else increment row
      	- If row > 5 (so 6 tries total), game over


 Draw loop
		- Constantly updates wordleGrid and keyboard


// DEBUG
 Found the colors used!
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

  WORKING - ALL TRANSFERRED TO class grid
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

// Builds the keyboard in a map
const keyMap = new Map();
function keyboardInit(){
    // Basic values
    let offset = (canvas.width - 484) / 2;
    let hPadding = 6.0;
    let vPadding = 8.0;
    let boardY = canvas.height - 200.0;
    let kWidth = 43.0;
    let kHeight = 58.0;

    // Make row 1
    let row = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
    for(let i = 0; i < 10; i++){
        let kX = i * (kWidth + hPadding) + offset;
        let kY = boardY;
        keyMap.set(row[i], new keyBox(kX, kY, kWidth, kHeight, row[i]));
        console.log(row[i]);
    }
    
    kWidth = 43.59; // The keys are a little wider for the bottom 2 rows
    // Make row 2
    row = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
    for(i = 0; i < 9; i++){
      kX = i*(kWidth + hPadding) + kWidth/2 + offset;
      kY = boardY + kHeight + vPadding;
      keyMap.set(row[i], new keyBox(kX, kY, kWidth, kHeight, row[i]));
      console.log(row[i]);
    }

    // ENTER key
    kY = boardY + 2 * (kHeight + vPadding);
    keyMap.set("ENTER", new keyBox(offset, kY, 64.5, kHeight, "ENTER"));

    // Make row 3
    row = ["Z", "X", "C", "V", "B", "N", "M"];
    for(i = 1; i < 8; i++){
      kX = i*(kWidth + hPadding) + kWidth/2 + offset;
      keyMap.set(row[i-1], new keyBox(kX, kY, kWidth, kHeight, row[i-1]));
      console.log(row[i-1]);
    }
    
    // DEL key
    keyMap.set("DEL", new keyBox(keyMap.get("L").x, kY, 64.5, kHeight, "DEL"));
}

// draws the keyboard
function drawKeyboard(){
  for (key of keyMap.values()) {
    key.draw();
  }
}

keyboardInit();
drawKeyboard();
*/