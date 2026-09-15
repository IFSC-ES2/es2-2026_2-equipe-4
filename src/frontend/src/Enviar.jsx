import { useState } from 'react'
import arquivoImg from './assets/arquivo.png'
import './Enviar.css'

const formularioInicial = {
  titulo: '',
  resumo: '',
  autores: '',
  palavrasChave: '',
  areaConhecimento: '',
}

const mensagensCamposObrigatorios = {
  titulo: 'Informe o título.',
  resumo: 'Informe o resumo.',
  autores: 'Informe ao menos um autor.',
  palavrasChave: 'Informe ao menos uma palavra-chave.',
  areaConhecimento: 'Informe a área do conhecimento.',
}

function Enviar() {
  const [formulario, setFormulario] = useState(formularioInicial)
  const [arquivoSelecionado, setArquivoSelecionado] = useState(null)
  const [arrastando, setArrastando] = useState(false)
  const [erros, setErros] = useState({})
  const [mensagem, setMensagem] = useState('')

  function limparErro(campo) {
    setErros((errosAtuais) => {
      if (!errosAtuais[campo]) {
        return errosAtuais
      }

      const proximosErros = { ...errosAtuais }
      delete proximosErros[campo]
      return proximosErros
    })
  }

  function atualizarCampo(event) {
    const { name, value } = event.target

    setFormulario((camposAtuais) => ({
      ...camposAtuais,
      [name]: value,
    }))
    limparErro(name)
    setMensagem('')
  }

  function definirArquivo(arquivo) {
    if (!arquivo) {
      setArquivoSelecionado(null)
      return
    }

    if (!arquivo.name.toLowerCase().endsWith('.pdf')) {
      setArquivoSelecionado(null)
      setErros((errosAtuais) => ({
        ...errosAtuais,
        arquivo: 'O arquivo deve estar no formato PDF.',
      }))
      setMensagem('')
      return
    }

    setArquivoSelecionado(arquivo)
    limparErro('arquivo')
    setMensagem('')
  }

  function selecionarArquivo(event) {
    const arquivo = event.target.files[0] ?? null
    definirArquivo(arquivo)

    if (arquivo && !arquivo.name.toLowerCase().endsWith('.pdf')) {
      event.target.value = ''
    }
  }

  function arrastarSobre(event) {
    event.preventDefault()
    setArrastando(true)
  }

  function sairDaArea(event) {
    event.preventDefault()
    setArrastando(false)
  }

  function soltarArquivo(event) {
    event.preventDefault()
    setArrastando(false)
    definirArquivo(event.dataTransfer.files[0] ?? null)
  }

  function validarFormulario() {
    const proximosErros = {}

    Object.entries(mensagensCamposObrigatorios).forEach(([campo, mensagemErro]) => {
      if (!formulario[campo].trim()) {
        proximosErros[campo] = mensagemErro
      }
    })

    if (!arquivoSelecionado) {
      proximosErros.arquivo = erros.arquivo ?? 'Anexe o arquivo PDF.'
    }

    setErros(proximosErros)
    return Object.keys(proximosErros).length === 0
  }

  function enviarFormulario(event) {
    event.preventDefault()

    if (!validarFormulario()) {
      setMensagem('')
      return
    }

    setMensagem('Dados validados para envio.')
  }

  return (
    <main id="center" className="pagina-submissao">
      <header className="cabecalho-submissao">
        <p>Nova submissão</p>
        <h1>Submissão de artigo</h1>
      </header>

      <form className="formulario-submissao" onSubmit={enviarFormulario} noValidate>
        <label
          className={`campo campo-largo ${erros.titulo ? 'campo-com-erro' : ''}`}
          htmlFor="titulo"
        >
          <span>Título <strong aria-hidden="true">*</strong></span>
          <input
            id="titulo"
            name="titulo"
            type="text"
            value={formulario.titulo}
            onChange={atualizarCampo}
            aria-invalid={Boolean(erros.titulo)}
            aria-describedby={erros.titulo ? 'erro-titulo' : undefined}
            required
          />
          {erros.titulo && <small id="erro-titulo">{erros.titulo}</small>}
        </label>

        <label
          className={`campo campo-largo ${erros.resumo ? 'campo-com-erro' : ''}`}
          htmlFor="resumo"
        >
          <span>Resumo <strong aria-hidden="true">*</strong></span>
          <textarea
            id="resumo"
            name="resumo"
            rows="6"
            value={formulario.resumo}
            onChange={atualizarCampo}
            aria-invalid={Boolean(erros.resumo)}
            aria-describedby={erros.resumo ? 'erro-resumo' : undefined}
            required
          />
          {erros.resumo && <small id="erro-resumo">{erros.resumo}</small>}
        </label>

        <label
          className={`campo ${erros.autores ? 'campo-com-erro' : ''}`}
          htmlFor="autores"
        >
          <span>Autores <strong aria-hidden="true">*</strong></span>
          <input
            id="autores"
            name="autores"
            type="text"
            value={formulario.autores}
            onChange={atualizarCampo}
            aria-invalid={Boolean(erros.autores)}
            aria-describedby={erros.autores ? 'erro-autores' : undefined}
            required
          />
          {erros.autores && <small id="erro-autores">{erros.autores}</small>}
        </label>

        <label
          className={`campo ${erros.palavrasChave ? 'campo-com-erro' : ''}`}
          htmlFor="palavrasChave"
        >
          <span>Palavras-chave <strong aria-hidden="true">*</strong></span>
          <input
            id="palavrasChave"
            name="palavrasChave"
            type="text"
            value={formulario.palavrasChave}
            onChange={atualizarCampo}
            aria-invalid={Boolean(erros.palavrasChave)}
            aria-describedby={erros.palavrasChave ? 'erro-palavras-chave' : undefined}
            required
          />
          {erros.palavrasChave && (
            <small id="erro-palavras-chave">{erros.palavrasChave}</small>
          )}
        </label>

        <label
          className={`campo campo-largo ${erros.areaConhecimento ? 'campo-com-erro' : ''}`}
          htmlFor="areaConhecimento"
        >
          <span>Área do conhecimento <strong aria-hidden="true">*</strong></span>
          <input
            id="areaConhecimento"
            name="areaConhecimento"
            type="text"
            value={formulario.areaConhecimento}
            onChange={atualizarCampo}
            aria-invalid={Boolean(erros.areaConhecimento)}
            aria-describedby={erros.areaConhecimento ? 'erro-area' : undefined}
            required
          />
          {erros.areaConhecimento && <small id="erro-area">{erros.areaConhecimento}</small>}
        </label>

        <div className="campo campo-largo campo-arquivo">
          <span>Anexo em PDF <strong aria-hidden="true">*</strong></span>
          <label
            className={`enviar ${arrastando ? 'arrastando' : ''} ${erros.arquivo ? 'enviar-com-erro' : ''}`}
            htmlFor="arquivo"
            onDragOver={arrastarSobre}
            onDragLeave={sairDaArea}
            onDrop={soltarArquivo}
          >
            <img src={arquivoImg} className="arquivo" alt="" />
            <strong>Arraste o PDF aqui</strong>
            <span>ou selecione o arquivo</span>
          </label>
          <input
            id="arquivo"
            className="arquivo-input"
            name="arquivo"
            type="file"
            accept=".pdf,application/pdf"
            onChange={selecionarArquivo}
            aria-invalid={Boolean(erros.arquivo)}
            aria-describedby={erros.arquivo ? 'erro-arquivo' : undefined}
            required
          />

          {arquivoSelecionado && (
            <p className="arquivo-selecionado">{arquivoSelecionado.name}</p>
          )}
          {erros.arquivo && <small id="erro-arquivo">{erros.arquivo}</small>}
        </div>

        <div className="acoes-formulario campo-largo">
          <button type="submit">Enviar artigo</button>
          <p className="mensagem-formulario" aria-live="polite">{mensagem}</p>
        </div>
      </form>
    </main>
  )
}

export default Enviar
