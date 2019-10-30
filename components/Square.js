import React from 'react';

const Square = (props) => {
  const { x, y, r, theta } = props;
  const rotation = `rotate(${theta % 360}, ${x + r/2}, ${y + r/2})`;
  return (
    <svg>
      <defs>
	<radialGradient id="RadialGradient1">
          <stop offset="40%" stopColor="purple"/>
          <stop offset="100%" stopColor="transparent"/>
	</radialGradient>
      </defs>
      {/*<circle cx={x+5} cy={y+5} r={r || 10}
	    fill="url(#RadialGradient1)"/>*/}
      <rect x={x} y={y}
	    width={r || 20} height={r || 20}
	    transform={rotation}
	    fill="purple"/>
    </svg>
  )
};

export default Square;
