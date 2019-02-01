import React, { Component, Suspense } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';
import { history } from './lib/history';
import routes from './routes';
import Loading from './components/layout/Loading';
import NotFound from './pages/system/NotFound';
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

                  if (!route.unprotected && !account) {
                    return (
                      <Redirect
                        to={{
                          pathname: '/login',
                          state: { referrer: location },
                        }}
                      />
                    );
                  }

                  const props = {
                    onUpdateAuth: this.handleUpdateAccount,
                    location,
                    match,
                    account,
                  };

                  if (account && !account.username) {
                    return (
                      <AccountSetup
                        {...props}
                      />
                    );
                  }

                  return (
                    <route.component {...props} />
                  );
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
