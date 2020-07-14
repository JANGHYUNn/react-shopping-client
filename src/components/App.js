// lib
import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

// js
import NavBar from './views/NavBar/NavBar';
import LandingPage from './views/LandingPage/LandingPage';
import Footer from './views/Footer/Footer';
import RegisterPage from './views/RegisterPage/RegisterPage';
import LoginPage from './views/LoginPage/LoginPage';

// hoc
import auth from '../hoc/auth';

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={auth(LandingPage, null)} />
          <Route exact path="/login" component={auth(LoginPage, false)} />
          <Route exact path="/register" component={auth(RegisterPage, false)} />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
