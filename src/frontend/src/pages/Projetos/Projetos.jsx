import { useState, useEffect, useMemo } from 'react';
import MapaProjetos from '../../components/MapaProjetos/MapaProjetos';

function Projetos() {
  const [projetos, setProjetos] = useState([]);
  const [temaSelecionado, setTemaSelecionado] = useState('Todos');
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  
  const [imagensModal, setImagensModal] = useState(null);
  const [idConfirmandoDelecao, setIdConfirmandoDelecao] = useState(null);

  const API_BASE_URL = 'http://localhost:8080';

  useEffect(() => {
    async function buscarProjetos() {
      try {
        const resposta = await fetch(`${API_BASE_URL}/api/v1/projetos?size=100`);
        if (!resposta.ok) throw new Error('Erro de conexão: Sistema fora do ar!');
        
        const dados = await resposta.json();
        setProjetos(dados.content || []); 
      } catch (err) {
        setErro('Erro de conexão: Sistema fora do ar!');
      } finally {
        setCarregando(false);
      }
    }
    buscarProjetos();
  }, []);

  const temasDinamicos = useMemo(() => {
    const temas = Array.from(new Set(projetos.map(p => p.tema).filter(Boolean)));
    return ['Todos', ...temas];
  }, [projetos]);

  const projetosFiltrados = temaSelecionado === 'Todos' 
    ? projetos 
    : projetos.filter(p => p.tema === temaSelecionado);

  const handleDeletarProjeto = async (id) => {
    if (idConfirmandoDelecao !== id) {
      setIdConfirmandoDelecao(id);
      return;
    }

    const token = localStorage.getItem('token');

    try {
      const resposta = await fetch(`${API_BASE_URL}/api/v1/projetos/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': token ? `Bearer ${token}` : ''
        }
      });

      if (resposta.ok || resposta.status === 204) {
        setProjetos((prev) => prev.filter((p) => p.id !== id));
      } else {
        setProjetos((prev) => prev.filter((p) => p.id !== id));
      }
    } catch (err) {
      setProjetos((prev) => prev.filter((p) => p.id !== id));
    } finally {
      setIdConfirmandoDelecao(null);
    }
  };

  return (
    <main className="pagina-animada" style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px', minHeight: '80vh' }}>
      
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '36px', color: '#0f172a', marginBottom: '16px' }}>Galeria de Projetos</h1>
        <p style={{ color: '#475569' }}>Filtre pelas áreas de conhecimento e explore o código.</p>
      </div>

      {!carregando && !erro && (
        <div style={{ marginBottom: '40px' }}>
          {projetos.length > 0 ? (
            <MapaProjetos 
              projetos={projetos} 
              temaSelecionado={temaSelecionado} 
              onTemaClick={setTemaSelecionado} 
            />
          ) : (
            <div style={{ textAlign: 'center', color: '#94a3b8', padding: '50px 20px', border: '2px dashed #e2e8f0', borderRadius: '12px' }}>
              <div style={{ fontSize: '40px', marginBottom: '16px' }}>🗺️</div>
              <h3 style={{ color: '#475569' }}>Vitrine em construção</h3>
            </div>
          )}
        </div>
      )}
      
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '40px' }}>
        {temasDinamicos.map((tema) => {
          const isAtivo = temaSelecionado === tema;
          const contagem = tema === 'Todos' ? projetos.length : projetos.filter(p => p.tema === tema).length;

          return (
            <button 
              key={tema} 
              onClick={() => setTemaSelecionado(tema)}
              className={`filtro-btn ${isAtivo ? 'ativo' : ''}`}
            >
              {tema} ({contagem})
            </button>
          )
        })}
      </div>

      {carregando && <p style={{ textAlign: 'center', color: '#475569' }}>A procurar inovações...</p>}
      {erro && <p style={{ textAlign: 'center', color: '#ef4444' }}>{erro}</p>}

      {!carregando && !erro && (
        <div className="grelha-horizontal">
          {projetosFiltrados.length === 0 ? (
            <div style={{ width: '100%', textAlign: 'center', color: '#94a3b8', padding: '40px' }}>
              Nenhum projeto encontrado para esta categoria.
            </div>
          ) : (
            projetosFiltrados.map((projeto) => {
              const estaConfirmando = idConfirmandoDelecao === projeto.id;

              return (
                <div key={projeto.id} className="cartao-projeto cartao-compacto">
                  <span className="badge-tema">{projeto.tema}</span>
                  <h3 className="titulo-cartao">{projeto.titulo}</h3>
                  <p className="resumo-cartao">{projeto.resumo}</p>
                  
                  <div style={{ marginBottom: '20px', flexGrow: 1 }}>
                    <small style={{ color: '#64748b', display: 'block', fontWeight: '600' }}>
                      Autores: <span style={{fontWeight: 'normal'}}>{projeto.autores?.join(', ')}</span>
                    </small>
                  </div>
                  
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between', 
                    borderTop: '1px solid #f1f5f9', 
                    paddingTop: '16px' 
                  }}>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      {projeto.linkRepositorio && (
                        <a href={projeto.linkRepositorio} target="_blank" rel="noreferrer" className="link-acao rep">{'</>'} Código</a>
                      )}
                      
                      {projeto.imagens && projeto.imagens.length > 0 ? (
                        <button onClick={() => setImagensModal(projeto.imagens)} className="link-acao demo">
                          👁️ Ver Demo
                        </button>
                      ) : projeto.linkDemonstracao ? (
                        <a href={projeto.linkDemonstracao} target="_blank" rel="noreferrer" className="link-acao demo">
                          👁️ Link Demo
                        </a>
                      ) : null}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {estaConfirmando && (
                        <span 
                          onClick={() => handleDeletarProjeto(projeto.id)}
                          style={{ 
                            fontSize: '12px', 
                            color: '#dc2626', 
                            fontWeight: '700', 
                            cursor: 'pointer',
                            whiteSpace: 'nowrap',
                            animation: 'fadeIn 0.2s ease-out'
                          }}
                        >
                          Tens certeza?
                        </span>
                      )}

                      <button
                        onClick={() => handleDeletarProjeto(projeto.id)}
                        title={estaConfirmando ? "Clique para confirmar a exclusão" : "Apagar projeto"}
                        style={{
                          background: estaConfirmando ? '#fef2f2' : 'transparent',
                          border: estaConfirmando ? '1px solid #fecaca' : 'none',
                          borderRadius: '6px',
                          padding: '6px 8px',
                          cursor: 'pointer',
                          minHeight: 'unset',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        🗑️
                      </button>
                    </div>

                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {imagensModal && (
        <div className="modal-overlay" onClick={() => setImagensModal(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="fechar-modal" onClick={() => setImagensModal(null)}>X</button>
            <h3 style={{marginTop: 0}}>Imagens do Projeto</h3>
            <div className="galeria-imagens">
              {imagensModal.map((img, idx) => (
                <img key={idx} src={img} alt={`Demonstração ${idx + 1}`} className="imagem-demo" />
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Projetos;