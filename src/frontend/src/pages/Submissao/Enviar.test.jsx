import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { describe, it, expect, vi } from 'vitest'
import Enviar from './Enviar'

vi.mock('../../assets/arquivo.png', () => ({ default: 'mock-imagem-arquivo' }))

describe('Componente Enviar (Projetos)', () => {
  it('Deve exibir mensagens de erro ao tentar enviar o formulário vazio', async () => {
    render(<Enviar />)
    const user = userEvent.setup()

    const botaoEnviar = screen.getByRole('button', { name: /enviar projeto/i })
    await user.click(botaoEnviar)

    expect(screen.getByText('Informe o título.')).toBeInTheDocument()
    expect(screen.getByText('Informe o resumo.')).toBeInTheDocument()
    expect(screen.getByText('Informe o tema do projeto.')).toBeInTheDocument()
    expect(screen.getByText('Informe ao menos um autor (separado por vírgula).')).toBeInTheDocument()
    expect(screen.getByText('Informe ao menos uma tecnologia (separada por vírgula).')).toBeInTheDocument()
  })

  it('Deve preencher o formulário com sucesso, enviar e exibir mensagem de confirmação', async () => {
    // Simula um token no localStorage para passar pela validação de usuário logado
    localStorage.setItem('token', 'token-jwt-falso');

    global.fetch = vi.fn().mockImplementation((url) => {
      if (url.includes('/projetos/upload')) {
        return Promise.resolve({ ok: true, json: () => Promise.resolve({ id: 'id-img-123' }) })
      }
      if (url.includes('/projetos/metadados')) {
        return Promise.resolve({ ok: true, json: () => Promise.resolve({}) })
      }
    })

    render(<Enviar />)
    const user = userEvent.setup()

    await user.type(screen.getByLabelText(/título/i), 'Projeto Teste')
    await user.type(screen.getByLabelText(/resumo/i), 'Resumo do projeto')
    await user.type(screen.getByLabelText(/tema/i), 'Web')
    await user.type(screen.getByLabelText(/autores/i), 'Ana Lima, Bruno Reis')
    await user.type(screen.getByLabelText(/tecnologias/i), 'React, Spring Boot')

    const botaoEnviar = screen.getByRole('button', { name: /enviar projeto/i })
    await user.click(botaoEnviar)

    expect(await screen.findByText('Sucesso! Projeto submetido e persistido no banco.')).toBeInTheDocument()

    localStorage.removeItem('token');
    global.fetch.mockClear()
  })
})