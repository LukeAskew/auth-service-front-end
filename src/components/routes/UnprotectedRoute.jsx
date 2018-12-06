import React from 'react';

const UnprotectedRoute = (props) => {
  const { children } = props;

  return React.cloneElement(React.Children.only(children), props);
}

export default UnprotectedRoute;
