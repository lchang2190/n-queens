// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      //get row at rowIndex
      var row = this.get(rowIndex);
      //create a count to record occupied squares
      var count = 0;
      //loop through row
      for (var i = 0; i < row.length; i++) {
        if (row[i] === 1) {
          count++;
        }
        if (count > 1) {
          return true;
        }
      }
      //incremement counter if square occupied

      //return true if counter greater 1
      return false; // fixme
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var rows = this.rows();
      
      for (var i = 0; i < rows.length; i++) {
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      }
      return false;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var rows = this.rows(); // fixme

      var col = [];
      for (var i = 0; i < rows.length; i++) {
        col.push(rows[i][colIndex]);
      } 
      
      var count = 0;
      //loop through row
      for (var i = 0; i < col.length; i++) {
        if (col[i] === 1) {
          count++;
        }
        if (count > 1) {
          return true;
        }
      }
      //incremement counter if square occupied

      //return true if counter greater 1
      return false; 
      
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {      
      for (var i = 0; i < this.get('n'); i++) {
        if (this.hasColConflictAt(i)) {
          return true;
        }
      }
      return false;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {

      var board = this.rows();
      //set col to majorDiag
      var col = majorDiagonalColumnIndexAtFirstRow;
      //set row to 0
      var row = 0;
      //create count and set to zero
      var count = 0;
      var n = this.get('n');

      do {
        //if col and row greater zero
        if (col >= 0 && row >= 0) {
          //check for queen at [row, col]
          if (board[row][col] === 1) {
            //if queen found increment counter
            count++;
            //if counter greater than 1
            if (count > 1) {
              return true;
            }
          }
        }
        //increment row and col
        row++;
        col++;
      } while (row < n && col < n);    
  
      return false;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var n = this.get('n');
      //at row 0 loop through column 0 - (n-2)
      for (var i = 0; i < (n - 1); i++) {
        //if call hasDiagAt(getFirstRow(row,col) is true
        if (this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(0, i))) {  
          return true;
        }
      }

      //at col 0 loop through rows 1 - (n-2)
      for (var i = 1; i < (n - 1); i++) {
        //if call hasDiagAt(getFirstRow(row,col) is true
        if (this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(i, 0))) {  
          return true;
        }
      }
      return false;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var board = this.rows();
      //set col to majorDiag
      var col = minorDiagonalColumnIndexAtFirstRow;
      //set row to 0
      var row = 0;
      //create count and set to zero
      var count = 0;
      var n = this.get('n');

      do {
        //if col and row greater zero
        if (col < n) {
          //check for queen at [row, col]
          if (board[row][col] === 1) {
            //if queen found increment counter
            count++;
            //if counter greater than 1
            if (count > 1) {
              return true;
            }
          }
        }
        //increment row and col
        row++;
        col--;
      } while (col >= 0 && row < n);    
  
      return false;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var n = this.get('n');
      //at row 0 loop through column 0 - (n-2)
      for (var i = (n - 1); i > 0; i--) {
        //if call hasDiagAt(getFirstRow(row,col) is true
        if (this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(0, i))) {  
          return true;
        }
      }

      //at col 0 loop through rows 1 - (n-2)
      for (var i = 1; i < (n - 1); i++) {
        //if call hasDiagAt(getFirstRow(row,col) is true
        if (this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(i, (n - 1)))) {  
          return true;
        }
      }
      return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
