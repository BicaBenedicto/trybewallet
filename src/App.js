import React from 'react';
import { Route, Switch } from 'react-router';
import Login from './pages/Login';
import Wallet from './pages/Wallet';
import Header from './pages/Header';

function App() {
  return (
    <>
      <Route component={ Header } />
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/carteira" component={ Wallet } />
    </Switch>
    </>
  );
}

export default App;
