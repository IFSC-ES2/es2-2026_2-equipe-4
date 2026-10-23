import { afterEach, describe, expect, it, vi } from 'vitest'
import { act, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import '@testing-library/jest-dom/vitest'
import Sobre from './Sobre'

async function abrirSobre() {
    // Aguarda a busca inicial terminar antes de conferir a tela.
    // A vitrine em construção também aparece antes de a API responder.
    await act(async () => {
        render(
            <MemoryRouter>
                <Sobre />
            </MemoryRouter>,
        )
    })
}

afterEach(() => {
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
})

describe('Sobre', () => {
    it('apresenta a plataforma e os links para galeria e submissão', async () => {
        const fetchApi = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => ({ content: [] }),
        })
        vi.stubGlobal('fetch', fetchApi)

        await abrirSobre()

        expect(
            screen.getByRole('heading', { name: /explore o universo acadêmico do PublicaIFSC/i }),
        ).toBeInTheDocument()
        expect(
            screen.getByText(/O PublicaIFSC é uma plataforma web/i),
        ).toBeInTheDocument()
        expect(screen.getByRole('link', { name: 'Ver Galeria Completa' })).toHaveAttribute(
            'href', '/projetos',
        )
        expect(screen.getByRole('link', { name: 'Submitar o seu Projeto' })).toHaveAttribute(
            'href', '/submissao',
        )
    })

    it('busca a amostra de projetos e exibe o mapa', async () => {
        const fetchApi = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => ({
                content: [{
                    id: 'projeto-1',
                    titulo: 'Horta inteligente',
                    resumo: 'Sistema para monitorar uma horta.',
                    tema: 'Tecnologia',
                    autores: ['Ana Lima'],
                }],
            }),
        })
        vi.stubGlobal('fetch', fetchApi)

        await abrirSobre()

        expect(fetchApi).toHaveBeenCalledExactlyOnceWith(
            'http://localhost:8080/api/v1/projetos?size=50',
        )
        expect(screen.getByText('Tecnologia', { selector: 'text' })).toBeInTheDocument()
        expect(screen.queryByText('Vitrine em construção')).not.toBeInTheDocument()
    })

    it('mostra a vitrine em construção quando não há projetos', async () => {
        const fetchApi = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => ({ content: [] }),
        })
        vi.stubGlobal('fetch', fetchApi)

        await abrirSobre()

        expect(screen.getByRole('heading', { name: 'Vitrine em construção' })).toBeInTheDocument()
        expect(
            screen.queryByText(/clique num tema para isolar os projetos/i),
        ).not.toBeInTheDocument()
    })

    it('mantém a página disponível quando a API retorna erro', async () => {
        const fetchApi = vi.fn().mockResolvedValue({ ok: false, status: 500 })
        vi.stubGlobal('fetch', fetchApi)

        await abrirSobre()

        expect(screen.getByRole('heading', { name: 'Vitrine em construção' })).toBeInTheDocument()
        expect(screen.getByRole('link', { name: 'Ver Galeria Completa' })).toHaveAttribute(
            'href', '/projetos',
        )
        expect(
            screen.queryByText(/clique num tema para isolar os projetos/i),
        ).not.toBeInTheDocument()
    })

    it('mantém a página disponível quando ocorre falha de conexão', async () => {
        const fetchApi = vi.fn().mockRejectedValue(new TypeError('Failed to fetch'))
        vi.stubGlobal('fetch', fetchApi)
        vi.spyOn(console, 'log').mockImplementation(() => {})

        await abrirSobre()

        expect(screen.getByRole('heading', { name: 'Vitrine em construção' })).toBeInTheDocument()
        expect(screen.getByRole('link', { name: 'Submitar o seu Projeto' })).toHaveAttribute(
            'href', '/submissao',
        )
        expect(
            screen.queryByText(/clique num tema para isolar os projetos/i),
        ).not.toBeInTheDocument()
    })
})
