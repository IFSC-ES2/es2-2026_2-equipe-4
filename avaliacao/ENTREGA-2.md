# Avaliação da Entrega 2 - Inception

## Identificação

- Equipe: es2-2026_2-equipe-4
- Projeto: PublicaIFSC
- Entrega: 2 - Inception
- Data limite considerada para avaliação: 15/08/2026
- Pull request avaliado: PR #16, branch `entrega-2` para `main`

## Documentos Consultados

- `README.md` da equipe.
- `USO-IA.md` da equipe.
- `docs/inception.md`.
- `docs/dod.md`.
- `docs/ADR-0001.md`.
- `docs/ADR-0002.md`.
- `.github/ISSUE_TEMPLATE/feature.md`.
- `.github/ISSUE_TEMPLATE/fix.md`.
- `.github/ISSUE_TEMPLATE/task.md`.
- `.github/PULL_REQUEST_TEMPLATE.md`.
- Issues GitHub #7, #8, #9 e #13.
- Pull requests GitHub #12, #14, #15 e #16.
- Histórico Git local e remoto atualizado após `git fetch origin`.

## Resumo da Entrega

A equipe entregou a documentação principal da Inception: `docs/inception.md`, `docs/dod.md`, duas ADRs iniciais e README atualizado com referências para os artefatos da etapa e para o board do projeto. A entrega foi integrada pela branch `entrega-2` no PR #16, com aprovação formal e merge commit para `main`. A avaliação foi refeita após atualização das referências remotas, considerando `origin/main` no commit `5b731ac`.

A visão do produto e o recorte do MVP estão bem delimitados e coerentes com o tema aprovado. As principais lacunas estão na ausência de backlog funcional priorizado em issues, na ausência de checks registrados, em links quebrados para as ADRs no README e em ADRs com status/referência operacional ainda incompletos.

## Critérios Atendidos

- A visão do produto está documentada em `docs/inception.md`, cobrindo problema, área de aplicação, usuários/interessados, contexto, proposta de valor, objetivos do semestre e premissas/restrições.
- O tema permanece coerente com as linhas de educação e apoio à aprendizagem, e comunicação, transparência e acesso à informação.
- O MVP foi definido com objetivo, funcionalidades essenciais, itens fora do escopo, justificativa de recorte e critérios usados para decisão.
- O MVP é enxuto e coerente com o semestre, concentrando-se em submissão, persistência, armazenamento, listagem, busca simples e visualização de artigos.
- A equipe registrou uma Definition of Done em `docs/dod.md`.
- Foram registradas duas ADRs iniciais sobre arquitetura do projeto e stack tecnológica.
- O README foi atualizado com referência para Inception, board/backlog, DoD e ADRs.
- A entrega foi desenvolvida na branch `entrega-2` e integrada à `main` por merge commit do PR #16.
- O PR #16 possui aprovação formal registrada por outro integrante.
- A branch `main` possui proteção com exigência de uma aprovação em pull request.
- A Entrega 2 foi integrada dentro do prazo autorizado até 15/08/2026.

## Critérios Parcialmente Atendidos

- A visão do produto é clara, mas o README ainda apresenta inconsistência entre a proposta inicial de revisão por pares e o MVP atual, que deixa revisão fora do escopo.
- O README foi atualizado, mas os links para ADRs apontam para `docs/adr/ADR-0001.md` e `docs/adr/ADR-0002.md`, enquanto os arquivos existentes estão em `docs/ADR-0001.md` e `docs/ADR-0002.md`.
- A DoD é objetiva e compatível com o fluxo de PR/revisão, mas menciona checks automáticos sem haver checks registrados no PR #16 nem status checks obrigatórios configurados na proteção da branch.
- As ADRs possuem contexto, decisão, alternativas e consequências, mas ainda usam status `loading` e mantêm referência de pull request como `Em andamento`, mesmo após o merge.
- As ADRs cobrem arquitetura e stack, mas a decisão de usar MongoDB reconhece pouca experiência da equipe com a tecnologia, o que representa risco para o MVP.
- O GitHub Project #34 foi verificado, mas contém apenas itens documentais e de governança; não foram encontrados itens funcionais do MVP no board.
- O registro de IA da Entrega 2 declara apoio apenas na atualização do README, embora a entrega também tenha incluído Inception, DoD e ADRs; não há declaração específica de IA para esses demais artefatos.

