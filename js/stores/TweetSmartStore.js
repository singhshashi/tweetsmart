var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var TweetSmartConstants = require('../constants/TweetSmartConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _tweetstormtext = "";


var TweetSmartStore = assign({}, EventEmitter.prototype, {
    
    getTweetStormText: function(){
        return _tweetstormtext;
    }
});

AppDispatcher.register(function(action){
    switch(action.actionType) {
        case TweetSmartConstants.TWEETSMART_COMPOSE: 
            _tweetstormtext = action.text.trim();
            TweetStormStore.emitChange();
            break;    
    }
    
});

module.exports = TweetSmartStore;