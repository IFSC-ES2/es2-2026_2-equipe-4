# Avaliação da Entrega 1 - Kickoff

## Identificação

- Equipe: es2-2026_2-equipe-4
- Projeto: PublicaIFSC
- Entrega: 1 - Kickoff
- Data limite considerada para avaliação: 07/08/2026

## Documentos Consultados

- `README.md` da equipe.
- `USO-IA.md` da equipe.
- `.github/ISSUE_TEMPLATE/feature.md`.
- `.github/ISSUE_TEMPLATE/fix.md`.
- `.github/ISSUE_TEMPLATE/task.md`.
- `.github/PULL_REQUEST_TEMPLATE.md`.
- Issues GitHub #1 e #4.
- Pull requests GitHub #3, #5 e #6.
- Histórico Git local e remoto.

## Resumo da Entrega

A equipe entregou um README inicial para o PublicaIFSC, uma plataforma web para publicação de artigos acadêmicos. A proposta apresenta problema, área de aplicação, usuários, contexto, relevância, MVP enxuto e itens fora do escopo. O repositório contém registro de uso de IA, templates de issue e pull request, pasta `docs/` inicial, pasta `src/` inicial, issues de organização e fluxo de entrega por branch `entrega-1` integrada à `main` via PR #6.

A entrega é forte em delimitação de MVP e governança GitHub, com PR aprovado e proteção de branch exigindo uma aprovação. As principais lacunas estão na composição e identificação da equipe, nas issues sem critérios de aceitação explícitos no corpo e na ausência de checks obrigatórios executados.

## Critérios Atendidos

- O README apresenta nome e descrição do projeto.
- A equipe possui cinco integrantes, composição aceita para esta entrega, embora um nome apareça repetido em papéis diferentes.
- O tema está relacionado às linhas de educação e apoio à aprendizagem, e comunicação, transparência e acesso à informação.
- O README apresenta problema, área de aplicação, usuários, contexto de aplicação, relevância e proposta geral.
- O MVP está claramente delimitado e é enxuto, com poucas funcionalidades principais.
- O README explicita itens fora do escopo.
- O repositório contém `USO-IA.md` com declaração de responsabilidade, ferramenta utilizada, finalidade, artefato impactado e validação.
- O repositório contém templates de issue para feature, fix e task.
- Os templates `feature.md` e `task.md` incluem seção de critérios de aceitação.
- O repositório contém template de pull request com checklist.
- Há issues criadas para organizar a entrega: #1 e #4.
- A entrega foi desenvolvida na branch `entrega-1` e integrada à `main` por merge commit do PR #6.
- O PR #6 possui aprovação formal registrada antes do merge.
- A branch `main` possui proteção com exigência de 1 aprovação em pull request.
- A entrega foi integrada em 07/08/2026, dentro do prazo estendido considerado para a Entrega 1.

## Critérios Parcialmente Atendidos

- A equipe informa nomes e papéis, mas não informa matrículas dos integrantes.
- Os papéis mínimos aparecem, mas há duplicidade aparente de nome para funções diferentes: `Marcos` aparece como Scrum Master e também como DevOps/Infra, sem sobrenome ou matrícula para diferenciar se é o mesmo integrante ou integrantes diferentes.
- O README responde aos pontos principais da contextualização, mas a proposta de solução aparece distribuída entre a descrição inicial e o MVP, sem uma seção explícita respondendo diretamente à pergunta do enunciado.
- Há issues de organização, mas as issues #1 e #4 não apresentam critérios de aceitação explícitos no corpo, apesar de existirem templates com esse campo.
- Há estrutura inicial com `docs/.gitkeep` e `src/.gitkeep`, mas sem documentação adicional nesta entrega.
- O repositório possui proteção exigindo aprovação, mas não há evidência de checks obrigatórios configurados ou executados.
- O repositório está com Projects habilitado, mas não foi possível verificar o board utilizado.

## Critérios Não Atendidos

- Não há matrículas dos integrantes no README.
- Não há evidência de checks obrigatórios no PR #6; a consulta retornou `statusCheckRollup: []`.
- Não há milestone criada para a entrega; a API de milestones retornou lista vazia.
- Não há evidência verificável de board utilizado para acompanhamento.

## Achados com Evidências

