import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { describe, it, expect } from 'vitest'
import Enviar from './Enviar'

// Mock para a imagem importada no componente
vi.mock('./assets/arquivo.png', () => ({ default: 'mock-imagem-arquivo' }))

describe('Componente Enviar', () => {
  it('Deve exibir mensagens de erro ao tentar enviar o formulário vazio', async () => {
    //Renderiza o componente na tela "invisível"
    render(<Enviar />)

    //Cria o simulador de interações do usuário
    const user = userEvent.setup()

    //Encontra o botão de submissão pelo texto e clica nele
    const botaoEnviar = screen.getByRole('button', { name: /enviar artigo/i })
    await user.click(botaoEnviar)

    //Verifica se as mensagens de erro obrigatórias apareceram na tela
    expect(screen.getByText('Informe o título.')).toBeInTheDocument()
    expect(screen.getByText('Informe o resumo.')).toBeInTheDocument()
    expect(screen.getByText('Informe ao menos um autor (separado por vírgula).')).toBeInTheDocument()
    expect(screen.getByText('Informe ao menos uma palavra-chave (separada por vírgula).')).toBeInTheDocument()
    expect(screen.getByText('Informe a área do conhecimento.')).toBeInTheDocument()
    expect(screen.getByText('Anexe o arquivo PDF.')).toBeInTheDocument()
  })

  it('Deve preencher o formulário com sucesso, enviar e exibir mensagem de confirmação', async () => {
    //"Mock" (simulação) da API do backend
    global.fetch = vi.fn().mockImplementation((url) => {
      if (url.includes('/arquivos/upload')) {
        return Promise.resolve({ ok: true, json: () => Promise.resolve({ id: 'id-falso-123' }) })
      }
      if (url.includes('/arquivos/metadados')) {
        return Promise.resolve({ ok: true, json: () => Promise.resolve({}) })
      }
    })

    render(<Enviar />)
    const user = userEvent.setup()

    //Simulando a digitação do usuário nos campos
    await user.type(screen.getByLabelText(/título/i), 'Meu Artigo de Teste')
    await user.type(screen.getByLabelText(/resumo/i), 'Resumo do artigo')
    await user.type(screen.getByLabelText(/autores/i), 'Juliano, Equipe 4')
    await user.type(screen.getByLabelText(/palavras-chave/i), 'Testes, React, Vitest')
    await user.type(screen.getByLabelText(/área do conhecimento/i), 'Engenharia de Software')

    //Simulando o upload de um PDF
    const arquivoInput = document.getElementById('arquivo')
    const pdfFalso = new File(['conteudo-falso'], 'artigo.pdf', { type: 'application/pdf' })
    await user.upload(arquivoInput, pdfFalso)

    //Clicando no botão de enviar
    const botaoEnviar = screen.getByRole('button', { name: /enviar artigo/i })
    await user.click(botaoEnviar)

    //Verificando se a mensagem de sucesso da API apareceu na tela
    expect(await screen.findByText('Sucesso! Artigo submetido e persistido no banco.')).toBeInTheDocument()

    //Limpa o mock para não atrapalhar os próximos testes
    global.fetch.mockClear()
  })

  it('Deve exibir erro ao tentar anexar um arquivo que não seja PDF', async () => {
    render(<Enviar />)

    const arquivoInput = document.getElementById('arquivo')
    
    // Criando um arquivo falso com extensão .png (não PDF)
    const arquivoInvalido = new File(['conteudo-falso'], 'imagem.png', { type: 'image/png' })
    
    // Usamos o fireEvent no lugar do userEvent para "burlar" o bloqueio nativo
    // do accept=".pdf" no HTML e testar a nossa validação no React.
    fireEvent.change(arquivoInput, { target: { files: [arquivoInvalido] } })

    // Verifica se a mensagem de erro apareceu (usamos await findByText para dar tempo do React atualizar a tela)
    expect(await screen.findByText('O arquivo deve estar no formato PDF.')).toBeInTheDocument()
  })
})