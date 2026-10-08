# Avaliação da Entrega 3 - Estimativas e Métricas (Baseline)

## Identificação

- Equipe: es2-2026_2-equipe-4
- Projeto: PublicaIFSC
- Entrega: 3 - Estimativas e Métricas (Baseline)
- Data prevista da entrega: 28/08/2026
- Pull request avaliado: PR #39, branch `entrega-3` para `main`
- Versão considerada: `origin/main` no commit `59f2249`

## Documentos Consultados

- `README.md` da equipe.
- `USO-IA.md` da equipe.
- `.github/PULL_REQUEST_TEMPLATE.md`.
- `.github/ISSUE_TEMPLATE/feature.md`.
- `.github/ISSUE_TEMPLATE/task.md`.
- `.github/ISSUE_TEMPLATE/fix.md`.
- `.github/workflows/ci.yml`.
- `docs/inception.md`.
- `docs/dod.md`.
- `docs/BASELINE.md`.
- `docs/ESTIMATIVAS.md`.
- `docs/METRICAS.md`.
- `docs/metricas/M-01.md`.
- `docs/metricas/M-02.md`.
- `docs/metricas/M-03.md`.
- `docs/metricas/M-04.md`.
- `docs/metricas/M-05.md`.
- `docs/metricas/M-06.md`.
- `docs/metricas/M-07.md`.
- `docs/metricas/M-08.md`.
- `docs/adr/ADR-0001.md`.
- `docs/adr/ADR-0002.md`.
- Issues GitHub #17, #18, #19, #20, #21, #22, #23, #24, #25, #26, #27 e #28.
- Pull requests GitHub #31, #32, #33, #36, #37, #38 e #39.
- Histórico Git local e remoto.

## Resumo da Entrega

A equipe entregou os principais artefatos previstos para a Entrega 3: baseline, abordagem de estimativas, plano de métricas, fichas individuais de métricas, README atualizado, registro de uso de IA, workflow de CI e evidências de integração por pull request. O escopo do MVP declarado para o PublicaIFSC é uma aplicação web para submissão, armazenamento, listagem, busca simples e visualização pública de artigos acadêmicos com PDF.

O baseline usa como recorte as issues #17 a #22, mas prioriza explicitamente as issues #17 e #20 como funcionalidades mais importantes para o primeiro horizonte. As estimativas adotam T-Shirt Sizing com votação individual dos cinco integrantes. As métricas cobrem produto, processo e projeto, com oito fichas individuais.

A entrega apresenta boa organização de issues, PRs internos para a branch `entrega-3`, PR final para `main`, checks executados e proteção de branch/rulesets atualmente configuradas. As principais perdas estão na capacidade planejada sem número objetivo de horas ou disponibilidade individual, no nível ainda superficial de algumas métricas e em pequenas ambiguidades documentais sobre revisão por pares no README.

## Critérios Atendidos

- O baseline foi registrado em `docs/BASELINE.md` com recorte do backlog, priorização, estimativas, técnica de estimativa, hipóteses, capacidade, previsão inicial e data de registro.
- O recorte do backlog está ligado a issues reais do MVP: #17, #18, #19, #20, #21 e #22.
- O MVP declarado é enxuto e coerente com o problema: submissão, persistência, armazenamento, listagem, busca simples e visualização de artigos com PDF.
- A abordagem de estimativa foi registrada em `docs/ESTIMATIVAS.md`, com técnica, participantes, unidade, critérios de comparação, votação e incertezas.
- A sessão de estimativa declara participação dos cinco integrantes da equipe.
- O plano de métricas foi registrado em `docs/METRICAS.md`, com métricas de produto, processo e projeto.
- Foram criadas oito fichas individuais de métricas em `docs/metricas/`.
- As fichas individuais incluem nome, classificação, objetivo, definição/fórmula, fonte de dados, frequência, responsável, campos para datas de acompanhamento, valores coletados e interpretação.
- O README foi atualizado com links para baseline, estimativas, métricas, fichas individuais, backlog e board.
- O `USO-IA.md` foi atualizado com registros relacionados à Entrega 3.
- A entrega foi desenvolvida na branch `entrega-3` e integrada à `main` por merge commit.
- O PR #39 possui aprovação formal registrada por integrante da equipe.
- O PR #39 teve checks executados com sucesso.
- A branch `main` possui proteção configurada com exigência de uma aprovação e checks obrigatórios; no PR #39, os checks executados com sucesso foram `Links internos` e `Documentos obrigatórios`.

## Critérios Parcialmente Atendidos

