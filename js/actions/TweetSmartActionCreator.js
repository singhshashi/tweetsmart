var AppDispatcher = require('../dispatcher/AppDispatcher');
var TweetSmartActions = require('../constants/TweetSmartActionTypes');
var TweetSmartConstants = require('../constants/TweetSmartConstants');
var TweetSmartAPIUtils = require('../utils/TweetSmartAPIUtils');

var updateStateOnTweetSuccess = function(data){
    AppDispatcher.dispatch({actionType:TweetSmartActions.TWEET_SUCCESS,lastSuccessfulTweetId:data.statusId});
}

var updateStateOnTweetFailed = function(data){
    AppDispatcher.dispatch({actionType:TweetSmartActions.TWEET_FAILURE});
}

var updateStateOnLoggedIn = function (data) {
    AppDispatcher.dispatch({actionType:TweetSmartActions.SIGN_IN_COMPLETE,signedInTwitterUserId:data.userId,signedInScreenName:data.screenName, signedInSignature:data.sig})
}

var updateStateOnNotLoggedIn = function (data) {
    AppDispatcher.dispatch({actionType:TweetSmartActions.SIGN_OUT});
}

var TweetSmartActionCreator = {
    
    compose: function(text){
        var action = {actionType: TweetSmartActions.COMPOSE, text: text};
        AppDispatcher.dispatch(action);        
    },
    
    numberingpositionatstart:function(numberingpositionatstart){
      AppDispatcher.dispatch({actionType:TweetSmartActions.CHANGE_NUMBERING_POSITION, numberingpositionatstart: numberingpositionatstart});  
    },

    reset: function () {
      AppDispatcher.dispatch({actionType:TweetSmartActions.RESET})
    },
    
    queuetweetstorm: function(tweetstorm){
        AppDispatcher.dispatch({actionType:TweetSmartActions.QUEUE_TWEETSTORM, tweetstorm: tweetstorm});
    },
    
    tweet: function(tweet,signature,lastSuccesfulTweetId){
        TweetSmartAPIUtils.tweet(tweet,signature,lastSuccesfulTweetId).then(updateStateOnTweetSuccess, updateStateOnTweetFailed);
    },
    
    tweetstormsuccess: function(){
        AppDispatcher.dispatch({actionType:TweetSmartActions.TWEETSTORM_SUCCESS})
    },
    
    tweetstormfailed: function(){
        
    },

    signIn: function(signature){
        AppDispatcher.dispatch({actionType:TweetSmartActions.SIGN_IN});
    },

    checkSignedIn: function (signature) {
        TweetSmartAPIUtils.checkSignedIn(signature).then(updateStateOnLoggedIn,updateStateOnNotLoggedIn);
    },

    signOut: function (signature) {
        TweetSmartAPIUtils.signOut(signature);
        AppDispatcher.dispatch({actionType:TweetSmartActions.SIGN_OUT});
    },


    refreshAfterSuccess: function(){
        AppDispatcher.dispatch({actionType:TweetSmartActions.REFRESH_AFTER_SUCCESS});
    },
    
    democompose: function(){
        AppDispatcher.dispatch({actionType:TweetSmartActions.DEMO_COMPOSE})
    }
};

module.exports = TweetSmartActionCreator;