var request = require('request');
var Constants = require('../constants/TweetSmartConstants');
var _ = require('../../node_modules/underscore/underscore');

var TweetSmartAPIUtils = {
    
    tweetsmart: function(tweetstorm,signature){

        _.each(tweetstorm,function(element,index,list){
            delete element.key; 
        })
        
        console.log(tweetstorm);
        
        return new Promise(function(fulfill,reject){
            request({
            url:Constants.BASE_API_URL+'tweetsmart', 
            method:'POST', 
            body:{
                tweetstorm: tweetstorm
            }, 
            json: true,
            headers:{
                'sig':signature
            }
        }, function(error,response,body){
                console.log("Api call returned");
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