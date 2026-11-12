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

  const isActive = (path) => location.pathname === path ? 'ativo' : '';

  return (
    <header className="header-principal">
      <div className="header-container">
        <Link to="/" className="header-logo">
          Publica<span>IFSC</span>
        </Link>
        <nav className="header-nav">
          <Link to="/" className={`header-link ${isActive('/')}`}>Sobre</Link>
          <Link to="/projetos" className={`header-link ${isActive('/projetos')}`}>Showcase</Link>
          <Link to="/submissao" className={`header-link ${isActive('/submissao')}`}>Submissão</Link>
          
          {!estaLogado ? (
            <div style={{display: 'flex', gap: '12px', marginLeft: '8px'}}>
              <Link to="/login" className="header-botao-secundario">Entrar</Link>
              <Link to="/cadastro" className="header-botao">Criar Conta</Link>
            </div>
          ) : (
            <button 
              onClick={terminarSessao} 
              className="header-botao btn-sair" 
              style={{ cursor: 'pointer', marginLeft: '8px' }}
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