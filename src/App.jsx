import React, { Component, Suspense } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Cookies from 'js-cookie';
import { history } from './lib/history';
import routes from './routes';
import Loading from './components/routes/Loading';
import ProtectedRoute from './components/routes/ProtectedRoute';
import UnprotectedRoute from './components/routes/UnprotectedRoute';
import NotFound from './components/routes/NotFound';
import AccountSetup from './pages/auth/AccountSetup';
import { refreshSession, checkAuthentication } from './data/auth';

class App extends Component {
  constructor() {
    super();

    this.state = {
      account: null,
      isAuthenticating: true,
    };

    this.checkAuthentication = this.checkAuthentication.bind(this);
    this.handleUpdateAccount = this.handleUpdateAccount.bind(this);
  }

  componentDidMount() {
    this.checkAuthentication();
  }

  /**
   * Check user's authentication
   */
  async checkAuthentication() {
    try {
      // Check if token is saved
      const token = Cookies.get('tok');

      // Reject if no token is stored
      if (!token) {
        throw new Error('No token cookie!');
      }

      // Fetch account
      const account = await checkAuthentication();

      // Refresh current session
      await refreshSession();

      this.setState({
        account: account.data,
        isAuthenticating: false,
      });
    } catch (error) {
      this.setState({
        account: null,
        isAuthenticating: false,
      });
    }
  }

  /**
   * Receive and set new account data
   * @param {Object} account
   */
  handleUpdateAccount(account) {
    this.setState({ account });
  }

  render() {
    const { account, isAuthenticating } = this.state;

    return (
      <Router history={history}>
        <Suspense fallback={<Loading />}>
          <Switch>
            {routes.map(route => (
              <Route
                key={route.path}
                path={route.path}
                exact
                render={({ location, match }) => {
                  if (isAuthenticating) {
                    return (
                      <Loading />
                    );
                  }

                  if (account && !account.username) {
                    return (
                      <AccountSetup
                        location={location}
                        match={match}
                        account={account}
                        onUpdateAuth={this.handleUpdateAccount}
                      />
                    );
                  }

                  const RouteWrapper = route.unprotected ? UnprotectedRoute : ProtectedRoute;

                  return (
                    <RouteWrapper
                      location={location}
                      match={match}
                      account={account}
                      onUpdateAuth={this.handleUpdateAccount}
                    >
                      <route.component />
                    </RouteWrapper>
                  )
                }}
              />
            ))}

            <Route
              component={() => <NotFound />}
            />
          </Switch>
        </Suspense>
      </Router>
    );
  }
}

export default App;
