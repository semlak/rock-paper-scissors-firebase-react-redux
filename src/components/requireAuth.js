import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export default function(ComposedComponent) {
  class Authentication extends Component {
    static contextTypes = {
      router: PropTypes.object
     };

    componentWillMount() {
      if (this.props.auth === null) {
        this.context.router.history.push("/");
      }
    }

    componentWillUpdate(nextProps) {
      // console.log('in componentWillUpdate, nextProps:', nextProps);
      if (!nextProps.auth) {
        // console.log('not authenticated');
        this.context.router.history.push('/');
      }
      else {
        // console.log('user is authenticated');
      }
    }

    render() {
      // console.log('in requireAuth render, this.props', this.props);
      if (this.props.auth) {
        return <ComposedComponent {...this.props} />;
      }
      else {
        return null;
      }
    }
  }

  function mapStateToProps(state) {
    return { auth: state.auth };
  }

  return connect(mapStateToProps)(Authentication);
}
