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
      handwriting: '',
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

  formSubmit = (event) => {
    event.preventDefault();
    console.log({
      username: this.state.username,
      password: this.state.password,
      handwriting: this.state.handwriting,
    });
    fetch('http://login.hwat-auth.com:9099/create_account', {
      method: "POST", 
      mode: "cors",
      headers: {
          "Content-Type": "text/plain",
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
        handwriting: this.state.handwriting,
      }),
    }).then(() => {
      alert('Saved');
      window.localStorage.setItem("username", this.state.username);
      this.setState({
        username: '',
        password: '',
      });
      this.canvas.current.clear();
      this.props.history.push('/validation');
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
        <form>
            <input type="text" name="user" placeholder="Username" value={this.state.username} onChange={this.usernameChange}></input>
            <input type="password" name="pass" placeholder="Password" value={this.state.password} onChange={this.passwordChange}></input>
            <Canvas ref={this.canvas} updateHandwriting={this.updateHandwriting.bind(this)}/>
            <input type="submit" name="login" class="login login-submit" value="Login" onClick={this.formSubmit}></input>
        </form>

        <div class="login-help">
            <a href="/">Some other link</a>
        </div>
      </Card>
    );
  }
}

export default withRouter(Login);
