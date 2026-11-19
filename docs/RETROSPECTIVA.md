# Retrospectiva do projeto

## Planejado e entregue

O plano inicial descrevia uma plataforma de submissão de artigos acadêmicos
em PDF, com possibilidade de revisão por pares. Na revisão de 23/09/2026, o
escopo mudou para uma vitrine de projetos universitários. A mudança aparece
na [ADR-0004](adr/ADR-0004.md), nas métricas M-05 e M-08 e no histórico das
sprints. A interface originalmente prevista sem framework foi substituída
por React ([ADR-0003](adr/ADR-0003.md)).

| Funcionalidade/decisão | Situação no RC | Evidência/observação |
|---|---|---|
| Cadastro e login com JWT | Concluída | API e telas de cadastro/login; rotas protegidas. |
| Publicação de projetos | Concluída | Metadados, autoria autenticada e upload de imagens. |
| Consulta pública | Concluída | Listagem paginada e consulta por identificador; galeria e detalhe na interface. |
| Troca e leitura de imagens | Concluída | `PUT /projetos/{id}/imagem`, `GET /projetos/imagens/{id}` e limite de 5 MB. |
| Artigos e PDFs | Removida do escopo | Substituídos pela vitrine de projetos na revisão de 23/09. |
| Revisão por pares | Removida do escopo | Não integra o fluxo atual do MVP. |
| MySQL | Removida do escopo | Foi alternativa no plano; MongoDB é o banco implementado. |
| Busca por texto | Pendente | Não disponível na galeria. |
| Exclusão de projeto pelo autor | Concluída | Rota `DELETE /projetos/{id}` restrita ao autor e botão Apagar no detalhe do projeto (#211, PR #212; #210, PR #213; movido no PR #220). |
| Edição de projeto pelo autor | Concluída | Rota `PUT /projetos/{id}` restrita ao autor e edição dos dados e da imagem no detalhe (#217, PR #220). |
| Ambiente publicado e deploy automatizado | Concluída na Entrega 9 | Removidos da Sprint 4 (#161 a #164, não planejadas em 11/11). Na Entrega 9 a equipe publicou o site e a API no Render, com banco no MongoDB Atlas e deploy a partir da `main` (#189, #190, #191). Não há staging separado. Consulte [DEPLOY](DEPLOY.md). |
| Backup e validação do tipo da imagem | Parcial | A interface valida as imagens antes do envio (#196, PR #205) e a publicação valida os campos obrigatórios (#201, PR #218); o backend não valida o tipo no upload e não há backup (R06). |

## Indicadores observados

| Indicador | Evolução registrada | Leitura |
|---|---|---|
| M-05 — retrabalho | Sprint 1 ~40%; Sprint 2 ~43%; Sprint 3 ~13%; Sprint 4 ~22%. | Subiu na última sprint, com dois retrabalhos de correção entre nove PRs considerados. |
| M-08 — variação de escopo | Sprint 1 100%; Sprint 2 50%; Sprint 3 ~6%; Sprint 4 50%. | O escopo ficou mais estável na Sprint 3 e cresceu novamente na Sprint 4; seis itens entraram após a baseline de 12 itens. |
| M-07 — variação de cronograma | Sprint 1 0; Sprint 2 -1; Sprint 3 -1; Sprint 4 0. | Sprint 4 foi registrada como alinhada ao cronograma, apesar das pendências de documentação e release anotadas no fechamento daquela data. |

Os valores e critérios completos estão em [M-05](metricas/M-05.md),
[M-07](metricas/M-07.md) e [M-08](metricas/M-08.md). A entrega final não
possui coleta de uma sprint posterior à Sprint 4 nos registros disponíveis.

## Retrospectiva breve

A equipe concluiu um fluxo integrado de cadastro, autenticação, publicação e
consulta, e a reengenharia do armazenamento isolou o acesso a arquivos. A
mudança de tema perto da Sprint 2 gerou retrabalho elevado; a estabilidade do
escopo na Sprint 3 coincidiu com queda da taxa, mas o crescimento de escopo na
Sprint 4 trouxe novamente ajustes corretivos. As contribuições da Sprint 4
estão associadas a PRs e revisões em [sprint-4.md](sprints/sprint-4.md).

Na Entrega 9 o foco foi consolidar: correções de front-end, edição e exclusão
pelo autor, testes e verificações no CI e o ambiente publicado no Render, além do Compose local reproduzível.
As contribuições individuais desta entrega estão na
[release candidate](entregas/release-candidate.md). Permanecem riscos de backup,
validação do tipo das imagens no backend, `admin123` no histórico e checks não
obrigatórios; estão
detalhados em [riscos](riscos.md). O planejamento e a documentação devem ser
iniciados antes do fechamento da sprint, com responsáveis e datas
intermediárias para reduzir concentração de trabalho no prazo final.
