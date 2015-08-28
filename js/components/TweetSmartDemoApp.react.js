//This is the "Controller-View" for the Demo app
var ComposeBox = require('./ComposeBox.react');
var DisplayTweets = require('./DisplayTweets.react');
var OptionsBox = require('./OptionsBox.react');
var React = require('react');
var TweetSmartDemoStore = require('../stores/TweetSmartDemoStore');
var TweetSmartActionCreator = require('../actions/TweetSmartActionCreator');
var _ = require('../../node_modules/underscore/underscore');


function getTweetSmartState(){
    return {
        appState: TweetSmartDemoStore.getAppState(),
        tweetStorm: TweetSmartDemoStore.getTweetStorm(), 
        signedInSignature: TweetSmartDemoStore.getSignedInSignature(),
        uiState: TweetSmartDemoStore.getUIState()
    };
}


var TweetSmartDemoApp = React.createClass({
    
    getInitialState: function(){
      return getTweetSmartState();  
    },
    
    componentDidMount: function(){
        TweetSmartDemoStore.addChangeListener(this._onChange);
    },
    
    componentWillUnmount: function(){
        TweetSmartDemoStore.removeChangeListener(this._onChange);
    }, 
    
    
    
    render: function(){
        
        setTimeout(TweetSmartActionCreator.democompose, 100);
        
        return (
            <div>
              <form>
                <div className="form-group">    
                    <ComposeBox tweetStormText={this.state.appState.tweetstormtext} uiState={this.state.uiState.composebox} ref='composeBox' />
                    <OptionsBox numberingPositionAtStart={this.state.appState.numberingpositionatstart} ref='optionsBox' />
                </div>
              </form>
              <DisplayTweets tweetStorm={this.state.tweetStorm} ref='displayTweets' />
             
            </div>
        );
    }, 
    
    _onChange: function(){
        this.setState(getTweetSmartState());
    }
});

module.exports = TweetSmartDemoApp;

