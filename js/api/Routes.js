var Routes = {
    setup: function (api, handlers) {
        api.get('/', handlers.apiRoot);
        api.get('/login', handlers.login);
        api.post('/tweetsmart', handlers.tweetsmart);
        api.get('/twitter/connect', handlers.twitter.signIn);
        api.get('/twitter/callback', handlers.twitter.callback);
    }
}

module.exports = Routes;