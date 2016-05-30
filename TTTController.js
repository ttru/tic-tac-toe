// Displays a message to the player.
var displayMessage = function(message) {
  document.getElementById('message').innerHTML = message;
}

// Clears the board of marks.
var clearBoard = function() {
  for (var i = 0; i < 9; i++) {
    document.getElementById('' + i).innerHTML = '&nbsp;';
  }
  displayMessage('');
}

// Hooks up the game graphics and logic for the given game mode:
// - "PC" : player goes first (as X) vs. computer
// - "CP" : player goes second (as O) vs. computer
// - "PP" : player 1 vs player 2
// Also accepts computerPlayers for X and O.
var createGame = function(gameMode, computerX, computerO) {
  clearBoard();
  var boardModel = new TTTModel();
  if (gameMode === 'PP') {
    var currentMark = 'X';
    for (var i = 0; i < 9; i++) {
      document.getElementById('' + i).onclick = function(e) {
        var index = Number(this.id);
        if (boardModel.getWinner() === ' ' && boardModel.getMark(index) === ' ') {
          boardModel.setMark(index, currentMark);
          document.getElementById('' + index).innerHTML = currentMark;
          currentMark = (currentMark === 'X') ? 'O' : 'X';
          if (boardModel.isGameOver()) {
            var message = 'IT\'S A DRAW!'
            if (boardModel.getWinner() === 'X') {
              message = 'PLAYER 1 WINS!';
            } else if (boardModel.getWinner() === 'O') {
              message = 'PLAYER 2 WINS!';
            }
            displayMessage(message);
          }
        }
      };
    }
  } else {
    var humanMark = gameMode === 'PC' ? 'X' : 'O';
    var computerPlayer = gameMode === 'PC' ? computerO : computerX;
    computerPlayer.reset();
    if (gameMode == 'CP') {
      var move = computerPlayer.getComputerMove();
      boardModel.setMark(move, computerPlayer.computerMark);
      document.getElementById('' + move).innerHTML = computerPlayer.computerMark;
    }
    for (var i = 0; i < 9; i++) {
      document.getElementById('' + i).onclick = function(e) {
        var index = Number(this.id);
        if (boardModel.getWinner() === ' ' && boardModel.getMark(index) === ' ') {
          computerPlayer.humanPlayedAt(index);
          boardModel.setMark(index, humanMark);
          document.getElementById('' + index).innerHTML = humanMark;
          if (!boardModel.isGameOver()) {
            var move = computerPlayer.getComputerMove();
            boardModel.setMark(move, computerPlayer.computerMark);
            document.getElementById('' + move).innerHTML = computerPlayer.computerMark;
          }
          if (boardModel.isGameOver()) {
            var message = 'IT\'S A DRAW!'
            if (boardModel.getWinner() === humanMark) {
              message = 'YOU WON!';
            } else if (boardModel.getWinner() === computerPlayer.computerMark) {
              message = 'COMPUTER WON!';
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
  var button = document.getElementById('new-game-button');
  button.disabled = true;
  displayMessage('Loading...');
  var computerX = new TTTPerfectPlayer('X');
  var computerO = new TTTPerfectPlayer('O');
  button.disabled = false;
  displayMessage('');
  button.onclick = function() {
    var modeSelect = document.getElementById('mode-select');
    createGame(modeSelect.options[modeSelect.selectedIndex].value, computerX, computerO);
  };
  button.click();
}

window.onload = setUp;
