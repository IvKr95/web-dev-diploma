/* eslint-disable linebreak-style */
import React from 'react';
import Header from '../shared-components/Header';
import Main from '../shared-components/Main';
import LoginForm from './LoginForm';

function LoginPage() {
  return (
    <>
      <Header isAdminPage />

      <Main>
        <LoginForm />
      </Main>
    </>
  );
}

export default LoginPage;
