var React=require('react');
var TweetSmartActionCreator=require('../actions/TweetSmartActionCreator');


var TweetButton = React.createClass({
    
   render: function(){
    
        var signedIn = this.props.signedIn == "1";
        var uiState = this.props.uiState;


        if (signedIn === true)
            {
                if (uiState === 'tweeting')
                    {
                        return(
                                <div className="pull-right">
                                    <button type="button" className='btn btn-twitter' id='btnAction'>Tweeting...</button>
                                    <img alt='loading...' src='../../images/ajax-loader.gif' />
                                </div>                       
                        );
                    }
                else{
                        if (uiState === 'success')
                            {
                                setTimeout(TweetSmartActionCreator.refreshAfterSuccess, 3500);
                            }
                        return(
                            <div className="pull-right">
                                <button className='btn btn-twitter' id='btnAction' type="button" href="#" onClick={this._onClick}>Tweet</button>
                                <p>{this.getStatusText()}</p>
                            </div>);
                }
                
            }
        
        return(<div className="pull-right"><a className='btn btn-social btn-twitter' id='btnAction' href="http://api.tweetsmart.in/twitter/connect"><i className="fa fa-twitter"></i>Sign in with Twitter</a></div>);
    }, 
        
    _onClick:function(){     
        TweetSmartActionCreator.queuetweetstorm(this.props.tweetStorm,this.props.signedInSignature);
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