## Critérios Não Atendidos

- Não foram encontradas issues de backlog funcional do MVP com prioridade relativa, relação com o MVP e critérios de aceitação; as issues da Entrega 2 consultadas são majoritariamente documentais.
- Não há checks obrigatórios configurados na proteção da `main`, nem checks executados ou registrados no PR #16; a consulta retornou `required_status_checks: null` e `statusCheckRollup: []`.
- O README ainda não informa matrículas completas nem desambigua o nome repetido `Marcos`, lacuna já observada na Entrega 1.

## Achados com Evidências

- Visão do produto documentada: `docs/inception.md`, linhas 3-48.
- Problema e área de aplicação definidos: `docs/inception.md`, linhas 5-12.
- Usuários, interessados e contexto de aplicação definidos: `docs/inception.md`, linhas 13-23.
- Proposta de valor e objetivos do semestre definidos: `docs/inception.md`, linhas 24-38.
- Premissas, restrições e limitações: `docs/inception.md`, linhas 40-48.
- MVP com objetivo e funcionalidades essenciais: `docs/inception.md`, linhas 51-80.
- Itens fora do escopo do MVP: `docs/inception.md`, linhas 82-103.
- Justificativa do recorte e critérios de decisão: `docs/inception.md`, linhas 105-122.
- Direcionamento técnico, referência à DoD e ADRs: `docs/inception.md`, linhas 126-162.
- README atualizado com link para Inception: `README.md`, linha 62.
- README atualizado com board/backlog e DoD: `README.md`, linhas 64-74.
- README com links quebrados para ADRs: `README.md`, linhas 76-81, aponta para `docs/adr/...`, mas os arquivos existentes estão em `docs/ADR-0001.md` e `docs/ADR-0002.md`.
- README ainda apresenta equipe sem matrículas e com `Marcos` repetido: `README.md`, linhas 83-90.
- DoD registrada: `docs/dod.md`, linhas 1-20.
- DoD contempla issue, PR, revisão, checks, documentação, uso de IA e merge commit: `docs/dod.md`, linhas 5-16.
- ADR de arquitetura registrada: `docs/ADR-0001.md`, linhas 1-134.
- ADR de stack tecnológica registrada: `docs/ADR-0002.md`, linhas 1-185.
- ADRs com status `loading`: `docs/ADR-0001.md`, linhas 3-5; `docs/ADR-0002.md`, linhas 3-5.
- ADRs ainda registram pull request como `Em andamento`: `docs/ADR-0001.md`, linhas 126-131; `docs/ADR-0002.md`, linhas 177-182.
- ADR de stack declara uso de MongoDB e reconhece pouca experiência prática da equipe: `docs/ADR-0002.md`, linhas 78-90 e 149-153.
- Issues documentais da Entrega 2: #7 para ADRs, #8 para DoD, #9 para README e #13 para Inception.
- Issue #13 registra critérios para adicionar Inception, visão do produto, MVP, DoD, ADRs e PR.
- Board verificado no GitHub Project #34: issues #7, #8, #9, #1 e #4 constam em `Done`, sem itens funcionais do MVP.
- Não foram encontradas issues funcionais do backlog do MVP, como submissão, listagem, busca ou armazenamento de artigos.
- PR #16 integrou a branch `entrega-2` em `main`, estado `MERGED`, URL `https://github.com/IFSC-ES2/es2-2026_2-equipe-4/pull/16`.
- PR #16 possui review `APPROVED` por `pedrovalete` em 15/08/2026 02:49:05 UTC.
- PR #16 foi mesclado em 15/08/2026 02:49 UTC, dentro do prazo autorizado para a Entrega 2.
- PR #16 sem checks registrados: consulta retornou `statusCheckRollup: []`.
- Integração por merge commit: commit `5b731ac`, mensagem `Merge pull request #16 from IFSC-ES2/entrega-2`.
- Histórico de primeiro-parent de `origin/main`, atualizado após `git fetch origin`, preserva a integração da Entrega 2 por merge commit no commit `5b731ac`.
- Branch `main` protegida com exigência de uma aprovação, mas sem status checks obrigatórios configurados: API de proteção retornou `required_approving_review_count: 1` e `required_status_checks: null`.
- Registro de IA da Entrega 2: `USO-IA.md`, linhas 20-24, declara uso do Claude para atualização do README e validação manual do conteúdo e links.

