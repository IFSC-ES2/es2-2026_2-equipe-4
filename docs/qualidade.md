# Qualidade do Projeto

Este documento define os atributos de qualidade prioritários do MVP do projeto, relaciona-os aos riscos já registrados em [`docs/riscos.md`](riscos.md) e estabelece o escopo preliminar de avaliação de qualidade, com base no modelo ISO/IEC 25010.

---

## 1. Atributos de qualidade prioritários (Item 6)

Foram selecionados 4 atributos de qualidade, alinhados às características do modelo ISO/IEC 25010, considerando a natureza do MVP (submissão de artigo → armazenamento → listagem pública pesquisável) e os riscos já mapeados pela equipe.

### 1.1 Confiabilidade

**Subcaracterísticas de foco:** ausência de falhas (maturidade), disponibilidade, capacidade de recuperação.

**Justificativa para o MVP:** o fluxo submissão → armazenamento → disponibilidade pública é o núcleo funcional inteiro do MVP — não há MVP sem ele funcionando corretamente. O próprio `docs/riscos.md` já trata esse fluxo como o ponto mais sensível do sistema (R05), citando explicitamente o risco de "bugs ou inconsistências de estado". Como o MVP tem escopo enxuto, qualquer falha nesse fluxo compromete a entrega como um todo, não apenas uma funcionalidade secundária.

**Como orienta decisões futuras:** priorizar testes automatizados e testes de ponta a ponta do fluxo de submissão antes de qualquer funcionalidade nova; tratar bugs no fluxo central como bloqueantes de sprint; definir rotina de backup dos dados/arquivos antes de considerar qualquer expansão de escopo.

### 1.2 Manutenibilidade

**Subcaracterísticas de foco:** modularidade, analisabilidade, modificabilidade, testabilidade.

**Justificativa para o MVP:** o `README.md` já lista uma quantidade grande de funcionalidades deliberadamente deixadas fora do escopo (login, revisão por pares, múltiplos revisores, notificações, dashboards, expansão institucional etc.) como candidatas para sprints futuras. Isso significa que o código do MVP **vai** ser estendido em breve — se a base não for modular e fácil de entender, o custo dessas próximas entregas cresce rápido. Some-se a isso que a equipe tem baixa familiaridade com Spring Boot e MongoDB (ADR-0002, risco R04) e risco de concentração de conhecimento em poucas pessoas (R03): ambos aumentam a chance de código difícil de manter se não houver disciplina desde já.

**Como orienta decisões futuras:** manter a separação em camadas já definida no ADR-0002 (`controller/service/repository/entity/dto`); exigir revisão por pares em todo PR (já previsto no DoD); documentar decisões técnicas relevantes como ADRs; acompanhar as métricas de complexidade e acoplamento já definidas em `docs/METRICAS.md` como sinal de alerta antes que o débito técnico se acumule.

### 1.3 Segurança

**Subcaracterísticas de foco:** integridade, confidencialidade, autenticidade.

**Justificativa para o MVP:** mesmo sem login/autenticação no escopo atual, o próprio README já define como funcionalidade do MVP o "armazenamento seguro dos arquivos PDF" (item 3 do escopo). Além disso, o risco R06 (`riscos.md`) descreve especificamente a possibilidade de um arquivo "ser associado ao artigo ou autor errado" — isso é, em essência, um problema de **integridade** de dados, não só de disponibilidade. Como o produto lida com produção acadêmica de terceiros, um erro de associação autor↔artigo tem impacto direto na credibilidade da plataforma (ponto citado explicitamente no próprio risco).

**Como orienta decisões futuras:** validar tipo e tamanho de arquivo no upload (mitigação já prevista para R06); nunca confiar apenas em metadados enviados pelo cliente; desenhar desde já a associação arquivo↔artigo↔autor de forma que erros sejam estruturalmente difíceis (ex.: vínculo por ID gerado no servidor, não por nome de arquivo); manter esses princípios como base para quando autenticação/controle de acesso forem implementados nas próximas sprints (já previstos como "fora do escopo por enquanto").

