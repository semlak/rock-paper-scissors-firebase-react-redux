import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Main from './pages/Main';
// import { Navbar, Landing, requireAuth, AuthenticationModal } from './components';
import { Landing, requireAuth, AuthenticationModal } from './components';
import { NavbarContainer } from './containers';

import { fetchUser } from './actions/user';

export class App extends Component {
  componentDidMount = () => {
    // this.props.fetchUser && typeof this.props.fetchUser === 'function' && this.props.fetchUser();
    this.props.fetchUser();
  }

  render() {
    // console.log('rendering App component');
    // console.log(`Your process.env.PUBLIC_URL: '${process.env.PUBLIC_URL}'`);
    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <div className="App">
          <NavbarContainer />
          <AuthenticationModal />
          <div className="container main">
            {/* <Route exact path="/" component={SignIn} /> */}
            <Route exact path="/" component={Landing} />
            <Route path="/app" component={requireAuth(Main)} />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

// export default App;
export default connect(null, { fetchUser })(App);
