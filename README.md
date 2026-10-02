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

1. Submissão de artigo com metadados: título, resumo, autores, palavras-chave, área do conhecimento, arquivo PDF
2. Listagem pública de artigos, com busca por área, autor ou palavra-chave
3. Armazenamento seguro dos arquivos PDF

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
- **Backlog:** [Issues do repositório](https://github.com/IFSC-ES2/es2-2026_2-equipe-4/issues)

### 8.2 Definition of Done (DoD)
 
Os critérios que um item do backlog precisa atender para ser considerado concluído — versionamento, Pull Request, revisão por outro integrante, checks automáticos e atualização de documentação — estão registrados em [`docs/dod.md`](docs/dod.md).
 
### 8.3 Architecture Decision Records (ADRs)
 
As principais decisões técnicas e arquiteturais do projeto são registradas individualmente como ADRs:
 
- [ADR-0001 — Arquitetura do Projeto](docs/adr/ADR-0001.md)
- [ADR-0002 — Stack Tecnológica do Projeto](docs/adr/ADR-0002.md)
- [ADR-0003 — Front-end para React](docs/adr/ADR-0003.md)

### 8.4 Artefatos da Entrega 3

Os documentos produzidos para a entrega 3 estão organizados nos seguintes arquivos:

- [Linha de base do planejamento](docs/BASELINE.md)
- [Estimativas do backlog priorizado](docs/ESTIMATIVAS.md)
- [Métricas definidas](docs/METRICAS.md)

As fichas individuais das métricas estão disponíveis em:

- [M-01 — NCLOC](docs/metricas/M-01.md)
- [M-02 — Complexidade Ciclomática](docs/metricas/M-02.md)
- [M-03 — Cobertura de Testes](docs/metricas/M-03.md)
- [M-04 — Acoplamento entre Classes](docs/metricas/M-04.md)
- [M-05 — Taxa de Retrabalho](docs/metricas/M-05.md)
- [M-06 — Densidade de Defeitos](docs/metricas/M-06.md)
- [M-07 — Variação de Cronograma](docs/metricas/M-07.md)
- [M-08 — Variação de Escopo](docs/metricas/M-08.md)

### 8.5 Artefatos da Entrega 4

Os documentos produzidos para a entrega 4 estão organizados nos seguintes arquivos:

- [Registro de riscos](docs/riscos.md)
- [Fluxo de trabalho e CI mínimo](docs/fluxo-de-trabalho.md)
- [Critérios de qualidade](docs/qualidade.md)

Evidências da etapa: PR #46 (correção dos templates), PR #47 (lint no CI), PR #48
(fluxo de trabalho), PR #50 (registro dos riscos) e PR #51 (define qualidades)

### 8.6 Artefatos da Entrega 5 (Sprint 1)

- [`docs/sprints/sprint-1.md`](docs/sprints/sprint-1.md)
- [ADR-0003](docs/adr/ADR-0003.md).

### 8.7 Métricas por sprint

- [Sprint 1](docs/sprints/sprint-1.md): primeira coleta, usada como referência para as seguintes.
- [Sprint 2](docs/sprints/sprint-2.md): coleta ao final da Sprint 2, comparada com a Sprint 1.

## 9. Como executar o projeto

Requisitos: Docker com Docker Compose. Para rodar sem Docker (seção 9.2) também são necessários
o JDK 25 e o Node.js 22 ou superior.

### 9.1 Tudo de uma vez (Docker)

Na raiz do repositório:

```bash
docker-compose up -d --build
```

Sobe o MongoDB (`localhost:27017`, usuário `admin`, senha `admin123`), o back-end
(`http://localhost:8080/api/v1`) e o front-end (`http://localhost:5173`).

As imagens guardam o código da época do build: depois de alterar o código ou de dar `git pull`,
rode o mesmo comando de novo para atualizar. Os dados do MongoDB ficam num volume e não se
perdem ao reconstruir (só `docker-compose down -v` os apaga).

### 9.2 Desenvolvimento: só o banco no Docker

Para editar o código sem reconstruir imagens, suba apenas o MongoDB e rode o back-end e o
front-end direto na máquina. Pare antes os containers `backend` e `frontend`, para que não
ocupem as portas 8080 e 5173:

```bash
docker-compose up -d mongodb
docker-compose stop backend frontend
```

Back-end (Spring Boot), em outro terminal:

```bash
cd src/backend/projetos
./gradlew bootRun
```

API disponível em `http://localhost:8080/api/v1`.

Front-end (React + Vite):

```bash
cd src/frontend
npm install
npm run dev
```

Interface disponível em `http://localhost:5173`.

### 9.3 Acesso à API

A listagem de projetos (`GET /projetos`) é pública. A submissão de projeto exige login: crie uma
conta em `POST /users/createAccount/0.0.1/novousers`, entre em `POST /auth/login` (devolve um
token) e envie o token no cabeçalho `Authorization: Bearer <token>`. Os detalhes de cada rota
estão em [rotas-login.md](src/backend/projetos/rotas-login.md).

## 10. Como rodar os testes automatizados

### Back-end

```bash
cd src/backend/projetos
./gradlew test
```

Testes de unidade do service de projetos (`ProjetoServiceTest`, com Mockito) e o teste de
carga do contexto Spring (`ProjetosApplicationTests`). Mantenha o MongoDB no ar
(`docker-compose up -d mongodb`), como o CI faz.

### Front-end

```bash
cd src/frontend
npm test -- --run
```

`npm test` sem argumentos fica em modo contínuo (watch); com `-- --run` os testes rodam uma vez
e terminam, como no CI. Testes do formulário de submissão (`pages/Submissao/Enviar.test.jsx`).

### O que o CI executa

A cada pull request para `main` ou `entrega-*`, o GitHub Actions roda o build do back-end
(`./gradlew build -x test`) e do front-end (`npm run build`), os testes dos dois lados e as
verificações dos documentos (documentos obrigatórios, links internos e lint de Markdown).
Para reproduzir o build antes do push: `./gradlew build` em `src/backend/projetos` e
`npm ci && npm run build` em `src/frontend`.

## 11. O que funciona hoje (MVP ao final da Sprint 1)

- Submissão de artigo com metadados (título, resumo, autores, palavras-chave, área do
  conhecimento) e anexo de PDF, pelo formulário do front-end
- Metadados e arquivo persistidos de forma real no MongoDB, o PDF fica em GridFS, e o
  documento de metadados guarda a referência ao arquivo correspondente
- CORS configurado, permitindo a comunicação entre front-end (`:5173`) e back-end (`:8080`)
