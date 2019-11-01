import React from 'react';

export default class Circle extends React.PureComponent {
  render () {
    const { x, y, r, fill, fillOpacity } = this.props;
    return (
      <svg>
	<defs>
	  <radialGradient id="RadialGradient1">
            <stop offset="70%" stopColor={fill || "gold"} />
            <stop offset="100%" stopColor="transparent" stopOpacity="0.4"/>
	  </radialGradient>
	  
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
	<circle cx={x} cy={y} r={r || 20}
		fill="url(#RadialGradient1)"
		fillOpacity={fillOpacity || 1}
		filter="url(#dropshadow)"
	/>
      </svg>
    )
  }
}
