import { afterEach, expect, it, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Enviar from './Enviar'

vi.mock('./assets/arquivo.png', () => ({ default: 'mock-imagem-arquivo' }))

afterEach(() => {
  vi.unstubAllGlobals()
})

// O front-end ainda usa /arquivos; a API atual recebe submissões em /projetos.
// Quando o formulário for adaptado, este teste passará inesperadamente e o
// marcador .fails deverá ser removido.
it.fails('usa as rotas de projetos oferecidas pela API', async () => {
  const fetchApi = vi.fn(async (url) => {
    const caminho = new URL(url).pathname

    if (caminho === '/api/v1/projetos/upload') {
      return { ok: true, json: async () => ({ id: 'arquivo-123' }) }
    }
    if (caminho === '/api/v1/projetos/metadados') {
      return { ok: true, json: async () => ({ id: 'projeto-123' }) }
    }
    return { ok: false, status: 404, json: async () => ({ erro: 'Rota não encontrada' }) }
  })
  vi.stubGlobal('fetch', fetchApi)

  render(<Enviar />)
  const usuario = userEvent.setup()
  await usuario.type(screen.getByLabelText(/título/i), 'Projeto de teste')
  await usuario.type(screen.getByLabelText(/resumo/i), 'Resumo de teste')
  await usuario.type(screen.getByLabelText(/autores/i), 'Juliano')
  await usuario.type(screen.getByLabelText(/palavras-chave/i), 'Testes')
  await usuario.type(screen.getByLabelText(/área do conhecimento/i), 'Software')
  await usuario.upload(document.getElementById('arquivo'),
    new File(['pdf'], 'projeto.pdf', { type: 'application/pdf' }))
  await usuario.click(screen.getByRole('button', { name: /enviar artigo/i }))

  await waitFor(() => expect(fetchApi).toHaveBeenCalled())
  expect(fetchApi.mock.calls[0][0]).toBe('http://localhost:8080/api/v1/projetos/upload')

  await waitFor(() => expect(fetchApi).toHaveBeenCalledTimes(2))
  expect(fetchApi.mock.calls[1][0]).toBe('http://localhost:8080/api/v1/projetos/metadados')
})
