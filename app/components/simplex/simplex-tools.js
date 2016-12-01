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
    SimplexTools.createColumnHeaders = function(varList, slackList) {
        var i = 0;
        var retArr = [];
        for(i = 0; i < varList.length; i++){
            retArr.push(varList[i]);
        }
        for(i = 0; i < slackList.length; i++){
            retArr.push(slackList[i]);
        }
        retArr.push("z");
        retArr.push("ans");

        return retArr;
    }

    SimplexTools.createRow = function(constraintObject, variableList,
        numOfConstraints, colNum, isConstraint) {
        var retArr = [], i = 0, j = 0, ans = 0, z = 0;

        if(isConstraint){
            ans = parseInt(constraintObject[1]);

            var sC = constraintObject[0].split(" + ");

            for(i = 0; i < variableList.length; i++){
                if(sC.length != j){
                    var spl = sC[j].split(" * ");
                    if(spl[1] === variableList[i]){
                        retArr.push(parseInt(spl[0]));
                        j++;
                    } else {
                        retArr.push(0);
                    }
                } else {
                    retArr.push(0);
                }
            }

            z = 0
        } else {
            for (i = 0; i < constraintObject.length; i++){
                retArr.push(constraintObject[i]);
            }

            z = 1;
            ans = 0;
        }
        
        for(i = 0; i < numOfConstraints; i++){
            if(colNum == i) {
                retArr.push(1);
            } else retArr.push(0);
        }
        retArr.push(z);
        retArr.push(ans);
        return retArr;
    };


    SimplexTools.createTableau = function(valueList,
        constraintsList, variableList) {
        var retTab = [];
        var i = 0, //colNum's +2 is for z and ans
            colNum = valueList.length + constraintsList.length + 2;

        //constraints
        for(i = 0; i < constraintsList.length; i++){
            var row = SimplexTools.createRow(
                constraintsList[i], variableList,
                constraintsList.length, i, true
            );
            retTab.push(row);
        }
        //obj function
        var row = SimplexTools.createRow(
            valueList, variableList,
            constraintsList.length, i, false
        );
        retTab.push(row);
        return retTab;
    };

    return SimplexTools;
});
