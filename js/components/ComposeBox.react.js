var React = require('react');
var TweetSmartActions = require('../actions/TweetSmartActions');

var ComposeBox = React.createClass({
    render: function(){
        return(
            <div className="row">
                <div className="col-md-3">
                    <textarea className="col-md-11" rows="5" placeholder="Compose your tweet.." onChange={this.handleChange}/>                    
                </div>
            </div>
        );
    }, 
    
    handleChange: function(event){
        TweetSmartActions.compose(event.target.value);
    }
});

module.exports = ComposeBox;