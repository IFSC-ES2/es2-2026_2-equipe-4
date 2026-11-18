export function criarTokenTeste(exp = Math.floor(Date.now() / 1000) + 3600) {
  const payload = btoa(JSON.stringify({ exp })).replace(/=+$/, '')
  return `eyJhbGciOiJIUzI1NiJ9.${payload}.assinatura-teste`
}
