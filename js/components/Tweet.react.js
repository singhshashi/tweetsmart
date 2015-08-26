var React = require('react/addons');

var Tweet = React.createClass({
    render: function(){
        var cx = React.addons.classSet;
        
        
        var classes = cx({
            'list-group-item': true,
            'disabled': this.props.status == 0,
            'list-group-item-success': this.props.status == 1,
            'list-group-item-danger': this.props.status == -1
        });
        
        return (<li className={classes}><p>{this.props.text}</p><em>{this.props.text.length}</em></li>);
    }
});

module.exports = Tweet;


