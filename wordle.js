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
    this.target = this.wordList[Math.floor(Math.random() * this.wordList.length)].toUpperCase();
    // print the word to console if we're testing
    if (testing) console.log(this.target);
  }

  // update row based on guess
  check(guess) {
    // we'll return a list of lists of the letters in guess
    // and their new colors
    let newKeyColors = [];

    // keep track of prior seen letters
    let priors = [];

    // for each letter in guess, check if it's in target
    for (let i = 0; i < guess.length; i++) {
      // check where in target guess lies
      if (guess[i] == this.target[i]) {
        // if it's at the same index, correct
        let correct = [guess[i], "correct"];

        // add to priors
        priors.push(guess[i]);

        // add that to newColors
        newKeyColors.push(correct);

      } else if (this.target.includes(guess[i]) && !priors.includes(guess[i])) {
        // otherwise, present
        let present = [guess[i], "present"];

        // add to priors
        priors.push(guess[i]);

        // add that to newColors
        newKeyColors.push(present);

      } else {
        // add guessed letter and "absent" to newColors
        let absent = [guess[i], "absent"];

        // add that to newColors
        newKeyColors.push(absent);

      }
    }

    // send back the new key colors
    console.log(newKeyColors);
    return newKeyColors;
  }
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

  // get the letter at row, col
  getLetter(row, col) {
    return this.grid[row][col].ltr;
  }

  // set solid fill on row, col
  setSolid(row, col) {
    this.grid[row][col].isSolid = true;
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

  // get current status
  getStatus(letter) {
    // get current keyBox for letter
    let curr = this.keyMap.get(letter);
    
    // return the current status of the letter
    return curr.status;
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
    this.state = new gameState(words, testing);

    // set initial row and column
    this.currRow = 0;
    this.currCol = 0;

    // bool to check if user has won
    this.won = false;
    // bool to check for failure
    this.failed = false;
  }

  // update keyboard and keygrid given the key that was just pressed
  update(key) {
    // clear the board
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // handle key being enter, del, or alpha
    if (key == "ENTER") {
      // build the total string for this row's guess
      let guess = "";
      for (let col = 0; col < 5; col++) {
        guess += this.grid.getLetter(this.currRow, col);
      }

      // check length of guess
      if (guess.length < 5) {
        setTimeout(this.short(), 10);
      } else if (guess.length == 5 && !this.state.wordList.includes(guess)) {
        // check if word in list
        setTimeout(this.not(), 10);
      } else { // if no errors in input

        // call the gamestate update
        // we get a list of keys to color back
        let newKeyColors = this.state.check(guess);

        // color everything that's now supposed to be colored
        // don't color a key if it's already not set to absent (or whatever the status is)
        // count number of correct letters
        let correctCount = 0;
        for (let col = 0; col < 5; col++) {
          // get letter and new status from returned array
          let letter = newKeyColors[col][0];
          let status = newKeyColors[col][1];

          console.log(letter, status);

          if (status == "correct") {
            // update color in grid
            this.grid.updateColor(status, this.currRow, col);
            this.grid.setSolid(this.currRow, col);

            // update color in keyboard
            this.keyboard.updateColor(letter, status);

            // increment correct count
            correctCount++;

          } else if (status == "present") {
            // update color in grid
            this.grid.updateColor(status, this.currRow, col);
            this.grid.setSolid(this.currRow, col);

            // update color in keyboard if not already correct
            if (this.keyboard.getStatus(letter) != "correct") {
              this.keyboard.updateColor(letter, status);
            }

          } else { // absent
            // update color in grid
            this.grid.updateColor(status, this.currRow, col);
            this.grid.setSolid(this.currRow, col);

            // update color in keyboard only if unchanged so far
            if (this.keyboard.getStatus(letter) == "key") {
              this.keyboard.updateColor(letter, status);
            }
          }

        }
        console.log("loop done");

        // check if all 5 were correct
        if (correctCount == 5) {
          this.won = true;
        }

        // increment row and reset column
        this.currRow++;
        this.currCol = 0;
        console.log(this.currRow);

        // set fail true if beyond 6
        if (this.currRow > 6) {
          this.failed = true;
        }
      }

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

    if (this.won) setTimeout(this.win(), 10);
    if (this.failed) setTimeout(this.fail(), 10);
  }

  // alert and restart if won
  won() {
    alert("Amazing! You guessed the word!");
    document.location.reload();
    clearInterval(interval); // Needed for Chrome to end game
  }

  // alert and restart if failed
  failed() {
    alert("Sorry! You ran out of guesses!");
    document.location.reload();
    clearInterval(interval); // Needed for Chrome to end game
  }

  // alert if not in wordlist
  not() {
    alert("Sorry! Guess not in wordlist!");
  }

  // alert if too short
  short() {
    alert("Guess must be 5 letters!");
  }
}

const game = new wordle(wordList, true);

