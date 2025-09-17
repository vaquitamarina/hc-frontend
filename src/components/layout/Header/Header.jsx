import React from 'react';
import './Header.css';
import { FiLogOut } from 'react-icons/fi'; // icono de salida

export default function Header() {
  return (
    <header className="header">
      <div className="left">UNJBG</div>
      <div className="center">
        CLINICA ODONTOLÓGICA
        <br />
        BASADRINA
      </div>
      <div className="right">
        <FiLogOut className="logout-icon" />
      </div>
    </header>
  );
}
