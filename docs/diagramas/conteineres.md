# Visão de contêineres

Visão dos ambientes publicado e local do PublicaIFSC. O deploy usa Render e
MongoDB Atlas; Docker Compose permanece disponível para desenvolvimento local.

```mermaid
flowchart LR
    navegador["Navegador"]
    subgraph publicado["Ambiente publicado"]
        site["Render Static Site<br/>publicaifsc.onrender.com"]
        api_publica["Render Web Service<br/>publicaifsc-api.onrender.com"]
        atlas[("MongoDB Atlas")]
        api_publica -->|"MongoDB URI"| atlas
    end
    subgraph compose["PublicaIFSC — Docker Compose local"]
        frontend["React e Vite<br/>5173"]
        api["API Spring Boot<br/>8080"]
        mongo[("MongoDB + GridFS<br/>27017")]
        volume[("Volume mongodb_data")]
        api -->|"Spring Data e GridFsTemplate"| mongo
        mongo -->|"Persistência"| volume
    end
    navegador -->|"HTTPS"| site
    navegador -->|"HTTPS /api/v1; JWT nas rotas protegidas"| api_publica
    navegador -->|"HTML, JavaScript e CSS"| frontend
    navegador -->|"HTTP /api/v1; JWT nas rotas protegidas"| api
```

O navegador não acessa o banco diretamente. GridFS faz parte do MongoDB e
armazena as imagens. A API do Render pode dormir após inatividade no plano
gratuito. [Configuração dos ambientes](../DEPLOY.md) · [Voltar à arquitetura](../ARQUITETURA.md).
