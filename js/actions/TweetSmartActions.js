var AppDispatcher = require('../dispatcher/AppDispatcher');
var TweetSmartConstants = require('../constants/TweetSmartConstants');

var TweetSmartActions = {
    
    compose: function(text){
        AppDispatcher.dispatch({actionType: TweetSmartConstants.TWEETSMART_COMPOSE, text: text});        
    }
};

module.exports = TweetSmartActions;