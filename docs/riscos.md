# Registro de Riscos — TASK 40

Este documento apresenta os riscos identificados para o projeto, suas probabilidades de ocorrência, impactos esperados e as respectivas estratégias de mitigação e contingência.

## 1. Riscos que podem ocorrer

| ID | Risco | Descrição | Causa | Consequência / Impacto Esperado | Probabilidade | Impacto | Prioridade | Estratégia de Mitigação | Responsável |
|----|-------|-----------|-------|----------------------------------|:---:|:---:|:---:|--------------------------|-------------|
| R01 | Escopo muito pequeno do MVP | As funcionalidades definidas no MVP podem ser simples demais. O escopo inicial foi pensado para ser prático e rápido de desenvolver, sem muita complexidade. | O escopo do MVP pode ser desenvolvido de forma muito rápida após as configurações iniciais. | Necessidade de adicionar novas features para complementar o projeto. | Média | Alto | Alta | Manter o documento de escopo do MVP como referência única. Qualquer nova funcionalidade deve passar por uma avaliação formal antes de ser aceita. | Marcos Júnior |
| R02 | Subestimação do tempo de entrega de cada feature | Devido à complexidade de algumas ferramentas, determinadas funcionalidades podem não ser desenvolvidas a tempo ou serem entregues sem os devidos testes. | Algumas ferramentas ou bibliotecas podem ter sua complexidade subestimada. | Comprometimento do cronograma geral e possível perda de nota por atraso na entrega. | Média | Alto | Alta | Estimar as tarefas em conjunto e adicionar uma margem de segurança ao cronograma. | [Nome do integrante] |
| R03 | Sobrecarga ou indisponibilidade de integrante da equipe | Um ou mais membros da equipe podem ficar impossibilitados de contribuir, por motivos pessoais, acadêmicos ou profissionais, durante determinado período. | Tarefas ou conhecimentos concentrados em poucas pessoas. | Perda de conhecimento sobre partes do sistema e possível atraso no desenvolvimento. | Baixa | Alto | Média | Documentar decisões técnicas e distribuir o conhecimento entre os integrantes. | [Nome do integrante] |
| R04 | Dificuldade técnica com Spring Boot, MongoDB e demais tecnologias escolhidas | A equipe pode enfrentar dificuldades de aprendizado ou implementação utilizando Java, Spring Boot e MongoDB, por serem tecnologias pouco dominadas por parte do grupo. | Curva de aprendizado dos frameworks e falta de experiência prévia de alguns integrantes com Spring e outras tecnologias. | Atraso na implementação de funcionalidades e desenvolvimento de código com baixa qualidade ou manutenibilidade. | Média | Médio | Média | Reservar tempo para estudo direcionado das tecnologias nas primeiras sprints e utilizar projetos anteriores como referência. | Pedro Valete |
| R05 | Falhas na revisão por pares | O fluxo central do sistema (submissão → armazenamento -> disponibilidade) pode apresentar bugs ou inconsistências de estado. | Complexidade da lógica de negócio e possíveis falhas na implementação do fluxo. | A funcionalidade principal do sistema pode não funcionar corretamente, comprometendo a entrega. | Média | Alto | Alta | Escrever testes automatizados focados nesse fluxo e validar o funcionamento com casos de uso reais antes de cada entrega. | Juliano Tavares |
| R06 | Perda ou corrupção de arquivos PDF armazenados | Arquivos de artigos submetidos podem ser perdidos, corrompidos ou associados ao artigo ou autor errado. | Falta de validação no upload e ausência de backup do armazenamento local. | Perda de dados de submissões e prejuízo à credibilidade do sistema. | Baixa | Médio | Baixa | Validar tipo e tamanho do arquivo no upload e manter backups periódicos durante o desenvolvimento e os testes. | Pedro Valete |
| R07 | Dificuldade de integração entre as tecnologias | Pode haver alta complexidade na integração entre os componentes do sistema, especialmente entre o MongoDB e a API desenvolvida com Spring Boot. | Falhas na conteinerização e na comunicação entre os diferentes componentes do sistema. | A dificuldade de integração pode aumentar a curva de aprendizado e gerar atrasos no desenvolvimento e na implementação das funcionalidades. | Baixa | Médio | Baixa | Analisar projetos desenvolvidos anteriormente pelos integrantes da equipe, estudar a documentação oficial das tecnologias e utilizar ferramentas de IA/LLMs como apoio durante o desenvolvimento. | Marcos Júnior |

> **Observação:** os riscos cobrem as principais naturezas exigidas: **escopo** (R01), **prazo** (R02), **equipe** (R03), **tecnologia** (R04 e R07) e **qualidade/processo** (R05 e R06).

## 2. Análise

### 2.1 Critério de classificação

| Nível | Probabilidade | Impacto |
|-------|----------------|---------|
| **Baixa/Baixo** | Evento pouco provável de ocorrer durante o projeto. | Impacto pontual, resolvível sem comprometer as entregas. |
| **Média/Médio** | Pode ocorrer em alguma sprint, com chance razoável. | Pode comprometer uma entrega ou funcionalidade, mas é recuperável. |
| **Alta/Alto** | Muito provável de ocorrer em algum momento do projeto. | Pode comprometer o cronograma geral ou o MVP como um todo. |

