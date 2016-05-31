// Displays a message to the player.
var displayMessage = function(message) {
  document.getElementById('message').innerHTML = message;
}

// Clears the board of marks.
var clearBoard = function() {
  for (var i = 0; i < 9; i++) {
    var cell = document.getElementById('' + i)
    cell.className = 'blank-mark';
    cell.innerHTML = '&nbsp;';
  }
  displayMessage('');
}

// Marks a cell on the board at the given index.
var markBoard = function(index, mark, boardModel) {
  boardModel.setMark(index, mark);
  var cell = document.getElementById('' + index)
  cell.className = (mark === 'X') ? 'x-mark' : 'o-mark';
  cell.innerHTML = mark;
}

//
var markLine = function(boardModel) {
  if (boardModel.getWinner() === ' ') return;
  var lineClass = (boardModel.getWinner() === 'X') ? 'x-line' : 'o-line';
  var lineIndices = boardModel.getWinningLine();
  for (var i = 0; i < 3; i++) {
    var index = lineIndices[i];
    document.getElementById('' + index).className = lineClass;
  }
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
          markBoard(index, currentMark, boardModel);
          currentMark = (currentMark === 'X') ? 'O' : 'X';
          if (boardModel.isGameOver()) {
            markLine(boardModel);
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
      markBoard(move, computerPlayer.computerMark, boardModel);
    }
    for (var i = 0; i < 9; i++) {
      document.getElementById('' + i).onclick = function(e) {
        var index = Number(this.id);
        if (boardModel.getWinner() === ' ' && boardModel.getMark(index) === ' ') {
          computerPlayer.humanPlayedAt(index);
          markBoard(index, humanMark, boardModel);
          if (!boardModel.isGameOver()) {
            var move = computerPlayer.getComputerMove();
            markBoard(move, computerPlayer.computerMark, boardModel);
          }
          if (boardModel.isGameOver()) {
            markLine(boardModel);
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
