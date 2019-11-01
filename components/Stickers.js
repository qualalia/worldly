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
	x: evt.clientX + 12,// both -10 with no margins, (-45, -30) with 2rem
	y: evt.clientY + 8,
	r: this.props.size - 4,
      });
    }
    else {
      this.setState({
	x: evt.clientX - this.props.size/2 + 12,
	y: evt.clientY - this.props.size/2 + 8,
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
	    theta: this.props.t,
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
		    r={circle.r} t={(circle.theta + t/circle.r*60)%360}
		    fill="gold"
	    />
	  )}
	  {squares.map((square,index) =>
	    <Square key={index}
		    x={square.x} y={square.y}
		    r={square.r} theta={square.theta + t * square.omega}
	    />
	  )}
	  {(shapeToPreview === 'circle')
	  ? <circle cx={x} cy={y} r={r-5} fill="gold" fillOpacity={0.4} />
	  : <rect x={x} y={y} width={r} height={r} fill="orange" fillOpacity={0.4}/>
	  }
	</svg>
      </div>
    )
  }
};
