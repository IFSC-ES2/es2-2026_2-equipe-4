# Avaliação da Entrega 5 - Sprint 1

## Identificação

- Equipe: es2-2026_2-equipe-4
- Projeto: PublicaIFSC
- Entrega: 5 - Sprint 1
- MVP declarado: submissão de artigo com metadados e PDF, armazenamento seguro e listagem pública pesquisável.
- Vertical slice declarado: submissão de artigo e PDF, integrando formulário React, API Spring Boot e persistência MongoDB/GridFS.
- Versão avaliada: tag `v0.1.0`, commit `74be9d8`, resultante do PR #84.
- Data prevista: 17/09/2026.

## Documentos Consultados

- `README.md`.
- `USO-IA.md`.
- `.github/PULL_REQUEST_TEMPLATE.md`.
- `.github/ISSUE_TEMPLATE/feature.md`.
- `.github/ISSUE_TEMPLATE/task.md`.
- `.github/ISSUE_TEMPLATE/fix.md`.
- `.github/workflows/ci.yml`.
- `.markdownlint.jsonc`.
- `docker-compose.yml`.
- `docs/inception.md`.
- `docs/dod.md`.
- `docs/BASELINE.md`.
- `docs/ESTIMATIVAS.md`.
- `docs/METRICAS.md`.
- `docs/metricas/M-01.md` a `docs/metricas/M-08.md`.
- `docs/adr/ADR-0001.md` a `docs/adr/ADR-0003.md`.
- `docs/riscos.md`.
- `docs/fluxo-de-trabalho.md`.
- `docs/qualidade.md`.
- `docs/sprints/sprint-1.md`.
- Issues e pull requests da Sprint 1.
- Histórico Git, código-fonte, testes, proteção de branches, ruleset, tag e release do repositório.

## Resumo da Entrega

A equipe entregou um primeiro incremento funcional coerente com o MVP. O fluxo permite preencher metadados e selecionar um PDF no frontend React, enviar o arquivo e os dados à API Spring Boot e persisti-los no MongoDB, usando GridFS para o PDF e uma coleção para os metadados vinculados pelo identificador do arquivo.

Em cópia temporária do commit avaliado, cinco testes do backend e três testes do frontend passaram. O build de produção do frontend também passou. Com MongoDB iniciado pelo Docker Compose, foi possível iniciar a API, enviar um PDF, persistir os metadados e confirmar que o identificador do arquivo foi gravado no documento correspondente. O lint do frontend, porém, apresentou quatro erros no arquivo de testes.

O PR final #84 foi aberto, aprovado e integrado em 17/09/2026 às 23:53, por merge commit. Os cinco checks obrigatórios passaram. A tag aponta para o merge final e a release foi publicada às 23:58, dentro do prazo. A API confirmou proteção efetiva da `main` e ruleset ativo para `entrega-*`, ambos exigindo PR, uma aprovação e os cinco checks configurados.

As principais perdas são de acabamento e rastreabilidade: poucos testes e ausência de integração automatizada com MongoDB/GridFS, risco de arquivo órfão no fluxo em duas requisições, validações insuficientes no backend, métricas parcialmente frágeis, placeholders no fechamento e documentação antiga em conflito com a adoção do React.

## Critérios Atendidos

- O planejamento registra meta, item selecionado, justificativa, capacidade, decisões e ajuste de escopo.
- A submissão de artigo era o item de maior prioridade na baseline e é pré-condição para listagem e busca.
- O incremento atravessa interface, API, lógica e persistência real.
- O PDF é armazenado em GridFS e seu identificador é associado aos metadados do artigo.
- O formulário React valida campos obrigatórios e extensão do arquivo.
- Há testes automatizados versionados para o serviço backend e para o formulário frontend.
- Os cinco testes backend e os três testes frontend passaram em execução independente.
- O README contém instruções para iniciar banco, backend, frontend e testes.
- As oito métricas possuem coleta referente à Sprint 1.
- As contribuições dos cinco integrantes estão registradas e são confirmadas por commits e PRs.
- O desenvolvimento foi consolidado em `entrega-5` e integrado à `main` pelo PR #84.
- O PR final teve aprovação humana, cinco checks verdes e integração por merge commit.
- A proteção da `main` e o ruleset de `entrega-*` exigem PR, uma aprovação e os checks documentais e técnicos.
- A tag e a release `v0.1.0` existem, apontam para o commit avaliado e foram publicadas dentro do prazo.
- O uso de IA foi declarado para os principais artefatos apoiados por Claude, ChatGPT, Codex e Gemini.

