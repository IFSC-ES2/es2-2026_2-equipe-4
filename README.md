# PublicaIFSC

Plataforma web para publicação de artigos acadêmicos com processo de revisão por pares integrado.

## 1. Equipe
 
| Nome | Papel | Matrícula |
|---|---|---|
| Bernardo Vieira de Souza | Arquiteto de Software | 202510703707 |
| Marcos Júnior Lemes Ferreira | DevOps / Infra | 202510703657 |
| Juliano Tavares da Silva | Engenheiro de Qualidade | 202510704909 |
| Pedro Henrique Bernhardt Valete | DBA / Scrum Master | 202510703675 |
| Gabriel Ferreira de Souza da Silva | Front-end Dev | 202410004990 |

## 2. Problema

Grande parte da produção acadêmica de instituições como IFSC, UFSC e SENAI fica restrita a arquivos locais, repositórios institucionais pouco intuitivos ou plataformas pagas. Isso dificulta o acesso de outros pesquisadores e estudantes a esses materiais, reduzindo o impacto e a visibilidade das pesquisas. 

## 3. Área de aplicação

Educação e apoio à aprendizagem (linha temática 1) e comunicação, transparência e acesso à informação (linha temática 6), com foco no ambiente acadêmico e científico.

## 4. Usuários

**Pesquisadores e professores** — submetem e revisam artigos
**Alunos (graduação e pós-graduação)** — publicam trabalhos e acessam conteúdos
**Coordenações de cursos/pesquisa** — acompanham a produção científica da instituição

## 5. Contexto de aplicação

Aplicação inicial no IFSC (Instituto Federal de Santa Catarina), campus São José, com possibilidade de expansão futura para outras instituições parceiras.

## 6. Relevância

A produção científica brasileira cresce a cada ano, mas grande parte dela fica subutilizada por falta de visibilidade e de canais acessíveis de publicação. O PublicaIFSC contribui para:

Democratizar o acesso ao conhecimento acadêmico
Valorizar a produção local de pesquisa
Estimular a colaboração entre instituições
Servir como vitrine para projetos de iniciação científica e extensão

## 7. Escopo do MVP

O MVP foi deliberadamente enxuto: poucas funcionalidades, bem implementadas, deixando espaço para expansão nas próximas sprints.

### O que o MVP fará

Permitir que um aluno/professor submeta um artigo, o artigo ficará em uma listagem pública pesquisável.

### Funcionalidades principais

2. Submissão de artigo com metadados: título, resumo, autores, palavras-chave, área do conhecimento, arquivo PDF
4. Listagem pública de artigos, com busca por área, autor ou palavra-chave
5. Armazenamento seguro dos arquivos PDF

### Fora do escopo (por enquanto)

Controle de acesso básico: somente autor e revisor podem editar/avaliar o artigo
Cadastro e login de usuários, com dois perfis: **aluno** e **professor**
Fluxo de revisão simples: um revisor atribuído por artigo, que emite parecer de aprovação ou rejeição (com comentário)
Múltiplos revisores por artigo / revisão duplo-cega
Comentários, curtidas ou citações entre artigos
Notificações por e-mail
Busca avançada (full-text search, filtros combinados)
Dashboard de estatísticas para coordenação de curso
Expansão para outras instituições (UFSC, SENAI) — fica restrito ao IFSC nesta fase
Histórico de versões / reenvio de artigo após rejeição
Perfis públicos de autor com métricas (h-index, nº de publicações etc.)

> Esses itens ficam mapeados como candidatos para as próximas sprints, evitando que o MVP fique "vazio" de trabalho futuro.

O documento completo de Inception — contendo a visão do produto, usuários, contexto de aplicação e a definição detalhada do MVP — está disponível em [`docs/inception.md`](docs/inception.md).
 
## 8. Documentação e gestão do projeto
 
### 8.1 Board e Backlog
 
O andamento das tarefas é gerenciado através do board do projeto no GitHub Projects, organizado nas colunas *Backlog*, *Todo*, *In Progress* e *Done*, com cada item vinculado a uma issue do repositório.
 
- **Board:** [github.com/orgs/IFSC-ES2/projects/34](https://github.com/orgs/IFSC-ES2/projects/34)

### 8.2 Definition of Done (DoD)
 
Os critérios que um item do backlog precisa atender para ser considerado concluído — versionamento, Pull Request, revisão por outro integrante, checks automáticos e atualização de documentação — estão registrados em [`docs/dod.md`](docs/dod.md).
 
### 8.3 Architecture Decision Records (ADRs)
 
As principais decisões técnicas e arquiteturais do projeto são registradas individualmente como ADRs:
 
- [ADR-0001 — Arquitetura do Projeto](docs/adr/ADR-0001.md)
- [ADR-0002 — Stack Tecnológica do Projeto](docs/adr/ADR-0002.md)
