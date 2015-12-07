/**
 * Created by shashi on 10/10/15.
 */

var React = require('react');
var TweetSmartActionCreator = require('../actions/TweetSmartActionCreator');

var Header = React.createClass({

    render: function () {

        var signedInText = "";
        var singOutLinkText = "";
        if (this.props.signedInScreenName != '')
        {
            signedInText = "Signed In as " + this.props.signedInScreenName;
            singOutLinkText = "Sign out";

            return (
                <div>
                    <nav className="navbar navbar-default navbar-static-top">
                        <div className="container-fluid">
                            <div className="navbar-header">
                                <a href="#" className="navbar-brand">
                                    <img alt="TweetSmart" src="images/logo_main_tmp.png" width="194px" height="33px" />
                                </a>
                                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#menu-navbar-collapse" aria-expanded="false">
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                </button>


                            </div>
                            <div className="collapse navbar-collapse" id="menu-navbar-collapse">
                                <span className="mod-navbar-collapse">
                                    <span className="navbar-text navbar-right">{signedInText} <a href="#" className="navbar-link" onClick={this.signOut}>{singOutLinkText}</a></span>
                                </span>
                            </div>
                        </div>
                    </nav>

                </div>
            );

        }
        else{
            return (
                <div>
                    <nav className="navbar navbar-default navbar-static-top">
                        <div className="container-fluid">
                            <div className="navbar-header">
                                <a href="#" className="navbar-brand">
                                    <img alt="TweetSmart" src="images/logo_main_tmp.png" width="194px" height="33px" />
                                </a>
                            </div>
                        </div>
                    </nav>

                </div>
            );

        }

    },

    signOut : function(evt){
        TweetSmartActionCreator.signOut(this.props.signedInSignature);
    }

});

module.exports = Header
         