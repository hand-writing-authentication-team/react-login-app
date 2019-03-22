import './login.css';

import React, {Component} from 'react';
import {Canvas} from '../../components/canvas/canvas';
import {withRouter} from "react-router-dom";
import Card from '../../components/card/Card';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      race: 'Race',
      handwriting: '',
      errorMessage: '',
    };
    this.canvas = React.createRef();
  }

  updateHandwriting(newHandWriting) {
    this.setState({
      handwriting: newHandWriting,
    })
  }

  usernameChange = (event) => {
    this.setState({
      username: event.target.value,
    });
  }

  passwordChange = (event) => {
    this.setState({
      password: event.target.value,
    });
  }

  raceChange = (event) => {
    this.setState({
      race: event.target.value,
    });
  }

  clear = () => {
    this.setState({
      username: '',
      password: '',
      race: 'Race'
    });
    this.canvas.current.clear();
  }

  formSubmit = (event) => {
    event.preventDefault();
    fetch('http://login.hwat-auth.com:9099/create_account', {
      method: "POST", 
      mode: "cors",
      headers: {
          "Content-Type": "text/plain",
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
        race: this.state.race,
        handwriting: this.state.handwriting,
      }),
    }).then(response => {
      if (response.ok) {
        window.localStorage.setItem("username", this.state.username);
        this.props.history.push('/validation');
        return '';
      } else {
        return response.json();
      }
    }).then(payload => {
      if (payload) {
        this.setState({
          errorMessage: payload.error,
        });
      }
    }).catch(error => {
      console.error(error);
    });
  }

  render() {
    return (
      <Card title="Login">
        <div class="caution">
          <p>1. We will NOT use your information for any purpose other than doing handwriting research.</p>
          <p>2. If you no longer want us to use your data after submitting, feel free to contact us. We will remove your data from our database immediately.</p>
          <p>3. NEVER submit your REAL password to this page.</p>
          <p>4. Your Email address will ONLY be used for our $25 Gift Card lottery.</p>
        </div>
        <form class="login-form">
          <select value={this.state.race} onChange={this.raceChange}>
              <option value="Race" disabled>-- Select your race --</option>
              <option value="American-Indian-or-Alaska-Native">American Indian or Alaska Native</option>
              <option value="Asian">Asian</option>
              <option value="Black-or-African-American">Black or African American</option>
              <option value="Native-Hawaiian-or-Other-Pacific-Islander">Native Hawaiian or Other Pacific Islander</option>
              <option value="White">White</option>
              <option value="Other">Other</option>
          </select>
            <input type="text" name="user" placeholder="Email Address" value={this.state.username} onChange={this.usernameChange}></input>
            <input type="password" name="pass" placeholder="Password" value={this.state.password} onChange={this.passwordChange}></input>
            <Canvas ref={this.canvas} updateHandwriting={this.updateHandwriting.bind(this)}/>
            <input type="submit" name="login" class="login login-submit" value="Login" onClick={this.formSubmit}></input>
            <input type="button" name="reset" class="login login-submit" value="Reset" onClick={this.clear}></input>
        </form>

        {this.state.errorMessage ? <div class="login-page error-msg">
            <span>{this.state.errorMessage}</span>
        </div> : ''}
      </Card>
    );
  }
}

export default withRouter(Login);
