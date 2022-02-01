var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// wordlist
const wordList = ["aback", "abase", "abate", "abaya", "abbey", "abbot", "abets", "abhor", "abide", "abode", "abort", "about", "above", "abuse", "abuts", "abyss", "ached", "aches", "acids", "acing", "ackee", "acorn", "acres", "acrid", "acted", "actin", "actor", "acute", "adage", "adapt", "added", "adder", "addle", "adept", "adieu", "adios", "adits", "adman", "admin", "admit", "adobe", "adobo", "adopt", "adore", "adorn", "adult", "adzes", "aegis", "aeons", "aerie", "affix", "afire", "afoot", "afore", "after", "again", "agape", "agate", "agave", "agent", "aggro", "agile", "aging", "aglow", "agony", "agora", "agree", "ahead", "ahold", "aided", "aider", "aides", "ailed", "aimed", "aimer", "aioli", "aired", "aisle", "alarm", "album", "alder", "aleph", "alert", "algae", "algal", "alias", "alibi", "alien", "align", "alike", "alive", "alkyd", "alkyl", "allay", "alley", "allot", "allow", "alloy", "allyl", "aloes", "aloft", "aloha", "alone", "along", "aloof", "aloud", "alpha", "altar", "alter", "altos", "alums", "amass", "amaze", "amber", "ambit", "amble", "ambos", "amend", "amide", "amine", "amino", "amiss", "amity", "amnio", "among", "amour", "amped", "ample", "amply", "amuse", "ancho", "angel", "anger", "angle", "angry", "angst", "anima", "anime", "anion", "anise", "ankle", "annas", "annex", "annoy", "annul", "anode", "anole", "antic", "antis", "antsy", "anvil", "aorta", "apace", "apart", "aphid", "apnea", "apple", "apply", "apron", "apses", "apter", "aptly", "aquas", "arbor", "ardor", "areal", "areas", "areca", "arena", "argon", "argot", "argue", "argus", "arias", "arils", "arise", "armed", "armor", "aroma", "arose", "array", "arrow", "arses", "arson", "artsy", "asana", "ascot", "ashen", "ashes", "aside", "asked", "asker", "askew", "aspen", "aspic", "assay", "asses", "asset", "aster", "astir", "asura", "atlas", "atman", "atoll", "atoms", "atone", "atopy", "attic", "audio", "audit", "auger", "aught", "augur", "aunts", "aunty", "aural", "auras", "autos", "auxin", "avail", "avers", "avert", "avian", "avoid", "avows", "await", "awake", "award", "aware", "awash", "awful", "awoke", "axels", "axial", "axils", "axing", "axiom", "axion", "axles", "axons", "azide", "azole", "azure"];

// Event listeners
// document.addEventListener("onclick", mouseClickHandler, false);

/* Found the colors used!
  green: #6aaa64
  darkenedGreen: #538d4e
  yellow: #c9b458
  darkenedYellow: #b59f3b
  lightGray: #d8d8d8
  gray: 86888a
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
function gridBox(x, y, solid = false, border = true, fillColor = "#ffffff", edgeColor = "#252525") {
  let box = Object.create(gridBox.prototype);
  box.x = x;
  box.y = y;
  box.letter = "";
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
  ctx.fillStyle = this.edgeColor;
  if (this.hasBorder) ctx.stroke();
  ctx.fillStyle = this.fill;
  if (this.isSolid) ctx.fill();
  if (this.letter != "") {
    ctx.font = "16px Clear Sans";
    ctx.fillStyle = "#000000";
    ctx.fillText(this.letter, (this.x + this.width - 16) / 2, (this.y + this.height - 32) / 2);
  }
  ctx.closePath();
}

/*class gridBox {
  constructor(x, y, solid = false, border = true, fillColor = "#ffffff", edgeColor = "#252525") {
    this.x = x;
    this.y = y;
    this.solid = solid;
    this.border = border;
    this.fillColor = fillColor;
    this.edgeColor = edgeColor;
  }

  draw() {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = this.edgeColor;
    if (this.hasBorder) ctx.stroke();
    ctx.fillStyle = this.fill;
    if (this.isSolid) ctx.fill();
    if (this.letter != "") {
      ctx.font = "16px Clear Sans";
      ctx.fillStyle = "#000000";
      ctx.fillText(this.letter, (this.x + this.width - 16) / 2, (this.y + this.height - 32) / 2);
    }
    ctx.closePath();
  }
}*/

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

// state of game
class gameState {
  guesses = []

  constructor(wordList, testing = false) {
    // initialize wordlist to whatever's passed in
    this.wordList = wordList

    // pick a random target word from the list
    this.target = this.wordList[Math.floor(Math.random() * this.wordList.length)];
    // print the word to console if we're testing
    if (testing) console.log(this.target);
  }
}

game = new gameState(wordList, true);

let example = gridBox(10, 10, true);
example.letter = "A";
example.draw();


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

    check row vs column?
      can narrow it down to one key if so
      row and then column since the columns are different per row
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