/*

tem como objetivo definir a URL base da API em um único lugar.
Facilita a manutenção e a atualização da URL da API.

*/


const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'

export const API_BASE_URL = apiBaseUrl.replace(/\/$/, '')
