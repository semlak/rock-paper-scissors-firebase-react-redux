import React from 'react';
import {
  Modal,
  // ModalHeader,
  ModalBody,
  // ModalFooter,
  Button,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
  ButtonGroup,

} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { signIn, signInWithGithub, loginUserWithEmailPassword, registerUserAction } from '../actions/user';
import { toggleAuthenticationModal, modalMessage } from '../actions/modalActions';
import { LoginForm, RegistrationForm } from '../components';

class AuthenticationModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: '1',
    };
  }

  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    // console.log('rendingering AuthenticationModal, props:', this.props);
    const { signIn: googleSignIn, signInWithGithub: githubSignIn, authenticationModalOpen: isOpen, toggleAuthenticationModal: toggle } = this.props;

    return (
      <Modal isOpen={isOpen} toggle={toggle} size="lg" className={this.props.className}>
        <ModalBody>
          <Row className="row">
            {/* <div className="col-lg-8 col-md-12 add-right-border"> */}
            <Col lg={8} md={12} className="add-right-border">
              {/* <!-- Nav tabs --> */}
              {/* <!-- modified from https://bootsnipp.com/snippets/VElzQ --> */}
              <Nav tabs>
                <NavItem>
                  <NavLink
                    className={this.state.activeTab === '1' ? 'active' : ''}
                    onClick={() => { this.toggleTab('1'); }}
                  >
                    Login
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={this.state.activeTab === '2' ? 'active' : ''}
                    onClick={() => { this.toggleTab('2'); }}
                  >
                    Registration
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={this.state.activeTab} className="mt-2" id="nav-tab-content">
                <TabPane tabId="1">
                  <LoginForm closeButtonAction={toggle} {...this.props} />
                </TabPane>
                <TabPane tabId="2">
                  <RegistrationForm closeButtonAction={toggle} {...this.props} />
                </TabPane>
              </TabContent>
              {/* <!-- Sign in with Google of Github--> */}
              <div id="OR" className="">OR</div>
            </Col>
            {/* <div className="hidden-lg-down col-sm-12 col-md-12 col-lg-4"> */}
            <Col sm={12} md={12} lg={4} className="hidden-lg-down">
              <Row className="text-center sign-with">
                <Col md={12}>
                  <h5>Sign in with</h5>
                </Col>
                <Col md={12}>
                  {/* <div className="btn-group btn-group-justified"> */}
                  <ButtonGroup>
                    <Button id="github-signin" onClick={githubSignIn}>Github</Button>
                    <Button color="danger" id="google-signin" onClick={googleSignIn}>Google</Button>
                  </ButtonGroup>
                </Col>
              </Row>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    );
  }
}


function mapStateToProps({ modals }) {
  const { authenticationModalOpen } = modals;
  return { authenticationModalOpen, modals };
}


AuthenticationModal.defaultProps = {
};

AuthenticationModal.propTypes = {
  // auth: PropTypes.shape({
  //   displayName: PropTypes.string,
  //   uid: PropTypes.string,
  //   photoURL: PropTypes.string,
  // }),
  signIn: PropTypes.func.isRequired,
  // signOut: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { signIn, signInWithGithub, toggleAuthenticationModal, loginUserWithEmailPassword, registerUserAction, modalMessage })(AuthenticationModal);
