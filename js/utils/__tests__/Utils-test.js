jest.dontMock('../Utils');

describe('UtilsTests', function(){
    
    var Utils;
    
    beforeEach(function(){
        Utils = require('../Utils');
    })
    
    it('returns empty array when text passed is empty',function(){
        var result = Utils.getArrayOfIndices("",' ');
        expect(Array.isArray(result)).toBeTruthy();        
        expect(result.length).toBe(0);
    });
    
    
    it('returns array with correct count of spaces',function(){
        var result = Utils.getArrayOfIndices("Foreign exchange reserves divided by short-term foreign debt is at a very low (1990) level. Balance of payments' current account deficit as a ratio", ' ');
        expect(result.length).toBe(23);
        expect(result[0]).toBe(7);
        
    });
    
    
    it('returns correct neighbours',function(){

        var arr = [3,5,15,18,21,26,35,41,45,52,59,64,69,78,82,90,98,110,125,134,137,146,154,159,168];
        
        var result = Utils.getNeighboursInSortedNumberArray(arr,70);
        expect(result.leftSideNeighbour).toBe(69);
        expect(result.rightSideNeighbour).toBe(78);   

        result = Utils.getNeighboursInSortedNumberArray(arr,140);
        expect(result.leftSideNeighbour).toBe(137);
        expect(result.rightSideNeighbour).toBe(146);
        
        result = Utils.getNeighboursInSortedNumberArray(arr,3);
        expect(result.leftSideNeighbour).toBe(null);
        expect(result.rightSideNeighbour).toBe(5);
        
        result = Utils.getNeighboursInSortedNumberArray(arr,168);
        expect(result.leftSideNeighbour).toBe(159);
        expect(result.rightSideNeighbour).toBe(null);
        
        result = Utils.getNeighboursInSortedNumberArray(arr,1);
        expect(result.leftSideNeighbour).toBe(null);
        expect(result.rightSideNeighbour).toBe(null);

        result = Utils.getNeighboursInSortedNumberArray(arr,190);
        expect(result.leftSideNeighbour).toBe(null);
        expect(result.rightSideNeighbour).toBe(null);

    });




});