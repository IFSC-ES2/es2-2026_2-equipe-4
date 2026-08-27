# BASELINE - Planejamento Inicial do Projeto

## 1. Recorte do backlog

O planejamento inicial do projeto foi elaborado a partir do seguinte recorte do backlog, composto pelas funcionalidades consideradas necessárias para a primeira versão do MVP.

1. **Visualização do artigo com acesso ao PDF** - Issue #22
2. **Busca simples de artigos** - Issue #21
3. **Listagem pública dos artigos** - Issue #20
4. **Armazenamento seguro dos arquivos PDF** - Issue #19
5. **Persistência dos metadados dos artigos** - Issue #18
6. **Submissão de artigos com metadados** - Issue #17

Esse recorte representa as funcionalidades planejadas para a primeira versão do sistema.

A ordem dos itens foi definida considerando o objetivo do MVP: entregar uma versão funcional que permita ao usuário submeter e visualizar artigos.

Após a implementação inicial e novas discussões com a equipe, outras funcionalidades poderão ser adicionadas ao projeto, como:

* autenticação de usuários;
* cadastro e gerenciamento de contas;
* análise de artigos;
* áreas separadas para alunos e professores;
* funcionalidades administrativas.

Essas funcionalidades, entretanto, não fazem parte do escopo prioritário desta linha de base inicial.

---

# 2. Priorização dos itens mais importantes do MVP

O MVP foi definido a partir das funcionalidades principais que permitem a interação básica do usuário com o sistema.

Embora existam tarefas de infraestrutura e persistência que dão suporte ao funcionamento da aplicação, as funcionalidades prioritárias para esta etapa são:

1. **Submissão de artigos com metadados** — Issue #17;
2. **Listagem pública dos artigos** — Issue #20.

Esses dois itens representam as principais funcionalidades visíveis ao usuário nesta etapa.

A submissão permite a entrada de novos artigos no sistema, enquanto a listagem permite que os artigos armazenados sejam visualizados publicamente.

As demais tarefas do backlog possuem importância técnica e funcionam como suporte para a implementação dessas funcionalidades.

---

# 3. Estimativas dos itens priorizados

## Issue #17 — Submissão de artigos com metadados (M)

**Votação:** M = 3 · G = 2

A funcionalidade concentra o formulário de entrada de dados e o endpoint responsável pela criação do artigo.

Sua implementação atravessa diferentes camadas da aplicação, envolvendo principalmente:

* desenvolvimento do formulário no front-end;
* validação dos campos obrigatórios;
* comunicação com a API;
* processamento e persistência dos dados.

A equipe avaliou que a complexidade está principalmente na definição do contrato entre o front-end e o back-end, especialmente na estrutura dos dados enviados e recebidos.

---

## Issue #20 — Listagem pública dos artigos (M)

**Votação:** M = 4 · G = 1

Este item envolve a leitura e a exibição dos artigos disponíveis no sistema.

A implementação envolve:

* criação do endpoint de consulta;
* recuperação dos artigos armazenados;
* serialização das informações;
* integração entre front-end e back-end;
* exibição dos artigos na interface.

A equipe não classificou o item como **P**, pois esta será uma das primeiras funcionalidades a consumir a API de forma completa, exigindo integração efetiva entre as camadas do sistema.

Por esse motivo, a funcionalidade foi estimada como **Médio (M)**.


---

# 4. Técnica de estimativa adotada pela equipe

## Técnica utilizada

A equipe adotou a técnica de **T-Shirt Sizing**, utilizando uma escala de tamanhos relativos para estimar o esforço necessário para cada item.

A estimativa foi conduzida por meio de **votação individual**. Cada integrante escolheu um tamanho para o item sem visualizar previamente as escolhas dos demais integrantes.

Após a votação, o tamanho predominante foi registrado como estimativa inicial do item.

A técnica foi escolhida por permitir uma avaliação rápida e relativa das tarefas, considerando fatores como:

* complexidade técnica;
* esforço de implementação;
* incerteza;
* dependências;
* conhecimento prévio da equipe sobre a tecnologia.

---

# 5. Hipóteses assumidas para realizar as estimativas

As estimativas foram realizadas considerando algumas hipóteses iniciais sobre o desenvolvimento do projeto.

## Unidade adotada

A unidade utilizada é o **tamanho relativo de esforço**, utilizando a escala:

**P, M, G e GG**

Essa escala não representa diretamente horas ou dias de trabalho. Seu objetivo é comparar o esforço relativo entre os itens do backlog.

