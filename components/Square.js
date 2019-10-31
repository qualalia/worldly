import React from 'react';

export default class Square extends React.PureComponent {
  render () {
    const { x, y, r, theta, fill, fillOpacity } = this.props;
    const rotation = `rotate(${theta % 360}, ${x + r/2}, ${y + r/2})`;
    return (
      <svg>
	<defs>
	  <filter id="dropshadow" height="120%">
	    <feGaussianBlur in="SourceGraphic" stdDeviation="4"/>
	    <feComponentTransfer>
	      <feFuncA type="linear" slope="0.9"/>
	    </feComponentTransfer>
	    <feMerge>
	      <feMergeNode />
	      <feMergeNode in="SourceGraphic"/>
	    </feMerge>
	  </filter>
	</defs>
	<rect x={x} y={y}
	      width={r || 20} height={r || 20}
	      transform={rotation}
	      filter="url(#dropshadow)"
	      fill="coral"
	      fillOpacity={fillOpacity}
	/>
      </svg>
    )
  }
}
