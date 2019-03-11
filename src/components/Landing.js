import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Col, Card, Button } from 'reactstrap';

import { toggleAuthenticationModal } from '../actions/modalActions';
import "./Landing.css";

import landingImage from '../img/landing-rps.jpg';

export class Landing extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillUpdate(nextProps) {
    if (nextProps.auth) {
      this.context.router.history.push("/app");
    }
  }

  toggleModal = (e) => {
    e.preventDefault();
    this.props.toggleAuthenticationModal();
  }

  render() {
    return (
      <div>
        <Row className="social-signin-container">
          <Col>
            {/* <img alt="Sign in" id="sign-in" src="/img/user.png" /> */}
            <img alt="Rock Paper Scissors" id="sign-in" width="100%" src={landingImage} />
            <br />
            <br />
            <br />
            <br />
            {/* <h4 id="sign-in-header">Sign In to start</h4> */}
            <Button href="/#" className="social-signin" onClick={this.toggleModal}>
              Sign in to start
            </Button>
            {/* <a href="/#" className="social-signin" onClick={this.toggleModal}> */}
            {/*   Sign in to start                                                 */}
            {/* </a>                                                               */}
          </Col>
        </Row>
        <Row className="mt-4 mb-4 text-left">
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
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, { toggleAuthenticationModal })(Landing);
