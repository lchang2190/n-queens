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
  var solutionCount = 0; //fixme
  
  //generate solutions array with n elements;
  var solutions = [];
  for ( var i = 0; i < n; i++) {
    solutions[i] = Math.pow(2, i); 
  }
  
  results = [];  

  var findSolutions = function (sol, rem) {
 
    if (rem.length === 1) { 
      sol.push(rem);
      results.push(sol);
      solutionCount++;
      return;

    } else {
      array.forEach(function(value) {
        var value = array[0];
        sol.push(value);
        var arr = array.splice(1);
        findSolutions(sol, arr);
      });
    }
  };
  
  findSolutions(solutions);

  return solutionCount;
 
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
