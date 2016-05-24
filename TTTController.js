// Displays a message to the player.
var displayMessage = function(message) {
  document.getElementById('message').innerHTML = message;
}

// Clears the board of marks.
var clearBoard = function() {
  for (var i = 0; i < 9; i++) {
    document.getElementById('' + i).innerHTML = '*';
  }
  displayMessage("");
}

// Hooks up the game graphics and logic for the given game mode:
// - "PC" : player goes first (as X) vs. computer
// - "CP" : player goes second (as O) vs. computer
// - "PP" : player 1 vs player 2
var createGame = function(gameMode) {
  clearBoard();
  var boardModel = new TTTModel();
  if (gameMode === 'PP') {
    // TODO: Complete 2-player mode.
  } else {
    var humanMark = gameMode === 'PC' ? 'X' : 'O';
    var computerPlayer = new TTTPerfectPlayer(gameMode === 'PC' ? 'O' : 'X');
    if (gameMode == 'CP') {
      var move = computerPlayer.getComputerMove();
      boardModel.setMark(move, computerPlayer.computerMark);
      document.getElementById('' + move).innerHTML = computerPlayer.computerMark;
    }
    for (var i = 0; i < 9; i++) {
      document.getElementById('' + i).onclick = function(e) {
        var index = Number(this.id);
        if (boardModel.getWinner() === ' ' && boardModel.getMark(index) == ' ') {
          computerPlayer.humanPlayedAt(index);
          boardModel.setMark(index, humanMark);
          document.getElementById('' + index).innerHTML = humanMark;
          if (!boardModel.isGameOver()) {
            var move = computerPlayer.getComputerMove();
            boardModel.setMark(move, computerPlayer.computerMark);
            document.getElementById('' + move).innerHTML = computerPlayer.computerMark;
          }
          if (boardModel.isGameOver()) {
            var message = "IT'S A DRAW!"
            if (boardModel.getWinner() === humanMark) {
              message = "YOU WON!";
            } else if (boardModel.getWinner() == computerPlayer.computerMark) {
              message = "COMPUTER WON!";
            }
            displayMessage(message);
          }
        }
      };
    }
  }
}

// Initial setup of game and UI elements.
var setUp = function() {
  document.getElementById('new-game-button').onclick = function() {
    var modeSelect = document.getElementById('mode-select');
    createGame(modeSelect.options[modeSelect.selectedIndex].value);
  };
}

window.onload = setUp;
