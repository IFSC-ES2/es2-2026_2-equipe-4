# Front-end do PublicaIFSC

Interface em React e Vite para cadastro, login, publicação e consulta pública
de projetos universitários.

## Executar

Requisitos: Node.js 24 e API disponível em `http://localhost:8080/api/v1`.
Na raiz do repositório:

```bash
cd src/frontend
npm ci
npm run dev
```

Acesse <http://localhost:5173>. A galeria fica em `/projetos`.

## Testes

Na pasta `src/frontend`:

```bash
npm test -- --run
```

## Build

```bash
npm run build
npm run preview -- --port 5173
```

Consulte o [README principal](../../README.md) para subir a API e o banco,
ver as limitações e acessar a documentação.
