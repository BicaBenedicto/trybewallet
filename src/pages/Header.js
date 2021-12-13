import React, { Component } from 'react';
import './header.css'
import './CoinAnimation.scss';

class Header extends Component {
  render() {
    return (
      <header className='header'>
        <div className="coin">
          <div className="coin__front"></div>
          <div className="coin__middle"></div>
          <div className="coin__back"></div>
          <div className="coin__shadow"></div>
        </div>
        <h1 className="logo-text">Trybewallet</h1>
      
      </header>
    );
  }
}

export default Header;