import React from 'react';

const Planet = (props) => {
  const { x, y, t } = props;
  const v_x = s => Math.cos(t*4) * Math.cos(t) * s/4;
  const v_y = s => Math.cos(t*4) * Math.sin(t) * s/4;
  const a_x = s => -0.0005*t;
  return (
    <svg>
      <defs>
	<radialGradient id="RadialGradient1">
          <stop offset="30%" stopColor="darkmagenta" />
          <stop offset="100%" stopColor="transparent" />
	</radialGradient>
      </defs>
      <circle cx={x + v_x(x)} cy={y + v_y(y)} r={20}
	      fill="url(#RadialGradient1)"
      />
    </svg>
  )
};

export default Planet;
