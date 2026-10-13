# Avaliação da Entrega 4 - Riscos e Consolidação

## Identificação

- Equipe: es2-2026_2-equipe-4
- Projeto: PublicaIFSC
- Entrega: 4 - Riscos e Consolidação
- Data prevista da entrega: 03/09/2026
- Pull request avaliado: PR #53, branch `entrega-4` para `main`
- Versão considerada: `origin/main` no commit `094b9b9`

## Documentos Consultados

- `README.md` da equipe.
- `USO-IA.md` da equipe.
- `.github/PULL_REQUEST_TEMPLATE.md`.
- `.github/ISSUE_TEMPLATE/feature.md`.
- `.github/ISSUE_TEMPLATE/task.md`.
- `.github/ISSUE_TEMPLATE/fix.md`.
- `.github/workflows/ci.yml`.
- `.markdownlint.jsonc`.
- `docs/inception.md`.
- `docs/dod.md`.
- `docs/BASELINE.md`.
- `docs/ESTIMATIVAS.md`.
- `docs/METRICAS.md`.
- `docs/adr/ADR-0001.md`.
- `docs/adr/ADR-0002.md`.
- `docs/riscos.md`.
- `docs/fluxo-de-trabalho.md`.
- `docs/qualidade.md`.
- Issues GitHub #40, #41, #42, #43, #44 e #45.
- Pull requests GitHub #46, #47, #48, #50, #51, #52 e #53.
- Histórico Git local e remoto.

## Resumo da Entrega

A equipe entregou os artefatos centrais da Entrega 4: registro de riscos, análise e priorização, plano de resposta, documentação de fluxo de trabalho, template de Pull Request, critérios iniciais de qualidade, relação entre riscos e qualidade, atualização do README, atualização do `USO-IA.md` e CI mínimo executando em pull requests.

O MVP declarado para o PublicaIFSC permanece enxuto e coerente: submissão de artigo com metadados e PDF, persistência, armazenamento seguro, listagem pública, busca simples e visualização dos dados do artigo com acesso ao PDF. A entrega reforça bem a governança do repositório, com PRs internos para `entrega-4`, PR final para `main`, aprovações formais, checks executados com sucesso, proteção da `main` e ruleset ativo para branches `entrega-*`.

As principais ressalvas são o pequeno atraso na integração final, dois riscos ainda com responsável placeholder, inconsistência entre a lista de riscos de alta prioridade e os riscos destacados como mais críticos, e rastreabilidade incompleta no README e no PR final, que não mencionam claramente o PR #53 como evidência de integração da etapa.

## Critérios Atendidos

- O arquivo `docs/riscos.md` foi criado e contém mais de cinco riscos relevantes.
- Os riscos cobrem naturezas diferentes: escopo, prazo, equipe, tecnologia e qualidade/processo.
- O registro de riscos inclui identificação, descrição, causa, consequência/impacto esperado, probabilidade, impacto, prioridade, estratégia de mitigação e responsável.
- A análise de riscos define critérios para probabilidade e impacto e apresenta matriz de priorização.
- O plano de resposta aos riscos contém ações preventivas, ações de contingência e forma de acompanhamento ao longo do projeto.
- O arquivo `docs/fluxo-de-trabalho.md` formaliza branches de entrega, branches de trabalho, integração por pull request, revisão por outro integrante, aprovação mínima, proibição de commit direto na `main`, checklist de PR e checks obrigatórios.
- O template de Pull Request existe e contém checklist mínimo de revisão.
- O CI mínimo está implementado em `.github/workflows/ci.yml`, com jobs `Documentos obrigatórios`, `Links internos` e `Lint Markdown`.
- O CI executa em pull requests para `main` e para branches `entrega-*`.
- A branch `main` está protegida com uma aprovação obrigatória e os checks `Documentos obrigatórios`, `Links internos` e `Lint Markdown`.
- Há ruleset ativo para branches `entrega-*`, exigindo pull request, uma aprovação e os três checks obrigatórios.
- O documento `docs/qualidade.md` seleciona quatro atributos de qualidade prioritários, com referência à ISO/IEC 25010.
- Os atributos de qualidade são justificados em relação ao contexto do MVP.
- Há relação explícita entre riscos e atributos de qualidade.
- Há indicação de métricas ou evidências futuras para observar os atributos selecionados.
- O README foi atualizado com links para os artefatos da Entrega 4.
- A entrega foi desenvolvida na branch `entrega-4` e integrada à `main` por merge commit.
- O PR #53 teve aprovação formal de integrante diferente do autor e checks bem-sucedidos.
- Os PRs internos da Entrega 4 observados tiveram aprovação formal e checks executados com sucesso.

## Critérios Parcialmente Atendidos