- O recorte do backlog inclui seis funcionalidades, mas a priorização e a previsão de curto prazo concentram-se apenas em duas; isso é aceitável como horizonte inicial, mas poderia deixar mais explícito o critério de seleção e a relação com os demais itens do MVP.
- As estimativas estão bem descritas, porém há divergência entre `BASELINE.md` e `ESTIMATIVAS.md`: o baseline detalha estimativas para #17 e #20, enquanto `ESTIMATIVAS.md` também detalha #18.
- A capacidade planejada identifica cinco integrantes ativos e restrições, mas não informa uma disponibilidade estimada objetiva até o próximo marco, como horas por integrante, horas totais ou capacidade por período.
- Os papéis da equipe são descritos no README nominalmente, mas no baseline aparecem apenas como responsabilidades gerais, sem vínculo explícito entre pessoa, papel e disponibilidade nesta etapa.
- O plano `docs/METRICAS.md` lista métricas por categoria, mas não referencia diretamente as fichas individuais; essa referência aparece no README e na issue #26.
- Algumas métricas são úteis, mas suas fichas ainda têm definições simples e sem limiares ou ferramenta específica de coleta, o que pode dificultar o acompanhamento objetivo nas próximas etapas.
- O README ainda descreve a plataforma como tendo “processo de revisão por pares integrado” e menciona pesquisadores/professores revisando artigos, embora a revisão esteja fora do MVP no próprio README e em `docs/inception.md`.
- O board é referenciado no README, mas não pôde ser verificado diretamente porque o token atual não possui o escopo `read:project`.

## Critérios Não Atendidos

- Não há evidência de release/tag de marco associada à Entrega 3, embora o critério específico desta etapa foque principalmente em documentos, PR, revisão, checks e branch de entrega.

## Achados com Evidências

- Equipe e papéis registrados no README: `README.md`, linhas 5-13.
- Escopo do MVP no README: `README.md`, linhas 42-70.
- README com links para board, backlog, DoD e ADRs: `README.md`, linhas 74-92.
- README atualizado com artefatos da Entrega 3: `README.md`, linhas 94-111.
- MVP detalhado em `docs/inception.md`: linhas 51-122.
- DoD com critérios de PR, revisão, checks, IA e merge commit: `docs/dod.md`, linhas 3-20.
- Template de PR existe com campos de descrição, issue relacionada e checklist: `.github/PULL_REQUEST_TEMPLATE.md`, linhas 1-14.
- Templates de issue para feature, task e fix existem em `.github/ISSUE_TEMPLATE/`.
- Workflow de CI define jobs `Documentos obrigatórios` e `Links internos`: `.github/workflows/ci.yml`, linhas 1-29.
- Baseline com recorte do backlog referenciando issues #17 a #22: `docs/BASELINE.md`, linhas 3-17.
- Baseline explicita funcionalidades futuras fora da prioridade inicial: `docs/BASELINE.md`, linhas 18-27.
- Priorização das issues #17 e #20: `docs/BASELINE.md`, linhas 30-43.
- Estimativas para #17 e #20 no baseline: `docs/BASELINE.md`, linhas 47-83.
- Técnica T-Shirt Sizing no baseline: `docs/BASELINE.md`, linhas 87-104.
- Hipóteses e unidade adotada no baseline: `docs/BASELINE.md`, linhas 107-135.
- Capacidade planejada, restrições e fatores de previsibilidade: `docs/BASELINE.md`, linhas 138-183.
- Previsão inicial para o próximo marco: `docs/BASELINE.md`, linhas 186-214.
- Data e horário do baseline: `docs/BASELINE.md`, linhas 218-221.
- Técnica, participantes e unidade no documento de estimativas: `docs/ESTIMATIVAS.md`, linhas 3-26.
- Critérios de comparação para #17, #18 e #20: `docs/ESTIMATIVAS.md`, linhas 28-54.
- Limitações e incertezas percebidas: `docs/ESTIMATIVAS.md`, linhas 55-61.
- Plano geral de métricas por produto, processo e projeto: `docs/METRICAS.md`, linhas 1-26.
- Fichas M-01 a M-04 registram métricas de produto: `docs/metricas/M-01.md` a `docs/metricas/M-04.md`.
- Fichas M-05 e M-06 registram métricas de processo: `docs/metricas/M-05.md` e `docs/metricas/M-06.md`.
- Fichas M-07 e M-08 registram métricas de projeto: `docs/metricas/M-07.md` e `docs/metricas/M-08.md`.
- Issues #17 a #22 registram funcionalidades do MVP com critérios de aceitação.
- Issues #23 a #28 registram tarefas documentais e de processo da Entrega 3.
- PRs internos #31, #32, #33, #36, #37 e #38 foram mesclados na branch `entrega-3` com aprovações e checks executados.
- PRs #34 e #35 tentaram integrar diretamente branches de tarefa na `main`, mas foram fechados sem merge; o trabalho foi reintegrado corretamente pela branch `entrega-3`.
- PR #36 manteve o placeholder `Closes #` sem número de issue no corpo, apesar de estar relacionado ao baseline.
- PR #39 integrou `entrega-3` à `main`, estado `MERGED`, URL `https://github.com/IFSC-ES2/es2-2026_2-equipe-4/pull/39`.
- PR #39 foi criado em 27/08/2026 23:05:34 UTC e mesclado em 27/08/2026 23:07:21 UTC.
- PR #39 possui aprovação formal de `BeVieiraSouza` em 27/08/2026 23:07:05 UTC.
- PR #39 teve checks bem-sucedidos: `Documentos obrigatórios` e `Links internos`.
- Branch `main` protegida atualmente com `required_approving_review_count: 1` e checks obrigatórios `Links internos`, `Documentos obrigatórios` e `Lint Markdown`; no PR #39, anterior à adição do lint da Entrega 4, foram executados com sucesso `Links internos` e `Documentos obrigatórios`.
- Integração por merge commit: commit `59f2249`, mensagem `Merge pull request #39 from IFSC-ES2/entrega-3`.
- Branch remota `origin/entrega-3` preservada no commit `bce15e5af4708bc3783f807368fef3e597ab1b66`.
- Consulta ao GitHub Project #34 não pôde ser realizada por falta do escopo `read:project` no token atual.
- Registro de IA da Entrega 3 em `USO-IA.md`: linhas 26-49.
- Ambiguidade de escopo no README: descrição inicial cita revisão por pares integrada (`README.md`, linha 3), mas revisão aparece fora do escopo (`README.md`, linhas 56-61; `docs/inception.md`, linhas 84-90).

