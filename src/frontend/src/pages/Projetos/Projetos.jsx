import { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MapaProjetos from '../../components/MapaProjetos/MapaProjetos';
import { API_BASE_URL, urlImagem } from '../../config/api';
import { useSessao } from '../../sessao/contextoSessao';

const tamanhoPagina = 100;

function Projetos() {
  const navigate = useNavigate();
  const { token, invalidarSessao } = useSessao();
  const [identidade, setIdentidade] = useState(null);
  const [projetoEmExclusao, setProjetoEmExclusao] = useState(null);
  const [erroExclusao, setErroExclusao] = useState(null);
  const [temaSelecionado, setTemaSelecionado] = useState('Todos');
  const [consulta, setConsulta] = useState({ pagina: 0 });
  const [resultado, setResultado] = useState({
    consulta: null,
    projetos: [],
    proximaPagina: 0,
    erro: false,
  });

  const { projetos, proximaPagina } = resultado;
  const carregando = resultado.consulta !== consulta;
  const erro = !carregando && resultado.erro;
  const carregouPrimeiraPagina = proximaPagina !== 0;
  const usuarioId = token && identidade?.token === token ? identidade.usuarioId : null;

  useEffect(() => {
    if (!token) return;

    const controlador = new AbortController();
    const { signal } = controlador;

    async function buscarIdentidade() {
      try {
        const resposta = await fetch(`${API_BASE_URL}/api/v1/auth/token`, {
          headers: { Authorization: `Bearer ${token}` },
          signal,
        });
        if (signal.aborted) return;
        if (resposta.status === 401) invalidarSessao(token);
        if (!resposta.ok) return;

        const { userId } = await resposta.json();
        if (!signal.aborted && typeof userId === 'string' && userId) {
          setIdentidade({ token, usuarioId: userId });
        }
      } catch {
        // A galeria pública continua disponível se a identidade não puder ser confirmada.
      }
    }

    buscarIdentidade();
    return () => controlador.abort();
  }, [token, invalidarSessao]);

  useEffect(() => {
    const controlador = new AbortController();
    const { signal } = controlador;
    const { pagina } = consulta;

    async function buscarProjetos() {
      try {
        const resposta = await fetch(
          `${API_BASE_URL}/api/v1/projetos?page=${pagina}&size=${tamanhoPagina}`,
          { signal },
        );
        if (!resposta.ok) throw new Error(`Falha ao buscar projetos (${resposta.status})`);

        const dados = await resposta.json();
        if (signal.aborted) return;
        if (!Array.isArray(dados?.content) || dados.number !== pagina || typeof dados.last !== 'boolean') {
          throw new Error('A API retornou uma página de projetos inválida');
        }

        setResultado((anterior) => {
          const porId = new Map(anterior.projetos.map((projeto) => [projeto.id, projeto]));
          for (const projeto of dados.content) porId.set(projeto.id, projeto);

          return {
            consulta,
            projetos: Array.from(porId.values()),
            proximaPagina: dados.last ? null : dados.number + 1,
            erro: false,
          };
        });
      } catch {
        if (!signal.aborted) setResultado((anterior) => ({ ...anterior, consulta, erro: true }));
      }
    }

    buscarProjetos();
    return () => controlador.abort();
  }, [consulta]);

  async function apagarProjeto(evento, projeto) {
    evento.stopPropagation();
    if (!usuarioId || projeto.autorId !== usuarioId || projetoEmExclusao || carregando) return;
    if (!window.confirm(`Apagar o projeto "${projeto.titulo}"?`)) return;

    setProjetoEmExclusao(projeto.id);
    setErroExclusao(null);
    try {
      const resposta = await fetch(`${API_BASE_URL}/api/v1/projetos/${encodeURIComponent(projeto.id)}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (resposta.status === 401) {
        invalidarSessao(token);
        throw new Error('Sua sessão terminou. Entre novamente para apagar o projeto.');
      }
      if (resposta.status === 403) throw new Error('Apenas o autor pode apagar este projeto.');
      if (resposta.status !== 204) throw new Error('Não foi possível apagar o projeto. Tente novamente.');

      const restantes = projetos.filter(({ id }) => id !== projeto.id);
      setResultado((anterior) => ({ ...anterior, projetos: restantes }));
      setTemaSelecionado((tema) => restantes.some((item) => item.tema === tema) ? tema : 'Todos');

      // Uma exclusão desloca as páginas seguintes. Recarregue a última página para preencher a lacuna.
      if (proximaPagina !== null) setConsulta({ pagina: proximaPagina - 1 });
    } catch (erro) {
      const mensagem = erro instanceof TypeError
        ? 'Não foi possível apagar o projeto. Verifique sua conexão e tente novamente.'
        : erro.message;
      setErroExclusao({ id: projeto.id, mensagem });
    } finally {
      setProjetoEmExclusao(null);
    }
  }

  const temasDinamicos = useMemo(() => {
    const temas = Array.from(new Set(projetos.map(p => p.tema).filter(Boolean)));
    return ['Todos', ...temas];
  }, [projetos]);

  const projetosFiltrados = temaSelecionado === 'Todos' 
    ? projetos 
    : projetos.filter(p => p.tema === temaSelecionado);

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
        
        {carregouPrimeiraPagina && (
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
        
        {carregouPrimeiraPagina && proximaPagina !== null && (
          <p style={{ textAlign: 'center', color: '#475569' }}>
            Os filtros e as contagens consideram os projetos carregados. Carregue mais para encontrar outros temas.
          </p>
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

        {!carregouPrimeiraPagina && carregando && (
          <p role="status" style={{ textAlign: 'center', color: '#475569' }}>Procurando projetos...</p>
        )}

        {carregouPrimeiraPagina && (
          <div className="galeria-behance" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '32px' }}>
            {projetosFiltrados.length === 0 ? (
              <div style={{ width: '100%', textAlign: 'center', color: '#94a3b8', padding: '60px', gridColumn: '1 / -1', background: '#f8fafc', borderRadius: '12px', border: '1px dashed #cbd5e1' }}>
                <h3 style={{ margin: '0 0 8px 0', color: '#64748b' }}>Nenhum projeto encontrado.</h3>
                <p style={{ margin: 0, fontSize: '14px' }}>Selecione outra categoria ou submeta o seu primeiro projeto.</p>
              </div>
            ) : (
              projetosFiltrados.map((projeto) => {
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
                        
                        <div style={{ display: 'flex', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
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
                            {usuarioId && projeto.autorId === usuarioId && (
                              <button
                                type="button"
                                disabled={projetoEmExclusao !== null || carregando}
                                onClick={(evento) => apagarProjeto(evento, projeto)}
                                aria-label={`Apagar ${projeto.titulo}`}
                                style={{ background: '#fef2f2', color: '#991b1b', border: '1px solid #fecaca', padding: '6px 12px', borderRadius: '6px', fontSize: '13px', fontWeight: '600' }}
                              >
                                {projetoEmExclusao === projeto.id ? 'Apagando...' : 'Apagar'}
                              </button>
                            )}
                          </div>
                        </div>
                        {erroExclusao?.id === projeto.id && (
                          <p role="alert" style={{ color: '#b91c1c', fontSize: '13px' }}>
                            {erroExclusao.mensagem}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        <div style={{ marginTop: '32px', textAlign: 'center' }}>
          {erro && (
            <p role="alert" style={{ color: '#b91c1c' }}>
              {carregouPrimeiraPagina
                ? 'Não foi possível carregar mais projetos. Tente novamente.'
                : 'Erro de conexão: Sistema fora do ar!'}
            </p>
          )}
          {proximaPagina !== null && (carregouPrimeiraPagina || erro) && (
            <button
              type="button"
              disabled={carregando || projetoEmExclusao !== null}
              onClick={() => setConsulta({ pagina: erro ? consulta.pagina : proximaPagina })}
            >
              {carregando ? 'Carregando mais projetos...' : erro ? 'Tentar novamente' : 'Carregar mais projetos'}
            </button>
          )}
          {proximaPagina === null && projetos.length > 0 && (
            <p role="status" style={{ color: '#475569' }}>Todos os projetos foram carregados.</p>
          )}
        </div>
      </div>
    </main>
  );
}

export default Projetos;
