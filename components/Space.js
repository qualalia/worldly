import React from 'react';
import Circle from './Circle.js';
import Square from './Square.js';
import Planet from './Planet.js';

export default class Space extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      /*      x: -20,
	 y: 0,
	 r: props.size,
	 dx: 0,
	 dy: 0,
	 circles: [],
	 squares: [], */
      circles: [],
      t: 0,
      px: 700,
      py: 400,
    };
  }
  componentDidMount() {
    this.timerId = setInterval(
      () => this.tick(),
      16
    );
    const celestialBkg = [];
    for (let i = 0; i < 500; i++) 
      celestialBkg.push({x: Math.random() * 5000, y: Math.random() * 900 });
    this.setState({ circles: celestialBkg });
  }
  componentWillUnmount() {
    clearInterval(this.timerId);
  }
  handleKeyDown = (e) => {
    const event = e || window.e;
    let dx = 0;
    let dy = 0;
    if (['ArrowLeft', 'a'].includes(event.key))
      dx = -10;
    else if (['ArrowRight', 'd', 'e'].includes(event.key))
      dx = 10;
    else if (['ArrowUp', 'w', ','].includes(event.key))
      dy = -10;
    else if (['ArrowDown', 'o', 's'].includes(event.key))
      dy = 10;
    else {};
    this.setState({
      px: this.state.px + dx,
      py: this.state.py + dy,
    });
  }

  handleMouseMove = (evt) => {
    /*const dx = (evt.clientX - this.state.x)
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
       });*/
  }
  handleClick = (evt) => {
    console.log('in focus')
    /*if (this.props.shape === 'circle') {
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
       }*/
  }
  
  tick() {
    this.setState({
      t: this.state.t + 0.007,
    });
  }
  render() {
    const { px, py, t, circles } = this.state;
    return (
      <div tabIndex="1"
	   className="svg-container"
	   onMouseMove={this.handleMouseMove}
	   onClick={this.handleClick}
	   onKeyDown={this.handleKeyDown}
      >
	<svg>
	  <Planet x={px} y={py} t={t} />
	  {circles.map((circle, index) =>
	    <Circle key={index}
		    x={circle.x}
		    y={circle.y}
	    />
	  )}
	  {/* {(shapeToPreview === 'circle')
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
	      )} */}
	  <rect x={0} y={0} width="100%" height="100%" fill="darkmagenta" fillOpacity="0.2" />
	</svg>
      </div>
    )
  }
};


// gravity: G*m_1*m_2 / d^2 
