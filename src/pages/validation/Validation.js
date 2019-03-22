import './validation.css';

import React, {Component} from 'react';
import {Canvas} from '../../components/canvas/canvas';
import Card from '../../components/card/Card';


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

  render() {
    return (
      <Card title="Validation">
        <form>
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

export default Validation;
