# PublicaIFSC

Vitrine de projetos universitários do IFSC. Visitantes consultam os projetos
sem login; estudantes e professores cadastrados podem publicar seus trabalhos.

## Funcionalidades

- Cadastro e login com JWT.
- Publicação de projetos com título, resumo, autores, tema, tecnologias, imagens e links. A autoria é definida pelo usuário autenticado.
- Galeria pública com filtro por tema e mensagens de carregamento, lista vazia e erro.
- API com listagem paginada, consulta por identificador e filtro por tecnologias.
- Página Sobre e navegação entre cadastro, login, galeria e submissão.

## Tecnologias

React e Vite na interface, Java 25 com Spring Boot na API,
MongoDB para os dados e GridFS para os arquivos. O Docker Compose reúne os serviços.

## Executar

### Com Docker

Requisito: Docker com Compose. Na raiz do repositório:

```bash
docker compose up -d --build
```

- Interface: <http://localhost:5173>
- Galeria: <http://localhost:5173/projetos>
- API: <http://localhost:8080/api/v1>

O banco usa um volume persistente. O Compose adiciona 30 projetos de exemplo
quando o banco está vazio. Após atualizar o código, repita o comando de build.

### Desenvolvimento

Requisitos: JDK 25 configurado em `JAVA_HOME`, Node.js 24 e MongoDB.
Para manter apenas o banco no Docker, execute na raiz:

```bash
docker compose up -d mongodb
docker compose stop backend frontend
```

API, em um terminal a partir da raiz:

```powershell
cd src/backend/projetos
.\gradlew.bat bootRun
```

Interface, em outro terminal a partir da raiz:

```bash
cd src/frontend
npm ci
npm run dev
```

## Testes

Mantenha o MongoDB ativo para os testes de integração da API.
Em `src/backend/projetos`:

```powershell
.\gradlew.bat test
```

Em `src/frontend`:

```bash
npm ci
npm test -- --run
```

No Linux/macOS, use `./gradlew` no lugar de `.\gradlew.bat`.

O [CI](.github/workflows/ci.yml) executa testes, builds e verificações de
documentação em PRs para `main` e `entrega-*`.

## Limitações e pendências

- Imagens enviadas ainda não têm rota de leitura e o limite de upload é de 1 MB.
- A galeria carrega até 100 projetos, tela de detalhe e busca por texto estão pendentes.
- A exclusão pela galeria ainda não tem suporte na API.
- Arquitetura, revisão dos ADRs e refatoração do armazenamento ainda aguardam integração nos PRs indicados abaixo.

## Documentação e acompanhamento

- [Arquitetura](https://github.com/IFSC-ES2/es2-2026_2-equipe-4/blob/TASK/129-arquitetura-mvp/docs/ARQUITETURA.md) — em revisão no [PR #144](https://github.com/IFSC-ES2/es2-2026_2-equipe-4/pull/144).
- [ADRs](docs/adr/) e [revisão da Sprint 3 — PR #143](https://github.com/IFSC-ES2/es2-2026_2-equipe-4/pull/143).
- [Reengenharia e medições](https://github.com/IFSC-ES2/es2-2026_2-equipe-4/blob/TASK/131-armazenamento-arquivos/docs/REENGENHARIA.md) — em revisão no [PR #147](https://github.com/IFSC-ES2/es2-2026_2-equipe-4/pull/147).
- [Registro da Sprint 3](docs/sprints/sprint-3.md).
- [Métricas](docs/METRICAS.md) e [fichas](docs/metricas/).
- [Riscos](docs/riscos.md), [qualidade](docs/qualidade.md) e [DoD](docs/dod.md).
- [Uso de IA](USO-IA.md) e [fluxo de trabalho](docs/fluxo-de-trabalho.md).
- Histórico: [Inception](docs/inception.md), [baseline](docs/BASELINE.md), [estimativas](docs/ESTIMATIVAS.md), [Sprint 1](docs/sprints/sprint-1.md) e [Sprint 2](docs/sprints/sprint-2.md).
- [Board](https://github.com/orgs/IFSC-ES2/projects/34) e [backlog](https://github.com/IFSC-ES2/es2-2026_2-equipe-4/issues).
- API: [login](src/backend/projetos/rotas-login.md), [contas](src/backend/projetos/rotas-de-criacao-de-contas.md) e [listagem pública](src/backend/docs/rotas-publicas-de-listagem-de-projetos.md).

## Equipe

| Nome | Papel | Matrícula |
|---|---|---|
| Bernardo Vieira de Souza | Arquiteto de Software / Scrum Master | 202510703707 |
| Marcos Júnior Lemes Ferreira | DevOps / Infra | 202510703657 |
| Juliano Tavares da Silva | Engenheiro de Qualidade | 202510704909 |
| Pedro Henrique Bernhardt Valete | DBA | 202510703675 |
| Gabriel Ferreira de Souza da Silva | Front-end Dev | 202410004990 |
