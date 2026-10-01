# API de autenticação e cadastro

A API do backend expõe endpoints públicos para login e criação de conta. As rotas abaixo não exigem token de autenticação.

## Rotas públicas

### Login

- Método: `POST`
- Rota: `/api/v1/auth/login`
- Descrição: autentica um usuário e retorna um JWT em JSON.
- Body exemplo:

```json
{
  "email": "usuario@email.com",
  "password": "123456"
}
```

- Resposta esperada:

```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9..."
}
```

- Uso do token em rotas protegidas:

```http
Authorization: Bearer <token>
```

### Verificação da API

- Método: `GET`
- Rota: `/api/v1/auth/`
- Descrição: endpoint de health check simples.

### Cadastro de usuário

- Método: `POST`
- Rota: `/api/v1/users/createAccount/0.0.1/novousers`
- Descrição: cria um novo usuário no sistema.
- Body exemplo:

```json
{
  "nome": "Maria Silva",
  "email": "maria@email.com",
  "password": "123456"
}
```

### Health check do cadastro

- Método: `GET`
- Rota: `/api/v1/users/createAccount/0.0.1/run`
- Descrição: endpoint de verificação da rota de cadastro.

## Rotas protegidas

Qualquer outra rota da API, fora as listadas acima, exige autenticação por JWT.
