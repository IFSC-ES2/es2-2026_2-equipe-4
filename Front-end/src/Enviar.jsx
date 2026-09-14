import { useRef, useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import arquivo from './assets/arquivo.png'
import './Enviar.css'

function Enviar() {
    const [arquivos, setArquivos] = useState([])
    const [arrastando, setArrastando] = useState(false)

    const fileInputRef = useRef(null)

    // Colocar o endpoint da API aqui
    const API_ENDPOINT = ''

    function abrirSeletor() {
        fileInputRef.current.click()
    }

        function selecionarArquivos(event) {
        const arquivosSelecionados = Array.from(event.target.files)

        if (arquivosSelecionados.length > 0) {
            setArquivos(arquivosSelecionados)
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

    function soltarArquivos(event) {
        event.preventDefault()
        setArrastando(false)

        const arquivosSoltos = Array.from(event.dataTransfer.files)

        if (arquivosSoltos.length > 0) {
            setArquivos(arquivosSoltos)
        }
    }

    async function enviarArquivos() {
        if (arquivos.length === 0) {
            return
        }

        /*
         * Quando a API estiver pronta:
         *
         * const formData = new FormData()
         *
         * arquivos.forEach((arquivo) => {
         *     formData.append('files', arquivo)
         * })
         *
         * await fetch(API_ENDPOINT, {
         *     method: 'POST',
         *     body: formData
         * })
         */
    }


    return (
        <section id="center">
                <h3>Enviador de Arquivos</h3>
            <div className={`enviar ${arrastando ? 'arrastando' : ''}`} role="button" tabIndex="0" aria-label="Área para envio de arquivos" onDragOver={arrastarSobre} onDragLeave={sairDaArea} onDrop={soltarArquivos} onClick={abrirSeletor}>
                <img src={arquivo} className="arquivo" alt="Arquivo"/>
                <h2>Puxe um arquivo para adicioná-lo</h2>
                <span>Ou escolha seus arquivos</span>
                <input ref={fileInputRef} id="fileInput" type="file" multiple hidden onChange={selecionarArquivos}/>
            </div>
            {arquivos.length > 0 && (
                <div className="arquivos-selecionados">
                    <h4> {arquivos.length === 1 ? 'Arquivo selecionado:' : 'Arquivos selecionados:'}</h4>
                    {arquivos.map((arquivo, index) => ( <p key={index}> {arquivo.name} </p> ))}
                    <button onClick={enviarArquivos}>Enviar arquivos</button>
                </div>
            )}
        </section>
    )
}


export default Enviar