# Avaliação da Entrega 8 - Sprint 4

## Identificação

- Equipe: es2-2026_2-equipe-4
- Projeto: PublicaIFSC — vitrine de projetos universitários
- Entrega: 8 - Sprint 4
- Repositório confirmado pela configuração: `IFSC-ES2/es2-2026_2-equipe-4`
- Pull request avaliado: [#188](https://github.com/IFSC-ES2/es2-2026_2-equipe-4/pull/188), `entrega-8` → `main`.
- Versão avaliada: `e7685a5`, merge do PR #188 em 12/11/2026 às 00h07 (UTC−3).
- Prazo: 11/11/2026.
- Release esperada: `v0.4.0`

## Documentos Consultados

Somente documentos e artefatos do repositório avaliado:

- `README.md`, `USO-IA.md` e `.env.example`.
- `.github/PULL_REQUEST_TEMPLATE.md`, templates de issues e `.github/workflows/ci.yml`.
- `docs/DEPLOY.md`, `docs/ARQUITETURA.md`, `docs/fluxo-de-trabalho.md`, `docs/dod.md`, `docs/riscos.md` e `docs/qualidade.md`.
- `docs/METRICAS.md` e fichas M-01 a M-08.
- `docs/sprints/sprint-4.md`, `docs/adr/ADR-0001.md` a `ADR-0005.md` e diagramas.
- Documentação de rotas em `src/backend/docs/`, código/testes/Dockerfiles em `src/backend/projetos/` e `src/frontend/`, `.gitignore` e `docker-compose.yml`.
- PRs, issues, Project 34, checks, histórico Git e [release `v0.4.0`](https://github.com/IFSC-ES2/es2-2026_2-equipe-4/releases/tag/v0.4.0).

## 1. Descrição — Resumo da Entrega

O MVP declarado é uma vitrine pública de projetos universitários do IFSC: visitantes consultam projetos sem login; estudantes e professores cadastrados publicam trabalhos com título, resumo, autores, tema, tecnologias, imagens e links. O produto atual foi explicitamente distinguido do escopo histórico de artigos (`README.md:136–143`).

A Sprint 4 entregou galeria pública, página de detalhes, galeria na página Sobre, imagens padrão, troca autenticada de imagem, limite de upload, centralização de configuração, testes e CI.

A equipe declarou explicitamente que **não entregou staging**, mantendo execução local reprodutível com Docker Compose (`README.md:129–134`, `docs/DEPLOY.md:1–5`). A integração (00h07) e a release (00h09) ocorreram minutos após a meia-noite de 12/11 e foram toleradas como dentro do prazo de 11/11.

## 2. Itens Obrigatórios da Entrega

### 2.1 Planejamento e incremento funcional da Sprint 4

- **Atendido:** a implementação possui publicação/listagem de projetos, filtros, detalhes, imagens padrão, upload/troca autenticada e leitura via GridFS. Há correspondência geral entre README, controllers, serviços e frontend. O planejamento está em `docs/sprints/sprint-4.md`.
- **Parcialmente atendido:** a funcionalidade de exclusão aparece na interface e no relato da Sprint 4, mas não há endpoint DELETE correspondente (A1). As issues de staging/deploy (#161–#164) foram encerradas como não planejadas em 11/11, sem replanejamento em tempo hábil (`docs/sprints/sprint-4.md:46–53`).

#### A1 — Interface oferece exclusão sem endpoint correspondente

- **Categoria:** coerência entre implementação e documentação.
- **Relevância:** média.
- **Evidência:** `src/frontend/src/pages/Projetos/Projetos.jsx:41–68,203–222` chama/exibe `DELETE /api/v1/projetos/{id}`; não há `@DeleteMapping` correspondente nos controllers de projetos. `README.md:134` reconhece a ausência, mas `docs/sprints/sprint-4.md:80–84` relata exclusão entre as contribuições/funcionalidades.
- **Impacto:** o usuário encontra uma ação que não pode ser concluída pela API, divergindo da descrição da sprint.
- **Recomendação:** remover/desabilitar a ação até haver endpoint autorizado, ou implementar e testar a exclusão pelo próprio autor.

### 2.2 Ambiente de staging ou equivalente acessível

- **Atendido:** a equipe não tentou ocultar a ausência de staging; README, DEPLOY e release declaram a limitação.
- **Não atendido:** `docs/DEPLOY.md` afirma que não há provedor nem ambiente de staging configurado; não há URL pública ou deployment remoto. A execução local não equivale a ambiente acessível.

#### A2 — Ausência de staging acessível

- **Categoria:** aderência aos requisitos da entrega.
- **Relevância:** alta.
- **Evidência:** `README.md:129–134` informa que staging não foi entregue. `docs/DEPLOY.md:1–5,141–147` restringe o procedimento ao ambiente local e declara ausência de provedor, staging, TLS e monitoramento. As issues #161–#164 foram fechadas como não planejadas; a API de deployments retornou lista vazia.
- **Impacto:** o requisito de ambiente acessível não foi atendido; o avaliador não consegue acessar o sistema sem preparar o ambiente local. Por ser aplicação web, a alternativa equivalente prevista no enunciado (para quando o tipo de aplicação não permite implantação web direta) não se aplica integralmente.
- **Recomendação:** disponibilizar staging acessível, com URL, procedimento de atualização documentado, versão implantada e smoke test.

### 2.3 Deploy automatizado ou reprodutível

- **Atendido:** `.env.example`, Compose, volume persistente MongoDB, instruções de execução, validação rápida e limitações estão documentados em `docs/DEPLOY.md`.
- **Atendido:** o CI sobe e valida o Compose a cada PR, o que reforça a reprodutibilidade do processo.
- **Parcialmente atendido:** o Compose local é reproduzível, mas não determinístico em sentido forte (A3), e o seed padrão diverge da documentação (A7).
- **Observação:** CD remoto não é exigido nesta entrega; o enunciado aceita deploy automatizado **ou** reprodutível. A ausência de workflow de publicação não foi descontada neste item; a falta de staging é tratada no item 2.2.

#### A3 — Reprodutibilidade não é determinística em sentido forte

- **Categoria:** infraestrutura e qualidade.
- **Relevância:** baixa/média.
- **Evidência:** `docker-compose.yml:3` usa `mongo:latest`; os Dockerfiles usam tags amplas como `eclipse-temurin:25-jdk` e `node:24-alpine`. Backend e frontend não têm healthchecks próprios; apenas MongoDB possui healthcheck (`docker-compose.yml:13–19`).
- **Impacto:** alterações externas das imagens podem mudar o ambiente e o Compose não verifica diretamente a saúde da aplicação completa.
- **Recomendação:** fixar versões/digests, adicionar healthchecks para API/frontend e testar o fluxo via proxy/serviços após a subida.

### 2.4 Manutenção e atualização da integração contínua

- **Atendido:** o workflow executa testes backend/frontend, builds, lint Markdown, links, documentação e subida/validação do Compose. A API possui testes de autorização, upload, GridFS e limites; o frontend possui testes de páginas/componentes. A `main` exige oito checks obrigatórios, estritos.
- **Parcialmente atendido:** os documentos de processo descrevem conjuntos de checks diferentes do configurado (A4).

#### A4 — Checks documentados de forma inconsistente

- **Categoria:** processo GitHub.
- **Relevância:** baixa.
- **Evidência:** `docs/fluxo-de-trabalho.md` declara três checks obrigatórios; `docs/qualidade.md` declara cinco; a proteção efetiva da `main`, consultada pela API, exige oito checks: links, documentos, lint, builds e testes backend/frontend e Compose.
- **Impacto:** a documentação de governança não permite saber, sem consulta externa, qual é a política vigente.
- **Recomendação:** atualizar os documentos para refletir a configuração efetiva e manter um único inventário de checks.

### 2.5 Documentação de deploy

- **Atendido:** `docs/DEPLOY.md` documenta pré-requisitos, variáveis, execução local, validação rápida e limitações conhecidas, incluindo a ausência de provedor, staging, TLS e monitoramento.
- **Parcialmente atendido:** o comportamento do seed descrito no guia diverge do `.env.example` (A7).

### 2.6 Atualização das métricas e riscos do projeto

- **Atendido:** `docs/METRICAS.md`, fichas M-01 a M-08, `docs/riscos.md` e `docs/qualidade.md` foram atualizados na entrega.
- **Parcialmente atendido:** arquitetura não reconciliada com o produto (A5) e registro de IA com referências antigas (A6).

#### A5 — Arquitetura não foi reconciliada com o produto entregue

- **Categoria:** documentação e arquitetura.
- **Relevância:** média.
- **Evidência:** `docs/ARQUITETURA.md` mantém afirmações de que a listagem/tela de projetos, detalhes e leitura de imagens estavam pendentes, enquanto `src/frontend/src/main.jsx` registra as rotas e `ProjetoController.java` possui endpoints de projetos/imagens.
- **Impacto:** decisões e diagramas não representam integralmente o estado real, dificultando manutenção e defesa técnica.
- **Recomendação:** revisar arquitetura, ADRs, diagramas e README após cada incremento, distinguindo estado atual de evolução futura.

#### A6 — Registro de uso de IA contém referências antigas e imprecisas

- **Categoria:** uso de IA e documentação.
- **Relevância:** média.
- **Evidência:** `USO-IA.md` cita caminhos `src/backend/artigos`, `main.py` e `docker-compose.yaml`, enquanto o repositório atual usa `projetos` e `docker-compose.yml`; há entradas sem data e descrições genéricas. Os artefatos atuais de Docker, frontend, GridFS, métricas e testes existem, mas nem sempre estão vinculados a commit/PR específico.
- **Impacto:** parte do registro não permite verificar exatamente qual artefato foi produzido ou adaptado na entrega atual.
- **Recomendação:** separar registros históricos, corrigir caminhos, identificar responsável, commit/PR, aproveitamento, descarte e validação objetiva.

### 2.7 Qualidade, segurança e configuração do ambiente

- **Atendido:** `.env.example` versionado e configuração centralizada; upload/troca de imagem autenticada com limite de tamanho e testes de autorização.
- **Parcialmente atendido:** o `.env.example` liga o seed, contrariando README e DEPLOY.

#### A7 — Seed contraditório entre exemplo, documentação e CI

- **Categoria:** configuração e reprodutibilidade.
- **Relevância:** média.
- **Evidência:** `README.md:47` e `docs/DEPLOY.md:28,137–139` dizem que o seed está desligado; `.env.example:7` define `APP_SEED_PROJETOS_ENABLED=True`. O CI copia o `.env.example` (`.github/workflows/ci.yml:150–153`), portanto seu comportamento padrão diverge do procedimento documentado.
- **Impacto:** ambientes criados a partir do exemplo podem iniciar com projetos fictícios quando a documentação promete banco vazio.
- **Recomendação:** escolher um padrão único, alinhar `.env.example`, README, DEPLOY e CI e registrar quando o seed é apropriado.

### 2.8 Fluxo de trabalho evidenciado no repositório

- **Atendido:** a API confirmou `main` protegida por PR, uma aprovação e oito checks obrigatórios, com checks estritos e bloqueio de deleção/non-fast-forward. O ruleset `protecao-branches-entrega` também cobre branches `entrega-*`. O PR #188 veio de `entrega-8`, foi aprovado e integrado por merge commit.
- **Parcialmente atendido:** o board (Project 34) não pôde ser confrontado integralmente pela CLI/API disponível; as issues e PRs fornecem evidência substituta. A integração ocorreu no limite do prazo, poucos minutos após a abertura do PR final (A8).

#### A8 — Integração final concentrada no limite do prazo

- **Categoria:** processo GitHub e colaboração.
- **Relevância:** média/alta.
- **Evidência:** o PR #188 foi aberto às 00h04 e integrado às 00h07 de 12/11, e a release foi publicada às 00h09 (UTC−3); esses minutos após o prazo de 11/11 foram tolerados. A documentação registra que as atividades de staging/deploy foram encerradas como não planejadas em 11/11 (`docs/sprints/sprint-4.md:46–53`).
- **Impacto:** o marco foi cumprido, mas a integração no limite reduziu o tempo disponível para revisão e validação do PR final; o encerramento das tarefas de staging/deploy na véspera indica replanejamento tardio.
- **Recomendação:** antecipar tarefas críticas, registrar impedimentos e integrar a versão avaliada dentro da janela da entrega.

### 2.9 Release/tag do marco

- **Atendido:** a API confirmou `v0.4.0` publicada às 00h09 de 12/11/2026 (UTC−3), tolerada como dentro do prazo, e apontando para `e7685a5`; a release declara a ausência de staging.
- **Parcialmente atendido:** a release não aponta para versão em staging, pois não há staging (A2).

### 2.10 Registro de contribuição individual

- **Atendido:** `docs/sprints/sprint-4.md` relata contribuições por integrante, com correspondência em commits, PRs e revisões.
- **Parcialmente atendido:** o relato inclui a exclusão de projetos entre as funcionalidades, sem endpoint correspondente (A1).

#### Análise das Contribuições Individuais

Notas de contribuição são distintas da nota coletiva. Foram considerados conteúdo, relevância, periodicidade, responsabilidade, revisão e integração — não apenas contagem de commits.

- **Bernardo Vieira de Souza:** implementou a página de detalhes com galeria, participou do backlog e das métricas e aprovou o PR #183. A contribuição é relevante e coerente com arquitetura/coordenação, mas ficou concentrada principalmente em 10–11/11, no fim da janela.

- **Gabriel Ferreira de Souza da Silva:** implementou galeria, página Sobre, CSS e correções de cadastro/login no PR #182, coerentes com frontend. Houve cinco commits e concentração entre 09–11/11, com pouca atividade incremental rastreável fora desse período. O commit `f90326d` (“apagar apenas próprios projetos”) introduz na interface a ação de exclusão sem endpoint correspondente no backend (A1), sem coordenação rastreável com a API. Aprovou os PRs #157 e #158.

- **Juliano Tavares da Silva:** realizou testes de integração de upload/troca de imagem, autorização, publicação/consulta e testes frontend; documentou execução, atualizou métricas e aprovou diversos PRs, inclusive o final. A contribuição é forte para QA e integração, embora concentrada em 11/11.

- **Marcos Júnior Lemes Ferreira:** atuou em variáveis de ambiente, CI, segurança JWT, documentação e métricas, como autor dos PRs #158, #175 e #176, além de revisão. O trabalho é relevante para infraestrutura, mas não entregou staging e ocorreu sobretudo em 09 e 11/11.

- **Pedro Henrique Bernhardt Valete:** implementou imagens padrão, troca de imagens, limite de upload, revisão do CI, métricas, riscos, qualidade e consolidação documental. A atuação foi ampla e integradora, mas concentrada no fechamento e sem superar a ausência coletiva de staging/deploy.

## 3. Critérios de Avaliação (10 pts)

### Nota da Entrega

| Critério                                                         |   Máximo |    Nota |
| ---------------------------------------------------------------- | -------: | ------: |
| Planejamento e incremento da Sprint 4                            |      1,0 |     0,6 |
| Staging ou equivalente acessível, validável e associado à versão |      2,0 |     0,2 |
| Deploy automatizado ou reprodutível e `docs/DEPLOY.md`           |      1,5 |     1,0 |
| CI mantido e atualizado, com testes e checks nos PRs             |      1,5 |     1,4 |
| Métricas, riscos, documentação, README e IA                      |      1,0 |     0,5 |
| Configuração e segurança                                         |      1,0 |     0,7 |
| Fluxo de trabalho, checks, merge e release `v0.4.0`              |      2,0 |     1,7 |
| **Total**                                                        | **10,0** | **6,1** |

### Justificativa da Nota

**Nota coletiva: 6,1/10,0.** A equipe entregou incremento funcional real, documentação local útil, Compose com persistência, testes, CI com checks obrigatórios, proteção de branches e release/tag `v0.4.0` confirmada pela API. O fluxo Git foi bem executado e as limitações de staging foram declaradas com transparência.

Apesar disso, staging acessível é o núcleo da Entrega 8. A equipe explicitamente não o entregou e o substituiu por execução local, que é reprodutível, mas não equivale a ambiente acessível (A2). A integração ficou concentrada no limite do prazo (A8), e persistem divergências de seed (A7), exclusão (A1), arquitetura (A5), reprodutibilidade (A3), registro de IA (A6) e documentação de checks (A4). A nota reconhece a qualidade do CI, da documentação local e do processo Git, sem transformar esses pontos em compensação integral do requisito de staging ausente.

### Notas Individuais

Escala 0–10, considerando conteúdo, relevância, aderência às responsabilidades, periodicidade/oportunidade, integração, revisão, comunicação e apoio aos colegas; não são proporcionais à contagem de commits.

| Integrante                         | Nota individual | Justificativa resumida                                                                                                          |
| ---------------------------------- | --------------: | ------------------------------------------------------------------------------------------------------------------------------- |
| Bernardo Vieira de Souza           |         **9,0** | Página de detalhes, backlog, métricas e aprovação do PR #183; concentração em 10–11/11.                                         |
| Gabriel Ferreira de Souza da Silva |         **8,3** | Galeria, página Sobre, CSS e correções no PR #182; pouca atividade incremental fora de 09–11/11.                                |
| Juliano Tavares da Silva           |         **9,3** | Testes de integração e frontend, documentação de execução, métricas e aprovações, inclusive do PR final; concentração em 11/11. |
| Marcos Júnior Lemes Ferreira       |         **8,7** | Variáveis de ambiente, CI, JWT, documentação e métricas (PRs #158, #175, #176); staging não entregue.                           |
| Pedro Henrique Bernhardt Valete    |         **9,0** | Imagens padrão, troca de imagens, limite de upload, CI, métricas, riscos e consolidação documental; concentração no fechamento. |

### Notas Compostas por Integrante

A nota composta da Entrega 8 combina 30% da nota coletiva e 70% da contribuição individual, com peso 10 para a entrega, em continuidade ao registro das Entregas 5–7. A média parcial está registrada em `NOTAS.md`.

`nota composta = (nota coletiva × 0,30) + (nota individual × 0,70)`

| Integrante                         | Coletiva | Individual |                              Cálculo | Nota composta |
| ---------------------------------- | -------: | ---------: | -----------------------------------: | ------------: |
| Bernardo Vieira de Souza           |      6,1 |        9,0 | `(6,1 × 0,30) + (9,0 × 0,70) = 8,13` |       **8,1** |
| Gabriel Ferreira de Souza da Silva |      6,1 |        8,3 | `(6,1 × 0,30) + (8,3 × 0,70) = 7,64` |       **7,6** |
| Juliano Tavares da Silva           |      6,1 |        9,3 | `(6,1 × 0,30) + (9,3 × 0,70) = 8,34` |       **8,3** |
| Marcos Júnior Lemes Ferreira       |      6,1 |        8,7 | `(6,1 × 0,30) + (8,7 × 0,70) = 7,92` |       **7,9** |
| Pedro Henrique Bernhardt Valete    |      6,1 |        9,0 | `(6,1 × 0,30) + (9,0 × 0,70) = 8,13` |       **8,1** |

## 4. Observações

### Observações sobre Uso de IA

**Conclusão explícita:** `USO-IA.md` é **parcialmente compatível** com os artefatos entregues. Os usos recentes de IA para Docker/Compose, frontend, GridFS, JWT, testes, métricas e documentação correspondem materialmente a arquivos existentes. Porém, há caminhos antigos ou inexistentes (`artigos`, `main.py`, `docker-compose.yaml`), entradas genéricas e registros sem vínculo consistente a commits/PRs, o que impede confirmar toda a declaração com precisão. Não foi encontrada evidência forte de uso de IA não declarado, plágio ou falsificação; o problema é de rastreabilidade e atualização documental.

### Recomendações para a Equipe

- Entregar staging acessível, com procedimento de atualização documentado; automatizar o deploy quando viável.
- Corrigir o contrato de exclusão da interface/API e alinhar o relato da sprint ao código real.
- Alinhar seed, `.env.example`, DEPLOY, README e workflow CI.
- Fixar versões das imagens, adicionar healthchecks de API/frontend e validar o fluxo completo no Compose.
- Atualizar arquitetura, ADRs, métricas e checks para refletirem o produto e a configuração reais.
- Corrigir e detalhar `USO-IA.md`, separando histórico de artefatos atuais e associando registros a commits/PRs.
- Antecipar integração, QA e documentação, evitando integrar o marco no limite do prazo.
