//This is the "Controller-View"
var ComposeBox = require('./ComposeBox.react');
var DisplayTweets = require('./DisplayTweets.react');
var React = require('react');
var TweetSmartStore = require('../stores/TweetSmartStore');

function getTweetSmartState(){
    return {
        tweetStorm: TweetSmartStore.getTweetStorm(), 
        tweetStormText: TweetSmartStore.getTweetStormText()
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
              <ComposeBox tweetStormText={this.state.tweetStormText} />
              <DisplayTweets tweetStorm={this.state.tweetStorm} />
            </div>
        );
    }, 
    
    _onChange: function(){
        this.setState(getTweetSmartState());
        console.log(this.state);
    }
});

module.exports = TweetSmartApp;

