import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import logo from '../../statics/logo.png';
import SearchForm from '../SearchForm';
import './Header.css';

export default class Header extends Component {
  render() {
    return (
      <header className="Header_root">
        <div className="Header_logo">
          <Link to="/">
            <img src={logo} alt="ロゴ" />
          </Link>
        </div>
        <SearchForm />
        <Link className="Header_menu" to="/return">返却</Link>
      </header>
    );
  }
}