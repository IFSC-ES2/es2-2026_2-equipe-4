# Arquitetura do MVP

Esta visão descreve o código integrado na `main` no commit `e7685a5` (merge
do PR #188, 11/11/2026). O produto é uma vitrine de projetos universitários
com cadastro, autenticação, publicação e consulta pública.

## Contexto e fronteira

Visitantes consultam projetos sem autenticação. Estudantes e professores
cadastrados podem publicar projetos; as operações protegidas identificam o
usuário pelo JWT. A plataforma não automatiza integração com repositórios ou
serviços de demonstração externos.

Diagramas: [contexto](diagramas/contexto.md) e
[contêineres](diagramas/conteineres.md).

## Componentes e responsabilidades

| Componente | Responsabilidade e dependências |
|---|---|
| React e Vite (`src/frontend/`) | Páginas de cadastro, login, submissão, galeria, detalhes e Sobre. O navegador chama a API por HTTP e não acessa o banco. |
| Spring Boot (`src/backend/projetos/`) | API REST. Controllers recebem requisições; serviços implementam regras; repositórios usam Spring Data MongoDB. |
| MongoDB | Armazena usuários e projetos. |
| GridFS | Armazena imagens no MongoDB; não é serviço separado. |

`ProjetoController` delega regras a `ProjetoService`, que usa repositórios,
DTOs e `ArmazenamentoArquivoService` para o acesso a arquivos. Cadastro e
login têm controllers e serviços próprios. Spring injeta dependências nos
componentes. `JwtAuthenticationFilter` integra a validação do token à cadeia
do Spring Security.

## Comunicação e rotas principais

O ambiente publicado usa Render Static Site para o frontend e Render Web
Service para a API, com MongoDB Atlas para persistência. O navegador carrega a
interface em `https://publicaifsc.onrender.com/` e chama a API em
`https://publicaifsc-api.onrender.com/api/v1`. O [Docker Compose](../docker-compose.yml)
continua disponível para desenvolvimento local e reúne frontend (5173), API
(8080) e MongoDB (27017), com volume persistente. No Compose, a API encontra o
banco pelo nome `mongodb`. Configuração do Render, Atlas e execução local:
[DEPLOY](DEPLOY.md).

| Rota relativa a `/api/v1` | Acesso e finalidade |
|---|---|
| `GET /projetos` e `GET /projetos/{id}` | Públicos; listagem e consulta de projetos. |
| `POST /projetos/upload` | Autenticada; recebe imagem e grava no GridFS. |
| `POST /projetos/metadados` | Autenticada; grava os dados do projeto e associa a autoria ao usuário autenticado. |
| `PUT /projetos/{id}/imagem` | Autenticada; troca a imagem do projeto conforme as regras da API. |
| `GET /projetos/imagens/{id}` | Pública; recupera imagem armazenada. |

A interface envia imagem e metadados em requisições separadas; uma falha ao
salvar metadados pode deixar arquivo sem projeto associado. O upload limita o
arquivo a 5 MB (413 acima do limite), mas ainda não valida o tipo real do
conteúdo nem há backup automatizado.

## Autenticação

Cadastro armazena senha com BCrypt. Login retorna JWT; o frontend guarda o
token em `localStorage` e o envia como `Authorization: Bearer <token>` nas
rotas protegidas. O filtro valida o token e o backend usa a identidade
autenticada para definir `autorId`, sem confiar na autoria enviada pelo
cliente. O uso de `localStorage` mantém risco caso scripts maliciosos sejam
executados no navegador.

As credenciais foram removidas da configuração versionada pelo PR #158, mas
`admin123` permanece no histórico público do Git e como valor padrão em dois
testes de integração (R08 em [riscos](riscos.md)).

## Plano inicial e produto entregue

| Plano inicial | Implementação atual |
|---|---|
| Artigos acadêmicos e PDFs | Vitrine de projetos universitários com imagens, tecnologias e links. |
| HTML, CSS e JavaScript sem framework | React com Vite ([ADR-0003](adr/ADR-0003.md)). |
| MySQL como alternativa | MongoDB é o único banco integrado; MySQL não foi adotado ([ADR-0002](adr/ADR-0002.md)). |
| Revisão por pares | Não faz parte do MVP atual. |
| Listagem pública | API e interface integradas em galeria, com filtro e páginas de detalhe. |
| Armazenamento separado (#131) | `ArmazenamentoArquivoService` encapsula GridFS, conforme [reengenharia](REENGENHARIA.md). |

As decisões e sua evolução constam em [ADRs](adr/) e na
[retrospectiva](RETROSPECTIVA.md). O ambiente publicado não possui staging,
backup automatizado nem monitoramento configurado ([DEPLOY](DEPLOY.md)).
