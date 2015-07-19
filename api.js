var express=require('express');
var cookieParser=require('cookie-parser');
var session=require('express-session');
var redis=require('redis');

var client = redis.createClient();

client.on("error", function(err){
   console.log("Error " + err);
});

var api = express();
var Flutter = require('flutter');

api.use(cookieParser());
api.use(session({
    genid: function(req){
        return require('crypto').randomBytes(48).toString('hex');
    },
    secret: 'you know nothing jon snow', 
    saveUninitialized:true, 
    resave:false
}));


api.get('/', function(req,res){
	res.send('Hello World');
});

var server = api.listen(3000,function(){
	var host = server.address().address;
	var port = server.address().port;

	console.log('Listening at http://%s:%s', host, port);
});





var flutter = new Flutter({
	consumerKey:'CsWb5WLmorrDK59KAu5GE0EB1',
	consumerSecret:'KE8tfPzyaAtlijYfQmn9OH5w2P15cN2HX89wz4L796KvJrV1z5',
	loginCallback:'http://cb22c70c.ngrok.io/twitter/callback', 
    

	authCallback: function(req,res,next){
		if (req.error)
        {
            console.log(req.error);
            return;
        }
        else{
            var user= new Object();           
            user.accessToken = req.session.oauthAccessToken; 
            user.secret = req.session.oauthAccessTokenSecret; 
            user.userId = req.results.user_id; 
            user.screenName = req.results.screen_name;
            client.set(user.userId.toString(),JSON.stringify(user),redis.print);
        res.redirect('http://tweetsmart.local/popup.html');                 
        }
		
	}
});

api.get('/twitter/connect', flutter.connect);

api.get('/twitter/callback', flutter.auth);