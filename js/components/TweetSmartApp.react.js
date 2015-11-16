//This is the "Controller-View"
var ComposeBox = require('./ComposeBox.react');
var DisplayTweets = require('./DisplayTweets.react');
var TweetButton = require('./TweetButton.react');
var OptionsBox = require('./OptionsBox.react');
var React = require('react');
var TweetSmartStore = require('../stores/TweetSmartStore');
var TweetSmartActionCreator = require('../actions/TweetSmartActionCreator');
var _ = require('../../node_modules/underscore/underscore');


function getTweetSmartState(){
    return {
        appState: TweetSmartStore.getAppState(),
        tweetStorm: TweetSmartStore.getTweetStorm(), 
        signedInSignature: TweetSmartStore.getSignedInSignature(),
        uiState: TweetSmartStore.getUIState()
    };
}


var TweetSmartApp = React.createClass({
    
    getInitialState: function(){
      return getTweetSmartState();  
    },
    
    componentDidMount: function(){
        TweetSmartStore.addChangeListener(this._onChange);
    },
    
    componentWillUnmount: function(){
        TweetSmartStore.removeChangeListener(this._onChange);
    },
    
    componentDidUpdate: function(prevProps, prevState)
    {
        if (this.state.appState.queuedtweets.length > 0){
            var unsuccessfulTweet = _.find(this.state.appState.queuedtweets, function(queuedtweet){
                return queuedtweet.status == -1;
            });
            
            if (unsuccessfulTweet)
                {
                    return;
                }
            
            var toTweet = _.find(this.state.appState.queuedtweets, function(queuedtweet){
                return queuedtweet.status == 0;
            });
            if (toTweet)
                {
                    TweetSmartActionCreator.tweet(toTweet, this.state.signedInSignature);                    
                }
            else{
                TweetSmartActionCreator.tweetstormsuccess();
            }
        }
    },
    
    render: function(){
        return (
            <div>
              <form>
                <div className="form-group">    
                    <ComposeBox tweetStormText={this.state.appState.tweetstormtext} uiState={this.state.uiState.composebox} ref='composeBox' />
                    <OptionsBox numberingPositionAtStart={this.state.appState.numberingpositionatstart} ref='optionsBox' />
                </div>
              </form>
              <DisplayTweets tweetStorm={this.state.tweetStorm} ref='displayTweets' />
              <TweetButton signedInSignature={this.state.signedInSignature} uiState={this.state.uiState.tweetbutton} tweetStorm={this.state.tweetStorm} ref='tweetButton' />
            </div>
        );
    }, 
    
    _onChange: function(){
        this.setState(getTweetSmartState());
    }
});

module.exports = TweetSmartApp;

