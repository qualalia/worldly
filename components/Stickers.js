import React from 'react';
import Circle from './Circle.js';
import Square from './Square.js';

export default class Stickers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      x: -20,
      y: 0,
      r: 0,
      circles: [],
      squares: [],
    };
  }
  handleMouseMove = (evt) => {
    if (this.props.shape === "circle") {
      this.setState({
	x: evt.clientX - 8,// both -10 with no margins, (-45, -30) with 2rem
	y: evt.clientY - 3,
	r: this.props.size,
      });
    }
    else {
      this.setState({
	x: evt.clientX - this.props.size/2 - 5,
	y: evt.clientY - this.props.size/2 - 2,
	r: this.props.size,
	theta: 0,
      });
    }
  }
  handleClick = (evt) => {
    if (this.props.shape === 'circle') {
      this.setState({
	circles: [
	  ...this.state.circles,
	  { x: this.state.x,
	    y: this.state.y,
	    r: this.props.size,
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
	    theta: this.props.t,
	    omega: Math.random() * 100,
	  },
	],
      });
    }
  }

  tick = () => {
    this.props.tick();
  }
  render() {
    const { x, y, r, circles, squares } = this.state;
    const { t } = this.props;
    const shapeToPreview = this.props.shape;
    return (
      <div tabIndex="2"
	   className="svg-container"
	   onMouseMove={this.handleMouseMove}
	   onClick={this.handleClick}
      >
	<svg>
	  <rect x={0} y={0} width="100%" height="100%" fill="darkmagenta" fillOpacity="0.3" />
	  {circles.map((circle,index) =>
	    <Circle key={index}
		    x={circle.x} y={circle.y}
		    r={circle.r} t={t}
		    fill="yellow"
	    />
	  )}
	  {squares.map((square,index) =>
	    <Square key={index}
		    x={square.x} y={square.y}
		    r={square.r} theta={square.theta + t * square.omega}
	    />
	  )}
	  {(shapeToPreview === 'circle')
	  ? <circle cx={x} cy={y+5} r={r-5} fill="yellow" fillOpacity={0.4} />
	  : <rect x={x-5} y={y+5} width={r} height={r} fill="orange" fillOpacity={0.4}/>
	  }
	</svg>
      </div>
    )
  }
};
