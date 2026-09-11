# Sprint 1  

## 1. Meta da Sprint 1
Implementação da funcionalidade de submissão de artigos e seus metadados, permitindo que o usuário envie um artigo acadêmico informando seus metadados e anexando o arquivo PDF correspondente

## 2. Itens do backlog selecionados
| Issue | Descrição | Tipo |
|---|---|---|
| #17 | Submissão de artigo com metadados | Feature (vertical slice) |

## 3. Justificativa da escolha
Escolhemos esse item pois se trata da principal funcionalidade da nossa plataforma. Ela vai requirir a ajuda de todos os integrantes, atravessando front-end, back-end e banco de dados.
No arquivo docs/BASELINE.md, pode-se observar esse item como a funcionalide prioritária para esta etapa, pois se consiste em uma interação inicial com o usuário.

A escolha também respeita a capacidade que a própria equipe declarou em docs/BASELINE.md, seção "Disponibilidade estimada": cerca de dois terços dos integrantes trabalham em paralelo às aulas e não têm dedicação integral ao projeto. Por isso a sprint concentra o esforço em um único item, que foi estimado como tamanho M (não G nem GG) na sessão de estimativa registrada em docs/ESTIMATIVAS.md, o que é coerente com o tempo real que a equipe tem disponível até 17/09.

## 4. Decisões tomadas e ajustes de escopo
A divisão do trabalho foi adotada em quatro frentes: esqueleto de ambiente (Docker com MongoDB), esqueleto do back-end (Spring Boot), esqueleto do front-end e a implementação da feature de submissão em si, seguida pelos testes de unidade.

Também foi decidido migrar o front-end de HTML/CSS/JS estático para React, registrado na ADR-0003.

## 5. Escopo da sprint

### 5.1 Issues planejadas

Ver seção 2, issue #17, única planejada para esta sprint.

### 5.2 Issues concluídas

A preencher ao longo da sprint.

### 5.3 Issues parciais ou replanejadas

A preencher ao longo da sprint.

### 5.4 Justificativa do vertical slice

Escolha baseada na priorização de `docs/BASELINE.md`, onde a submissão de artigo já era o
item de maior valor do MVP, e confirmada pela estimativa (`docs/ESTIMATIVAS.md`) como tamanho
M, coerente com a capacidade da equipe para o período (ver seção 3).

### 5.5 Por que esta foi a funcionalidade mais adequada

Sem submissão não há artigo para listar, buscar ou visualizar — as demais funcionalidades
priorizadas (#18, #20) dependem dela para terem dado a exibir. É também a única, entre as
três, que sozinha já resulta em algo utilizável e demonstrável de ponta a ponta.


## 6. Coleta das métricas

### 6.1 Valores observados ao final da Sprint 1

A preencher ao longo da sprint.

| Métrica | Valor observado | Ficha |
|---|---|---|
| M-01 — NCLOC | | [M-01](../metricas/M-01.md) |
| M-02 — Complexidade Ciclomática | | [M-02](../metricas/M-02.md) |
| M-03 — Cobertura de Testes | | [M-03](../metricas/M-03.md) |
| M-04 — Acoplamento entre Classes (CBO) | | [M-04](../metricas/M-04.md) |
| M-05 — Taxa de Retrabalho | | [M-05](../metricas/M-05.md) |
| M-06 — Densidade de Defeitos | | [M-06](../metricas/M-06.md) |
| M-07 — Variação de Cronograma | | [M-07](../metricas/M-07.md) |
| M-08 — Variação de Escopo | | [M-08](../metricas/M-08.md) |

### 6.2 Comparação com o esperado

A preencher ao longo da sprint.

### 6.3 Análise — planejado x executado

A preencher ao longo da sprint.

## 7. Contribuições individuais

A preencher ao longo da sprint.

| Integrante | Papel (Entrega 1) | Contribuição na Sprint 1 | Evidência |
|---|---|---|---|
| Pedro Henrique Bernhardt Valete | DBA | | |
| Bernardo Vieira de Souza | Arquiteto de Software / ScrumMaster | | |
| Marcos Júnior Lemes Ferreira | DevOps/Infra | | |
| Juliano Tavares da Silva | Engenheiro de Qualidade | | |
| Gabriel Ferreira de Souza da Silva | Front-end | | |

## 8. Marco da sprint

A preencher ao longo da sprint.

- Release: `v0.1.0` — [link da release]
- PR da entrega: `entrega-5 → main` — [link do PR]


Relacionado: [`BASELINE.md`](../BASELINE.md) / [`fluxo-de-trabalho.md`](../fluxo-de-trabalho.md) /
issue #17
