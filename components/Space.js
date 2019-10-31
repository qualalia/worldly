import React from 'react';
import Circle from './Circle.js';
import Planet from './Planet.js';

const celestialBkg = [];
const testBodies = [
  { x: 400, y: 180 },
  { x: 800, y: 180 },
  { x: 1200, y: 180 },
  { x: 400, y: 540 },
  { x: 800, y: 540 },
  { x: 1200, y: 540 },
];
for (let i = 0; i < 200; i++)
  celestialBkg.push({ x: Math.random() * 4000, y: Math.random() * 900 });

// SPACE
export default class Space extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      foreground: testBodies,
      background: celestialBkg,
      t: 0,
      px: 700 + Math.cos(0) * Math.cos(0) * 2,
      py: 400 + Math.cos(0) * Math.sin(0) * 2,
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
    let dx = 0;
    let dy = 0;
    if (['ArrowLeft', 'a'].includes(event.key)) {
      dx = -10;
      this.setState({ left: true });
    }
    else if (['ArrowRight', 'd', 'e'].includes(event.key)) {
      dx = 10;
      this.setState({ right: true });
    }
    else if (['ArrowUp', 'w', ','].includes(event.key)) {
      dy = -10;
      this.setState({ up: true });
    }
    else if (['ArrowDown', 'o', 's'].includes(event.key)) {
      dy = 10;
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
  handleKeyUp = (e) => {
    console.log('key up');
    this.setState({
      left: false,
      right: false,
      up: false,
      down: false,
    });
  }
  
  tick() {
    const { left, right, up, down, t } = this.state;
    if (left) {
      this.v_x = -t/20;
      this.a_x = -1;
    }
    else {
      this.v_x = 0;
      this.a_x = 0.05;
    }
    if (right) {
      this.v_x = t/20;
      this.a_x = 1;
    }
    if (up) {
      this.v_y = -t/20;
      this.a_y = -1;
    }
    if (down) {
      this.v_y = t/2;
      this.a_y = 1;
    }
    
    this.setState({
      t: t + 0.02,
      px: this.state.px + this.v_x + this.a_x,
      py: this.state.py + this.v_y + this.a_y,
    });
  }
  render() {
    const { px, py, t, background, foreground } = this.state;
    return (
      <div tabIndex="1"
	   className="svg-container"
	   onMouseMove={this.handleMouseMove}
	   onClick={this.handleClick}
	   onKeyDown={this.handleKeyDown}
	   onKeyUp={this.handleKeyUp}
      >
	<svg>
	  {/*<rect x={0} y={0} width="100%" height="100%" fill="darkmagenta" fillOpacity="0.1" />*/}
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
		    fill={"orange"}
	    />
	  )}
	  <Planet x={px} y={py} t={t} />
	</svg>
      </div>
    )
  }
};


// gravity: G*m_1*m_2 / d^2 
