import React from 'react';

const Planet = (props) => {
  const { x, y, t } = props;
  const v_x = s => 0 //Math.cos(t*4) * Math.cos(t) * s/10;
  const v_y = s => 0 //Math.cos(t*4) * Math.sin(t) * s/10;
  return (
    <svg>
      <defs>
	<radialGradient id="RadialGradient2">
          <stop offset="30%" stopColor="orange" />
          <stop offset="100%" stopColor="transparent" />
	</radialGradient>
      </defs>
      <circle cx={x + v_x(x)} cy={y + v_y(y)} r={20}
	      fill="url(#RadialGradient2)"
      />
    </svg>
  )
};

export default Planet;
