import React from 'react';
import DisplayMain from './DisplayMain';
import LoginForm from './LoginForm';
import LoginHeader from './LoginHeader';

const LoginPage = ({ isLoggedIn, setIsLoggedIn }) => (
  <>

    <LoginHeader />

    <DisplayMain>
      <LoginForm isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
    </DisplayMain>

  </>
);

export default LoginPage;
