import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { API_BASE_URL, urlImagem } from '../../config/api';
import './ProjetoDetalhe.css';

// Gera as iniciais exibidas na capa e nos autores (ex.: "Horta Inteligente" → "HI").
function iniciais(texto = '') {
  return texto
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((parte) => parte[0].toUpperCase())
    .join('');
}

// Mostra uma foto grande e, quando houver mais de uma, setas e miniaturas para navegar.
// Sem fotos (ou se nenhuma carregar), mostra uma capa com as iniciais do título.
function GaleriaFotos({ idsImagens, titulo }) {
  const [falharam, setFalharam] = useState([]);
  const [indiceAtual, setIndiceAtual] = useState(0);

  const fotos = idsImagens.filter((idImagem) => !falharam.includes(idImagem));

  if (fotos.length === 0) {
    return (
      <div className="detalhe-capa" aria-hidden="true">
        <span className="detalhe-capa-iniciais">{iniciais(titulo)}</span>
      </div>
    );
  }

  const indice = Math.min(indiceAtual, fotos.length - 1);
  const marcarFalha = (idImagem) => setFalharam((atuais) => [...atuais, idImagem]);
  const irPara = (novoIndice) => setIndiceAtual((novoIndice + fotos.length) % fotos.length);

  return (
    <div className="detalhe-galeria">
      <div className="detalhe-foto-principal">
        <img
          key={fotos[indice]}
          src={urlImagem(fotos[indice])}
          alt={`Foto ${indice + 1} de ${fotos.length} do projeto ${titulo}`}
          onError={() => marcarFalha(fotos[indice])}
        />

        {fotos.length > 1 && (
          <>
            <button type="button" className="detalhe-seta anterior" onClick={() => irPara(indice - 1)} aria-label="Foto anterior">‹</button>
            <button type="button" className="detalhe-seta proxima" onClick={() => irPara(indice + 1)} aria-label="Próxima foto">›</button>
            <span className="detalhe-contador">{indice + 1} / {fotos.length}</span>
          </>
        )}
      </div>

      {fotos.length > 1 && (
        <div className="detalhe-miniaturas">
          {fotos.map((idImagem, posicao) => (
            <button
              key={idImagem}
              type="button"
              className={`detalhe-miniatura ${posicao === indice ? 'ativa' : ''}`}
              onClick={() => setIndiceAtual(posicao)}
              aria-label={`Ver foto ${posicao + 1}`}
              aria-pressed={posicao === indice}
            >
              <img src={urlImagem(idImagem)} alt="" onError={() => marcarFalha(idImagem)} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// Página com os detalhes de um projeto: imagem, descrição, tecnologias e links.
export default function ProjetoDetalhe() {
  const { id } = useParams();
  const [projeto, setProjeto] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    async function buscarProjeto() {
      setCarregando(true);
      setErro('');

      try {
        const resposta = await fetch(`${API_BASE_URL}/api/v1/projetos/${id}`);

        if (resposta.status === 404) {
          setErro('Projeto não encontrado.');
          return;
        }
        if (!resposta.ok) {
          throw new Error('Falha ao buscar o projeto');
        }

        setProjeto(await resposta.json());
      } catch {
        setErro('Não foi possível carregar o projeto. Tente novamente mais tarde.');
      } finally {
        setCarregando(false);
      }
    }

    buscarProjeto();
  }, [id]);

  const autores = projeto?.autores ?? [];
  const tecnologias = projeto?.tecnologias ?? [];
  const temLinks = Boolean(projeto?.linkRepositorio || projeto?.linkDemonstracao);

  return (
    <main className="pagina-animada detalhe-projeto">
      <Link to="/projetos" className="detalhe-voltar">← Voltar para os projetos</Link>

      {carregando && <p className="detalhe-mensagem">Carregando projeto...</p>}
      {!carregando && erro && <p className="detalhe-mensagem detalhe-erro">{erro}</p>}

      {!carregando && !erro && projeto && (
        <>
          {/* Título da página, acima do quadro do desenho */}
          <header className="detalhe-cabecalho">
            {projeto.tema && <span className="detalhe-tema">{projeto.tema}</span>}
            <h1>{projeto.titulo}</h1>
            <div className="detalhe-autoria">
              <span className="detalhe-rotulo">{autores.length === 1 ? 'Autor' : 'Autores'}</span>
              {autores.length > 0 ? (
                <ul className="detalhe-autores">
                  {autores.map((autor) => (
                    <li key={autor}>
                      <span className="detalhe-avatar" aria-hidden="true">{iniciais(autor)}</span>
                      {autor}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="detalhe-vazio">Autores não informados.</p>
              )}
            </div>
          </header>

          {/* Quadro na ordem do desenho: imagem → descrição → tecnologias → links */}
          <article className="detalhe-cartao">
            {/* Imagem */}
            <GaleriaFotos idsImagens={projeto.imagens ?? []} titulo={projeto.titulo} />

            {/* Descrição */}
            <section className="detalhe-descricao" aria-labelledby="titulo-descricao">
              <h2 id="titulo-descricao">Descrição</h2>
              <p>{projeto.resumo || 'Este projeto ainda não possui descrição.'}</p>
            </section>

            {/* Tecnologias */}
            <section aria-labelledby="titulo-tecnologias">
              <h2 id="titulo-tecnologias" className="detalhe-rotulo">Tecnologias</h2>
              {tecnologias.length > 0 ? (
                <ul className="detalhe-tecnologias">
                  {tecnologias.map((tecnologia) => (
                    <li key={tecnologia}>{tecnologia}</li>
                  ))}
                </ul>
              ) : (
                <p className="detalhe-vazio">Não informadas.</p>
              )}
            </section>

            {/* Links */}
            <section className="detalhe-links" aria-labelledby="titulo-links">
              <h2 id="titulo-links">Links</h2>
              {temLinks ? (
                <div className="detalhe-botoes">
                  {projeto.linkRepositorio && (
                    <a href={projeto.linkRepositorio} target="_blank" rel="noreferrer" className="detalhe-botao principal">
                      {'</>'} Repositório
                      <span className="detalhe-botao-seta" aria-hidden="true">↗</span>
                    </a>
                  )}
                  {projeto.linkDemonstracao && (
                    <a href={projeto.linkDemonstracao} target="_blank" rel="noreferrer" className="detalhe-botao">
                      Demonstração
                      <span className="detalhe-botao-seta" aria-hidden="true">↗</span>
                    </a>
                  )}
                </div>
              ) : (
                <p className="detalhe-vazio">Nenhum link informado.</p>
              )}
            </section>
          </article>
        </>
      )}
    </main>
  );
}
