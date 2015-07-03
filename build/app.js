
var TweetRow = React.createClass({displayName: "TweetRow",
            render: function () {
                return (React.createElement("span", {ref: "output"}));
                }
            });


var ComposeTweetsBox = React.createClass({displayName: "ComposeTweetsBox",
    render: function () {
        return (React.createElement("textarea", {className: "col-md-3", rows: "5", placeholder: "Compose your tweet..", onChange: this.textChanged}));
    },
    textChanged: function(e) {
            console.log("Text changed called");
            console.log(this);
            
        React.findDOMNode(this.refs.output).innerHTML = "Hola from Ola, I love your Areola";
    }
    
});



var TweetSmartApp = React.createClass({displayName: "TweetSmartApp",
    getInitialState: function() {
        return {tweetstormtext: "Sharona"};
    },
    render: function(){
        return(React.createElement("div", {className: "col-md-6"}, 
                React.createElement(ComposeTweetsBox, null), 
                React.createElement(TweetRow, null)
               ) 
              );
        }
});


React.render(React.createElement(TweetSmartApp, null), document.getElementById('tweetsmart'));