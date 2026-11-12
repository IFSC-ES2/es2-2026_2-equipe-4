import { afterEach, describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import ProjetoDetalhe from './ProjetoDetalhe'

const projeto = {
  id: 'projeto-1',
  titulo: 'Horta inteligente',
  resumo: 'Sistema para monitorar uma horta.',
  tema: 'Educação',
  autores: ['Ana Lima', 'Bruno Costa'],
  tecnologias: ['Java', 'React'],
  imagens: [],
  linkRepositorio: 'https://github.com/exemplo/horta',
  linkDemonstracao: '',
}

function simularResposta(resposta) {
  const fetchApi = vi.fn().mockResolvedValue(resposta)
  vi.stubGlobal('fetch', fetchApi)
  return fetchApi
}

function renderizar(id = 'projeto-1') {
  render(
    <MemoryRouter initialEntries={[`/projetos/${id}`]}>
      <Routes>
        <Route path="/projetos/:id" element={<ProjetoDetalhe />} />
      </Routes>
    </MemoryRouter>,
  )
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('ProjetoDetalhe', () => {
  it('busca o projeto pelo id e exibe descrição, tecnologias e links', async () => {
    const fetchApi = simularResposta({ ok: true, status: 200, json: async () => projeto })

    renderizar()

    expect(screen.getByText('Carregando projeto...')).toBeInTheDocument()
    expect(await screen.findByRole('heading', { name: 'Horta inteligente' })).toBeInTheDocument()
    expect(fetchApi).toHaveBeenCalledExactlyOnceWith('http://localhost:8080/api/v1/projetos/projeto-1')

    expect(screen.getByText('Sistema para monitorar uma horta.')).toBeInTheDocument()
    expect(screen.getByText('Ana Lima')).toBeInTheDocument()
    expect(screen.getByText('Java')).toBeInTheDocument()
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '</> Repositório' })).toHaveAttribute(
      'href',
      'https://github.com/exemplo/horta',
    )
    expect(screen.queryByRole('link', { name: 'Demonstração' })).not.toBeInTheDocument()
  })

  it('mostra avisos em vez de blocos vazios quando faltam informações', async () => {
    const projetoIncompleto = {
      id: 'projeto-2',
      titulo: 'Projeto sem dados',
      resumo: '',
      autores: [],
      tecnologias: [],
      imagens: [],
      linkRepositorio: '',
      linkDemonstracao: '',
    }
    simularResposta({ ok: true, status: 200, json: async () => projetoIncompleto })

    renderizar('projeto-2')

    expect(await screen.findByRole('heading', { name: 'Projeto sem dados' })).toBeInTheDocument()
    expect(screen.getByText('Este projeto ainda não possui descrição.')).toBeInTheDocument()
    expect(screen.getByText('Autores não informados.')).toBeInTheDocument()
    expect(screen.getByText('Não informadas.')).toBeInTheDocument()
    expect(screen.getByText('Nenhum link informado.')).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /Repositório/ })).not.toBeInTheDocument()
  })

  it('mostra a capa com as iniciais quando o projeto não tem fotos', async () => {
    simularResposta({ ok: true, status: 200, json: async () => projeto })

    renderizar()

    expect(await screen.findByText('HI')).toBeInTheDocument()
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
  })

  it('mostra várias fotos e permite navegar entre elas', async () => {
    simularResposta({
      ok: true,
      status: 200,
      json: async () => ({ ...projeto, imagens: ['foto-a', 'foto-b', 'foto-c'] }),
    })
    const usuario = userEvent.setup()

    renderizar()

    const principal = await screen.findByRole('img', { name: /Foto 1 de 3/ })
    expect(principal).toHaveAttribute('src', 'http://localhost:8080/api/v1/projetos/imagens/foto-a')
    expect(screen.getByText('1 / 3')).toBeInTheDocument()

    await usuario.click(screen.getByRole('button', { name: 'Próxima foto' }))
    expect(screen.getByRole('img', { name: /Foto 2 de 3/ })).toHaveAttribute(
      'src',
      'http://localhost:8080/api/v1/projetos/imagens/foto-b',
    )

    await usuario.click(screen.getByRole('button', { name: 'Ver foto 3' }))
    expect(screen.getByRole('img', { name: /Foto 3 de 3/ })).toBeInTheDocument()

    await usuario.click(screen.getByRole('button', { name: 'Próxima foto' }))
    expect(screen.getByRole('img', { name: /Foto 1 de 3/ })).toBeInTheDocument()
  })

  it('volta para a capa quando a foto não carrega', async () => {
    simularResposta({
      ok: true,
      status: 200,
      json: async () => ({ ...projeto, imagens: ['foto-quebrada'] }),
    })

    renderizar()

    fireEvent.error(await screen.findByRole('img', { name: /Foto 1 de 1/ }))

    expect(await screen.findByText('HI')).toBeInTheDocument()
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
  })

  it('informa quando o projeto não existe', async () => {
    simularResposta({ ok: false, status: 404 })

    renderizar('inexistente')

    expect(await screen.findByText('Projeto não encontrado.')).toBeInTheDocument()
  })

  it('informa erro quando a API falha', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('rede')))

    renderizar()

    expect(
      await screen.findByText('Não foi possível carregar o projeto. Tente novamente mais tarde.'),
    ).toBeInTheDocument()
  })
})
