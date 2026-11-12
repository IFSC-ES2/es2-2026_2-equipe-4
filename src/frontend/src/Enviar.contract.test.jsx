import { afterEach, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Link, MemoryRouter, Route, Routes } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Login from './pages/Login/Login'
import Enviar from './pages/Submissao/Enviar'

vi.mock('./assets/arquivo.png', () => ({ default: 'mock-imagem-arquivo' }))

afterEach(() => {
  localStorage.removeItem('token')
  vi.unstubAllGlobals()
})

it('usa o token do login nas rotas de upload e metadados da API', async () => {
  const fetchApi = vi.fn(async (url) => {
    const caminho = new URL(url).pathname

    if (caminho === '/api/v1/projetos') {
      return {
        ok: true,
        json: async () => ({ content: [] }),
      }
    }
    if (caminho === '/api/v1/auth/login') {
      return { ok: true, json: async () => ({ token: 'token-do-login' }) }
    }
    if (caminho === '/api/v1/projetos/upload') {
      return { ok: true, json: async () => ({ id: 'arquivo-123' }) }
    }
    if (caminho === '/api/v1/projetos/metadados') {
      return { ok: true, json: async () => ({ id: 'projeto-123' }) }
    }
    throw new Error(`Rota inesperada: ${caminho}`)
  })
  vi.stubGlobal('fetch', fetchApi)
  const usuario = userEvent.setup()

  render(
    <MemoryRouter initialEntries={['/login']}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Link to="/submissao">Publicar meu projeto</Link>} />
        <Route path="/submissao" element={<Enviar />} />
      </Routes>
    </MemoryRouter>
  )
  await usuario.type(screen.getByLabelText(/e-mail/i), 'ana@exemplo.com')
  await usuario.type(screen.getByLabelText(/senha/i), 'senha-segura')
  await usuario.click(screen.getByRole('button', { name: /entrar/i }))
  expect(screen.getByText('Acesso liberado!')).toBeInTheDocument()

  const linkSubmissao = await screen.findByRole('link', { name: 'Publicar meu projeto' }, { timeout: 2500 })
  await usuario.click(linkSubmissao)

  await usuario.type(screen.getByLabelText(/nome do projeto/i), 'Projeto de teste')
  await usuario.type(screen.getByLabelText(/resumo/i), 'Resumo de teste')
  await usuario.type(screen.getByLabelText(/tema/i), 'Software')
  await usuario.type(screen.getByLabelText(/autores/i), 'Ana')
  await usuario.type(screen.getByLabelText(/stack tecnológica/i), 'React')
  await usuario.upload(document.getElementById('imagens'),
    new File(['imagem'], 'capa.png', { type: 'image/png' }))
  await usuario.click(screen.getByRole('button', { name: /publicar projeto na vitrine/i }))

  expect(screen.getByText('Projeto publicado com sucesso na vitrine!')).toBeInTheDocument()
  expect(fetchApi.mock.calls.map(([url]) => new URL(url).pathname)).toEqual([
    '/api/v1/projetos',
    '/api/v1/auth/login',
    '/api/v1/projetos/upload',
    '/api/v1/projetos/metadados',
  ])
  expect(fetchApi.mock.calls[2][1].headers.Authorization).toBe('Bearer token-do-login')
  expect(fetchApi.mock.calls[3][1].headers.Authorization).toBe('Bearer token-do-login')
  expect(JSON.parse(fetchApi.mock.calls[3][1].body).imagens).toEqual(['arquivo-123'])
})
