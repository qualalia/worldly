import React from 'react';

const Planet = (props) => {
  const { x, y } = props;
  return (
    <svg>
      <defs>
	<radialGradient id="RadialGradient2">
          <stop offset="30%" stopColor="orange" />
          <stop offset="100%" stopColor="transparent" />
	</radialGradient>
      </defs>
      <circle cx={x} cy={y} r={20}
	      fill="url(#RadialGradient2)"
      />
    </svg>
  )
};

export default Planet;
