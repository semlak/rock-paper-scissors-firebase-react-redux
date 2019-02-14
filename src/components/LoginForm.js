import React from 'react';
import {
  // ModalHeader,
  // ModalFooter,
  Button,
  // Container,
  Row,
  Col,
  Input,
  Form,
  FormGroup,
  FormFeedback,
  Label,
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { loginUserWithEmailPassword, } from '../actions/user';


class AuthenticationModal extends React.Component {
  constructor(props) {
    super(props);
    // this.handleInputChange = this.handleInputChange.bind(this);
    this.state = {
      email: '',
      password: '',
      // formValid: false,
      // formInvalid: false,
    };
  }

  handleInputChange = event => this.setState({ [event.target.name]: event.target.value });

  handleLoginClick = event => {
    event.preventDefault();
    // const { registerUser } = this.props;
    console.log('in handleRegisterClick');
    // const { props } = this;
    const { email, password, } = this.state;
    if (password.length >= 6) {
      this.props.loginUserWithEmailPassword({ email, password });
    }
    else {
      console.error('password needs to be at least 6 characters');
    }
  }

  render() {
    // const { user, login, logout } = this.props;
    // const { props } = this;
    // const { auth, signIn: userSignIn, signOut: userSignOut } = this.props;
    // const { auth, signIn: googleSignIn, signOut: signOutAction, gathering } = this.props;
    const { email, password } = this.state;
    // console.log('gathering in Navbar component:', gathering);
    // const userSignOut = () => signOutAction(gathering);
    // const userSignOut = () => signOutAction({ auth, gathering });
    // const userSignOut = () => signOutAction(gathering);
    // console.log('auth', auth);
    const { handleInputChange } = this;
    console.log('this.props', this.props);
    const { loginError: modalError, message } = this.props.modals;
    const valid = !modalError && typeof modalError !== 'undefined' ? true : undefined;
    const invalid = !!modalError && typeof modalError !== 'undefined' ? true : undefined;
    // console.log('invalid:', invalid);

    return (
      <Form >
        <FormGroup row >
          <Label for="email" sm={3} >Email</Label>
          <Col sm={9}>
            <Input valid={valid} invalid={invalid} type="email" name="email" value={email} placeholder="Email" onChange={handleInputChange} />
          </Col>
        </FormGroup>
        <FormGroup row >
          <Label for="password" sm={3} >Password</Label>
          <Col sm={9}>
            <Input valid={valid} invalid={invalid} type="password" name="password" value={password} placeholder="password" onChange={handleInputChange} />
            <FormFeedback valid={valid} invalid={typeof invalid !== 'undefined' ? 'false' : undefined} >{message}</FormFeedback>
          </Col>
          {/* <FormFeedback valid={modalError}>Logging in. Please wait...</FormFeedback> */}
        </FormGroup>
        <Row>
          <Col sm={{ size: 9, offset: 3 }} >
            <Button color="primary" onClick={this.handleLoginClick}>Submit</Button>
            <Button color="danger" onClick={this.props.closeButtonAction} className="ml-2" data-dismiss="modal">Cancel</Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

// function mapStateToProps({ auth }) {
//   return { auth };
// }


// AppNavbar.defaultProps = {
//   auth: {},
// };


function mapStateToProps({ auth, gathering, modals }) {
  return { auth, gathering, modals };
}


AuthenticationModal.defaultProps = {
  // auth: {},
};

AuthenticationModal.propTypes = {
  // auth: PropTypes.shape({
  //   displayName: PropTypes.string,
  //   uid: PropTypes.string,
  //   photoURL: PropTypes.string,
  // }),
  closeButtonAction: PropTypes.func.isRequired,
  loginUserWithEmailPassword: PropTypes.func.isRequired,
  // signOut: PropTypes.func.isRequired,
};

// export default connect(mapStateToProps, { signIn, signOut })(AuthenticationModal);
export default connect(mapStateToProps, { loginUserWithEmailPassword, })(AuthenticationModal);
