# Release Candidate v1.0.0-rc.1

Texto-base da descrição da release candidata. A versão pode ser testada no
ambiente publicado no Render, com dados no MongoDB Atlas; endereços, usuário de
teste e validação estão em [DEPLOY](../DEPLOY.md).

## Resumo

O PublicaIFSC é uma vitrine de projetos universitários. Visitantes consultam a
galeria pública e o detalhe dos projetos; usuários cadastrados publicam
projetos com título, resumo, autores, tema, tecnologias, imagens e links, e
podem apagar os próprios projetos.

## Funcionalidades entregues

- Cadastro e login com JWT, com encerramento da sessão expirada.
- Publicação autenticada de projetos, com imagem padrão quando não há imagem.
- Galeria pública paginada, com filtro por tema e mapa de projetos.
- Página de detalhe do projeto, com imagens e links.
- Exclusão do projeto pelo próprio autor.
- Troca autenticada e leitura pública das imagens pela API.

## Correções e melhorias

Entrega 9:

- Exclusão sem suporte removida da galeria (#193, PR #202).
- Sessão expirada encerrada com orientação para novo login (#194, PR #203).
- Galeria exibe os projetos além da primeira página (#195, PR #204).
- Imagens validadas antes do envio e uploads concluídos reaproveitados (#196, PR #205).
- Favicon e título da aba atualizados (#198, PR #206).
- Exclusão do projeto pelo autor na API e na galeria (#211, PR #212; #210, PR #213).
- CI também em push na `main` (#199, PR #200).
- Site e API publicados no Render, com banco no MongoDB Atlas (#189, #191; #190, PR #207).
- Documentação de arquitetura, ADRs, padrões de projeto e retrospectiva (#208, PR #209).

Sprint 4:

- Configurações sensíveis em variáveis de ambiente (#156, PR #158).
- Autorização das operações de conta restrita ao próprio usuário (#174, PR #175; correção #176).
- Limite de upload de 5 MB com resposta 413 (#178, PR #179).
- Imagens padrão, troca e leitura de imagens (#170, PR #171; #172, PR #177).

## Ambiente de teste

- Site: <https://publicaifsc.onrender.com/>
- API: <https://publicaifsc-api.onrender.com/api/v1>
- Usuário de teste e dados de demonstração: [DEPLOY](../DEPLOY.md).
- Execução local com Docker Compose: interface `http://localhost:5173`, API `http://localhost:8080/api/v1`.

## Roteiro da demonstração

1. Abrir o site e a galeria; filtrar por um tema e abrir o detalhe de um projeto.
2. Entrar com o usuário de teste do [DEPLOY](../DEPLOY.md).
3. Publicar um projeto com imagem e conferir a imagem no detalhe.
4. Na galeria, apagar o projeto publicado; o botão aparece só para o autor.
5. Sair e mostrar que a submissão exige login.


## Limitações conhecidas

- Busca por texto não disponível.
- O backend não valida o tipo do arquivo no upload; a interface valida e a leitura entrega só imagens (R06).
- Planos gratuitos: a API dorme após um período sem uso; sem backup automatizado nem monitoramento.

O escopo planejado, entregue, removido e pendente está na
[retrospectiva](../RETROSPECTIVA.md).

## Contribuição individual

| Integrante | Entrega 9 | Evidências |
|---|---|---|
| Bernardo Vieira de Souza | Correções do front-end (exclusão sem suporte, sessão expirada, paginação, validação de imagens, favicon), exclusão do projeto pelo autor, publicação do front-end no Render e revisão de PRs. | PRs #202 a #206, #212 e #213; #191; revisões dos PRs #200 e #209 |
| Marcos Júnior Lemes Ferreira | Documentação final: arquitetura, diagramas, ADRs, padrões de projeto, retrospectiva e README. | #208, PR #209 |
| Juliano Tavares da Silva | Revisão e merge de PRs; testes e qualidade do MVP e testes de aceitação em andamento. | Revisões dos PRs #202, #207 e #213; #201 e #214 |
| Pedro Henrique Bernhardt Valete | Publicação do banco e da API (Atlas e Render), CI em push na `main`, documentação do ambiente, edição de projeto no backend | #189, #199 (PR #200), #190 (PR #207) |
| Gabriel Ferreira de Souza da Silva | Sem registro de PR, commit ou revisão na `entrega-9` até esta revisão. | — |
