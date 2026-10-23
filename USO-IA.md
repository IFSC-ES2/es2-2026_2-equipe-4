# Registro de uso de inteligência artificial

Conforme o *Protocolo de uso de inteligência artificial* da disciplina.

## Declaração de responsabilidade

> Declaramos que as ferramentas de inteligência artificial utilizadas neste projeto
> servem como apoio ao desenvolvimento. A equipe assume a responsabilidade acadêmica
> e técnica pelo trabalho e pela revisão, compreensão e validação dos artefatos.
> As verificações realizadas e as revisões pendentes são indicadas em cada registro.

## Registros

- Data: 06/08/2026
  Ferramenta: Claude
  Uso: apoio na criação dos templates
  Artefato: templates de issues e pull request
  Validação: pesquisa em documentos do github

- Data: 14/08/2026
Ferramenta: Claude
Uso: apoio na atualização do README.md.
Artefato: README.md
Validação: conferência manual do conteúdo adicionado e dos links referenciados

- Data: 26/08/2026
Ferramenta: Claude
Uso: apoio na criação e estudos para configuração dos checks obrigatórios (CI)
Artefato: ci.yml
Validação: sintaxe e flags conferidas na documentação do Github Actions e do lychee

- Data: 27/08/2026
Ferramenta: Claude
Uso: auxílio na formatação e estrutura em Markdown no arquivo de estimativas
Artefato: ESTIMATIVAS.md
Validação: visualização e validação manual da estrutura construída

- Data: 27/08/2026
Ferramenta: Generative Pre-trained Transformer (GPT)
Uso: Organização do MarkDown
Artefato: BASELINE.md
Validação: Leitura e pequenas correções feitas

- Data: 27/08/2026
Ferramenta: ChatGPT
Uso: apoio organização e documentação das métricas de produto, processo e projeto
Artefato: Fichas M-01.md a M-08.md em docs/metricas/
Validação: Conferência das métricas, fórmulas, classificações e interpretações com o material da disciplina e revisão manual dos documentos

- Data: 03/09/2026
Ferramente: Generative Pre-trained Transformer (GPT)
Uso: Organização do MarkDown - organização das tabelas
Artefato: riscos.md
Validação: Leitura e pequenas correções feitas 

- Data: 03/09/2026  
  Ferramenta: Claude
  Uso: apoio na seleção das regras do markdownlint e na construção do job de lint do CI
  Artefato: ci.yml e .markdownlint.jsonc
  Validação: a primeira execução local do linter avisou mais de 300 violações, com a grande maioria sendo de estilização.
  Optei por desativar esse conjunto padrão e ativar apenas as regras que pegam Markdown quebrado, tendo cada regra escolhida conferida
  na documentação do markdownlint e validado localmente.

- Data: 03/09/2026  
  Ferramenta: Claude
  Uso: apoio na definição dos critérios de qualidade do projeto (ajuda a relacionar os itens prioritários com os riscos).
  Artefato: docs/qualidade.md
  Validação: Conferi linha a linha o mapeamento risco → atributo de qualidade contra a tabela original de riscos, e verifiquei que as métricas citadas (ex.: complexidade ciclomática, acoplamento, densidade de defeitos) correspondem exatamente às já definidas nas métricas, sem duplicação. Também revisei a terminologia usada frente ao modelo ISO/IEC 25010.

- Data: 03/09/2026
  Ferramenta: Claude
  Uso: apoio na estrutura do documento de fluxo de trabalho
  Artefato: fluxo-de-trabalho.md
  Validação: cada tópico foi conferido no documento da entrega 4 e validado visualmente

