import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MapaProjetos from '../../components/MapaProjetos/MapaProjetos';

function Sobre() {
  const [projetosAmostra, setProjetosAmostra] = useState([]);
  const API_BASE_URL = 'http://localhost:8080';

  useEffect(() => {
    async function carregarAmostra() {
      try {
        const resposta = await fetch(`${API_BASE_URL}/api/v1/projetos?size=50`);
        if (resposta.ok) {
          const dados = await resposta.json();
          setProjetosAmostra(dados.content || []);
        }
      } catch (e) {
        console.log("Sistema fora do ar!");
      }
    }
    carregarAmostra();
  }, []);

  return (
    <main className="pagina-animada" style={{ maxWidth: '1000px', margin: '0 auto', padding: '60px 24px' }}>
      
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <div className="badge-tema" style={{ marginBottom: '24px', background: '#e0f2fe', color: '#0369a1' }}>
          Versão MVP - Sprint 3
        </div>
        <h1 style={{ fontSize: '48px', color: '#0f172a', marginBottom: '20px', fontWeight: '800', letterSpacing: '-1px' }}>
          Explore o universo acadêmico do <span style={{ color: '#146c5a' }}>PublicaIFSC</span>
        </h1>
        <p style={{ fontSize: '18px', color: '#475569', maxWidth: '750px', margin: '0 auto', lineHeight: '1.6' }}>
          O PublicaIFSC é uma plataforma web para democratizar o acesso e publicação de trabalhos do Instituto Federal de Santa Catarina (IFSC). Esta vitrine interativa possibilita partilhar inovações e artigos científicos, promovendo a colaboração entre pesquisadores, professores e estudantes.
        </p>
      </div>

      <div style={{ marginBottom: '48px', animation: 'fadeIn 1s ease-out' }}>
        {projetosAmostra.length > 0 ? (
          <MapaProjetos projetos={projetosAmostra} temaSelecionado="Todos" />
        ) : (
          <div style={{ 
            textAlign: 'center', 
            color: '#94a3b8', 
            padding: '40px', 
            border: '2px dashed #e2e8f0', 
            borderRadius: '12px',
            background: 'rgba(255,255,255,0.5)'
          }}>
            <div style={{ fontSize: '40px', marginBottom: '16px' }}>🗺️</div>
            <h3 style={{ color: '#475569', margin: '0 0 8px 0' }}>Vitrine em construção</h3>
            <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.5' }}>
            </p>
          </div>
        )}
      </div>
        
      <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '80px' }}>
        <Link to="/projetos" style={{ background: '#0f172a', color: '#fff', padding: '14px 28px', borderRadius: '8px', textDecoration: 'none', fontWeight: '700', transition: 'all 0.2s', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          Ver Galeria Completa
        </Link>
        <Link to="/submissao" style={{ background: '#f1f5f9', color: '#0f172a', padding: '14px 28px', borderRadius: '8px', textDecoration: 'none', fontWeight: '700', transition: 'all 0.2s', border: '1px solid #e2e8f0' }}>
          Submitar o seu Projeto
        </Link>
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