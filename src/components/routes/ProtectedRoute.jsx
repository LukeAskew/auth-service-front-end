import React from 'react';
import { Redirect } from 'react-router-dom';

const ProtectedRoute = (props) => {
  const { location, children, account } = props;

    if (!account) {
      return (
        <Redirect
          to={{
            pathname: '/login',
            state: { referrer: location },
          }}
        />
      );
    }

    return React.cloneElement(React.Children.only(children), props);
}

export default ProtectedRoute;
