# Rotas de login e contas

Todas as rotas usam o prefixo `/api/v1` (contexto definido em `application.properties`). A porta padrão é `8080`. As respostas são JSON em português. Para os exemplos locais, use `http://localhost:8080`.

## Autenticação

### `GET /api/v1/auth/status`

Verifica se o serviço de autenticação está disponível. Não exige token.

Resposta `200`:

```json
{"mensagem":"Serviço de autenticação disponível"}
```

### `POST /api/v1/auth/login`

Autentica uma conta existente. Não exige token.

Requisição:

```json
{"email":"ana@example.com","password":"senha123"}
```

Resposta `200`:

```json
{"token":"<JWT>"}
```

Credenciais inválidas retornam `401`:

```json
{"status":401,"erro":{"mensagem":"E-mail ou senha incorretos"},"path":"/api/v1/auth/login"}
```

Campos ausentes, e-mail inválido ou senha fora do tamanho permitido retornam `400`, com os detalhes em `erro`.

### `GET /api/v1/auth/token`

Valida o JWT apresentado no cabeçalho `Authorization: Bearer <JWT>`. Retorna `200` com `{"mensagem":"Token válido"}` quando válido; sem token, expirado ou inválido retorna `401`.

## Criação e gerenciamento de contas

O segmento `0.0.1` corresponde à versão configurada por `app.api.version`.

### `GET /api/v1/users/createAccount/0.0.1/run`

Verifica se o serviço de contas está disponível. Resposta `200` com mensagem em português.

### `POST /api/v1/users/createAccount/0.0.1/novousers`

Cria uma conta. Não exige token. A senha é armazenada com hash BCrypt; o e-mail é normalizado para minúsculas.

Requisição:

```json
{"nome":"Ana Silva","email":"ana@example.com","password":"senha123"}
```

Sucesso retorna `201`:

```json
{"status":201,"message":"Usuário criado com sucesso","path":"/api/v1/users/createAccount/0.0.1","userId":"<id>"}
```

E-mail já cadastrado retorna `409`; campos inválidos retornam `400`.

### `PUT /api/v1/users/createAccount/0.0.1/atualizar`

Atualiza os dados da conta identificada pelo e-mail. Envie `nome`, `email` e `password` conforme as mesmas validações da criação. Retorna `200` em sucesso e `404` quando a conta não existe.

### `DELETE /api/v1/users/createAccount/0.0.1/delete/{id}`

Remove uma conta pelo identificador. Retorna `204` sem corpo em sucesso ou `404` se não existir.

## Erros comuns

As respostas de erro incluem `status`, `erro` e `path`. Códigos usados: `400` para corpo/validação inválidos, `401` para autenticação ausente ou inválida, `404` para recurso inexistente, `405` para método não permitido, `409` para e-mail duplicado e `500` para falha inesperada no servidor.

## Configuração do JWT

Em `application.properties`, `app.jwt.secret` define o segredo de assinatura e `app.jwt.expiration-ms` define a duração em milissegundos (padrão: 3.600.000 ms, uma hora). A aplicação aceita sobrescrita pelas variáveis `JWT_SECRET` e `JWT_EXPIRATION_MS`. O segredo precisa ter pelo menos 32 bytes para HS256. Em ambiente publicado, configure um segredo privado por variável de ambiente.

## Teste manual

Abra `testes-manuais-python/teste-sistema-de-login.html` no navegador com a API local em execução. O formulário cria conta e entra usando estas rotas. A página verifica a API a cada 10 segundos e permite informar o endereço base da API no campo exibido no topo (por exemplo, `http://localhost:8080`); a escolha fica salva no navegador.
