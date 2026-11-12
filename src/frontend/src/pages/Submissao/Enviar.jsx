import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import arquivoImg from '../../assets/arquivo.png'
import './Enviar.css'
import { API_BASE_URL } from '../../config/api';

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
  autores: 'Informe ao menos um autor.',
  tecnologias: 'Informe ao menos uma tecnologia.',
}

function separarLista(valor) {
  return valor.split(',').map(item => item.trim()).filter(Boolean)
}

// Lê a mensagem de erro enviada pela API ({ erro: "..." } ou { erro: { mensagem: "..." } });
// se a resposta não trouxer uma, usa a mensagem padrão.
async function mensagemDeErro(resposta, padrao) {
  const corpo = await resposta.json().catch(() => ({}))
  const erro = corpo?.erro
  return (typeof erro === 'object' ? erro?.mensagem : erro) || padrao
}

function Enviar() {
  const [formulario, setFormulario] = useState(formularioInicial)
  const [imagensSelecionadas, setImagensSelecionadas] = useState([])
  const [arrastando, setArrastando] = useState(false)
  const [erros, setErros] = useState({})
  const [mensagem, setMensagem] = useState('')
  const [carregando, setCarregando] = useState(false)

  const navigate = useNavigate()
  //const API_BASE_URL = 'http://localhost:8080'

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
    }
  }, [navigate])

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

      if (!preenchido) proximosErros[campo] = mensagemErro
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

    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
      return
    }

    setCarregando(true)
    setMensagem('Processando a submissão, aguarde...')

    try {
      const idsImagens = []
      for (const imagem of imagensSelecionadas) {
        const formDataImagem = new FormData()
        formDataImagem.append('arquivo', imagem)

        const respUpload = await fetch(`${API_BASE_URL}/api/v1/projetos/upload`, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` },
          body: formDataImagem,
        })

        if (!respUpload.ok) throw new Error(await mensagemDeErro(respUpload, 'Falha ao processar imagens.'))
        
        const dadosUpload = await respUpload.json()
        if (dadosUpload.id) idsImagens.push(dadosUpload.id)
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

      if (!respostaMetadados.ok) throw new Error(await mensagemDeErro(respostaMetadados, 'Erro ao salvar os metadados do projeto.'))

      setMensagem('Projeto publicado com sucesso na vitrine!')
      setFormulario(formularioInicial)
      setImagensSelecionadas([])
      setErros({})
      event.target.reset()

    } catch (erro) {
      setMensagem(erro.message.includes('Failed to fetch') ? 'Erro de conexão: Sistema fora do ar!' : erro.message)
    } finally {
      setCarregando(false)
    }
  }

  return (
    <main className="pagina-submissao" style={{ background: '#f8fafc', paddingBottom: '60px' }}>
      <header className="cabecalho-submissao" style={{ background: 'transparent', padding: '60px 24px 20px', borderBottom: 'none' }}>
        <p style={{ color: '#146c5a' }}>Área do Criador</p>
        <h1>Publicar Novo Projeto</h1>
      </header>

      <form className="formulario-submissao" onSubmit={enviarFormulario} style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)', padding: '40px' }} noValidate>
        
        <div className="campo-largo" style={{ marginBottom: '16px', borderBottom: '1px solid #f1f5f9', paddingBottom: '16px' }}>
          <h3 style={{ margin: 0, fontSize: '18px', color: '#0f172a' }}>Informações Básicas</h3>
          <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#64748b' }}>Estes dados ficarão visíveis na vitrine principal.</p>
        </div>

        <label className={`campo campo-largo ${erros.titulo ? 'campo-com-erro' : ''}`} htmlFor="titulo">
          <span>Nome do Projeto <strong>*</strong></span>
          <input id="titulo" name="titulo" type="text" placeholder="Ex: Sistema de Gestão Acadêmica" value={formulario.titulo} onChange={atualizarCampo} required disabled={carregando} />
          {erros.titulo && <small>{erros.titulo}</small>}
        </label>

        <label className={`campo campo-largo ${erros.resumo ? 'campo-com-erro' : ''}`} htmlFor="resumo">
          <span>Resumo e Objetivos <strong>*</strong></span>
          <textarea id="resumo" name="resumo" rows="4" placeholder="Descreva o problema que o projeto resolve e suas principais funcionalidades..." value={formulario.resumo} onChange={atualizarCampo} required disabled={carregando} />
          {erros.resumo && <small>{erros.resumo}</small>}
        </label>

        <label className={`campo ${erros.tema ? 'campo-com-erro' : ''}`} htmlFor="tema">
          <span>Área / Tema <strong>*</strong></span>
          <input id="tema" name="tema" type="text" placeholder="Ex: Web, Inteligência Artificial, Jogos" value={formulario.tema} onChange={atualizarCampo} required disabled={carregando} />
          {erros.tema && <small>{erros.tema}</small>}
        </label>

        <label className={`campo ${erros.tecnologias ? 'campo-com-erro' : ''}`} htmlFor="tecnologias">
          <span>Stack Tecnológica <strong>*</strong></span>
          <input id="tecnologias" name="tecnologias" type="text" placeholder="Ex: React, Node.js, PostgreSQL (Separe por vírgulas)" value={formulario.tecnologias} onChange={atualizarCampo} required disabled={carregando} />
          {erros.tecnologias && <small>{erros.tecnologias}</small>}
        </label>

        <label className={`campo campo-largo ${erros.autores ? 'campo-com-erro' : ''}`} htmlFor="autores">
          <span>Autores / Equipe <strong>*</strong></span>
          <input id="autores" name="autores" type="text" placeholder="Ex: Ana Silva, João Souza" value={formulario.autores} onChange={atualizarCampo} required disabled={carregando} />
          {erros.autores && <small>{erros.autores}</small>}
        </label>

        <div className="campo-largo" style={{ margin: '24px 0 16px', borderBottom: '1px solid #f1f5f9', paddingBottom: '16px' }}>
          <h3 style={{ margin: 0, fontSize: '18px', color: '#0f172a' }}>Links e Mídia</h3>
          <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#64748b' }}>Forneça acesso ao código fonte e demonstrações visuais.</p>
        </div>

        <label className="campo" htmlFor="linkRepositorio">
          <span>Repositório de Código</span>
          <input id="linkRepositorio" name="linkRepositorio" type="url" placeholder="https://github.com/..." value={formulario.linkRepositorio} onChange={atualizarCampo} disabled={carregando} />
        </label>

        <label className="campo" htmlFor="linkDemonstracao">
          <span>URL de Demonstração (Live)</span>
          <input id="linkDemonstracao" name="linkDemonstracao" type="url" placeholder="https://..." value={formulario.linkDemonstracao} onChange={atualizarCampo} disabled={carregando} />
        </label>

        <div className="campo campo-largo campo-arquivo">
          <span>Screenshots do Projeto</span>
          <label
            className={`enviar ${arrastando ? 'arrastando' : ''} ${carregando ? 'desabilitado' : ''}`}
            htmlFor="imagens"
            onDragOver={carregando ? undefined : arrastarSobre}
            onDragLeave={carregando ? undefined : sairDaArea}
            onDrop={carregando ? undefined : soltarImagens}
            style={{ padding: '32px', background: '#f8fafc', border: '2px dashed #cbd5e1' }}
          >
            <div style={{ fontSize: '32px', marginBottom: '12px', opacity: 0.5 }}>📸</div>
            <strong style={{ color: '#0f172a' }}>Clique para selecionar imagens</strong>
            <span style={{ color: '#64748b' }}>ou arraste e solte arquivos aqui (PNG, JPG)</span>
          </label>
          <input id="imagens" className="arquivo-input" name="imagens" type="file" multiple accept="image/*" onChange={selecionarImagens} disabled={carregando} />
          
          {imagensSelecionadas.length > 0 && (
            <div style={{ marginTop: '12px', background: '#eef6f3', color: '#146c5a', padding: '12px', borderRadius: '6px', fontSize: '13px', fontWeight: '600' }}>
              ✓ {imagensSelecionadas.length} arquivo(s) anexado(s) e prontos para envio.
            </div>
          )}
        </div>

        <div className="acoes-formulario campo-largo" style={{ marginTop: '16px' }}>
          <button type="submit" disabled={carregando} style={{ width: '100%', height: '52px', fontSize: '16px' }}>
            {carregando ? 'Processando e publicando...' : 'Publicar Projeto na Vitrine'}
          </button>
          
          {mensagem && (
            <div style={{ marginTop: '16px', padding: '16px', borderRadius: '8px', background: mensagem.includes('sucesso') ? '#f0fdf4' : '#fef2f2', color: mensagem.includes('sucesso') ? '#15803d' : '#b91c1c', border: `1px solid ${mensagem.includes('sucesso') ? '#bbf7d0' : '#fecaca'}`, textAlign: 'center', fontWeight: '500', fontSize: '14px' }}>
              {mensagem}
            </div>
          )}
        </div>
      </form>
    </main>
  )
}

export default Enviar