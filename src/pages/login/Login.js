import './login.css';

import React, {Component} from 'react';
import {Canvas} from '../../components/canvas/canvas';


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
      this.setState({
        username: '',
        password: '',
      });
      this.canvas.current.clear();
    }).catch(error => {
      console.error(error);
    });
  }

  render() {
    return (
      <div className='App'>
        <div class="login-card">
            <h1>Login</h1><br></br>
            <form>
                <input type="text" name="user" placeholder="Username" value={this.state.username} onChange={this.usernameChange}></input>
                <input type="password" name="pass" placeholder="Password" value={this.state.password} onChange={this.passwordChange}></input>
                <Canvas ref={this.canvas} updateHandwriting={this.updateHandwriting.bind(this)}/>
                <input type="submit" name="login" class="login login-submit" value="Login" onClick={this.formSubmit}></input>
            </form>

            <div class="login-help">
                <a href="/">Some other link</a>
            </div>
        </div>
    </div>
    );
  }
}

export default Login;
