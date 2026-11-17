# Avaliação da Entrega 7 - Sprint 3

## Identificação

- Equipe: es2-2026_2-equipe-4
- Projeto: PublicaIFSC
- Entrega: 7 - Sprint 3
- Repositório confirmado pela configuração: `IFSC-ES2/es2-2026_2-equipe-4`
- MVP replanejado: vitrine de projetos universitários, com publicação autenticada e consulta pública.
- Escopo da Sprint 3: galeria pública, página Sobre, navegação/CSS, ampliação da listagem, arquitetura/ADRs e extração medida do armazenamento.
- Pull request final: [#155](https://github.com/IFSC-ES2/es2-2026_2-equipe-4/pull/155), de `entrega-7` para `main`, head `e9374c9`.
- Versão avaliada: `3b20a13`, merge em 23/10/2026 às 19:32:52 (UTC−3), conforme API.
- Tag/release: `v0.3.0`, apontando ao merge; publicada em 23/10/2026 às 19:46:53 (UTC−3).
- Prazo normativo: 22/10/2026

## Documentos Consultados

Somente documentos e artefatos do repositório avaliado:

- `README.md`, `USO-IA.md` e `src/frontend/README.md`.
- `.github/PULL_REQUEST_TEMPLATE.md` e `.github/ISSUE_TEMPLATE/feature.md`, `task.md` e `fix.md`.
- `.github/workflows/ci.yml` e configurações documentais associadas.
- `docs/sprints/sprint-3.md` e `docs/sprints/sprint-2.md`.
- `docs/ARQUITETURA.md`, `docs/diagramas/contexto.md` e `conteineres.md`.
- Todos os ADRs: `docs/adr/ADR-0001.md` a `ADR-0005.md`.
- `docs/REENGENHARIA.md` e `scripts/medir_armazenamento.py`.
- `docs/METRICAS.md` e todas as fichas `docs/metricas/M-01.md` a `M-08.md`.
- `docs/riscos.md`, `docs/qualidade.md`, `docs/dod.md` e `docs/fluxo-de-trabalho.md`.
- `docs/inception.md`, `docs/BASELINE.md` e `docs/ESTIMATIVAS.md`.
- `src/backend/docs/rotas-publicas-de-listagem-de-projetos.md`, `src/backend/projetos/rotas-login.md` e `rotas-de-criacao-de-contas.md`.
- Código, testes, configurações de build, Dockerfiles e `docker-compose.yml`.
- Issues #100, #111–#113, #124, #127–#138 e #146, PRs associados, especialmente #125/#141/#143–#149/#151–#155, revisões e checks.
- [Project 34](https://github.com/orgs/IFSC-ES2/projects/34), milestone Entrega 7, histórico Git, proteções e [release `v0.3.0`](https://github.com/IFSC-ES2/es2-2026_2-equipe-4/releases/tag/v0.3.0).

## 1. Descrição — Resumo da Entrega

A Sprint 3 consolida o pivô para uma vitrine de projetos universitários. Cadastro, JWT e submissão autenticada são base herdada da Sprint 2, não novos incrementos recontados. A evolução creditável é a galeria pública integrada, filtro visual por tema, API paginada com filtro por tecnologias, consulta por ID, dados de exemplo, página Sobre e navegação/CSS.

A extração de `ArmazenamentoArquivoService` trata um problema real de responsabilidades e testabilidade. Há comparação antes/depois, script de medição, testes específicos e CI verde em PR. Arquitetura de contexto/contêineres e cinco ADRs foram entregues. Não se exige um padrão OO novo apenas para recuperar o requisito da etapa anterior: a rubrica atual avalia decisões consolidadas, reengenharia e evidências próprias da Sprint 3.

As principais lacunas são arquitetura presa ao estado pré-integração, revisão documental não encerrada, cinco fichas sem coleta S3, números de qualidade sem suporte nas fichas referenciadas e exclusão aparente na galeria. Imagens recuperáveis, detalhe, busca textual e gestão de credenciais foram explicitamente adiados. O atraso é factual: o incremento funcional entrou em `entrega-7` em 22/10, mas artefatos técnicos, testes ampliados, fechamento, merge final e release foram integrados em 23/10. Não se aplica multa percentual arbitrária nem se presume prorrogação.

## 2. Itens Obrigatórios da Entrega

### 2.1 Inspeção e replanejamento da Sprint 3

- **Atendido:** `docs/sprints/sprint-3.md:5–48` identifica lacunas da Sprint 2, relaciona a meta ao MVP, métricas, riscos, capacidade/dependências e registra adiamentos. O fechamento associa itens e PRs e distingue limitações.
- **Parcialmente atendido:** formalização no último dia, depois de parte do incremento, sem nova estimativa consolidada e com fechamento posterior ao prazo.

#### A1 — Inspeção concreta, registro tardio

- **Categoria:** planejamento/requisitos.
- **Evidência:** primeiro registro formal em `86da7e0`, 22/10 às 19h36; frontend já tinha trabalho de 15/10 e backend de 19/10. `sprint-3.md:34,38,42,46` seleciona trabalho já em andamento e reconhece falta de reestimativa. O balanço final (`:56–89`) foi completado depois do prazo.
- **Impacto:** crédito por diagnóstico e recorte coerentes, mas evidência limitada de planejamento antecipado/previsibilidade. Registro tardio não prova ausência de discussão prévia.
- **Recomendação:** formalizar a inspeção/compromisso no início, revisar estimativas e concluir o planejado versus executado com corte temporal explícito.

### 2.2 Incremento funcional da Sprint 3

- **Atendido:** galeria consome backend real; filtro por tema, estados de carga/vazio/erro, navegação e Sobre estão integrados. API fornece paginação, consulta por ID e filtro por tecnologias, com testes de serviço e seed condicionado.
- **Parcialmente atendido:** há exclusão visual enganosa e integração de imagens distinta do valor real de upload; a UI carrega somente a primeira página de até 100 projetos, limitação declarada.

#### A2 — Incremento real, com limites de experiência pública

- **Categoria:** implementação/escopo.
- **Evidência:** `F/src/main.jsx:20–25` integra Projetos/Sobre; `Projetos.jsx:15–39` busca `GET /api/v1/projetos?size=100`, lê `content` e filtra localmente por tema. `J/listagens/ListagensController.java:27–46` e `ListagensService.java:41–72` implementam paginação e filtro exato por tecnologias com semântica OU. O inicializador insere 30 exemplos apenas quando a coleção está vazia e a propriedade está habilitada.
- **Impacto:** não é mock de produção nem mera página visual. Paginação na API não equivale a paginação de toda a coleção na UI. Exemplos persistidos não demonstram publicação autenticada de usuários reais e não possuem toda a autoria desse fluxo.
- **Recomendação:** manter contrato e distinção entre filtro visual/API, declarar recorte dos 100 itens e garantir ordenação estável ao evoluir paginação.

#### A3 — Exclusão aparente mesmo em falha

- **Categoria:** comportamento/validação.
- **Evidência:** `Projetos.jsx:41–67` remove o cartão tanto em sucesso quanto em erro HTTP ou falha de rede; a API não oferece DELETE de projetos, e o botão não está condicionado à titularidade. README:86 admite falta de suporte. `Projetos.test.tsx:137–171` simula 204 e deixa a preservação do cartão em falha como pendência.
- **Impacto:** não se afirma exclusão indevida do banco, mas sucesso visual sem persistência: o projeto pode reaparecer ao recarregar. Não é necessário exigir CRUD como escopo novo para avaliar a correção de uma ação exposta pela equipe.
- **Recomendação:** ocultar/identificar a ação não implementada ou manter cartão e mostrar erro em falha; testar o contrato efetivamente suportado.

#### A4 — Imagens não representam o upload real

- **Categoria:** integração/limitação funcional.
- **Evidência:** upload retorna ID GridFS (`ArmazenamentoArquivoService.java:39–43`); submissão grava IDs em `imagens`, mas a galeria os usa como `src` (`Projetos.jsx:204–212`). O teste usa URL externa fictícia, não ID produzido pelo servidor. Não existe rota de leitura.
- **Impacto:** modal testado não comprova visualização de imagens submetidas. A ausência de leitura foi explicitamente adiada e não é recontada como regressão da extração; permanece necessário não apresentar essa parte como integrada.
- **Recomendação:** alinhar representação de imagem e leitura da API ou sinalizar indisponibilidade até a entrega correspondente.

### 2.3 Documentação da arquitetura

- **Atendido:** existem visão de contexto e de contêineres, responsabilidades, dependências, comunicação, relação com MVP e diferenças do plano. React, API Spring e MongoDB/GridFS correspondem à topologia entregue.
- **Parcialmente atendido:** o documento e explicações dos diagramas retratam o estado anterior à galeria e à própria refatoração.

#### A5 — Arquitetura não consolidada no merge final

- **Categoria:** arquitetura real/documentação.
- **Evidência:** `ARQUITETURA.md:3–10,23,76–77` se anuncia como código integrado, mas declara tela não integrada e armazenamento ainda no `ProjetoService`. Diagramas referem-se a `19c53da` e mantêm essas pendências. No marco, há `/projetos` e `ProjetoService` delega ao serviço extraído (`:17–29`).
- **Impacto:** as visões e a descrição macro são substanciais, mas o requisito de refletir a arquitetura final é parcialmente atendido. Não se classifica o conjunto como ausente.
- **Recomendação:** atualizar referência, componentes/dependências e matriz planejado/implementado depois dos merges; distinguir snapshot histórico de arquitetura atual.

### 2.4 ADRs consolidados

- **Atendido:** ADRs 0001–0003 foram revisados; substituição parcial da stack está explícita, React tem decisão fundamentada e ADRs 0004/0005 registram domínio/autoria e JWT/consulta pública com contexto, alternativas, consequências e riscos.
- **Parcialmente atendido:** ADR-0001 e links de README permanecem em estado pré-integração.

#### A6 — Revisão substantiva, fechamento parcial

- **Categoria:** decisões/documentação.
- **Evidência:** `ADR-0001.md:145–154` diz que arquitetura será produzida e refatoração registrada após implementação; ambos já existem. README:87,91–93 mantém PRs como em revisão e links para branches de tarefa.
- **Impacto:** crédito pelas decisões atualizadas, sem considerar revisão plenamente consolidada. Não se exige sexto ADR apenas pela extração: REENGENHARIA e ADR-0001 justificam preservação de mecanismo/contrato e separação interna.
- **Recomendação:** reconciliar status e documentos derivados e substituir links provisórios por referências integradas.

### 2.5 Manutenção/reengenharia

- **Atendido:** problema real de mistura de dados/autoria/armazenamento, extração efetiva, PR específico #147 e testes de preservação. Não se trata de renomeação isolada.
- **Parcialmente atendido:** validação de upload usa banco simulado/MockMvc standalone; não comprova upload HTTP com segurança e GridFS real.

### 2.6 Comparação de métrica antes/depois da reengenharia

- **Atendido:** documento com valores antes/depois, script e interpretação dos trade-offs, relacionados a manutenção/confiabilidade da Entrega 4. A medida não alega redução global de CBO.
- **Parcialmente atendido:** documento não fixa hash e comandos completos da comparação, embora o histórico permita recuperar a referência anterior.

#### A7 — Extração demonstrada e medição honesta, com rastreabilidade incompleta

- **Categoria:** reengenharia/métrica.
- **Evidência:** `88c93ba`, no PR #147, extrai armazenamento para `ArmazenamentoArquivoService`, preservando validação, resposta e propagação das falhas. O pai `19c53da4be9167b7d64ab20137e1c84d5e3aea03` permite localizar o antes. `REENGENHARIA.md:19–37` registra tipos de armazenamento em `ProjetoService` **3→0**, dependências internas **5→6** e soma das classes **5→7**. `scripts/medir_armazenamento.py:21–54` aceita `--ref`, remove imports/comentários/textos e conta tipos por aproximação lexical.
- **Impacto:** melhoria de coesão/isolamento, não redução do CBO total nem da quantidade global de tipos GridFS. O aumento de ligações é reconhecido. Código/diff são compatíveis com os números, mas o script não foi executado nesta avaliação. Faltam referência anterior e comando exato no documento para a reprodução direta.
- **Recomendação:** preservar referências fixas/comandos e explicitar o alcance lexical da medida; usar o resultado para justificar o design, não inferir desempenho ou qualidade global.

Os testes do serviço extraído cobrem arquivo válido/vazio/nulo e falhas de leitura/banco; os do controller cobrem 201/400 e resposta; testes anteriores preservam autoria. O [CI de #147](https://github.com/IFSC-ES2/es2-2026_2-equipe-4/actions/runs/39893113126) executou testes backend com sucesso e quatro arquivos/14 testes frontend. A documentação reconhece corretamente que os testes locais da extração não usaram MongoDB real nem filtros de autenticação.

### 2.7 Testes automatizados integrados ao pipeline

- **Atendido:** testes versionados/relevantes, gatilho automático em PR, dependências, falha propagada e execuções verdes. A configuração foi herdada, mas executa os novos testes; não precisa ter sido reescrita para atender à etapa.

#### A8 — CI real, falha detectada e corrigida

- **Categoria:** testes/CI.
- **Evidência:** o workflow roda Gradle/Vitest sem mascaramento de falha. Run `39818876416` teve 14 testes frontend reprovados por falta de Router; correções levaram à aprovação em #145. [Run final 40033240770](https://github.com/IFSC-ES2/es2-2026_2-equipe-4/actions/runs/40033240770), do PR #155, executou `:test` backend com sucesso, **26 testes/6 arquivos frontend** e os sete checks aprovados antes do merge. No código final há **34 métodos `@Test` backend**, contagem estática, não resultado individualizado extraído do log Gradle.
- **Impacto:** integração dos testes ao pipeline comprovada, não CI nominal. O build usa `-x test`, mas existe job separado que efetivamente testa. `Enviar.contract.test.jsx` simula fetch e não é E2E real; casos de falha da exclusão e HTTP completo da nova listagem continuam recomendáveis. Não se impõe cobertura percentual mínima inexistente na rubrica para negar o atendimento do CI.
- **Recomendação:** ampliar cenários de falha/contrato e distinguir unidade, composição simulada, integração HTTP e fluxo completo com GridFS. As execuções ampliadas e o fechamento ocorreram após o prazo; esse efeito é tratado no critério do marco, sem retirar novamente todo o crédito técnico dos testes.

### 2.8 Atualização de métricas, riscos e documentação

- **Atendido:** riscos revisitados com estados e ações; README mais claro sobre o novo MVP/limitações; M-05/M-07/M-08 têm atualização S3; IA registra artefatos recentes.
- **Parcialmente atendido:** arquitetura/README/ADRs e instruções não consolidados, valores sem fonte correspondente e acompanhamento final incompleto.
- **Não atendido:** coleta S3 nas fichas M-01, M-02, M-03, M-04 e M-06.

#### A9 — Cinco fichas sem coleta e números de qualidade sem lastro indicado

- **Categoria:** métricas/documentação.
- **Evidência:** as cinco fichas citadas terminam na S2. Mesmo assim, `qualidade.md:101–102` cita cobertura **83,39%**, V(G) médio **1,35**, máximo **4** e CBO **6**, referenciando fichas que não contêm as coletas S3. `riscos.md:134` também cita cerca de 83%. O CBO da extração tem suporte no documento específico, não na ficha geral atualizada. M-05 usa oito PRs sem reconciliação explícita com todos os PRs finais; M-07 informa `VC=-1` sem contagens/item faltante; M-08 adota baseline de 21/10 para trabalho iniciado antes.
- **Impacto:** atualização parcial, não ausência total. Não se usam percentuais sem relatório como cobertura comprovada, nem se presume fabricação intencional. A falha é importante no critério de acompanhamento da Sprint 3.
- **Recomendação:** completar as fichas com período, escopo, comandos/fontes e comparação; conciliar números, planejado/realizado e corte temporal.

#### A10 — Documentos vivos e validação final parcialmente pendentes

- **Categoria:** coerência documental/IA.
- **Evidência:** README diz arquitetura/refatoração aguardarem integração; Inception mantém artigos/PDF/autenticação fora do escopo sem substituição suficientemente sinalizada; DoD e fluxo ainda citam `entrega-2`/`entrega-4` e três checks. Guias de API divergem em health check/GET público e remetem a teste manual removido. `USO-IA.md:226,231` mantém revisão/conferência pendentes; a entrada de arquitetura não identifica ferramenta.
- **Impacto:** guias úteis, mas não fotografia consolidada do merge. Credenciais, segredo JWT, CORS e outras dívidas herdadas foram explicitamente adiadas; não são recontadas como regressões causadas pela extração. A identidade/autoria da publicação foi preservada.
- **Recomendação:** revisar documentos contra o commit final, encerrar validações, corrigir referências e sinalizar conteúdo histórico/substituído.

### 2.9 Fluxo de trabalho evidenciado no repositório

- **Atendido:** `entrega-7`, branches de tarefa, PRs, revisão por colegas, checks finais verdes e merge commit. Não houve desenvolvimento direto indevido em `main` no recorte.
- **Parcialmente atendido:** integração intermediária #125 fora do gatilho de CI, aprovações anteriores ao último head em #147/#149 e prevenção incompleta dos builds/métodos.

#### A11 — Proteção conclusiva, com lacunas de abrangência

- **Categoria:** governança GitHub.
- **Evidência:** proteção clássica de `main` exige uma aprovação, `strict:true`, bloqueia exclusão/force push e obriga documentos, links, Markdown e testes backend/frontend. Builds backend/frontend executam, mas não são obrigatórios; `enforce_admins:false`, aprovações antigas não são descartadas e revisão do último push não é exigida. Ruleset ativo **20822350** cobre `entrega-*`, com os mesmos cinco checks e aprovação, sem bypass cadastrado; permite merge/squash/rebase. `rules/branches/main` retorna `[]` porque a proteção é clássica, não porque inexista proteção.
- **Impacto:** A fotografia atual não prova todo o histórico das regras. O método praticado foi merge commit e os builds finais passaram, mas não há garantia preventiva integral de todos os jobs/métodos.
- **Recomendação:** tornar builds obrigatórios, alinhar métodos à política e revalidar aprovação após push.

O PR #125 foi aprovado e integrou backend na branch das páginas, fora de `main`/`entrega-*`; por isso não teve checks automáticos. O trabalho foi depois validado no fluxo da entrega. PRs #139/#140 foram fechados sem merge e substituídos por #145, não configurando integração indevida em `main`. #147/#149 receberam aprovação antes de atualização final por merge da base, sem nova aprovação registrada. Reviews predominantemente vazios comprovam aprovação formal, não profundidade técnica.

### 2.10 Release/tag do marco

- **Atendido:** release remota e tag `v0.3.0` existem e apontam a `3b20a13`; descrição inclui incremento, arquitetura, refatoração, testes e documentação.
- **Parcialmente atendido:** ausência de limitações nas notas da release e link/marco não consolidados no documento da sprint.
- **Não atendido:** integração final e publicação dentro de 22/10.

#### A12 — Marco completo em 23/10, sem prorrogação presumida

- **Categoria:** fluxo/prazo/release.
- **Evidência:** #145 funcional entrou em `entrega-7` em 22/10 às 21h09. ADRs/arquitetura/refatoração/testes ampliados foram integrados entre 00h00 e 00h15 de 23/10; riscos/qualidade/fechamento tiveram commits após a virada e métricas em 23/10 à noite. #155 foi aprovado por Marcos às **19h32min35s**, integrado às **19h32min52s** e a release publicada por Pedro às **19h46min53s**, todos em **23/10, UTC−3**. Logo, não é apenas efeito do fuso UTC. A ausência da tag local não foi confundida com ausência remota.
- **Impacto:** o critério de fluxo/marco é parcial: havia incremento funcional no prazo, mas não entrega final integrada/publicada. O atraso e as lacunas processuais justificam redução localizada, sem multa automática em percentual, sem zerar artefatos reais nem descontar integralmente o atraso de novo em cada critério.
- **Recomendação:** reservar margem de revisão/integração e publicar marco completo com limitações dentro da data; não descrever integrações de 23/10 como anteriores ao prazo de 22/10.

### 2.11 Registro de contribuição individual

- **Atendido:** `sprint-3.md:91–103` identifica trabalhos e PRs dos cinco integrantes, em geral corroborados pelo histórico.
- **Parcialmente atendido:** aspectos de revisão/integração e trabalho posterior ao prazo precisam ser explicitados; várias tarefas técnicas não têm responsável cadastrado, e o board não acompanhou toda a execução com oportunidade.

#### A13 — Board parcial e encerramentos sem critério concluído

- **Categoria:** acompanhamento/colaboração.
- **Evidência:** Project 34 foi consultado integralmente, com 70 itens. Gabriel movimentou #111–#113 em 15/10 e para Done em 22/10 às 20h51, antes de #145 integrar. #127–#138 foram criadas em 21/10 e só adicionadas ao board em 22/10 às 19h30; várias permaneceram Todo até passagem direta a Done em 23/10, embora PRs já estivessem em andamento. #100 foi fechada apesar de credenciais ainda presentes, situação admitida pela própria sprint. #146 pede oito fichas, mas cinco continuam sem coleta. Milestone permanece aberta; #124/#146 não estão no conjunto atual, embora haja evento histórico de #146.
- **Impacto:** há uso real, mas estado atual não comprova atendimento dos critérios no prazo. Não se presume inexistência histórica de item ausente hoje nem falsificação intencional de fechamento.
- **Recomendação:** atualizar progresso durante a execução e reconciliar aceitação, PR/CI e cartões antes de fechar tarefas/marco.

#### Análise das Contribuições Individuais

No intervalo `0ee474a..3b20a13`, excluindo merges e trabalho de avaliação do professor, há **29 commits não merge**: Bernardo 8, Marcos 5, Juliano 7, Pedro 5 e Gabriel 4. Aliases/e-mails foram consolidados. Contagens são descritivas: revisões/integrações e conteúdo pesam mais que volume, e não se transportam julgamentos da Sprint 2.

- **Bernardo Vieira de Souza:** oito commits em 22/10 aproximadamente entre 20h06 e 23h32: revisão/novas ADRs, C4/arquitetura, extração/testes/script/métrica e README, PRs #143/#144/#147–#149. Aprovou #141. É contribuição técnica elevada e ligada às exigências desta etapa, não participação apenas documental. Entretanto, concentrada no último período e integrada após o prazo; arquitetura/README não foram reconciliados e M-01/M-04 sob sua responsabilidade não receberam coleta S3. Isso limita oportunidade de revisão conjunta, sem provar ausência de trabalho externo ou causa exclusiva do atraso.

- **Marcos Júnior Lemes Ferreira:** API pública, paginação, tecnologia, detalhe, seed/testes/documentação em 19/10, PR #125 incorporado ao incremento #145. A dependência do frontend foi disponibilizada antes do fechamento. Cinco commits incluem a reformulação de M-02 em 22/10, que não equivale a coleta S3. Aprovou/integrou #145 e #155; revisão cruzada e entrega funcional substantivas. Perdas por integração intermediária sem CI e métrica incompleta, sem recontar cadastro/JWT da etapa anterior.

- **Juliano Tavares da Silva:** adaptou testes de cadastro/login/submissão e contrato, corrigiu contexto de Router, acrescentou sete casos Projetos/cinco Sobre e apoiou integração de telas. Abriu #145/#151 e revisou/integrou #152–#154. O CI saiu de falha real para 14 aprovados e, depois, 26. Trabalho de implementação em 22/10, com dois commits após a virada e revisões finais em 23/10. Perdas por concentração/validação tardia, falha de exclusão não coberta e ausência de coleta M-03/M-06 sob QA; o head final não permaneceu com testes quebrados.

- **Pedro Henrique Bernhardt Valete:** aprovou #125 e seis PRs técnicos #143/#144/#147–#149/#151, realizou sincronizações/merges, planejamento, riscos/qualidade, fechamento/métricas, PR #155 e publicação. Cinco commits próprios não representam sozinhos essa carga. Porém o planejamento formal entrou em 22/10 às 19h36, três commits são de 23/10, como release/fechamento; board tardio, #100 fechada sem mitigação e fichas faltantes limitam a completude da coordenação. Há concentração de integração nele, não prova de que tenha absorvido tarefas deliberadamente abandonadas nem causa exclusiva do atraso final.

- **Gabriel Ferreira de Souza da Silva:** páginas Projetos/Sobre, CSS, mapa, navegação e integração; commits funcionais distribuídos em 15, 20 e 21/10, M-07 em 22/10. Melhor distribuição temporal rastreável entre implementadores desta sprint; movimentou tarefas no board. Conteúdo substancial apesar de quatro commits. Perdas por lote inicial grande, encaminhamento de PR corrigido, ausência de aprovação de colega no conjunto consultado, exclusão visual enganosa e testes incompatíveis que exigiram apoio de Juliano. Não se conclui baixa contribuição pela contagem pequena.

**Fatos, relatos e limites:** o portfólio geral é compatível com autoria/PRs. Apoio de Juliano à suíte da interface e integração/revisões de Pedro são comprovados. Não há registros suficientes de impedimentos e causas pessoais para imputar abandono ou horas perdidas a um indivíduo. Falta de comentários detalhados não prova falta de comunicação privada. O efeito da concentração final é a menor margem observável para revisão/estabilização, não presunção de inatividade durante dias sem commits.

## 3. Critérios de Avaliação (10 pts)

### Nota da Entrega

| Critério | Máximo | Nota |
|---|---:|---:|
| Inspeção e replanejamento | 1,0 | 0,8 |
| Incremento funcional da Sprint 3 | 1,5 | 1,2 |
| Arquitetura real documentada | 1,5 | 1,0 |
| ADRs revisados e consolidados | 1,0 | 0,8 |
| Reengenharia, PR e métrica antes/depois | 1,5 | 1,3 |
| Testes automatizados integrados ao CI | 1,0 | 1,0 |
| Métricas, riscos, documentação, README e IA | 1,0 | 0,4 |
| Fluxo de trabalho, checks, merge e release | 1,5 | 0,9 |
| **Total** | **10,0** | **7,4** |

### Justificativa da Nota

**Nota coletiva: 7,4/10,0.** Há incremento central integrado, inspeção específica, duas visões arquiteturais, decisões fundamentadas e extração real com métrica/testes, além de CI efetivo que detectou falha e executou as suítes corrigidas em PR. Esses méritos não são apagados pela ausência local de tag, por limites de cobertura ou pela existência de um job de build que pula testes enquanto outro os executa.

As perdas principais são arquitetura/documentação não consolidadas como fotografia final, cinco fichas sem coleta S3 e valores de qualidade sem lastro nas referências, exclusão visual sem contrato real, planejamento/board tardios e marco concluído após o prazo. O critério de testes/CI recebe crédito integral por seus requisitos observáveis; não se inventa cobertura mínima. A redução temporal/processual fica concentrada no critério do marco, sem percentual automático nem dupla perda integral em todos os demais itens.

Não se exige busca/imagens/detalhe que foram replanejados, nem se reavalia a Sprint 2. As credenciais e outras dívidas herdadas são reconhecidas como riscos ainda ativos, não regressões da extração. A coesão melhorou, mas o CBO interno aumentou, trade-off corretamente informado. A nota reflete qualidade e verificabilidade dos artefatos, não apenas sua existência nominal.

### Notas Individuais

Notas da contribuição observável nesta sprint, independentes da nota coletiva e da contagem de commits. Consideram relevância/resultado, responsabilidade, periodicidade/oportunidade, revisão, integração, comunicação e apoio. Evidências contemporâneas adicionais ou defesa podem fundamentar revisão, sem atribuição retroativa de autoria.

| Integrante | Nota individual | Justificativa resumida |
|---|---:|---|
| Bernardo Vieira de Souza | **7,5** | Arquitetura, ADRs, extração/testes e README substantivos; concentração final, arquitetura não reconciliada e métricas de sua área sem coleta. |
| Marcos Júnior Lemes Ferreira | **8,0** | API/seed/testes disponibilizados antes do fechamento e revisão de entregas; PR intermediário sem CI e M-02 sem coleta S3. |
| Juliano Tavares da Silva | **7,5** | Correção/ampliação real da suíte e apoio à integração; atividade no limite/após o prazo e métricas de QA incompletas. |
| Pedro Henrique Bernhardt Valete | **7,0** | Revisões/integração, planejamento e fechamento relevantes; formalização tardia, fechamento após o prazo e aceitação de acompanhamento incompleto. |
| Gabriel Ferreira de Souza da Silva | **8,0** | Incremento visual central em três dias e progresso rastreável; limitações de revisão cruzada, ação de exclusão e apoio necessário para ajustar testes. |

### Notas Compostas por Integrante

Seguindo o modelo de registro solicitado pelo professor, combina-se **30% da coletiva e 70% da contribuição individual**; os critérios técnicos continuam exclusivamente os da rubrica normativa.

`nota composta = (nota coletiva × 0,30) + (nota individual × 0,70)`

| Integrante | Coletiva | Individual | Cálculo | Nota composta |
|---|---:|---:|---:|---:|
| Bernardo Vieira de Souza | 7,4 | 7,5 | `(7,4 × 0,30) + (7,5 × 0,70) = 7,47` | **7,5** |
| Marcos Júnior Lemes Ferreira | 7,4 | 8,0 | `(7,4 × 0,30) + (8,0 × 0,70) = 7,82` | **7,8** |
| Juliano Tavares da Silva | 7,4 | 7,5 | `(7,4 × 0,30) + (7,5 × 0,70) = 7,47` | **7,5** |
| Pedro Henrique Bernhardt Valete | 7,4 | 7,0 | `(7,4 × 0,30) + (7,0 × 0,70) = 7,12` | **7,1** |
| Gabriel Ferreira de Souza da Silva | 7,4 | 8,0 | `(7,4 × 0,30) + (8,0 × 0,70) = 7,82` | **7,8** |

## 4. Observações

### Observações sobre Uso de IA

`USO-IA.md:196–243` declara Copilot, ChatGPT, Claude e Codex para listagem/seed/testes, mapa/galeria, ajustes da suíte, planejamento, arquitetura/ADRs e extração/medição. Os artefatos foram encontrados: classes e testes de listagens, Compose, páginas/componentes, suítes, cinco ADRs, serviços, script e documento de reengenharia. O apoio substancial é explicitado, incluindo geração de testes e auxílio na lógica, não reduzido indevidamente a formatação. Existe declaração geral de responsabilidade.

As execuções remotas e aprovações sustentam intervenção humana e parte da validação, mas não eliminam as seguintes divergências:

- Caminhos recentes usam `src/backend/projeto` no singular e omitem `src` em mapa; correspondentes existem nos caminhos atuais, portanto não são artefatos fictícios.
- Entrada de arquitetura não identifica ferramenta explicitamente, requisito mínimo do protocolo.
- Extração mantém “revisão da equipe pendente” e arquitetura mantém revisão/conferência pós-refatoração pendentes, em tensão com a declaração geral de validação integral. Os documentos finais ainda incorretos corroboram revisão não consolidada, mesmo havendo aprovação formal de PR.
- “13 testes antes/21 depois” são resultados declarados de uma execução local específica, não certificados por esta análise; CI confirma execução posterior, com outro escopo. “2 testes do frontend” parece significar dois arquivos/suítes, pois o mesmo registro detalha 7+5 casos; é ambiguidade, não evidência de fraude.
- Fontes históricas `artigos`/`Front-end` têm correspondentes renomeados; não se presume uso oculto por mudança de caminho ou estilo. A origem dos pacotes reaproveitados de contas/login continua uma lacuna histórica de rastreabilidade a esclarecer, sem prova de plágio e sem tratá-la como nova autoria da Sprint 3.

**Conclusão explícita:** uso de IA **majoritariamente compatível com os artefatos e os tipos de apoio**, mas **parcialmente conforme na identificação de ferramenta, referências e consolidação da validação final**. Não há evidência concreta suficiente de apoio oculto relevante, falsificação, plágio ou autoria indevida. Estilo textual/volume de código não foram usados como prova; compreensão e responsabilidade técnica devem ser verificadas na defesa.

### Recomendações para a Equipe

- Consolidar arquitetura, diagramas, README e ADRs após todos os merges, com referências aos arquivos integrados.
- Completar as oito fichas S3 e reconciliar números de qualidade, cronograma e escopo com fontes/comandos/corte temporal claros.
- Planejar, distribuir e integrar com antecedência, mantendo board e critérios de aceitação sincronizados com revisão/CI/merge.
- Remover ou corrigir a exclusão aparente, preservando cartão em falha e testando o contrato real.
- Alinhar IDs de imagens à futura leitura da API; não tratar modal com URL fictícia como prova de imagem submetida recuperável.
- Registrar hashes e comandos exatos antes/depois da extração e preservar a interpretação honesta do aumento do CBO interno.
- Garantir CI nas integrações intermediárias relevantes, builds obrigatórios e aprovação do estado final.
- Atualizar guias/artefatos históricos e encerrar revisão de IA, com ferramenta e validação por registro.
- Publicar tag/release e fechamento completo no prazo, incluindo limitações conhecidas e pendências.
