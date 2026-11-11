

## Adições

 Nesta versão foram adicionadas configurações e endpoints padrão para facilitar a identificação, o monitoramento e a validação do funcionamento da API.

 ### 1\. Context Path padrão

 Foi definido um `context-path` padrão para a aplicação. Dessa forma, todas as requisições da API utilizarão o prefixo:

```
/api/v1
```

 Configuração em `application.properties`:

```
# Context path padrão da API
server.servlet.context-path=/api/v1
```

 Com essa configuração, um endpoint declarado no controller como:

```
@GetMapping("/")
```

 será acessível através de:

```
http://localhost:8080/api/v1/
```

 > **Importante:** como `/api/v1` é definido pelo `server.servlet.context-path`, ele não deve ser repetido no `@RequestMapping` dos controllers.

---

 ## 2\. Controller de configuração

 Foi adicionado o `ConfiguracaoController`, responsável por disponibilizar endpoints básicos para verificar o funcionamento e obter informações da aplicação.

 Endpoints disponíveis:

 | Método | Endpoint | Descrição |
| --- | --- | --- |
| GET | `/` | Verifica se a API está funcionando |
| GET | `/status` | Retorna o estado atual da API |
| GET | `/info` | Retorna informações da aplicação |

---

 ### 2.1. Endpoint raiz

 O endpoint raiz permite verificar rapidamente se a API está funcionando corretamente.

```
@GetMapping("/")
public ResponseEntity<Map<String, Object>> raiz() {
    Map<String, Object> body = new LinkedHashMap<>();
    body.put("status", "UP");
    body.put("mensagem", "API rodando com sucesso");
    body.put("timestamp", LocalDateTime.now());

    return ResponseEntity.ok(body);
}
```

 #### Requisição

```
curl -X GET http://localhost:8080/api/v1/
```

 #### Resposta

```
{
    "status": "UP",
    "mensagem": "API rodando com sucesso",
    "timestamp": "2026-09-12T00:17:54.701323821"
}
```

---

 ### 2.2. Endpoint de status

 O endpoint `/status` funciona como um health check simples da aplicação.

```
@GetMapping("/status")
public ResponseEntity<Map<String, Object>> status() {
    Map<String, Object> body = new LinkedHashMap<>();
    body.put("status", "UP");
    body.put("check", "OK");

    return ResponseEntity.status(HttpStatus.OK).body(body);
}
```

 #### Requisição

```
curl -X GET http://localhost:8080/api/v1/status
```

 #### Resposta

```
{
    "status": "UP",
    "check": "OK"
}
```

---

 ### 2.3. Endpoint de informações

 O endpoint `/info` fornece metadados básicos sobre a aplicação.

```
@GetMapping("/info")
public ResponseEntity<Map<String, Object>> info() {
    Map<String, Object> body = new LinkedHashMap<>();
    body.put("aplicacao", "Artigos API");
    body.put("versao", "1.0.0");
    body.put("ambiente", "development");

    return ResponseEntity.ok(body);
}
```

 #### Requisição

```
curl -X GET http://localhost:8080/api/v1/info
```

 #### Resposta

```
{
    "aplicacao": "Artigos API",
    "versao": "1.0.0",
    "ambiente": "development"
}
```

---

 ## 3\. Tratamento de rotas inexistentes

 Também foi adicionado tratamento para requisições direcionadas a endpoints que não existem.

 Por exemplo, ao realizar uma requisição para:

```
curl -X GET http://localhost:8080/api/v1/nao-existe
```

 a API retorna uma resposta informando que a rota não foi encontrada:

```
{
    "status": 404,
    "erro": "Rota não encontrada",
    "caminho": "/api/v1/nao-existe",
    "timestamp": "2026-09-12T00:20:44.756806918"
}
```

 Isso permite que as respostas de erro da API sejam padronizadas, facilitando o tratamento por clientes e consumidores da aplicação.

---

 ## 4\. Configurações do `application.properties`

 Foram adicionadas as seguintes configurações:

```
# Nome da aplicação
spring.application.name=artigos

# Porta da API
server.port=8080

# Context path padrão
server.servlet.context-path=/api/v1

# Configuração para tratamento de rotas inexistentes
spring.mvc.throw-exception-if-no-handler-found=true
spring.web.resources.add-mappings=false
```

 ### Resumo das configurações

 | Configuração | Valor | Descrição |
| --- | --- | --- |
| `spring.application.name` | `artigos` | Nome da aplicação |
| `server.port` | `8080` | Porta utilizada pelo servidor |
| `server.servlet.context-path` | `/api/v1` | Prefixo padrão das rotas |
| `spring.mvc.throw-exception-if-no-handler-found` | `true` | Permite tratar requisições sem handler |
| `spring.web.resources.add-mappings` | `false` | Desabilita o mapeamento padrão de recursos estáticos |

---

 ## 5\. Endpoints disponíveis

 Considerando que a aplicação esteja executando em:

```
http://localhost:8080
```

 os endpoints disponíveis são:

```
GET http://localhost:8080/api/v1/
GET http://localhost:8080/api/v1/status
GET http://localhost:8080/api/v1/info
```

 ### Testes rápidos

```
curl -X GET http://localhost:8080/api/v1/
curl -X GET http://localhost:8080/api/v1/status
curl -X GET http://localhost:8080/api/v1/info
```

 Para testar o tratamento de uma rota inexistente:

```
curl -X GET http://localhost:8080/api/v1/nao-existe
```
