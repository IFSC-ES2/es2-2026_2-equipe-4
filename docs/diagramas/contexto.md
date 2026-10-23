# Visão de contexto

Estado da `entrega-7` no commit `19c53da`.
A consulta pública está disponível na API; a tela ainda está pendente.

```mermaid
flowchart LR
    visitante["Visitante sem conta"]
    autor["Usuário cadastrado"]
    subgraph sistema["Fronteira do PublicaIFSC"]
        vitrine["Vitrine de projetos universitários"]
    end
    visitante -->|"Consulta projetos pela API"| vitrine
    autor -->|"Faz login e publica projetos"| vitrine
```

Cadastro é público. A publicação exige autenticação; não há perfil de revisor
nem fluxo de revisão por pares implementado.

[Voltar à arquitetura](../ARQUITETURA.md).
