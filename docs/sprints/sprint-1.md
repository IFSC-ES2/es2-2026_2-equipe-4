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

- #55, #56, #57, #58, #59, #18, #66, #67, #68, #75, #77, #60, #61

13 issues concluídas, evidenciadas por 12 PRs mergeados na `entrega-5` (alguns PRs fecham
mais de uma issue relacionada).

### 5.3 Issues parciais ou replanejadas

- **#57 (Docker Compose)**: parcialmente: hoje só o
  MongoDB está containerizado. A API (Spring Boot) e o front-end (React) continuam rodando fora do Docker,
  precisam de `./gradlew bootRun`/`npm run dev` manuais. Fica como candidato pra próxima
  um `docker-compose up -d` que suba tudo de uma vez.

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

| Métrica | Ficha |
|---|---|
| M-01: NCLOC | [M-01](../metricas/M-01.md) |
| M-02: Complexidade Ciclomática | [M-02](../metricas/M-02.md) |
| M-03: Cobertura de Testes | [M-03](../metricas/M-03.md) |
| M-04: Acoplamento entre Classes (CBO) | [M-04](../metricas/M-04.md) |
| M-05: Taxa de Retrabalho | [M-05](../metricas/M-05.md) |
| M-06: Densidade de Defeitos | [M-06](../metricas/M-06.md) |
| M-07: Variação de Cronograma | [M-07](../metricas/M-07.md) |
| M-08: Variação de Escopo | [M-08](../metricas/M-08.md) |

### 6.2 Comparação com o esperado

Como não tem sprint anterior, não existe um valor de referência para as métricas, porém concluímos
que precisamos melhorar principalmente a comunicação, para evitar retrabalho e variação de escopo.

### 6.3 Análise — planejado x executado

O planejado era entregar só a #17. O executado foi #17 **e** #18 juntas, porque a
#17 sozinha não sobrevivia a um restart da aplicação sem persistência real, a ampliação de
escopo foi consequência direta. Os fatores que mais influenciaram o retrabalho foram: falta de
experiência prévia da equipe com MongoDB e decisões tomadas sem confirmar
com quem já estava implementando.

## 7. Contribuições individuais

| Integrante | Papel (Entrega 1) | Contribuição na Sprint 1 | Evidência |
|---|---|---|---|
| Pedro Henrique Bernhardt Valete | DBA | Planejamento e fechamento da sprint; persistência real dos metadados no MongoDB; ligação arquivo e metadado (GridFS); CORS; README | PRs #64, #70, #73, #78, #81 |
| Bernardo Vieira de Souza | Arquiteto de Software / Scrum Master | Formulário de submissão de artigo (front-end) | PR #72 |
| Marcos Júnior Lemes Ferreira | DevOps/Infra | Esqueleto do back-end (Spring Boot); correção do armazenamento do PDF (GridFS) | PRs #65, #76 |
| Juliano Tavares da Silva | Engenheiro de Qualidade | Testes de unidade do back-end e do front-end | PR #80 |
| Gabriel Ferreira de Souza da Silva | Front-end | ADR-0003 (mudança de stack); inicialização do projeto React; integração front-end e API | PRs #63, #69, #74 |

## 8. Marco da sprint

Preencher os links abaixo assim que a release existir.

- Release: `v0.1.0`: [link da release]
- PR da entrega: `entrega-5 → main`: [link do PR]


Relacionado: [`BASELINE.md`](../BASELINE.md) / [`fluxo-de-trabalho.md`](../fluxo-de-trabalho.md) /
issue #17
