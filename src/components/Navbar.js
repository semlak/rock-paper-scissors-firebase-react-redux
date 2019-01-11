import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  // NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { signIn, signOut } from '../actions/user';


import rpsLogo from '../rpsLogo.png';

class AppNavbar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    // const { user, login, logout } = this.props;
    const { props } = this;
    // const { auth, signIn: userSignIn, signOut: userSignOut } = this.props;
    const { auth, signIn: userSignIn, signOut: signOutAction, gathering } = this.props;
    console.log('gathering in Navbar component:', gathering);
    // const userSignOut = () => signOutAction(gathering);
    const userSignOut = () => signOutAction({ auth, gathering });
    // const userSignOut = () => signOutAction(gathering);
    // console.log('auth', auth);

    const userMenu = auth ? (
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav caret>

          {/* <img src="https://getbootstrap.com/docs/4.1/assets/brand/bootstrap-solid.svg" width="30" height="30" alt="" /> */}
          <img src={auth.photoURL} width="40" height="40" alt={auth.displayName} />
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem onClick={userSignOut}>Log Out {auth.displayName}
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem disabled>
            Option 2
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem disabled>
            Reset
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    ) : (
      <NavItem>
        {/* <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink> */}
        {props.auth ?
          <Button outline onClick={userSignOut}>Log Out {auth.displayName}</Button>
          :
          <Button outline onClick={userSignIn}>Log In</Button>
        }
      </NavItem>
    );

    return (
      // <Navbar color="dark" light expand="md" user={user} dark>
      <div>
        <Navbar color="dark" light expand="md" dark >
          <NavbarBrand href="/">
            <img src={rpsLogo} height="45" alt="Rock Paper Scissors" />
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {/* <NavItem>
                <NavLink href="/components/">Components</NavLink>
              </NavItem> */}
              {userMenu}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

// function mapStateToProps({ auth }) {
//   return { auth };
// }


// AppNavbar.defaultProps = {
//   auth: {},
// };


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
  signIn: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { signIn, signOut })(AppNavbar);