## Critérios Parcialmente Atendidos

- O planejamento é completo, mas a implementação da issue #18 ampliou em 100% a quantidade de itens originalmente planejados para a sprint.
- O incremento funciona, mas utiliza duas requisições independentes: se a persistência dos metadados falhar após o upload, o PDF permanece órfão no GridFS.
- A validação de PDF ocorre principalmente no frontend; o backend aceita conteúdo com tipo e extensão não verificados e não limita tamanho.
- Os testes são relevantes, mas totalizam apenas oito casos e não cobrem controller, payload real, CORS, falha entre as duas requisições ou persistência integrada em MongoDB/GridFS.
- A cobertura de 64,20% foi registrada, mas o snapshot não contém configuração ou relatório versionado que permita reproduzir diretamente esse percentual.
- O backlog, as métricas e as contribuições são rastreáveis, mas a issue principal #17 foi fechada com critérios de aceitação ainda desmarcados.
- O board é referenciado, mas não pôde ser consultado porque o token disponível não possui o escopo `read:project`.
- O CI executa testes, mas não executa build de produção do frontend, build completo do backend ou lint JavaScript.
- O `USO-IA.md` é materialmente compatível, porém contém artefatos com caminhos imprecisos, um registro sem data e validações pouco específicas.
- O documento de fechamento contém placeholders para o PR e a release, embora ambos existam.

## Critérios Não Atendidos

- O lint do frontend não passa no snapshot: há quatro erros de variáveis globais não definidas em `Enviar.test.jsx`.
- `docs/qualidade.md` ainda afirma que a migração para React foi cogitada e descartada, contradizendo a ADR-0003, o código e o README.
- `docs/fluxo-de-trabalho.md` ainda identifica `entrega-4` como etapa corrente e descreve somente três checks, embora cinco fossem obrigatórios no marco.
- `docs/dod.md` mantém referência fixa à branch `entrega-2`.
- `docs/sprints/sprint-1.md` não substituiu os placeholders pelos links reais do PR #84 e da release `v0.1.0`.

## Achados com Evidências

