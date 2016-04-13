var TTTModel = function() {
  // Index 0 is top-left corner, and index 8 is bottom-right.
  this.board = ' '.repeat(9);

  // Maintains information about counts of X's or O's in the three rows, the
  // three columns, and the two diagonals. An X in a row, column, or diagonal
  // increments the count by 1. An O decrements the count. Thus, X wins when one
  // of these counts is 3, and O wins when one of these counts is -3.
  this.rowCounts = [0, 0, 0];
  this.columnCounts = [0, 0, 0];
  this.slashCount = 0; // The / diagonal.
  this.backslashCount = 0; // The \ diagonal.

  this.numMarks = 0;
};

// Returns the mark at the given index.
TTTModel.prototype.getMark = function(index) {
  return this.board[index];
};

// Sets 'X' or 'O' at the given index.
TTTModel.prototype.setMark = function(index, mark) {
  if (this.board[index] !== ' ') {
    return;
  }
  this.board[index] = mark;
  var row = index / 3;
  var column = index % 3;
  var markCount = (mark == 'X') ? 1 : -1;
  this.rowCounts[row] += markCount;
  this.columnCounts[column] += markCount;
  if (row === column) {
    this.backslashCount += markCount;
  }
  if (row + column === 2) {
    this.slashCount += markCount;
  }
  numMarks++;
};

// Sets the given index to blank.
TTTModel.prototype.unsetMark = function(index) {
  var originalMark = this.board[index];
  if (originalMark === ' ') {
    return;
  }
  this.board[index] = ' ';
  var row = index / 3;
  var column = index % 3;
  var markCount = (originalMark == 'X') ? 1 : -1;
  this.rowCounts[row] -= markCount;
  this.columnCounts[column] -= markCount;
  if (row === column) {
    this.backslashCount -= markCount;
  }
  if (row + column === 2) {
    this.slashCount -= markCount;
  }
  numMarks--;
};

// Returns ' ' if neither X or O has won. Returns 'X' or 'O' otherwise.
TTTModel.prototype.getWinner = function() {
  for (var i = 0; i < 3; i++) {
    if (this.rowCounts[i] === 3 || this.columnCounts[i] === 3) {
      return 'X';
    }
    if (this.rowCounts[i] === -3 || this.columnCounts[i] === -3) {
      return 'O';
    }
  }
  if (this.backslashCount === 3 || this.slashCount === 3) {
    return 'X';
  }
  if (this.backslashCount === -3 || this.slashCount === -3) {
    return 'O';
  }
  return ' ';
}

// Returns the indices that make up the winning line.
TTTModel.prototype.getWinningLine = function() {
  for (var i = 0; i < 3; i++) {
    if (Math.abs(this.rowCounts[i]) === 3) {
      return [i, i + 1, i + 2];
    }
  }
  for (var i = 0; i < 3; i++) {
    if (Math.abs(this.columnCounts[i]) === 3) {
      return [i, i + 3, i + 6];
    }
  }
  if (Math.abs(this.backslashCount) === 3) {
    return [0, 4, 8];
  }
  if (Math.abs(this.slashCount) === 3) {
    return [2, 4, 6];
  }
}
