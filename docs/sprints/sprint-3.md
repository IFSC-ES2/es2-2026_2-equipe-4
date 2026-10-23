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

A preencher ao longo da sprint.

### 6.3 Issues parciais ou replanejadas

A preencher ao longo da sprint.

## 7. Coleta das métricas

A preencher ao longo da sprint.

## 8. Contribuições individuais

A preencher ao longo da sprint.

## 9. Marco da sprint

A preencher ao longo da sprint.

## 10. Validação dos testes e do CI (#132)

Verificação realizada em 22/10/2026.

- Os testes da listagem na API e da refatoração estão versionados.
- O CI executa automaticamente em PRs para `main` e `entrega-7`, com testes de backend e frontend, build e verificações da documentação.
- Uma falha de teste deixa o check vermelho.
- Os testes de backend e frontend são checks obrigatórios nas regras de `main` e das branches `entrega-*`.
