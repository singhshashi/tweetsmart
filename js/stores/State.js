var Constants = require('../constants/TweetSmartConstants');


var ApplicationState = {
    get tweetStormText (){
        return localStorage.getItem(Constants.KEY_TWEETSTORMTEXT) != null ? localStorage.getItem(Constants.KEY_TWEETSTORMTEXT) : '';
    },

    set tweetStormText(value){
        localStorage.setItem(Constants.KEY_TWEETSTORMTEXT, value);
    },

    get numberingPositionAtStart (){
        return localStorage.getItem(Constants.KEY_NUMBERINGPOSITIONATSTART) != null ? localStorage.getItem(Constants.KEY_NUMBERINGPOSITIONATSTART) : true;
    },

    set numberingPositionAtStart (value){
        localStorage.setItem(Constants.KEY_NUMBERINGPOSITIONATSTART,value);
    },

    get queuedTweets(){
        return localStorage.getItem(Constants.KEY_QUEUEDTWEETS) != null ? JSON.parse(localStorage.getItem(Constants.KEY_QUEUEDTWEETS)) : [];
    },

    set queuedTweets(value){
        localStorage.setItem(Constants.KEY_QUEUEDTWEETS,JSON.stringify(value));
    },

    get signedIn() {
        return localStorage.getItem(Constants.KEY_SIGNEDIN) != null ? localStorage.getItem(Constants.KEY_SIGNEDIN) : -1;
    },

    set signedIn(value) {
        localStorage.setItem(Constants.KEY_SIGNEDIN,value);
    },

    get signedInTwitterUserId () {
        return localStorage.getItem(Constants.KEY_SIGNEDINUSERID) != null ? localStorage.getItem(Constants.KEY_SIGNEDINUSERID)  :-1;
    },

    set signedInTwitterUserId (value){
        localStorage.setItem(Constants.KEY_SIGNEDINUSERID,value);
    },

    get signedInScreenName(){
        return localStorage.getItem(Constants.KEY_SIGNEDINSCREENNAME) != null ? localStorage.getItem(Constants.KEY_SIGNEDINSCREENNAME) : "";
    },

    set signedInScreenName(value) {
        localStorage.setItem(Constants.KEY_SIGNEDINSCREENNAME,value);
    },

    get signedInSignature(){
        return localStorage.getItem(Constants.KEY_SIGNEDINSIGNATURE) != null ? localStorage.getItem(Constants.KEY_SIGNEDINSIGNATURE) : "";
    },

    set signedInSignature(value) {
        localStorage.setItem(Constants.KEY_SIGNEDINSIGNATURE, value);
    },

    get lastSuccessfulTweetId(){
        return localStorage.getItem(Constants.KEY_LASTSUCCESSFULTWEETID) != null ? localStorage.getItem(Constants.KEY_LASTSUCCESSFULTWEETID) : -1;
    },

    set lastSuccessfulTweetId(value) {
        localStorage.setItem(Constants.KEY_LASTSUCCESSFULTWEETID,value);
    }
}

var State = {
    AppState: ApplicationState,
    UIState: {
        tweetbutton:null,
        composebox: true
    }
}

module.exports = State;