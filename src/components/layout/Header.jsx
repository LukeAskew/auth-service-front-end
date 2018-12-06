import React from 'react';

const Header = props => (
  <div>
    <button
      type={'button'}
      onClick={props.onLogout}
    >
      {'Logout'}
    </button>
  </div>
);

export default Header;
