// Displays a message to the player.
var displayMessage = function(message) {
  document.getElementById("message").innerHTML = message;
}

// Clears the board of marks.
var clearBoard = function() {
  for (var i = 0; i < 9; i++) {
    document.getElementById('' + i).innerHTML = " ";
  }
}

// Hooks up the game graphics and logic for the given game mode:
// - "PC" : player goes first (as X) vs. computer
// - "CP" : player goes second (as O) vs. computer
// - "PP" : player 1 vs player 2
var createGame = function(gameMode) {
  clearBoard();
  var boardModel = new TTTModel();
  // TODO: Set up event listeners for each square in table.
  // Add logic to determine wins and display appropriate messages.
}

// Initial setup of game and UI elements.
var setUp = function() {
  document.getElementById("new-game-button").onclick = function() {
    var modeSelect = document.getElementById("mode-select");
    createGame(modeSelect.options[modeSelect.selectedIndex].value);
  };
}

window.onload = setUp;
