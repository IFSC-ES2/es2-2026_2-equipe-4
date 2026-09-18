## Opção 1: Docker run (mais rápido, sem arquivo)

```bash
docker run -d \
  --name mongodb \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=admin123 \
  -v mongodb_data:/data/db \
  mongo:latest
```

Comandos úteis:
```bash
# Ver se está rodando
docker ps

# Ver logs
docker logs mongodb

# Parar
docker stop mongodb

# Iniciar novamente
docker start mongodb

# Remover (cuidado, perde o container, mas o volume mongodb_data continua)
docker rm -f mongodb
```

## Opção 2: docker-compose (mais fácil de manter)

Crie um arquivo `docker-compose.yml`:

```yaml
version: '3.8'

services:
  mongodb:
    image: mongo:latest
    container_name: mongodb
    restart: always
    ports:
      - "27017:27017"
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: admin123
    volumes:
      - mongodb_data:/data/db

volumes:
  mongodb_data:
```

Rodar com:
```bash
docker-compose up -d
```

Parar com:
```bash
docker-compose down
```