- Data: 12/09/2026
  Ferramenta: Claude
  Uso: Nomeclatura de métodos da API em SpringBoot, e configurações para rotas inválidas. Desenvolvimento de DTO para agilizar o desenvolvimento.
  Artefatos: src/backend/artigos/src/main/java/ifsc/edu/artigos/dtos/* e src/backend/artigos/src/main/resources/application.properties
  Validação: A API foi inicializada com sucesso, as partes desenvolvida com IA foram testadas via requisições usando curl.

- Data: 14/09/2026
  Ferramenta: Claude
  Uso: Configuração rápida de um container e configuração necessaria para conectar com a API.
  Artefats: src/backend/artigos/src/main/resources/application.properties e docker-compose.yml
  Validação: A API foi inicializada corretamente, e um integrante da equipe, com experiência nessa área do desenvolvimento, realizou a revisão.
  
- Data: 14/09/2026
  Ferramenta: ChatGPT
  Uso: Apoio na implementação de um drag and drop dropzone.
  Artefato: Enviar.jsx
  Validação: Código revisado e adaptado.

- Data: 14/09/2026
  Ferramenta: Claude
  Uso: Apoio na persistência dos metadados no MongoDB, ajuda na correção de dependências e da property de conexão
  Artefatos: build.gradle, application.properties, ArquivoMetadadoDTO.java e ArquivoService.java
  Validação: Testado via Postman, podendo observar os dados persistindo depois de reiniciar a aplicação, com cada artigo recebendo ID único

- Data: 15/09/2026
  Ferramenta: Codex (GPT-5)
  Uso: Apoio na estruturação do formulário de submissão, validação dos campos e revisão do layout responsivo.
  Artefatos: Front-end/index.html, Front-end/src/Enviar.jsx, Front-end/src/Enviar.css e Front-end/src/index.css
  Validação: Código revisado pela equipe, lint e build executados com sucesso e layout conferido em tamanhos de desktop e celular.

- Data: 15/09/2026
  Ferramenta: Claude
  Uso: Ajuda nos estudos de configuração do CORS no Spring
  Artefatos: WebConfig.java
  Validação: Implementação do CORS no nosso backend, permitindo requisições da porta padrão do Vite (5173), e testando via fetch no navegador

- Data: 16/09/2026
  Ferramenta: Gemini
  Uso: apoio na inclusão de testes com Gradle no CI e criação dos testes unitários do backend
  Artefatos: ci.yml, ArquivoServiceTest.java e ArtigosApplicationTests.java
  Validação: execução dos testes via Gradle (`./gradlew test`) e validação da pipeline no GitHub Actions

- Ferramenta: ChatGPT
  Uso: Apoio na implementação da ponte (API) entre o Backend e Frontend.
  Artefato: Enviar.jsx
  Validação: Código revisado e adaptado.

  
- Data: 17/09/2026
  Ferramenta: ChatGPT
  Uso: Desenvolvimento do script que baixa os arquivos do banco usando Python
  Artefato: main.py
  Validação: Testado e revisado

- Data: 17/09/2026
  Ferramenta: Codex (OpenAI)
  Uso: Apoio na definição do escopo, coleta e documentação das métricas M-01 (NCLOC) e M-04 (CBO interno).
  Artefatos: docs/metricas/M-01.md e docs/metricas/M-04.md
  Validação: Conferência das contagens de linhas e das dependências internas por tipo no código-fonte; verificação com `git diff --check`.
  Ferramenta: Claude
  Uso: Apoio na formatação do README atualizado
  Artefato: README.md
  Validação: Revisado visualmente e validado

- Data: 17/09/2026
  Ferramente: Claude
  Uso: Formatação e ajuda na finalização da documentação da Sprint 1
  Artefato: sprint-1.mds
  Validação: Revisado visualmente e checado no Github

- Data: 22/09/2026
  Ferramenta: Claude
  Uso: Apoio na criação dos Dockerfile e ajuda na correção de problemas ao longo do processo
  Artefato: docker-compose.yml, src/backend/artigos/Dockerfile, src/frontend/Dockerfile, src/backend/artigos/.dockerignore, src/backend/artigos/build.gradle
  Validação: Após ajuda nas correções, foi revisado e testado ao vivo a aplicação por inteira, enviando um artigo de teste

- Data: 28/09/2026
  Ferramenta: Claude
  Uso: Desenvolvimento do script em python para realização dos testes manuais
  Artefato: testes-manuais-python/*
  Validação: Revisados e executados.
  
- Data: 28/09/2026
  Ferramenta: copilot  
  Uso: Desenvolvimento da path de criação de contas, ajustados erros de conexões e erros de importações das classes e ajuda na lógica de alguns endpoints
  Artefato: ../../backend/artigos/src/main/java/accountcreation/*
  Validação: Revisados e executados.
  Observação: O package de cadastro foi reaproveitado de outro projeto, sendo necessario somente a correção de integração para esse projeto e alteração do banco para mango.

- Data: 29/09/2026
  Ferramenta: codex  
  Uso: integração dos sistema, conf=iguração do JWT e corrigir erros;
  Artefato: ../../backend/artigos/src/main/java/accountcreation/* & ../../backend/artigos/src/main/java/login/* (Ele alterar algumas linhas detro desses package, em alguns alterou 1 ou 2 linhas, mas de modo geral ele fez uma revisão nos dois package por está dando alguns erros de integrações, e configurações)
  Validação: Revisados e executados.
  Observação: O package de login, assim como o cadastro, foi reaproveitado de outro projeto, sendo necessario somente a correção de integração para esse projeto e alteração do banco para mango.

- Data: 01/10/2026
  Ferramenta: Claude
  Uso: apoio na alteração de nomes de pastas e caminhos de arquivos pelo projeto todo
  Artefato: todos arquivos que continham "artigos"
  Validação: revisado e testado com build para o projeto

- Data: 01/10/2026
  Ferramenta: ChatGPT
  Uso: Apoio na implenetação da ponte (API) de Login e Cadastro.
  Artefato: Login.jsx e Cadastro.jsx
  Validação: Código revisado e adaptado.
  
  - Data: 01/10/2026
  Ferramenta: Claude
  Uso: apoio na criação da documentação da Sprint 2
  Artefato: docs/sprints/sprint-2.md
  Validação: revisado manualmente

 - Data: 01/10/2026
  Ferramenta: ChatGPT
  Uso: Auxílio na revisão, e estrutura do .md
  Artefato: docs/metricas/M-02.md
  Validação: revisado manualmente

## Sprint 3

Levantamento confirmado pelo solicitante em 22/10/2026: os integrantes já registraram seus usos de IA.

| Data | Ferramenta | Finalidade | Artefatos | Revisão e validação realizadas |
|---|---|---|---|---|
| 19/10/2026 | Copilot | Apoio à lógica da listagem, dados de exemplo, documentação e espera pelo MongoDB no Compose; elaboração integral dos testes da listagem. | `src/backend/docs/rotas-publicas-de-listagem-de-projetos.md`, `docker-compose.yml`, classes e testes de `listagens`. | Revisão manual informada no registro do integrante. |
| 20/10/2026 | ChatGPT | Apoio na implementação da vitrine de projetos. | `src/frontend/src/components/MapaProjetos/MapaProjetos.jsx`. | Revisão manual e adaptação informadas no registro do integrante. |
| 21/10/2026 | Codex | Apoio na elaboração e publicação das issues da Sprint 3 a partir dos escopos fornecidos pelo solicitante. | Issues #127 a #138 no GitHub. | Escopos fornecidos pelo solicitante; criação das issues conferida no GitHub com a conta autorizada. |
| 22/10/2026 | ChatGPT | Orientação na interpretação de falhas e ajuste dos testes de cadastro, login, submissão e envio após login. | `Cadastro.test.jsx`, `Login.test.jsx`, `Enviar.test.jsx`, `Enviar.contract.test.jsx` e `Cadastro.jsx`, em `src/frontend/src/`. | Conforme o registro do integrante: comparação com telas e API; Vitest aprovou 3 testes de cadastro, 3 de login e 7 de submissão. O integrante realizou as alterações. |
| 22/10/2026 | Claude | Apoio no planejamento da Sprint 3. | `docs/sprints/sprint-3.md`. | Conferência visual e comparação com o backlog informadas no registro existente. |
| 22/10/2026 | Codex | Revisão dos ADRs, registro das decisões sobre projetos e JWT e simplificação do ADR-0005 solicitada pelo usuário. | `docs/adr/ADR-0001.md` a `ADR-0005.md`, `README.md` e `USO-IA.md`. [PR #143](https://github.com/IFSC-ES2/es2-2026_2-equipe-4/pull/143). | Leitura do código, conferência de links e formatação pelo assistente. O solicitante pediu ajustes e simplificação. Testes da aplicação não foram executados localmente nessa alteração documental. |
| 22/10/2026 | Codex | Documentação da arquitetura implementada e criação dos diagramas. | `docs/ARQUITETURA.md`, `docs/diagramas/`, `README.md` e `USO-IA.md`. [PR #144](https://github.com/IFSC-ES2/es2-2026_2-equipe-4/pull/144). | Leitura do código e conferência dos links pelo assistente. A aplicação não foi executada localmente nessa alteração documental. |
| 22/10/2026 | Codex | Separação do armazenamento de arquivos, criação dos testes e medição antes/depois. | `ProjetoService.java`, `ArmazenamentoArquivoService.java`, testes de serviços e upload, `scripts/medir_armazenamento.py`, `docs/REENGENHARIA.md` e `USO-IA.md`. [PR #147](https://github.com/IFSC-ES2/es2-2026_2-equipe-4/pull/147). | O assistente executou 13 testes antes, 21 depois e 26 após integrar a listagem. MongoDB simulado nos testes locais; não houve teste manual com banco real. Medições executadas e CI aprovado no PR. |
| 22/10/2026 | Codex | Conferência dos testes, do pipeline e dos checks obrigatórios; registro das verificações. | `docs/sprints/sprint-3.md`. [PR #148](https://github.com/IFSC-ES2/es2-2026_2-equipe-4/pull/148). | Consulta do workflow, das regras de proteção e das execuções aprovadas e com falha no GitHub pelo assistente. |
| 22/10/2026 | Codex | Atualização objetiva da apresentação, funcionalidades, execução, testes e limitações do produto. | `README.md` e `src/frontend/README.md`. [PR #149](https://github.com/IFSC-ES2/es2-2026_2-equipe-4/pull/149). | O assistente conferiu 19 links internos e a formatação. O solicitante ajustou o texto antes do commit. A aplicação não foi executada localmente nessa alteração documental. |
| 22/10/2026 | Codex | Consolidação do registro de uso de IA da Sprint 3. | `USO-IA.md`, issue #134. | Comparação com os registros existentes, esta conversa e os PRs; levantamento dos integrantes confirmado pelo solicitante. Revisão deste registro pela equipe pendente. |
