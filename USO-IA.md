# Registro de uso de inteligência artificial

Conforme o *Protocolo de uso de inteligência artificial* da disciplina.

## Declaração de responsabilidade

> Declaramos que as ferramentas de inteligência artificial utilizadas neste projeto
> serviram como apoio ao desenvolvimento. Todo código, documentação, decisão técnica e
> artefato entregue foi revisado, compreendido e validado pela equipe, que assume
> integral responsabilidade acadêmica e técnica pelo trabalho.

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
  Validação: Leitura e pequenas correções feitas.

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
