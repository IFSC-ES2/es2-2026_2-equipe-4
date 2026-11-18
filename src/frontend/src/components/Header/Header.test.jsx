import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { act, render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Header from './Header'
import Enviar from '../../pages/Submissao/Enviar'
import ProvedorSessao from '../../sessao/ProvedorSessao'
import { criarTokenTeste } from '../../sessao/tokenTeste'

beforeEach(() => {
  localStorage.removeItem('token')
})

afterEach(() => {
  localStorage.removeItem('token')
  vi.unstubAllGlobals()
  vi.useRealTimers()
})

function renderizarComCabecalho(caminho = '/login') {
  render(
    <ProvedorSessao>
      <MemoryRouter initialEntries={[caminho]}>
        <Header />
        <Routes>
          <Route path="/login" element={<h1>Página de login</h1>} />
          <Route path="/submissao" element={<Enviar />} />
        </Routes>
      </MemoryRouter>
    </ProvedorSessao>
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
    localStorage.setItem('token', criarTokenTeste())
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

  it('ignora e remove o token que já expirou ao abrir a aplicação', () => {
    localStorage.setItem('token', criarTokenTeste(Math.floor(Date.now() / 1000)))

    renderizarComCabecalho()

    expect(localStorage.getItem('token')).toBeNull()
    expect(screen.getByRole('link', { name: 'Entrar' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Criar Conta' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Sair' })).not.toBeInTheDocument()
  })

  it('atualiza o cabeçalho quando a sessão expira com a página aberta', () => {
    vi.useFakeTimers()
    const exp = Math.floor(Date.now() / 1000) + 2
    localStorage.setItem('token', criarTokenTeste(exp))
    renderizarComCabecalho()

    expect(screen.getByRole('button', { name: 'Sair' })).toBeInTheDocument()
    act(() => vi.advanceTimersByTime(2000))

    expect(localStorage.getItem('token')).toBeNull()
    expect(screen.getByRole('link', { name: 'Entrar' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Criar Conta' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Sair' })).not.toBeInTheDocument()
  })
})
