# PublicaIFSC

Vitrine de projetos universitários do IFSC. Visitantes consultam os projetos
sem login; estudantes e professores cadastrados podem publicar seus trabalhos.

## Funcionalidades

- Cadastro e login com JWT.
- Publicação de projetos com título, resumo, autores, tema, tecnologias, imagens e links. A autoria é definida pelo usuário autenticado.
- Galeria pública de projetos, com filtro por tema e visualização das imagens disponíveis.
- API com listagem paginada, consulta por identificador e filtro por tecnologias.
- Página de detalhes do projeto (`/projetos/:id`), com galeria de imagens.
- Página Sobre com informações do projeto, galeria e navegação entre cadastro, login, galeria e submissão.
- Imagem padrão, sorteada entre três, em todo projeto criado sem imagem.
- Troca da imagem de um projeto pelo próprio autor, com autenticação, e leitura das imagens enviadas pela API.

As configurações locais ficam em `.env`, criado a partir de `.env.example`.
Não versione valores sensíveis; consulte [configuração de ambiente e deploy](docs/DEPLOY.md).

## Ambiente de validação

O ambiente de validação é o Docker Compose local, reprodutível, com pré-requisitos, variáveis, comandos e validação rápida em [docs/DEPLOY.md](docs/DEPLOY.md), a interface e a API sobem nos endereços da seção Executar.

## Tecnologias

React e Vite na interface, Java 25 com Spring Boot na API,
MongoDB para os dados e GridFS para os arquivos. O Docker Compose reúne os serviços.

## Executar

Consulte [configuração de ambiente e deploy local](docs/DEPLOY.md) para ver as
variáveis do `.env`, execução direta sem containers, validação e limitações.

### Com Docker

Requisito: Docker com Compose. Na primeira execução, copie `.env.example` para
`.env` e configure os valores locais, conforme `docs/DEPLOY.md`. Na raiz:

```bash
docker compose up -d --build
```

- Interface: <http://localhost:5173>
- Galeria: <http://localhost:5173/projetos>
- API: <http://localhost:8080/api/v1>

O banco usa um volume persistente. O seed de projetos fictícios fica desligado
por padrão. Após atualizar o código ou a URL configurada da API, repita o
comando de build.


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

Os testes rodam localmente com JDK 25 (`JAVA_HOME`) e Node.js 24.
O MongoDB roda no Docker; no Windows, mantenha o Docker Desktop aberto.

### Preparar o ambiente

Na raiz, crie o `.env` apenas se ele ainda não existir: `cp .env.example .env`
no Bash ou `Copy-Item .env.example .env` no PowerShell. Confira os valores
conforme [configuração de ambiente](docs/DEPLOY.md) e execute:

```shell
docker compose up -d --build
docker compose ps
```

Aguarde o MongoDB ficar `healthy`.

### Backend

A partir da raiz, no Linux/macOS (Bash):

```bash
export TEST_MONGODB_URI='mongodb://publicaifsc_local:senha_muito_forte@localhost:27017/publicaifsc_test?authSource=admin'
cd src/backend/projetos
./gradlew test
```

No Windows (PowerShell):

```powershell
$env:TEST_MONGODB_URI = 'mongodb://publicaifsc_local:senha_muito_forte@localhost:27017/publicaifsc_test?authSource=admin'
cd src/backend/projetos
.\gradlew.bat test
```

Se alterou usuário, senha ou porta no `.env`, ajuste a URI e mantenha o banco
exclusivo `publicaifsc_test`. O Gradle não carrega o `.env` automaticamente;
a variável vale durante a sessão do terminal.

### Frontend

Em outro terminal, a partir da raiz, execute `cd src/frontend` e:

| Terminal | Instalar dependências | Executar testes uma vez |
|---|---|---|
| Linux/macOS (Bash) | `npm ci` | `npm test -- --run` |
| Windows (PowerShell) | `npm.cmd ci` | `npm.cmd test -- --run` |

O [CI](.github/workflows/ci.yml) executa testes, builds e verificações de
documentação em PRs para `main` e `entrega-*`.

## Limitações e pendências

- A galeria carrega até 100 projetos; busca por texto ainda está pendente.
- Staging e deploy automatizado não foram entregues, a validação é feita localmente com Docker Compose.
- O limite de upload de imagem é de 5 MB, acima disso a API responde 413.
- A exclusão pela galeria ainda não tem suporte na API.

## Documentação e acompanhamento

- [Arquitetura](docs/ARQUITETURA.md), [ADRs](docs/adr/) e [reengenharia e medições](docs/REENGENHARIA.md).
- [Registro da Sprint 3](docs/sprints/sprint-3.md) e [Sprint 4](docs/sprints/sprint-4.md).
- [Métricas](docs/METRICAS.md) e [fichas](docs/metricas/).
- [Riscos](docs/riscos.md), [qualidade](docs/qualidade.md) e [DoD](docs/dod.md).
- [Uso de IA](USO-IA.md) e [fluxo de trabalho](docs/fluxo-de-trabalho.md).
- Histórico: [Inception](docs/inception.md), [baseline](docs/BASELINE.md), [estimativas](docs/ESTIMATIVAS.md), [Sprint 1](docs/sprints/sprint-1.md) e [Sprint 2](docs/sprints/sprint-2.md). Inception e baseline registram o escopo inicial de artigos; o produto atual é a vitrine de projetos.
- [Board](https://github.com/orgs/IFSC-ES2/projects/34) e [backlog](https://github.com/IFSC-ES2/es2-2026_2-equipe-4/issues).
- API: [login](src/backend/docs/rotas-login.md), [contas](src/backend/docs/rotas-de-criacao-de-contas.md) e [listagem pública](src/backend/docs/rotas-publicas-de-listagem-de-projetos.md). A rota autenticada `PUT /api/v1/projetos/{id}/imagem` troca a imagem de um projeto; envie o arquivo multipart no campo `arquivo`. A rota pública `GET /api/v1/projetos/imagens/{id}` devolve uma imagem enviada.

## Equipe

| Nome | Papel | Matrícula |
|---|---|---|
| Bernardo Vieira de Souza | Arquiteto de Software / Scrum Master | 202510703707 |
| Marcos Júnior Lemes Ferreira | DevOps / Infra | 202510703657 |
| Juliano Tavares da Silva | Engenheiro de Qualidade | 202510704909 |
| Pedro Henrique Bernhardt Valete | DBA | 202510703675 |
| Gabriel Ferreira de Souza da Silva | Front-end Dev | 202410004990 |
