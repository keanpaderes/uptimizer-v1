angular.module('uptimizer.simplex', [])

.factory('SimplexService', function() {
    var SimplexService = {};

    //DISCLAIMER: All columns are treated as arrays

    //Main Functions
    SimplexService.simplex = function(tableau) {
        var returnTableau = angular.copy(tableau);

        while(SimplexService.checkForNegative(
            returnTableau[returnTableau.length-1])) {
            var pivotCol = SimplexService.getPivotColumn(returnTableau[returnTableau.length-1]);
            var tr = SimplexService.getTRCol(returnTableau, returnTableau.length, pivotCol);
            var pivotRow = SimplexService.getSmallestPositive(tr);

            returnTableau = SimplexService.simpleGaussJordan(returnTableau, pivotRow, pivotCol);
        }
        for(var i=0; i<returnTableau.length; i++){
            console.log(returnTableau[i]);
        }
        //Should return object with solutions and shit
    };

    SimplexService.simpleGaussJordan = function(matrix, row, col) {
        matrix[row] = SimplexService.divideRowByNumber(matrix[row], matrix[row][col]);
        var normalizedRow = angular.copy(matrix[row]);
        for(var i = 0; i<matrix.length; i++){
            if(i != row) {
                var resultingRow = SimplexService.multiplyRowByNumber(
                    normalizedRow, matrix[i][col]);
                matrix[i] = SimplexService.subtractRows(matrix[i], resultingRow);
            }
        }
        return matrix;
    };

    SimplexService.getPivotColumn = function(row) {
        var column = angular.copy(row);
        column.splice(row.length-1, 1);
        return column.indexOf(Math.min.apply(Math, column));
    }

    SimplexService.getTRCol = function(tableau, trLength, pivotCol) {
        var retTR = Array.apply(null, Array(trLength))
        .map(Number.prototype.valueOf,0);

        for(var i = 0; i < tableau.length; i++){
            retTR[i] = tableau[i][tableau[i].length-1] / tableau[i][pivotCol];
        }
        return retTR;
    };

    SimplexService.isCleared = function(column) {
        var count = 0;
        for(var i = 0; i < column.length; i++) {
            if(column[i] == 0) count += 1;
        }
        return(count == (column.length -1));
    };

    SimplexService.getSmallestPositive = function(tr) {
        var clone = angular.copy(tr);
        var smallest = clone.indexOf(clone.reduce(function (prev, curr) {
            return (curr > prev) ? curr : prev;
        }, 0));
        for(var i = 0; i<clone.length; i++) {
            if(clone[i] > 0 && !isNaN(clone[i]) && isFinite(clone[i])) {
                if(clone[i] != 0 && clone[i] < clone[smallest])
                smallest = i;
            }
        }
        return smallest;
    };

    //Additional Functions (Can make to another service)
    SimplexService.getColumn = function(matrix, colIndex) {
        return matrix.map(function(value,index) { return value[colIndex]; })
    };

    SimplexService.divideRowByNumber = function(row, number) {
        var retDiv = angular.copy(row);
        for(var i = 0; i < row.length; i++) {
            retDiv[i] = retDiv[i]/number;
        }
        return retDiv;
    };

    SimplexService.multiplyRowByNumber = function(row, number) {
        var retMult = angular.copy(row);
        for(var i = 0; i < row.length; i++){
            retMult[i] = retMult[i] * number;
        }
        return retMult;
    }

    SimplexService.subtractRows = function(minuend, subtrahend) {
        var retSubt = angular.copy(minuend);
        for(var i = 0; i<minuend.length; i++){
            retSubt[i] = retSubt[i] - subtrahend[i];
        }
        return retSubt;
    };

    SimplexService.checkForNegative = function(row) {
        var ret = false;
        for(var i = 0; i < row.length; i++) {
            if(row[i] < 0) return true;
        }
        return ret;
    }

    return SimplexService;
});
