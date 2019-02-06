import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';
import Main from './pages/Main';
import { Navbar, SignIn, requireAuth, AuthenticationModal } from './components';

import { fetchUser } from './actions/user';

export class UnconnectedApp extends Component {
  componentDidMount = () => {
    // this.props.fetchUser && typeof this.props.fetchUser === 'function' && this.props.fetchUser();
    this.props.fetchUser();
  }

  render() {
    console.log('rendering App component');
    console.log(`Your process.env.PUBLIC_URL: '${process.env.PUBLIC_URL}'`);
    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <div className="App">
          <Navbar />
          <AuthenticationModal />
          <div className="container main">
            <Route exact path="/" component={SignIn} />
            <Route path="/app" component={requireAuth(Main)} />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

// export default App;
export default connect(null, { fetchUser })(UnconnectedApp);
