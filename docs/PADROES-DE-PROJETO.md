# Padrões de projeto aplicados

Este registro descreve estruturas verificáveis no código atual; não atribui
nomes de padrões GoF sem evidência de implementação.

| Padrão ou estrutura | Aplicação observada | Exemplos |
|---|---|---|
| Camadas | Controllers tratam HTTP, services concentram operações e repositories acessam persistência. | `ProjetoController`, `ProjetoService`, `ProjetoRepository` |
| Injeção de dependência | Spring fornece dependências por construtor, reduzindo criação direta de colaboradores. | `ProjetoService`, `ArmazenamentoArquivoService`, configuração de segurança |
| DTO | Tipos de transferência delimitam dados de entrada e resposta da API. | `ProjetoRespostaDTO` e DTOs de cadastro/login |
| Filtro de segurança | Filtro da cadeia Spring Security valida JWT por requisição protegida. | `JwtAuthenticationFilter` |
| Serviço especializado | Acesso ao GridFS foi extraído do serviço de projetos para uma responsabilidade dedicada. | `ArmazenamentoArquivoService` ([reengenharia](REENGENHARIA.md)) |

Os exemplos descrevem responsabilidades, não garantem que toda classe siga a
mesma forma. Novos padrões devem ser registrados quando forem adotados no
código, com problema resolvido e evidência revisável.
