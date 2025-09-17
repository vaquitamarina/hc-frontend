import React from 'react';
import './Header.css';
import { LogOut } from 'lucide-react';

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
        <LogOut />
      </div>
    </header>
  );
}
