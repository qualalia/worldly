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

// SPACE
export default class Space extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fg: testBodies,
      bkg: celestialBkg,
      t: 0,
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      v_x: 0,
      v_y: 0,
      a_x: 0,
      a_y: 0,
      up: false,
      down: false,
      left: false,
      right: false,
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
  }

  tick() {
    const { x, y, left, right, up, down, t, fg } = this.state;
    if (left) {
      this.setState({
	a_x: -1,
	v_x: Math.min(this.state.v_x + this.state.a_x, 10),
      })
    }
    if (right) {
      this.setState({
	a_x: 1,
	v_x: Math.min(this.state.v_x + this.state.a_x, 10),
      })
    }
    if (up) {
      this.setState({
	a_y: -0.3,
	v_y: Math.min(this.state.v_y + this.state.a_y, 10),
      })
    }
    if (down) {
      this.setState({
	a_y: 0.3,
	v_y: Math.min(this.state.v_y + this.state.a_y, 10),
      })
    }
    if (x >= window.innerWidth || x <= 0) {
      this.setState({
	v_x: this.state.v_x * -1,
      })
    }
    if (y >= window.innerHeight || y <= 10) {
      this.setState({
	v_y: this.state.v_y * -1,
      })
    }
    if ((this.state.v_x <= 0.5 && this.state.v_x >= -0.5) && (this.state.v_y <= 0.5 && this.state.v_y >= -0.5)) { // small enough velocity
      this.setState({
	x: this.state.x + Math.cos(t*4) * Math.cos(t) * x/300,
	y: this.state.y + Math.cos(t*4) * Math.sin(t) * y/300,
      })
    }
    else {
      this.setState({
	x: x + this.state.v_x,
	y: y + this.state.v_y,
      });
    }

    this.setState({
      t: t + 0.02,
      left: false,
      right: false,
      up: false,
      down: false,
    })
  }
  render() {
    const { x, y, t, bkg, fg } = this.state;
    return (
      <div tabIndex="1"
	   className="svg-container"
	   onMouseMove={this.handleMouseMove}
	   onClick={this.handleClick}
	   onKeyDown={this.handleKeyDown}
	   onKeyUp={this.handleKeyUp}
      >
	<svg width={window.innerWidth} height={window.innerHeight}>
	  {bkg.map((circle, index) =>
	    <Circle key={index}
		    x={circle.x} y={circle.y}
		    r={5}
		    fill={"darkmagenta"}
		    fillOpacity={0.5}
	    />
	  )}
	  {/*fg.map((el, index) =>
	    <Circle key={index}
		    x={el.x} y={el.y}
		    r={15}
		    fill={"yellow"}
	    />
	  )*/}
	  <Planet x={x} y={y} t={t} />
	</svg>
      </div>
    )
  }
};


// gravity: G*m_1*m_2 / d^2 
