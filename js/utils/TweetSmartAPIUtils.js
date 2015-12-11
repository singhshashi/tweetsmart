var request = require('request');
var Constants = require('../constants/TweetSmartConstants');
var _ = require('../../node_modules/underscore/underscore');

var TweetSmartAPIUtils = {
    
    tweet: function(tweet,signature,lastSuccesfulTweetId){

        return new Promise(function(fulfill,reject){
            request({
            url:Constants.BASE_API_URL+'tweetsmart', 
            method:'POST', 
            body:{
                tweet: tweet,
                in_reply_to:lastSuccesfulTweetId
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
               console.log("Tweet Api call success response");
               console.log(body);
                fulfill(body);
            }
        });
       
        });
    },

    checkSignedIn: function(signature){

        return new Promise(function(fulfill,reject){
            request({
                url:Constants.BASE_API_URL+'loggedin',
                method:'GET',
                json: true,
                headers:{
                    'sig':signature
                }
            }, function(error,response,body){
                if (response.statusCode == 401)
                {
                    var err = {statusCode: response.statusCode, message: "Not Logged In"};
                    reject(err);
                }
                else if (response.statusCode == 200){
                    fulfill(body);
                }
                else{
                    var err = {statusCode: response.statusCode, message: "Unknown Server Error"};
                    reject(err);
                }
            });

        });

    },

    signOut: function (signature) {

        return new Promise(function (fulfill, reject) {
            request({
                url:Constants.BASE_API_URL+'signOut',
                method:'POST',
                json: true,
                headers:{
                    'sig':signature
                }
            }, function(error,response,body){
                if (response.statusCode == 200){
                    fulfill(body);
                }
                else{
                    var err = {statusCode: response.statusCode, message: "Unknown Server Error"};
                    reject(err);
                }
            });
        });

    }
}

module.exports = TweetSmartAPIUtils;