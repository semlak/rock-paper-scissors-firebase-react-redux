import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Col, Card, } from 'reactstrap';

// import { signIn } from '../actions/user';
import { toggleAuthenticationModal } from '../actions/modalActions';
import "./SignIn.css";

// import defaultUserImage from '../img/user.png';
import landingImage from '../img/landing-rps.jpg';

class Landing extends Component {
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

  toggleModal = (e) => {
    console.log('toggleModal');
    e.preventDefault();
    this.props.toggleAuthenticationModal();
  }

  render() {
    return (
      <>
        <Row className="row social-signin-container">
          <Col className="col s10 offset-s1 center-align">
            {/* <img alt="Sign in" id="sign-in" src="/img/user.png" /> */}
            <img alt="Sign in" id="sign-in" src={landingImage} />
            <br />
            <br />
            <br />
            <br />
            {/* <h4 id="sign-in-header">Sign In to start</h4> */}
            <a href="/#" className="social-signin" onClick={this.toggleModal}>
              <i className="fa fa-google social-signin-icon" />
              Sign in to start
            </a>
          </Col>
        </Row>
        <Row className="mt-4 text-left">
          <Col >
            <Card body outline color="danger">
              <p>For trying out the game with multiple players, you can use separate logins in separate browsing sessions.</p>
              <p>You can create your own logins or use the following sample logins (each with password &apos;<samp>password</samp>&apos;):</p>
              <ul>
                <li><samp>harry@hogwarts.co.uk</samp></li>
                <li><samp>ron@hogwarts.co.uk</samp></li>
                <li><samp>hermione@hogwarts.co.uk</samp></li>
              </ul>
            </Card>
          </Col>
        </Row>
      </>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, { toggleAuthenticationModal })(Landing);
