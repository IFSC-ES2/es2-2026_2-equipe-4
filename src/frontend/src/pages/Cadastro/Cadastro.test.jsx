import { afterEach, describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Cadastro from './Cadastro'

afterEach(() => {
  vi.unstubAllGlobals()
})

async function preencherCadastro(usuario) {
  await usuario.type(screen.getByLabelText(/nome completo/i), 'Ana Lima')
  await usuario.type(screen.getByLabelText(/e-mail/i), 'ana@exemplo.com')
  await usuario.type(screen.getByLabelText(/senha/i), 'senha-segura')
}

describe('Cadastro', () => {
  it('envia os dados para a rota de criação e aguarda o redirecionamento para login', async () => {
    const fetchApi = vi.fn().mockResolvedValue({ ok: true })

    vi.stubGlobal('fetch', fetchApi)

    render(
      <MemoryRouter initialEntries={['/cadastro']}>
        <Routes>
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/login" element={<h1>Página de login</h1>} />
        </Routes>
      </MemoryRouter>
    )

    const usuario = userEvent.setup()

    await preencherCadastro(usuario)
    await usuario.click(screen.getByRole('button', { name: /registrar/i }))

    expect(screen.getByText('Conta criada! Redirecionando para login...')).toBeInTheDocument()
    expect(fetchApi).toHaveBeenCalledExactlyOnceWith(
      'http://localhost:8080/api/v1/users/createAccount/0.0.1/novousers',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: 'Ana Lima', email: 'ana@exemplo.com', password: 'senha-segura' }),
      },
    )
    expect(screen.getByRole('button', { name: /criando conta/i })).toBeDisabled()
    expect(screen.getByLabelText(/nome completo/i)).toBeDisabled()
    expect(screen.getByLabelText(/e-mail/i)).toBeDisabled()
    expect(screen.getByLabelText(/senha/i)).toBeDisabled()
    expect(screen.queryByRole('heading', { name: 'Página de login' })).not.toBeInTheDocument()

    expect(await screen.findByRole('heading', { name: 'Página de login' }, { timeout: 2500 })).toBeInTheDocument()
  })

  it('avisa quando o e-mail já está cadastrado e preserva os dados', async () => {
    const fetchApi = vi.fn().mockResolvedValue({
      ok: false,
      status: 409,
    })

    vi.stubGlobal('fetch', fetchApi)

    render(
      <MemoryRouter>
        <Cadastro />
      </MemoryRouter>
    )

    const usuario = userEvent.setup()

    await preencherCadastro(usuario)
    await usuario.click(
      screen.getByRole('button', { name: /registrar/i })
    )
    expect(
      await screen.findByText('E-mail já está em uso.')
    ).toBeInTheDocument()

    expect(
      screen.getByLabelText(/e-mail/i)
    ).toHaveValue('ana@exemplo.com')

    expect(
      screen.getByRole('button', { name: /registrar/i })
    ).toBeEnabled()
  })

  it('mostra erro de validação retornado pela API', async () => {
    const fetchApi = vi.fn().mockResolvedValue({
      ok: false,
      status: 400,
    })

    vi.stubGlobal('fetch', fetchApi)

    render(
      <MemoryRouter>
        <Cadastro />
      </MemoryRouter>
    )
    const usuario = userEvent.setup()

    await preencherCadastro(usuario)
    await usuario.click(screen.getByRole('button', { name: /registrar/i }))

    expect(await screen.findByText('Preencha todos os campos corretamente.')).toBeInTheDocument()
    expect(screen.getByLabelText(/nome completo/i)).toHaveValue('Ana Lima')
  })
})
