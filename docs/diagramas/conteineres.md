# Visão de contêineres

Visão do código integrado na `main` em 11/11/2026. No ambiente local, Docker
Compose executa os serviços abaixo; não há ambiente remoto de staging.

```mermaid
flowchart LR
    navegador["Navegador"]
    subgraph compose["PublicaIFSC — Docker Compose local"]
        frontend["React e Vite<br/>5173"]
        api["API Spring Boot<br/>8080"]
        mongo[("MongoDB + GridFS<br/>27017")]
        volume[("Volume mongodb_data")]
        api -->|"Spring Data e GridFsTemplate"| mongo
        mongo -->|"Persistência"| volume
    end
    navegador -->|"HTML, JavaScript e CSS"| frontend
    navegador -->|"HTTP /api/v1; JWT nas rotas protegidas"| api
```

O navegador não acessa o banco diretamente. GridFS faz parte do MongoDB e
armazena as imagens. [Voltar à arquitetura](../ARQUITETURA.md).
