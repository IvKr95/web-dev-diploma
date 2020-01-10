import React from 'react';

const LoginContext = React.createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});
LoginContext.displayName = 'LoginContext';

export default LoginContext;
