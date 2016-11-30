angular.module('uptimizer.simplex-service', ['uptimizer.simplex-tools'])

.factory('SimplexService',['SimplexTools', function(SimplexTools) {
    var SimplexService = {};

    //DISCLAIMER: All columns are treated as arrays

    //Main Functions
    SimplexService.simplex = function(tableau, solnHeaders) {
        var returnTableau = angular.copy(tableau);
        var initBasicSolution = SimplexService.initializeBasicSolution(solnHeaders);
        var basicSolutionArray = [];
        var iterationNumber = 0;


        while(1) {
            basicSolutionArray = SimplexService.addToBasicSolutionArray(initBasicSolution, basicSolutionArray, returnTableau);

            if(!SimplexTools.checkForNegative(returnTableau[returnTableau.length-1])) break;

            var pivotCol = SimplexService.getPivotColumn(returnTableau[returnTableau.length-1]);
            var tr = SimplexService.getTRCol(returnTableau, returnTableau.length, pivotCol);
            var pivotRow = SimplexService.getSmallestPositive(tr);

            returnTableau = SimplexService.simpleGaussJordan(returnTableau, pivotRow, pivotCol);
            iterationNumber++;
        }

        console.log(basicSolutionArray);
        for(var i=0; i<returnTableau.length; i++){
            console.log(returnTableau[i]);
        }
        //Should return object with solutions and shit
        return {
            "tableau" : returnTableau,
            "solutionArray" : basicSolutionArray
        };
    };

    SimplexService.initializeBasicSolution = function(solnHeaders) {
        //ensure it has an "ans"
        var returnObject = {};
        returnObject.headers = angular.copy(solnHeaders);
        returnObject.headers.splice(solnHeaders.indexOf("ans"),1);

        return returnObject;
    };

    SimplexService.addToBasicSolutionArray = function(basicSoln, basicSolutionArray, currTableau) {
        var baseObj = angular.copy(basicSoln);
        var numberOfColumns = currTableau[0].length;
        var returnArray = angular.copy(basicSolutionArray);
        baseObj.values = [];

        for(var i = 0; i < baseObj.headers.length; i++) {
            var col = SimplexTools.getColumn(currTableau, i);
            if(SimplexService.isCleared(col)) {
                var rowNumber = col.indexOf(angular.copy(col).filter(function(value){
                    return value > 0;
                })[0]);
                baseObj.values.push(
                    currTableau[rowNumber][numberOfColumns-1]/currTableau[rowNumber][i]
                );
            } else {
                baseObj.values.push(0);
            }
        }

        returnArray.push(baseObj);
        return returnArray;
    };

    SimplexService.simpleGaussJordan = function(matrix, row, col) {
        matrix[row] = SimplexTools.divideRowByNumber(matrix[row], matrix[row][col]);
        var normalizedRow = angular.copy(matrix[row]);
        for(var i = 0; i<matrix.length; i++){
            if(i != row) {
                var resultingRow = SimplexTools.multiplyRowByNumber(
                    normalizedRow, matrix[i][col]);
                matrix[i] = SimplexTools.subtractRows(matrix[i], resultingRow);
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

    return SimplexService;
}]);
