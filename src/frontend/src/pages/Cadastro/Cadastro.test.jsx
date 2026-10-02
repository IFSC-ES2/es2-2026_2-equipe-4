import { afterEach, describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
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
  it('envia os dados para a rota de criação e limpa os campos após sucesso', async () => {
    const fetchApi = vi.fn().mockResolvedValue({ ok: true })
    vi.stubGlobal('fetch', fetchApi)
    render(<Cadastro />)
    const usuario = userEvent.setup()

    await preencherCadastro(usuario)
    await usuario.click(screen.getByRole('button', { name: /criar conta/i }))

    expect(await screen.findByText('Usuário criado com sucesso! Você já pode fazer login.')).toBeInTheDocument()
    expect(fetchApi).toHaveBeenCalledExactlyOnceWith(
      'http://localhost:8080/api/v1/users/createAccount/0.0.1/novousers',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: 'Ana Lima', email: 'ana@exemplo.com', password: 'senha-segura' }),
      },
    )
    expect(screen.getByLabelText(/nome completo/i)).toHaveValue('')
    expect(screen.getByLabelText(/e-mail/i)).toHaveValue('')
    expect(screen.getByLabelText(/senha/i)).toHaveValue('')
  })

  it('avisa quando o e-mail já está cadastrado e preserva os dados', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 409 }))
    render(<Cadastro />)
    const usuario = userEvent.setup()

    await preencherCadastro(usuario)
    await usuario.click(screen.getByRole('button', { name: /criar conta/i }))

    expect(await screen.findByText('Este e-mail já está cadastrado no sistema.')).toBeInTheDocument()
    expect(screen.getByLabelText(/e-mail/i)).toHaveValue('ana@exemplo.com')
    expect(screen.getByRole('button', { name: /criar conta/i })).toBeEnabled()
  })

  it('mostra erro de validação retornado pela API', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 400 }))
    render(<Cadastro />)
    const usuario = userEvent.setup()

    await preencherCadastro(usuario)
    await usuario.click(screen.getByRole('button', { name: /criar conta/i }))

    expect(await screen.findByText('Campos inválidos. Verifique as informações preenchidas.')).toBeInTheDocument()
    expect(screen.getByLabelText(/nome completo/i)).toHaveValue('Ana Lima')
  })
})