- **Planejamento e MVP:** `docs/sprints/sprint-1.md` registra meta, issue #17, prioridade, capacidade e decisões. Há evidência forte de planejamento coerente. Recomendação: manter o mesmo nível de justificativa nas sprints seguintes.
- **Ajuste de escopo:** a issue #18 foi incorporada para garantir persistência real, e M-08 registra variação de 100%. O ajuste fortaleceu o slice, mas indica planejamento inicial incompleto. Recomendação: explicitar dependências técnicas antes de fechar o backlog da sprint.
- **Vertical slice:** `Enviar.jsx`, `ArquivoController`, `ArquivoService`, repository e DTO implementam o fluxo completo, comprovando incremento real e utilizável. Recomendação: automatizar um teste de ponta a ponta do fluxo principal.
- **Execução:** upload e metadados foram persistidos em MongoDB/GridFS, e o campo `caminhoArquivo` recebeu o ID real do PDF. Isso confirma o funcionamento da integração e da propriedade `spring.mongodb.uri`. Recomendação: registrar smoke test semelhante no CI.
- **Consistência:** o frontend faz `POST /upload` e depois `POST /metadados`, sem compensação caso a segunda chamada falhe. Isso pode deixar arquivo órfão e estado parcial. Recomendação: criar endpoint único ou mecanismo transacional/compensatório.
- **Validação:** `ArquivoService` valida somente arquivo vazio e título; não valida tipo, extensão, tamanho ou listas obrigatórias. Clientes podem contornar as validações do frontend. Recomendação: repetir regras essenciais no backend e padronizar erros.
- **Testes:** cinco testes backend e três frontend passaram, e o frontend usa mocks para as duas chamadas HTTP. O requisito mínimo é atendido, mas com cobertura comportamental limitada. Recomendação: cobrir controller, payload, erros HTTP, MongoDB/GridFS e fluxo parcial.
- **Lint e dependências:** `npm run build` passou, `npm run lint` falhou com quatro erros e a auditoria npm encontrou duas vulnerabilidades altas. Isso reduz a qualidade estática e indica risco de dependências. Recomendação: corrigir a configuração de globais do Vitest e revisar dependências.
- **CI:** o PR #84 teve cinco checks verdes, mas os jobs técnicos executam apenas testes. O fluxo está protegido, porém não garante build de produção nem lint JS. Recomendação: adicionar build e lint como etapas dos checks obrigatórios.
- **Métricas:** M-03 registra 64,20%; M-05 registra cerca de 40% de retrabalho; e M-08 registra 100% de variação de escopo. Há coleta e análise úteis, mas faltam evidências reproduzíveis para parte dos valores. Recomendação: versionar relatórios e registrar comandos, período e cálculo.
- **Fechamento:** `docs/sprints/sprint-1.md` manteve `[link da release]` e `[link do PR]`. Isso reduz a rastreabilidade documental do marco. Recomendação: finalizar links e status antes da criação da tag.
- **Documentação:** `docs/qualidade.md` diz que React foi descartado, enquanto ADR-0003 e código confirmam a adoção. Há contradição arquitetural. Recomendação: revisar documentos impactados por cada ADR.
- **Board:** o Project #34 não pôde ser lido por ausência de `read:project`. O estado histórico do quadro não foi verificável. Recomendação: manter evidência exportável do board no fechamento.
- **Fluxo Git:** o PR #84, merge `74be9d8`, teve aprovação de Juliano e cinco checks verdes às 23:53. O fluxo normativo foi completamente atendido. Recomendação: preservar antecedência suficiente para revisão menos apressada.
- **Proteção:** a API confirmou proteção da `main` e ruleset sem bypass para `entrega-*`, com uma aprovação e cinco checks. O enforcement é efetivo e conclusivo; não foi necessário consultar o professor. Recomendação: acrescentar build e lint aos checks técnicos.
- **Uso de IA:** os artefatos declarados existem em sua maioria, mas `sprint-1.mds` e os caminhos `Front-end/...` não correspondem exatamente à árvore. Há compatibilidade geral, com precisão documental parcial. Recomendação: informar caminho exato, data, responsável, conteúdo aproveitado e validação por registro.

## Análise das Contribuições Individuais

- **Bernardo Vieira de Souza:** realizou seis commits não relacionados a merges, considerando as identidades vinculadas à conta `BeVieiraSouza`; foi autor do PR #72, com formulário, validações e layout responsivo da submissão; incluiu os testes frontend no CI; coletou NCLOC/CBO; e aprovou os PRs #64, #69, #70 e #80. A contribuição é relevante em frontend, processo e revisão. A atuação arquitetural é menos evidente que a implementação, e a ADR principal da mudança de frontend foi produzida por Gabriel.
- **Marcos Júnior Lemes Ferreira:** realizou doze commits não relacionados a merges; foi autor dos PRs #65 e #76; inicializou o backend Spring Boot, Docker Compose/MongoDB e upload; corrigiu o armazenamento em GridFS; coletou a métrica de complexidade; e aprovou o PR #74. A atuação técnica é substancial e parcialmente coerente com DevOps/Infra. O ambiente Docker da sprint continha apenas o banco, e backend e frontend ainda dependiam de execução manual.
- **Juliano Tavares da Silva:** realizou doze commits não relacionados a merges, somando as identidades vinculadas à conta `JulianoTavaresDaSilva`; foi autor do PR #80; implementou as suítes de testes backend e frontend; ajustou CI, propriedade MongoDB e teste de contexto; coletou as métricas M-03 e M-06; e aprovou os PRs #78, #81 e #84, incluindo o PR final. A atuação é ampla e diretamente coerente com QA. A suíte ainda era pequena e o lint frontend não passava no marco.
- **Pedro Henrique Bernhardt Valete:** realizou quinze commits não relacionados a merges e oito PRs da Sprint 1; atuou no planejamento e fechamento, persistência dos metadados, vínculo com GridFS, CORS, README, métricas e integração final; foi autor dos PRs #64, #70, #73, #78, #81, #82, #83 e #84; e aprovou os PRs #63, #65, #72 e #76. Foi a participação mais ampla da equipe, coerente com DBA e Scrum Master. O fechamento sob sua responsabilidade manteve placeholders e documentos desatualizados.
- **Gabriel Ferreira de Souza da Silva:** realizou quatro commits não relacionados a merges, considerando as identidades `Trighy`, `Gabriel` e `Gabriel F.`; foi autor dos PRs #63, #69 e #74; produziu a ADR-0003; inicializou o frontend React; integrou frontend e API; coletou a métrica M-07; e aprovou os PRs #73, #82 e #83. A atuação é coerente com frontend e inclui participação efetiva em revisão. A ADR-0003 é superficial e não compara adequadamente alternativas.
- **Identidades e limitações de autoria:** Bernardo aparece como `BeVieiraSouza`, com e-mail institucional e endereço `noreply`; Marcos como `marcos-j-lemes` / `Marcos Júnior Lemes ferreira`; Juliano como `JulianoTavaresDaSilva` e `Juliano Tavares`; Pedro como `pedrovalete` / `Pedro Valete`; e Gabriel como `Trighy`, `Gabriel` e `Gabriel F.`. As notas consideram conteúdo, issues, PRs, revisões, documentos e coerência com os papéis, e não apenas quantidade de commits.