## Recomendações para a Equipe

- Quantificar a capacidade planejada em horas por integrante, horas totais por semana ou outro indicador objetivo, mantendo vínculo com os papéis da etapa.
- Harmonizar `BASELINE.md` e `ESTIMATIVAS.md`, deixando claro quais itens foram priorizados, quais foram apenas estimados e qual horizonte de execução cada grupo representa.
- Incluir no `docs/METRICAS.md` links diretos para as fichas individuais, além dos links já existentes no README.
- Enriquecer as fichas de métricas com limiares, ferramentas de coleta e exemplos de cálculo quando aplicável.
- Manter os checks obrigatórios e evoluí-los para build, testes e lint reais assim que houver código funcional do produto.
- Corrigir PRs futuros que fiquem com placeholder de template, como `Closes #`, para preservar rastreabilidade.
- Evitar abrir PRs de branches de tarefa diretamente para `main`; manter o fluxo por `entrega-n` e PR final de entrega.
- Alinhar a descrição curta do README com o escopo real do MVP, removendo a ideia de revisão por pares integrada enquanto ela permanecer fora do recorte.
- Continuar registrando uso de IA com ferramenta, finalidade, artefato e validação, especificando melhor quais partes foram aproveitadas de cada ferramenta.

## Nota da Entrega

Nota: 4,2 / 5,0

## Justificativa da Nota

- Planejamento inicial e baseline coerentes com o MVP e o backlog priorizado: 0,9 / 1,0. O baseline cobre os itens obrigatórios, referencia issues reais e foi registrado dentro do prazo atualizado; a perda remanescente decorre de pequena inconsistência entre recorte, itens priorizados e itens estimados.
- Estimativas registradas com técnica, unidade, participantes, hipóteses e limitações: 0,9 / 1,0. A técnica T-Shirt Sizing, a unidade P/M/G/GG, a votação e os participantes estão claros; a perda decorre da inconsistência entre os itens detalhados no baseline e no documento de estimativas.
- Capacidade planejada da equipe declarada de forma realista e justificada: 0,6 / 1,0. Há cinco integrantes ativos, papéis gerais, restrições e fatores de previsibilidade, mas falta uma disponibilidade estimada objetiva em horas ou capacidade total até o próximo marco.
- Métricas de produto, processo e projeto definidas com objetivo, fórmula, fonte, frequência e interpretação: 0,8 / 1,0. Há oito métricas e fichas com os campos pedidos, mas algumas definições são superficiais, sem limiares ou ferramenta concreta de coleta, e `docs/METRICAS.md` não referencia diretamente as fichas.
- Evidências no repositório: README atualizado, PR revisado, checks obrigatórios e ramificação `entrega-3` integrada por commit de mesclagem: 1,0 / 1,0. A equipe apresentou PR final aprovado, checks executados, proteção de branch com checks obrigatórios, merge commit e integração dentro do prazo atualizado; as tentativas fechadas de PR direto para `main` permanecem apenas como recomendação de processo.

## Observações sobre Uso de IA

A equipe declarou uso de Claude, GPT e ChatGPT na Entrega 3 para apoio à configuração de checks, formatação de `ESTIMATIVAS.md`, organização de `BASELINE.md` e documentação das métricas e fichas M-01 a M-08. A declaração é compatível com os artefatos observados, pois a entrega inclui workflow de CI, baseline, estimativas, plano de métricas e fichas individuais. O registro inclui validação manual, mas contém pequenos problemas de formatação e digitação, como `Ferramente`, e poderia detalhar melhor quais trechos ou decisões foram efetivamente aproveitados de cada ferramenta.
