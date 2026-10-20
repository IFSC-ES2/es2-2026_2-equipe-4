import React from 'react';
import { Link } from 'react-router-dom';

function Sobre() {
  return (
    <main className="pagina-animada" style={{ maxWidth: '1000px', margin: '0 auto', padding: '60px 24px' }}>
      
      <div style={{ textAlign: 'center', marginBottom: '64px' }}>
        <h1 style={{ fontSize: '48px', color: '#0f172a', marginBottom: '20px', fontWeight: '800', letterSpacing: '-1px' }}>
          Explore o universo acadêmico do <span style={{ color: '#146c5a' }}>PublicaIFSC</span>
        </h1>
        <p style={{ fontSize: '18px', color: '#475569', maxWidth: '750px', margin: '0 auto', lineHeight: '1.6' }}>
          O PublicaIFSC é uma plataforma web para democratizar o acesso e publicação de trabalhos do Instituto Federal de Santa Catarina (IFSC). Esta vitrine interativa possibilita partilhar inovações e artigos científicos, promovendo a colaboração entre pesquisadores, professores e estudantes.
        </p>
        
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '40px' }}>
          <Link to="/projetos" style={{ background: '#0f172a', color: '#fff', padding: '14px 28px', borderRadius: '8px', textDecoration: 'none', fontWeight: '700', transition: 'all 0.2s', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            Ver Galeria
          </Link>
          <Link to="/submissao" style={{ background: '#f1f5f9', color: '#0f172a', padding: '14px 28px', borderRadius: '8px', textDecoration: 'none', fontWeight: '700', transition: 'all 0.2s' }}>
            Partilhar Projeto
          </Link>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px', marginBottom: '64px' }}>
        <div className="cartao-projeto" style={{ textAlign: 'center', padding: '32px' }}>
          <div style={{ fontSize: '40px', marginBottom: '16px' }}>🚀</div>
          <h3 style={{ color: '#0f172a', marginBottom: '12px' }}>Acesso Democrático</h3>
          <p style={{ color: '#475569', fontSize: '15px' }}>Tiramos a produção acadêmica de arquivos locais e repositórios pouco intuitivos, oferecendo visibilidade imediata às pesquisas.</p>
        </div>
        
        <div className="cartao-projeto" style={{ textAlign: 'center', padding: '32px' }}>
          <div style={{ fontSize: '40px', marginBottom: '16px' }}>📂</div>
          <h3 style={{ color: '#0f172a', marginBottom: '12px' }}>Submissão Simples</h3>
          <p style={{ color: '#475569', fontSize: '15px' }}>Pesquisadores e alunos registam os trabalhos detalhando metadados essenciais, facilitando a busca por tema, tecnologia ou autor.</p>
        </div>

        <div className="cartao-projeto" style={{ textAlign: 'center', padding: '32px' }}>
          <div style={{ fontSize: '40px', marginBottom: '16px' }}>🔗</div>
          <h3 style={{ color: '#0f172a', marginBottom: '12px' }}>Conexão Direta</h3>
          <p style={{ color: '#475569', fontSize: '15px' }}>Um canal unificado para toda a comunidade do IFSC. Explore repositórios, descubra demonstrações reais e estimule o contato com outras equipes.</p>
        </div>
      </div>

    </main>
  );
}

export default Sobre;