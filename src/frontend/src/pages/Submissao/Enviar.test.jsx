import { afterEach, describe, expect, it, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Enviar from './Enviar'

vi.mock('../../assets/arquivo.png', () => ({ default: 'mock-imagem-arquivo' }))

afterEach(() => {
  localStorage.removeItem('token')
  vi.unstubAllGlobals()
})

async function preencherFormulario(usuario) {
  await usuario.type(screen.getByLabelText(/título/i), 'Projeto Teste')
  await usuario.type(screen.getByLabelText(/resumo/i), 'Resumo do projeto')
  await usuario.type(screen.getByLabelText(/tema/i), 'Web')
  await usuario.type(screen.getByLabelText(/autores/i), 'Ana Lima, Bruno Reis')
  await usuario.type(screen.getByLabelText(/tecnologias/i), 'React, Spring Boot')
}

describe('Submissão de projeto', () => {
  it('mostra os campos obrigatórios e não envia o formulário vazio', async () => {
    const fetchApi = vi.fn()
    vi.stubGlobal('fetch', fetchApi)
    render(<Enviar />)

    await userEvent.setup().click(screen.getByRole('button', { name: /enviar projeto/i }))

    expect(screen.getByText('Informe o título.')).toBeInTheDocument()
    expect(screen.getByText('Informe o resumo.')).toBeInTheDocument()
    expect(screen.getByText('Informe o tema do projeto.')).toBeInTheDocument()
    expect(screen.getByText('Informe ao menos um autor (separado por vírgula).')).toBeInTheDocument()
    expect(screen.getByText('Informe ao menos uma tecnologia (separada por vírgula).')).toBeInTheDocument()
    expect(fetchApi).not.toHaveBeenCalled()
  })

  it('rejeita listas de autores e tecnologias sem nenhum nome', async () => {
    const fetchApi = vi.fn()
    vi.stubGlobal('fetch', fetchApi)
    render(<Enviar />)
    const usuario = userEvent.setup()

    await preencherFormulario(usuario)
    await usuario.clear(screen.getByLabelText(/autores/i))
    await usuario.type(screen.getByLabelText(/autores/i), ' , , ')
    await usuario.clear(screen.getByLabelText(/tecnologias/i))
    await usuario.type(screen.getByLabelText(/tecnologias/i), ' , , ')
    await usuario.click(screen.getByRole('button', { name: /enviar projeto/i }))

    expect(screen.getByText('Informe ao menos um autor (separado por vírgula).')).toBeInTheDocument()
    expect(screen.getByText('Informe ao menos uma tecnologia (separada por vírgula).')).toBeInTheDocument()
    expect(fetchApi).not.toHaveBeenCalled()
  })

  it('exige login antes de chamar a API', async () => {
    const fetchApi = vi.fn()
    vi.stubGlobal('fetch', fetchApi)
    render(<Enviar />)
    const usuario = userEvent.setup()

    await preencherFormulario(usuario)
    await usuario.click(screen.getByRole('button', { name: /enviar projeto/i }))

    expect(screen.getByText('Erro: Você precisa estar logado para enviar um projeto.')).toBeInTheDocument()
    expect(fetchApi).not.toHaveBeenCalled()
  })

  it('envia a imagem e os metadados com o token e limpa o formulário após sucesso', async () => {
    localStorage.setItem('token', 'token-teste')
    const fetchApi = vi.fn()
      .mockResolvedValueOnce({ ok: true, json: async () => ({ id: 'id-img-123' }) })
      .mockResolvedValueOnce({ ok: true, json: async () => ({ id: 'id-projeto-123' }) })
    vi.stubGlobal('fetch', fetchApi)
    render(<Enviar />)
    const usuario = userEvent.setup()
    const imagem = new File(['imagem'], 'capa.png', { type: 'image/png' })

    await preencherFormulario(usuario)
    await usuario.type(screen.getByLabelText(/link do repositório/i), 'https://github.com/exemplo/projeto')
    await usuario.type(screen.getByLabelText(/link de demonstração/i), 'https://exemplo.com')
    await usuario.upload(document.getElementById('imagens'), imagem)
    await usuario.click(screen.getByRole('button', { name: /enviar projeto/i }))

    expect(await screen.findByText('Sucesso! Projeto submetido e persistido no banco.')).toBeInTheDocument()
    expect(fetchApi).toHaveBeenCalledTimes(2)
    const [urlUpload, opcoesUpload] = fetchApi.mock.calls[0]
    expect(urlUpload).toBe('http://localhost:8080/api/v1/projetos/upload')
    expect(opcoesUpload.method).toBe('POST')
    expect(opcoesUpload.headers.Authorization).toBe('Bearer token-teste')
    expect(opcoesUpload.headers).not.toHaveProperty('Content-Type')
    expect(opcoesUpload.body).toBeInstanceOf(FormData)
    expect(opcoesUpload.body.get('arquivo')).toEqual(imagem)

    const [urlMetadados, opcoesMetadados] = fetchApi.mock.calls[1]
    expect(urlMetadados).toBe('http://localhost:8080/api/v1/projetos/metadados')
    expect(opcoesMetadados.method).toBe('POST')
    expect(opcoesMetadados.headers).toEqual({
      'Content-Type': 'application/json',
      Authorization: 'Bearer token-teste',
    })
    expect(JSON.parse(opcoesMetadados.body)).toEqual({
      titulo: 'Projeto Teste',
      resumo: 'Resumo do projeto',
      tema: 'Web',
      autores: ['Ana Lima', 'Bruno Reis'],
      tecnologias: ['React', 'Spring Boot'],
      imagens: ['id-img-123'],
      linkRepositorio: 'https://github.com/exemplo/projeto',
      linkDemonstracao: 'https://exemplo.com',
    })
    expect(screen.getByLabelText(/título/i)).toHaveValue('')
    expect(screen.queryByText(/imagem\(ns\) selecionada\(s\)/i)).not.toBeInTheDocument()
  })

  it('interrompe a submissão quando o upload falha', async () => {
    localStorage.setItem('token', 'token-teste')
    const fetchApi = vi.fn().mockResolvedValue({
      ok: false,
      status: 400,
      json: async () => ({ erro: { mensagem: 'Imagem inválida' } }),
    })
    vi.stubGlobal('fetch', fetchApi)
    render(<Enviar />)
    const usuario = userEvent.setup()

    await preencherFormulario(usuario)
    await usuario.upload(document.getElementById('imagens'), new File(['imagem'], 'capa.png', { type: 'image/png' }))
    await usuario.click(screen.getByRole('button', { name: /enviar projeto/i }))

    expect(await screen.findByText('Atenção: Imagem inválida')).toBeInTheDocument()
    expect(fetchApi).toHaveBeenCalledTimes(1)
    expect(screen.getByLabelText(/título/i)).toHaveValue('Projeto Teste')
    expect(screen.getByRole('button', { name: /enviar projeto/i })).toBeEnabled()
  })

  it('mostra o erro da API quando os metadados não são salvos', async () => {
    localStorage.setItem('token', 'token-teste')
    const fetchApi = vi.fn().mockResolvedValue({
      ok: false,
      status: 400,
      json: async () => ({ erro: 'Dados inválidos' }),
    })
    vi.stubGlobal('fetch', fetchApi)
    render(<Enviar />)
    const usuario = userEvent.setup()

    await preencherFormulario(usuario)
    await usuario.click(screen.getByRole('button', { name: /enviar projeto/i }))

    expect(await screen.findByText('Atenção: Dados inválidos')).toBeInTheDocument()
    expect(fetchApi).toHaveBeenCalledTimes(1)
    expect(fetchApi.mock.calls[0][0]).toBe('http://localhost:8080/api/v1/projetos/metadados')
    expect(screen.getByLabelText(/título/i)).toHaveValue('Projeto Teste')
    expect(screen.getByRole('button', { name: /enviar projeto/i })).toBeEnabled()
  })

  it('informa a falha de conexão e permite tentar novamente', async () => {
    localStorage.setItem('token', 'token-teste')
    const fetchApi = vi.fn().mockRejectedValue(new TypeError('Failed to fetch'))
    vi.stubGlobal('fetch', fetchApi)
    render(<Enviar />)
    const usuario = userEvent.setup()

    await preencherFormulario(usuario)
    await usuario.click(screen.getByRole('button', { name: /enviar projeto/i }))

    expect(await screen.findByText('Erro de conexão: A API parece estar fora do ar ou o endpoint não existe.')).toBeInTheDocument()
    await waitFor(() => expect(screen.getByRole('button', { name: /enviar projeto/i })).toBeEnabled())
  })
})
