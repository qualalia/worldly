import React from 'react';
import Space from './Space.js';
import Options from './Options.js';

class Main extends React.Component {
  render() {
    return (
      <div className="body-container">
	<Space />
	<Options /> {/* todo: share some props between Space and Options */}
      </div>
    )
  }
};

export default Main;
