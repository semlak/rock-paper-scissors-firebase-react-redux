import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { signIn } from '../actions/user';
import "./SignIn.css";

import defaultUserImage from '../img/user.png';

class Signin extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillUpdate(nextProps) {
    // console.log('in componentWillUpdate for \'SignIn\', nextProps', nextProps);
    if (nextProps.auth) {
      this.context.router.history.push("/app");
    }
  }

  signIn(e) {
    e.preventDefault();
    this.props.signIn();
  }

  render() {
    return (
      <div className="row social-signin-container">
        <div className="col s10 offset-s1 center-align">
          {/* <img alt="Sign in" id="sign-in" src="/img/user.png" /> */}
          <img alt="Sign in" id="sign-in" src={defaultUserImage} />
          <h4 id="sign-in-header">Sign In to start</h4>
          <a href="/#" className="social-signin" onClick={this.props.signIn}>
            <i className="fa fa-google social-signin-icon" />
            Sign in with Google
          </a>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, { signIn })(Signin);
