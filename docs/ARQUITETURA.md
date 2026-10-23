# Arquitetura do MVP

Referência: `entrega-7`.
A documentação descreve o código integrado, incluindo suas pendências.

## Contexto e fronteira

O PublicaIFSC é uma vitrine de projetos universitários. Visitantes consultam
projetos pela API sem login; usuários cadastrados publicam seus projetos.
A interface de listagem ainda não está integrada nesta versão.

A fronteira do sistema inclui a interface, a API e o banco.
Links de repositório e demonstração são dados dos projetos; não há integração
automática com esses serviços externos.

Diagramas: [contexto](diagramas/contexto.md) e
[contêineres](diagramas/conteineres.md).

## Componentes e responsabilidades

| Componente | Responsabilidade e dependências |
|---|---|
| React e Vite (`src/frontend/`) | Páginas de cadastro, login e submissão. O navegador consome a API por HTTP; não acessa o banco. |
| Spring Boot (`src/backend/projetos/`) | API REST. Controllers recebem requisições; serviços validam e executam as regras; repositórios usam Spring Data MongoDB. |
| MongoDB | Guarda usuários na coleção `users` e projetos em `projetos`. |
| GridFS | Guarda os arquivos dentro do MongoDB. O upload retorna um identificador, usado no campo `imagens` do projeto. Não é um serviço separado. |

O `ProjetoController` depende de `ProjetoService`, que depende de
`ProjetoRepository`, `UserRepository` e `GridFsTemplate`.
Login e cadastro possuem controllers e serviços próprios.

## Comunicação e publicação

O [Docker Compose](../docker-compose.yml) executa três contêineres:
frontend na porta 5173, API na 8080 e MongoDB na 27017, com volume persistente.
O navegador carrega a interface e chama `http://localhost:8080/api/v1`.
Dentro do Compose, a API acessa o banco pelo nome `mongodb`.

Rotas de projetos, relativas a `/api/v1`:

| Rota | Acesso e resultado |
|---|---|
| `GET /projetos` e `GET /projetos/{id}` | Públicos; listagem e consulta dos dados. |
| `POST /projetos/upload` | Exige login; recebe arquivo multipart e o grava no GridFS. |
| `POST /projetos/metadados` | Exige login; grava título, resumo, autores, tema, tecnologias, imagens e links. |

A interface envia as imagens primeiro e depois os dados com seus identificadores.
São requisições separadas: uma falha na gravação dos dados pode deixar arquivos
sem projeto associado. Ainda não há rota para recuperar as imagens enviadas.

## Autenticação JWT

1. O cadastro armazena a senha como hash BCrypt. O login valida e-mail e senha
   e retorna um token JWT.
2. O React guarda o token em `localStorage` e o envia nas rotas protegidas
   como `Authorization: Bearer <token>`.
3. O Spring Security valida o token sem manter sessão no servidor. Ao publicar,
   a API identifica o usuário pelo e-mail do token e define `autorId`,
   sem aceitar a autoria informada pelo cliente.

O segredo JWT e as credenciais fixas precisam de correção na
[issue #100](https://github.com/IFSC-ES2/es2-2026_2-equipe-4/issues/100).
O token no navegador também exige proteção contra scripts maliciosos.

## Apoio ao MVP e diferenças do plano

A separação entre interface, regras e persistência permite evoluir as páginas
e a API. MongoDB e GridFS atendem aos dados e arquivos do projeto; JWT associa
a publicação ao usuário. Compose reúne o ambiente de desenvolvimento.

| Plano inicial | Estado implementado |
|---|---|
| Artigos acadêmicos e PDFs | Projetos universitários com tecnologias, imagens e links. |
| HTML, CSS e JavaScript sem framework | React com Vite, conforme a [ADR-0003](adr/ADR-0003.md). |
| MySQL como alternativa | Apenas MongoDB em uso. |
| Vitrine com listagem na interface | Consulta pública na API; tela pendente de integração (#128). |
| Separação do armazenamento (#131) | Ainda não realizada: `ProjetoService` acessa diretamente o GridFS. |

Histórico: [ADR-0001](adr/ADR-0001.md), [ADR-0002](adr/ADR-0002.md) e
[planejamento da Sprint 3](sprints/sprint-3.md).
A consolidação dos ADRs está na
[issue #130](https://github.com/IFSC-ES2/es2-2026_2-equipe-4/issues/130).
