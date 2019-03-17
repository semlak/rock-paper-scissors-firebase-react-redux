import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
} from 'reactstrap';
import PropTypes from 'prop-types';
import Avatar from 'react-avatar';


const AppNavbar = (props) => {
  const { auth, signOut: signOutAction, gathering, toggleAuthenticationModal: toggleModal } = props;
  const userSignOut = () => signOutAction({ auth, gathering });

  const userMenu = auth ? (
    <UncontrolledDropdown nav className="" inNavbar>
      <DropdownToggle nav caret>

        {/* <img src="https://getbootstrap.com/docs/4.1/assets/brand/bootstrap-solid.svg" width="30" height="30" alt="" /> */}
        {/* <img src={auth.photoURL } width="40" height="40" alt={auth.displayName} /> */}
        { auth.photoURL ?
          <Avatar src={auth.photoURL} alt={auth.displayName} className="" size="25" /> :
          <Avatar name={auth.displayName} color={Avatar.getRandomColor('sitebase', ['green'])} className="" size="25" />
        }
      </DropdownToggle>
      <DropdownMenu right>
        <DropdownItem onClick={userSignOut}>Log Out {auth.displayName}</DropdownItem>
        {/* <DropdownItem divider />                       */}
        {/* <DropdownItem disabled>Option 2</DropdownItem> */}
        {/* <DropdownItem divider />                       */}
        {/* <DropdownItem disabled>Reset</DropdownItem>    */}
      </DropdownMenu>
    </UncontrolledDropdown>
  ) : (
    <NavItem>
      {/* <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink> */}
      {props.auth ?
        <Button outline onClick={userSignOut}>Log Out {auth.displayName}</Button>
        :
        <Button outline onClick={toggleModal}>Log In/Sign Up</Button>
      }
    </NavItem>
  );
  
  return (
    // <Navbar color="dark" light expand="md" user={user} dark>
    <Navbar color="dark" light expand="md" dark className="sticky-top" >
      <NavbarBrand href="/">
        <img src={props.logo} height="45" alt="Rock Paper Scissors" />
      </NavbarBrand>
      <NavbarToggler onClick={props.toggle} />
      {/* <Collapse isOpen={this.state.isOpen} navbar> */}
      <Collapse isOpen={props.isOpen} navbar>
        <Nav className="ml-auto" navbar>
          <NavItem className="ml-auto" >
            <NavLink target="_blank" href="https://github.com/semlak/rock-paper-scissors-firebase-react-redux/">On Github</NavLink>
          </NavItem>
          <NavItem className="ml-auto" >
            <Nav>
              {userMenu}
            </Nav>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};


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

export default AppNavbar;
