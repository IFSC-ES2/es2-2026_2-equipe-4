import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="header-principal">
      <div className="header-container">
        <h2 className="header-logo">Sistema de Projetos</h2>
        <nav className="header-nav">
          <Link to="/login" className="header-link">Login</Link>
          <Link to="/cadastro" className="header-link">Cadastro</Link>
          <Link to="/submissao" className="header-botao">Nova Submissão</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
