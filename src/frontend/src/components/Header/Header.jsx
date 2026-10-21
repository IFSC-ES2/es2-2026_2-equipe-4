import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Header.css';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token');
  const estaLogado = !!token;

  const terminarSessao = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="header-principal">
      <div className="header-container">
        <h2 className="header-logo">Sistema de Projetos</h2>
        <nav className="header-nav">
          <Link to="/" className="header-link">Sobre</Link>
          <Link to="/projetos" className="header-link">Projetos</Link>
          <Link to="/submissao" className="header-link">Submissão</Link>
          
          {!estaLogado ? (
            <>
              <Link to="/login" className="header-link">Login</Link>
              <Link to="/cadastro" className="header-botao">Cadastro</Link>
            </>
          ) : (
            <button 
              onClick={terminarSessao} 
              className="header-botao" 
              style={{ cursor: 'pointer', background: '#ef4444' }}
            >
              Sair
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;