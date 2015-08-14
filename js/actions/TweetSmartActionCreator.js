var AppDispatcher = require('../dispatcher/AppDispatcher');
var TweetSmartActions = require('../constants/TweetSmartActionTypes');
var TweetSmartConstants = require('../constants/TweetSmartConstants');
var TweetSmartAPIUtils = require('../utils/TweetSmartAPIUtils');

var updateStateOnTweetSuccess = function(data){
    AppDispatcher.dispatch({actionType:TweetSmartActions.TWEETSMART_TWEET, success: true});
}

var updateStateOnTweetFailed = function(data){
    AppDispatcher.dispatch({actionType:TweetSmartActions.TWEETSMART_TWEET, success: false});
}

var TweetSmartActionCreator = {
    
    compose: function(text){
        var action = {actionType: TweetSmartActions.TWEETSMART_COMPOSE, text: text};
        AppDispatcher.dispatch(action);        
    }, 
    
    tweetsmart: function(tweetstorm,signature){
         console.log("Inside action");
        AppDispatcher.dispatch({actionType:TweetSmartActions.TWEETSMART_TWEET,success:null});
        TweetSmartAPIUtils.tweetsmart(tweetstorm,signature).then(updateStateOnTweetSuccess, updateStateOnTweetFailed);        
    },
    
    refreshAfterSuccess: function(){
        AppDispatcher.dispatch({actionType:TweetSmartActions.REFRESH_AFTER_SUCCESS});
    }
};

module.exports = TweetSmartActionCreator;