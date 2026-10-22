# Visão de contêineres

Estado da `entrega-7` no commit `19c53da`.
O navegador executa React e faz as chamadas HTTP à API.

```mermaid
flowchart LR
    navegador["Navegador do usuário"]
    subgraph sistema["PublicaIFSC — Docker Compose"]
        frontend["React e Vite<br/>Porta 5173"]
        api["API Spring Boot<br/>Porta 8080"]
        banco[("MongoDB e GridFS<br/>Porta 27017")]
        volume[("Volume mongodb_data")]
        api -->|"Spring Data: usuários e projetos<br/>GridFsTemplate: arquivos"| banco
        banco -->|"Persistência"| volume
    end
    navegador -->|"Carrega HTML, JavaScript e CSS"| frontend
    navegador -->|"HTTP /api/v1<br/>JWT nas rotas protegidas"| api
```

O front-end não acessa o banco. GridFS pertence ao MongoDB.
Atualmente, `ProjetoService` concentra regras de projetos e armazenamento.
A extração prevista na #131 deve manter estas fronteiras, salvo mudança de escopo.

[Voltar à arquitetura](../ARQUITETURA.md).