A **prioridade** é derivada do cruzamento entre probabilidade e impacto, conforme a matriz abaixo, não sendo atribuída de forma arbitrária.

### 2.2 Matriz de riscos

| Probabilidade \ Impacto | Baixo | Médio | Alto |
|---|:---:|:---:|:---:|
| **Alta** | Média | Alta | Alta |
| **Média** | Baixa | Média | **Alta** |
| **Baixa** | Baixa | Baixa | Média |

**Posicionamento dos riscos identificados:**

- **Alta prioridade:** R01, R02 e R05.
- **Média prioridade:** R03 e R04.
- **Baixa prioridade:** R06 e R07.

### 2.3 Riscos mais críticos no momento

Os riscos mais críticos nesta fase inicial do projeto são:

- **R02 - Subestimação do tempo de entrega de cada feature:** é o risco com maior potencial de impactar diretamente o cronograma e, consequentemente, a avaliação do projeto.
- **R04 - Dificuldade técnica com Spring Boot, MongoDB e demais tecnologias escolhidas:** por serem tecnologias importantes para o núcleo funcional do MVP, dificuldades de implementação podem comprometer a entrega como um todo.
- **R07 - Dificuldade de integração entre as tecnologias:** é um risco que pode gerar outros problemas, como atrasos na implementação (R02) e falhas no funcionamento do sistema (R05), caso não seja controlado desde o início.

### 2.4 Justificativa da prioridade atribuída

- **Alta:** atribuída aos riscos com probabilidade média ou alta combinada a impacto alto, pois são cenários que podem comprometer diretamente o cronograma da disciplina ou a entrega do MVP funcional.
- **Média:** atribuída a riscos com impacto relevante, mas que afetam partes específicas do sistema ou possuem menor probabilidade de ocorrência.
- **Baixa:** atribuída a riscos com baixa probabilidade e impacto mais contido, que podem ser monitorados sem exigir ações imediatas.

## 3. Plano de Resposta aos Riscos

### 3.1 Ações preventivas

| Risco | Ação preventiva |
|-------|------------------|
| R01 | Revisar o escopo do MVP no início de cada sprint. Caso haja tempo disponível, avaliar a inclusão de novas features que façam sentido para o projeto. |
| R02 | Estimar as tarefas em conjunto e adicionar uma margem de segurança ao cronograma. |
| R03 | Registrar decisões técnicas e distribuir as tarefas, evitando dependência de uma única pessoa. |
| R04 | Pesquisar na internet, consultar vídeos e utilizar ferramentas e projetos já desenvolvidos pelos membros da equipe como referência. |
| R05 | Definir casos de teste para o fluxo de revisão antes da implementação, utilizando cenários de uso, e realizar testes end-to-end a cada sprint. |
| R06 | Validar tipo e tamanho dos arquivos enviados e configurar uma rotina simples de backup do armazenamento. |
| R07 | Utilizar projetos anteriores dos membros como base e conteinerizar todo o projeto para facilitar sua reprodução em diferentes ambientes. |

### 3.2 Ações caso o risco se concretize (contingência)

| Risco | Ação de contingência |
|-------|------------------------|
| R01 | Adicionar novas features que façam sentido para o projeto, desde que haja tempo disponível dentro da sprint. |
| R02 | Redistribuir as tarefas entre a equipe e, se necessário, reduzir o escopo da sprint atual para preservar o prazo de entrega. |
| R03 | Redistribuir as tarefas do integrante indisponível entre os demais membros e manter uma boa comunicação entre a equipe. |
| R04 | Utilizar projetos realizados anteriormente pelos membros da equipe como referência e pesquisar soluções para os problemas encontrados. |
| R05 | Isolar o bug por meio de testes direcionados e priorizar sua correção em relação ao desenvolvimento de novas funcionalidades. |
| R06 | Restaurar os arquivos a partir do backup mais recente e reforçar as validações realizadas durante o upload. |
| R07 | Começar pelo desenvolvimento da API e realizar a integração com o banco de dados antes de construir as demais partes do sistema sobre essa base. |

### 3.3 Acompanhamento ao longo do projeto

A equipe pretende realizar o acompanhamento dos riscos por meio das seguintes ações:

- **Revisão do registro de riscos a cada sprint:** verificar se algum risco teve sua probabilidade ou impacto alterados e identificar possíveis novos riscos.
- **Comunicação contínua entre os membros da equipe:** a cada novo desafio ou feature a ser implementada, os membros devem se comunicar para garantir o entendimento e o alinhamento entre as diferentes partes do projeto.
- **Atualização deste documento (`docs/riscos.md`):** realizar alterações sempre que houver alguma mudança relevante, mantendo o histórico das decisões tomadas em relação a cada risco.
- **Distribuição do conhecimento:** evitar que qualquer parte do projeto, mesmo que pequena, como uma única rota da API, fique sob responsabilidade exclusiva de um único integrante. O objetivo é garantir que, na ausência de um membro, pelo menos dois integrantes tenham conhecimento suficiente para desenvolver e dar manutenção em cada componente do projeto.
