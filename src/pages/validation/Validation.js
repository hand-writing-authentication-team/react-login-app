import './validation.css';

import React, {Component} from 'react';
import {Canvas} from '../../components/canvas/canvas';
import Card from '../../components/card/Card';
import {withRouter} from "react-router-dom";

class Validation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handwriting: '',
    };
    this.canvas = React.createRef();
  }

  updateHandwriting(newHandWriting) {
    this.setState({
      handwriting: newHandWriting,
    })
  }

  formSubmit = (event) => {
    event.preventDefault();
    console.log({
      username: window.localStorage.getItem('username') | '',
      handwriting: this.state.handwriting,
    });
    fetch('http://login.hwat-auth.com:9099/create_account', {
      method: "POST", 
      mode: "cors",
      headers: {
          "Content-Type": "text/plain",
      },
      body: JSON.stringify({
        username: window.localStorage.getItem('username') | '',
        handwriting: this.state.handwriting,
      }),
    }).then(() => {
      alert('Saved');
      this.canvas.current.clear();
    }).catch(error => {
      console.error(error);
    });
  }

  logout = () => {
    window.localStorage.setItem('username', '');
    this.props.history.push('/login');
  }
  
  render() {
    return (
      <Card title="Validation">
        <form>
            <Canvas ref={this.canvas} updateHandwriting={this.updateHandwriting.bind(this)}/>
            <input type="submit" name="login" class="login login-submit" value="Login" onClick={this.formSubmit}></input>
        </form>

        <div class="validation-sign-out">
            <a onClick={this.logout}>Sign out</a>
        </div>
      </Card>
    );
  }
}

export default withRouter(Validation);
