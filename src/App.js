import React from 'react';
import { Route, Switch } from 'react-router';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

function App() {
  return (
    <Switch>
      <Route to="/carteira" component={ Wallet } />
      <Route exact to="/" component={ Login } />
    </Switch>
  );
}

export default App;
