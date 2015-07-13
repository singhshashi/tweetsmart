var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var TweetSmartConstants = require('../constants/TweetSmartConstants');
var assign = require('object-assign');
var Utils = require('../utils/Utils');
var _ = require('../../node_modules/underscore/underscore');

var CHANGE_EVENT = 'change';
const TWEET_LENGTH = 140;
const WORD_SEPARATOR = ' ';

var _tweetstormtext = "";




var TweetSmartStore = assign({}, EventEmitter.prototype, {
    
    getTweetStormText: function(){
        return _tweetstormtext;
    },
    
    getTweetStorm: function(){
        var tweetStorm = [];
        if (_tweetstormtext.length > 0)
        {
            var spaceIndexArr = Utils.getArrayOfIndices(_tweetstormtext,WORD_SEPARATOR);
            if (Utils.getMaxOfNumberArray(spaceIndexArr) <= TWEET_LENGTH)
            {
                tweetStorm.push({key:0,text:_tweetstormtext});
            }
            else{
                    var splitPoints = [];
                    splitPoints.push(0);//initialize with 0 which is used later when splitting using substr
                    var i;
                    var possibleNumberOfTweets = Math.floor(_tweetstormtext.length/TWEET_LENGTH);

                    var index = 0;
                    while(index != null)
                        {
                            var neighbours = Utils.getNeighboursInSortedNumberArray(spaceIndexArr, index + TWEET_LENGTH);
                            if (neighbours.rightSideNeighbour == null)
                                {
                                    index = null;
                                }
                            else{
                                    splitPoints.push(neighbours.leftSideNeighbour);
                                    index = neighbours.leftSideNeighbour;                                
                            }
                        }                    
                    
                
                    var splitPointPairs = [];
                    var i;
                    var limit = splitPoints.length;
                    for (i = 0; i < limit; i++) {
                        if(isNaN(splitPoints[i+1]))
                            {
                                splitPointPairs.push({start:splitPoints[i],length:_tweetstormtext.length - splitPoints[i]});
                            }
                        else{
                            splitPointPairs.push({start:splitPoints[i],length: splitPoints[i+1] - splitPoints[i]});                            
                        }
                    }
                
//                console.log(splitPointPairs);
                    
                    _.each(splitPointPairs, function(splitPointPair,index){
                        tweetStorm.push({key:index,text:_tweetstormtext.substr(splitPointPair.start,splitPointPair.length)});
                    });                
            }            
        }        
        return tweetStorm;
    }, 
    
    emitChange: function(){
        this.emit(CHANGE_EVENT);
    }, 
    
    addChangeListener: function(callback){
        this.on(CHANGE_EVENT,callback);
    }, 
    
    removeChangeListener: function(callback){
        this.removeListener(CHANGE_EVENT, callback);
    }
});

AppDispatcher.register(function(action){
    switch(action.actionType) {
        case TweetSmartConstants.TWEETSMART_COMPOSE: 
            _tweetstormtext = action.text;
            TweetSmartStore.emitChange();
            break;    
    }
    
});

module.exports = TweetSmartStore;