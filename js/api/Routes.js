var Routes = {
    setup: function (api, handlers) {
        api.get('/', handlers.apiRoot);
        api.get('/loggedin', handlers.loggedin);
        api.post('/tweetsmart', handlers.tweetsmart);
        api.post('/signout', handlers.signOut);
        api.get('/twitter/connect', handlers.twitter.signIn);
        api.get('/twitter/callback', handlers.twitter.callback);
    }
}

module.exports = Routes;