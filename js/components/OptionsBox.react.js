var React = require('react');
var TweetSmartActionCreator = require('../actions/TweetSmartActionCreator');


var OptionsBox = React.createClass({
    render: function(){
        return (
            <div>
                <div className="radio">
                    <label>
                        <input type="radio" name="radioNumberingPositionOptions" id="numberingPositionAtStart" value="1" onChange={this._onClick} checked={this.props.numberingPositionAtStart == "true"}  />
                Append numbering at the beginning of tweets
                    </label>
                </div>
                <div className="radio">
                    <label>
                        <input type="radio" name="radioNumberingPositionOptions" id="numberingPositionAtEnd" value="0" onChange={this._onClick} checked={!(this.props.numberingPositionAtStart == "true")} />
                Append numbering at the end of tweets
                    </label>
                </div>
                <a className="btn btn-default btn-xs" role="button" data-toggle="tooltip" data-placement="right" title="Clears any saved tweet storm! " href="#" onClick={this._reset}>
                    <span className="glyphicon glyphicon-refresh"></span> Clear
                </a>


            </div>
        );
    },
    
    _onClick: function(event){
        if (event.target.value == 1)
            {
                TweetSmartActionCreator.numberingpositionatstart(true);
            }
        else{
            TweetSmartActionCreator.numberingpositionatstart(false);
        }
    },

    _reset: function (event) {
        TweetSmartActionCreator.reset();
    }
});


module.exports = OptionsBox;
