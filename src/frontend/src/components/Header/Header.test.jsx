import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Header from './Header'
import Enviar from '../../pages/Submissao/Enviar'

beforeEach(() => {
  localStorage.removeItem('token')
})

afterEach(() => {
  localStorage.removeItem('token')
  vi.unstubAllGlobals()
})

function renderizarComCabecalho(caminho = '/login') {
  render(
    <MemoryRouter initialEntries={[caminho]}>
      <Header />
      <Routes>
        <Route path="/login" element={<h1>Página de login</h1>} />
        <Route path="/submissao" element={<Enviar />} />
      </Routes>
    </MemoryRouter>
  )
}

describe('Header e sessão', () => {
  it('mostra os links para entrar e criar conta quando não há token', () => {
    renderizarComCabecalho()

    expect(screen.getByRole('link', { name: 'Entrar' })).toHaveAttribute('href', '/login')
    expect(screen.getByRole('link', { name: 'Criar Conta' })).toHaveAttribute('href', '/cadastro')
    expect(screen.queryByRole('button', { name: 'Sair' })).not.toBeInTheDocument()
  })

  it('encerra a sessão e impede voltar à submissão pelo cabeçalho sem token', async () => {
    localStorage.setItem('token', 'token-teste')
    const fetchApi = vi.fn()
    vi.stubGlobal('fetch', fetchApi)
    const usuario = userEvent.setup()

    renderizarComCabecalho('/submissao')

    expect(screen.getByLabelText(/nome do projeto/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /publicar projeto na vitrine/i })).toBeInTheDocument()

    await usuario.click(screen.getByRole('button', { name: 'Sair' }))

    expect(localStorage.getItem('token')).toBeNull()
    expect(await screen.findByRole('heading', { name: 'Página de login' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Entrar' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Sair' })).not.toBeInTheDocument()

    await usuario.click(screen.getByRole('link', { name: 'Submissão' }))

    expect(await screen.findByRole('heading', { name: 'Página de login' })).toBeInTheDocument()
    expect(screen.queryByLabelText(/nome do projeto/i)).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /publicar projeto na vitrine/i })).not.toBeInTheDocument()
    expect(fetchApi).not.toHaveBeenCalled()
  })
})
