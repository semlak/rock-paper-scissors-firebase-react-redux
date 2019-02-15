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

// import { signIn, signOut } from '../actions/user';
import { registerUserAction } from '../actions/user';


const validateEmail = email => !!email.match("[a-zA-Z]+.*@.*[a-zA-Z]+.*[.][a-zA-Z]+");

class AuthenticationModal extends React.Component {
  constructor(props) {
    super(props);
    // this.handleInputChange = this.handleInputChange.bind(this);
    this.state = {
      username: '',
      email: '',
      password: '',
      passwordConfirm: '',
      // formValid: false,
      // formInvalid: false,
    };
  }

  handleInputChange = event => this.setState({ [event.target.name]: event.target.value });

  handleRegisterClick = event => {
    event.preventDefault();
    // const { registerUserAction } = this.props;
    console.log('in handleRegisterClick');
    // const { props } = this;
    const { username, email, password, passwordConfirm } = this.state;
    // if (username.length > 0 && validateEmail(email) && password.length >= 6 && password === passwordConfirm) {
    //   return this.props.registerUserAction({ username, email, password });
    // }
    if (username.length < 1) {
      return console.error('need valid username');
    }
    if (!validateEmail(email)) {
      return console.error('need valid email');
    }
    if (password.length < 6) {
      return console.error('need password of length 6 or more characters');
    }
    if (password !== passwordConfirm) {
      return console.error('password and confirmation did not match');
    }
    console.log('data is valid. Registering user');
    return this.props.registerUserAction({ username, email, password });
  }

  render() {
    // const { user, login, logout } = this.props;
    // const { props } = this;
    // const { auth, signIn: userSignIn, signOut: userSignOut } = this.props;
    // const { auth, signIn: googleSignIn, signOut: signOutAction, gathering } = this.props;
    const { username, email, password, passwordConfirm } = this.state;
    // console.log('gathering in Navbar component:', gathering);
    // const userSignOut = () => signOutAction(gathering);
    // const userSignOut = () => signOutAction({ auth, gathering });
    // const userSignOut = () => signOutAction(gathering);
    // console.log('auth', auth);
    const { handleInputChange } = this;

    console.log('this.props', this.props);
    const { registrationError: modalError, message } = this.props.modals;
    const valid = !modalError && typeof modalError !== 'undefined' ? true : undefined;
    const invalid = !!modalError && typeof modalError !== 'undefined' ? true : undefined;

    return (
      <Form autoComplete="off">
        <FormGroup row >
          <Label for="name" sm={3} className="pr-0" >Display Name</Label>
          <Col sm={9}>
            <Input valid={valid} invalid={invalid} type="text" name="username" value={username} placeholder="Display Name" onChange={handleInputChange} />
            {/* <FormFeedback>Please choose a display name.</FormFeedback> */}
          </Col>
        </FormGroup>
        <FormGroup row >
          <Label for="email" sm={3} >Email</Label>
          <Col sm={9}>
            <Input valid={valid} invalid={invalid} type="email" name="email" value={email} placeholder="Email" onChange={handleInputChange} />
            {/* <FormFeedback>Please use a valid-looking email.</FormFeedback> */}
          </Col>
        </FormGroup>
        <FormGroup row >
          <Label for="password" sm={3} >Password</Label>
          <Col sm={9}>
            <Input valid={valid} invalid={invalid} type="password" name="password" value={password} placeholder="Password (6-character minimum)" onChange={handleInputChange} autoComplete="off" />
            {/* <FormFeedback>Please choose a password of at least 6 characters.</FormFeedback> */}
          </Col>
        </FormGroup>
        <FormGroup row >
          <Label for="passwordConfirm" sm={3} >Confirm</Label>
          <Col sm={9}>
            <Input valid={valid} invalid={invalid} type="password" name="passwordConfirm" value={passwordConfirm} placeholder="Confirm Password" onChange={handleInputChange} />
            {/* <FormFeedback>Password and Password Confirmation must match.</FormFeedback> */}
            <FormFeedback valid={valid} invalid={typeof invalid !== 'undefined' ? 'false' : undefined} >{message}</FormFeedback>
          </Col>
        </FormGroup>
        <Row>
          <Col sm={{ size: 9, offset: 3 }} >
            <Button color="primary" onClick={this.handleRegisterClick}>Register</Button>
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


// function mapStateToProps({ auth, gathering }) {
//   return { auth, gathering };
// }

function mapStateToProps({ modals }) {
  return { modals };
}

// AuthenticationModal.defaultProps = {
//   auth: {},
// };

AuthenticationModal.propTypes = {
  // auth: PropTypes.shape({
  //   displayName: PropTypes.string,
  //   uid: PropTypes.string,
  //   photoURL: PropTypes.string,
  // }),
  closeButtonAction: PropTypes.func.isRequired,
  registerUserAction: PropTypes.func.isRequired,
  // signOut: PropTypes.func.isRequired,
};

// export default connect(mapStateToProps, { signIn, signOut })(AuthenticationModal);
export default connect(mapStateToProps, { registerUserAction, })(AuthenticationModal);
