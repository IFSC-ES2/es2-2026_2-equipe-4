import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MapaProjetos from '../../components/MapaProjetos/MapaProjetos';
import { API_BASE_URL, urlImagem } from '../../config/api';

function Sobre() {
  const [projetosAmostra, setProjetosAmostra] = useState([]);
  //const API_BASE_URL = 'http://localhost:8080';

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
    <main className="pagina-animada pagina-produto-container">
      
      <section className="secao-hero-produto">
        <div className="conteudo-hero-produto">
          <span className="badge-produto-tag">Plataforma Acadêmica Digital</span>
          <h1 className="titulo-hero-produto">
            Conhecimento que merece ser <span className="destaque-verde">compartilhado</span>.
          </h1>
          <p className="descricao-hero-produto">
            O PublicaIFSC é a vitrine digital desenvolvida para reunir, organizar e dar visibilidade à produção acadêmica e científica do Instituto Federal de Santa Catarina.
          </p>
          <div className="acoes-hero-produto">
            <Link to="/projetos" className="botao-cta-primario">
              Explorar Vitrine
            </Link>
            <Link to="/submissao" className="botao-cta-secundario">
              Publicar Projeto
            </Link>
          </div>
        </div>
      </section>

      <section className="secao-mapa-banner">
        <div className="cabecalho-mapa-banner">
          <span className="subtitulo-secao">Mapeamento em Tempo Real</span>
          <h2>Explore a rede de conhecimentos do IFSC</h2>
        </div>
        <div className="wrapper-mapa-full">
          {projetosAmostra.length > 0 ? (
            <MapaProjetos projetos={projetosAmostra} temaSelecionado="Todos" />
          ) : (
            <div className="mapa-placeholder-card">
              <h3>Vitrine em construção</h3>
              <p>Conectando novos trabalhos da instituição...</p>
            </div>
          )}
        </div>
      </section>

      <section className="secao-narrativa-container">
        <div className="grid-narrativa-dupla">
          
          <div className="cartao-narrativa-principal">
            <span className="tag-categoria">Nossa Proposta</span>
            <h2>Mais do que armazenar, uma vitrine para ideias reais</h2>
            <p className="texto-destaque-lead">
              Acreditamos que o conhecimento produzido dentro das instituições de ensino não deve ficar restrito às salas de aula, aos laboratórios ou aos arquivos armazenados localmente.
            </p>
            <p>
              Cada projeto desenvolvido, cada pesquisa realizada e cada ideia colocada em prática representa uma oportunidade de aprendizado, inovação e transformação. É a partir dessa perspectiva que surge o PublicaIFSC.
            </p>
            <p>
              Nosso propósito é aproximar estudantes, professores, pesquisadores e toda a comunidade interessada no conhecimento produzido dentro da instituição, criando um ambiente acessível para descobrir, compartilhar e reconhecer produções de diferentes cursos e níveis de complexidade.
            </p>
          </div>

          <div className="cartao-narrativa-destaque">
            <span className="tag-categoria">Descentralização</span>
            <h2>Uma nova forma de compartilhar conhecimento</h2>
            <p>
              Encontrar trabalhos acadêmicos ou descobrir pesquisas relacionadas a uma área nem sempre é uma tarefa simples. Muitas vezes, essas produções permanecem dispersas em diferentes ambientes e repositórios, dificultando o acesso.
            </p>
            <div className="bloco-destaque-interno">
              <h4>Experiência Unificada</h4>
              <p>
                Oferecemos uma plataforma centralizada e um processo de submissão organizado para que alunos e pesquisadores apresentem metadados essenciais, repositórios e demonstrações práticas.
              </p>
            </div>
          </div>

        </div>
      </section>

      <section className="secao-pilares-bg">
        <div className="container-pilares">
          <div className="cabecalho-secao-centro">
            <span className="subtitulo-secao">Fundamentos da Plataforma</span>
            <h2>O que nos move</h2>
          </div>

          <div className="grid-pilares-cards">
            
            <div className="cartao-pilar">
              <div className="indicador-pilar">01</div>
              <h3>Democratização do Acesso</h3>
              <p>
                Acreditamos que o acesso ao conhecimento deve ser simples e aberto à comunidade. Buscamos reduzir barreiras entre quem produz e quem deseja conhecer a produção acadêmica.
              </p>
            </div>

            <div className="cartao-pilar">
              <div className="indicador-pilar">02</div>
              <h3>Organização e Descoberta</h3>
              <p>
                Reunimos diferentes produções em um único ambiente, estruturando informações como autores, cursos, áreas de conhecimento e tecnologias utilizadas para facilitar a pesquisa.
              </p>
            </div>

            <div className="cartao-pilar">
              <div className="indicador-pilar">03</div>
              <h3>Valorização Acadêmica</h3>
              <p>
                Cada projeto representa o esforço de aprender e criar. Queremos dar visibilidade a essas iniciativas, valorizando o trabalho de estudantes, professores e pesquisadores.
              </p>
            </div>

            <div className="cartao-pilar">
              <div className="indicador-pilar">04</div>
              <h3>Conexão e Colaboração</h3>
              <p>
                O compartilhamento de conhecimento abre portas para novas ideias. Aproximamos pessoas com interesses semelhantes para estimular a troca de experiências e novas parcerias.
              </p>
            </div>

          </div>
        </div>
      </section>

      <section className="secao-galeria-vitrine">
        <div className="container-galeria-vitrine">
          <div className="cabecalho-galeria-flex">
            <div>
              <span className="subtitulo-secao">Showcase</span>
              <h2>Projetos Recentes na Comunidade</h2>
            </div>
            <Link to="/projetos" className="link-ver-todos">
              Ver todos os projetos →
            </Link>
          </div>
          
          <div className="galeria-behance">
            {projetosAmostra.slice(0, 8).map(projeto => (
              <Link key={projeto.id} to={`/projetos/${projeto.id}`} className="cartao-galeria" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="imagem-galeria">
                  {projeto.imagens && projeto.imagens.length > 0 ? (
                    <img src={urlImagem(projeto.imagens[0])} alt={projeto.titulo} />
                  ) : (
                    <div className="placeholder-img">
                      <span>{projeto.tema || 'Projeto IFSC'}</span>
                    </div>
                  )}
                </div>
                <div className="info-galeria">
                  <h4>{projeto.titulo}</h4>
                  <p className="tecnologias-tag">
                    {projeto.tecnologias && projeto.tecnologias.length > 0 
                      ? projeto.tecnologias.join(' • ') 
                      : 'Projeto Acadêmico'}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="secao-compromisso-banner">
        <div className="card-compromisso-escuro">
          <span className="badge-compromisso">Nosso Compromisso</span>
          <h2>Dando visibilidade às ideias, conectando pessoas e compartilhando conhecimento.</h2>
          <p>
            O PublicaIFSC nasce com a proposta de tornar a produção acadêmica mais visível, acessível e conectada. Entendemos que uma instituição de ensino se fortalece quando compartilha aquilo que produz, permitindo que experiências individuais se transformem em conhecimento coletivo.
          </p>
          <div className="acoes-compromisso">
            <Link to="/submissao" className="botao-cta-destaque">
              Submeter seu Projeto Agora
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}

export default Sobre;