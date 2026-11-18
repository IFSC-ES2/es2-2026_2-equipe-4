import { createContext, useContext } from 'react'

export const ContextoSessao = createContext(null)

export function useSessao() {
  return useContext(ContextoSessao)
}
