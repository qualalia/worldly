import React from 'react';
import Circle from './Circle.js';

const Options = () => {
  return (
    <div id="options-bar">
      <div className="option">
	<label htmlFor="radius-range">Size</label>
	<input type="range" className="slider" id="radius-range"
	       min="1" max="30"
	       value="15" 
	       onChange={() => console.log('todo: show example size')}
	/>
      </div>
      <div className="option">
	<label htmlFor="shapes">Shape</label>
	<select onChange={() => console.log('todo: pass choice to Space')}>
	  <option value="circle">Circle</option>
	  <option value="square">Square</option>
	</select>
      </div>

    </div>
  )
};

export default Options;
