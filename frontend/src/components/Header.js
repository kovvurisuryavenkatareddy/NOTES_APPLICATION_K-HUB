import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';


function Header() {
  return (
    <header className="d-flex justify-content-between align-items-center py-3 mb-4 border-bottom">
      <h1 className="h3" style={{ marginBottom: '0'}}>K-Hub Notes</h1>
      <nav>
        <Link to="/" className="btn btn-success mx-2">Login</Link>
        <Link to="/profile" className="btn btn-success mx-2">Profile</Link>
        <Link to="/register" className="btn btn-success mx-2">Register</Link>
      </nav>
    </header>
  );
}

export default Header;