| Tamanho | Significado                                                                                                  |
| ------- | ------------------------------------------------------------------------------------------------------------ |
| P       | Trabalho mais simples e isolado, realizado sobre uma tecnologia ou estrutura já conhecida pela equipe        |
| M       | Trabalho que atravessa mais de uma camada do sistema, mas possui escopo relativamente previsível             |
| G       | Trabalho que envolve maior complexidade, tecnologia ainda pouco conhecida ou decisões técnicas em aberto     |
| GG      | Item com escopo amplo demais para o período planejado, indicando a necessidade de divisão em tarefas menores |

Além disso, as estimativas assumem que:

* os integrantes conseguirão manter a disponibilidade inicialmente prevista;
* as tecnologias escolhidas para o projeto permanecerão adequadas ao escopo do MVP;
* não ocorrerão mudanças significativas nos requisitos durante o período;
* as dependências técnicas entre front-end, back-end e banco de dados poderão ser resolvidas sem bloqueios prolongados;
* a equipe conseguirá estabelecer uma configuração inicial estável do ambiente de desenvolvimento.

As estimativas poderão ser revisadas caso essas hipóteses não se confirmem durante o desenvolvimento.

---

# 6. Capacidade planejada da equipe até o próximo marco do projeto

A equipe possui **cinco integrantes ativos** nesta etapa do projeto.

## Papéis assumidos pela equipe

Nesta fase inicial, os integrantes assumirão responsabilidades distribuídas:

* desenvolvimento do front-end;
* desenvolvimento do back-end;
* modelagem e persistência de dados;
* integração entre os componentes;
* testes e validação das funcionalidades;
* configuração do ambiente e conteinerização.

Os papéis não são completamente rígidos. Como se trata de uma equipe pequena e de um MVP, os integrantes poderão colaborar em mais de uma área conforme a necessidade do desenvolvimento.

## Disponibilidade estimada

A disponibilidade da equipe é limitada, pois aproximadamente dois terços dos integrantes trabalham paralelamente e também possuem atividades acadêmicas em outras disciplinas.

Dessa forma, o tempo disponível para o projeto não corresponde à dedicação integral dos cinco integrantes.

O esforço da equipe será direcionado prioritariamente para as funcionalidades consideradas essenciais ao MVP.

## Restrições conhecidas

As principais restrições identificadas até o momento são:

* disponibilidade limitada de parte da equipe;
* conciliação entre trabalho, atividades acadêmicas e desenvolvimento do projeto;
* necessidade de configuração inicial dos frameworks e do ambiente de desenvolvimento;
* necessidade de estabelecer a integração inicial entre front-end e back-end;
* possíveis dificuldades técnicas relacionadas à conteinerização e comunicação entre os componentes.

## Fatores que podem afetar a previsibilidade e a produtividade

Alguns fatores podem impactar o andamento do trabalho durante o período:

* redução da disponibilidade de integrantes;
* dificuldades na integração entre os componentes;
* problemas de configuração do ambiente;
* bloqueios técnicos ainda não identificados;
* mudanças nos requisitos ou no escopo;
* necessidade de aprendizado de tecnologias utilizadas no projeto.

---

# 7. Previsão inicial do que se espera concluir no período

Até o próximo marco do projeto, a equipe prevê concluir prioritariamente:

* a implementação da **submissão de artigos com seus metadados**;
* a implementação da **listagem pública dos artigos**;
* a integração inicial entre front-end e back-end;
* a configuração inicial dos frameworks utilizados no projeto;
* a configuração e organização inicial da conteinerização da aplicação;
* testes básicos das funcionalidades desenvolvidas.

As duas funcionalidades prioritárias representam as principais formas de interação do usuário com o sistema nesta etapa.

Além das funcionalidades visíveis ao usuário, espera-se avançar na estrutura necessária para o funcionamento da aplicação, especialmente:

* comunicação entre os componentes;
* persistência inicial dos dados;
* configuração do ambiente;
* organização da infraestrutura do projeto.

A equipe considera que o principal desafio inicial será estabelecer corretamente a integração entre os componentes e as configurações fundamentais do ambiente.

Após a estabilização dessa estrutura inicial, espera-se que o desenvolvimento das funcionalidades seguintes ocorra com maior previsibilidade.

As tarefas prioritárias foram estimadas como **M**.

Considerando a capacidade disponível e as restrições identificadas, a equipe considera viável concluir até **dois itens de tamanho M** durante o período, desde que não ocorram bloqueios técnicos relevantes.

Caso surjam impedimentos ou haja redução significativa na disponibilidade da equipe, o escopo poderá ser reduzido, mantendo como prioridade a implementação da submissão e da listagem dos artigos.

---

# 8. Data de registro da linha de base do planejamento

**Data de registro:** 27 de agosto de 2026
**Horário:** 18:29
