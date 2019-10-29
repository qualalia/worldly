import React from 'react';

const Circle = (props) => {
  const { x, y, r } = props;
  return (
    <svg>
      <circle cx={x} cy={y} r={props.r || 10} fill="yellow" />
    </svg>
  )
};

export default Circle;
