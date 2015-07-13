jest.dontMock('../../constants/TweetSmartConstants');
jest.dontMock('../TweetSmartStore');
jest.dontMock('object-assign');
jest.dontMock('../../utils/Utils');//shouldn't this be mocked?

describe('TweetSmartStore', function(){
    
    var TweetSmartConstants = require('../../constants/TweetSmartConstants');
    var AppDispatcher; 
    var TweetSmartStore; 
    var callback;
    
    
    var actionTweetStormComposeOneTweet = {
            actionType: TweetSmartConstants.TWEETSMART_COMPOSE, 
            text:'I am testing a #tweet which is less than 140 chars for tweetsmart'
        };
    
    var actionTweetStormComposeTwoTweets = {
        actionType:TweetSmartConstants.TWEETSMART_COMPOSE,
        text:"Foreign exchange reserves divided by short-term foreign debt is at a very low (1990) level. Balance of payments' current account deficit as a ratio"
    }
    
     
    var actionTweetStormComposeMultipleTweets = {
        actionType:TweetSmartConstants.TWEETSMART_COMPOSE,
        text:"Foreign exchange reserves divided by short-term foreign debt is at a very low (1990) level. Balance of payments' current account deficit as a ratio of GDP is highest since 1990, at 4.0%. Total fiscal deficit in the Central and State Budgets now exceeds the danger mark of 12% of GDP, thereby committing a crime under the Fiscal Management Act passed by Parliament in 2005. Reverse short-term capital outflow by panic cashing of Participatory Notes, hawala operations, and rigged short-selling of the rupee in Dubai and Singapore, has accelerated destabilizing the rupee/$ rate, which as a consequence has fallen by record amount. India’s household savings rate, which was the highest in the world in 2004 has fallen, and is also shifting to hoarded non-financial assets, which is causing a huge fall in the growth rate of GDP, due to decline in investment and in employment. These trends are aggravated by the sharp rise in corruption and the reckless spending spree through stupid leaking schemes such as NREGA and the Food Security Act during the UPA tenure. The Indian economy is today in a financial ICU and on a ventilator. Hence unless the economic situation is rectified by new reform policies, disaster and default of debt payments await the Indian people."
    }
    
    
        
    
    beforeEach(function(){
        AppDispatcher = require('../../dispatcher/AppDispatcher');
        TweetSmartStore = require('../TweetSmartStore');
        callback = AppDispatcher.register.mock.calls[0][0];
    });

    it('registers a callback with the dispatcher', function(){
        expect(AppDispatcher.register.mock.calls.length).toBe(1);
    });    
    
    it('should initialize with empty text', function(){
        var tweetStormTweets = TweetSmartStore.getTweetStorm();
        expect(tweetStormTweets[0]).toEqual(undefined);
    });
    
    it('should return tweet count as 0 if no. of chars is zero',function(){
        var count = TweetSmartStore.getTweetStorm().length;
        expect(count).toBe(0);
    });

    
    it('should return tweet count as 1 if no. of chars is less than 140 and greater than 0',function(){        
        callback(actionTweetStormComposeOneTweet);
        var tweetStorm = TweetSmartStore.getTweetStorm();
        var count = tweetStorm.length;        
        expect(tweetStorm[0].text.length).toBeGreaterThan(11);
        expect(count).toBe(1);
        
    });
    
    it('should return tweet count as more than 1 when no. of chars is more than 140',function(){
        callback(actionTweetStormComposeTwoTweets);
        var tweetStorm = TweetSmartStore.getTweetStorm();
        var count = tweetStorm.length;   
        
        var i;
        var limit = tweetStorm.length;
        
        expect(tweetStorm.length).toBeGreaterThan(1);
//
//        for (i = 0; i < limit; i++) {
//            var tweetChars = tweetStorm[i].text.length;
//            expect(tweetChars).toBeLessThan(140);
//            expect(tweetChars).toBeGreaterThan(0);
//        }             

    });  
    
    it('each tweet should be less than 140 chars and more than 0',function(){
        callback(actionTweetStormComposeMultipleTweets);
        var tweetStorm = TweetSmartStore.getTweetStorm();
        var count = tweetStorm.length;   
        
        var i;
        var limit = tweetStorm.length;
        
        expect(tweetStorm.length).toBeGreaterThan(1);

        for (i = 0; i < limit; i++) {
            var tweetChars = tweetStorm[i].text.length;
            expect(tweetChars).toBeLessThan(140);
            expect(tweetChars).toBeGreaterThan(0);
        }             

    });  
      
  
});





