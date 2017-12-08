/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(_n) {
  
  //create new enmpty board of size(n)
  var solution = new Board({n: _n});   


  //iterate through index of each square on board
  for (var row = 0; row < _n; row++) {
    for (var col = 0; col < _n; col++) {
      solution.togglePiece(row, col);
      if (solution.hasAnyRooksConflicts()) {
        solution.togglePiece(row, col);
      }
      //for each square check if conflict is true
    }
  } 
      //if no conflict add rook at [row,col]
  return solution.rows(); 
};

  //return solutio

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {

  var solutionCount = 0; 
  var solutions = [];

  var recurse = function(row = 0, moves = []) {
    
    for (var col = 0; col < n; col++) {
      
      //checking if column has already been used
      if (moves.indexOf(col) === -1) {
        nextMoves = moves.concat(col);
        
        nextRow = row + 1;

        //check that next row is still within the board
        //if outside board boundary then we must have found
        //a solution.
        if (nextRow >= n) {
          //var board = new Board({n:n});

          //create a new board representing the solution
          //for( var movesRow = 0; movesRow < n; movesRow++) {
            //board.togglePiece(movesRow, nextMoves[movesRow]);
          //}
          //double check that no conflicts exist
          //if (!board.hasAnyRooksConflicts()) {

            
            solutionCount++;
            //solutions.push(board);
          //} else {
            //console.log("FAIL");
          //}
          return;
        }

        recurse(nextRow, nextMoves);
      }
    }
  };

  recurse();
  //solutions.forEach((board) => console.log(JSON.stringify(board.rows())));
  return solutionCount;
};


// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) { 
  var solutionCount = 0; 
  var solutions = [];

  if (n === 0 || n === 2 || n === 3) {
    return new Board({n:n}).rows();
  }

  var recurse = function(row = 0, moves = []) {
    
    for (var col = 0; col < n; col++) {
      
      //checking if column has already been used
      if (moves.indexOf(col) === -1) {
        nextMoves = moves.concat(col);
        
        nextRow = row + 1;

        //check that next row is still within the board
        //if outside board boundary then we must have found
        //a solution.
        if (nextRow >= n) {
          var board = new Board({n:n});

          //create a new board representing the solution
          for( var movesRow = 0; movesRow < n; movesRow++) {
            board.togglePiece(movesRow, nextMoves[movesRow]);
          }
          //double check that no conflicts exist
          if (!board.hasAnyQueensConflicts()) {

            solutions.push(board);
            solutionCount++;
          }
            //solutions.push(board);
          //} else {
            //console.log("FAIL");
          //}
          return;
        }

        recurse(nextRow, nextMoves);
      }
    }
  };

  recurse();
  //solutions.forEach((board) => console.log(JSON.stringify(board.rows())));
  return solutions[0].rows();

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));

};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
    var solutionCount = 0; 
  var solutions = [];

  if (n === 0) {
    return 1;
  }

  if ( n === 2 || n === 3) {
    return 0;
  }

  var recurse = function(row = 0, moves = []) {
    
    for (var col = 0; col < n; col++) {
      
      //checking if column has already been used
      if (moves.indexOf(col) === -1) {
        nextMoves = moves.concat(col);
        
        nextRow = row + 1;

        //check that next row is still within the board
        //if outside board boundary then we must have found
        //a solution.
        if (nextRow >= n) {
          var board = new Board({n:n});

          //create a new board representing the solution
          for( var movesRow = 0; movesRow < n; movesRow++) {
            board.togglePiece(movesRow, nextMoves[movesRow]);
          }
          //double check that no conflicts exist
          if (!board.hasAnyMajorDiagonalConflicts() && !board.hasAnyMinorDiagonalConflicts()) {

            //solutions.push(board);
            solutionCount++;
          }
            //solutions.push(board);
          //} else {
            //console.log("FAIL");
          //}
          return;
        }

        recurse(nextRow, nextMoves);
      }
    }
  };

  recurse();
  //solutions.forEach((board) => console.log(JSON.stringify(board.rows())));

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
