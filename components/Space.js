import React from 'react';
import Circle from './Circle.js';

export default class Space extends React.Component {
  constructor() {
    super();
    this.state = {
      x: 0,
      y: 0,
      t: 0,
      dx: 0,
      dy: 0,
      circles: [],
    };
  }
  componentDidMount() {
    this.timerId = setInterval(
      () => this.tick(),
      1000
    );
  }
  componentWillUnmount() {
    clearInterval(this.timerId);
  }
  handleMouseMove = (evt) => {
    const dx = (evt.clientX - 10) - this.state.x;
    this.setState({
      x: evt.clientX - 40,// both - 10 with no margins
      y: evt.clientY - 35,
    });
  }
  handleClick = (evt) => {
    this.setState({
      circles: [...this.state.circles, {x: this.state.x, y: this.state.y}],
    });
  }
  tick() {
    this.setState({
      t: this.state.t + 1,
    });
  }
  render() {
    const { x, y, circles } = this.state;
    return (
      <div className="svg-container"
	   onMouseMove={this.handleMouseMove}
	   onClick={this.handleClick}
      >
	<svg>
	  <circle cx={x} cy={y} r={10} fill="orange" />
	  {circles.map((circle,index) =>
	    <Circle key={index}
		    x={circle.x}
		    y={circle.y}
	    />
	  )}
	</svg>
      </div>
    )
  }
};
