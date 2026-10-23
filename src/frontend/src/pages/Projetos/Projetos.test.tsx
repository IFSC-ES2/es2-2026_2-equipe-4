import { afterEach, describe, expect, it, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import userEvent from '@testing-library/user-event'
import Projetos from './Projetos'

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

// Prepara uma resposta da API com os projetos necessários para cada teste.
function simularBusca(projetos = [projetoTecnologia]) {
    const fetchApi = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ content: projetos }),
    })

    vi.stubGlobal('fetch', fetchApi)
    return fetchApi
}

afterEach(() => {
    localStorage.removeItem('token')
    vi.unstubAllGlobals()
})

describe('Projetos', () => {
    it('mostra o carregamento e depois exibe os projetos retornados pela API', async () => {
        const fetchApi = simularBusca()

        render(<Projetos />)

        expect(screen.getByText('A procurar inovações...')).toBeInTheDocument()
        expect(
            await screen.findByRole('heading', { name: 'Horta inteligente' }),
        ).toBeInTheDocument()
        expect(screen.getByText('Sistema para monitorar uma horta.')).toBeInTheDocument()
        expect(screen.getByText('Ana Lima')).toBeInTheDocument()
        expect(screen.queryByText('A procurar inovações...')).not.toBeInTheDocument()
        expect(fetchApi).toHaveBeenCalledExactlyOnceWith(
            'http://localhost:8080/api/v1/projetos?size=100',
        )
    })

    it('filtra os projetos por tema e volta a mostrar todos', async () => {
        simularBusca([projetoTecnologia, projetoSaude])
        const usuario = userEvent.setup()

        render(<Projetos />)
        await screen.findByRole('heading', { name: 'Aplicativo de saúde' })
        expect(screen.getByRole('heading', { name: 'Horta inteligente' })).toBeInTheDocument()

        await usuario.click(screen.getByRole('button', { name: 'Tecnologia (1)' }))

        expect(screen.getByRole('heading', { name: 'Horta inteligente' })).toBeInTheDocument()
        expect(
            screen.queryByRole('heading', { name: 'Aplicativo de saúde' }),
        ).not.toBeInTheDocument()

        await usuario.click(screen.getByRole('button', { name: 'Todos (2)' }))

        expect(screen.getByRole('heading', { name: 'Horta inteligente' })).toBeInTheDocument()
        expect(screen.getByRole('heading', { name: 'Aplicativo de saúde' })).toBeInTheDocument()
    })

    it('avisa quando não há projetos cadastrados', async () => {
        simularBusca([])

        render(<Projetos />)

        expect(
            await screen.findByText('Nenhum projeto encontrado para esta categoria.'),
        ).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Todos (0)' })).toBeInTheDocument()
    })

    it('mostra erro quando a API recusa a busca dos projetos', async () => {
        const fetchApi = vi.fn().mockResolvedValue({ ok: false, status: 500 })
        vi.stubGlobal('fetch', fetchApi)

        render(<Projetos />)

        expect(
            await screen.findByText('Erro de conexão: Sistema fora do ar!'),
        ).toBeInTheDocument()
        expect(screen.queryByText('A procurar inovações...')).not.toBeInTheDocument()
    })

    it('mostra erro quando a busca falha por falta de conexão', async () => {
        const fetchApi = vi.fn().mockRejectedValue(new TypeError('Failed to fetch'))
        vi.stubGlobal('fetch', fetchApi)

        render(<Projetos />)

        expect(
            await screen.findByText('Erro de conexão: Sistema fora do ar!'),
        ).toBeInTheDocument()
        expect(screen.queryByText('A procurar inovações...')).not.toBeInTheDocument()
    })

    it('abre as imagens do projeto e permite fechar o modal', async () => {
        simularBusca([{
            ...projetoTecnologia,
            imagens: ['https://exemplo.com/capa.png'],
        }])
        const usuario = userEvent.setup()

        render(<Projetos />)
        await usuario.click(await screen.findByRole('button', { name: /ver demo/i }))

        expect(screen.getByRole('heading', { name: 'Imagens do Projeto' })).toBeInTheDocument()
        expect(screen.getByRole('img', { name: 'Demonstração 1' })).toHaveAttribute(
            'src', 'https://exemplo.com/capa.png',
        )

        await usuario.click(screen.getByRole('button', { name: 'X' }))

        expect(
            screen.queryByRole('heading', { name: 'Imagens do Projeto' }),
        ).not.toBeInTheDocument()
    })

    it('exige confirmação e exclui apenas o projeto escolhido usando o token', async () => {
        localStorage.setItem('token', 'token-teste')
        const fetchApi = simularBusca([projetoTecnologia, projetoSaude])
        const usuario = userEvent.setup()

        render(<Projetos />)
        await screen.findByRole('heading', { name: 'Aplicativo de saúde' })

        fetchApi.mockResolvedValueOnce({ ok: true, status: 204 })
        await usuario.click(screen.getAllByTitle('Apagar projeto')[0])

        expect(screen.getByText('Tens certeza?')).toBeInTheDocument()
        // O primeiro clique apenas pede confirmação, sem enviar o DELETE.
        expect(fetchApi).toHaveBeenCalledTimes(1)

        await usuario.click(screen.getByTitle('Clique para confirmar a exclusão'))

        await waitFor(() => {
            expect(
                screen.queryByRole('heading', { name: 'Horta inteligente' }),
            ).not.toBeInTheDocument()
        })

        expect(fetchApi).toHaveBeenLastCalledWith(
            'http://localhost:8080/api/v1/projetos/projeto-1',
            {
                method: 'DELETE',
                headers: { Authorization: 'Bearer token-teste' },
            },
        )
        expect(screen.getByRole('heading', { name: 'Aplicativo de saúde' })).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Todos (1)' })).toBeInTheDocument()
    })

    // Pendência para a próxima entrega: preservar o cartão quando a exclusão falha na API ou na conexão.
})
