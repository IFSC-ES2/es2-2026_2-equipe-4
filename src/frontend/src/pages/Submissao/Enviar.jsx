import { useState } from 'react'
import arquivoImg from '../../assets/arquivo.png'
import './Enviar.css'

const formularioInicial = {
  titulo: '',
  resumo: '',
  tema: '',
  autores: '',
  tecnologias: '',
  linkRepositorio: '',
  linkDemonstracao: '',
}

const mensagensCamposObrigatorios = {
  titulo: 'Informe o título.',
  resumo: 'Informe o resumo.',
  tema: 'Informe o tema do projeto.',
  autores: 'Informe ao menos um autor (separado por vírgula).',
  tecnologias: 'Informe ao menos uma tecnologia (separada por vírgula).',
}

function separarLista(valor) {
  return valor.split(',').map(item => item.trim()).filter(Boolean)
}

function Enviar() {
  const [formulario, setFormulario] = useState(formularioInicial)
  const [imagensSelecionadas, setImagensSelecionadas] = useState([])
  const [arrastando, setArrastando] = useState(false)
  const [erros, setErros] = useState({})
  const [mensagem, setMensagem] = useState('')
  const [carregando, setCarregando] = useState(false)

  const API_BASE_URL = 'http://localhost:8080';

  function limparErro(campo) {
    setErros((errosAtuais) => {
      if (!errosAtuais[campo]) return errosAtuais
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

  function selecionarImagens(event) {
    const arquivos = Array.from(event.target.files || [])
    setImagensSelecionadas(arquivos)
    setMensagem('')
  }

  function arrastarSobre(event) {
    event.preventDefault()
    setArrastando(true)
  }

  function sairDaArea(event) {
    event.preventDefault()
    setArrastando(false)
  }

  function soltarImagens(event) {
    event.preventDefault()
    setArrastando(false)
    const arquivos = Array.from(event.dataTransfer.files || [])
    setImagensSelecionadas(arquivos)
  }

  function validarFormulario() {
    const proximosErros = {}

    Object.entries(mensagensCamposObrigatorios).forEach(([campo, mensagemErro]) => {
      const preenchido = campo === 'autores' || campo === 'tecnologias'
        ? separarLista(formulario[campo]).length > 0
        : Boolean(formulario[campo].trim())

      if (!preenchido) {
        proximosErros[campo] = mensagemErro
      }
    })

    setErros(proximosErros)
    return Object.keys(proximosErros).length === 0
  }

  async function enviarFormulario(event) {
    event.preventDefault()

    if (!validarFormulario()) {
      setMensagem('')
      return
    }

    const token = localStorage.getItem('token');
    if (!token) {
      setMensagem('Erro: Você precisa estar logado para enviar um projeto.');
      return;
    }

    setCarregando(true)
    setMensagem('Processando a submissão...')

    try {
      const idsImagens = [];
      for (const imagem of imagensSelecionadas) {
        const formDataImagem = new FormData();
        formDataImagem.append('arquivo', imagem);

        const respUpload = await fetch(`${API_BASE_URL}/api/v1/projetos/upload`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formDataImagem,
        });

        if (!respUpload.ok) {
          const erroJson = await respUpload.json().catch(() => ({}));
          const msg = typeof erroJson.erro === 'object' ? erroJson.erro.mensagem : (erroJson.erro || 'Erro ao enviar imagem');
          throw new Error(msg);
        }

        const dadosUpload = await respUpload.json();
        if (dadosUpload.id) {
          idsImagens.push(dadosUpload.id);
        }
      }

      const payloadMetadados = {
        titulo: formulario.titulo,
        resumo: formulario.resumo,
        tema: formulario.tema,
        autores: separarLista(formulario.autores),
        tecnologias: separarLista(formulario.tecnologias),
        imagens: idsImagens,
        linkRepositorio: formulario.linkRepositorio,
        linkDemonstracao: formulario.linkDemonstracao,
      }

      const respostaMetadados = await fetch(`${API_BASE_URL}/api/v1/projetos/metadados`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payloadMetadados),
      })

      if (!respostaMetadados.ok) {
        const erroJson = await respostaMetadados.json().catch(() => ({}))
        const msg = typeof erroJson.erro === 'object' ? erroJson.erro.mensagem : (erroJson.erro || `Erro ao salvar dados (Status ${respostaMetadados.status})`);
        throw new Error(msg)
      }

      setMensagem('Sucesso! Projeto submetido e persistido no banco.')
      setFormulario(formularioInicial)
      setImagensSelecionadas([])
      setErros({})
      event.target.reset()

    } catch (erro) {
      if (erro.message.includes('Failed to fetch')) {
        setMensagem('Erro de conexão: A API parece estar fora do ar ou o endpoint não existe.')
      } else {
        setMensagem(`Atenção: ${erro.message}`)
      }
    } finally {
      setCarregando(false)
    }
  }

  return (
    <main id="center" className="pagina-submissao">
      <header className="cabecalho-submissao">
        <p>Nova submissão</p>
        <h1>Submissão de projeto</h1>
      </header>

      <form className="formulario-submissao" onSubmit={enviarFormulario} noValidate>
        <label className={`campo campo-largo ${erros.titulo ? 'campo-com-erro' : ''}`} htmlFor="titulo">
          <span>Título <strong aria-hidden="true">*</strong></span>
          <input
            id="titulo"
            name="titulo"
            type="text"
            value={formulario.titulo}
            onChange={atualizarCampo}
            aria-invalid={Boolean(erros.titulo)}
            required
            disabled={carregando}
          />
          {erros.titulo && <small>{erros.titulo}</small>}
        </label>

        <label className={`campo campo-largo ${erros.resumo ? 'campo-com-erro' : ''}`} htmlFor="resumo">
          <span>Resumo <strong aria-hidden="true">*</strong></span>
          <textarea
            id="resumo"
            name="resumo"
            rows="6"
            value={formulario.resumo}
            onChange={atualizarCampo}
            aria-invalid={Boolean(erros.resumo)}
            required
            disabled={carregando}
          />
          {erros.resumo && <small>{erros.resumo}</small>}
        </label>

        <label className={`campo campo-largo ${erros.tema ? 'campo-com-erro' : ''}`} htmlFor="tema">
          <span>Tema <strong aria-hidden="true">*</strong></span>
          <input
            id="tema"
            name="tema"
            type="text"
            placeholder="Ex: Web, Mobile, Jogos"
            value={formulario.tema}
            onChange={atualizarCampo}
            aria-invalid={Boolean(erros.tema)}
            required
            disabled={carregando}
          />
          {erros.tema && <small>{erros.tema}</small>}
        </label>

        <label className={`campo ${erros.autores ? 'campo-com-erro' : ''}`} htmlFor="autores">
          <span>Autores <strong aria-hidden="true">*</strong></span>
          <input
            id="autores"
            name="autores"
            type="text"
            placeholder="Ex: João, Maria"
            value={formulario.autores}
            onChange={atualizarCampo}
            aria-invalid={Boolean(erros.autores)}
            required
            disabled={carregando}
          />
          {erros.autores && <small>{erros.autores}</small>}
        </label>

        <label className={`campo ${erros.tecnologias ? 'campo-com-erro' : ''}`} htmlFor="tecnologias">
          <span>Tecnologias <strong aria-hidden="true">*</strong></span>
          <input
            id="tecnologias"
            name="tecnologias"
            type="text"
            placeholder="Ex: React, Spring Boot"
            value={formulario.tecnologias}
            onChange={atualizarCampo}
            aria-invalid={Boolean(erros.tecnologias)}
            required
            disabled={carregando}
          />
          {erros.tecnologias && <small>{erros.tecnologias}</small>}
        </label>

        <label className="campo" htmlFor="linkRepositorio">
          <span>Link do Repositório</span>
          <input
            id="linkRepositorio"
            name="linkRepositorio"
            type="text"
            placeholder="https://github.com/..."
            value={formulario.linkRepositorio}
            onChange={atualizarCampo}
            disabled={carregando}
          />
        </label>

        <label className="campo" htmlFor="linkDemonstracao">
          <span>Link de Demonstração</span>
          <input
            id="linkDemonstracao"
            name="linkDemonstracao"
            type="text"
            placeholder="https://..."
            value={formulario.linkDemonstracao}
            onChange={atualizarCampo}
            disabled={carregando}
          />
        </label>

        <div className="campo campo-largo campo-arquivo">
          <span>Imagens (Opcional)</span>
          <label
            className={`enviar ${arrastando ? 'arrastando' : ''} ${carregando ? 'desabilitado' : ''}`}
            htmlFor="imagens"
            onDragOver={carregando ? undefined : arrastarSobre}
            onDragLeave={carregando ? undefined : sairDaArea}
            onDrop={carregando ? undefined : soltarImagens}
          >
            <img src={arquivoImg} className="arquivo" alt="" />
            <strong>Arraste as imagens aqui</strong>
            <span>ou selecione os arquivos</span>
          </label>
          <input
            id="imagens"
            className="arquivo-input"
            name="imagens"
            type="file"
            multiple
            accept="image/*"
            onChange={selecionarImagens}
            disabled={carregando}
          />

          {imagensSelecionadas.length > 0 && (
            <p className="arquivo-selecionado">
              {imagensSelecionadas.length} imagem(ns) selecionada(s).
            </p>
          )}
        </div>

        <div className="acoes-formulario campo-largo">
          <button type="submit" disabled={carregando}>
            {carregando ? 'Enviando...' : 'Enviar projeto'}
          </button>
          <p className="mensagem-formulario" aria-live="polite">
            <strong>{mensagem}</strong>
          </p>
        </div>
      </form>
    </main>
  )
}

export default Enviar
