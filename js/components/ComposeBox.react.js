var React = require('react');
var TweetSmartActionCreator = require('../actions/TweetSmartActionCreator');

var ComposeBox = React.createClass({
    render: function(){
        if (this.props.uiState === false)
        {
            return(
                <div className="form-group">
                    <textarea className="form-control" rows="5" placeholder="Compose your tweets.. To end a tweet and start a new tweet, press Enter twice and continue typing." value={this.props.tweetStormText} disabled onChange={this.handleChange} />
                </div>
            );
        }
        
        return(
            <div className="form-group">
                    <textarea className="form-control" rows="5" placeholder="Compose your tweets.. To end a tweet and start a new tweet, press Enter twice and continue typing." value={this.props.tweetStormText} onChange={this.handleChange} />
            </div>
        );
    }, 
    
    handleChange: function(event){
        TweetSmartActionCreator.compose(event.target.value);
    },
    
   
});

module.exports = ComposeBox;