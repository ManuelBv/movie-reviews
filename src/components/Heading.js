import React from 'react';

const Heading = ({text}) => {

  return (
    <h1 data-test-id="heading-test">{text}</h1>
  )
};

export default Heading;
