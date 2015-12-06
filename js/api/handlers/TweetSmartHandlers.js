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
            
            var sigNumberIp = ip.split('.').reduce(function(previous,current,index,array){return (new Number(previous) + new Number(current))});
            var sigNumberId = userDetails.userID;
            var sigString = sigNumberIp.toString() + sigNumberId.toString();

            var sig = new Buffer(sigString).toString('base64');
            console.log(sig);
            client.set(sig.toString(),userDetails.userID.toString());
            res.redirect('http://tweetsmart.in/popup.html?sig='+sig.toString());
        }
		
	}
});

var TweetSmartHandlers = assign({}, EventEmitter.prototype,{

    
    
    apiRoot: function(req,res,next){
        res.send('Winter is coming!');
    }, 
    
    loggedin: function(req,res,next){
        var sig = req.headers.sig;

        if (!sig || sig === "")
        {
            res.status(500).send('Sig is invalid or empty');
        }

        client.get(sig.toString(), function (error, reply) {
            if (reply != null)
            {
                var userId = new Number(reply);
                if (Number.isNaN(userId))
                {
                    console.log("UserId from Redis is NaN");
                    //res.status(500).send("UserId from Redis is NaN");
                }
                console.log("UserIdFromRedis:" + userId);
                client.get(userId.toString(), function (error, reply) {
                    if (reply != null)
                    {
                        var userObj = JSON.parse(reply);
                        var response = {"userId":userObj.userId,"screenName":userObj.screenName, "sig":sig};
                        res.status(200).send(response);

                        return;

                    }
                    else{
                        client.del(sig.toString());
                        res.status(401).send('Not Logged In');
                    }
                });
            }
            else{
                res.status(401).send("Sig not found");
            }

        });

        
    },

    signOut: function (req, res, next) {
        var sig = req.headers.sig;
        if (!sig || sig === "")
        {
            res.status(500).send('Sig is invalid or empty');
        }
        else{
            client.del(sig.toString());
            res.status(200).send("Logged out");
        }


    },
    
    tweetsmart: function(req,res,next) {
        var sig = req.headers.sig;
        console.log("Sig:" + sig);
        if (!sig || sig === "")
        {
            res.status(500).send('Sig is invalid or empty');
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
                    var ip = req.ip;

                    var sigNumberIp = ip.split('.').reduce(function(previous,current,index,array){return (new Number(previous) + new Number(current))});
                    var sigNumberId = userId;
                    var sigString = sigNumberIp.toString() + sigNumberId.toString();

                    var sig2 = new Buffer(sigString).toString('base64');

                    if (sig.toString() === sig2.toString())
                        {

                            var tweet = req.body.tweet;
                            var in_reply_to = req.body.in_reply_to;
                            console.log("In Reply to: " + in_reply_to);
//                            Get access token and secret for current user
                            client.get(userId.toString(), function(error,reply){
//                                console.log(reply);
                                var userDetailsCached = JSON.parse(reply);
                                //The body parameter has to be an object as the underlying Oauth library expects so. 
                                    var payload = {status: tweet.text,in_reply_to_status_id:in_reply_to};
                                    flutter.API.post('statuses/update.json', userDetailsCached.accessToken, userDetailsCached.secret, payload, 'application/x-www-form-urlencoded', function(resp){
                                        console.log(resp);
                                        if (resp.created_at){
                                            var data = {success:true,statusId:resp.id_str, message:resp.responseText}
                                            res.send(data);
                                        }
                                        else{
                                            res.status(500).send("Failure!");
                                        }
                                        
                                    });
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