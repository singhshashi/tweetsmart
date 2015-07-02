var ComposeTweetsBox = React.createClass({
    render: function () {
        return (<textarea className="col-md-3" rows="5" placeholder="Compose your tweet.." />);
    }
});


var TweetSmartContainer = React.createClass({
    render: function(){
        return(<div className="col-md-12" >
                <ComposeTweetsBox /> 
               </div> 
              );
        }
});


React.render(<TweetSmartContainer />, document.getElementById('tweetsmart'));