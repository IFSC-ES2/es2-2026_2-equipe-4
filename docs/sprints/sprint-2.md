# Sprint 2

## 1. Meta da Sprint 2

Após a Sprint Review, foi decidido uma mudança de escopo e projeto. A mudança foi mudar a ideia central de submissão de artigos, para o envio de projetos universitários, com autenticação por usuário. Então a ideia da Sprint 2 é entregar o núcleo da vitrine de projetos universitários: cadastro e login de usuários, submissão de projetos apenas por usuário autenticado e listagem pública dos projetos publicados, com toda a aplicação executável por um único comando (`docker-compose up`).


## 2. Itens do backlog selecionados

| Issue | Descrição | Tipo |
|---|---|---|
| #101 | Sistema de cadastro de usuários | Feature |
| #104 | Sistema de login com token (JWT) | Task |
| #103 | Remodelar o banco e adaptar o back-end ao projeto (renomeia o fluxo de artigo para projeto, listagem pública e submissão autenticada) | Task |
| #106 | Páginas de Login, Cadastro e Header no front-end | Task |
| #97 | Completar o Docker Compose com back-end e front-end | Task |


## 3. Justificativa da escolha

**MVP e prioridades.** O [BASELINE](../BASELINE.md) priorizou a submissão e a listagem como as funcionalidades visíveis ao usuário e listou "autenticação de usuários" e "cadastro e gerenciamento de contas" como candidatas a entrar depois da implementação inicial. A sprint review de 23/09/2026 trouxe essas funcionalidades para o centro do produto (ver seção 4), por isso cadastro, login, submissão autenticada e listagem pública formam o núcleo desta sprint.

**Estimativas.** O [ESTIMATIVAS](../ESTIMATIVAS.md) registra apenas as issues #17, #18 e #20; os itens desta sprint não foram reestimados. Na escala da equipe, a maioria deles se compara à âncora #20 (tamanho M: atravessa mais de uma camada, mas reaproveita estrutura existente): a #103, por exemplo, reaproveita o fluxo de submissão e o modelo já construídos na Sprint 1. A exceção é a autenticação (#101 e #104), que introduz Spring Security e JWT, tecnologia ainda não usada no projeto, o que repete a incerteza descrita na limitação 1 do ESTIMATIVAS (stack não exercitada).

**Capacidade da equipe.** O BASELINE (seção "Disponibilidade estimada") registra que cerca de dois terços dos integrantes trabalham em paralelo às aulas. A Sprint 1 mostrou o custo disso: retrabalho causado por decisões tomadas sem confirmar com quem já estava implementando. Por isso as dependências entre os itens foram explicitadas: a #103 reaproveita o cadastro (#101) e o login (#104), e a #106 depende da #103, como declarado na própria issue.

**Riscos.** O [registro de riscos](../riscos.md) orientou o recorte:

- R01 (escopo do MVP): a mudança de tema foi avaliada e decidida em conjunto na sprint review, como a mitigação prevê.
- R02 (subestimação do prazo): a mudança foi decidida a poucos dias do prazo, então o escopo funcional ficou limitado ao núcleo (cadastro, login, submissão e listagem).
- R04 (dificuldade técnica): a #103 reaproveita o código existente em vez de criar um fluxo paralelo.
- R05 (qualidade do fluxo central): a revisão do CI (#87) e os testes das novas features (#86) tratam o risco.
- R07 (integração entre tecnologias): a #97 aplica a ação preventiva de conteinerizar todo o projeto.

## 4. Decisões tomadas e ajustes de escopo

- **Mudança de tema e escopo (sprint review de 23/09/2026).** A plataforma deixa de ser uma submissão de artigos acadêmicos e passa a ser uma vitrine de projetos universitários com autenticação: o visitante vê a lista de projetos publicados e só o usuário autenticado publica. Os itens #17 a #22 do backlog foram escritos para artigos; os já entregues na Sprint 1 (#17 e #18) foram adaptados ao novo modelo pela #103.
- **Reaproveitar em vez de recriar.** O fluxo de artigo foi renomeado para projeto (rota `/projetos`, coleção `projetos`) em vez de criar um pacote paralelo, e tudo ficou em uma única issue (#103), porque modelo, repository, service e controller precisam compilar juntos.
- **Regra de acesso.** A leitura da listagem de projetos é pública; a submissão exige token JWT, e o autor do projeto é preenchido a partir do usuário logado.
- **Infraestrutura.** A aplicação completa sobe com um único comando (#97) e o CI passa a validar o build do back-end e do front-end (#87).
- **Ficam fora desta sprint: #19, #21 e #22.** Essas issues foram escritas para artigos em PDF. O modelo novo do projeto usa imagens e links (repositório e demonstração) em vez de um arquivo PDF, então #19 (armazenamento do PDF) e #22 (visualização com acesso ao PDF) precisam ser reescritas antes de entrar em uma sprint. A #21 (busca) depende da listagem e do novo modelo estarem estáveis. A #20 (listagem pública) teve a parte de back-end entregue dentro da #103; a página de listagem no front-end não faz parte desta seleção.
- **Front-end em paralelo.** A construção das páginas do front-end (#106) corre separada do back-end, e só consome a API depois da #103.

## 5. Escopo da sprint

### 5.1 Issues planejadas

Ver seção 2.

### 5.2 Issues concluídas

A preencher ao longo da sprint.

### 5.3 Issues parciais ou replanejadas

A preencher ao longo da sprint.

## 6. Coleta das métricas

### 6.1 Valores observados ao final da Sprint 2

A preencher ao longo da sprint.

### 6.2 Comparação com o esperado

A preencher ao longo da sprint.

### 6.3 Análise: planejado x executado

A preencher ao longo da sprint.

## 7. Contribuições individuais

A preencher ao longo da sprint.

## 8. Marco da sprint

A preencher ao longo da sprint.

- Release: `v0.2.0`
- PR da entrega: `entrega-6 → main`

Relacionado: [`BASELINE.md`](../BASELINE.md) / [`ESTIMATIVAS.md`](../ESTIMATIVAS.md) / [`riscos.md`](../riscos.md) / [`fluxo-de-trabalho.md`](../fluxo-de-trabalho.md) / [`sprint-1.md`](sprint-1.md) / issue #85
