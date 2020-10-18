import React from 'react';
import Joi from 'joi';
import { Redirect } from 'react-router-dom';
import auth from '../services/authService';
import { register } from '../services/userService';
import Form from './common/Form';

class RegisterForm extends Form {
  state = {
    data: { name: '', email: '', password: '', },
    errors: {}
  };

  schema = {
    name: Joi.string().required().label('Name'),
    email: Joi.string().required().email({ tlds: { allow: false } }).label('Email'),
    password: Joi.string().min(5).required().label('Password'),
  };

  doSubmit = async () => {
    try {
      const res = await register(this.state.data);
      auth.setToken(res.headers['x-auth-token']);
      window.location = '/';
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = error.response.data;
        this.setState({ errors })
      }
    }
  };

  render() {
    if (auth.getAuthUser()) return <Redirect to="/" />

    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('email', 'Email')}
          {this.renderInput('name', 'Name')}
          {this.renderInput('password', 'Password', 'password')}
          {this.renderButton('Register')}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
