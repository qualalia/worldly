import React from 'react';
import Space from './Space.js';
import Options from './Options.js';

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      size: 10,
      shape: 'circle',
    }
  }
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    const { size, shape } = this.state;
    return (
      <div className="body-container">
	<Space shape={shape}
	       size={size}
	/>
	<Options handleChange={this.handleChange}
		 sizeValue={size}
		 shapeValue={shape}
	/>
      </div>
    )
  }
};

export default Main;
