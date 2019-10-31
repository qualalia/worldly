import React from 'react';

export default class Circle extends React.PureComponent {
  render () {
    const { x, y, r, fill, fillOpacity } = this.props;
    const v_x = s => s + s;
    const a_x = s => 0;
    return (
      <svg>
	<defs>
	  <radialGradient id="RadialGradient1">
            <stop offset="70%" stopColor="white" />
            <stop offset="100%" stopColor="transparent" />
	  </radialGradient>
	</defs>
	<circle cx={x} cy={y} r={r || 10} fill={fill || "url(#RadialGradient1)"} fillOpacity={fillOpacity || 1} />
      </svg>
    )
  }
}
