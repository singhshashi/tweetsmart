var Utils = {
    
    getArrayOfIndices: function(text,char){
        var maxIndex = text.length;
        var resultArray = [];
        var index = text.indexOf(char);
        var lastIndex = text.lastIndexOf(char);
        while(index <= lastIndex && index != -1)
            {
                resultArray.push(index);
                if (index < lastIndex)
                    {
                        index = text.substr(index+1).indexOf(char) + index + 1;
                    }
                else{
                    index = lastIndex + 1999;//some random addition to fail test condition on next iteration
                }
            }
        return resultArray;
    }, 
    
    getMaxOfNumberArray: function(array){
        return Math.max.apply(null,array);
    }, 
    
    getNeighboursInSortedNumberArray: function fx(array,num){
        var neighbours = {leftSideNeighbour:null, rightSideNeighbour:null};
        
        var arraySize = array.length;
        var diff1,diff2;
        
        if (arraySize === 0)
            {
                return neighbours;                
            }
    
        if (num === array[0] && arraySize > 1)
            {                
                neighbours.leftSideNeighbour = null;
                neighbours.rightSideNeighbour = array[1];                                        
                return neighbours;
            }
        
        if (num === array[arraySize - 1] && arraySize > 1)
            {
                neighbours.leftSideNeighbour = array[arraySize - 2];
                neighbours.rightSideNeighbour = null;
                return neighbours;
            }
        
        diff1 = num - array[Math.floor(array.length/2 -1)];
        diff2 = num - array[Math.floor(array.length/2)];        

        if (arraySize === 1)
            {
                if (diff2 > 0)
                    {
                        neighbours.leftSideNeighbour = num - diff2;
                        neighbours.rightSideNeighbour = null;
                    }
                else if (diff2 < 0)
                    {
                        neighbours.leftSideNeighbour = null;
                        neighbours.rightSideNeighbour = num - diff2;
                    }

            }
//        console.log('Diff1:'+diff1 + ' Diff2:'+diff2 + ' ArrayLength:'+array.length);
//        console.log(array);
        var diffProd = diff1*diff2;
        if (diffProd === 0 || Number.isNaN(diff1) || Number.isNaN(diff2))
            {
                neighbours.leftSideNeighbour = null;
                neighbours.rightSideNeighbour = null;
                return neighbours;
            }
        else if ((diffProd) < 0 )
            {
                neighbours.leftSideNeighbour = num - diff1;
                neighbours.rightSideNeighbour = num - diff2; //diff2 is negative, so subtract to add
                return neighbours;
            }
        else if (diff1 < 0){
            var len1 = Math.floor(array.length/2)
            return fx(array.slice(0,Math.floor(array.length/2)),num);
        }
        else{
            return fx(array.slice(Math.floor(array.length/2),array.length),num);
        }
        return neighbours;
    }
};

module.exports = Utils;