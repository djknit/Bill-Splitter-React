import React, { Component } from 'react';
import style from './style';
import NavLink from './nav-link';

function navbar() {
  
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation" style={style.nav}>
      <div className="navbar-brand">
        <div className="navbar-item" style={style.brand}>
          <span className="brand">
            <span className="dollar-sign" style={style.dollarSign}>$</span>
            &nbsp;Dave's Delux Bill Splitter&nbsp;
            <span className="dollar-sign" style={style.dollarSign}>$</span>
          </span>
        </div>
        <div className="navbar-item">&mdash;</div>
        <NavLink path="/" text="Home" />
        <div className="navbar-item">|</div>
        <NavLink path="/enter-bills" text="Enter Bills" />
      </div>
    </nav>
  );  
}

export default navbar;