import React, { Component } from 'react';
import { routeTo } from '../../lib/history';
import { getResponseErrors } from '../../lib/api';
import { updateUsername } from '../../data/users';

class AccountSetup extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      errors: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    e.preventDefault();

    this.setState({ username: e.target.value });
  }

  async handleSubmit(e) {
    e.preventDefault();

    try {
      const { username } = this.state;
      const { id } = this.props.account;

      // Send username update request
      const user = await updateUsername(id, username);

      // Save account details
      this.props.onUpdateAuth(user.data);

      // Route to app
      routeTo('/');
    } catch (error) {
      this.setState({ errors: getResponseErrors(error) });
    }
  }

  render() {
    const { username, errors } = this.state;
    const { account } = this.props;

    return (
      <div>
        <h1>{`Hello, ${account.name}!`}</h1>

        <p>{'Welcome! Please choose a username.'}</p>

        <form
          onSubmit={this.handleSubmit}
        >
          <div>
            {errors.map(e => (
              <div key={e.message}>{e.message}</div>
            ))}
          </div>
          <div>
            <label htmlFor={'username'}>{'Set A Username'}</label>

            <input
              type={'text'}
              id={'username'}
              value={username}
              onChange={this.handleChange}
            />
          </div>

          <button>
            {'Save Username'}
          </button>
        </form>
      </div>
    );
  }
}

export default AccountSetup;
