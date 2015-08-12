var React=require('react');
var TweetSmartActionCreator=require('../actions/TweetSmartActionCreator');


var TweetButton = React.createClass({
    
    getInitialState: function(){
        return {
            tweeting: false
        }
    },
    render: function(){
    
        var signedIn = this.props.signedInSignature != null;
        var tweeting = this.state.tweeting;
        
        if (signedIn === true)
            {
                if (tweeting)
                    {
                        return(
                                <div className='col-md-3'>
                                    <a className='btn btn-block btn-twitter col-md-2' id='btnAction'>Tweeting...</a>
                                    <img alt='loading...' src='../../images/ajax-loader.gif' />
                                </div>                       
                        );
                    }
                else{
                        return(<div className='col-md-3'><a className='btn btn-block btn-twitter col-md-2' id='btnAction' onClick={this._onClick}>Tweet</a></div>);
                }
                
            }
        
        return(<div className='col-md-3'><a className='btn btn-block btn-social btn-twitter col-md-2' id='btnAction' href="http://4d0cc789.ngrok.io/twitter/connect">Sign in with Twitter</a></div>);
    }, 
    _onClick:function(){
        this.setState({tweeting:true});
        TweetSmartActionCreator.tweetsmart(this.props.tweetStorm,this.props.signedInSignature);
    }
});

module.exports = TweetButton;

