angular.module('uptimizer.simplex-tools', [])

.factory('SimplexTools', function() {
    var SimplexTools = {};

    //Operations
    SimplexTools.getColumn = function(matrix, colIndex) {
        return matrix.map(function(value,index) { return value[colIndex]; })
    };

    SimplexTools.divideRowByNumber = function(row, number) {
        var retDiv = angular.copy(row);
        for(var i = 0; i < row.length; i++) {
            retDiv[i] = retDiv[i]/number;
        }
        return retDiv;
    };

    SimplexTools.multiplyRowByNumber = function(row, number) {
        var retMult = angular.copy(row);
        for(var i = 0; i < row.length; i++){
            retMult[i] = retMult[i] * number;
        }
        return retMult;
    }

    SimplexTools.subtractRows = function(minuend, subtrahend) {
        var retSubt = angular.copy(minuend);
        for(var i = 0; i<minuend.length; i++){
            retSubt[i] = retSubt[i] - subtrahend[i];
        }
        return retSubt;
    };

    SimplexTools.checkForNegative = function(row) {
        var ret = false;
        for(var i = 0; i < row.length; i++) {
            if(row[i] < 0) return true;
        }
        return ret;
    }

    //Input handling
    

    return SimplexTools;
});
