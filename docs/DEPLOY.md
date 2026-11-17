# Configuração de ambiente e deploy

## Ambiente de execução no Render

- Frontend (Render Static Site) em <https://publicaifsc.onrender.com/>.
- API (Render Web Service) em <https://publicaifsc-api.onrender.com/api/v1>.
- Banco de dados no MongoDB Atlas, acessado pela API.

### Configurar o Static Site

1. No [painel do Render](https://dashboard.render.com/), selecione **New → Static Site**
   e conecte o repositório `IFSC-ES2/es2-2026_2-equipe-4`. Para atualizar a
   configuração existente, abra o serviço **publicaifsc**.
2. Preencha os campos de **Build & Deploy**.

   | Campo | Valor |
   |---|---|
   | Branch | `main` |
   | Root Directory | `src/frontend` |
   | Build Command | `npm ci && npm run build` |
   | Publish Directory | `dist` |

3. Em **Environment Variables**, configure as variáveis do build.

   | Variável | Valor |
   |---|---|
   | `NODE_VERSION` | `24` |
   | `VITE_API_BASE_URL` | `https://publicaifsc-api.onrender.com` |

   O frontend acrescenta `/api/v1` ao montar as requisições. Informe apenas
   a origem HTTPS da API em `VITE_API_BASE_URL`. O Vite incorpora esse valor
   ao JavaScript publicado, por isso ele deve conter somente informação pública.
4. Crie o site ou salve as alterações e acompanhe o build na aba **Deploys**.
   Com **Auto-Deploy** habilitado, mudanças em `src/frontend` na `main`
   disparam um novo deploy. Ao alterar `VITE_API_BASE_URL`, faça um novo build
   pelo painel para aplicar o valor ao site publicado.


### Configurar o acesso direto às rotas

No serviço **publicaifsc**, vá a **Redirects/Rewrites → Add Rule**, configure
os campos abaixo e salve em **Save Changes**.

| Campo | Valor |
|---|---|
| Source | `/*` |
| Destination | `/index.html` |
| Action | **Rewrite** |

Com essa regra, o Render entrega `index.html` mantendo a URL solicitada.
O React Router resolve caminhos como `/projetos`, `/projetos/<id>` e `/login`
ao abrir um link direto ou recarregar a página.

### Validar o deploy

1. Abra a [página inicial](https://publicaifsc.onrender.com/) e a
   [galeria](https://publicaifsc.onrender.com/projetos). Confirme que a lista
   carrega e abra o detalhe de um projeto existente.
2. Copie a URL do detalhe, abra em outra aba e recarregue a página.
   Repita o acesso direto em `/login` e `/cadastro` para verificar a regra.
3. Nas ferramentas do navegador, confira se a requisição para
   `/api/v1/projetos` vai para a API publicada e retorna HTTP 200, sem erro de
   CORS. O [endpoint público da listagem](https://publicaifsc-api.onrender.com/api/v1/projetos?size=1)
   também pode ser consultado diretamente.
4. Para validar o fluxo autenticado, use uma conta de teste e confira o
   cadastro, o login, a submissão com imagem e a exibição da imagem no detalhe.

## Ambiente local com Docker Compose

As instruções a seguir se aplicam ao desenvolvimento e aos testes locais.

## Pré-requisitos

- Docker Engine ou Docker Desktop com o comando `docker compose` disponível.
- Portas locais `27017`, `8080` e `5173` livres (ou portas substituídas no
  `.env`).
- Para executar sem containers: JDK 25, Node.js 24 e um MongoDB acessível.

## Variáveis de ambiente

O Compose carrega automaticamente o arquivo `.env` localizado na raiz do
repositório. O arquivo `.env.example` é um modelo seguro para copiar e adaptar;
`.env` e arquivos `.env.*` são ignorados pelo Git. 

| Variável | Uso | Padrão local/modelo |
|---|---|---|
| `MONGO_ROOT_USERNAME` | Usuário administrativo inicial do MongoDB e parte da URI da API. | `publicaifsc_local` |
| `MONGO_ROOT_PASSWORD` | Senha administrativa do MongoDB. | Mantenha caracteres alfanuméricos e `_` para evitar codificação de URI. |
| `MONGO_DATABASE` | Banco usado pela aplicação. | `publicaifsc` |
| `MONGO_PORT` | Porta do host publicada pelo container. | `27017` |
| `JWT_SECRET` | Segredo de assinatura JWT HS256; mínimo de 32 bytes. | Gerar um valor aleatório, por exemplo `openssl rand -base64 32`. |
| `JWT_EXPIRATION_MS` | Validade do token em milissegundos. | `3600000` (1 hora) |
| `APP_SEED_PROJETOS_ENABLED` | Habilita a carga de projetos fictícios quando o banco está vazio. | `false` |
| `BACKEND_PORT` | Porta publicada para a API no host. | `8080` |
| `FRONTEND_PORT` | Porta publicada para a interface no host. | `5173` |
| `VITE_API_BASE_URL` | Endereço base da API acessado pelo navegador. É embutido no build do frontend. | `http://localhost:8080` |

`SPRING_MONGODB_URI` é montada pelo Compose com o usuário, senha e banco acima,
usando `mongodb` como hostname dentro da rede do Compose. Para executar a API
diretamente na máquina, defina `SPRING_MONGODB_URI` apontando ao MongoDB
acessível pelo host. `VITE_API_BASE_URL` é configuração pública do frontend:
nunca coloque segredos nela. Para um navegador em outra máquina, use o endereço
alcançável dessa máquina/ambiente, não `localhost`.

## Primeiro uso e execução em containers

Na raiz do repositório, copie o modelo e edite `.env`. No PowerShell:

```powershell
Copy-Item .env.example .env
```

Ou no bash

```bash
cp .env.example .env
```


Gere um `JWT_SECRET` aleatório com pelo menos 32 bytes. Se tiver OpenSSL:
**Opcional**

```powershell
openssl rand -base64 32
```

Cole o resultado em `JWT_SECRET` no `.env`; escolha também uma senha diferente
para `MONGO_ROOT_PASSWORD`. Para iniciar/buildar os três serviços:
**Opcional**

```powershell
docker compose up -d --build
```

Acesse a interface em `http://localhost:5173` e a API em
`http://localhost:8080/api/v1`. Para acompanhar o estado e logs:

```powershell
docker compose ps
docker compose logs -f backend
docker compose logs -f frontend
docker compose logs -f mongodb
```

Após alterar código ou variáveis `VITE_*`, reconstrua os containers; variáveis
Vite são aplicadas durante o build:

```powershell
docker compose up -d --build
```

Para parar sem apagar os dados:

```powershell
docker compose down
```

O volume nomeado `mongodb_data` conserva os dados quando containers são
recriados. `docker compose down -v` remove o volume e apaga os dados; use apenas
quando quiser reiniciar o banco do zero. O usuário e senha inicial do MongoDB
são aplicados apenas quando o volume é criado pela primeira vez. Alterar as
variáveis no `.env` não altera credenciais já persistidas nesse volume.

## Execução sem container para API e frontend

É possível manter somente o MongoDB no Compose e iniciar API e frontend no host.
O `.env` do Compose não é carregado automaticamente pelo Spring Boot ou Vite ao
executar seus comandos diretamente. No Linux (bash/zsh), configure as variáveis
em cada sessão antes de iniciar os processos:

```bash
docker compose up -d mongodb
export SPRING_MONGODB_URI="mongodb://publicaifsc_local:senha_muito_forte@localhost:27017/publicaifsc?authSource=admin"
export JWT_SECRET="use_aqui_o_mesmo_segredo_aleatorio_do_arquivo_env"
export JWT_EXPIRATION_MS="3600000"
```

Em um terminal, inicie a API:

```bash
cd src/backend/projetos
./gradlew bootRun
```

Em outro terminal, a partir da raiz, defina a URL pública da API e rode a
interface:

```bash
export VITE_API_BASE_URL="http://localhost:8080"
cd src/frontend
npm ci
npm run dev
```

## Validação rápida

1. `docker compose ps` deve mostrar os três serviços em execução; o MongoDB
   deve ficar `healthy` antes de a API iniciar.
2. Abra `http://localhost:5173` e confirme que a página carrega.
3. Consulte `http://localhost:8080/api/v1/projetos?size=10` e confirme uma
   resposta JSON. Com seed desativado e banco vazio, a lista pode estar vazia.
4. Faça cadastro/login e, se necessário, habilite o seed apenas para uma
   demonstração local mudando `APP_SEED_PROJETOS_ENABLED=true` e reconstruindo
   o backend.

## Limitações e segurança

- Esta configuração destina-se a desenvolvimento local e testes rápidos.
- O `.env` local contém credenciais de conveniência para este workspace e está
  ignorado pelo Git, sendo as informações contida em `.env.example` 
- URLs da API são compiladas no bundle do frontend; alterar `VITE_API_BASE_URL`
  exige rebuild do frontend.
- A carga inicial de dados de demonstração é opcional e cria dados fictícios;
  mantenha-a desligada fora de testes/demonstrações.
