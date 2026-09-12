# Fluxo de Trabalho

Este documento consolida o processo colaborativo adotado pela equipe. As regras descritas
aqui estão aplicadas no repositório.

## 1. Ramificações

O repositório trabalha em duas camadas de branch

**Branch da entrega.** Cada etapa é desenvolvida em uma ramificação própria, nomeada
`entrega-N`. O desenvolvimento desta etapa ocorre obrigatoriamente na **`entrega-4`**, criada
a partir da `main`.

**Branches de trabalho.** Cada issue é desenvolvida em uma branch própria, criada a partir da
`entrega-N` e integrada de volta a ela por pull request. O padrão de nomenclatura é
`tipo/numero-slug`:

- `tipo` corresponde ao template da issue: `task`, `feature`, `fix` ou `docs`
- `numero` é o número da issue que a branch atende
- `slug` descreve a tarefa em minúsculas, separado por hifens

Exemplos em uso no repositório: `task/42-adicionar-lint-ci`,
`fix/45-apagar-comentarios-html`, `docs/13-adicionar-inception`.

## 2. Integração de mudanças

Toda alteração de código, documentação, configuração ou teste entra por **pull request**.

O caminho de uma alteração é sempre:

```
tipo/numero-slug  →  (PR + revisão)  →  entrega-N  →  (PR + revisão)  →  main
```

**A `main` recebe apenas commits de mesclagem.** Nenhum trabalho é escrito diretamente nela;
ela registra somente a integração de cada entrega.

## 3. Revisão e aprovação

**Qualquer integrante da equipe pode revisar e aprovar um pull request, exceto o autor.**

A regra é aberta: garante revisão cruzada real sem depender da disponibilidade de uma pessoa específica, 
e distribui a evidência de participação entre todos os integrantes.

**É exigida no mínimo 1 aprovação antes da integração.**

## 4. Template de pull request

Todo pull request é aberto a partir de `.github/PULL_REQUEST_TEMPLATE.md`, que traz um
checklist mínimo de revisão:

- critérios de aceitação da issue atendidos
- branch criada a partir de `entrega-N` (ou é a própria `entrega-N` indo para a `main`)
- nenhum commit feito diretamente na `main`
- uso de IA registrado em `USO-IA.md`, se houver

O template também exige a vinculação à issue correspondente.

> **Observação sobre `Closes #N`.** A palavra-chave de fechamento automático só é
> interpretada quando o pull request tem a **branch padrão (main)** como destino. Nos PRs internos da
> etapa, que o destino é `entrega-N`, a issue precisa ser fechada manualmente após o merge.

## 5. Checks obrigatórios

O pipeline de CI está construído em `.github/workflows/ci.yml` e dispara
automaticamente a cada pull request destinado à `main` ou a qualquer branch `entrega-*`.

Três verificações rodam em paralelo, todas configuradas como **obrigatórias**:

| Check | O que verifica |
|---|---|
| `Documentos obrigatórios` | presença de `README.md`, `USO-IA.md`, `docs/inception.md` e `docs/dod.md` |
| `Links internos` | links relativos dos arquivos Markdown apontam para arquivos existentes |
| `Lint Markdown` | Markdown sintaticamente quebrado: link invertido, link vazio, âncora inexistente, referência não definida e numeração de lista divergente da renderizada |

Enquanto os três não concluírem com sucesso, o merge fica bloqueado.

### Detalhamento do CI mínimo

**Gatilho:** O workflow usa `on: pull_request` com `branches: [main, 'entrega-*']`. A inclusão
do padrão `entrega-*` é intencional: sem ela, os pull requests internos da etapa não
disparariam verificação alguma, e a maior parte dos PRs da equipe é interna.

**`Documentos obrigatórios`** usa `ls` sobre a lista de arquivos exigidos. O comando encerra
com código diferente de zero se algum estiver ausente, e o log nomeia qual faltou.

**`Links internos`** usa `lycheeverse/lychee-action@v2` com a opção `--offline`, que restringe
a verificação a arquivos locais e bloqueia requisições de rede. A escolha evita que um site
externo fora do ar reprove um pull request que não tenha defeito por si só.

**`Lint Markdown`** usa `DavidAnson/markdownlint-cli2-action@v24`. A configuração de regras
está em `.markdownlint.jsonc`, na raiz do repositório, e desativa o conjunto padrão da
ferramenta para habilitar somente as regras que detectam Markdown que realmente quebra ao
renderizar. A pasta `avaliacao/` é excluída da verificação por conter documentos de autoria do
professor, que a equipe não deve reformatar.

## 6. Onde as regras estão aplicadas

| Alvo | Mecanismo | O que impõe |
|---|---|---|
| `entrega-*` | Ruleset | alteração somente por pull request / 1 aprovação / 3 checks obrigatórios |
| `main` | Proteção de branch | alteração somente por pull request / 1 aprovação / 3 checks obrigatórios |
