import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';

class Auth extends Component {
  state = {
    authForm: {
      userName: {
        type: 'text',
        label: 'Username',
      },
      password: {
        type: 'password',
        label: 'Password',
      },
    },
  };

  render() {
    const { authForm } = this.state;

    const formElementsArray = [];
    Object.keys(authForm).forEach((key) => {
      formElementsArray.push({
        id: key,
        config: authForm[key],
      });
    });

    return (
      <form>
        <div className="row">
          <div className="col s12 m6 offset-m3">
            <div className="card center-align mg">
              <div className="card-content">
                <span className="card-title orange-text">
                  Log in to your account
                </span>
                {formElementsArray.map(formElement => (
                  <Input
                    key={formElement.id}
                    type={formElement.config.type}
                    label={formElement.config.label}
                  />
                ))}
                <div className="row center">
                  <a
                    href="http://materializecss.com/getting-started.html"
                    id="download-button"
                    className="btn-large waves-effect waves-light orange"
                  >
                    Log in
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default Auth;
