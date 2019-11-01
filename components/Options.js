import React from 'react';
import Circle from './Circle.js';
import Square from './Square.js';

const SHAPES = ['circle', 'square'];

const Options = (props) => {
  const { handleChange, sizeValue, shapeValue } = props;
  const shapeToDemo = shapeValue.toUpperCase();
  return (
    <div id="options-bar">
      <div className="option-col">
	<div className="option">
	  <label htmlFor="size">Size</label>
	  <input type="range" className="slider" id="radius-range"
		 min="1" max="50" step="1"
		 name="size"
		 onChange={handleChange}
		 value={sizeValue}
	  />
	</div>
	<div className="option">
	  <label htmlFor="shape">Shape</label>
	  <select name="shape"
		  onChange={handleChange}>
	    {SHAPES.map((shape,index) =>
	      (<option key={index}
		       value={shape}>
		{shape}
	      </option>)
	    )}
	  </select>
	</div>
      </div>
      <div className="option">
	<div className="demo">
	  {(shapeValue === 'circle')
	  ? <Circle x={40} y={50} r={sizeValue} />
	  : <Square x={50 - sizeValue/2} y={50 - sizeValue/2} r={sizeValue} />}
	</div>
      </div>
    </div>
  )
};

export default Options;
