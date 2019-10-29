import React from 'react';

class Main extends React.Component {
  componentDidMount() {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "green";
    ctx.fillRect(0,0,500,500);
  }
  // mouseMove in here?
  render() {
    return (
      <div>
	<canvas ref="canvas" width={500} height={500} />
      </div>
    )
  }
};

export default Main;