- README com descrição do projeto: `README.md`, linhas 1-3.
- Problema descrito: `README.md`, linhas 5-7.
- Área de aplicação informada: `README.md`, linhas 9-11.
- Usuários informados: `README.md`, linhas 13-17.
- Contexto de aplicação informado: `README.md`, linhas 19-21.
- Relevância informada: `README.md`, linhas 23-30.
- MVP enxuto: `README.md`, linhas 32-44.
- Fora do escopo definido: `README.md`, linhas 46-60.
- Equipe com cinco integrantes, composição aceita para esta entrega, mas sem matrículas: `README.md`, linhas 62-69.
- Ressalva de duplicidade/ambiguidade de nome: `README.md`, linhas 64 e 66, com `Marcos` em dois papéis diferentes, sem sobrenome ou matrícula para desambiguar.
- Registro de IA com declaração e validação: `USO-IA.md`, linhas 1-18.
- Template de PR com checklist: `.github/PULL_REQUEST_TEMPLATE.md`, linhas 1-14.
- Templates de issue com critérios de aceitação em feature e task: `.github/ISSUE_TEMPLATE/feature.md`, linhas 14-21; `.github/ISSUE_TEMPLATE/task.md`, linhas 14-20.
- Issue #1 criada para README e USO-IA, mas sem critérios de aceitação explícitos no corpo.
- Issue #4 criada para labels nos templates, mas sem critérios de aceitação explícitos no corpo.
- PR #3 integrou README e `USO-IA.md` à branch `entrega-1` com aprovação formal.
- PR #5 integrou ajustes de templates à branch `entrega-1` com aprovação formal.
- PR #6 integrou `entrega-1` à `main`, estado `MERGED`, URL `https://github.com/IFSC-ES2/es2-2026_2-equipe-4/pull/6`.
- PR #6 possui review `APPROVED` por `pedrovalete`.
- PR #6 sem checks registrados: consulta retornou `statusCheckRollup: []`.
- Integração por merge commit: commit `6210a8e`, mensagem `Merge pull request #6 from IFSC-ES2/entrega-1`.
- Branch de entrega preservada no remoto: `origin/entrega-1` aponta para o commit `6d589e9`.
- Proteção de branch: API de proteção da `main` retornou `required_approving_review_count: 1`.
- Ausência de milestone: API de milestones retornou `[]`.

## Recomendações para a Equipe

- Informar nomes completos e matrículas de todos os integrantes no README.
- Diferenciar claramente o integrante cujo nome aparece repetido, informando nome completo e matrícula, ou corrigir eventual duplicidade de função.
- Adicionar critérios de aceitação objetivos às issues reais, não apenas aos templates.
- Configurar ou planejar checks obrigatórios para pull requests.
- Evidenciar o board de acompanhamento e vincular issues ao fluxo de trabalho.
- Criar milestones por entrega ou marco para melhorar a rastreabilidade.
- Explicitar melhor, no README, a proposta do sistema para resolver o problema, como resposta direta ao item obrigatório do enunciado.

## Nota da Entrega

Nota: 4,1 / 5,0

## Justificativa da Nota

- Equipe formada dentro do prazo: 0,6 / 1,0. A equipe informa papéis, incluindo Scrum Master, Arquiteto, DevOps/Infra e Engenheiro de Qualidade, e a composição com cinco integrantes foi aceita para esta entrega; permanecem a ausência de matrículas e a ambiguidade causada pelo nome repetido.
- Tema definido de forma clara, contextualizada, relevante e em conformidade com as restrições: 1,9 / 2,0. O tema é claro, relevante, aderente às linhas temáticas e possui MVP bem delimitado; há apenas pequena perda por a proposta de solução não estar destacada em resposta explícita ao item do enunciado.
- README inicial preenchido, incluindo escopo do MVP e informações básicas: 0,8 / 1,0. O README é organizado e cobre o MVP, mas faltam matrículas e há inconsistência na identificação da equipe.
- Governança mínima do repositório: 0,8 / 1,0. Há branch de entrega, PR aprovado, proteção de branch exigindo aprovação, templates, issues e merge commit, mas faltam checks obrigatórios, critérios de aceitação nas issues reais, milestone e evidência verificável de board.

## Observações sobre Uso de IA

A equipe declarou uso do Claude para apoio na criação dos templates de issues e pull request, registrou o artefato impactado e incluiu declaração de responsabilidade. A declaração é compatível com os artefatos entregues, pois o repositório contém templates de issues e pull request. O registro atende ao princípio de transparência, mas a validação informada como “pesquisa em documentos do github” poderia ser mais específica quanto à revisão feita pela equipe e à adequação dos templates às exigências da disciplina.
