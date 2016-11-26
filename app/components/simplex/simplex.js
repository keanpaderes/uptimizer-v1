angular.module('uptimizer.simplex', [])

.factory('SimplexService', function() {
    var SimplexService = {};

    //All columns are treated as arrays

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

    SimplexService.GetSmallestPositive = function(tr) {
        var smallest = tr.indexOf(tr.reduce(function (prev, curr) {
            return (curr > prev) ? curr : prev;
        }, 0));

        console.log(smallest);
        for(var i = 0; i<tr.length; i++) {
            if(tr[i] > 0 && !isNaN(tr[i]) && isFinite(tr[i])) {
                console.log(tr[i]);
                if(tr[i] != 0 && tr[i] < tr[smallest])
                    smallest = i;
            }
        }
        console.log("Smallest " + tr[smallest]);
        return(smallest);
    }

    SimplexService.simplex = function(tableau) {
        testCol = SimplexService.IsCleared(SimplexService.getColumn(tableau, 3));
        trSamp = [1.5174, 3.2, 9, NaN];
        console.log(SimplexService.GetSmallestPositive(trSamp));
        //Array.apply(null, Array(testCol.length-1)).map(Number.prototype.valueOf,0);

        SimplexService.check();
    };

    return SimplexService;
});
