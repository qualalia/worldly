import React from 'react';

const Circle = (props) => {
  const { x, y, r, dx, dy, t } = props;
  const v_x = s => s + s;
  const a_x = s => 0;
  const v_y = s => Math.sin(t) * s/20;
  return (
    <svg>
      <defs>
	<radialGradient id="RadialGradient1">
          <stop offset="30%" stopColor="yellow"/>
          <stop offset="500%" stopColor="transparent"/>
	</radialGradient>
      </defs>
      <circle cx={x} cy={y} r={r || 10} fill="url(#RadialGradient1)" />
    </svg>
  )
};

export default Circle;
