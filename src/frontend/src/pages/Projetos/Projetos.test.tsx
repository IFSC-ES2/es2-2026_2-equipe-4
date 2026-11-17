import { afterEach, describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import userEvent from '@testing-library/user-event'
import Projetos from './Projetos'
import { MemoryRouter } from 'react-router-dom'

// A página usa <Link>, então precisa de um router nos testes.
function renderizarProjetos() {
    render(
        <MemoryRouter>
            <Projetos />
        </MemoryRouter>,
    )
}

const projetoTecnologia = {
    id: 'projeto-1',
    titulo: 'Horta inteligente',
    resumo: 'Sistema para monitorar uma horta.',
    tema: 'Tecnologia',
    autores: ['Ana Lima'],
    imagens: [] as string[],
}

const projetoSaude = {
    ...projetoTecnologia,
    id: 'projeto-2',
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

    it.each([
        { perfil: 'visitante', token: null },
        { perfil: 'usuário autenticado', token: 'token-teste' },
    ])('não oferece exclusão de projeto para $perfil', async ({ token }) => {
        if (token) localStorage.setItem('token', token)
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
})
