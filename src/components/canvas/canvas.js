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
            shouldPaint: false,
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
    
    getEventPosition = (event) => {
        event = event.touches ? event.touches[0] : event;
        const canvas = this.paintCanvas.current;
        return {
            x: event.pageX - canvas.offsetLeft,
            y: event.pageY - canvas.offsetTop,
        };
    }

    handleMouseMove =
        (event) => {
            event.preventDefault();
            const nextMousePosition = this.getEventPosition(event);
            this.setState({
                last_mouse: this.state.mouse,
                mouse: nextMousePosition
            });
            this.onPaint();
        }

    handleMouseDown =
        (event) => {
            const eventPosition = this.getEventPosition(event);
            this.setState({
                shouldPaint: true,
                mouse: eventPosition,
                last_mouse: eventPosition,
            });
        }

    handleMouseUp =
        () => {
            const canvas = this.paintCanvas.current;
            this.props.updateHandwriting(canvas.toDataURL());
            this.setState({
                shouldPaint: false,
            })
        }

    onPaint =
        () => {
            if (!this.state.shouldPaint) {
                return;
            }
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
                <canvas ref={this.paintCanvas} 
                        onMouseMove={this.handleMouseMove} onTouchMove={this.handleMouseMove}
                        onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp}
                        onTouchStart={this.handleMouseDown} onTouchEnd={this.handleMouseUp}
                        onMouseLeave={this.handleMouseUp} onMouseOut={this.handleMouseUp} onTouchCancel={this.handleMouseUp}>
                </canvas>
                </div>
                <div class="password-text">Draw your password character here</div> 
            </div>
        );
    }
}