## Notas Individuais

As notas abaixo avaliam a contribuição individual observável e são independentes da nota coletiva da entrega.

| Integrante | Nota individual |
|---|---:|
| Bernardo Vieira de Souza | **8,5** |
| Marcos Júnior Lemes Ferreira | **8,8** |
| Juliano Tavares da Silva | **9,5** |
| Pedro Henrique Bernhardt Valete | **9,8** |
| Gabriel Ferreira de Souza da Silva | **9,0** |

- **Bernardo - 8,5:** contribuição relevante em frontend, testes, CI, métricas e reviews; a atuação arquitetural foi menos evidente que a implementação.
- **Marcos - 8,8:** contribuição técnica substancial em backend, banco, upload, GridFS, métrica e review; o ambiente Docker ainda cobria somente o banco.
- **Juliano - 9,5:** atuação ampla e coerente com QA em testes, CI, métricas e reviews; a suíte ainda era pequena e o lint não passava.
- **Pedro - 9,8:** participação mais ampla da equipe em planejamento, persistência, documentação, métricas, integração e reviews; o fechamento manteve placeholders e documentos desatualizados.
- **Gabriel - 9,0:** contribuição efetiva em ADR, frontend, integração, métrica e reviews; a ADR produzida compara alternativas de forma superficial.

## Notas Compostas por Integrante

As notas compostas combinam 30% da nota coletiva da entrega e 70% da nota individual de contribuição:

`nota composta = (nota coletiva × 0,30) + (nota individual × 0,70)`

| Integrante | Nota coletiva | Nota individual | Cálculo | Nota composta |
|---|---:|---:|---:|---:|
| Bernardo Vieira de Souza | 8,6 | 8,5 | `(8,6 × 0,30) + (8,5 × 0,70) = 8,53` | **8,5** |
| Marcos Júnior Lemes Ferreira | 8,6 | 8,8 | `(8,6 × 0,30) + (8,8 × 0,70) = 8,74` | **8,7** |
| Juliano Tavares da Silva | 8,6 | 9,5 | `(8,6 × 0,30) + (9,5 × 0,70) = 9,23` | **9,2** |
| Pedro Henrique Bernhardt Valete | 8,6 | 9,8 | `(8,6 × 0,30) + (9,8 × 0,70) = 9,44` | **9,4** |
| Gabriel Ferreira de Souza da Silva | 8,6 | 9,0 | `(8,6 × 0,30) + (9,0 × 0,70) = 8,88` | **8,9** |

