# Registro da Abordagem de Estimativa

## 1. Técnica utilizada

A equipe adotou **t-shirt sizing**, conduzida por **enquete com voto individual**: cada integrante escolheu um tamanho para cada item sem ver a escolha dos demais, e o tamanho registrado é o mais votado.

## 2. Participantes

Sessão realizada com a participação dos **5 integrantes** da equipe:

- Marcos Júnior Lemes Ferreira: DevOps / Infra
- Bernardo Vieira de Souza: Arquiteto de Software
- Juliano Tavares da Silva: Engenheiro de Qualidade
- Pedro Henrique Bernhardt Valete: DBA / Scrum Master
- Gabriel Ferreira de Souza da Silva: Front-end

## 3. Unidade adotada

A unidade é o **tamanho relativo de esforço**, na escala **P, M, G, GG**. A escala mede complexidade e incerteza, não tempo de execução direto.

| Tamanho | Significado |
|---|---|
| P | Trabalho isolado e mais simples, sobre algo já conhecido |
| M | Atravessa mais de uma camada, mas reaproveita estrutura existente |
| G | Envolve tecnologia ainda não usada pela equipe ou decisões técnicas em aberto |
| GG | Escopo amplo demais para uma sprint, sinalizando que o item deveria ser quebrado em mais partes |

## 4. Critérios de comparação e dimensionamento

Os critérios aplicados na comparação entre os itens foram:

### #17 — Submissão de artigo com metadados (M)

Votação: M = 3 · G = 2

- Concentra o formulário de entrada e o endpoint de criação, atravessando as três camadas, mas com comportamento previsível: validar campos obrigatórios e enviar.
- A equipe avaliou que a complexidade está mais na definição do contrato entre front-end e API do que na funcionalidade em si.

### #18 — Persistência dos metadados do artigo (G)

Votação: M = 1 · G = 3 · GG = 1

- Foi o item de maior dispersão na votação, com votos em três tamanhos distintos.
- Envolve a modelagem do documento central do produto e a garantia de identificador único, decisões que condicionam todos os itens seguintes.
- Difere de #17 por não ser previsível: é onde a stack escolhida na [ADR-0002](adr/ADR-0002.md) será exercitada pela primeira vez, e um erro de modelagem pode se propagar para listagem, busca e visualização.

### #20 — Listagem pública dos artigos (M)

Votação: M = 4 · G = 1

- Item de leitura e exibição, que reaproveita o modelo de dados e a infraestrutura estabelecidos por #17 e #18.
- Maior convergência da votação, o que o tornou a referência da escala.
- Não foi estimado como P porque é a primeira tela a consumir a API de fato: serialização da resposta e integração front-end/back-end aparecem aqui pela primeira vez.

## 5. Limitações e incertezas percebidas

1. **Stack não exercitada:** Nenhum integrante havia trabalhado com Spring Boot e MongoDB integrados a um front-end antes. A dispersão dos votos em #18 deixa claro a incerteza dentro da própria equipe.

2. **Estimativa anterior a qualquer código:** Não existe nenhuma linha do MVP escrita. Estimativas feitas antes disso podem subestimar o custo de integração e de configuração inicial do ambiente, que costuma revelar gargalos não previstos.

3. **Disponibilidade da equipe:** Todos os integrantes cursam outras disciplinas com entregas concorrentes, o que reduz a previsibilidade do ritmo semanal independentemente do tamanho estimado.