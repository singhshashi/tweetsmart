var React = require('react');

var Tweet = React.createClass({
    render: function(){
        
        return (<li className="list-group-item"><p>{this.props.text}</p><em>{this.props.text.length}</em></li>);
    }
});

module.exports = Tweet;


