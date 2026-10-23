# Reengenharia do armazenamento de arquivos

Data: 22/10/2026. Issue #131.
Branch: `TASK/131-armazenamento-arquivos`, criada a partir de `entrega-7`.

## Problema e mudança

O `ProjetoService` cuidava dos dados e da autoria dos projetos, além de validar
arquivos, montar os dados do GridFS e gravar seu conteúdo. Isso misturava
tarefas diferentes e exigia simular o banco até nos testes de upload do serviço.

A gravação foi movida para
[ArmazenamentoArquivoService](../src/backend/projetos/src/main/java/ifsc/edu/projetos/services/ArmazenamentoArquivoService.java).
O [ProjetoService](../src/backend/projetos/src/main/java/ifsc/edu/projetos/services/ProjetoService.java)
apenas encaminha o upload e continua cuidando dos projetos.
Foram preservados rotas, campos da resposta, mensagens, validações e autoria
pelo usuário autenticado. A falha do banco continua sendo repassada.

## Medição antes e depois

O [script de medição](../scripts/medir_armazenamento.py) conta os tipos de
armazenamento usados no corpo de cada classe: `GridFsTemplate`, `Document`
e `ObjectId`. Textos, comentários e imports ficam fora da contagem.
Também conta as dependências de tipos do próprio projeto, seguindo o recorte
da [M-04](metricas/M-04.md). O mesmo script mede as duas versões.


| Classe | Tipos de armazenamento antes | Depois | Dependências internas antes | Depois |
|---|---:|---:|---:|---:|
| ProjetoService | 3 | 0 | 5 | 6 |
| ArmazenamentoArquivoService | — | 3 | — | 1 |
| Soma das classes medidas | 3 | 3 | 5 | 7 |

O serviço extraído não existia antes. A soma inclui as duas classes.
Os detalhes de gravação ficaram concentrados no novo serviço. O custo foi
adicionar uma classe e aumentar as ligações internas de 5 para 7.
A contagem é feita por nomes de tipos e não mede tempo de resposta ou memória.


## Testes executados

Foram verificados arquivo válido, vazio e nulo, falha de leitura e falha do banco.
Os testes do controller verificam resposta 201, seus campos, e erro 400 para
arquivo vazio. Os testes de autoria, cadastro e login existentes também passaram.

Comandos executados na pasta `src/backend/projetos`:

```powershell
# Antes
.\gradlew.bat test --tests '*ServiceTest' --tests '*JwtUtilTest' --no-daemon
# Depois
.\gradlew.bat test --tests '*ServiceTest' --tests '*JwtUtilTest' --tests '*ProjetoUploadControllerTest' --offline --no-daemon
```

Os resultados estão em `src/backend/projetos/build/reports/tests/test/index.html`.
O MongoDB foi simulado nesses testes. Os testes de integração com banco real
não foram executados; o MongoDB e o Docker estavam desligados.
O teste do controller não executa os filtros de autenticação.

## Relação com a qualidade da Entrega 4

Conforme os [critérios de qualidade](qualidade.md):

- **Manutenção:** armazenamento e regras do projeto podem ser alterados e testados separadamente.
- **Confiabilidade:** os testes cobrem sucesso, rejeição de arquivo e falhas de gravação.
- **Segurança:** autoria e autenticação foram preservadas. Esta mudança não resolve as credenciais da #100.
- **Facilidade de uso:** o formulário continua recebendo os mesmos campos e mensagens.

A mudança mantém GridFS e os contratos da API; não exige um novo ADR.
