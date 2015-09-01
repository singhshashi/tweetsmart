var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var TweetSmartActions = require('../constants/TweetSmartActionTypes');
var TweetSmartConstants = require('../constants/TweetSmartConstants');
var assign = require('object-assign');
var Utils = require('../utils/Utils');
var _ = require('../../node_modules/underscore/underscore');
var State = require('./State');
var AppState = State.AppState;
var UIState = State.UIState;


var CHANGE_EVENT = 'change';
//const TWEET_LENGTH = 140;
const WORD_SEPARATOR = ' ';

var demo_text = 'I am not a numbered tweet right now as I am alone. But as soon as the core message I am conveying crosses over to the next tweet, you will see that both of us are numbered. And you did not have to even wonder how that was done. Wow that was cool!';
//I am Daenerys Stormborn of the House Targaryen, the First of Her Name, the Unburnt, Queen of Meereen, Queen of the Andals and the Rhoynar and the First Men, Khaleesi of the Great Grass Sea, Breaker of Chains, and Mother of Dragons. 
var index = 0;

var textafternextletter = function(){
    if (index <= demo_text.length)
        {
            return demo_text.substr(0, index++);
        }
        else{
            index = 0;
            return '';
        }
}


var TweetSmartDemoStore = assign({}, EventEmitter.prototype, {
    
    getAppState: function(){
        return AppState;
    },
    
    getUIState: function(){
      return UIState;  
    },
    
    getSignedInSignature: function(){
      var sig = Utils.getParameterByName('sig');
        if (sig === null || sig === '')
            return null;
        return sig;
    },
    
    getTweetStorm: function(){
        if (AppState.queuedtweets.length > 0)
            {
                return AppState.queuedtweets;
            }
        
        var tweetStorm = [];
        if (AppState.tweetstormtext.length > 0)
        {
            var spaceIndexArr = Utils.getArrayOfIndices(AppState.tweetstormtext,WORD_SEPARATOR);
            if (Utils.getMaxOfNumberArray(spaceIndexArr) <= TweetSmartConstants.TWEET_LENGTH)
            {
                tweetStorm.push({key:0,text:AppState.tweetstormtext});
            }
            else{
                    var splitPoints = [];
                    splitPoints.push(0);//initialize with 0 which is used later when splitting using substr
                    var i;
                    var possibleNumberOfTweets = Math.floor(AppState.tweetstormtext.length/TweetSmartConstants.TWEET_LENGTH);

                    var index = 0;
                    while(index != null)
                        {
                            var neighbours = Utils.getNeighboursInSortedNumberArray(spaceIndexArr, index + TweetSmartConstants.TWEET_LENGTH);
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
                                splitPointPairs.push({start:splitPoints[i],length:AppState.tweetstormtext.length - splitPoints[i]});
                            }
                        else{
                            splitPointPairs.push({start:splitPoints[i],length: splitPoints[i+1] - splitPoints[i]});                            
                        }
                    }
                
//                console.log(splitPointPairs);
                    
                    _.each(splitPointPairs, function(splitPointPair,index){
                        
                        var numberedTweet = '';
                       if (AppState.numberingpositionatstart)
                       {
                         numberedTweet = (index + 1).toString() + '/' + this.length + ' ' +                  AppState.tweetstormtext.substr(splitPointPair.start,splitPointPair.length);
                       }                   
else{
      numberedTweet =  AppState.tweetstormtext.substr(splitPointPair.start,splitPointPair.length) + ' ' + (index + 1).toString() + '/' + this.length;
}
                        tweetStorm.push({key:index,text:numberedTweet});
                    },splitPointPairs);                
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
        case TweetSmartActions.DEMO_COMPOSE: 
            AppState.tweetstormtext = textafternextletter();
            if (AppState.tweetstormtext.length === demo_text.length)
                {
//                     setTimeout(function(){TweetSmartDemoStore.emitChange()}, 3500);                  
                }
            else{
                TweetSmartDemoStore.emitChange();                
            }
            break;        
        case TweetSmartActions.CHANGE_NUMBERING_POSITION:
            AppState.numberingpositionatstart = action.numberingpositionatstart;
            TweetSmartDemoStore.emitChange();
            break;
    }
    
});

module.exports = TweetSmartDemoStore;