var React=require('react');
var TweetSmartActionCreator=require('../actions/TweetSmartActionCreator');


var TweetButton = React.createClass({
    
   render: function(){
    
        var signedIn = this.props.signedInSignature != null;
        var uiState = this.props.uiState;
        console.log(uiState);
        if (signedIn === true)
            {
                if (uiState === 'tweeting')
                    {
                        return(
                                <div className='col-md-3'>
                                    <a className='btn btn-block btn-twitter col-md-2' id='btnAction'>Tweeting...</a>
                                    <img alt='loading...' src='../../images/ajax-loader.gif' />
                                </div>                       
                        );
                    }
                else{
                        if (uiState === 'success')
                            {
                                setTimeout(TweetSmartActionCreator.refreshAfterSuccess, 3500);
                            }
                        return(<div className='col-md-3'><a className='btn btn-block btn-twitter col-md-2' id='btnAction' onClick={this._onClick}>Tweet</a><p>{this.getStatusText()}</p></div>);
                }
                
            }
        
        return(<div className='col-md-3'><a className='btn btn-block btn-social btn-twitter col-md-2' id='btnAction' href="http://9750702f.ngrok.io/twitter/connect">Sign in with Twitter</a></div>);
    }, 
        
    _onClick:function(){        
        TweetSmartActionCreator.tweetsmart(this.props.tweetStorm,this.props.signedInSignature);
    },
    
    getStatusText: function(){
        var uiState = this.props.uiState;
        var statusText = '';
        switch(uiState){
            case 'success': 
                statusText = "Success!";
                break;
            case 'failure':
                statusText = "Failed!";
                break;                   
        }
        
        return statusText;
        
    }
});

module.exports = TweetButton;