## Recomendações para a Equipe

- Criar issues funcionais para o backlog do MVP, cobrindo submissão de artigo, persistência de metadados, armazenamento de PDF, listagem pública, busca simples e visualização do artigo.
- Registrar prioridade relativa, critérios de aceitação verificáveis e relação com o MVP em cada issue funcional.
- Manter nas próximas entregas a integração ao ramo `main` dentro do prazo autorizado, preservando PR, aprovação e merge commit.
- Corrigir os links das ADRs no README para apontarem aos caminhos reais dos arquivos.
- Atualizar o status das ADRs para refletir a decisão tomada e substituir `Pull Request: Em andamento` pela referência correta ao PR.
- Configurar checks obrigatórios na proteção da `main`, ou documentar claramente quais validações manuais serão usadas enquanto não houver pipeline.
- Completar a identificação da equipe com nomes completos e matrículas, além de desambiguar o integrante cujo nome aparece repetido.
- Atualizar o registro de IA para declarar, quando aplicável, o apoio utilizado em Inception, DoD e ADRs, não apenas no README.
- Reavaliar o risco de adoção do MongoDB considerando a pouca experiência declarada pela equipe e a necessidade de armazenar metadados acadêmicos estruturados.

## Nota da Entrega

Nota: 3,5 / 5,0

## Justificativa da Nota

- Visão do produto clara, contextualizada e coerente com o tema aprovado: 0,9 / 1,0. A visão cobre os pontos obrigatórios e está bem contextualizada, com pequena ressalva pela divergência residual entre revisão por pares e o MVP atual.
- MVP definido com escopo viável, funcionalidades essenciais e itens fora do escopo: 0,9 / 1,0. O MVP é enxuto, viável e bem justificado.
- Backlog inicial priorizado, registrado em issues/board e com critérios de aceitação: 0,3 / 1,0. Há referência ao board, mas não foram encontradas issues funcionais do backlog do MVP com prioridade e critérios de aceitação; as issues consultadas são principalmente documentais.
- DoD objetiva e compatível com o fluxo de trabalho da equipe: 0,7 / 1,0. A DoD é objetiva e cobre o fluxo esperado, mas checks automáticos não aparecem executados no PR da entrega.
- ADRs iniciais registradas e README atualizado com referências para os artefatos da etapa: 0,7 / 1,0. Há ADRs e README atualizado, mas os links de ADR estão quebrados, os status das ADRs estão incompletos e a referência ao PR não foi atualizada.

## Observações sobre Uso de IA

A equipe declarou uso do Claude na Entrega 2 para apoio na atualização do README, com validação por conferência manual do conteúdo adicionado e dos links referenciados. A declaração é compatível com o README atualizado, mas não cobre explicitamente os demais artefatos entregues na Inception, como `docs/inception.md`, `docs/dod.md` e as ADRs. Se houve apoio de IA nesses documentos, ele deve ser registrado; se não houve, o registro atual é suficiente apenas para o artefato README.
