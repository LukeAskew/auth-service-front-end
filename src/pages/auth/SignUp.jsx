import React, { Component } from 'react';
import { routeTo } from '../../lib/history';
import { getResponseErrors } from '../../lib/api';
import { create } from '../../data/users';

class SignUp extends Component {
  constructor() {
    super();

    this.state = {
      isWorking: false,
      name: '',
      username: '',
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
      const { name, username, email, password } = this.state;

      // Send login request
      await create({ name, username, email, password });

      // Route user
      routeTo('/login');
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
    const { name, username, email, password, errors, isWorking } = this.state;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            {errors.map(e => (
              <div key={e.message}>{e.message}</div>
            ))}
          </div>

          <div>
            <label htmlFor={'name'}>{'Name'}</label>

            <input
              id={'name'}
              type={'text'}
              value={name}
              onChange={this.handleChange.bind(this, 'name')}
            />
          </div>

          <div>
            <label htmlFor={'username'}>{'Username'}</label>

            <input
              id={'username'}
              type={'text'}
              value={username}
              onChange={this.handleChange.bind(this, 'username')}
            />
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

          <button>{isWorking ? '...' : 'Create Account'}</button>
        </form>
      </div>
    );
  }
}

export default SignUp;
