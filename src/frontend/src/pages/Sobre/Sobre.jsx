import React from 'react';
import { Link } from 'react-router-dom';

function Sobre() {
  return (
    <main className="pagina-animada" style={{ maxWidth: '1000px', margin: '0 auto', padding: '60px 24px' }}>
      
      <div style={{ textAlign: 'center', marginBottom: '64px' }}>
        <h1 style={{ fontSize: '48px', color: '#0f172a', marginBottom: '20px', fontWeight: '800', letterSpacing: '-1px' }}>
          Explore o universo de <span style={{ color: '#146c5a' }}>projetos</span> do curso.
        </h1>
        <p style={{ fontSize: '20px', color: '#475569', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
          Uma vitrine interativa para partilhar o que os alunos estão a construir. Descubra inovações organizadas por tecnologia e tema.
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
        <div className="cartao-projeto" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '40px', marginBottom: '16px' }}>🚀</div>
          <h3 style={{ color: '#0f172a', marginBottom: '12px' }}>Desenvolva & Submeta</h3>
          <p style={{ color: '#475569', fontSize: '15px' }}>Grupos registam o trabalho informando o título, a descrição técnica e as tecnologias utilizadas durante a Sprint.</p>
        </div>
        
        <div className="cartao-projeto" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '40px', marginBottom: '16px' }}>📂</div>
          <h3 style={{ color: '#0f172a', marginBottom: '12px' }}>Organização por Temas</h3>
          <p style={{ color: '#475569', fontSize: '15px' }}>Os trabalhos são automaticamente classificados por área de conhecimento, facilitando a navegação.</p>
        </div>

        <div className="cartao-projeto" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '40px', marginBottom: '16px' }}>🔗</div>
          <h3 style={{ color: '#0f172a', marginBottom: '12px' }}>Acesso Direto</h3>
          <p style={{ color: '#475569', fontSize: '15px' }}>Sem distrações. O foco é o código e o resultado. Acesso imediato aos repositórios e links de demonstração.</p>
        </div>
      </div>

    </main>
  );
}

export default Sobre;