import React from 'react';
import PropTypes from 'prop-types';

// import { css } from 'react-emotion';
// import { css } from 'react-emotion';
// import { css, jsx } from '@emotion/core';
import { css, } from '@emotion/core';
// import styled from '@emotion/styled';
import FadeLoader from 'react-spinners/FadeLoader';
// import { Modal, ModalBody } from 'reactstrap';


// const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const override = css`
    display: block;
    margin: 0 auto;
    border-color: #276582;
`;


// const override = styled.div`
//     display: block;
//     margin: 0 auto;
//     border-color: #276582;
// `;


class LoadingSpinner extends React.Component {
  constructor(props) {
    super(props);
    // console.log('in LoadingSpinner constructor. props:', props);
    this.state = {
      showSpinner: false,
      timeOutRef: null,
      delayRef: null,
    };
    // this.setLoadingAndTimers(props);
    // const { delay, timeOut, loading } = props;

    // // only show spinner right away if loading is set to true AND delay is 0.
    // const showSpinner = loading && !(delay > 0);
    // // only set a delay for the spinner if the spinner should otherwise be shown and delay > 0
    // const delayRef = loading && delay > 0 ? setTimeout(this.displaySpinner, delay) : null;
    // // only set a timeOut for the spinner if the spinner is set to be shown right away (no delay)
    // const timeOutRef = showSpinner && timeOut > 0 ? setTimeout(this.turnOffSpinner, timeOut) : null;


    // console.log('LoadingSpinner state after constructor', this.state, '\nprops:', props);
  }

  componentDidMount() {
    // console.log('in "LoadingSpinner.componentDidMount", props:', this.props, '\nstate:', this.state);
    const { props } = this;
    this.setLoadingAndTimers(props);
  }

  componentWillReceiveProps(props) {
    // console.log('in "LoadingSpinner.componentWillReceiveProps", props:', props, '\nstate:', this.state);
    // const { loading, } = props;
    // this.setState({ showSpinner: loading });
    this.setLoadingAndTimers(props);
  }

  componentWillUnmount() {
    // console.log('Unmounting LoadingSpinner component', this.props.id, this.props.className);
    const { timeOutRef, delayRef } = this.state;
    if (timeOutRef) {
      clearTimeout(timeOutRef);
    }
    if (delayRef) {
      clearTimeout(delayRef);
    }
  }

  setLoadingAndTimers(props) {
    const { delay, timeOut, loading } = props;

    // if not current set to loading, clear out any timeOut references
    const { timeOutRef: currentTimeOutRef, delayRef: currentDelayRef } = props;
    if (!loading) {
      if (currentTimeOutRef != null) {
        clearTimeout(currentTimeOutRef);
      }
      if (currentDelayRef != null) {
        clearTimeout(currentDelayRef);
      }
    }

    // only show spinner right away if loading is set to true AND delay is 0.
    const showSpinner = loading && !(delay > 0);
    // only set a delay for the spinner if the spinner should otherwise be shown and delay > 0
    const delayRef = loading && delay > 0 ? setTimeout(this.displaySpinner, delay) : null;
    // only set a timeOut for the spinner if the spinner is set to be shown right away (no delay)
    const timeOutRef = showSpinner && timeOut > 0 ? setTimeout(this.turnOffSpinner, timeOut) : null;

    this.setState({
      showSpinner,
      timeOutRef,
      delayRef,
    });
  }

  displaySpinner = () => {
    // console.log('running "LoadingSpinner.displaySpinner"');
    const { loading, timeOut } = this.props;
    if (loading) {
      const timeOutRef = !(timeOut > 0) ? null : setTimeout(this.turnOffSpinner, timeOut);
      this.setState({ showSpinner: true, delayRef: null, timeOutRef });
    }
    else {
      // console.log('displaySpinner should no longer be displayed');
      this.setState({ showSpinner: false, delayRef: null, timeOutRef: false });
    }
  }

  turnOffSpinner = () => {
    // console.log('running "LoadingSpinner.turnOffSpinner"', '\nprops:', this.props);
    this.setState({ showSpinner: false, timeOutRef: null });
  }


  render() {
    const { showSpinner } = this.state;
    const { props } = this;
    const { loadingMessageClassName, loadingMessageStyle, loadingMessage } = props;
    const { spinnerStyle, id: spinnerID } = props;
    const spinnerClassName = props.fadeIn ? `${props.className} fade-in` : props.className;
    console.log('override', override);
    // const messageFullClassName = props.fade
    // if (props.fadeIn) loadingMessageClassName += ' fade-in';
    // const loadingMessageProps = { loadingMessageClassName, loadingMessageStyle, loadingMessage };
    // console.log('rending LoadingSpinner', 'id:', props.id, '\nprops:', props);
    if (showSpinner) {
      return (
        <div className={spinnerClassName} id={spinnerID}>
          <FadeLoader
            sizeUnit="px"
            className={override.styles}
            size={60}
            color='#276582'
            loading={showSpinner}
            style={spinnerStyle}
          />
          <div className={loadingMessageClassName} style={loadingMessageStyle}>{loadingMessage}</div>
        </div>
      );
    }
    else {
      return <div />;
    }
  }
}


LoadingSpinner.defaultProps = {
  // loading: false,
  delay: 0,
  timeOut: 0,
  loadingMessage: '',
  loadingMessageClassName: '',
  loadingMessageStyle: {},
  className: '',
  spinnerStyle: {},
  fadeIn: false,
  id: '',
};

LoadingSpinner.propTypes = {
  // ones that don't have .isRequired are optional
  delay: PropTypes.number,
  timeOut: PropTypes.number,
  loading: PropTypes.bool.isRequired,
  loadingMessage: PropTypes.string,
  loadingMessageClassName: PropTypes.string,
  loadingMessageStyle: PropTypes.object,
  className: PropTypes.string,
  spinnerStyle: PropTypes.object,
  fadeIn: PropTypes.bool,
  id: PropTypes.string,
  // exchangeRate: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  // category: PropTypes.string.isRequired,
  // expenseCategories: PropTypes.array.isRequired,
  // handleInputChange: PropTypes.func.isRequired,
  // handleDivChange: PropTypes.func.isRequired,
  // submitForm: PropTypes.func.isRequired,
  // handleInputChangeForNumberFormatField: PropTypes.func.isRequired,
  // currentUser: PropTypes.object,
};

export default LoadingSpinner;
