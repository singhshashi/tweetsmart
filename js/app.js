
var TweetRow = React.createClass({
            render: function () {
                return (<span ref="output"></span>);
                }
            });


var ComposeTweetsBox = React.createClass({
    render: function () {
        return (<textarea className="col-md-3" rows="5" placeholder="Compose your tweet.." onChange={this.textChanged} />);
    },
    textChanged: function(e) {
            console.log("Text changed called");
            console.log(this);
            
        React.findDOMNode(this.refs.output).innerHTML = "Hola from Ola, I love your Areola";
    }
    
});



var TweetSmartApp = React.createClass({
    getInitialState: function() {
        return {tweetstormtext: "Sharona"};
    },
    render: function(){
        return(<div className="col-md-6" >
                <ComposeTweetsBox /> 
                <TweetRow />
               </div> 
              );
        }
});


React.render(<TweetSmartApp />, document.getElementById('tweetsmart'));