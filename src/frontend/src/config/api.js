/*

tem como objetivo definir a URL base da API em um único lugar.
Facilita a manutenção e a atualização da URL da API.

*/


const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'

export const API_BASE_URL = apiBaseUrl.replace(/\/$/, '')

// `imagens` de um projeto guarda o caminho de uma imagem padrão (servida pelo front-end,
// ex.: /imagens-padrao/...) ou o ID de um arquivo enviado, que a API devolve na rota abaixo.
export function urlImagem(imagem) {
  if (imagem.startsWith('/')) {
    return imagem
  }
  return `${API_BASE_URL}/api/v1/projetos/imagens/${imagem}`
}
