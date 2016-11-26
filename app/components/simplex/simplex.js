angular.module('uptimizer.simplex', [])

.factory('SimplexService', function() {
    var SimplexService = {};

    SimplexService.check = function() {
        console.log("working!");
    };

    SimplexService.getColumn = function(matrix, colIndex) {
        return matrix.map(function(value,index) { return value[colIndex]; })
    }

    SimplexService.IsCleared = function(column) {
        var count = 0;
        for(var i = 0; i < column.length; i++) {
            if(column[i] == 0) count += 1;
        }
        return(count == (column.length -1));
    };
    SimplexService.simplex = function(tableau) {
        console.log(SimplexService.IsCleared(SimplexService.getColumn(tableau, 3)));
        SimplexService.check();
    };

    return SimplexService;
});