- O registro de riscos é completo na estrutura geral, mas os riscos R02 e R03 ainda usam `[Nome do integrante]` como responsável, em vez de nomear uma pessoa real.
- A priorização dos riscos está documentada, mas há inconsistência entre a seção de posicionamento e a seção de riscos mais críticos: R01 e R05 aparecem como alta prioridade, mas não são destacados entre os mais críticos; R04 e R07 são destacados como críticos mesmo tendo prioridade média e baixa, respectivamente.
- O risco R05 tem título de “Falhas na revisão por pares”, mas a descrição trata do fluxo funcional de submissão, armazenamento e disponibilidade; isso dificulta saber se o risco é de processo de revisão ou de confiabilidade funcional do MVP.
- O README lista PRs de evidência da etapa, mas não inclui o PR final #53 nem o PR #52 de atualização do próprio README.
- O PR final #53 usou o template parcialmente: não possui issue relacionada preenchida e omite o checklist “Critérios de aceitação da issue atendidos”, embora os checks e a aprovação tenham sido registrados.
- O board do GitHub Projects é referenciado no README, mas não pôde ser verificado diretamente porque o token atual não possui o escopo `read:project`.

## Critérios Não Atendidos

- A integração final da Entrega 4 ocorreu após a data prevista quando considerado o horário local do Brasil: o PR #53 foi mesclado em 04/09/2026 03:21:43 UTC, equivalente a 04/09/2026 00:21:43 BRT.
- Nem todos os riscos possuem responsável real identificado, apesar de isso ser item mínimo da entrega.

## Achados com Evidências

- Equipe e papéis registrados no README: `README.md`, linhas 5-13.
- Escopo do MVP no README: `README.md`, linhas 42-70.
- MVP detalhado no documento de inception: `docs/inception.md`, linhas 51-122.
- README com board, backlog, DoD e ADRs: `README.md`, linhas 74-93.
- README atualizado com artefatos da Entrega 4: `README.md`, linhas 113-122.
- README lista PRs #46, #47, #48, #50 e #51 como evidências da etapa, mas não lista #52 nem #53: `README.md`, linhas 121-122.
- DoD exige PR, issue relacionada, aprovação, checks, registro de IA e merge commit: `docs/dod.md`, linhas 3-20.
- O DoD ainda menciona branch própria criada a partir de `entrega-2`, indicando resíduo de etapa anterior: `docs/dod.md`, linha 8.
- Template de PR com descrição, issue relacionada e checklist: `.github/PULL_REQUEST_TEMPLATE.md`, linhas 1-13.
- Templates de issue para `feature`, `task` e `fix` existem em `.github/ISSUE_TEMPLATE/`.
- Workflow de CI configurado para pull requests em `main` e `entrega-*`: `.github/workflows/ci.yml`, linhas 1-8.
- Job `Documentos obrigatórios` verifica `README.md`, `USO-IA.md`, `docs/inception.md` e `docs/dod.md`: `.github/workflows/ci.yml`, linhas 13-19.
- Job `Links internos` usa `lycheeverse/lychee-action@v2` em modo offline: `.github/workflows/ci.yml`, linhas 21-29.
- Job `Lint Markdown` usa `DavidAnson/markdownlint-cli2-action@v24`: `.github/workflows/ci.yml`, linhas 31-41.
- Configuração do markdownlint seleciona regras específicas para links, listas e referências: `.markdownlint.jsonc`, linhas 1-22.
- Registro de riscos com sete riscos e naturezas declaradas: `docs/riscos.md`, linhas 5-17.
- Riscos R02 e R03 mantêm responsável como `[Nome do integrante]`: `docs/riscos.md`, linhas 10-11.
- Critérios de classificação de probabilidade e impacto: `docs/riscos.md`, linhas 21-30.
- Matriz de riscos e posicionamento por prioridade: `docs/riscos.md`, linhas 31-43.
- Seção de riscos mais críticos destaca R02, R04 e R07, divergindo parcialmente da própria priorização: `docs/riscos.md`, linhas 45-51.
- Justificativa geral das prioridades: `docs/riscos.md`, linhas 53-57.
- Plano de resposta aos riscos com ações preventivas e contingência: `docs/riscos.md`, linhas 59-83.
- Acompanhamento dos riscos por revisão a cada sprint, comunicação, atualização documental e distribuição de conhecimento: `docs/riscos.md`, linhas 85-92.
- Fluxo de trabalho documenta branches de entrega e branches de trabalho: `docs/fluxo-de-trabalho.md`, linhas 6-24.
- Fluxo de integração via PR entre branch de trabalho, `entrega-N` e `main`: `docs/fluxo-de-trabalho.md`, linhas 25-37.
- Revisão por qualquer integrante exceto o autor e exigência de uma aprovação: `docs/fluxo-de-trabalho.md`, linhas 38-45.
- Template e checklist mínimo de PR documentados: `docs/fluxo-de-trabalho.md`, linhas 47-61.
- Checks obrigatórios e detalhamento do CI mínimo documentados: `docs/fluxo-de-trabalho.md`, linhas 63-95.
- Documento declara aplicação das regras em ruleset para `entrega-*` e proteção de branch para `main`: `docs/fluxo-de-trabalho.md`, linhas 97-102.
- Atributos de qualidade selecionados: Confiabilidade, Manutenibilidade, Segurança e Capacidade de Interação: `docs/qualidade.md`, linhas 7-42.
- Relação entre riscos e qualidade: `docs/qualidade.md`, linhas 45-60.
- Modelo ISO/IEC 25010 e escopo de avaliação futura: `docs/qualidade.md`, linhas 63-79.
- Métricas e evidências preliminares por atributo: `docs/qualidade.md`, linhas 80-91.
- Registros de uso de IA para a Entrega 4: `USO-IA.md`, linhas 50-74.
- Issues #40, #41, #42, #43, #44 e #45 foram fechadas e registram tarefas da Entrega 4.
- Issue #40 exigia riscos com responsável nomeado, mas o artefato final ainda contém placeholders em R02 e R03.
- PRs internos #46, #47, #48, #50, #51 e #52 foram mesclados para `entrega-4`, com aprovação formal e checks bem-sucedidos.
- PR #51 manteve `Closes #` sem número de issue no corpo, apesar de estar relacionado à issue #43.
- PR #53 integrou a branch `entrega-4` à `main`, estado `MERGED`, URL `https://github.com/IFSC-ES2/es2-2026_2-equipe-4/pull/53`.
- PR #53 foi criado em 04/09/2026 03:20:44 UTC e mesclado em 04/09/2026 03:21:43 UTC.
- PR #53 possui aprovação formal de `pedrovalete` em 04/09/2026 03:21:34 UTC.
- PR #53 teve checks bem-sucedidos: `Documentos obrigatórios`, `Links internos` e `Lint Markdown`.
- Integração por merge commit: commit `094b9b9`, mensagem `Merge pull request #53 from IFSC-ES2/entrega-4`.
- Branch remota `origin/entrega-4` preservada no commit `0ba9463`.
- Proteção da branch `main` exige uma aprovação e os checks obrigatórios `Links internos`, `Documentos obrigatórios` e `Lint Markdown`.
- Ruleset `protecao-branches-entrega` está ativo para `refs/heads/entrega-*`, exige pull request, uma aprovação e os três checks obrigatórios.
- Consulta ao GitHub Project #34 não pôde ser realizada por falta do escopo `read:project` no token atual.

