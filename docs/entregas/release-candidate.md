# Release Candidate v1.0.0-rc.1

Texto-base para a descrição da release candidata. A implantação publicada está
disponível no Render, com persistência no MongoDB Atlas; configuração e acesso
de avaliação estão em [DEPLOY](../DEPLOY.md). A criação e publicação da tag
`v1.0.0-rc.1` não estão comprovadas por este documento.

## Resumo

O PublicaIFSC é uma vitrine de projetos universitários. Visitantes consultam
uma galeria pública; usuários cadastrados podem publicar projetos com título,
resumo, autores, tema, tecnologias, imagens e links. A aplicação contém
cadastro/login com JWT, listagem paginada, detalhes do projeto, imagens padrão,
troca autenticada de imagem e leitura pública das imagens.

## Correções e melhorias registradas

- Configurações sensíveis passaram para variáveis de ambiente (#156, PR #158).
- Autorização de operações sobre contas foi restringida ao próprio usuário
  (#174, PR #175; correção #176).
- Limite de upload de imagem de 5 MB e resposta HTTP 413 acima do limite
  (#178, PR #179).
- Imagens padrão, rota de troca e leitura de imagens (#170, PR #171; #172,
  PR #177).
- Galeria, página Sobre e detalhe de projeto foram ampliados (#181, PR #182;
  #172, PR #177).
- Foram registrados 92 testes aprovados e cobertura consolidada de 84,63% na
  coleta da Sprint 4 ([M-03](../metricas/M-03.md)); o PR #183 registrou oito
  checks aprovados ([sprint-4.md](../sprints/sprint-4.md)).

## Ambiente de teste

O ambiente publicado e as credenciais de avaliação estão descritos em
[DEPLOY.md](../DEPLOY.md). A execução local também pode ser reproduzida com
Docker Compose: interface `http://localhost:5173`, API
`http://localhost:8080/api/v1`.

## Limitações conhecidas

- Busca textual não disponível; a galeria apresenta até 100 projetos.
- Exclusão de projeto pela galeria/API não foi localizada.
- Sem staging, monitoramento ou backup automatizado; consulte as limitações do
  [ambiente publicado](../DEPLOY.md).
- Upload não valida o tipo real do arquivo; limite de 5 MB.
- A senha `admin123` permanece no histórico Git e em dois valores padrão de
  testes de integração; consulte R08 em [riscos](../riscos.md).
- Algumas checks de CI não são obrigatórias para merge; consulte R14.

O escopo entregue e as funcionalidades removidas ou pendentes estão em
[retrospectiva](../RETROSPECTIVA.md).
