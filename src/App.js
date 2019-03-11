import './App.css';

import React, {Component} from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mouse: {x: 0, y: 0},
      last_mouse: {x: 0, y: 0},
      username: '',
      password: '',
    };
    this.paintCanvas = React.createRef();
    this.sketchDiv = React.createRef();
  }

  componentDidMount() {
    const canvas = this.paintCanvas.current;
    const ctx = canvas.getContext('2d');
    const sketch_style = getComputedStyle(this.sketchDiv.current);

    canvas.width = parseInt(sketch_style.getPropertyValue('width'));
    canvas.height = parseInt(sketch_style.getPropertyValue('height'));

    ctx.lineWidth = 5;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'blue';
  }

  handleMouseMove =
      (mouseEvent) => {
        const canvas = this.paintCanvas.current;
        this.setState({last_mouse: this.state.mouse});
        const nextMousePosition = {
          x: mouseEvent.pageX - canvas.offsetLeft,
          y: mouseEvent.pageY - canvas.offsetTop,
        };
        this.setState({mouse: nextMousePosition});
      }

  handleMouseDown =
      () => {
        this.paintCanvas.current.addEventListener(
            'mousemove', this.onPaint, false);
      }

  handleMouseUp =
      () => {
        this.paintCanvas.current.removeEventListener(
            'mousemove', this.onPaint, false);
      }

  onPaint =
      () => {
        const canvas = this.paintCanvas.current;
        const ctx = canvas.getContext('2d');
        ctx.beginPath();
        ctx.moveTo(this.state.last_mouse.x, this.state.last_mouse.y);
        ctx.lineTo(this.state.mouse.x, this.state.mouse.y);
        ctx.closePath();
        ctx.stroke();
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
    const canvas = this.paintCanvas.current;
    console.log({
      username: this.state.username,
      password: this.state.password,
      image: canvas.toDataURL(),
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
                
                <div class='container'>
                  <div class="password-container" ref={this.sketchDiv}>
                      <canvas ref={this.paintCanvas} onMouseMove={this.handleMouseMove} onMouseDown={this.handleMouseDown}
                          onMouseUp={this.handleMouseUp} onMouseLeave={this.handleMouseUp} onMouseOut={this.handleMouseUp}>
                      </canvas>
                  </div>
                  <div class="password-text">Draw your password character here</div> 
                </div>
                <input type="submit" name="login" class="login login-submit" value="Login" onClick={this.formSubmit}></input>
            </form>

            <div class="login-help">
                <a href="#">Some other link</a>
            </div>
        </div>
    </div>
    );
  }
}

export default App;
