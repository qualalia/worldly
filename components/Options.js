import React from 'react';
import Circle from './Circle.js';
import Star from './Star.js';

const SHAPES = ['circle', 'star'];

const Options = (props) => {
  const { handleChange, sizeValue, shapeValue } = props;
  const shapeToDemo = shapeValue.toUpperCase();
  return (
    <div id="options-bar">
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
	  {SHAPES.map(shape =>
	  (<option value={`${shape}`}>{shape}</option>)
	  )}
	</select>
      </div>
      <div className="demo">
	{(shapeValue === 'circle') ? <Circle x={50} y={50} r={sizeValue} /> : <Star />}
      </div>
    </div>
  )
};

export default Options;
