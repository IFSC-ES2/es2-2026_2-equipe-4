import { afterEach, describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Login from './Login'

afterEach(() => {
  localStorage.removeItem('token')
  vi.unstubAllGlobals()
})

function simularApiLogin(responderLogin) {
  const fetchApi = vi.fn(async (url) => {
    const caminho = new URL(url).pathname
    if (caminho === '/api/v1/projetos') {
      return { ok: true, json: async () => ({ content: [] }) }
    }
    if (caminho === '/api/v1/auth/login') return responderLogin()
    throw new Error(`Rota inesperada: ${caminho}`)
  })
  vi.stubGlobal('fetch', fetchApi)
  return fetchApi
}

async function preencherLogin(usuario) {
  await usuario.type(screen.getByLabelText(/e-mail/i), 'ana@exemplo.com')
  await usuario.type(screen.getByLabelText(/senha/i), 'senha-segura')
}

describe('Login', () => {
  it('envia as credenciais e guarda o token retornado pela API', async () => {
    const fetchApi = simularApiLogin(vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ token: 'token-valido' }),
    }))

    render(
      <MemoryRouter initialEntries={['/login']}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<h1>Página inicial</h1>} />
        </Routes>
      </MemoryRouter>
    )

    const usuario = userEvent.setup()

    await preencherLogin(usuario)
    await usuario.click(screen.getByRole('button', { name: /entrar/i }))

    expect(screen.getByText('Acesso liberado!')).toBeInTheDocument()
    expect(localStorage.getItem('token')).toBe('token-valido')
    expect(fetchApi).toHaveBeenCalledTimes(2)
    expect(fetchApi).toHaveBeenCalledWith(
      'http://localhost:8080/api/v1/auth/login',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'ana@exemplo.com',
          password: 'senha-segura',
        }),
      },
    )

    expect(await screen.findByRole('heading', { name: 'Página inicial' }, { timeout: 2500 })).toBeInTheDocument()
  })

  it('avisa sobre credenciais inválidas sem guardar token', async () => {
    simularApiLogin(vi.fn().mockResolvedValue({
      ok: false,
      status: 401,
      json: async () => ({ erro: { mensagem: 'Erro ao realizar login. Tente novamente!' } }),
    }))
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    )
    const usuario = userEvent.setup()

    await preencherLogin(usuario)
    await usuario.click(screen.getByRole('button', { name: /entrar/i }))

    expect(await screen.findByText('Credenciais incorretas.')).toBeInTheDocument()
    expect(localStorage.getItem('token')).toBeNull()
    expect(screen.getByRole('button', { name: /entrar/i })).toBeEnabled()
  })

  it('informa falha de conexão e permite uma nova tentativa', async () => {
    const responderLogin = vi.fn().mockRejectedValue(new TypeError('Failed to fetch'))
    simularApiLogin(responderLogin)
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    )
    const usuario = userEvent.setup()

    await preencherLogin(usuario)
    await usuario.click(screen.getByRole('button', { name: /entrar/i }))

    expect(await screen.findByText('Sistema offline temporariamente.')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /entrar/i })).toBeEnabled()
    expect(localStorage.getItem('token')).toBeNull()

    await usuario.click(screen.getByRole('button', { name: /entrar/i }))
    expect(responderLogin).toHaveBeenCalledTimes(2)
    expect(localStorage.getItem('token')).toBeNull()
  })
})
