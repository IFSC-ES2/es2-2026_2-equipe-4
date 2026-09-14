
## Configuração no Spring Boot

No `application.properties` ou `application.yml`:

```properties
spring.data.mongodb.uri=mongodb://admin:admin123@localhost:27017/seu_banco?authSource=admin
```

Para verificar a conexão basta usar:

```bash
docker exec -it mongodb mongosh
```

isso vai mostar:

```md
show dbs
use seu_banco
show collections
```

Por exemplo: 

```bash
Current Mongosh Log ID: 6aa824b6617a63a263df778e
Connecting to:          mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.10.0
Using MongoDB:          undefined
Using Mongosh:          2.10.0

For mongosh info see: https://www.mongodb.com/docs/mongodb-shell/


To help improve our products, anonymous usage data is collected and sent to MongoDB periodically (https://www.mongodb.com/legal/privacy-policy).
You can opt-out by running the disableTelemetry() command.
```


## Todos os sistemas rodaram com sucesso em minha maquina (CodeSpace)

Segue uma imagem:

![Serviços rodando](./services_run.png)


## Zero operações

A API ainda não realiza nenhuma operação no banco.
