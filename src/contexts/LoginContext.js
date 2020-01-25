/* eslint-disable linebreak-style */
import React from 'react';

// Глобальный контекст логина
// Будет доступно всему приложению
const LoginContext = React.createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});
LoginContext.displayName = 'LoginContext';

export default LoginContext;
