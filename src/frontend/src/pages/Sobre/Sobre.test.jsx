import { afterEach, describe, expect, it, vi } from 'vitest'
import { act, render, screen, within } from '@testing-library/react'
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
            screen.getByRole('heading', { name: /conhecimento que merece ser compartilhado/i }),
        ).toBeInTheDocument()
        expect(
            screen.getByText(/O PublicaIFSC é a vitrine digital desenvolvida/i),
        ).toBeInTheDocument()
        expect(screen.getByRole('link', { name: 'Explorar Vitrine' })).toHaveAttribute(
            'href', '/projetos',
        )
        expect(screen.getByRole('link', { name: 'Publicar Projeto' })).toHaveAttribute(
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

    it('exibe os cartões com título, tecnologias, imagens e links para os detalhes', async () => {
        const fetchApi = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => ({
                content: [
                    {
                        id: 'projeto-1',
                        titulo: 'Horta inteligente',
                        tema: 'Tecnologia',
                        tecnologias: ['Java', 'React'],
                        imagens: ['imagem-horta', 'outra-imagem'],
                    },
                    {
                        id: 'projeto-2',
                        titulo: 'Biblioteca digital',
                        tema: 'Educação',
                        tecnologias: ['Python'],
                        imagens: ['/imagens-padrao/fundo-projeto-padrao-1.jpg'],
                    },
                ],
            }),
        })
        vi.stubGlobal('fetch', fetchApi)

        await abrirSobre()

        const cartaoHorta = screen.getByRole('link', { name: /Horta inteligente/ })
        expect(cartaoHorta).toHaveAttribute('href', '/projetos/projeto-1')
        expect(within(cartaoHorta).getByRole('heading', { name: 'Horta inteligente' })).toBeInTheDocument()
        expect(within(cartaoHorta).getByText('Java • React')).toBeInTheDocument()
        expect(within(cartaoHorta).getByRole('img', { name: 'Horta inteligente' })).toHaveAttribute(
            'src', 'http://localhost:8080/api/v1/projetos/imagens/imagem-horta',
        )

        const cartaoBiblioteca = screen.getByRole('link', { name: /Biblioteca digital/ })
        expect(cartaoBiblioteca).toHaveAttribute('href', '/projetos/projeto-2')
        expect(within(cartaoBiblioteca).getByRole('heading', { name: 'Biblioteca digital' })).toBeInTheDocument()
        expect(within(cartaoBiblioteca).getByText('Python')).toBeInTheDocument()
        expect(within(cartaoBiblioteca).getByRole('img', { name: 'Biblioteca digital' })).toHaveAttribute(
            'src', '/imagens-padrao/fundo-projeto-padrao-1.jpg',
        )
    })

    it('mostra textos padrão nos cartões sem imagem ou tecnologias', async () => {
        const fetchApi = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => ({
                content: [
                    {
                        id: 'projeto-3',
                        titulo: 'Projeto sem imagem',
                        tema: 'Educação',
                        imagens: [],
                        tecnologias: [],
                    },
                    {
                        id: 'projeto-4',
                        titulo: 'Projeto sem informações',
                    },
                ],
            }),
        })
        vi.stubGlobal('fetch', fetchApi)

        await abrirSobre()

        const cartaoSemImagem = screen.getByRole('link', { name: /Projeto sem imagem/ })
        expect(within(cartaoSemImagem).queryByRole('img')).not.toBeInTheDocument()
        expect(within(cartaoSemImagem).getByText('Educação')).toBeInTheDocument()
        expect(within(cartaoSemImagem).getByText('Projeto Acadêmico')).toBeInTheDocument()

        const cartaoSemInformacoes = screen.getByRole('link', { name: /Projeto sem informações/ })
        expect(within(cartaoSemInformacoes).queryByRole('img')).not.toBeInTheDocument()
        expect(within(cartaoSemInformacoes).getByText('Projeto IFSC')).toBeInTheDocument()
        expect(within(cartaoSemInformacoes).getByText('Projeto Acadêmico')).toBeInTheDocument()
    })

    it('exibe somente os oito primeiros cartões quando a API retorna dez projetos', async () => {
        const projetos = Array.from({ length: 10 }, (_, indice) => ({
            id: `projeto-${indice + 1}`,
            titulo: `Projeto ${indice + 1}`,
            tema: 'Tecnologia',
        }))
        const fetchApi = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => ({ content: projetos }),
        })
        vi.stubGlobal('fetch', fetchApi)

        await abrirSobre()

        const cartoes = screen.getAllByRole('link', { name: /Projeto \d+/ })
        expect(cartoes).toHaveLength(8)
        cartoes.forEach((cartao, indice) => {
            expect(cartao).toHaveAttribute('href', `/projetos/projeto-${indice + 1}`)
            expect(within(cartao).getByRole('heading', { name: `Projeto ${indice + 1}` })).toBeInTheDocument()
        })
        expect(screen.queryByRole('heading', { name: 'Projeto 9' })).not.toBeInTheDocument()
        expect(screen.queryByRole('heading', { name: 'Projeto 10' })).not.toBeInTheDocument()
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
        expect(screen.getByRole('link', { name: 'Explorar Vitrine' })).toHaveAttribute(
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
        expect(screen.getByRole('link', { name: 'Publicar Projeto' })).toHaveAttribute(
            'href', '/submissao',
        )
        expect(
            screen.queryByText(/clique num tema para isolar os projetos/i),
        ).not.toBeInTheDocument()
    })
})
