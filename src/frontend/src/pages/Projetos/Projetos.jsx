import { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MapaProjetos from '../../components/MapaProjetos/MapaProjetos';
import { API_BASE_URL, urlImagem } from '../../config/api';

function Projetos() {
  const navigate = useNavigate();
  const [projetos, setProjetos] = useState([]);
  const [temaSelecionado, setTemaSelecionado] = useState('Todos');
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  const [idConfirmandoDelecao, setIdConfirmandoDelecao] = useState(null);

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
        alert('Projeto apagado com sucesso.');
      } else {
        alert('Acesso negado: Você só pode apagar os projetos que você mesmo criou.');
      }
    } catch (err) {
      alert('Erro de conexão ao tentar apagar o projeto.');
    } finally {
      setIdConfirmandoDelecao(null);
    }
  };

  return (
    <main className="pagina-animada" style={{ width: '100%', margin: '0 auto', minHeight: '80vh' }}>
      
      <div style={{ background: '#f8fafc', padding: '60px 24px 40px', borderBottom: '1px solid #e2e8f0', textAlign: 'center' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '40px', color: '#0f172a', marginBottom: '16px', fontWeight: '800', letterSpacing: '-1px' }}>
            Showcase de Projetos
          </h1>
          <p style={{ color: '#475569', fontSize: '18px', maxWidth: '600px', margin: '0 auto' }}>
            Descubra inovações, explore o código aberto e veja demonstrações reais do que nossa comunidade está construindo.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1140px', margin: '0 auto', padding: '40px 24px 80px' }}>
        
        {!carregando && !erro && (
          <div style={{ marginBottom: '48px' }}>
            {projetos.length > 0 ? (
              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
                <MapaProjetos 
                  projetos={projetos} 
                  temaSelecionado={temaSelecionado} 
                  onTemaClick={setTemaSelecionado} 
                />
              </div>
            ) : null}
          </div>
        )}
        
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '48px' }}>
          {temasDinamicos.map((tema) => {
            const isAtivo = temaSelecionado === tema;
            const contagem = tema === 'Todos' ? projetos.length : projetos.filter(p => p.tema === tema).length;

            return (
              <button 
                key={tema} 
                onClick={() => setTemaSelecionado(tema)}
                className={`filtro-btn ${isAtivo ? 'ativo' : ''}`}
                style={{
                  background: isAtivo ? '#0f172a' : '#ffffff',
                  color: isAtivo ? '#ffffff' : '#475569',
                  border: isAtivo ? '1px solid #0f172a' : '1px solid #cbd5e1',
                  borderRadius: '20px',
                  padding: '6px 16px',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {tema} <span style={{ opacity: isAtivo ? 0.7 : 0.5, marginLeft: '4px' }}>{contagem}</span>
              </button>
            )
          })}
        </div>

        {carregando && <p style={{ textAlign: 'center', color: '#475569' }}>Procurando projetos...</p>}
        {erro && <p style={{ textAlign: 'center', color: '#ef4444' }}>{erro}</p>}

        {!carregando && !erro && (
          <div className="galeria-behance" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '32px' }}>
            {projetosFiltrados.length === 0 ? (
              <div style={{ width: '100%', textAlign: 'center', color: '#94a3b8', padding: '60px', gridColumn: '1 / -1', background: '#f8fafc', borderRadius: '12px', border: '1px dashed #cbd5e1' }}>
                <h3 style={{ margin: '0 0 8px 0', color: '#64748b' }}>Nenhum projeto encontrado.</h3>
                <p style={{ margin: 0, fontSize: '14px' }}>Selecione outra categoria ou submeta o seu primeiro projeto.</p>
              </div>
            ) : (
              projetosFiltrados.map((projeto) => {
                const estaConfirmando = idConfirmandoDelecao === projeto.id;

                return (
                  <div 
                    key={projeto.id} 
                    className="cartao-galeria" 
                    style={{ height: '100%', cursor: 'pointer' }}
                    onClick={() => navigate(`/projetos/${projeto.id}`)}
                  >

                    <div className="imagem-galeria">
                      {projeto.imagens && projeto.imagens.length > 0 ? (
                        <img src={urlImagem(projeto.imagens[0])} alt={projeto.titulo} />
                      ) : (
                        <div className="placeholder-img">
                          <span style={{ fontSize: '12px', letterSpacing: '1px' }}>{projeto.tema || 'Projeto'}</span>
                        </div>
                      )}
                    </div>

                    <div style={{ padding: '16px 4px 4px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                      <h4 style={{ margin: '0 0 8px 0', color: '#0f172a', fontSize: '18px', fontWeight: '700' }}>{projeto.titulo}</h4>
                      
                      <div style={{ marginTop: 'auto' }}>
                        <small style={{ color: '#64748b', display: 'block', fontWeight: '500', marginBottom: '16px' }}>
                          Por <span style={{ color: '#0f172a', fontWeight: '600' }}>{projeto.autores?.join(', ')}</span>
                        </small>
                        
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <Link
                              to={`/projetos/${projeto.id}`}
                              onClick={(e) => e.stopPropagation()}
                              style={{ background: '#0f172a', color: '#ffffff', padding: '6px 12px', borderRadius: '6px', fontSize: '13px', fontWeight: '600', textDecoration: 'none' }}
                            >
                              Detalhes
                            </Link>

                            {projeto.linkRepositorio && (
                              <a 
                                href={projeto.linkRepositorio} 
                                target="_blank" 
                                rel="noreferrer" 
                                onClick={(e) => e.stopPropagation()}
                                style={{ background: '#f1f5f9', color: '#0f172a', padding: '6px 12px', borderRadius: '6px', fontSize: '13px', fontWeight: '600', textDecoration: 'none' }}
                              >
                                Código
                              </a>
                            )}
                            
                            {projeto.linkDemonstracao && (
                              <a
                                href={projeto.linkDemonstracao} 
                                target="_blank" 
                                rel="noreferrer" 
                                onClick={(e) => e.stopPropagation()}
                                style={{ background: '#eef6f3', color: '#146c5a', padding: '6px 12px', borderRadius: '6px', fontSize: '13px', fontWeight: '600', textDecoration: 'none' }}
                              >
                                Acessar
                              </a>
                            )}
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeletarProjeto(projeto.id);
                              }}
                              style={{
                                background: estaConfirmando ? '#fef2f2' : 'transparent',
                                color: estaConfirmando ? '#dc2626' : '#94a3b8',
                                border: 'none',
                                padding: '6px',
                                fontSize: '13px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                borderRadius: '4px',
                                transition: 'all 0.2s'
                              }}
                            >
                              {estaConfirmando ? 'Confirmar Exclusão' : 'Apagar'}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </main>
  );
}

export default Projetos;