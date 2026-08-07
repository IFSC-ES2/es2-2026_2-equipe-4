# PublicaIFSC

Plataforma web para publicação de artigos acadêmicos com processo de revisão por pares integrado.

## 1. Problema

Grande parte da produção acadêmica de instituições como IFSC, UFSC e SENAI fica restrita a arquivos locais, repositórios institucionais pouco intuitivos ou plataformas pagas. Isso dificulta o acesso de outros pesquisadores e estudantes a esses materiais, reduzindo o impacto e a visibilidade das pesquisas. 

## 2. Área de aplicação

Educação e apoio à aprendizagem (linha temática 1) e comunicação, transparência e acesso à informação (linha temática 6), com foco no ambiente acadêmico e científico.

## 3. Usuários

**Pesquisadores e professores** — submetem e revisam artigos
**Alunos (graduação e pós-graduação)** — publicam trabalhos e acessam conteúdos
**Coordenações de cursos/pesquisa** — acompanham a produção científica da instituição

## 4. Contexto de aplicação

Aplicação inicial no IFSC (Instituto Federal de Santa Catarina), campus São José, com possibilidade de expansão futura para outras instituições parceiras.

## 5. Relevância

A produção científica brasileira cresce a cada ano, mas grande parte dela fica subutilizada por falta de visibilidade e de canais acessíveis de publicação. O PublicaIFSC contribui para:

Democratizar o acesso ao conhecimento acadêmico
Valorizar a produção local de pesquisa
Estimular a colaboração entre instituições
Servir como vitrine para projetos de iniciação científica e extensão

## 6. Escopo do MVP

O MVP foi deliberadamente enxuto: poucas funcionalidades, bem implementadas, deixando espaço para expansão nas próximas sprints.

### O que o MVP fará

Permitir que um aluno/professor submeta um artigo, o artigo ficará em uma listagem pública pesquisável.

### Funcionalidades principais

2. Submissão de artigo com metadados: título, resumo, autores, palavras-chave, área do conhecimento, arquivo PDF
4. Listagem pública de artigos, com busca por área, autor ou palavra-chave
5. Armazenamento seguro dos arquivos PDF

### Fora do escopo (por enquanto)

Controle de acesso básico: somente autor e revisor podem editar/avaliar o artigo
Cadastro e login de usuários, com dois perfis: **aluno** e **professor**
Fluxo de revisão simples: um revisor atribuído por artigo, que emite parecer de aprovação ou rejeição (com comentário)
Múltiplos revisores por artigo / revisão duplo-cega
Comentários, curtidas ou citações entre artigos
Notificações por e-mail
Busca avançada (full-text search, filtros combinados)
Dashboard de estatísticas para coordenação de curso
Expansão para outras instituições (UFSC, SENAI) — fica restrito ao IFSC nesta fase
Histórico de versões / reenvio de artigo após rejeição
Perfis públicos de autor com métricas (h-index, nº de publicações etc.)

> Esses itens ficam mapeados como candidatos para as próximas sprints, evitando que o MVP fique "vazio" de trabalho futuro.

## 7. Equipe

- Marcos | Scrum Master
- Bernardo | Arquiteto de Software 
- Marcos | DevOps/Infra 
- Juliano | Engenheiro de Qualidade 
- Pedro Valete | DBA 
- Gabriel | Front-end Dev 