var React = require('react');
var TweetSmartActionCreator = require('../actions/TweetSmartActionCreator');

var ComposeBox = React.createClass({
    render: function(){
        if (this.props.uiState === false)
        {
            return(
                <div className="row">
                    <div className="col-md-3">
                        <textarea className="col-md-11" rows="5" placeholder="Compose your tweet.." value={this.props.tweetStormText} disabled onChange={this.handleChange} />                    
                    </div>
                </div>
            );
        }
        
        return(
            <div className="row">
                <div className="col-md-3">
                    <textarea className="col-md-11" rows="5" placeholder="Compose your tweet.." value={this.props.tweetStormText} onChange={this.handleChange} />                    
                </div>
            </div>
        );
    }, 
    
    handleChange: function(event){
        TweetSmartActionCreator.compose(event.target.value);
    },
    
   
});

module.exports = ComposeBox;