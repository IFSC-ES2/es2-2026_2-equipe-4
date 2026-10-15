import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

function Header() {
  const navigate = useNavigate();
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
          
          {/* Não aparecer Cadastrar quando logado */}
          {!estaLogado && (
            <>
              <Link to="/login" className="header-link">Login</Link>
              <Link to="/cadastro" className="header-link">Cadastro</Link>
            </>
          )}

          {/* Não aparecer Nova Submissão quando deslogado */}
          {estaLogado && (
            <>
              <Link to="/submissao" className="header-botao">Nova Submissão</Link>
              <button onClick={terminarSessao} className="header-link" style={{background:'transparent', border:'none', cursor:'pointer'}}>Sair</button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;