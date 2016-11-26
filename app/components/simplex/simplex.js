angular.module('uptimizer.simplex', [])

.factory('SimplexService', function() {
    var SimplexService = {};

    //All columns are treated as arrays

    SimplexService.check = function() {
        console.log("working!");
    };

    SimplexService.getColumn = function(matrix, colIndex) {
        return matrix.map(function(value,index) { return value[colIndex]; })
    };

    SimplexService.divideRowByNumber = function(row, number) {
        for(var i = 0; i < row.length; i++) {
            row[i] = row[i]/number;
        }
        return row;
    };

    SimplexService.multiplyRowByNumber = function(row, number) {
        for(var i = 0; i < row.length; i++){
            row[i] = row[i] * number;
        }
        return row;
    }

    SimplexService.subtractRows = function(minuend, subtrahend) {
        for(var i = 0; i<minuend.length; i++){
            minuend[i] = minuend[i] - subtrahend[i];
        }
        return minuend;
    };

    SimplexService.IsCleared = function(column) {
        var count = 0;
        for(var i = 0; i < column.length; i++) {
            if(column[i] == 0) count += 1;
        }
        return(count == (column.length -1));
    };

    SimplexService.GetSmallestPositive = function(tr) {
        var smallest = tr.indexOf(tr.reduce(function (prev, curr) {
            return (curr > prev) ? curr : prev;
        }, 0));
        for(var i = 0; i<tr.length; i++) {
            if(tr[i] > 0 && !isNaN(tr[i]) && isFinite(tr[i])) {
                if(tr[i] != 0 && tr[i] < tr[smallest])
                    smallest = i;
            }
        }
        return smallest;
    };

    SimplexService.SimpleGaussJordan = function(matrix, row, col) {
        matrix[row] = SimplexService.divideRowByNumber(matrix[row], matrix[row][col]);
        var normalizedRow = matrix[row];

        for(var i = 0; i<matrix.length; i++){
            if(i != row) {
                var resultingRow = SimplexService.multiplyRowByNumber(
                        normalizedRow, matrix[i][col]);
                matrix[i] = SimplexService.subtractRows(matrix[i], resultingRow);
            }
        }
        return matrix;
    };

    SimplexService.simplex = function(tableau) {
        testCol = SimplexService.IsCleared(SimplexService.getColumn(tableau, 3));
        trSamp = [1.5174, 3.2, 9, NaN];
        console.log(SimplexService.GetSmallestPositive(trSamp));
        //Array.apply(null, Array(testCol.length-1)).map(Number.prototype.valueOf,0);
        console.log(SimplexService.divideRowByNumber([3, -0.1, -0.2, 7.85], 3));
        SimplexService.check();
    };

    return SimplexService;
});
