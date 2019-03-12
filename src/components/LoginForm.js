import React from 'react';
import {
  Button,
  Row,
  Col,
  Input,
  Form,
  FormGroup,
  FormFeedback,
  Label,
} from 'reactstrap';
import PropTypes from 'prop-types';

import { validateEmail } from './RegistrationForm';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  handleInputChange = event => this.setState({ [event.target.name]: event.target.value });

  handleLoginClick = event => {
    event.preventDefault();
    console.log('in handleLoginClick');
    // const { props } = this;
    const { email, password, } = this.state;

    let errorObj = {
      loginError: undefined,
      message: '',
      // loginUsernameError: false,
      // loginUsernameMessage: 'Must be atleast 1 character',
      // loginPasswordError: true,
      // loginPasswordMessage: 'Password length must be atleast 6 characters',
    };
    if (password.length < 6) {
      console.error('password needs to be at least 6 characters');
      errorObj = {
        ...errorObj,
        loginError: true,
        loginPasswordError: true,
        loginPasswordMessage: 'Password length must be atleast 6 characters',
      };
    }
    else {
      errorObj = {
        ...errorObj,
        loginPasswordError: undefined,
        loginPasswordMessage: '',
      };
    }

    if (!validateEmail(email)) {
      console.error('email does not appear valid');
      errorObj = {
        ...errorObj,
        loginError: true,
        loginUsernameError: true,
        loginUsernameMessage: 'Must be a valid email address.',
      };
    }
    else {
      errorObj = {
        ...errorObj,
        loginUsernameError: undefined,
        loginUsernameMessage: '',
      };
    }

    if (errorObj.loginError) {
      this.props.modalMessage(errorObj);
    }
    else {
      console.log('trying to login');
      this.props.modalMessage(errorObj);
      this.props.loginUserWithEmailPassword({ email, password });
    }
  }

  render() {
    const { email, password } = this.state;
    const { handleInputChange, handleLoginClick } = this;
    console.log('this.props', this.props);
    const { loginError: modalError, message, loginUsernameError, loginUsernameMessage, loginPasswordError, loginPasswordMessage, } = this.props.modals;
    const { closeButtonAction } = this.props;
    const valid = !modalError && typeof modalError !== 'undefined' ? true : undefined;
    // const passwordIsValid = !loginPasswordError;
    const invalid = !!modalError && typeof modalError !== 'undefined' ? true : undefined;

    // const validEmail = loginUsernameError === false || valid === true ? undefined : true;
    // const validEmail = typeof loginUsernameError !== 'undefined' && loginUsernameError === false ? true : undefined;
    const validEmail = typeof loginUsernameError !== 'undefined' && loginUsernameError === false ? true : valid;
    // const invalidEmail = loginUsernameError === false || invalid === false ? true : undefined;
    // const invalidEmail = typeof loginUsernameError !== 'undefined' && loginUsernameError === true ? true : undefined;
    const invalidEmail = typeof loginUsernameError !== 'undefined' && loginUsernameError === true ? true : invalid;

    const validPass = typeof loginPasswordError !== 'undefined' && loginPasswordError === false ? true : valid;
    const invalidPass = typeof loginPasswordError !== 'undefined' && loginPasswordError === true ? true : invalid;
    console.log('validEmail: ', validEmail, 'valid: ', valid, 'loginUsernameError: ', loginUsernameError);

    return (
      <Form >
        <FormGroup row >
          <Label for="email" sm={3} >Email</Label>
          <Col sm={9}>
            <Input valid={validEmail} invalid={invalidEmail} type="email" name="email" value={email} placeholder="Email" onChange={handleInputChange} />
            {/* <FormFeedback valid={validEmail} invalid={typeof invalidEmail !== 'undefined' ? 'false' : undefined} >{loginUsernameMessage}</FormFeedback> */}
            <FormFeedback>{loginUsernameMessage}</FormFeedback>
          </Col>
        </FormGroup>
        <FormGroup row >
          <Label for="password" sm={3} >Password</Label>
          <Col sm={9}>
            {/* <Input valid={valid} invalid={invalid} type="password" name="password" value={password} placeholder="password" onChange={handleInputChange} /> */}
            <Input valid={validPass} invalid={invalidPass} type="password" name="password" value={password} placeholder="password" onChange={handleInputChange} />
            {/* <FormFeedback valid={valid} invalid={typeof invalid !== 'undefined' ? 'false' : undefined} >{message}</FormFeedback> */}
            <FormFeedback valid={!loginPasswordError} invalid={typeof loginPassswordMessage !== 'undefined' ? 'false' : undefined} >{loginPasswordMessage}</FormFeedback>
            <FormFeedback valid={valid} invalid={typeof invalid !== 'undefined' ? 'false' : undefined} >{message}</FormFeedback>
            {/* <FormFeedback>{message || loginPasswordMessage}</FormFeedback> */}
          </Col>
          {/* <FormFeedback valid={modalError}>Logging in. Please wait...</FormFeedback> */}
        </FormGroup>
        <Row>
          <Col sm={{ size: 9, offset: 3 }} >
            <Button color="primary" onClick={handleLoginClick}>Submit</Button>
            <Button color="danger" onClick={closeButtonAction} className="ml-2" data-dismiss="modal">Cancel</Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

LoginForm.propTypes = {
  modals: PropTypes.shape({
    loginError: PropTypes.bool,
    message: PropTypes.string,
    // authenticationModalOpen: PropTypes.bool.isRequired,
  }).isRequired,
  closeButtonAction: PropTypes.func.isRequired,
  loginUserWithEmailPassword: PropTypes.func.isRequired,
  modalMessage: PropTypes.func.isRequired,
};

export default LoginForm;
