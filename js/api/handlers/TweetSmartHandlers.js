var redis=require('redis');
var Flutter = require('flutter');
var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../../constants/TweetSmartConstants');

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
	consumerKey:'CsWb5WLmorrDK59KAu5GE0EB1',
	consumerSecret:'KE8tfPzyaAtlijYfQmn9OH5w2P15cN2HX89wz4L796KvJrV1z5',
	loginCallback: Constants.BASE_API_URL +'twitter/callback', 

	authCallback: function(req,res,next){
		if (req.error)
        {
            console.log(req.error);
            return;
        }
        else{
            console.log(req.ip);
            
            var userDetails = saveUserDetailsAndAccessToken(req);
           
            var ip = req.ip;
            
            var sig = ip.split('.').reduce(function(previous,current,index,array){return (new Number(previous) + new Number(current))}) * userDetails.userID;
            client.set(sig.toString(),userDetails.userID.toString());            
            res.redirect('http://tweetsmart.local/popup.html?sig='+sig.toString());                 
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
                    console.log(userId);
                    if (Number.isNaN(userId))
                        {
                            throw "UserId from redis is NaN";    
                        }
                        
                    var sig2 = (req.ip.split('.').reduce(function(previous,current,index,array){ return (new Number(previous) + new Number(current))}) * userId);
                    console.log(sig2,sig, sig.toString()===sig2.toString());
                    if (sig.toString() === sig2.toString())
                        {
//                            TODO: use req.body to fetch tweets and then POST to twitter api in a schecduled manner console.log(req.body);
                            res.send('success!')        
                            
                        }
                    else{
                        res.redirect('http://tweetsmart.local/login')
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