### 1.4 Capacidade de Interação (Usabilidade)

**Subcaracterísticas de foco:** aprendibilidade, operabilidade, proteção contra erro do usuário.

**Justificativa para o MVP:** o README define como usuários do sistema professores, pesquisadores, alunos de graduação/pós e coordenações — um público heterogêneo, nem todo tecnicamente experiente. A "Relevância" do projeto (seção 6 do README) é explicitamente **democratizar o acesso** ao conhecimento acadêmico; uma interface confusa para submissão ou busca vai contra esse objetivo central, mesmo que o back-end funcione perfeitamente. Vale registrar: **nenhum risco em `docs/riscos.md` cobre usabilidade diretamente hoje** — é um ponto de atenção que a equipe está adicionando proativamente, e recomenda-se avaliar a inclusão de um risco correspondente em uma próxima revisão do documento de riscos.

**Como orienta decisões futuras:** manter o formulário de submissão simples, com feedback claro em caso de erro (ex.: arquivo em formato inválido); priorizar clareza na listagem/busca pública antes de qualquer refinamento visual; adiar decisões de UI mais sofisticadas (ex.: migração para React, cogitada e descartada por ora no ADR-0002) até que o fluxo básico se mostre utilizável.

---

## 2. Relação entre riscos e qualidade (Item 7)

A tabela abaixo percorre os riscos mais relevantes de `docs/riscos.md` (priorizados como Alta ou Média) e indica quais dos 4 atributos selecionados cada um pode afetar, além de como a mitigação já prevista protege esses atributos.

| Risco | Prioridade | Atributo(s) afetado(s) | Como a mitigação protege o atributo |
|---|---|---|---|
| **R02** — Subestimação do tempo de entrega | Alta | Confiabilidade, Manutenibilidade | Estimar tarefas em conjunto e adicionar margem de segurança evita que a equipe corte etapas de teste (protege Confiabilidade) ou entregue código apressado sem seguir a estrutura em camadas definida (protege Manutenibilidade). |
| **R05** — Falhas na revisão por pares / fluxo central | Alta | Confiabilidade | Testes automatizados e validação com casos de uso reais no fluxo submissão→armazenamento→disponibilidade atacam diretamente a subcaracterística de ausência de falhas, antes que o problema chegue a uma entrega. |
| **R04** — Dificuldade técnica com Spring Boot/MongoDB | Média | Manutenibilidade, Confiabilidade | Reservar tempo de estudo direcionado e usar projetos anteriores como referência reduz a chance de código malformado por falta de domínio da stack — o próprio risco já cita "baixa qualidade ou manutenibilidade" como consequência esperada. |
| **R03** — Sobrecarga/indisponibilidade de integrante | Média | Manutenibilidade | Documentar decisões técnicas e distribuir conhecimento evita que partes do sistema fiquem compreensíveis só para uma pessoa, preservando analisabilidade e modificabilidade mesmo com ausência de um integrante. |
| **R06** — Perda ou corrupção de PDFs | Baixa | Segurança, Confiabilidade | Validar tipo/tamanho no upload protege a integridade dos arquivos (Segurança); manter backups periódicos garante capacidade de recuperação (Confiabilidade) em caso de perda. |
| **R07** — Dificuldade de integração entre tecnologias | Baixa | Manutenibilidade, Confiabilidade | Conteinerização e estudo da documentação oficial reduzem falhas de comunicação entre componentes (Confiabilidade) e evitam soluções improvisadas de integração que dificultariam manutenção futura (Manutenibilidade). |
| **R01** — Escopo muito pequeno do MVP | Alta | Manutenibilidade (indireto) | Exigir avaliação formal antes de aceitar nova funcionalidade evita que features sejam adicionadas às pressas, sem seguir a arquitetura definida — o que erodiria a manutenibilidade da base já construída. |

