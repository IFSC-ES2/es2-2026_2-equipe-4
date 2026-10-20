import React, { useState, useEffect } from 'react';
import MapaProjetos from '../../components/MapaProjetos/MapaProjetos';

function Projetos() {
  const [projetos, setProjetos] = useState([]);
  const [temaSelecionado, setTemaSelecionado] = useState('Todos');
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  const API_BASE_URL = 'http://localhost:8080';
  const temas = ['Todos', 'Web', 'Mobile', 'IA e Dados', 'Jogos', 'IoT', 'Segurança', 'Ferramentas'];

  useEffect(() => {
    async function buscarProjetos() {
      try {
        const resposta = await fetch(`${API_BASE_URL}/api/v1/projetos?size=100`);
        if (!resposta.ok) throw new Error('Não foi possível carregar os projetos.');
        
        const dados = await resposta.json();
        setProjetos(dados.content || []); 
      } catch (err) {
        setErro('Ainda não existem projetos cadastrados ou a API está indisponível.');
      } finally {
        setCarregando(false);
      }
    }
    buscarProjetos();
  }, []);

  const projetosFiltrados = temaSelecionado === 'Todos' 
    ? projetos 
    : projetos.filter(p => p.tema === temaSelecionado);

  return (
    <main className="pagina-animada" style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 24px', minHeight: '80vh' }}>
      
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <h1 style={{ fontSize: '36px', color: '#0f172a', marginBottom: '16px' }}>Galeria de Projetos</h1>
        <p style={{ color: '#475569' }}>Filtre pelas áreas de interesse e explore o código.</p>
      </div>

      {!carregando && !erro && (
        <div style={{ marginBottom: '48px' }}>
          {projetos.length > 0 ? (
            <MapaProjetos 
              projetos={projetos} 
              temaSelecionado={temaSelecionado} 
              onTemaClick={setTemaSelecionado} 
            />
          ) : (
            <div style={{ 
              textAlign: 'center', 
              color: '#94a3b8', 
              padding: '50px 20px', 
              border: '2px dashed #e2e8f0', 
              borderRadius: '12px',
              background: '#ffffff',
              boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
            }}>
              <div style={{ fontSize: '40px', marginBottom: '16px' }}>🗺️</div>
              <h3 style={{ color: '#475569', margin: '0 0 8px 0', fontSize: '20px' }}>Vitrine em construção</h3>
              <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.5', color: '#64748b' }}>
              </p>
            </div>
          )}
        </div>
      )}
      
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '48px' }}>
        {temas.map((tema) => {
          const isAtivo = temaSelecionado === tema;
          const contagem = tema === 'Todos' ? projetos.length : projetos.filter(p => p.tema === tema).length;

          return (
            <button 
              key={tema} 
              onClick={() => setTemaSelecionado(tema)}
              className={`filtro-btn ${isAtivo ? 'ativo' : ''}`}
            >
              {tema === 'Todos' ? `Todos (${contagem})` : tema}
            </button>
          )
        })}
      </div>

      {carregando && <p style={{ textAlign: 'center', color: '#475569' }}>A procurar projetos...</p>}
      {erro && <p style={{ textAlign: 'center', color: '#ef4444' }}>{erro}</p>}

      {!carregando && !erro && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
          {projetosFiltrados.length === 0 ? (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#94a3b8', padding: '40px' }}>
              Nenhum projeto encontrado para esta categoria.
            </div>
          ) : (
            projetosFiltrados.map((projeto) => (
              <div key={projeto.id} className="cartao-projeto">
                <span className="badge-tema">{projeto.tema}</span>
                <h3 style={{ marginTop: '8px', marginBottom: '12px', color: '#0f172a', fontSize: '20px' }}>{projeto.titulo}</h3>
                <p style={{ color: '#475569', fontSize: '14px', marginBottom: '20px', lineHeight: '1.5' }}>{projeto.resumo}</p>
                
                <div style={{ marginBottom: '20px' }}>
                  <small style={{ color: '#64748b', display: 'block', fontWeight: '600' }}>Autores: <span style={{fontWeight: 'normal'}}>{projeto.autores?.join(', ')}</span></small>
                  {projeto.tecnologias && (
                    <small style={{ color: '#64748b', display: 'block', fontWeight: '600', marginTop: '4px' }}>Tech: <span style={{fontWeight: 'normal'}}>{projeto.tecnologias?.join(', ')}</span></small>
                  )}
                </div>
                
                <div style={{ display: 'flex', gap: '16px', borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
                  {projeto.linkRepositorio && (
                    <a href={projeto.linkRepositorio} target="_blank" rel="noreferrer" style={{ fontSize: '14px', color: '#146c5a', textDecoration: 'none', fontWeight: '700' }}>{'{ }'} Repositório</a>
                  )}
                  {projeto.linkDemonstracao && (
                    <a href={projeto.linkDemonstracao} target="_blank" rel="noreferrer" style={{ fontSize: '14px', color: '#0f172a', textDecoration: 'none', fontWeight: '700' }}>👁️ Demo</a>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </main>
  );
}

export default Projetos;