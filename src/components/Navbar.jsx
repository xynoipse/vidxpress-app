import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import auth from '../services/authService';

const Navbar = ({ user }) => {
  const logout = () => {
    auth.logout();
    window.location = '/';
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link to="/" className="navbar-brand mb-0 h1">Vidxpress</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#avbarNav" aria-controls="avbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <div className="navbar-nav mr-auto">
          <NavLink to="/movies" className="nav-link">
            Movies
          </NavLink>
          <NavLink to="/customers" className="nav-link">
            Customers
          </NavLink>
          <NavLink to="/rentals" className="nav-link">
            Rentals
          </NavLink>
        </div>
        <div className="navbar-nav">
          {!user && (
            <React.Fragment>
              <NavLink to="/login" className="nav-link">
                Login
              </NavLink>
              <NavLink to="/register" className="nav-link">
                Register
              </NavLink>
            </React.Fragment>
          )}
          {user && (
            <React.Fragment>
              <NavLink to="/profile" className="nav-link">
                {user.name}
              </NavLink>
              <button onClick={logout} className="btn nav-link">
                Logout
              </button>
            </React.Fragment>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
