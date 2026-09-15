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

function Enviar() {
  const [formulario, setFormulario] = useState(formularioInicial)
  const [arquivoSelecionado, setArquivoSelecionado] = useState(null)
  const [arrastando, setArrastando] = useState(false)

  function atualizarCampo(event) {
    const { name, value } = event.target

    setFormulario((camposAtuais) => ({
      ...camposAtuais,
      [name]: value,
    }))
  }

  function selecionarArquivo(event) {
    setArquivoSelecionado(event.target.files[0] ?? null)
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
    setArquivoSelecionado(event.dataTransfer.files[0] ?? null)
  }

  function enviarFormulario(event) {
    event.preventDefault()
  }

  return (
    <main id="center" className="pagina-submissao">
      <header className="cabecalho-submissao">
        <p>Nova submissão</p>
        <h1>Submissão de artigo</h1>
      </header>

      <form className="formulario-submissao" onSubmit={enviarFormulario} noValidate>
        <label className="campo campo-largo" htmlFor="titulo">
          <span>Título <strong aria-hidden="true">*</strong></span>
          <input
            id="titulo"
            name="titulo"
            type="text"
            value={formulario.titulo}
            onChange={atualizarCampo}
            required
          />
        </label>

        <label className="campo campo-largo" htmlFor="resumo">
          <span>Resumo <strong aria-hidden="true">*</strong></span>
          <textarea
            id="resumo"
            name="resumo"
            rows="6"
            value={formulario.resumo}
            onChange={atualizarCampo}
            required
          />
        </label>

        <label className="campo" htmlFor="autores">
          <span>Autores <strong aria-hidden="true">*</strong></span>
          <input
            id="autores"
            name="autores"
            type="text"
            value={formulario.autores}
            onChange={atualizarCampo}
            required
          />
        </label>

        <label className="campo" htmlFor="palavrasChave">
          <span>Palavras-chave <strong aria-hidden="true">*</strong></span>
          <input
            id="palavrasChave"
            name="palavrasChave"
            type="text"
            value={formulario.palavrasChave}
            onChange={atualizarCampo}
            required
          />
        </label>

        <label className="campo campo-largo" htmlFor="areaConhecimento">
          <span>Área do conhecimento <strong aria-hidden="true">*</strong></span>
          <input
            id="areaConhecimento"
            name="areaConhecimento"
            type="text"
            value={formulario.areaConhecimento}
            onChange={atualizarCampo}
            required
          />
        </label>

        <div className="campo campo-largo campo-arquivo">
          <span>Anexo em PDF <strong aria-hidden="true">*</strong></span>
          <label
            className={`enviar ${arrastando ? 'arrastando' : ''}`}
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
            required
          />

          {arquivoSelecionado && (
            <p className="arquivo-selecionado">{arquivoSelecionado.name}</p>
          )}
        </div>

        <div className="acoes-formulario campo-largo">
          <button type="submit">Enviar artigo</button>
        </div>
      </form>
    </main>
  )
}

export default Enviar
