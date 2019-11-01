import React from 'react';
import Circle from './Circle.js';
import Planet from './Planet.js';

let bkg = [];
for (let i = 0; i < 100; i++)
  bkg.push({ x: Math.random() * (window.innerWidth + 20), y: Math.random() * (window.innerHeight + 20) });

// SPACE
export default class Space extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      toggleParallax: false,
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
  handleCheckbox = (e) => {
    const { name } = e.target;
    this.setState({
      toggleParallax: !this.state.toggleParallax,
    });
  }

  tick() {
    const { x, y, left, right, up, down, t, fg } = this.state;
    if (left) {
      this.setState({
	a_x: -0.3,
	v_x: this.state.v_x + this.state.a_x,
      })
    }
    if (right) {
      this.setState({
	a_x: 0.3,
	v_x: this.state.v_x + this.state.a_x,
      })
    }
    if (up) {
      this.setState({
	a_y: -0.5,
	v_y: this.state.v_y + this.state.a_y,
      })
    }
    if (down) {
      this.setState({
	a_y: 0.5,
	v_y: this.state.v_y + this.state.a_y,
      })
    }
    if (x >= window.innerWidth || x <= 20) {
      this.setState({
	v_x: this.state.v_x * -1,
      })
    }
    if (y >= window.innerHeight-10 || y <= 7) {
      this.setState({
	v_y: this.state.v_y * -1,
      })
    }
    if ((this.state.v_x <= 0.5 && this.state.v_x >= -0.5) &&
	(this.state.v_y <= 0.5 && this.state.v_y >= -0.5)) { // small enough velocity
      this.setState({
	x: this.state.x + Math.cos(t*4) * Math.cos(t),
	y: this.state.y + Math.cos(t*4) * Math.sin(t),
      })
    }
    else {
      this.setState({
	x: x + this.state.v_x,
	y: y + this.state.v_y,
      });
    }
    if (this.state.toggleParallax) {
      bkg = bkg.map(star => ({
	x: star.x - this.state.v_x/30,
	y: star.y - this.state.v_y/30,
      }))
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
    const { x, y, t, v_x, v_y } = this.state;
    return (
      <div>
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
	    <Planet x={x} y={y} t={t} />
	  </svg>
	</div>
	<div className="checkbox">
	  <label htmlFor="toggleParallax">Parallax On</label>
	  <input type="checkbox"
		 name="toggleParallax"
		 checked={this.state.toggleParallax}
		 onChange={this.handleCheckbox}
	  />
	</div>
      </div>
    )
}
};
