import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in by checking for the presence of a token in localStorage or sessionStorage
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    // Remove token from localStorage or sessionStorage
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <Link to='/' className="navbar-brand">
            <img src='/images/logo.png' className='nav-logo' alt='Logo'/>
            Chaptr
          </Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

              {isLoggedIn ? (
                <>
                  <li className="nav-item">
                    <NavLink to='/books' className="nav-link" aria-current="page">Home</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to='/add' className="nav-link">Add-Book</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to='/my-notes' className="nav-link">My Notes</NavLink>
                  </li>
                  <li className="nav-item">
                    <button onClick={handleLogout} className="nav-link">LOGOUT</button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink to='/' className="nav-link" aria-current="page">Home</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to='/books' className="nav-link">Books</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to='/register' className="nav-link">Register</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to='/login' className="nav-link">Login</NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
