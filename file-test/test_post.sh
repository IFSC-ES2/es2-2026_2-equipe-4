
# observação
#Verificar se o comniho do arquivo está correto
# Fiz a requisição estando na pasta do arquivo

curl -X POST http://localhost:8080/api/v1/arquivos/upload  \
 -F "arquivo=@arquivo-para-test.txt"


# Resposta
# {"id":"23518d4e-2a89-492a-947d-7a62e0070e98","nomeOriginal":"arquivo-para-test.txt","caminhoArmazenado":"uploads/23518d4e-2a89-492a-947d-7a62e0070e98.txt","tamanhoBytes":1882,"mensagem":"Arquivo salvo com sucesso"}