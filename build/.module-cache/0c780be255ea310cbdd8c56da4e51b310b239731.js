var ComposeTweetsBox = React.createClass({displayName: "ComposeTweetsBox",
    render: function () {
        return (React.createElement("input", {type: "text", class: "col-md-4", placeholder: "Compose your tweet.."}));
    }
});


var TweetSmartContainer = React.createClass({displayName: "TweetSmartContainer",
    render: function(){
        return(React.createElement("div", null, 
                React.createElement(ComposeTweetsBox, null)
               ) 
              );
        }
});


React.render(React.createElement(TweetSmartContainer, null), document.getElementById('tweetsmart'));