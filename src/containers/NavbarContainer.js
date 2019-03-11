import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { signOut } from '../actions/user'; 
import { toggleAuthenticationModal } from '../actions/modalActions';


import rpsLogo from '../rpsLogo.png';
import { Navbar } from '../components';

class AppNavbar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    console.log('toggling NavBar expansion');
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    const { props } = this;
    return <Navbar {...props} logo={rpsLogo} toggle={this.toggle} isOpen={this.state.isOpen} />;
  }
}


function mapStateToProps({ auth, gathering }) {
  return { auth, gathering };
}


AppNavbar.defaultProps = {
  auth: {},
};

AppNavbar.propTypes = {
  auth: PropTypes.shape({
    displayName: PropTypes.string,
    uid: PropTypes.string,
    photoURL: PropTypes.string,
  }),
  // signIn: PropTypes.func.isRequired,
  toggleAuthenticationModal: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
};

// export default connect(mapStateToProps, { signIn, signOut, toggleAuthenticationModal })(AppNavbar);
export default connect(mapStateToProps, { signOut, toggleAuthenticationModal })(AppNavbar);
