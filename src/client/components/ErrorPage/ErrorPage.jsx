/* eslint-disable linebreak-style */
import React from 'react';
import './errorPage.css';

// Показывается когда пользователь переходит
// по несуществующему руту
function ErrorPage() {
  return (
    <div className="error">
      <div className="error__content">
        <span className="error__text">Page Not Exist</span>
      </div>
    </div>
  );
}

export default ErrorPage;
