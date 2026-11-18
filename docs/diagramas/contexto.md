# Visão de contexto

Visão do PublicaIFSC integrada na `main` em 11/11/2026 (merge do PR #188).
Visitantes consultam projetos; usuários cadastrados autenticam-se e publicam.

```mermaid
flowchart LR
    visitante["Visitante"]
    usuario["Estudante ou professor cadastrado"]
    subgraph sistema["Fronteira do PublicaIFSC"]
        publica["Vitrine de projetos"]
    end
    visitante -->|"Consulta galeria e detalhes"| publica
    usuario -->|"Cadastra-se, entra e publica"| publica
```

Cadastro é público e publicação exige autenticação JWT. O MVP não implementa
revisão por pares. [Voltar à arquitetura](../ARQUITETURA.md).
