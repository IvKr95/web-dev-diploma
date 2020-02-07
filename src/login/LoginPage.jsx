/* eslint-disable linebreak-style */
import React, { useEffect } from 'react';
import Header from '../shared-components/Header/Header';
import Main from '../shared-components/Main/Main';
import LoginForm from './LoginForm';
import styles from '../admin/css/admin.module.css';
import './css/login.css';

// Страница логина
function LoginPage() {
  useEffect(() => {
    document.body.classList.add(styles['admin-theme']);
    return () => {
      document.body.classList.remove(styles['admin-theme']);
    };
  }, []);

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
