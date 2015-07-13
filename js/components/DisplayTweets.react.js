var React = require('react');
var Tweet = require('./Tweet.react');



var DisplayTweets = React.createClass({
        render: function(){
            var tweetStorm = this.props.tweetStorm;
            var tweets = [];
            for (var key in tweetStorm)
                {
                    tweets.push(<Tweet key={key} text={tweetStorm[key].text} />)        
                }
            
            return (<ul id="tweetList" className="list-group">
                        {tweets}
                   </ul>);
        }
    });

module.exports = DisplayTweets;