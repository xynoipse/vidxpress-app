import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import auth from './services/authService';
import ProtectedRoute from './components/common/ProtectedRoute';
import Navbar from './components/Navbar';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Movies from './components/Movies';
import MovieForm from './components/MovieForm';
import Customers from './components/Customers';
import Rentals from './components/Rentals';
import NotFound from './components/NotFound';
import './App.css';

const App = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    const user = auth.getAuthUser();
    setUser(user);
  }, []);

  return (
    <BrowserRouter>
      <Navbar user={user} />
      <main className="container">
        <Switch>
          <Route path="/login" component={LoginForm} />
          <Route path="/register" component={RegisterForm} />
          <ProtectedRoute path="/movies/:id" component={MovieForm} />
          <Route path="/movies" render={props => <Movies {...props} user={user} />} />
          <Route path="/customers" component={Customers} />
          <Route path="/rentals" component={Rentals} />
          <Route path="/not-found" component={NotFound} />
          <Redirect from="/" to="movies" exact />
          <Redirect to="/not-found" />
        </Switch>
      </main>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
