import React from 'react';
import Circle from './Circle.js';
import Planet from './Planet.js';

const celestialBkg = [];
const testBodies = [
  { x: 400, y: 180 },
  { x: 800, y: 540 },
];
for (let i = 0; i < 200; i++)
  celestialBkg.push({ x: Math.random() * 4000, y: Math.random() * 900 });
const width = window.innerWidth;
const height = window.innerHeight;

// SPACE
export default class Space extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      foreground: testBodies,
      background: celestialBkg,
      t: 0,
      x: width/2,
      y: height/2,
      up: false,
      down: false,
      left: false,
      right: false,
    };
    this.v_x = 0;
    this.v_y = 0;
    this.a_x = 0;
    this.a_y = 0;
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
  handleKeyDown = (e) => {
    const event = e || window.e;
    if (['ArrowLeft', 'a'].includes(event.key)) {
      this.setState({ left: true });
    }
    else if (['ArrowRight', 'd', 'e'].includes(event.key)) {
      this.setState({ right: true });
    }
    else if (['ArrowUp', 'w', ','].includes(event.key)) {
      this.setState({ up: true });
    }
    else if (['ArrowDown', 'o', 's'].includes(event.key)) {
      this.setState({ down: true });
    }
    else {};
    /*    this.setState({
       px: this.state.px + dx,
       py: this.state.py + dy,
       background: [
       ...this.state.background,
       bkgParallax,
       ],
       });*/
  }

  tick() {
    const { x, y, left, right, up, down, t } = this.state;
    if (left) {
      this.a_x = 0.3;
      this.v_x += Math.max(-1 + this.a_x, -5);
    }
    else if (!left) {
      this.v_x += -0.5 * this.a_x / Math.max(this.v_x, 2);
    }
    
    if (right) {
      this.a_x = -0.5;
      this.v_x += 1 + this.a_x;
    }
    else if (!right) {
      this.v_x += 0.5 * this.a_x;
    }

    if (up) {
      this.a_y = 0.2;
      this.v_y = -1 + this.a_y;
    }
    else if (!up) {
      this.v_y += -0.2 * this.a_y;
    }

    if (down) {
      this.a_y = -0.2;
      this.v_y = 1;
    }
    else {
      this.v_y += 0.2 * this.a_y;
    }
    
    if (x >= width-5 || x <= 15) {
      this.v_x = -1 * this.v_x;
    }
    if (y >= height || y <= 10) {
      this.v_y = -1 * this.v_y;
    }
    if (this.v_x === 0 && this.v_y === 0) {
      this.setState({
	t: t + 0.02,
	x: this.state.x + Math.cos(t*4) * Math.cos(t) * x/500,
	y: this.state.y + Math.cos(t*4) * Math.sin(t) * y/500,
	left: false,
	right: false,
	up: false,
	down: false,
      })
    }
    else {
      this.setState({
	t: t + 0.02,
	x: this.state.x + this.v_x + this.a_x,
	y: this.state.y + this.v_y + this.a_y,
	left: false,
	right: false,
	up: false,
	down: false,
      });
    }
  }
  render() {
    const { x, y, t, background, foreground } = this.state;
    return (
      <div tabIndex="1"
	   className="svg-container"
	   onMouseMove={this.handleMouseMove}
	   onClick={this.handleClick}
	   onKeyDown={this.handleKeyDown}
	   onKeyUp={this.handleKeyUp}
      >
	<svg width={width} height={height}>
	  {background.map((circle, index) =>
	    <Circle key={index}
		    x={circle.x} y={circle.y}
		    r={5}
		    fill={"darkmagenta"}
		    fillOpacity={0.5}
	    />
	  )}
	  {foreground.map((el, index) =>
	    <Circle key={index}
		    x={el.x}
		    y={el.y}
		    r={15}
		    fill={"yellow"}
	    />
	  )}
	  <Planet x={x} y={y} t={t}
		  v_x={this.v_x} v_y={this.v_y} />
	</svg>
      </div>
    )
  }
};


// gravity: G*m_1*m_2 / d^2 
