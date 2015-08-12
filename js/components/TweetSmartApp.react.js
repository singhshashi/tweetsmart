//This is the "Controller-View"
var ComposeBox = require('./ComposeBox.react');
var DisplayTweets = require('./DisplayTweets.react');
var TweetButton = require('./TweetButton.react');
var React = require('react');
var TweetSmartStore = require('../stores/TweetSmartStore');

function getTweetSmartState(){
    return {
        tweetStorm: TweetSmartStore.getTweetStorm(), 
        tweetStormText: TweetSmartStore.getTweetStormText(), 
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
    
    render: function(){
        return (
            <div>
              <ComposeBox tweetStormText={this.state.tweetStormText} ref='composeBox' />
              <DisplayTweets tweetStorm={this.state.tweetStorm} ref='displayTweets' />
              <TweetButton signedInSignature={this.state.signedInSignature} ref='tweetButton' />
            </div>
        );
    }, 
    
    _onChange: function(){
        this.setState(getTweetSmartState());
    }
});

module.exports = TweetSmartApp;

