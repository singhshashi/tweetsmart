//This is the "Controller-View"
var ComposeBox = require('./ComposeBox.react');
var DisplayTweets = require('./DisplayTweets.react');
var TweetButton = require('./TweetButton.react');
var OptionsBox = require('./OptionsBox.react');
var Header = require('./Header.react');
var React = require('react');
var TweetSmartStore = require('../stores/TweetSmartStore');
var TweetSmartActionCreator = require('../actions/TweetSmartActionCreator');

var _ = require('../../node_modules/underscore/underscore');


function getTweetSmartState(){
    return {
        appState: TweetSmartStore.getAppState(),
        tweetStorm: TweetSmartStore.getTweetStorm(),
        uiState: TweetSmartStore.getUIState()
    };
}


var TweetSmartApp = React.createClass({

    getInitialState: function(){
        return getTweetSmartState();
    },

    componentDidMount: function(){
        TweetSmartStore.addChangeListener(this._onChange);
        var signature = TweetSmartStore.getSignedInSignature();
        if (signature!= null)
        {
            if (this.state.appState.signedIn == '0') {
                TweetSmartActionCreator.checkSignedIn(signature);
            }
            else if (this.state.appState.signedIn != "1"){
                TweetSmartActionCreator.signIn(signature);
            }
        }

    },

    componentWillUnmount: function(){
        TweetSmartStore.removeChangeListener(this._onChange);
    },

    componentDidUpdate: function(prevProps, prevState)
    {
        var signature = TweetSmartStore.getSignedInSignature();
        console.log('Signature' + signature);
        if (signature != null && signature != '') {
            if (this.state.appState.signedIn == '0') {
                TweetSmartActionCreator.checkSignedIn(signature);
            }
            else {
                if (this.state.appState.queuedTweets.length > 0) {
                    console.log("Has Queued Tweets");
                    console.log(this.state.appState.queuedTweets);
                    var unsuccessfulTweet = _.find(this.state.appState.queuedTweets, function (queuedTweet) {
                        return queuedTweet.status == -1;
                    });

                    if (unsuccessfulTweet) {
                        console.log("Dominic Decoco");
                        return;
                    }

                    var toTweet = _.find(this.state.appState.queuedTweets, function (queuedTweet) {
                        return queuedTweet.status == 0;
                    });
                    if (toTweet) {
                        var lastSuccessfulTweetId = this.state.appState.lastSuccessfulTweetId;
                        var signedInSignature = this.state.appState.signedInSignature;
                        TweetSmartActionCreator.tweet(toTweet,signedInSignature, lastSuccessfulTweetId);
                    }
                    else {
                        TweetSmartActionCreator.tweetstormsuccess();
                    }
                }
            }
        }

    },

    render: function(){
        return (
            <div>
                <Header signedInScreenName={this.state.appState.signedInScreenName} signedInSignature={this.state.appState.signedInSignature}  />
                <div className="container-fluid">
                    <form>
                        <div className="form-group">
                            <ComposeBox tweetStormText={this.state.appState.tweetStormText} uiState={this.state.uiState.composebox} ref='composeBox' />
                            <OptionsBox numberingPositionAtStart={this.state.appState.numberingPositionAtStart} ref='optionsBox' />
                        </div>
                    </form>
                    <DisplayTweets tweetStorm={this.state.tweetStorm} ref='displayTweets' />
                    <TweetButton signedIn={this.state.appState.signedIn} uiState={this.state.uiState.tweetbutton} tweetStorm={this.state.tweetStorm} signedInSignature={this.state.appState.signedInSignature} ref='tweetButton' />

                    <br />

                </div>

            </div>
        );
    },

    _onChange: function(){
        this.setState(getTweetSmartState());
    }
});

module.exports = TweetSmartApp;

