import React from 'react';

const Circle = (props) => {
  const { x, y } = props;
  return (
    <svg>
      <circle cx={x} cy={y} r={10} fill="yellow" />
    </svg>
  )
};

export default Circle;
