import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Enviar from './Enviar'

vi.mock('../../assets/arquivo.png', () => ({ default: 'mock-imagem-arquivo' }))

beforeEach(() => {
  localStorage.setItem('token', 'token-teste')
})

afterEach(() => {
  localStorage.removeItem('token')
  vi.unstubAllGlobals()
})

function renderizarEnviar() {
  render(
    <MemoryRouter initialEntries={['/submissao']}>
      <Routes>
        <Route path="/submissao" element={<Enviar />} />
        <Route path="/login" element={<h1>Página de login</h1>} />
      </Routes>
    </MemoryRouter>
  )
}

async function preencherFormulario(usuario) {
  await usuario.type(screen.getByLabelText(/nome do projeto/i), 'Projeto Teste')
  await usuario.type(screen.getByLabelText(/resumo/i), 'Resumo do projeto')
  await usuario.type(screen.getByLabelText(/tema/i), 'Web')
  await usuario.type(screen.getByLabelText(/autores/i), 'Ana Lima, Bruno Reis')
  await usuario.type(screen.getByLabelText(/stack tecnológica/i), 'React, Spring Boot')
}

describe('Submissão de projeto', () => {
  it('mostra os campos obrigatórios e não envia o formulário vazio', async () => {
    const fetchApi = vi.fn()
    vi.stubGlobal('fetch', fetchApi)
    renderizarEnviar()

    await userEvent.setup().click(screen.getByRole('button', { name: /publicar projeto na vitrine/i }))

    expect(screen.getByText('Informe o título.')).toBeInTheDocument()
    expect(screen.getByText('Informe o resumo.')).toBeInTheDocument()
    expect(screen.getByText('Informe o tema do projeto.')).toBeInTheDocument()
    expect(screen.getByText('Informe ao menos um autor.')).toBeInTheDocument()
    expect(screen.getByText('Informe ao menos uma tecnologia.')).toBeInTheDocument()
    expect(fetchApi).not.toHaveBeenCalled()
  })

  it('rejeita listas de autores e tecnologias sem nenhum nome', async () => {
    const fetchApi = vi.fn()
    vi.stubGlobal('fetch', fetchApi)
    renderizarEnviar()
    const usuario = userEvent.setup()

    await preencherFormulario(usuario)
    await usuario.clear(screen.getByLabelText(/autores/i))
    await usuario.type(screen.getByLabelText(/autores/i), ' , , ')
    await usuario.clear(screen.getByLabelText(/stack tecnológica/i))
    await usuario.type(screen.getByLabelText(/stack tecnológica/i), ' , , ')
    await usuario.click(screen.getByRole('button', { name: /publicar projeto na vitrine/i }))

    expect(screen.getByText('Informe ao menos um autor.')).toBeInTheDocument()
    expect(screen.getByText('Informe ao menos uma tecnologia.')).toBeInTheDocument()
    expect(fetchApi).not.toHaveBeenCalled()
  })

  it('redireciona para o login sem chamar a API quando não há token', async () => {
    localStorage.removeItem('token')
    const fetchApi = vi.fn()
    vi.stubGlobal('fetch', fetchApi)
    renderizarEnviar()

    expect(await screen.findByRole('heading', { name: 'Página de login' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /publicar projeto na vitrine/i })).not.toBeInTheDocument()
    expect(fetchApi).not.toHaveBeenCalled()
  })

  it('envia a imagem e os metadados com o token e limpa o formulário após sucesso', async () => {
    const fetchApi = vi.fn()
      .mockResolvedValueOnce({ ok: true, json: async () => ({ id: 'id-img-123' }) })
      .mockResolvedValueOnce({ ok: true, json: async () => ({ id: 'id-projeto-123' }) })
    vi.stubGlobal('fetch', fetchApi)
    renderizarEnviar()
    const usuario = userEvent.setup()
    const imagem = new File(['imagem'], 'capa.png', { type: 'image/png' })

    await preencherFormulario(usuario)
    await usuario.type(screen.getByLabelText(/repositório de código/i), 'https://github.com/exemplo/projeto')
    await usuario.type(screen.getByLabelText(/url de demonstração/i), 'https://exemplo.com')
    await usuario.upload(document.getElementById('imagens'), imagem)
    expect(screen.getByText(/1 arquivo\(s\) anexado\(s\)/i)).toBeInTheDocument()
    await usuario.click(screen.getByRole('button', { name: /publicar projeto na vitrine/i }))

    expect(await screen.findByText('Projeto publicado com sucesso na vitrine!')).toBeInTheDocument()
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
    expect(screen.getByLabelText(/nome do projeto/i)).toHaveValue('')
    expect(screen.queryByText(/arquivo\(s\) anexado\(s\)/i)).not.toBeInTheDocument()
  })

  it('envia duas imagens e publica os metadados com os dois IDs retornados', async () => {
    const fetchApi = vi.fn()
      .mockResolvedValueOnce({ ok: true, json: async () => ({ id: 'id-primeira-imagem' }) })
      .mockResolvedValueOnce({ ok: true, json: async () => ({ id: 'id-segunda-imagem' }) })
      .mockResolvedValueOnce({ ok: true, json: async () => ({ id: 'id-projeto-123' }) })
    vi.stubGlobal('fetch', fetchApi)
    renderizarEnviar()
    const usuario = userEvent.setup()
    const primeiraImagem = new File(['capa do projeto'], 'capa.png', { type: 'image/png' })
    const segundaImagem = new File(['tela do projeto'], 'tela.jpg', { type: 'image/jpeg' })

    await preencherFormulario(usuario)
    await usuario.upload(document.getElementById('imagens'), [primeiraImagem, segundaImagem])
    await usuario.click(screen.getByRole('button', { name: /publicar projeto na vitrine/i }))

    expect(await screen.findByText('Projeto publicado com sucesso na vitrine!')).toBeInTheDocument()
    // Os metadados só são enviados depois dos dois uploads.
    expect(fetchApi.mock.calls.map(([url]) => url)).toEqual([
      'http://localhost:8080/api/v1/projetos/upload',
      'http://localhost:8080/api/v1/projetos/upload',
      'http://localhost:8080/api/v1/projetos/metadados',
    ])
    expect(fetchApi.mock.calls[0][1].body.get('arquivo')).toBe(primeiraImagem)
    expect(fetchApi.mock.calls[1][1].body.get('arquivo')).toBe(segundaImagem)
    const metadados = JSON.parse(fetchApi.mock.calls[2][1].body)
    expect(metadados.imagens).toEqual(['id-primeira-imagem', 'id-segunda-imagem'])
  })

  it('não publica os metadados e preserva o formulário quando o segundo upload falha', async () => {
    const fetchApi = vi.fn()
      .mockResolvedValueOnce({ ok: true, json: async () => ({ id: 'id-primeira-imagem' }) })
      .mockResolvedValueOnce({
        ok: false,
        status: 400,
        json: async () => ({ erro: { mensagem: 'Segunda imagem inválida' } }),
      })
    vi.stubGlobal('fetch', fetchApi)
    renderizarEnviar()
    const usuario = userEvent.setup()
    const primeiraImagem = new File(['capa do projeto'], 'capa.png', { type: 'image/png' })
    const segundaImagem = new File(['tela do projeto'], 'tela.jpg', { type: 'image/jpeg' })

    await preencherFormulario(usuario)
    await usuario.upload(document.getElementById('imagens'), [primeiraImagem, segundaImagem])
    await usuario.click(screen.getByRole('button', { name: /publicar projeto na vitrine/i }))

    expect(await screen.findByText('Segunda imagem inválida')).toBeInTheDocument()
    // A falha interrompe o fluxo: não deve existir uma chamada para os metadados.
    expect(fetchApi.mock.calls.map(([url]) => url)).toEqual([
      'http://localhost:8080/api/v1/projetos/upload',
      'http://localhost:8080/api/v1/projetos/upload',
    ])
    expect(fetchApi.mock.calls[0][1].body.get('arquivo')).toBe(primeiraImagem)
    expect(fetchApi.mock.calls[1][1].body.get('arquivo')).toBe(segundaImagem)
    expect(screen.getByLabelText(/nome do projeto/i)).toHaveValue('Projeto Teste')
    expect(screen.getByLabelText(/resumo/i)).toHaveValue('Resumo do projeto')
    expect(screen.getByLabelText(/tema/i)).toHaveValue('Web')
    expect(screen.getByLabelText(/autores/i)).toHaveValue('Ana Lima, Bruno Reis')
    expect(screen.getByLabelText(/stack tecnológica/i)).toHaveValue('React, Spring Boot')
    expect(screen.getByText(/2 arquivo\(s\) anexado\(s\)/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /publicar projeto na vitrine/i })).toBeEnabled()
    expect(screen.queryByText('Projeto publicado com sucesso na vitrine!')).not.toBeInTheDocument()
  })

  it('interrompe a submissão quando o upload falha', async () => {
    const fetchApi = vi.fn().mockResolvedValue({
      ok: false,
      status: 400,
      json: async () => ({ erro: { mensagem: 'Imagem inválida' } }),
    })
    vi.stubGlobal('fetch', fetchApi)
    renderizarEnviar()
    const usuario = userEvent.setup()

    await preencherFormulario(usuario)
    await usuario.upload(document.getElementById('imagens'), new File(['imagem'], 'capa.png', { type: 'image/png' }))
    await usuario.click(screen.getByRole('button', { name: /publicar projeto na vitrine/i }))

    expect(fetchApi).toHaveBeenCalledTimes(1)
    expect(screen.getByLabelText(/nome do projeto/i)).toHaveValue('Projeto Teste')
    expect(screen.getByRole('button', { name: /publicar projeto na vitrine/i })).toBeEnabled()
    // Preserva a mensagem específica da API, independentemente do prefixo visual.
    expect(await screen.findByText(/Imagem inválida/)).toBeInTheDocument()
  })

  it('mostra o erro da API quando os metadados não são salvos', async () => {
    const fetchApi = vi.fn().mockResolvedValue({
      ok: false,
      status: 400,
      json: async () => ({ erro: 'Dados inválidos' }),
    })
    vi.stubGlobal('fetch', fetchApi)
    renderizarEnviar()
    const usuario = userEvent.setup()

    await preencherFormulario(usuario)
    await usuario.click(screen.getByRole('button', { name: /publicar projeto na vitrine/i }))

    expect(fetchApi).toHaveBeenCalledTimes(1)
    expect(fetchApi.mock.calls[0][0]).toBe('http://localhost:8080/api/v1/projetos/metadados')
    expect(screen.getByLabelText(/nome do projeto/i)).toHaveValue('Projeto Teste')
    expect(screen.getByRole('button', { name: /publicar projeto na vitrine/i })).toBeEnabled()
    expect(await screen.findByText(/Dados inválidos/)).toBeInTheDocument()
  })

  it('informa a falha de conexão e permite tentar novamente', async () => {
    const fetchApi = vi.fn().mockRejectedValue(new TypeError('Failed to fetch'))
    vi.stubGlobal('fetch', fetchApi)
    renderizarEnviar()
    const usuario = userEvent.setup()

    await preencherFormulario(usuario)
    await usuario.click(screen.getByRole('button', { name: /publicar projeto na vitrine/i }))

    expect(await screen.findByText('Erro de conexão: Sistema fora do ar!')).toBeInTheDocument()
    await waitFor(() => expect(screen.getByRole('button', { name: /publicar projeto na vitrine/i })).toBeEnabled())
  })
})
