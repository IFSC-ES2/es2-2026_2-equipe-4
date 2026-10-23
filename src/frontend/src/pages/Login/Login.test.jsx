import { afterEach, describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Login from './Login'

afterEach(() => {
  localStorage.removeItem('token')
  vi.unstubAllGlobals()
})

async function preencherLogin(usuario) {
  await usuario.type(screen.getByLabelText(/e-mail/i), 'ana@exemplo.com')
  await usuario.type(screen.getByLabelText(/senha/i), 'senha-segura')
}

describe('Login', () => {
  it('envia as credenciais e guarda o token retornado pela API', async () => {
    const fetchApi = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ token: 'token-valido' }),
    })

    vi.stubGlobal('fetch', fetchApi)
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    )

    const usuario = userEvent.setup()

    await preencherLogin(usuario)
    await usuario.click(screen.getByRole('button', { name: /entrar/i }))

    expect(await screen.findByText('Login realizado com sucesso!')).toBeInTheDocument()
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
  })

  it('avisa sobre credenciais inválidas sem guardar token', async () => {
    const fetchApi = vi.fn().mockResolvedValue({
      ok: false,
      status: 401,
      json: async () => ({ erro: { mensagem: 'Erro ao realizar login. Tente novamente!' } }),
    })
    vi.stubGlobal('fetch', fetchApi)
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    )
    const usuario = userEvent.setup()

    await preencherLogin(usuario)
    await usuario.click(screen.getByRole('button', { name: /entrar/i }))

    expect(await screen.findByText('Esta conta não existe ou a senha está incorreta.')).toBeInTheDocument()
    expect(localStorage.getItem('token')).toBeNull()
    expect(screen.getByRole('button', { name: /entrar/i })).toBeEnabled()
  })

  it('informa falha de conexão e permite uma nova tentativa', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('Failed to fetch')))
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    )
    const usuario = userEvent.setup()

    await preencherLogin(usuario)
    await usuario.click(screen.getByRole('button', { name: /entrar/i }))

    expect(await screen.findByText('Erro de conexão: Sistema fora do ar!')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /entrar/i })).toBeEnabled()
    expect(localStorage.getItem('token')).toBeNull()
  })
})
