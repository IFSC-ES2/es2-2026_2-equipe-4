import { useCallback, useEffect, useState } from 'react'
import { ContextoSessao } from './contextoSessao'

const chaveToken = 'token'
const sessaoEncerrada = { token: null, expiraEm: 0, expirada: false }

function lerSessao(token) {
  if (!token) return sessaoEncerrada

  let expiraEm = 0
  try {
    const partes = token.split('.')
    if (partes.length === 3 && partes.every(Boolean)) {
      const payload = partes[1].replace(/-/g, '+').replace(/_/g, '/')
      const { exp } = JSON.parse(atob(payload))
      if (Number.isFinite(exp)) expiraEm = exp * 1000
    }
  } catch {
    // Tokens inválidos também exigem um novo login.
  }

  return { token, expiraEm, expirada: expiraEm <= Date.now() }
}

export default function ProvedorSessao({ children }) {
  const [sessao, setSessao] = useState(() => lerSessao(localStorage.getItem(chaveToken)))

  const invalidarSessao = useCallback((token) => {
    if (localStorage.getItem(chaveToken) !== token) return false
    localStorage.removeItem(chaveToken)
    setSessao({ ...sessaoEncerrada, expirada: true })
    return true
  }, [])

  useEffect(() => {
    function sincronizar(evento) {
      if (evento.storageArea === localStorage && (evento.key === chaveToken || evento.key === null)) {
        setSessao(lerSessao(localStorage.getItem(chaveToken)))
      }
    }

    window.addEventListener('storage', sincronizar)
    return () => window.removeEventListener('storage', sincronizar)
  }, [])

  useEffect(() => {
    const { token, expiraEm, expirada } = sessao
    if (!token) return

    if (expirada) {
      if (localStorage.getItem(chaveToken) === token) localStorage.removeItem(chaveToken)
      return
    }

    let temporizador
    function agendarExpiracao() {
      const restante = expiraEm - Date.now()
      if (restante <= 0) {
        invalidarSessao(token)
        return
      }
      temporizador = setTimeout(agendarExpiracao, Math.min(restante, 2_147_483_647))
    }

    agendarExpiracao()
    return () => clearTimeout(temporizador)
  }, [sessao, invalidarSessao])

  function iniciarSessao(token) {
    const proximaSessao = lerSessao(token)
    if (!proximaSessao.token || proximaSessao.expirada) return false
    localStorage.setItem(chaveToken, token)
    setSessao(proximaSessao)
    return true
  }

  function encerrarSessao() {
    localStorage.removeItem(chaveToken)
    setSessao(sessaoEncerrada)
  }

  const valor = {
    token: sessao.expirada ? null : sessao.token,
    expiraEm: sessao.expiraEm,
    expirada: sessao.expirada,
    iniciarSessao,
    encerrarSessao,
    invalidarSessao,
  }

  return <ContextoSessao.Provider value={valor}>{children}</ContextoSessao.Provider>
}
