var request = require('request');
var Constants = require('../constants/TweetSmartConstants');
var _ = require('../../node_modules/underscore/underscore');

var TweetSmartAPIUtils = {
    
    tweet: function(tweet,signature){       
        
        return new Promise(function(fulfill,reject){
            request({
            url:Constants.BASE_API_URL+'tweetsmart', 
            method:'POST', 
            body:{
                tweet: tweet
            }, 
            json: true,
            headers:{
                'sig':signature
            }
        }, function(error,response,body){
           if (response.statusCode != 200)
               {
                   var err = {statusCode: response.statusCode, message: "An error occured. Please contact support"};
                   reject(err)
               }
            else{
                fulfill(body);
            }
        });
       
        });
    }
}

module.exports = TweetSmartAPIUtils;