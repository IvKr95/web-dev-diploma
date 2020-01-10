import React from 'react';
import { Link } from 'react-router-dom';

const linkStyle = {
  color: 'inherit',
  textDecoration: 'none',
};

function ClientHeader() {
  return (
    <header className="page-header">
      <h1 className="page-header__title">
        <Link style={linkStyle} to="/">
Идём
          <span>в</span>
кино
        </Link>
      </h1>
    </header>
  );
}

export default ClientHeader;
