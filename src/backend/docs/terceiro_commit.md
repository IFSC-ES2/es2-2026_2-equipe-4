# Submissão de artigos

 Foi implementada a submissão de artigos.

 Foram criadas duas rotas: uma para a submissão dos arquivos dos artigos e outra para o envio dos metadados.

 ## Exemplo de uso

```
# Observação:
# Verifique se o caminho do arquivo está correto.
# Neste exemplo, a requisição foi realizada estando na mesma pasta do arquivo.

$ curl -X POST http://localhost:8080/api/v1/arquivos/upload \
  -F "arquivo=@arquivo-test.txt"

# Resposta:
{"id":"3bfc951b-1414-4745-8270-7ea2980e3a5e","nomeOriginal":"arquivo-test.txt","caminhoArmazenado":"uplo270-7ea2980e3a5e.txt","tamanhoBytes":1882,"mensagem":"Arquivo salvo com sucesso"}
```
