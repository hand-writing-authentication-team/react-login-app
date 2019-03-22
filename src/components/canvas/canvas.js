import React, {Component} from 'react';
import './canvas.css';

export class Canvas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mouse: {
                x: 0,
                y: 0
            },
            last_mouse: {
                x: 0,
                y: 0
            },

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

        ctx.lineWidth = 3;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.strokeStyle = 'black';
    }

    handleMouseMove =
        (mouseEvent) => {
            const canvas = this.paintCanvas.current;
            this.setState({
                last_mouse: this.state.mouse
            });
            const nextMousePosition = {
                x: mouseEvent.pageX - canvas.offsetLeft,
                y: mouseEvent.pageY - canvas.offsetTop,
            };
            this.setState({
                mouse: nextMousePosition
            });
        }

    handleMouseDown =
        () => {
            this.paintCanvas.current.addEventListener(
                'mousemove', this.onPaint, false);
        }

    handleMouseUp =
        () => {
            const canvas = this.paintCanvas.current;
            this.props.updateHandwriting(canvas.toDataURL());
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

    clear = () => {
        const canvas = this.paintCanvas.current;
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    }

    render() {
        return (
            <div class='container'>
                <div class="password-container" ref={this.sketchDiv}>
                <canvas ref={this.paintCanvas} onMouseMove={this.handleMouseMove} onMouseDown={this.handleMouseDown}
                        onMouseUp={this.handleMouseUp} onMouseLeave={this.handleMouseUp} onMouseOut={this.handleMouseUp}>
                </canvas>
                </div>
                <div class="password-text">Draw your password character here</div> 
            </div>
        );
    }
}