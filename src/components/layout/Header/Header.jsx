import React from 'react';
import './Header.css';
import { LogOut } from 'lucide-react';

export default function Header() {
  return (
    <header className="header">
      <div className="header__left">
        <img src="./logo1.png" alt="Logo" className="header__logo" />
        <div className="header__name">UNJBG</div>
        <div className="header__title">
          CLÍNICA ODONTOLÓGICA
          <br />
          BASADRINA
        </div>
      </div>
      <div className="header__actions">
        <LogOut className="header__icon" />
      </div>
    </header>
  );
}
