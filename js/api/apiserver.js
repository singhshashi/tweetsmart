var express=require('express');
var cookieParser=require('cookie-parser');
var session=require('express-session');
var TweetSmartHandlers = require('./handlers/TweetSmartHandlers');
var routes = require('./Routes');
var bodyParser = require('body-parser');
//var multer = require('multer');

var api = express();

api.use(cookieParser());
api.use(session({
    genid: function (req) {
        return require('crypto').randomBytes(48).toString('hex');
    },
    secret: 'you know nothing jon snow',
    saveUninitialized: true,
    resave: false
}));

api.use(bodyParser.json());
api.use(bodyParser.urlencoded({extended:true})); 
//api.use(multer());


api.use(function(req,res, next){
   res.header("Access-Control-Allow-Origin","http://tweetsmart.in") ;
   res.header("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept,sig");
   res.header("Access-Control-Allow-Credentials","true");
   next();
});

api.enable('trust proxy');


function start() {
    routes.setup(api, TweetSmartHandlers);
   var server = api.listen(3000, function () {
        var host = server.address().address;
        var port = server.address().port;

        console.log('Listening at http://%s:%s', host, port);
    });
}


start();












