# Inception — PublicaIFSC

## 1. Visão do produto

### Problema

Parte da produção acadêmica de instituições de ensino, como IFSC, UFSC e SENAI, permanece restrita a arquivos locais, repositórios pouco intuitivos ou plataformas pagas ou pouco acessíveis. Isso reduz a visibilidade dos trabalhos e dificulta que estudantes, professores, pesquisadores e demais interessados encontrem e consultem produções acadêmicas da própria comunidade.

### Área de aplicação

O PublicaIFSC está inserido nas áreas de educação, apoio à aprendizagem, comunicação, transparência e acesso à informação, com foco no ambiente acadêmico e científico.

### Usuários e interessados

- **Alunos:** submetem trabalhos e consultam artigos publicados.
- **Professores e pesquisadores:** submetem trabalhos, consultam a produção acadêmica disponível e, em evoluções futuras, poderão participar de fluxos de revisão.
- **Coordenações de curso e pesquisa:** possuem interesse na organização e na visibilidade da produção científica institucional.
- **Comunidade acadêmica:** consulta os artigos disponibilizados publicamente.

### Contexto de aplicação

A aplicação inicial será voltada ao IFSC — Campus São José. O sistema poderá futuramente ser adaptado para outras instituições de ensino parceiras, como UFSC e SENAI, porém essa expansão não faz parte do MVP atual.

### Proposta de valor

O PublicaIFSC propõe centralizar, em uma plataforma web simples e acessível, a submissão e a consulta de artigos acadêmicos.

O principal valor do sistema está em facilitar a disponibilização dos trabalhos e aumentar a visibilidade da produção acadêmica local por meio de uma listagem pública e fácil de pesquisar. Com isso, o PublicaIFSC contribui para democratizar o acesso ao conhecimento acadêmico, valorizar a produção local de pesquisa, estimular a colaboração entre instituições e servir como vitrine para projetos de iniciação científica e extensão.

### Objetivos para o semestre

- Desenvolver uma aplicação web funcional para submissão de artigos acadêmicos.
- Registrar os principais metadados de cada artigo.
- Armazenar de forma segura os arquivos PDF submetidos.
- Disponibilizar uma listagem pública dos artigos cadastrados.
- Permitir busca simples por área, autor ou palavra-chave.
- Permitir a visualização dos dados de um artigo e acesso ao respectivo PDF.
- Estabelecer uma base técnica que permita a evolução do sistema em etapas posteriores.

### Premissas, restrições e limitações

- O projeto deve possuir escopo compatível com o período disponível no semestre.
- O MVP será inicialmente restrito ao contexto do IFSC — Campus São José.
- O sistema não terá, nesta etapa, autenticação ou controle de perfis de usuário.
- Não será implementado inicialmente um fluxo simples ou completo de revisão, aprovação ou rejeição de artigos.
- O armazenamento e a busca deverão utilizar soluções compatíveis com a complexidade do MVP.
- Decisões arquiteturais poderão ser revistas durante o desenvolvimento e registradas por meio de novas ADRs.

---

## 2. Definição do MVP

### Objetivo do MVP

O objetivo do MVP é validar a proposta central do PublicaIFSC: permitir que um artigo acadêmico seja cadastrado juntamente com seus principais metadados e arquivo PDF e que esse conteúdo possa posteriormente ser encontrado e consultado publicamente.

### Funcionalidades essenciais

O MVP deverá contemplar:

1. **Submissão de artigo**, contendo:
   - título;
   - resumo;
   - autores;
   - palavras-chave;
   - área do conhecimento;
   - arquivo PDF.

2. **Persistência dos metadados** associados ao artigo.

3. **Armazenamento seguro do arquivo PDF** submetido.

4. **Listagem pública dos artigos** cadastrados.

5. **Busca simples de artigos** por:
   - área do conhecimento;
   - autor;
   - palavra-chave.

6. **Visualização dos dados do artigo**, incluindo acesso ao arquivo PDF correspondente.

### Fora do escopo do MVP

Nesta primeira versão, não fazem parte do escopo:

- cadastro e autenticação de usuários;
- perfis distintos de aluno, professor, administrador ou revisor;
- controle de acesso baseado em papéis;
- fluxo simples ou completo de revisão, aprovação ou rejeição de artigos;
- definição de revisores responsáveis por artigo;
- múltiplos revisores;
- revisão duplo-cega;
- comentários e curtidas;
- sistema de citações entre artigos;
- notificações por e-mail;
- busca full-text;
- filtros avançados combinados;
- dashboard de estatísticas;
- histórico de versões dos artigos;
- reenvio de trabalhos após rejeição;
- perfis públicos de autores;
- métricas acadêmicas;
- integração com outras instituições de ensino.

### Justificativa do recorte

O MVP concentra o desenvolvimento no fluxo principal do produto: cadastrar, armazenar, localizar e consultar artigos acadêmicos.

Funcionalidades como autenticação, controle de acesso, revisão por pares, revisão editorial, notificações e mecanismos avançados de busca aumentariam significativamente a complexidade do sistema e não são necessárias para validar a proposta principal nesta etapa.

Esse recorte permite que a equipe desenvolva uma versão funcional dentro do semestre e mantenha uma base que possa ser expandida posteriormente.

### Critérios utilizados para definição do escopo

A equipe considerou os seguintes critérios para definir o que faria parte do MVP:

- relação direta com o problema principal do projeto;
- valor entregue ao usuário na primeira versão;
- complexidade compatível com o período disponível;
- quantidade reduzida de dependências entre funcionalidades;
- possibilidade de validar as funcionalidades por meio de critérios objetivos;
- possibilidade de evolução futura sem exigir funcionalidades avançadas desde o início.

---

## 3. Direcionamento técnico inicial

O PublicaIFSC será desenvolvido como uma **aplicação web**, permitindo que os usuários utilizem o sistema diretamente pelo navegador.

As principais decisões relacionadas à implementação serão registradas individualmente por meio de ADRs, incluindo:

- linguagem e frameworks utilizados;
- organização arquitetural da aplicação;
- abordagem de persistência dos dados;
- forma de armazenamento dos arquivos PDF;
- utilização de containers, quando aplicável.

As tecnologias escolhidas pela equipe serão registradas nesta documentação após a definição das respectivas decisões arquiteturais.

Os detalhes, alternativas consideradas e justificativas estarão disponíveis na pasta [`docs/`], junto das ADRs do projeto.

---

## 4. Definition of Done

A Definition of Done utilizada pela equipe está registrada em [`docs/dod.md`].

Ela estabelece as condições mínimas necessárias para que um item do backlog seja considerado concluído.

---

## 5. Decisões arquiteturais

As principais decisões técnicas e arquiteturais do PublicaIFSC serão documentadas por meio de Architecture Decision Records (ADRs).

As ADRs estão disponíveis na pasta [`docs/`] e deverão registrar, quando aplicável:

- contexto da decisão;
- decisão adotada;
- alternativas consideradas;
- consequências positivas e negativas;
- relação da decisão com o MVP.


