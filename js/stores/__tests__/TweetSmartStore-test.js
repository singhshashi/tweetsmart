jest.dontMock('../../constants/TweetSmartConstants');
jest.dontMock('../TweetSmartStore');
jest.dontMock('object-assign');

describe('TweetSmartStore', function(){
    
    var TweetSmartConstants = require('../../constants/TweetSmartConstants');
    var AppDispatcher; 
    var TweetSmartStore; 
    var callback;
    
    
    beforeEach(function(){
        AppDispatcher = require('../../dispatcher/AppDispatcher');
        TweetSmartStore = require('../TweetSmartStore');
        callback = AppDispatcher.register.mock.calls[0][0];
    });

    it('registers a callback with the dispatcher', function(){
        expect(AppDispatcher.register.mock.calls.length).toBe(1);
    });    
    
    it('should initialize with empty text', function(){
        var text = TweetSmartStore.getTweetStormText();
        expect(text).toEqual("");
    })
});