## Recomendações para a Equipe

- Substituir os placeholders `[Nome do integrante]` por responsáveis reais nos riscos R02 e R03.
- Corrigir a inconsistência entre a prioridade dos riscos e a lista de riscos mais críticos no momento.
- Renomear ou reescrever o risco R05 para alinhar título, descrição e natureza do risco.
- Atualizar o README para incluir o PR #52 e, principalmente, o PR final #53 como evidência de integração da Entrega 4.
- Preencher sempre a issue relacionada nos PRs, inclusive no PR final da entrega.
- Atualizar o `docs/dod.md` para remover a referência fixa à branch `entrega-2`, substituindo por `entrega-N` ou pela branch da entrega corrente.
- Manter a proteção da `main` e o ruleset de `entrega-*` nas próximas sprints, expandindo o CI para build, testes e verificações do produto quando houver código funcional.
- Registrar evidências de revisão dos riscos nas próximas retrospectivas, indicando mudanças de probabilidade, impacto, prioridade ou ações realizadas.

## Observações Sobre Uso de IA

O `USO-IA.md` declara uso de IA na Entrega 4 para organização de tabelas em `docs/riscos.md`, apoio na seleção de regras do markdownlint e construção do job de lint em `ci.yml`, apoio na definição dos critérios de qualidade e apoio na estrutura do documento de fluxo de trabalho.

A declaração é compatível com os artefatos entregues e com o histórico observado: os documentos da etapa são fortemente estruturados em Markdown, o CI recebeu job de lint e existe configuração específica em `.markdownlint.jsonc`. O registro também descreve validação humana, com conferência manual e testes locais do linter. Não foram observadas evidências incompatíveis com o uso declarado.

## Nota da Entrega

- Nota: 4,4 / 5,0

## Justificativa da Nota

A entrega atende muito bem à maior parte dos critérios da etapa. Os artefatos obrigatórios foram produzidos, o MVP está coerente, os riscos e critérios de qualidade foram documentados, o fluxo de trabalho foi formalizado, o CI mínimo está ativo, os checks passaram, houve aprovação formal em PR e há enforcement verificável tanto na `main` quanto nas branches `entrega-*`.

A nota não é máxima devido ao atraso pequeno da integração final, aos placeholders de responsáveis em dois riscos, à inconsistência na priorização dos riscos críticos, ao título ambíguo do risco R05 e a lacunas de rastreabilidade no README e no PR final. Ainda assim, a equipe demonstra maturidade processual acima da média nesta entrega, especialmente pela configuração efetiva de proteção e checks obrigatórios.
