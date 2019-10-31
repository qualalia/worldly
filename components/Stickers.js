import React from 'react';
import Circle from './Circle.js';
import Square from './Square.js';

export default class Stickers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      x: -20,
      y: 0,
      r: props.size,
      circles: [],
      squares: [], 
      t: 0,
    };
  }
  componentDidMount() {
    this.timerId = setInterval(
      () => this.tick(),
      16
    );
  }
  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  handleMouseMove = (evt) => {
    const dx = (evt.clientX - this.state.x)
       ? (evt.clientX - this.state.x)
       : 0.1;
       const dy = (evt.clientY - this.state.y)
       ? (evt.clientY - this.state.y)
       : 0.1;
       const dtheta = 0;
       this.setState({
       x: evt.clientX - 10,// both -10 with no margins, (-45, -30) with 2rem
       y: evt.clientY - 10,
       dx: dx,
       dy: dy,
       r: this.props.size,
       });
  }
  handleClick = (evt) => {
    if (this.props.shape === 'circle') {
      this.setState({
	circles: [
	  ...this.state.circles,
	  { x: this.state.x,
	    y: this.state.y,
	    r: this.state.r,
	    dx: this.state.dx,
	    dy: this.state.dy,
	  },
	],
      });
    }
    else {//if (this.props.shape === 'square') {
      this.setState({
	squares: [
	  ...this.state.squares,
	  { x: this.state.x,
	    y: this.state.y,
	    r: this.state.r,
	    theta: this.state.t,
	  },
	],
      });
    }
  }
  
  tick() {
    this.setState({
      t: this.state.t + 0.02,
    });
  }
  render() {
    const { x, y, r, t } = this.state;
    return (
      <div tabIndex="2"
	   className="svg-container"
	   onMouseMove={this.handleMouseMove}
	   onClick={this.handleClick}
      >
      <svg>
      <rect x={0} y={0} width="100%" height="100%" fill="darkmagenta" fillOpacity="0.1" />
      {background.map((circle, index) =>
	<Circle key={index}
	x={circle.x}
		y={circle.y}
		fillOpacity={0.5}
	/>
      )}
      {(shapeToPreview === 'circle')
     ? <circle cx={x} cy={y} r={r} fill="transparent" />
     : <rect x={x} y={y} width={r} height={r} fill="transparent" />
      }
      {circles.map((circle,index) =>
	<Circle key={index}
		x={circle.x} y={circle.y}
		r={circle.r} t={t}
		dx={circle.dx} dy={circle.dy}
	/>
      )}
      {squares.map((square,index) =>
	<Square key={index}
		x={square.x} y={square.y}
		r={square.r}
		theta={square.theta + t}
	/>
      )}
	</svg>
      </div>
    )
  }
};
