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

} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { signIn, } from '../actions/user';
import { LoginForm, RegistrationForm } from '../components';

class AuthenticationModal extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleTab = this.toggleTab.bind(this);
    this.state = {
      isOpen: false,
      activeTab: '1',
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  render() {
    // const { user, login, logout } = this.props;
    // const { props } = this;
    // const { auth, signIn: userSignIn, signOut: userSignOut } = this.props;
    // const { auth, signIn: googleSignIn, signOut: signOutAction, gathering } = this.props;
    const { signIn: googleSignIn, } = this.props;
    // const userSignOut = () => signOutAction(gathering);
    // const userSignOut = () => signOutAction({ auth, gathering });
    // const userSignOut = () => signOutAction(gathering);
    // console.log('auth', auth);


    return (
      <Modal isOpen={this.state.isOpen} toggle={this.toggle} size="lg" className={this.props.className}>
        <ModalBody>
          <div className="row">
            <div className="col-lg-8 col-md-12 add-right-border">
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
              <TabContent activeTab={this.state.activeTab} id="nav-tab-content">
                <TabPane tabId="1">
                  <LoginForm />
                </TabPane>
                <TabPane tabId="2">
                  <RegistrationForm />
                </TabPane>
              </TabContent>
              {/* <!-- Sign in with Google of Github--> */}
              <div id="OR" className="">OR</div>
            </div>
            <div className="hidden-lg-down col-sm-12 col-md-12 col-lg-4">
              <div className="row text-center sign-with">
                <div className="col-md-12">
                  <h5>Sign in with</h5>
                </div>
                <div className="col-md-12">
                  <div className="btn-group btn-group-justified">
                    <Button id="github-signin">Github</Button>
                    <Button color="danger" id="google-signin" onClick={googleSignIn}>Google</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>
    );
  }
}

// function mapStateToProps({ auth }) {
//   return { auth };
// }


// AppNavbar.defaultProps = {
//   auth: {},
// };


function mapStateToProps(props) {
  return props;
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

export default connect(mapStateToProps, { signIn, })(AuthenticationModal);
