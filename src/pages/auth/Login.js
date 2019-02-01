import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { get } from 'lodash';
import qs from 'qs';
import { routeTo } from '../../lib/history';
import { getResponseErrors } from '../../lib/api';
import { login, getAccount } from '../../data/auth';
import {
  GITHUB_CLIENT_ID,
  GOOGLE_CLIENT_ID,
  GOOGLE_REDIRECT_URL,
} from '../../config';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      isWorking: false,
      email: '',
      password: '',
      errors: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  /**
   * Handle form submission
   * @param {Object} e Event
   */
  async handleSubmit(e) {
    e.preventDefault();

    this.setState({ isWorking: true });

    try {
      const { email, password } = this.state;

      // Send login request
      await login({ email, password });

      // Fetch account details
      const account = await getAccount();

      // Pass account data to auth update handler
      this.props.onUpdateAuth(account.data);

      // Grab the referrer so the user is routed to the original path
      const desitnation = get(this.props, 'location.state.referrer', '/');

      // Route user
      routeTo(desitnation);
    } catch (e) {
      this.setState({
        isWorking: false,
        errors: getResponseErrors(e),
      });
    }
  }

  /**
   * Handle form input change
   * @param {String} id Field ID
   * @param {Object} e  Event
   */
  handleChange(id, e) {
    e.preventDefault();

    this.setState({ [id]: e.target.value });
  }

  render() {
    const { email, password, errors, isWorking } = this.state;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            {errors.map(e => (
              <div key={e.message}>{e.message}</div>
            ))}
          </div>

          <div>
            <label htmlFor={'email'}>{'Email'}</label>

            <input
              id={'email'}
              type={'email'}
              value={email}
              onChange={this.handleChange.bind(this, 'email')}
            />
          </div>

          <div>
            <label htmlFor={'password'}>{'Password'}</label>

            <input
              id={'password'}
              type={'password'}
              value={password}
              onChange={this.handleChange.bind(this, 'password')}
            />
          </div>

          <button>{isWorking ? '...' : 'Login'}</button>
        </form>

        <div>
          <a
            href={`https://accounts.google.com/o/oauth2/v2/auth?${qs.stringify({
              scope: 'https://www.googleapis.com/auth/userinfo.email',
              access_type: 'offline',
              response_type: 'code',
              redirect_uri: GOOGLE_REDIRECT_URL,
              client_id: GOOGLE_CLIENT_ID,
            })}`}
          >
            {'Login with Google'}
          </a>
        </div>

        <div>
          <a
            href={`https://github.com/login/oauth/authorize?${qs.stringify({
              client_id: GITHUB_CLIENT_ID,
              scope: 'user:email',
            })}`}
          >
            {'Login with Github'}
          </a>
        </div>

        <hr />

        <div>
          <Link to={'/signup'}>{'Sign Up'}</Link>
        </div>
      </div>
    );
  }
}

export default Login;