As notas compostas da Entrega 5 são: Bernardo **8,5**; Marcos **8,7**; Juliano **9,2**; Pedro **9,4**; Gabriel **8,9**.

Todos os integrantes possuem contribuição substancial e rastreável. Pedro apresenta a participação mais ampla em planejamento, persistência, documentação, métricas, revisão e integração. Juliano se destaca em testes, CI e revisões, de forma diretamente coerente com QA. Gabriel liderou a base React e sua integração; Marcos estruturou backend, banco e upload; Bernardo entregou o formulário e participou de CI, métricas e revisões. As diferenças refletem amplitude, qualidade, responsabilidade assumida e limitações observadas em cada conjunto de artefatos.

## Recomendações para a Equipe

- Tornar atômico ou compensável o salvamento do PDF e dos metadados.
- Repetir no backend as validações essenciais de tipo, tamanho e campos obrigatórios.
- Ampliar testes de controller, integração MongoDB/GridFS e falhas entre as duas requisições.
- Incluir build e lint nos checks técnicos obrigatórios.
- Corrigir o lint frontend e revisar vulnerabilidades das dependências npm.
- Versionar relatórios ou comandos que sustentem as métricas coletadas.
- Atualizar `docs/qualidade.md`, `docs/fluxo-de-trabalho.md` e `docs/dod.md` para o estado real.
- Substituir placeholders pelos links reais antes da criação da tag.
- Manter issues e critérios de aceitação sincronizados com o estado concluído.
- Padronizar o registro de IA com data, caminho exato, conteúdo aproveitado e validação específica.

## Nota da Entrega

| Critério | Máximo | Nota |
|---|---:|---:|
| Planejamento inicial da Sprint 1 | 1,0 | 0,9 |
| Primeiro incremento funcional como vertical slice | 2,0 | 1,7 |
| Testes de unidade automatizados | 1,5 | 1,3 |
| Escopo, backlog, board, métricas e contribuições | 1,5 | 1,2 |
| Fluxo de trabalho | 2,0 | 2,0 |
| README, documentação, uso de IA e release | 2,0 | 1,5 |
| **Total** | **10,0** | **8,6** |

## Justificativa da Nota

A equipe atendeu muito bem ao núcleo da Entrega 5: planejou um slice prioritário, implementou interface, API e persistência real, produziu testes automatizados, atualizou métricas e contribuições, aplicou fluxo protegido com aprovação e checks e publicou a release correta dentro do prazo. A nota não é máxima pela fragilidade do fluxo em duas requisições, pelas validações limitadas no backend, pela suíte pequena e sem integração real, pelo lint com falha e pelas inconsistências documentais do fechamento. Essas lacunas reduzem maturidade e rastreabilidade, mas não descaracterizam o incremento funcional.

## Observações sobre Uso de IA

O `USO-IA.md` declara, durante a Sprint 1, Claude para DTOs, configuração Spring, Docker/MongoDB, persistência, CORS, README e fechamento; ChatGPT para dropzone e integração frontend/backend; Codex para formulário, layout e métricas; Gemini para CI e testes backend; além de ChatGPT para `main.py`. Os DTOs, propriedades, Compose, serviço, formulário, CORS, testes, workflow, métricas, README e script existem no snapshot e correspondem materialmente às finalidades declaradas.

A rastreabilidade apresenta problemas formais: um registro de ChatGPT não possui data; há erros como `Artefats` e `Ferramente`; `Front-end/...` não é o caminho real `src/frontend/...`; e `sprint-1.mds` não existe, sendo provável referência a `docs/sprints/sprint-1.md`. A validação do registro de Codex afirma que lint e build passaram, mas no estado final o build passa e o lint falha por erros no arquivo de testes incorporado posteriormente. Isso não invalida necessariamente a validação feita na data do registro, mas demonstra que ela não representa a qualidade final do marco.

**Conclusão explícita:** o conteúdo declarado em `USO-IA.md` é **majoritariamente compatível** com os artefatos entregues e com o tipo de apoio observado. Há divergências formais de caminho, data e nome de arquivo, além de validações que não são sempre reproduzíveis no estado final. Não foram encontrados indícios fortes de artefatos apoiados por IA sem declaração correspondente.
