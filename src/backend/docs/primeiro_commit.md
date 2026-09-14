# Trabalho da Faculdade

 API desenvolvida para o trabalho da faculdade.

 ## Etapas desenvolvidas

 ### 1\. Descompactar os arquivos

 Para descompactar os arquivos necessários para o projeto:

```
unzip artigos.zip
```

 ### 2\. Baixar as dependências

 Para baixar as bibliotecas e dependências necessárias, utilize:

```
./gradlew build
```

 ### 3\. Verificar a versão do Java

 Verifique a versão do Java instalada na máquina:

```
java --version
```

 Versão utilizada:

```
25
```

 Foi necessário alterar a versão do Java no projeto para que fosse compatível com a versão instalada na máquina:

```
languageVersion = JavaLanguageVersion.of(25)
```

 ### 4\. Inicializar a API

 Para iniciar a aplicação:

```
./gradlew bootRun
```

 A API será iniciada localmente.

 ## Controller

 Foram criadas as rotas padrão da API para testar o funcionamento da aplicação.

 ### Teste da API

 Para verificar se a API está funcionando corretamente:

```
curl -X GET http://localhost:8080/api/v1/run
```

 Resposta esperada:

```
{
  "Status": "Api running successfully",
  "Test": "My application is running with DevTools"
}
```

 Com esse teste, foi possível confirmar que a API estava funcionando corretamente.

