// Creates computer player with the given mark.
var TTTComputerPlayer = function(mark) {
  this.computerMark = mark;
};

// Returns the index at which the computer player wants to play.
TTTComputerPlayer.prototype.getComputerMove = null;

// Communicates where the human player has played a turn.
TTTComputerPlayer.prototype.humanPlayedAt = null;


var TTTPerfectPlayer = function(mark) {
  TTTComputerPlayer.call(this, mark);

  function constructTree(board, turnMark) {
    var node = new Object();
    node.turnMark = turnMark;
    node.children = new Array(9);
    if (board.getWinner() === 'X') {
      node.xValue = 1;
      node.oValue = -1;
      return node;
    }
    if (board.getWinner() === 'O') {
      node.xValue = -1;
      node.oValue = 1;
      return node;
    }
    if (board.numMarks === 9) {
      node.xValue = 0;
      node.oValue = 0;
      return node;
    }

    for (var i = 0; i < 9; i++) {
      if (board.getMark(i) === ' ') {
        board.setMark(i, turnMark);
        node.children[i] = constructTree(board, turnMark === 'X' ? 'O' : 'X');
        board.unsetMark(i);
      } else {
        node.children[i] = null;
      }
    }

    var bestX = -1;
    var bestXIndex = -1;
    var bestO = -1;
    var bestOIndex = -1;
    for (var i = 0; i < 9; i++) {
      if (node.children[i]) {
        if (node.children[i].xValue >= bestX) {
          bestX = node.children[i].xValue;
          bestXIndex = i;
        }
        if (node.children[i].oValue >= bestO) {
          bestO = node.children[i].oValue;
          bestOIndex = i;
        }
      }
    }
    var bestIndex = turnMark === 'X' ? bestXIndex : bestOIndex;
    if (bestIndex != -1) {
      node.choiceIndex = bestIndex;
      node.xValue = node.children[bestIndex].xValue;
      node.oValue = node.children[bestIndex].oValue;
    }

    return node;
  };
  this.fullTree = constructTree(new TTTModel(), 'X');
  this.current = this.fullTree;
}

TTTPerfectPlayer.prototype = Object.create(TTTComputerPlayer.prototype);

TTTPerfectPlayer.prototype.constructor = TTTPerfectPlayer;

TTTPerfectPlayer.prototype.getComputerMove = function() {
  var move = this.current.choiceIndex;
  this.current = this.current.children[move];
  return move;
};

TTTPerfectPlayer.prototype.humanPlayedAt = function(index) {
  this.current = this.current.children[index];
};
