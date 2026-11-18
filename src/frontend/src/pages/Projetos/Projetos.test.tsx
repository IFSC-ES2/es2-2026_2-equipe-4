import { afterEach, describe, expect, it, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import userEvent from '@testing-library/user-event'
import Projetos from './Projetos'
import { MemoryRouter } from 'react-router-dom'
import ProvedorSessao from '../../sessao/ProvedorSessao'
import { criarTokenTeste } from '../../sessao/tokenTeste'

// A página usa <Link>, então precisa de um router nos testes.
function renderizarProjetos() {
    render(
        <MemoryRouter>
            <ProvedorSessao>
                <Projetos />
            </ProvedorSessao>
        </MemoryRouter>,
    )
}

const projetoTecnologia = {
    id: 'projeto-1',
    autorId: 'autor-1',
    titulo: 'Horta inteligente',
    resumo: 'Sistema para monitorar uma horta.',
    tema: 'Tecnologia',
    autores: ['Ana Lima'],
    imagens: [] as string[],
}

const projetoSaude = {
    ...projetoTecnologia,
    id: 'projeto-2',
    autorId: 'autor-2',
    titulo: 'Aplicativo de saúde',
    resumo: 'Sistema para monitorar a saúde de pacientes.',
    tema: 'Saúde',
    autores: ['Bernardo Vieira'],
}

function respostaPagina(projetos = [projetoTecnologia], number = 0, last = true) {
    return { ok: true, json: async () => ({ content: projetos, number, last }) }
}

function simularBusca(projetos = [projetoTecnologia]) {
    const fetchApi = vi.fn().mockResolvedValue(respostaPagina(projetos))

    vi.stubGlobal('fetch', fetchApi)
    return fetchApi
}

function simularSessao(projetos = [projetoTecnologia, projetoSaude], usuarioId = 'autor-1') {
    const token = criarTokenTeste()
    localStorage.setItem('token', token)
    const excluir = vi.fn().mockResolvedValue({ status: 204 })
    const listar = vi.fn().mockResolvedValue(respostaPagina(projetos))
    const fetchApi = vi.fn((url: string, opcoes: RequestInit) => {
        if (url.endsWith('/auth/token')) {
            return Promise.resolve({ ok: true, json: async () => ({ userId: usuarioId }) })
        }
        if (opcoes.method === 'DELETE') return excluir(url, opcoes)
        return listar(url, opcoes)
    })
    vi.stubGlobal('fetch', fetchApi)
    return { fetchApi, excluir, listar, token }
}

afterEach(() => {
    localStorage.removeItem('token')
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
})

describe('Projetos', () => {
    it('mostra o carregamento e depois exibe os projetos retornados pela API', async () => {
        const fetchApi = simularBusca()

        renderizarProjetos()

        expect(screen.getByText('Procurando projetos...')).toBeInTheDocument()
        expect(
            await screen.findByRole('heading', { name: 'Horta inteligente' }),
        ).toBeInTheDocument()
        expect(screen.getByRole('link', { name: 'Detalhes' })).toHaveAttribute(
            'href', '/projetos/projeto-1',
        )
        expect(screen.getByText('Ana Lima')).toBeInTheDocument()
        expect(screen.queryByText('Procurando projetos...')).not.toBeInTheDocument()
        expect(fetchApi).toHaveBeenCalledExactlyOnceWith(
            'http://localhost:8080/api/v1/projetos?page=0&size=100',
            expect.objectContaining({ signal: expect.any(AbortSignal) }),
        )
    })

    it('mostra em cada projeto um botão de detalhes que leva à página do projeto', async () => {
        simularBusca([projetoTecnologia, projetoSaude])

        renderizarProjetos()

        const botoes = await screen.findAllByRole('link', { name: 'Detalhes' })
        expect(botoes).toHaveLength(2)
        expect(botoes[0]).toHaveAttribute('href', '/projetos/projeto-1')
        expect(botoes[1]).toHaveAttribute('href', '/projetos/projeto-2')
    })

    it('filtra os projetos por tema e volta a mostrar todos', async () => {
        simularBusca([projetoTecnologia, projetoSaude])
        const usuario = userEvent.setup()

        renderizarProjetos()
        await screen.findByRole('heading', { name: 'Aplicativo de saúde' })
        expect(screen.getByRole('heading', { name: 'Horta inteligente' })).toBeInTheDocument()

        await usuario.click(screen.getByRole('button', { name: 'Tecnologia 1' }))

        expect(screen.getByRole('heading', { name: 'Horta inteligente' })).toBeInTheDocument()
        expect(
            screen.queryByRole('heading', { name: 'Aplicativo de saúde' }),
        ).not.toBeInTheDocument()

        await usuario.click(screen.getByRole('button', { name: 'Todos 2' }))

        expect(screen.getByRole('heading', { name: 'Horta inteligente' })).toBeInTheDocument()
        expect(screen.getByRole('heading', { name: 'Aplicativo de saúde' })).toBeInTheDocument()
    })

    it('avisa quando não há projetos cadastrados', async () => {
        simularBusca([])

        renderizarProjetos()

        expect(
            await screen.findByRole('heading', { name: 'Nenhum projeto encontrado.' }),
        ).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Todos 0' })).toBeInTheDocument()
    })

    it('mostra erro quando a API recusa a busca dos projetos', async () => {
        const fetchApi = vi.fn().mockResolvedValue({ ok: false, status: 500 })
        vi.stubGlobal('fetch', fetchApi)

        renderizarProjetos()

        expect(
            await screen.findByText('Erro de conexão: Sistema fora do ar!'),
        ).toBeInTheDocument()
        expect(screen.queryByText('Procurando projetos...')).not.toBeInTheDocument()
    })

    it('mostra erro quando a busca falha por falta de conexão', async () => {
        const fetchApi = vi.fn().mockRejectedValue(new TypeError('Failed to fetch'))
        vi.stubGlobal('fetch', fetchApi)

        renderizarProjetos()

        expect(
            await screen.findByText('Erro de conexão: Sistema fora do ar!'),
        ).toBeInTheDocument()
        expect(screen.queryByText('Procurando projetos...')).not.toBeInTheDocument()
    })

    it('carrega o 101º projeto sem duplicar cartões e permite filtrar pelo novo tema', async () => {
        const primeiraPagina = Array.from({ length: 100 }, (_, indice) => ({
            ...projetoTecnologia,
            id: `tecnologia-${indice + 1}`,
            titulo: `Projeto Tecnologia ${indice + 1}`,
        }))
        const fetchApi = vi.fn()
            .mockResolvedValueOnce(respostaPagina(primeiraPagina, 0, false))
            .mockResolvedValueOnce(respostaPagina([primeiraPagina[99], projetoSaude], 1))
        vi.stubGlobal('fetch', fetchApi)
        const usuario = userEvent.setup()

        renderizarProjetos()

        const carregarMais = await screen.findByRole('button', { name: 'Carregar mais projetos' })
        expect(screen.getByText(/as contagens consideram os projetos carregados/i)).toBeInTheDocument()
        expect(screen.queryByRole('button', { name: /Saúde/ })).not.toBeInTheDocument()
        await usuario.click(screen.getByRole('button', { name: 'Tecnologia 100' }))
        await usuario.click(carregarMais)

        const filtroSaude = await screen.findByRole('button', { name: 'Saúde 1' })
        expect(screen.getAllByRole('link', { name: 'Detalhes' })).toHaveLength(100)
        expect(screen.getByRole('heading', { name: 'Projeto Tecnologia 100' })).toBeInTheDocument()
        expect(fetchApi).toHaveBeenLastCalledWith(
            'http://localhost:8080/api/v1/projetos?page=1&size=100',
            expect.objectContaining({ signal: expect.any(AbortSignal) }),
        )

        await usuario.click(filtroSaude)
        expect(screen.getByRole('heading', { name: 'Aplicativo de saúde' })).toBeInTheDocument()
        expect(screen.getAllByRole('link', { name: 'Detalhes' })).toHaveLength(1)
        await usuario.click(screen.getByRole('button', { name: 'Todos 101' }))
        expect(screen.getAllByRole('link', { name: 'Detalhes' })).toHaveLength(101)
        expect(screen.getByRole('status')).toHaveTextContent('Todos os projetos foram carregados.')
        expect(screen.queryByRole('button', { name: 'Carregar mais projetos' })).not.toBeInTheDocument()
    })

    it('preserva os projetos carregados e tenta a mesma página após falha', async () => {
        const fetchApi = vi.fn()
            .mockResolvedValueOnce(respostaPagina([projetoTecnologia], 0, false))
            .mockRejectedValueOnce(new TypeError('Failed to fetch'))
            .mockResolvedValueOnce(respostaPagina([projetoSaude], 1))
        vi.stubGlobal('fetch', fetchApi)
        const usuario = userEvent.setup()

        renderizarProjetos()
        await usuario.click(await screen.findByRole('button', { name: 'Carregar mais projetos' }))

        expect(await screen.findByRole('alert')).toHaveTextContent('Não foi possível carregar mais projetos.')
        expect(screen.getByRole('heading', { name: 'Horta inteligente' })).toBeInTheDocument()
        await usuario.click(screen.getByRole('button', { name: 'Tentar novamente' }))

        expect(await screen.findByRole('heading', { name: 'Aplicativo de saúde' })).toBeInTheDocument()
        expect(screen.getByRole('heading', { name: 'Horta inteligente' })).toBeInTheDocument()
        expect(screen.queryByRole('alert')).not.toBeInTheDocument()
        expect(fetchApi.mock.calls.map(([url]) => new URL(url).searchParams.get('page'))).toEqual(['0', '1', '1'])
    })

    it('não oferece exclusão a visitantes', async () => {
        const fetchApi = simularBusca()

        renderizarProjetos()
        expect(await screen.findByRole('link', { name: 'Detalhes' })).toHaveAttribute(
            'href', '/projetos/projeto-1',
        )
        expect(screen.queryByRole('button', { name: /apagar|excluir|exclusão|🗑️/i })).not.toBeInTheDocument()
        expect(fetchApi).toHaveBeenCalledExactlyOnceWith(
            'http://localhost:8080/api/v1/projetos?page=0&size=100',
            expect.objectContaining({ signal: expect.any(AbortSignal) }),
        )
    })

    it('oferece Apagar apenas nos projetos da conta atual', async () => {
        const { fetchApi, token } = simularSessao()
        renderizarProjetos()

        expect(await screen.findByRole('button', { name: 'Apagar Horta inteligente' })).toBeInTheDocument()
        expect(screen.getByRole('heading', { name: 'Aplicativo de saúde' })).toBeInTheDocument()
        expect(screen.queryByRole('button', { name: 'Apagar Aplicativo de saúde' })).not.toBeInTheDocument()
        expect(fetchApi).toHaveBeenCalledWith(
            'http://localhost:8080/api/v1/auth/token',
            expect.objectContaining({ headers: { Authorization: `Bearer ${token}` } }),
        )
    })

    it('mantém o projeto quando o autor cancela a confirmação', async () => {
        const { excluir } = simularSessao()
        const confirmar = vi.spyOn(window, 'confirm').mockReturnValue(false)
        const usuario = userEvent.setup()
        renderizarProjetos()

        await usuario.click(await screen.findByRole('button', { name: 'Apagar Horta inteligente' }))

        expect(confirmar).toHaveBeenCalledWith('Apagar o projeto "Horta inteligente"?')
        expect(excluir).not.toHaveBeenCalled()
        expect(screen.getByRole('heading', { name: 'Horta inteligente' })).toBeInTheDocument()
    })

    it('envia o token e remove o projeto e seu filtro após a API confirmar a exclusão', async () => {
        const { excluir, token } = simularSessao()
        vi.spyOn(window, 'confirm').mockReturnValue(true)
        const usuario = userEvent.setup()
        renderizarProjetos()
        await usuario.click(await screen.findByRole('button', { name: 'Tecnologia 1' }))

        await usuario.click(await screen.findByRole('button', { name: 'Apagar Horta inteligente' }))

        expect(excluir).toHaveBeenCalledExactlyOnceWith('http://localhost:8080/api/v1/projetos/projeto-1', {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` },
        })
        expect(await screen.findByRole('heading', { name: 'Aplicativo de saúde' })).toBeInTheDocument()
        expect(screen.queryByRole('heading', { name: 'Horta inteligente' })).not.toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Todos 1' })).toHaveClass('ativo')
    })

    it.each([
        { status: 403, mensagem: 'Apenas o autor pode apagar este projeto.' },
        { status: 405, mensagem: 'Não foi possível apagar o projeto. Tente novamente.' },
        { status: null, mensagem: 'Não foi possível apagar o projeto. Verifique sua conexão e tente novamente.' },
    ])('mantém o projeto se a exclusão falhar ($status)', async ({ status, mensagem }) => {
        const { excluir } = simularSessao()
        if (status === null) excluir.mockRejectedValueOnce(new TypeError('Failed to fetch'))
        else excluir.mockResolvedValueOnce({ status })
        vi.spyOn(window, 'confirm').mockReturnValue(true)
        const usuario = userEvent.setup()
        renderizarProjetos()

        await usuario.click(await screen.findByRole('button', { name: 'Apagar Horta inteligente' }))

        expect(await screen.findByRole('alert')).toHaveTextContent(mensagem)
        expect(screen.getByRole('heading', { name: 'Horta inteligente' })).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Apagar Horta inteligente' })).toBeEnabled()
    })

    it('encerra a sessão e mantém o projeto quando a exclusão retorna 401', async () => {
        const { excluir } = simularSessao()
        excluir.mockResolvedValueOnce({ status: 401 })
        vi.spyOn(window, 'confirm').mockReturnValue(true)
        const usuario = userEvent.setup()
        renderizarProjetos()

        await usuario.click(await screen.findByRole('button', { name: 'Apagar Horta inteligente' }))

        expect(await screen.findByRole('alert')).toHaveTextContent('Sua sessão terminou.')
        expect(screen.getByRole('heading', { name: 'Horta inteligente' })).toBeInTheDocument()
        expect(screen.queryByRole('button', { name: /Apagar/ })).not.toBeInTheDocument()
        expect(localStorage.getItem('token')).toBeNull()
    })

    it('preenche a lacuna na paginação antes de carregar mais após uma exclusão', async () => {
        const { listar } = simularSessao()
        listar
            .mockResolvedValueOnce(respostaPagina([projetoTecnologia], 0, false))
            .mockResolvedValueOnce(respostaPagina([projetoSaude], 0, false))
            .mockResolvedValueOnce(respostaPagina([{ ...projetoSaude, id: 'projeto-3', titulo: 'Terceiro projeto' }], 1))
        vi.spyOn(window, 'confirm').mockReturnValue(true)
        const usuario = userEvent.setup()
        renderizarProjetos()

        await usuario.click(await screen.findByRole('button', { name: 'Apagar Horta inteligente' }))
        expect(await screen.findByRole('heading', { name: 'Aplicativo de saúde' })).toBeInTheDocument()
        await usuario.click(screen.getByRole('button', { name: 'Carregar mais projetos' }))

        expect(await screen.findByRole('heading', { name: 'Terceiro projeto' })).toBeInTheDocument()
        await waitFor(() => expect(listar.mock.calls.map(([url]) => new URL(url).searchParams.get('page')))
            .toEqual(['0', '0', '1']))
    })
})
