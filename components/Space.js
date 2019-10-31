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

for (let i = 0; i < 500; i++)
  celestialBkg.push({ x: Math.random() * 5000, y: Math.random() * 900 });

export default class Space extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      foreground: testBodies,
      background: celestialBkg,
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
    const bkgParallax = this.state.background.map(circle => ({
      x: circle.x - (20), y: circle.y - (20)
    }));

    this.setState({
      px: this.state.px + dx,
      py: this.state.py + dy,
      background: [
	...this.state.background,
	bkgParallax,
      ],
    });
    
  }
  handleKeyUp = (e) => {
    console.log('key up');
  }
  
  handleClick = (evt) => {
    console.log('in focus');
  }
  
  tick() {
    this.setState({
      t: this.state.t + 0.02,
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
	  <Planet x={px} y={py} t={t} />
	  {/*<rect x={0} y={0} width="100%" height="100%" fill="darkmagenta" fillOpacity="0.1" />*/}
	  {background.map((circle, index) =>
	    <Circle key={index}
		    x={circle.x}
		    y={circle.y}
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
	</svg>
      </div>
    )
  }
};


// gravity: G*m_1*m_2 / d^2 
