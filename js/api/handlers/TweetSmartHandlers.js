var redis=require('redis');
var Flutter = require('flutter');
var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../../constants/TweetSmartConstants');
var _ = require('../../../node_modules/underscore/underscore');


var client = redis.createClient();

client.on("error", function(err){
   console.log("Error " + err);
});


function saveUserDetailsAndAccessToken(req){
    var user= new Object();           
    user.accessToken = req.session.oauthAccessToken; 
    user.secret = req.session.oauthAccessTokenSecret; 
    user.userID = req.results.user_id; 
    user.screenName = req.results.screen_name;
    client.set(user.userID.toString(),JSON.stringify(user),redis.print);
    return user;
}

var flutter = new Flutter({
	consumerKey:process.env.TWEETSMART_CONSUMER_KEY,
	consumerSecret:process.env.TWEETSMART_CONSUMER_SECRET,
	loginCallback: Constants.BASE_API_URL +'twitter/callback', 

	authCallback: function(req,res,next){
		if (req.error)
        {
            console.log(req.error);
            return;
        }
        else{
            
            var userDetails = saveUserDetailsAndAccessToken(req);
           
            var ip = req.ip;
            
            var sig = ip.split('.').reduce(function(previous,current,index,array){return (new Number(previous) + new Number(current))}) * userDetails.userID;
            client.set(sig.toString(),userDetails.userID.toString());            
            res.redirect('http://tweetsmart.in/popup.html?sig='+sig.toString());                 
        }
		
	}
});

var TweetSmartHandlers = assign({}, EventEmitter.prototype,{

    
    
    apiRoot: function(req,res,next){
        res.send('Winter is coming!');
    }, 
    
    login: function(req,res,next){
        res.status(501).send('Not implemented');
        
    }, 
    
    tweetsmart: function(req,res,next) {
        var sig = new Number(req.headers.sig);
        var userID;
        var message = '';
        if(Number.isNaN(sig))
            {
                res.status(500).send('Sig is NaN');
            }

        client.get(sig.toString(), function(error,reply){          
            if (reply != null)
                {
                    var userId = new Number(reply);
                    if (Number.isNaN(userId))
                        {
                            console.log("UserId from redis in NaN");
                            throw "UserId from redis is NaN";    
                        }
                        
                    var sig2 = (req.ip.split('.').reduce(function(previous,current,index,array){ return (new Number(previous) + new Number(current))}) * userId);
                    if (sig.toString() === sig2.toString())
                        {

                            var tweet = req.body.tweet;                    
//                            Get access token and secret for current user
                            client.get(userId.toString(), function(error,reply){
//                                console.log(reply);
                                var userDetailsCached = JSON.parse(reply);
                                //The body parameter has to be an object as the underlying Oauth library expects so. 
                                    var payload = {status: tweet.text};
                                    flutter.API.post('statuses/update.json', userDetailsCached.accessToken, userDetailsCached.secret, payload, 'application/x-www-form-urlencoded', function(resp){
                                        console.log(resp);
                                        if (resp.created_at){
                                            res.send('Success!');
                                        }
                                        else{
                                            res.status(500).send("Failure!");
                                        }
                                        
                                    } );                         

                            });
                            
                            
                            
                            
                        }
                    else{
                        res.redirect('http://api.tweetsmart.in/twitter/connect')
                    }
                    
                }
        });
    
 
        
    }, 
    
    twitter: {
        signIn: flutter.connect, 
        callback: flutter.auth
    }
});

module.exports = TweetSmartHandlers;