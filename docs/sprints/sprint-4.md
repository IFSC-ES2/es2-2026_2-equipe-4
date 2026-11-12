# Sprint 4

## 1. Contexto

O PublicaIFSC é uma vitrine de projetos universitários. Esta sprint deu
continuidade à experiência de consulta e publicação, aprimorou a apresentação
visual da plataforma e avançou na configuração segura e no tratamento das
imagens.

## 2. Meta da Sprint 4

Melhorar a experiência de quem visita a plataforma, ampliar a apresentação dos
projetos e centralizar configurações sensíveis fora do código-fonte.

## 3. Trabalho realizado

- **Front-end:** a página Sobre recebeu mais informações, foi criada a página
  de Projetos e adicionada uma galeria para apresentar os projetos de forma
  mais visual.
- **Configuração e segurança:** tokens e dados sensíveis foram centralizados
  em variáveis de ambiente (`.env`), sem valores sensíveis definidos no código.
- **Imagens:** foi adicionada uma rota para edição de imagem e definidas três
  imagens padrão para uso consistente na plataforma.
- **Documentação:** iniciou-se a atualização dos documentos para refletir o
  produto atual, que publica projetos em vez de artigos.

## 4. Resultado

A plataforma passou a oferecer uma experiência de navegação mais completa, com
páginas Sobre e Projetos aprimoradas e galeria visual. A configuração por
ambiente e os recursos de imagem também avançaram. Os documentos de contexto
e de planejamento inicial foram sinalizados para distinguir o escopo histórico
de artigos do escopo atual de projetos.

## 5. Escopo da sprint

### 5.1 Issues planejadas

A baseline da Sprint 4, usada no [M-08](../metricas/M-08.md), são a #156 (credenciais) e as issues da entrega criadas em 09/11 (#159 a #169).

### 5.2 Issues concluídas

- Planejadas: #156 (PR #158), #159 (este documento) e #160 (PR #180).
- Adicionadas durante a sprint: #170 (PR #171), #172 (PR #177), #173 (PR #183), #174 (PR #175), #178 (PR #179) e #181 (PR #182).

### 5.3 Issues parciais, adiadas ou em andamento

- #161 a #164 (staging, deploy automatizado, validação e `DEPLOY.md`): fechadas como não planejadas em 11/11. O [`DEPLOY.md`](../DEPLOY.md) documenta só o ambiente local reprodutível com Docker Compose (R13).
- #165, #166, #167, #168 e #169 (métricas, riscos e qualidade, README, este fechamento, integração na `main` e release `v0.4.0`): em andamento na data deste registro.

### 5.4 A meta foi atingida?

Sim, com uma ressalva. A página Sobre com galeria, o detalhe do projeto e a imagem padrão melhoraram a navegação e a apresentação dos projetos, e as credenciais saíram do código (#156). A ressalva é que o staging e o deploy automatizado da Entrega 8 não foram feitos (#161 a #164, R13).

## 6. Coleta das métricas

### 6.1 Valores observados ao final da Sprint 4

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

### 6.2 Análise: planejado x executado

O planejado era a entrega com staging, deploy e documentação. Foram executados o incremento de imagens e galeria, a configuração por variáveis de ambiente, a revisão do CI e os testes das funcionalidades. O escopo variou 50% (M-08): os itens funcionais e os testes entraram depois da baseline. O retrabalho foi de cerca de 22% (M-05), com as correções de autorização de contas (#176) e do limite de upload (#179). Os riscos e a qualidade da sprint estão em [`riscos.md`](../riscos.md) (seção 6) e em [`qualidade.md`](../qualidade.md) (seção 5); o staging não entregue é o risco R13.

## 7. Contribuições individuais

Levantadas a partir dos commits, dos PRs e das revisões da `entrega-8`.

| Integrante | Papel (Entrega 1) | Contribuição na Sprint 4 | Evidência |
|---|---|---|---|
| Pedro Henrique Bernhardt Valete | DBA | Imagem padrão nos projetos, rota de troca de imagem e limite de upload de 5 MB com resposta 413; revisão do CI (Mongo 8 e job do Docker); métricas M-05 e M-08; riscos e qualidade | PRs #171, #179 e #180 (issues #170, #178 e #160); aprovações nos PRs #175 e #177; branches das issues #165 e #166 |
| Bernardo Vieira de Souza | Arquiteto de Software / Scrum Master | Página de detalhes do projeto com galeria; backlog da Sprint 4; métricas M-01 e M-04 | PR #177 (#172); issues #159 a #169; aprovação no PR #183 |
| Marcos Júnior Lemes Ferreira | DevOps/Infra | Credenciais em variáveis de ambiente, limpeza e atualização da documentação e correção da autorização de contas; métrica M-02 | PRs #158, #175 e #176 (issues #156 e #174); aprovação no PR #180 |
| Juliano Tavares da Silva | Engenheiro de Qualidade | Testes das funcionalidades da entrega, no back-end e no front-end; métricas M-03 e M-06 | PR #183 (#173); aprovações nos PRs #171, #176 e #182 |
| Gabriel Ferreira de Souza da Silva | Front-end | Galeria e melhorias na página Sobre, exclusão apenas dos próprios projetos, CSS e correção de cadastro e login; métrica M-07 | PR #182 (#181); aprovação no PR #158 |

Evidência de pipeline verde: PR #183, com os 8 checks aprovados.

## 8. Marco da sprint

A tag `v0.4.0` é criada depois do merge da `entrega-8` na `main` (#169)

## 9. Observações

Os dados das seções 5 a 7 vêm das issues, dos PRs, dos commits e das revisões da `entrega-8`
