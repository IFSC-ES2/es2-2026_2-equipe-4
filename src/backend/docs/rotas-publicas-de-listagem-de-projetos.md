# Rotas públicas de listagem de projetos

Este documento descreve as rotas públicas usadas pela vitrine para consultar projetos. As rotas não exigem autenticação.

## URL base

Com a configuração local padrão, a URL base é:

```text
http://localhost:8080/api/v1
```

Todas as rotas abaixo usam o método HTTP `GET` e retornam JSON, exceto a consulta por ID que retorna `404 Not Found` sem corpo quando o projeto não existe.

## Formato de um projeto

As rotas retornam os campos do projeto:

| Campo | Tipo | Descrição |
| --- | --- | --- |
| `id` | string | Identificador do projeto |
| `autorId` | string | Identificador do usuário autor |
| `titulo` | string | Título do projeto |
| `resumo` | string | Resumo do projeto |
| `autores` | array de strings | Nomes dos autores |
| `tecnologias` | array de strings | Tecnologias utilizadas |
| `tema` | string | Tema do projeto |
| `imagens` | array de strings | Referências às imagens do projeto |
| `linkRepositorio` | string | Link para o repositório |
| `linkDemonstracao` | string | Link para a demonstração |

Exemplo de projeto:

```json
{
  "id": "6712ab34cd56ef7890123456",
  "autorId": "6712ab34cd56ef7890123450",
  "titulo": "Vitrine de projetos",
  "resumo": "Aplicação para apresentar projetos acadêmicos.",
  "autores": ["Ana Silva", "João Souza"],
  "tecnologias": ["Java", "React"],
  "tema": "Desenvolvimento web",
  "imagens": ["https://exemplo.com/imagem.png"],
  "linkRepositorio": "https://github.com/exemplo/projeto",
  "linkDemonstracao": "https://exemplo.com"
}
```

## 1. Listar projetos

```http
GET /api/v1/projetos
```

Lista os projetos de forma paginada.

### Parâmetros de consulta

| Parâmetro | Tipo | Obrigatório | Padrão | Regras |
| --- | --- | --- | --- | --- |
| `page` | inteiro | Não | `0` | Índice da página, começando em zero |
| `size` | inteiro | Não | `20` | Quantidade de itens; deve estar entre 1 e 100 |

Exemplo:

```bash
curl "http://localhost:8080/api/v1/projetos?page=0&size=10"
```

A resposta é um objeto de página. `content` contém os projetos da página e os demais campos informam a paginação:

```json
{
  "content": [
    {
      "id": "6712ab34cd56ef7890123456",
      "autorId": "6712ab34cd56ef7890123450",
      "titulo": "Vitrine de projetos",
      "resumo": "Aplicação para apresentar projetos acadêmicos.",
      "autores": ["Ana Silva", "João Souza"],
      "tecnologias": ["Java", "React"],
      "tema": "Desenvolvimento web",
      "imagens": ["https://exemplo.com/imagem.png"],
      "linkRepositorio": "https://github.com/exemplo/projeto",
      "linkDemonstracao": "https://exemplo.com"
    }
  ],
  "pageable": {
    "pageNumber": 0,
    "pageSize": 10,
    "offset": 0,
    "paged": true,
    "unpaged": false
  },
  "totalPages": 1,
  "totalElements": 1,
  "last": true,
  "size": 10,
  "number": 0,
  "sort": {
    "empty": true,
    "sorted": false,
    "unsorted": true
  },
  "numberOfElements": 1,
  "first": true,
  "empty": false
}
```

Quando não houver projetos na página, `content` será um array vazio e `empty` será `true`.

## 2. Consultar projeto por ID

```http
GET /api/v1/projetos/{id}
```

Retorna o projeto com o identificador informado. Em caso de sucesso, responde com status `200 OK` e um objeto de projeto no formato descrito acima. Se o ID não corresponder a um projeto, responde com `404 Not Found`.

Exemplo:

```bash
curl "http://localhost:8080/api/v1/projetos/6712ab34cd56ef7890123456"
```

## 3. Filtrar projetos por tecnologias

```http
GET /api/v1/projetos/tecnologias
```

Retorna uma página dos projetos que utilizem ao menos uma das tecnologias informadas. É possível informar tecnologias separadas por vírgula em um parâmetro ou repetir o parâmetro.

### Parâmetros de consulta

| Parâmetro | Tipo | Obrigatório | Padrão | Regras |
| --- | --- | --- | --- | --- |
| `tecnologias` | string ou lista de strings | Sim | — | Informe uma ou mais tecnologias |
| `page` | inteiro | Não | `0` | Índice da página, começando em zero |
| `size` | inteiro | Não | `20` | Quantidade de itens; deve estar entre 1 e 100 |

Exemplos equivalentes:

```bash
curl "http://localhost:8080/api/v1/projetos/tecnologias?tecnologias=Java,React&page=0&size=10"
```

```bash
curl "http://localhost:8080/api/v1/projetos/tecnologias?tecnologias=Java&tecnologias=React&page=0&size=10"
```

A resposta segue o mesmo formato paginado da listagem geral. O filtro usa correspondência exata com os valores armazenados no campo `tecnologias`; se houver várias tecnologias, um projeto que corresponda a qualquer uma delas será incluído.

## Erros de parâmetros

Se `page` for negativo, `size` estiver fora do intervalo de 1 a 100, ou o filtro não contiver nenhuma tecnologia válida, a rota responde com `400 Bad Request`. Para esses erros, o corpo segue este formato:

```json
{
  "status": 400,
  "erro": "O tamanho da página deve estar entre 1 e 100"
}
```
