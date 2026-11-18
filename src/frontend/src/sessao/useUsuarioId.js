import { useEffect, useState } from 'react'
import { API_BASE_URL } from '../config/api'
import { useSessao } from './contextoSessao'

export function useUsuarioId() {
  const { token, invalidarSessao } = useSessao()
  const [identidade, setIdentidade] = useState(null)

  useEffect(() => {
    if (!token) return

    const controlador = new AbortController()
    const { signal } = controlador

    async function buscarIdentidade() {
      try {
        const resposta = await fetch(`${API_BASE_URL}/api/v1/auth/token`, {
          headers: { Authorization: `Bearer ${token}` },
          signal,
        })
        if (signal.aborted) return
        if (resposta.status === 401) invalidarSessao(token)
        if (!resposta.ok) return

        const { userId } = await resposta.json()
        if (!signal.aborted && typeof userId === 'string' && userId) {
          setIdentidade({ token, usuarioId: userId })
        }
      } catch {
        // As páginas públicas continuam disponíveis sem a confirmação da identidade.
      }
    }

    buscarIdentidade()
    return () => controlador.abort()
  }, [token, invalidarSessao])

  return token && identidade?.token === token ? identidade.usuarioId : null
}
