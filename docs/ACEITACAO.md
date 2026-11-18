# Testes de aceitação do MVP do PublicaIFSC

## Introdução

Este documento reúne os resultados fornecidos pelo responsável pelos testes manuais de aceitação. O registro abrange as cinco funcionalidades principais do MVP do PublicaIFSC, conforme a [issue #214](https://github.com/IFSC-ES2/es2-2026_2-equipe-4/issues/214).

## Ambiente de testes

- **Sistema** — PublicaIFSC
- **Frontend** — <https://publicaifsc.onrender.com/>
- **API** — <https://publicaifsc-api.onrender.com/>
- **Tipo de teste** — Aceitação manual

## Resumo geral

| Funcionalidade | Quantidade de testes | Aprovados | Aprovados com ressalvas | Reprovados | Pendentes |
| --- | ---: | ---: | ---: | ---: | ---: |
| Cadastro de usuário | 4 | 3 | 1 | 0 | 0 |
| Login | 3 | 3 | 0 | 0 | 0 |
| Submissão de projeto | 4 | 4 | 0 | 0 | 0 |
| Edição de projeto | 4 | 4 | 0 | 0 | 0 |
| Exclusão de projeto | 3 | 3 | 0 | 0 | 0 |
| **Total** | **18** | **17** | **1** | **0** | **0** |

Os 18 casos foram executados. Houve 17 aprovações e 1 aprovação com ressalvas, com zero reprovações. A implementação da edição foi integrada à branch `entrega-9` no [PR #220](https://github.com/IFSC-ES2/es2-2026_2-equipe-4/pull/220).

## Casos de teste

### Cadastro de usuário

#### CT-01 — Cadastro com dados válidos

- **Issues relacionadas** — [#101](https://github.com/IFSC-ES2/es2-2026_2-equipe-4/issues/101) e [#106](https://github.com/IFSC-ES2/es2-2026_2-equipe-4/issues/106)
- **Objetivo** — Verificar se é possível criar uma conta com dados válidos.
- **Procedimento de teste** — Abra a página de cadastro, informe um nome, um e-mail ainda não cadastrado e uma senha válida. Envie o formulário.
- **Resultado esperado** — Usuário cadastrado com sucesso.
- **Resultado obtido** — Aprovado conforme a execução manual.
- **Status** — **Aprovado**

#### CT-02 — Cadastro com campos obrigatórios vazios

- **Issues relacionadas** — [#106](https://github.com/IFSC-ES2/es2-2026_2-equipe-4/issues/106) e [#101](https://github.com/IFSC-ES2/es2-2026_2-equipe-4/issues/101)
- **Objetivo** — Verificar a validação dos campos obrigatórios no cadastro.
- **Procedimento de teste** — Abra a página de cadastro, deixe os campos obrigatórios vazios e tente enviar o formulário.
- **Resultado esperado** — O sistema impede o cadastro e informa os campos que precisam ser preenchidos.
- **Resultado obtido** — Aprovado conforme a execução manual.
- **Status** — **Aprovado**

#### CT-03 — Cadastro com e-mail já utilizado

- **Issues relacionadas** — [#201](https://github.com/IFSC-ES2/es2-2026_2-equipe-4/issues/201), [#101](https://github.com/IFSC-ES2/es2-2026_2-equipe-4/issues/101) e [#106](https://github.com/IFSC-ES2/es2-2026_2-equipe-4/issues/106)
- **Objetivo** — Verificar se o mesmo e-mail pode ser usado em mais de uma conta.
- **Procedimento de teste** — Abra a página de cadastro, informe o e-mail de uma conta existente, preencha os demais campos com dados válidos e tente enviar o formulário.
- **Resultado esperado** — O sistema impede o cadastro duplicado.
- **Resultado obtido** — Aprovado conforme a execução manual.
- **Status** — **Aprovado**

#### CT-04 — Validação do formato de e-mail no cadastro

- **Issues relacionadas** — [#106](https://github.com/IFSC-ES2/es2-2026_2-equipe-4/issues/106) e [#101](https://github.com/IFSC-ES2/es2-2026_2-equipe-4/issues/101)
- **Objetivo** — Verificar quais formatos de e-mail a validação do cadastro aceita.
- **Procedimento de teste** — Mantenha os demais campos válidos e tente enviar o formulário de cadastro uma vez para cada e-mail listado no resultado obtido.
- **Resultado esperado** — Rejeitar formatos inválidos de e-mail conforme as regras de validação definidas.
- **Resultado obtido** — o sistema rejeita endereços sem `@` e sem domínio, mas aceita domínios sem ponto.
  - `juliano` — rejeitado.
  - `juliano@` — rejeitado.
  - `juliano@a` — aceito.
  - `juliano@qualquercoisa` — aceito.
- **Status** — **Aprovado com ressalvas**
- **Ressalva** — o sistema realiza uma validação básica do formato, mas não exige um domínio com ponto. Recomenda-se avaliar a necessidade de validações adicionais ou confirmação do endereço por e-mail. A ausência de ponto, isoladamente, não torna um e-mail necessariamente inválido.

### Login

#### CT-05 — Login com credenciais válidas

- **Issues relacionadas** — [#104](https://github.com/IFSC-ES2/es2-2026_2-equipe-4/issues/104) e [#106](https://github.com/IFSC-ES2/es2-2026_2-equipe-4/issues/106)
- **Objetivo** — Verificar a autenticação com as credenciais corretas de uma conta.
- **Procedimento de teste** — Abra a página de login, informe o e-mail e a senha corretos de uma conta cadastrada e envie o formulário.
- **Resultado esperado** — Permitir a autenticação do usuário.
- **Resultado obtido** — Aprovado conforme a execução manual.
- **Status** — **Aprovado**

#### CT-06 — Login com senha incorreta

- **Issues relacionadas** — [#104](https://github.com/IFSC-ES2/es2-2026_2-equipe-4/issues/104) e [#106](https://github.com/IFSC-ES2/es2-2026_2-equipe-4/issues/106)
- **Objetivo** — Verificar se o sistema recusa uma senha incorreta.
- **Procedimento de teste** — Abra a página de login, informe o e-mail de uma conta cadastrada e uma senha diferente da senha dessa conta. Envie o formulário.
- **Resultado esperado** — Impedir a autenticação e apresentar uma mensagem de erro.
- **Resultado obtido** — Aprovado conforme a execução manual.
- **Status** — **Aprovado**

#### CT-07 — Comportamento da sessão expirada

- **Issues relacionadas** — [#104](https://github.com/IFSC-ES2/es2-2026_2-equipe-4/issues/104) e [#194](https://github.com/IFSC-ES2/es2-2026_2-equipe-4/issues/194)
- **Objetivo** — Verificar o tratamento de uma sessão expirada ao tentar acessar uma funcionalidade protegida.
- **Procedimento de teste** — Faça login com uma conta cadastrada e aguarde a sessão expirar com a aplicação aberta. Sem iniciar outra sessão, tente acessar a página de submissão de projetos.
- **Resultado esperado** — O sistema deve reconhecer a sessão inválida, impedir operações protegidas e orientar o usuário a realizar novo login.
- **Resultado obtido** — Aprovado conforme a execução manual.
- **Status** — **Aprovado**

### Submissão de projeto

#### CT-08 — Publicar projeto válido com imagem

- **Issues relacionadas** — [#103](https://github.com/IFSC-ES2/es2-2026_2-equipe-4/issues/103), [#106](https://github.com/IFSC-ES2/es2-2026_2-equipe-4/issues/106) e [#191](https://github.com/IFSC-ES2/es2-2026_2-equipe-4/issues/191)
- **Objetivo** — Verificar a publicação de um projeto com dados válidos e uma imagem.
- **Procedimento de teste** — Faça login, abra o formulário de submissão, preencha título, resumo, tema, autores e tecnologias com dados válidos e anexe uma imagem compatível de até 5 MB. Envie o formulário para publicação.
- **Resultado esperado** — O projeto deve ser publicado com sucesso.
- **Resultado obtido** — Aprovado conforme a execução manual.
- **Status** — **Aprovado**

#### CT-09 — Publicar com campos obrigatórios vazios

- **Issues relacionadas** — [#201](https://github.com/IFSC-ES2/es2-2026_2-equipe-4/issues/201) e [#106](https://github.com/IFSC-ES2/es2-2026_2-equipe-4/issues/106)
- **Objetivo** — Verificar a validação dos campos obrigatórios na submissão.
- **Procedimento de teste** — Faça login, abra o formulário de submissão, deixe os campos obrigatórios vazios e tente publicar o projeto.
- **Resultado esperado** — O sistema impede a publicação e indica os campos obrigatórios.
- **Resultado obtido** — Aprovado conforme a execução manual.
- **Status** — **Aprovado**

#### CT-10 — Enviar imagem inválida ou acima de 5 MB

- **Issues relacionadas** — [#196](https://github.com/IFSC-ES2/es2-2026_2-equipe-4/issues/196), [#170](https://github.com/IFSC-ES2/es2-2026_2-equipe-4/issues/170) e [#178](https://github.com/IFSC-ES2/es2-2026_2-equipe-4/issues/178)
- **Objetivo** — Verificar a validação do formato e do tamanho das imagens na submissão.
- **Procedimento de teste** — Faça login e abra o formulário de submissão. Tente anexar uma imagem de formato incompatível, como SVG. Em outra tentativa, use uma imagem de formato compatível com tamanho superior a 5 MB.
- **Resultado esperado** — Impedir o envio de imagens inválidas ou maiores que o limite, apresentando mensagem adequada.
- **Resultado obtido** — Aprovado conforme a execução manual.
- **Status** — **Aprovado**

#### CT-11 — Verificar o projeto na galeria e nos detalhes

- **Issues relacionadas** — [#181](https://github.com/IFSC-ES2/es2-2026_2-equipe-4/issues/181), [#172](https://github.com/IFSC-ES2/es2-2026_2-equipe-4/issues/172), [#124](https://github.com/IFSC-ES2/es2-2026_2-equipe-4/issues/124) e [#191](https://github.com/IFSC-ES2/es2-2026_2-equipe-4/issues/191)
- **Objetivo** — Verificar a consulta dos dados de um projeto recém-publicado pela galeria e pela página de detalhes.
- **Procedimento de teste** — Publique um projeto com dados válidos e localize-o pelo título na galeria. Abra a página de detalhes e compare os dados exibidos com os dados enviados.
- **Resultado esperado** — O projeto publicado deve estar disponível para consulta, apresentando seus dados corretamente.
- **Resultado obtido** — Aprovado conforme a execução manual.
- **Status** — **Aprovado**

### Edição de projeto

#### CT-12 — Editar dados de um projeto próprio

- **Issue relacionada** — [#217](https://github.com/IFSC-ES2/es2-2026_2-equipe-4/issues/217)
- **Objetivo** — Verificar se o autor consegue editar os dados de um projeto que publicou.
- **Procedimento de teste** — Faça login como autor, abra os detalhes de um projeto próprio e selecione **Editar**. Confira os dados preenchidos no formulário, altere o título e o resumo e selecione **Salvar alterações**. Compare os novos valores com os dados exibidos nos detalhes.
- **Resultado esperado** — O formulário abre com os dados atuais do projeto. Após salvar, a página de detalhes exibe os valores atualizados.
- **Resultado obtido** — Aprovado conforme a execução manual.
- **Status** — **Aprovado**

#### CT-13 — Trocar a imagem de um projeto próprio

- **Issues relacionadas** — [#217](https://github.com/IFSC-ES2/es2-2026_2-equipe-4/issues/217) e [#170](https://github.com/IFSC-ES2/es2-2026_2-equipe-4/issues/170)
- **Objetivo** — Verificar se o autor consegue trocar a imagem de um projeto que publicou.
- **Procedimento de teste** — Faça login como autor, abra os detalhes de um projeto próprio e selecione **Editar**. No campo **Trocar imagem do projeto**, selecione um PNG diferente da imagem atual, com menos de 5 MB. Selecione **Salvar alterações** e confira a imagem na página de detalhes.
- **Resultado esperado** — O sistema salva a nova imagem e a exibe nos detalhes do projeto.
- **Resultado obtido** — Aprovado conforme a execução manual.
- **Status** — **Aprovado**

#### CT-14 — Impedir edição por outro usuário

- **Issue relacionada** — [#217](https://github.com/IFSC-ES2/es2-2026_2-equipe-4/issues/217)
- **Objetivo** — Verificar se a edição de um projeto fica restrita ao autor.
- **Procedimento de teste** — Publique um projeto de teste com uma conta e anote seu identificador e os dados preenchidos. Faça login com uma segunda conta, abra os detalhes e verifique se a opção **Editar** aparece. Pela rota `PUT /api/v1/projetos/{id}`, envie um novo título válido e os valores atuais dos demais campos obrigatórios, usando a autenticação da segunda conta. Consulte o projeto novamente.
- **Resultado esperado** — A opção **Editar** fica disponível apenas para o autor. A API recusa a alteração da segunda conta e preserva os dados do projeto.
- **Resultado obtido** — Aprovado conforme a execução manual.
- **Status** — **Aprovado**

#### CT-15 — Verificar persistência das alterações realizadas

- **Issue relacionada** — [#217](https://github.com/IFSC-ES2/es2-2026_2-equipe-4/issues/217)
- **Objetivo** — Verificar se os dados alterados continuam disponíveis em uma nova consulta ao projeto.
- **Procedimento de teste** — Faça login como autor, edite o resumo de um projeto próprio e selecione **Salvar alterações**. Recarregue a página de detalhes e compare o resumo exibido com o valor salvo.
- **Resultado esperado** — Após recarregar a página, os detalhes exibem o resumo atualizado.
- **Resultado obtido** — Aprovado conforme a execução manual.
- **Status** — **Aprovado**

### Exclusão de projeto

#### CT-16 — Deletar projeto próprio

- **Issues relacionadas** — [#210](https://github.com/IFSC-ES2/es2-2026_2-equipe-4/issues/210) e [#211](https://github.com/IFSC-ES2/es2-2026_2-equipe-4/issues/211)
- **Objetivo** — Verificar se o autor pode excluir um projeto que publicou.
- **Procedimento de teste** — Faça login com a conta que publicou um projeto de teste. Localize o projeto na galeria, selecione **Apagar** e confirme a exclusão.
- **Resultado esperado** — Permitir a exclusão do projeto.
- **Resultado obtido** — Aprovado conforme a execução manual.
- **Status** — **Aprovado**

#### CT-17 — Impedir exclusão por outro usuário

- **Issues relacionadas** — [#210](https://github.com/IFSC-ES2/es2-2026_2-equipe-4/issues/210) e [#211](https://github.com/IFSC-ES2/es2-2026_2-equipe-4/issues/211)
- **Objetivo** — Verificar se a exclusão de um projeto fica restrita ao autor.
- **Procedimento de teste** — Publique um projeto de teste com uma conta e anote o identificador. Faça login com uma segunda conta e verifique na galeria se a ação **Apagar** está disponível para esse projeto. Com a autenticação da segunda conta, tente excluir o projeto pela rota `DELETE /api/v1/projetos/{id}` e volte a consultá-lo.
- **Resultado esperado** — Impedir a exclusão e preservar o projeto.
- **Resultado obtido** — Aprovado conforme a execução manual.
- **Status** — **Aprovado**

#### CT-18 — Confirmar que o projeto excluído não pode mais ser consultado

- **Issue relacionada** — [#211](https://github.com/IFSC-ES2/es2-2026_2-equipe-4/issues/211)
- **Objetivo** — Verificar se o projeto deixa de aparecer na galeria e de ser acessível pelo identificador após a exclusão.
- **Procedimento de teste** — Anote o identificador de um projeto de teste e exclua-o com a conta do autor. Atualize a galeria e procure o projeto. Em seguida, consulte o identificador anotado pela rota `GET /api/v1/projetos/{id}`.
- **Resultado esperado** — O projeto não deve aparecer na listagem e a consulta pelo identificador deve retornar que o recurso não foi encontrado.
- **Resultado obtido** — Aprovado conforme a execução manual.
- **Status** — **Aprovado**
