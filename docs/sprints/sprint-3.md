# Sprint 3

## 1. Inspeção do MVP ao final da Sprint 2

**O que funciona (release `v0.2.0`):** cadastro e login com JWT, submissão de projeto por usuário autenticado (com o autor preenchido pelo token), listagem pública na API, páginas de Login, Cadastro e Submissão no front-end, aplicação completa no Docker Compose e CI com build e testes a cada PR.

**Problemas e pendências encontrados:**

- O visitante não consegue ver os projetos: a listagem existe na API, mas não há tela.
- As imagens enviadas não podem ser lidas pela API, e o limite de upload é o padrão do Spring (1 MB).
- As credenciais do MongoDB ainda estão no repositório (#100, risco R08).
- O `ProjetoService` acumula três responsabilidades e tem o maior acoplamento do back-end (CBO 5, na [M-04](../metricas/M-04.md)).
- Retrabalho de cerca de 43% ([M-05](../metricas/M-05.md)) e variação de escopo de 50% ([M-08](../metricas/M-08.md)) na Sprint 2, ambos ligados à mudança de tema perto do prazo.
- Não existe documentação da arquitetura real, e os ADRs não registram as decisões da Sprint 2 (JWT, modelo de dados, Docker).

## 2. Meta da Sprint 3

Permitir que qualquer visitante veja os projetos publicados, numa interface consistente, e consolidar a qualidade técnica do MVP: arquitetura documentada, ADRs revisados, uma refatoração medida e testes no pipeline.


## 3. Itens do backlog selecionados

| Issue | Descrição | Tipo |
|---|---|---|
| #113 | Página de projetos (listagem pública no front-end) | Task |
| #124 | Rotas públicas de listagem e consulta de projetos | Task |
| #112 | Página Sobre | Task |
| #111 | Melhorar o CSS das páginas | Task |

## 4. Justificativa da escolha

**Produto.** O [BASELINE](../BASELINE.md) define a listagem pública como uma das duas funcionalidades centrais do MVP, e ela é a principal lacuna depois da Sprint 2: sem tela, a vitrine não mostra nada. A página Sobre e o CSS completam a experiência do visitante na mesma frente de front-end.

**Métricas.** O retrabalho e a variação de escopo altos da Sprint 2 (M-05 e M-08) pedem um recorte funcional pequeno e já em andamento: a listagem tem trabalho pronto (#124 e PR #125), e as páginas estão na mesma branch. O CBO 5 do `ProjetoService` (M-04) orienta a escolha da refatoração.

**Riscos.** O [registro de riscos](../riscos.md) orientou o recorte:

- R01 e R02 (escopo e prazo): o escopo funcional fica restrito ao que já está em desenvolvimento, sem funcionalidade nova além da listagem.
- R05 (qualidade): os testes da listagem e do pipeline entram como item próprio (#132).
- R10 (entregáveis da etapa): arquitetura, ADRs e reengenharia têm issue própria nesta sprint.

**Capacidade.** O [ESTIMATIVAS](../ESTIMATIVAS.md) não reestimou os itens novos. Na escala da equipe, a listagem se compara à âncora #20 (tamanho M), e a sprint concentra o restante do esforço em documentação, que o enunciado da etapa cobra junto com o incremento.

## 5. Decisões tomadas e ajustes de escopo

- **Escopo funcional restrito à frente de front-end já iniciada:** #111, #112 e #113, com a listagem do back-end (#124) integrada pela #128.
- **Adiados para a Sprint 4:** imagens com limite de upload e rota de leitura (#19), detalhe do projeto (#22), busca (#21) e credenciais fora do repositório (#100). Motivo: prazo curto e prioridade dada aos entregáveis técnicos da etapa; o R08 segue aberto no registro de riscos.
- **Reengenharia:** separar o armazenamento de arquivos do `ProjetoService` (#131), com a métrica antes e depois registrada.

## 6. Escopo da sprint

### 6.1 Issues planejadas

Ver seção 3.

### 6.2 Issues concluídas

- Incremento: #111, #112, #113 e #124, integradas pela #128 (PR #145).
- Entregáveis: #127 (PR #141), #129 (PR #144), #130 (PR #143), #131 (PR #147), #132 (PRs #148 e #151), #133 (PR #149) e #134.

### 6.3 Issues parciais ou replanejadas

- #135, #136/#146 e #137 (fechamento, métricas, riscos e qualidade): entregues nos últimos PRs da sprint.
- #138 (integração na `main` e release `v0.3.0`): depois do merge da `entrega-7`.
- #19, #21 e #22: replanejadas para a Sprint 4, como previsto na seção 5.
- #100: fechada em 22/10, mas as credenciais continuam no repositório; precisa ser reaberta (R08).

### 6.4 A meta foi atingida?

Sim, com uma ressalva. O visitante vê os projetos sem login, na página Projetos, com a interface unificada, e a arquitetura, os ADRs, a reengenharia medida e os testes no pipeline foram entregues. A ressalva é que a vitrine ainda não mostra as imagens enviadas, porque a API não tem rota de leitura (#19).

## 7. Coleta das métricas

### 7.1 Valores observados ao final da Sprint 3

| Métrica | Ficha |
|---|---|
| M-01: NCLOC | [M-01](../metricas/M-01.md) |
| M-02: Complexidade Ciclomática (V(G) médio) | [M-02](../metricas/M-02.md) |
| M-03: Cobertura de Testes | [M-03](../metricas/M-03.md) |
| M-04: Acoplamento entre Classes (CBO total) | [M-04](../metricas/M-04.md) |
| M-05: Taxa de Retrabalho | [M-05](../metricas/M-05.md) |
| M-06: Densidade de Defeitos | [M-06](../metricas/M-06.md) |
| M-07: Variação de Cronograma | [M-07](../metricas/M-07.md) |
| M-08: Variação de Escopo | [M-08](../metricas/M-08.md) |

### 7.2 Análise: planejado x executado

O planejado era a listagem pública com as páginas de front-end e os entregáveis técnicos da etapa, e foi o que se executou. O escopo ficou estável porque o recorte se limitou a trabalho já iniciado. O ponto fraco foi o prazo: a documentação e a integração se concentraram no fim da sprint (R02, revisado em [`riscos.md`](../riscos.md)).

## 8. Contribuições individuais

Levantadas a partir dos commits, dos PRs e das revisões da `entrega-7`.

| Integrante | Papel (Entrega 1) | Contribuição na Sprint 3 | Evidência |
|---|---|---|---|
| Pedro Henrique Bernhardt Valete | DBA | Inspeção e planejamento da Sprint 3; revisão de seis PRs; fechamento, métricas, riscos e qualidade | PR #141; aprovações nos PRs #143, #144, #147, #148, #149 e #151; PRs das issues #135, #136 e #137 |
| Bernardo Vieira de Souza | Arquiteto de Software / Scrum Master | ADRs, arquitetura com C4, reengenharia do armazenamento, registro da validação do CI e README | PRs #143, #144, #147, #148 e #149; aprovação no PR #141 |
| Marcos Júnior Lemes Ferreira | DevOps/Infra | Rotas públicas de listagem e consulta de projetos, com paginação e filtro por tecnologia (#124) | Commits no PR #145 (via PR #125); aprovação no PR #145 |
| Juliano Tavares da Silva | Engenheiro de Qualidade | Testes das páginas Projetos e Sobre; ajustes do front-end para o lint; integração do PR das páginas | PRs #145 e #151 |
| Gabriel Ferreira de Souza da Silva | Front-end | Páginas Projetos e Sobre, mapa de projetos e CSS das páginas (#111, #112 e #113) | Commits no PR #145 |

Evidência de pipeline verde: PR #151, com os 7 checks aprovados.

## 9. Marco da sprint

A tag `v0.3.0` é criada depois do merge da `entrega-7` na `main` (#138), e o link da release entra nesse momento.

## 10. Validação dos testes e do CI (#132)

Verificação realizada em 22/10/2026.

- Os testes da listagem na API e da refatoração estão versionados.
- O CI executa automaticamente em PRs para `main` e `entrega-7`, com testes de backend e frontend, build e verificações da documentação.
- Uma falha de teste deixa o check vermelho.
- Os testes de backend e frontend são checks obrigatórios nas regras de `main` e das branches `entrega-*`.
