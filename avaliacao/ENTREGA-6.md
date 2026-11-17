# Avaliação da Entrega 6 - Sprint 2

## Identificação

- Equipe: es2-2026_2-equipe-4
- Projeto: PublicaIFSC
- Entrega: 6 - Sprint 2
- Repositório confirmado pela configuração: `IFSC-ES2/es2-2026_2-equipe-4`
- MVP original: submissão de artigos com metadados/PDF, listagem pública pesquisável e armazenamento seguro.
- Escopo replanejado para a Sprint 2: vitrine de projetos universitários, contas, JWT, submissão autenticada, leitura pública pela API e execução completa por Docker Compose.
- Pull request final avaliado: [#121](https://github.com/IFSC-ES2/es2-2026_2-equipe-4/pull/121), de `entrega-6` para `main`.
- Versão considerada: `0ee474a97a71f30e0fbdf7b83c6b02dd12b3df5a`, merge registrado pela API em 02/10/2026 às 00:16:43 (UTC−3).
- Comparação com a Sprint 1: `v0.1.0`, commit `74be9d8`.
- Tag/release esperada e encontrada: `v0.2.0`, apontando ao merge da entrega; publicação em 02/10/2026 às 13:41:08 (UTC−3).
- Prazo normativo: 01/10/2026.

## Documentos Consultados

Somente documentos e artefatos do repositório da equipe:

- `README.md`, `USO-IA.md` e `src/frontend/README.md`.
- `.github/PULL_REQUEST_TEMPLATE.md` e `.github/ISSUE_TEMPLATE/feature.md`, `task.md` e `fix.md`.
- `.github/workflows/ci.yml` e configurações documentais associadas.
- `docs/inception.md`, `docs/BASELINE.md`, `docs/ESTIMATIVAS.md` e `docs/METRICAS.md`.
- Todas as fichas `docs/metricas/M-01.md` a `M-08.md`.
- `docs/riscos.md`, `docs/qualidade.md`, `docs/dod.md` e `docs/fluxo-de-trabalho.md`.
- `docs/sprints/sprint-1.md` e `docs/sprints/sprint-2.md`.
- Todos os ADRs existentes: `docs/adr/ADR-0001.md`, `ADR-0002.md` e `ADR-0003.md`.
- Documentação interna `src/backend/docs/primeiro_commit.md`, `segundo_commit.md`, `terceiro_commit.md`, `quarto_commit_dc.md`, `quinto_commit.md` e imagem `services_run.png`.
- `src/backend/projetos/rotas-login.md` e `rotas-de-criacao-de-contas.md`.
- Código, testes, Dockerfiles, arquivos de build, `docker-compose.yml`, `main.py`, `file-test/test_post.sh` e scripts em `testes-manuais-python/`.
- Issues originais #17–#22 e tarefas da Sprint 2, especialmente #85–#89, #94, #96, #97, #100, #101, #103, #104 e #106.
- PRs #98/#99/#102/#105/#107–#110/#114–#116/#118–#121, seus reviews/checks, histórico Git, proteção e release.
- [Project 34 — equipe 4](https://github.com/orgs/IFSC-ES2/projects/34) e milestone da entrega.

## 1. Descrição — Resumo da Entrega

O MVP original publica artigos com metadados/PDF e oferece listagem pesquisável. Autenticação e revisão estavam fora do recorte. A Sprint 2 registra mudança para vitrine de projetos com contas, JWT, imagens/links, publicação autenticada e leitura pública na API. Há evidência contemporânea: comentário de Pedro na issue #85, de 23/09 às 20h55 (UTC−3), registra a decisão conjunta. Não se ignora o pivô nem se exige PDF como requisito imutável, mas README/Inception/qualidade não foram reconciliados com a nova proposta.

O incremento é material: contas com hash de senha, login, filtro JWT, autoria definida pelo usuário autenticado, listagem/detalhe na API, páginas de login/cadastro/submissão, Compose completo e expansão dos testes/CI. Não é só renomeação. A interface pública de descoberta/listagem e a busca continuam pendentes, explicitamente fora da seleção desta sprint. A frase “qualquer pessoa vê a lista” exige a ressalva de que a leitura entregue é via API, não por uma vitrine visual.

Há testes unitários e integração HTTP com persistência real; o PR final teve sete checks bem-sucedidos. As principais lacunas são ausência dos dois padrões OO justificados, autorização de contas sem verificação de titularidade, segredo JWT padrão conhecido, validação/armazenamento incompletos e fechamento documental com placeholders. A integração e a release ocorreram em 02/10, embora o código estivesse consolidado na branch em 01/10. O atraso é registrado sem inventar prorrogação ou multa percentual não prevista.

## 2. Itens Obrigatórios da Entrega

Os itens abaixo são subitens comprovados, não pontuação integral automática nos critérios compostos:

### 2.1 Planejamento da Sprint 2

- **Atendido:** Meta, seleção de issues, dependências, justificativa e mudança de escopo registradas em `docs/sprints/sprint-2.md:3–42` e na issue #85.
- **Parcialmente atendido:** Planejamento com pivô contemporaneamente comunicado, mas formalização tardia, itens não reestimados e balanço final não preenchido.
- **Não atendido:** Fechamento das seções de concluídos, parciais/replanejados, análise de métricas e marco no documento da Sprint 2.

#### A1 — Pivô registrado, MVP oficial contraditório

- **Categoria:** escopo/requisitos.
- **Evidência:** `sprint-2.md:5,21–41` e comentário na issue #85 documentam a mudança de artigos/PDF para projetos/JWT. Entretanto, `README.md:42–67` e `inception.md:55–109` ainda prometem artigos/PDF/busca e mantêm login fora do MVP; `README.md:228–245` descreve outro produto. Qualidade ainda orienta adiar React/autenticação, já implementados. A mudança explica reaproveitamento/dependências, mas não fecha de forma suficiente a nova proposta de valor e suas prioridades.
- **Impacto:** crédito pelo replanejamento e incremento real, sem aceitar que o MVP original esteja concluído nem que busca/listagem deixaram automaticamente de ser pendências.
- **Recomendação:** versionar uma definição única de MVP e propagar o pivô a Inception, backlog, baseline, qualidade e ADRs.

#### A2 — Planejamento e fechamento incompletos

- **Categoria:** planejamento.
- **Evidência:** O documento formal entrou em `90e5833`, 01/10 às 12h19, após trabalho iniciado em 22/09; a comunicação de 23/09 impede afirmar ausência de planejamento anterior. Os itens novos não foram reestimados (`sprint-2.md:23`). Seções 5.2/5.3, 6 e 8 (`:50–70,84–89`) mantêm “A preencher ao longo da sprint”. As fichas individuais mitigam a falta de números, mas não substituem planejado versus executado.
- **Impacto:** atendimento parcial e evidência de fechamento inferior ao declarado na release.
- **Recomendação:** planejar antes de implementar e concluir o balanço com links/resultados/pendências antes do marco.

### 2.2 Incremento funcional do MVP

- **Atendido:** Incremento de contas/login/publicação atravessando React, API Spring e MongoDB, ligado a issues e PRs.
- **Atendido:** Autor da publicação obtido da identidade autenticada, com sobrescrita do autor/id recebidos do cliente (`J/services/ProjetoService.java:65–80`).
- **Atendido:** Consultas públicas de listagem/detalhe implementadas na API; submissão protegida por JWT.
- **Parcialmente atendido:** Incremento funcional real, porém proposta do MVP documentalmente contraditória, vitrine visual não entregue e segurança/validação de contas/publicações incompletas.
- **Não atendido:** Autorização por titular nas operações de atualização/exclusão de contas, apesar de exigirem autenticação.

Não se trata como descumprimento autônomo a ausência de toda funcionalidade futura do MVP. A limitação avaliada é a falta de uma definição única e coerente do escopo e a qualidade dos fluxos efetivamente entregues, não a exigência de concluir integralmente a vitrine nesta etapa.

#### A3 — Contas autenticadas sem autorização por titular

- **Categoria:** segurança/implementação.
- **Evidência:** `J/login/security/Authorization.java:39–47` exige apenas autenticação nas operações restantes. `accountcreation/controller/AccountController.java:58–81` não verifica a identidade contra o recurso; `UserService.java:41–50` escolhe a conta pelo e-mail enviado e permite mudar nome/senha, e `:58–60` exclui pelo id da URL.
- **Impacto:** pela leitura estática, usuário autenticado pode alterar senha de outro e-mail ou excluir outro id. Não foi realizada exploração dinâmica. A falha compromete o próprio incremento de gestão de contas, não é mera preferência arquitetural.
- **Recomendação:** vincular operações ao principal autenticado e testar acesso cruzado, além dos casos positivos.

#### A4 — Segredo JWT e configuração insegura por padrão

- **Categoria:** segurança/configuração.
- **Evidência:** `B/src/main/resources/application.properties:23–31` contém credenciais e fallback fixo de assinatura; Compose não fornece `JWT_SECRET` alternativo e publica o banco com credenciais de desenvolvimento. R08 reconhece a situação, mas a mitigação está pendente no marco.
- **Impacto:** a execução padrão documentada utiliza segredo conhecido, comprometendo a confiança em tokens; não se afirma comprometimento de ambiente real.
- **Recomendação:** exigir segredo externo, retirar credenciais fixas da configuração operacional, rotacioná-las e restringir acesso ao banco. O JWT está implementado; o problema é a segurança da configuração entregue.

#### A5 — Vínculo de autoria correto; metadados e uploads incompletos

- **Categoria:** integridade/contrato.
- **Evidência:** `ProjetoService.java:65–80` resolve o usuário autenticado, zera id recebido e define autor, comportamento testado. Porém, a API só exige título, enquanto `F/src/pages/Submissao/Enviar.jsx:15–20,79–94` exige também resumo/tema/autores/tecnologias. Upload aceita arquivo não vazio sem política própria de tipo/tamanho/propriedade (`ProjetoService.java:32–58`); metadados aceitam ids de imagens sem verificar existência/titularidade. Uploads precedem gravação do projeto, sem compensação se a etapa final falhar. Não há rota de leitura de imagem.
- **Impacto:** riscos de arquivos órfãos/referências inválidas e validação desigual. O limite padrão de 1 MB existe, não equivale a política adequada nem a “sem limite”.
- **Recomendação:** validar no servidor, associar arquivo ao usuário, validar referências e compensar falhas parciais; criar leitura controlada e contrato único.

#### A6 — Listagem somente na API

- **Categoria:** completude/coerência funcional.
- **Evidência:** Controller/service implementam GET público de listagem/id, mas `F/src/main.jsx:17–23` oferece apenas login, cadastro e submissão, com redirecionamento inicial para login. `sprint-2.md:41` exclui a tela da seleção; README reconhece tela/busca pendentes, mas afirma “qualquer pessoa vê a lista”.
- **Impacto:** há backend real, não ausência total de listagem; a experiência de descoberta pública do produto permanece incompleta.
- **Recomendação:** qualificar o que funciona via API e priorizar a interface pública conforme o novo MVP, sem declarar pronta uma vitrine visual inexistente.

### 2.3 Testes automatizados relacionados às funcionalidades implementadas

- **Atendido:** Testes automatizados versionados, comandos padrão e integração HTTP real de cadastro/login/publicação/persistência.
- **Parcialmente atendido:** Suíte com testes de unidade e integração HTTP reais, mas sem autorização cruzada de contas, GETs públicos e upload completo/falhas entre operações.

#### A7 — Testes reais e executáveis, com lacunas relevantes

- **Categoria:** testes/verificação.
- **Evidência:** `T/login/AuthHttpIntegrationTest.java:30–40,61–113` usa servidor real, HTTP, repository e banco para cadastro/hash/login/token/dados inválidos. `T/ProjetoHttpIntegrationTest.java:30–51,69–106` publica com autor correto e verifica rejeição sem token/inválido sem persistência. Existem unidades e quatro arquivos de testes frontend. O [run 36953871579](https://github.com/IFSC-ES2/es2-2026_2-equipe-4/actions/runs/36953871579) executou Gradle test com sucesso e **14 testes frontend** aprovados. Os **20 métodos de teste backend** são contagem do código versionado; não foram recuperados resultados JUnit individualizados para certificar cada um separadamente. O arquivo `Enviar.contract.test.jsx` usa fetch simulado, não servidor real. Faltam acesso cruzado às contas, GETs exigidos por #103, upload HTTP/GridFS real e falha parcial.
- **Impacto:** crédito forte, sem inferir cobertura percentual ou completude.
- **Recomendação:** ampliar casos negativos, leitura pública e armazenamento; controlar separadamente unidade, composição e integração.

### 2.4 Integração contínua em uso

- **Atendido:** Build/testes backend/frontend e verificações documentais efetivamente executados no PR #121, todos verdes antes do merge.
- **Não atendido:** Obrigatoriedade dos dois jobs de build, além dos testes, nas proteções consultadas.

Achado relacionado: A11 (item 2.5).

### 2.5 Fluxo de trabalho evidenciado no repositório

- **Atendido:** PRs intermediários/final aprovados por colegas e integração por merge commit, sem evidência de desenvolvimento direto indevido em `main` no recorte.
- **Atendido:** Proteção de `main` e `entrega-*` confirmada conclusivamente por API.
- **Parcialmente atendido:** Fluxo de PR/CI praticado adequadamente, mas builds não obrigatórios nas regras atuais, validação de configurações insuficiente e marco concluído após a data prevista.

#### A11 — Fluxo efetivamente seguido, gates incompletos

- **Categoria:** Git/CI.
- **Evidência:** Os 14 PRs internos consultados e o final têm aprovação de colega e checks verdes. PR #109 teve build frontend reprovado; Pedro corrigiu `react-router-dom` em `a7e5037`, e nova execução passou antes de integrar. #121 teve sete checks com sucesso ainda em 01/10, e Juliano aprovou o head `fac175c` antes do merge commit. Não há evidência de desenvolvimento direto indevido em `main`; #117 com base incorreta foi fechado sem merge e reapresentado em #119. Não há validação explícita da sintaxe de Compose/configurações nem lint de código JS no pipeline; lint Markdown não equivale a isso.
- **Proteção verificada por API/CLI:** `branches/main/protection` confirma uma aprovação, `strict:true`, bloqueio de force push/exclusão e cinco checks obrigatórios: documentos, links, Markdown, testes backend e frontend. `enforce_admins:false`, aprovação antiga não é descartada nem se exige revisão do último push. `rulesets?includes_parents=true` retorna **20822350**, ativo para `entrega-*`, com aprovação e os mesmos checks, sem bypass cadastrado. `rules/branches/main` retorna `[]` porque a proteção da `main` é clássica: não significa ausência de proteção. Os builds backend/frontend executaram, mas **não são obrigatórios** nas regras atuais; squash/rebase continuam habilitados, embora o método observado seja merge commit. A consulta é conclusiva e não exige pergunta ao professor; não representa auditoria completa da configuração histórica.
- **Impacto:** maior parte do fluxo atendida, sem classificar o CI como nominal.
- **Recomendação:** ampliar validações, preservar revisão do estado final e integrar com antecedência ao prazo.

### 2.6 Aplicação justificada de padrões OO

- **Não atendido:** Aplicação **justificada de pelo menos dois padrões OO**, com participantes, problema, adequação, benefícios/trade-offs e ADR pertinente.

#### A8 — Dois padrões OO justificados não entregues

- **Categoria:** requisito técnico.
- **Evidência:** Só há ADRs 0001–0003 sobre arquitetura, stack e React, sem atualização de padrões nesta sprint. Documento de padrões não existe no marco; R10 (`riscos.md:114`) reconhece a pendência e #94 solicita a seção/arquivo. Beans singleton, `PasswordEncoder`, configuração `@Bean`, repositories e injeção são mecanismos legítimos, mas não substituem duas escolhas explicitamente aplicadas/justificadas com consequências pela equipe.
- **Impacto:** **0,0/1,5** no critério específico; não se afirma que o sistema deixou de ser OO.
- **Recomendação:** selecionar problemas reais de design, aplicar soluções adequadas e documentar participantes, benefícios/trade-offs e ADR; não criar padrões artificiais nem creditá-los retroativamente por nomes do framework.

### 2.7 Atualização das métricas

- **Atendido:** Oito fichas de métricas, revisão dos riscos e contribuições individuais atualizadas, embora parcialmente consistentes.
- **Parcialmente atendido:** Métricas/riscos/contribuições presentes, com denominadores/fontes/recortes insuficientes, responsáveis indefinidos e estado final parcialmente superado.

#### A9 — Métricas atualizadas, nem todas auditáveis

- **Categoria:** acompanhamento.
- **Evidência:** M-01 compara 1.055→1.962 NCLOC e M-04 explicita dependências/7→31; M-05/M-08 discutem retrabalho/pivô. Porém, M-05 usa sete PRs como denominador, contra 14 PRs internos integrados, sem corte final claro; M-07 informa apenas `VC=-1`, sem planejado/realizado; M-02 é majoritariamente narrativa, não coleta sistemática de complexidade por método. M-06 usa 1,938 KLOC contra 1,962 em M-01 e não vincula o defeito contado. M-03 informa 77,08% de cobertura sem comando/relatório reproduzível no build/CI; arquivos brutos foram removidos por `630ad34`.
- **Impacto:** coleta/análise reais, mas insuficiência de fonte/recorte, sem imputar falsificação.
- **Recomendação:** conservar dados, comandos, escopo de medição e corte temporal final e reconciliar denominadores.

### 2.8 Atualização dos riscos

#### A10 — Riscos e board parcialmente consolidados

- **Categoria:** gestão/rastreabilidade.
- **Evidência:** `riscos.md:94–120` revisa riscos anteriores e cria R08–R11, mas R02/R03 mantêm `[Nome do integrante]` e novos responsáveis ficam “A definir”. R05 ainda diz faltarem testes de cadastro/login, já presentes. Project 34 inclui #103/#106, mas não #101/#104 no conjunto consultado; itens antigos de artigos/PDF permanecem no backlog. #106, atribuída a Gabriel/Bernardo, foi fechada em 01/10 às 15h36, antes do build corrigido e do merge #109 às 19h13. #94 e #100 só foram encerradas em outubro posterior e não recompõem padrões/segurança da Sprint 2.
- **Impacto:** acompanhamento parcial, não inexistente. Dados atuais não são fotografia integral do prazo; não se presume que item ausente hoje nunca esteve no quadro.
- **Recomendação:** sincronizar DoD, cartões/PRs, responsáveis e riscos no fechamento, preservando histórico de replanejamento.

### 2.9 Documentação atualizada

- **Parcialmente atendido:** Documentação operacional extensa e release real, porém escopo, guias de API, scripts e fechamento não refletem integralmente o artefato.
- **Parcialmente atendido:** Uso de IA materialmente compatível com artefatos/histórico, com caminhos antigos, reutilização sem origem precisa e validação genérica ou não atualizada.
- **Não atendido:** Registro em ADR das decisões arquiteturais decorrentes da mudança de produto (autenticação com Spring Security/JWT e substituição do PDF por imagens/links) e atualização dos artefatos de definição do produto.

#### A12 — Documentação e validação manual não sincronizadas

- **Categoria:** documentação.
- **Evidência:** Sprint 2 conserva placeholders; DoD cita `entrega-2`, fluxo cita `entrega-4`/três checks e qualidade pressupõe ausência de login/React/PDF. Guias de API divergem: `/auth/` versus `/auth/status`, todas as rotas protegidas versus GETs públicos, e erro string/objeto ou `path`/`caminho`. Comandos principais de teste correspondem aos scripts, mas a descrição da suíte é antiga e `ProjetosApplicationTests` força URI Mongo sem credenciais, diferente do Compose autenticado; sem execução local, isso não prova falha global da suíte. Scripts manuais usam métodos/status/campos/rotas antigos, sem JWT, e `main.py` ainda trata PDF.
- **Impacto:** instruções úteis, porém precisão/revalidação final parciais.
- **Recomendação:** identificar scripts históricos, alinhar contratos e documentar configuração de teste consistente para toda a suíte.

#### A14 — Mudança de produto sem atualização dos artefatos de definição e das ADRs

- **Categoria:** documentação/arquitetura/rastreabilidade.
- **Evidência:** a mudança decidida na sprint review de 23/09 alterou a entidade central, o tipo de arquivo armazenado e os limites do MVP. A Inception (`inception.md`, seção “Premissas, restrições e limitações”) afirma que “o sistema não terá, nesta etapa, autenticação ou controle de perfis de usuário” e lista cadastro/autenticação como fora do MVP; no marco, cadastro, login JWT e publicação autenticada formam o núcleo da sprint. O modelo `dtos/Projeto.java` substitui artigo/PDF por título, resumo, autores, tecnologias, tema, imagens e links, e o GridFS passa a armazenar imagens (`ProjetoService.java:45`). `build.gradle:45–54` acrescenta `spring-boot-starter-security` e `jjwt`. Entre `v0.1.0` e `v0.2.0`, a pasta `docs/` só teve alterados `sprints/sprint-2.md`, `riscos.md` e as fichas de métricas, além do `README.md`; `inception.md`, `BASELINE.md`, `ESTIMATIVAS.md`, `qualidade.md`, `dod.md`, `fluxo-de-trabalho.md` e as ADRs 0001–0003 permaneceram inalterados. Nenhuma ADR registra a adoção de Spring Security/JWT nem a troca de PDF por imagens/links. As issues #19–#22 continuam abertas com títulos de artigo/PDF, embora `sprint-2.md:41` declare que #19 e #22 “precisam ser reescritas” e que a parte backend de #20 foi entregue em #103. Permanecem resíduos do modelo anterior no código entregue, como `"Artigos API"` em `ConfiguracaoController.java:38`. `sprint-2.md` é o único documento do marco que registra a mudança, como decisão de planejamento e não como decisão de produto ou de arquitetura. A reconciliação posterior feita na Entrega 7, em 23/10 (README reescrito, revisão de ADRs em #130/#143 e `REENGENHARIA.md`), está fora da janela desta entrega e não é creditada aqui.
- **Abrangência em relação a outros achados:** a contradição entre README/Inception e o novo MVP (A1), a ausência de reestimativa (A2), o backlog antigo no board (A10) e o documento de qualidade desatualizado (A12) já foram considerados nos respectivos critérios. Este achado acrescenta a ausência de registro arquitetural das decisões técnicas trazidas pela mudança e o conjunto de artefatos de definição não revisados, que o item 9(c) do enunciado exige quando aplicável.
- **Impacto:** a mudança é substancial, pois redefine o produto, e não apenas ajusta o escopo: a principal exclusão do MVP original passou a ser o centro da entrega. Decisões com impacto arquitetural e de segurança ficaram sem ADR, e os documentos que definem o produto continuaram descrevendo outro sistema. Isso justifica desconto adicional de **0,1** no critério de documentação (de 0,8 para 0,7), restrito à parte não descontada em A1, A2, A10 e A12. Não se penaliza a mudança em si, que foi comunicada e decidida em conjunto.
- **Recomendação:** registrar ADRs para a autenticação/autorização com JWT e para o novo modelo de armazenamento; revisar Inception, baseline, estimativas, qualidade e DoD para o novo produto; reescrever ou encerrar com justificativa as issues #19–#22; e remover os resíduos do modelo de artigos no código.

### 2.10 Release do marco

- **Atendido:** Tag/release `v0.2.0` existente e no commit correto; uso de IA declarado com responsabilidade técnica/acadêmica.
- **Não atendido:** Integração final e publicação da release dentro de 01/10/2026.
- **Não atendido:** Conteúdo completo da release sobre padrões aplicados, limitações e pendências.

#### A13 — Marco existente, tardio e incompleto

- **Categoria:** release/prazo.
- **Evidência:** PR #121 abriu em 01/10 às 23h03min47s, com checks concluídos até 23h04min57s. Aprovação ocorreu em **02/10 às 00h16min34s**, merge às **00h16min43s** e publicação por Pedro às **13h41min08s**, todos em UTC−3. A tag correta aponta ao merge, mas release não apresenta padrões, limitações e pendências e afirma “fechamento formal” apesar dos placeholders.
- **Impacto:** marco parcialmente atendido e após a data normativa, sem presumir prorrogação nem aplicar percentual automático não previsto. Não se diz que todo o desenvolvimento foi posterior ao prazo.
- **Recomendação:** concluir aprovação/integração e publicar marco completo dentro da data, com limitações e próximos passos verificáveis.

### 2.11 Registro das contribuições individuais

Achado relacionado: A10 (item 2.8).

#### Análise das Contribuições Individuais

O intervalo `74be9d8..0ee474a` tem **46 commits sem merge**: Bernardo 2, Marcos 12, Juliano 6, Pedro 23 e Gabriel 3, reunindo aliases/e-mails. O merge `ab598df`, de Juliano, contém alterações substantivas de testes e não é descartado como merge meramente administrativo. Quantidade/linhas são apoio, não fórmula de desempenho.

- **Bernardo Vieira de Souza:** dois commits em 01/10 às 21h24/21h29, `a0b6c9f` e `a7d0228`, atualizam CBO/M-04 e NCLOC/M-01 com contagens, comparação e interpretação, contribuição documental útil e confirmada em `sprint-2.md:79`. Não há aprovação sua nos 15 PRs examinados nem autoria rastreável da #106 coatribuída, implementada por Gabriel com correção de Pedro. Como Arquiteto/Scrum Master, não se demonstraram planejamento/coordenação contínuos, ADRs/padrões ou comunicação de impedimentos equivalentes às responsabilidades. A nota não deriva só de dois commits: considera estreiteza de atuação e colaboração observável. Não se presume ausência absoluta de apoio externo.

- **Marcos Júnior Lemes Ferreira:** 12 commits em 28/09, 29/09 e 01/10; cadastro/persistência (`7c8e905`, `7b4fd20`, `77e3f93`), JWT/integração (`d02a526`, `38bd186`, `e6cbe78`), scripts/rotas, M-02 (`4adc3a7`) e quatro aprovações (#98/#99/#110/#115). Entrega relevante que habilita publicação autenticada, com evolução em mais de um dia e revisão de infraestrutura. Parte do trabalho DevOps foi realizada por Pedro; Marcos revisou/integrou, não recebe autoria integral. Há falhas de autorização/configuração nos módulos adaptados, e os scripts não representam toda a API final. O reaproveitamento de outro projeto é declarado: reconhece-se adaptação/integração, sem supor criação integral nem inferir plágio.

- **Juliano Tavares da Silva:** seis commits lineares e trabalho relevante em `ab598df`, concentrados em 01/10: testes de cadastro/login/JWT (`6499248`), HTTP/publicação (`c969faa`), divergência API/formulário (`a92b67b`), testes frontend, validação (`806b6de`) e M-03/M-06. PR #110 foi aberto por Pedro, mas contém testes de Juliano; não se transfere autoria. Cinco aprovações (#108/#116/#118/#120/#121), merges e correção de validações mostram apoio real à integração. Perdas por QA concentrada no último dia, lacunas de autorização/GET/upload e menor auditabilidade das métricas após retirada de arquivos brutos; aprovação/merge final ocorreram após a data.

- **Pedro Henrique Bernhardt Valete:** 23 commits distribuídos por 22, 23, 28, 29/09 e 01/10. Docker/Compose (`60d7430`, `e3fe018`, `ebb095c`, `59666b0`), builds CI (`bde9080`, `0fdbaa1`), remodelagem/campos/GET/autoria (`a87d8c6`, `621e48d`, `dbbb1d0`, `1168323`, `7ce7741`), correção do router (`a7e5037`), planejamento, riscos, README, M-05/M-08, registro individual e release. Comunicou o pivô em #85, aprovou quatro PRs e apoiou outras frentes. Maior continuidade/abrangência observável, além de DBA, com concentração objetiva de integração/fechamento nele. Apoiar os demais é mérito, não motivo de desconto. Perdas por formalização/fechamento incompletos, métricas/riscos não reconciliados e release tardia/incompleta, sem atribuir-lhe causa exclusiva do atraso coletivo.

- **Gabriel Ferreira de Souza da Silva:** três commits em 01/10. `6eff62f` concentra Login/Cadastro/Header e adaptação da submissão; `86c6c2e`/`6dcfa6f` atualizam M-07. PR #109, sincronização de branch e três aprovações (#107/#110/#114) demonstram contribuição funcional e colaboração. O primeiro lote de implementação entrou no último dia; tarefa foi fechada antes de build/merge, dependência ausente foi corrigida por Pedro e testes/validação receberam apoio de Juliano. Perdas por baixa visibilidade incremental, fechamento prematuro e necessidade comprovada de apoio final, não simplesmente pelos três commits nem por suposta inatividade externa.

**Colaboração, absorção e limites:** Pedro realizou infraestrutura atribuída também a Marcos, revisada/integrada por este; corrigiu o build do frontend de Gabriel; Juliano ampliou testes/validações. Bernardo era coatribuído à #106 sem execução/review rastreável correspondente. Isso prova apoio cruzado e concentração de implementação/coordenação, sobretudo em Pedro, mas não abandono deliberado, recusa de colaboração ou causa pessoal de redistribuição. Aprovações predominantemente vazias comprovam revisão formal, não sua profundidade. Há comunicação contemporânea do pivô na #85, mas faltam reportes intermediários suficientes nas fontes examinadas para afirmar previsibilidade plena de todos. Não foram examinadas conversas privadas, avaliações entre pares ou justificativas pessoais.

## 3. Critérios de Avaliação (10 pts)

### Nota da Entrega

| Critério | Máximo | Nota |
|---|---:|---:|
| Planejamento da Sprint 2 | 1,0 | 0,7 |
| Incremento funcional central, integrado e demonstrável | 2,0 | 1,3 |
| Testes automatizados coerentes e executáveis | 1,5 | 1,3 |
| Pelo menos dois padrões OO justificados | 1,5 | 0,0 |
| Métricas, riscos, backlog, board e contribuições | 1,0 | 0,6 |
| Fluxo de trabalho e CI | 1,5 | 1,3 |
| README, documentação, uso de IA e release | 1,5 | 0,7 |
| **Total** | **10,0** | **5,9** |

### Justificativa da Nota

**Nota coletiva: 5,9/10,0.** Há evolução técnica substancial, com autenticação e publicação conectadas, autoria preenchida no servidor, testes unitários/HTTP com banco real, CI efetivamente usado e PRs aprovados por colegas. O replanejamento possui evidência contemporânea, e as métricas/riscos e instruções receberam trabalho concreto.

A ausência de dois padrões OO justificados impede pontuar esse requisito de 1,5 ponto. As demais perdas decorrem da segurança de contas/configuração padrão, do escopo oficial contraditório, da validação/experiência pública incompletas, do planejamento e fechamento não concluídos, de métricas/board/riscos parcialmente auditáveis e de documentação/release com lacunas. A mudança de produto ocorrida na sprint não foi refletida em ADRs nem nos artefatos de definição (A14), o que reduz em 0,1 o critério de documentação, sem repetir os descontos já aplicados em A1, A2, A10 e A12. Builds executam, mas não são gates obrigatórios; integração e publicação do marco ocorreram após a data normativa.

O atraso é registrado sem multa percentual arbitrária e sem classificar todo o desenvolvimento como posterior ao prazo. A falta de padrões é concentrada no seu critério, não novamente descontada com o mesmo peso em documentação. Produto, alcance dos testes, governança e precisão documental são distinguidos por seus efeitos próprios. Não se exige o MVP inteiro pronto nem se ignora o pivô documentado; exige-se coerência e evidência do recorte efetivamente entregue.

### Notas Individuais

As notas avaliam contribuição observável na Sprint 2: aderência às responsabilidades, relevância/resultado, periodicidade/oportunidade, rastreabilidade, comunicação, integração e colaboração. Não são proporcionais à contagem de commits nem transportadas de entregas anteriores.

| Integrante | Nota individual |
|---|---:|
| Bernardo Vieira de Souza | **3,5** |
| Marcos Júnior Lemes Ferreira | **7,5** |
| Juliano Tavares da Silva | **8,0** |
| Pedro Henrique Bernhardt Valete | **9,0** |
| Gabriel Ferreira de Souza da Silva | **6,5** |

- **Bernardo — 3,5:** métricas específicas e úteis reconhecidas, mas autoria em curto intervalo final, sem revisão ou evidência comparável de arquitetura/coordenação; participação estreita diante do papel declarado.
- **Marcos — 7,5:** contas/JWT e revisões relevantes; perdas por qualidade de autorização/configuração, validação manual não reconciliada e correspondência parcial ao papel DevOps, sem invalidar o reaproveitamento declarado.
- **Juliano — 8,0:** testes HTTP reais, correções e revisões substanciais, coerentes com QA; perdas por concentração final, cenários de segurança/leitura não verificados e métricas pouco auditáveis.
- **Pedro — 9,0:** maior contribuição incremental e transversal, comunicação do pivô e apoio comprovado à integração; perdas no fechamento, documentação/métricas e publicação, sem penalizar o apoio a outras áreas.
- **Gabriel — 6,5:** implementação frontend real e revisões reconhecidas; perdas por entrega concentrada, encerramento antes da integração e problemas de build/testes que exigiram apoio externo à sua frente.

Evidências contemporâneas adicionais podem fundamentar revisão individual; não se conclui ausência absoluta de trabalho fora dos registros. O resultado técnico final não elimina o efeito da oportunidade e da colaboração sobre o processo coletivo.

### Notas Compostas por Integrante

Conforme o modelo de registro solicitado pelo professor, combina-se **30% da coletiva e 70% da contribuição individual**. Os critérios técnicos da entrega são exclusivamente os da rubrica normativa.

`nota composta = (nota coletiva × 0,30) + (nota individual × 0,70)`

| Integrante | Nota coletiva | Nota individual | Cálculo | Nota composta |
|---|---:|---:|---:|---:|
| Bernardo Vieira de Souza | 5,9 | 3,5 | `(5,9 × 0,30) + (3,5 × 0,70) = 4,22` | **4,2** |
| Marcos Júnior Lemes Ferreira | 5,9 | 7,5 | `(5,9 × 0,30) + (7,5 × 0,70) = 7,02` | **7,0** |
| Juliano Tavares da Silva | 5,9 | 8,0 | `(5,9 × 0,30) + (8,0 × 0,70) = 7,37` | **7,4** |
| Pedro Henrique Bernhardt Valete | 5,9 | 9,0 | `(5,9 × 0,30) + (9,0 × 0,70) = 8,07` | **8,1** |
| Gabriel Ferreira de Souza da Silva | 5,9 | 6,5 | `(5,9 × 0,30) + (6,5 × 0,70) = 6,32` | **6,3** |

## 4. Observações

### Observações sobre Uso de IA

`USO-IA.md` inclui declaração de responsabilidade (`:5–10`) e registros de Claude, Copilot, Codex, ChatGPT e outros apoios históricos, cobrindo templates, documentação, métricas, CI, testes, persistência, containers e interface. Na Sprint 2, declara Compose, scripts manuais, adaptação de cadastro/JWT, renomeação, páginas de login/cadastro e planejamento (`:146–194`).

Os artefatos foram encontrados ou associados a equivalentes históricos/renomeados. Backend `artigos` passou a `projetos`; classes de arquivo correspondem às de projeto no histórico; caminhos `Front-end/...` têm equivalentes atuais em `src/frontend/`. `sprint-1.mds` é erro de referência a `docs/sprints/sprint-1.md`. Pacotes de cadastro/login existem, mas os caminhos `../../backend/artigos/...` não são válidos no marco final. O tipo de apoio declarado é compatível com os conteúdos e commits, e os PRs revisados/CI fornecem evidência de intervenção e validação automatizada reais.

As limitações são concretas:

- Registros críticos usam “Revisados e executados” sem casos, resultados ou referência de execução.
- Scripts Python/shell declarados revisados/executados ainda esperam métodos/status/campos antigos, executam operações protegidas sem JWT e não representam o contrato final. Isso não prova que nunca foram executados na data original, mas não sustenta revalidação da versão entregue.
- Cadastro/login foram declaradamente reaproveitados de outro projeto, sem origem, autoria/licença ou revisão de origem identificadas. É lacuna de rastreabilidade a esclarecer, não prova de plágio.
- A afirmação ampla de revisão/validação não elimina autorização cruzada, segredo padrão, contratos divergentes e documentação incompleta. Não há entrada específica S2 para novos testes; sem indício adicional, isso não comprova apoio de IA não declarado nessa atividade.

**Conclusão explícita:** a declaração é **materialmente compatível com os artefatos existentes/históricos e tipos de apoio**, mas **apenas parcialmente verificável quanto à precisão e à validação final**. Há caminhos obsoletos, validações genéricas e scripts desatualizados, além de origem de reutilização a esclarecer. Não foram encontrados indícios fortes e verificáveis suficientes de uso oculto relevante de IA, fabricação de artefatos, plágio ou fraude; estilo textual não foi usado como prova. Compreensão técnica e responsabilidade deverão ser verificadas na defesa.

### Recomendações para a Equipe

- Consolidar o novo MVP e reestimar as dependências; substituir placeholders por resultados, parciais, replanejados e links do marco.
- Corrigir titularidade de contas e configuração de segredos; incluir testes de acesso cruzado e condições negativas.
- Aplicar/documentar dois padrões OO por problemas reais, sem tratar recursos do framework como justificativa automática.
- Validar metadados/arquivos/referências no servidor, associar proprietário e compensar uploads órfãos; entregar leitura segura de imagens.
- Priorizar a experiência pública de listagem/busca conforme o novo recorte e distinguir funcionalidades de API das telas.
- Ampliar testes de GET/upload/segurança, uniformizar ambiente MongoDB dos testes e validar configurações/containers relevantes no CI.
- Tornar builds obrigatórios e reforçar revisão do último push, métodos de merge e proteção administrativa conforme a política pretendida.
- Conservar relatórios/comandos/dados de métricas, reconciliar denominadores e sincronizar riscos, responsáveis, board e DoD.
- Integrar/revisar com antecedência e publicar release completa no prazo, com padrões, resultados, limitações e pendências.
- Atualizar scripts/rotas/qualidade/Inception e registrar uso/reaproveitamento com origem, caminhos atuais e validações específicas.
- Registrar em ADR as decisões técnicas trazidas por mudanças de produto (autenticação JWT, novo modelo de armazenamento) e revisar baseline, estimativas e backlog sempre que o MVP for redefinido.