**Observação sobre Capacidade de Interação:** como indicado na seção 1.4, esse atributo não está hoje coberto por nenhum risco explícito em `docs/riscos.md`. Isso não significa que seja menos importante — significa que é uma lacuna no registro de riscos atual, que a equipe recomenda revisitar.

---

## 3. Definição preliminar de avaliação da qualidade (Item 8)

### 3.1 Modelo adotado

A avaliação de qualidade do projeto seguirá como referência o **modelo ISO/IEC 25010** (parte da série SQuaRE — *Software product Quality Requirements and Evaluation*), que estrutura a qualidade de produto de software em características e subcaracterísticas — as mesmas usadas como base para a seleção da seção 1 (Confiabilidade, Manutenibilidade, Segurança e Capacidade de Interação/Usabilidade).

### 3.2 Escopo inicial do que se pretende avaliar

Nesta fase, o escopo de avaliação futura será restrito às áreas do sistema mais críticas para o MVP, evitando cobrir funcionalidades que ainda estão fora de escopo:

- **Fluxo de submissão de artigo** (metadados + upload de PDF) — foco em Confiabilidade e Segurança.
- **Armazenamento de arquivos PDF** — foco em Segurança e Confiabilidade (recuperabilidade).
- **Listagem pública e busca** — foco em Capacidade de Interação.
- **Estrutura do código back-end** (camadas controller/service/repository) — foco em Manutenibilidade.

Funcionalidades ainda fora do escopo do MVP (login, revisão por pares, notificações etc.) **não** entram na avaliação de qualidade neste momento, seguindo a mesma lógica de escopo já aplicada ao desenvolvimento.

### 3.3 Métricas e evidências preliminares por atributo

Sempre que possível, a avaliação reaproveita as métricas já definidas em `docs/METRICAS.md` (entrega 3), em vez de criar métricas paralelas.

| Atributo | Métricas já definidas (`METRICAS.md`) | Evidência processual adicional |
|---|---|---|
| **Confiabilidade** | M-05 (Taxa de Retrabalho), M-06 (Densidade de Defeitos) | Casos de teste automatizados do fluxo central (mitigação de R05); checks automáticos exigidos pelo DoD antes de merge. |
| **Manutenibilidade** | M-02 (Complexidade Ciclomática), M-04 (Acoplamento entre Classes / CBO), M-01 (NCLOC como referência de tamanho) | Revisão obrigatória por pares em todo PR (DoD); registro de decisões técnicas em ADRs. |
| **Segurança** | Nenhuma métrica quantitativa formal ainda definida em `METRICAS.md` | Checklist de validação de upload (tipo/tamanho de arquivo); revisão em PR da lógica de associação arquivo↔artigo↔autor. **Proposta para próxima entrega:** métrica de taxa de arquivos rejeitados na validação, ou auditoria amostral da associação autor/arquivo. |
| **Capacidade de Interação** | Nenhuma métrica formal ainda definida em `METRICAS.md` | Revisão informal do formulário de submissão e da busca pelos próprios integrantes antes de cada entrega. **Proposta para próxima entrega:** teste com um pequeno grupo de usuários reais (ex.: 3–5 pessoas do público-alvo), medindo taxa de conclusão de submissão sem erro. |

Como indicado nas tabelas acima, Segurança e Capacidade de Interação ainda não têm métricas quantitativas formalizadas — isso é esperado nesta etapa (definição de critérios, não execução), mas fica registrado como próximo passo concreto para as entregas seguintes.

---

## Referências

- [`docs/riscos.md`](riscos.md) — Registro de riscos do projeto.
- [`docs/METRICAS.md`](METRICAS.md) — Métricas de produto, processo e projeto já definidas.
- [`docs/dod.md`](dod.md) — Definition of Done.
- [`docs/adr/ADR-0002.md`](adr/ADR-0002.md) — Stack tecnológica do projeto.
- ISO/IEC 25010 — *Systems and software Quality Requirements and Evaluation (SQuaRE) — Product quality model*.
