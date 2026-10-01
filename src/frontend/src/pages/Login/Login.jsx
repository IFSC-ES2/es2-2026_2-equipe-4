import React, { useState } from 'react';
import '../Submissao/Enviar.css';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [status, setStatus] = useState({ tipo: '', mensagem: '' });

  const API_BASE_URL = 'http://localhost:8080';

  const handleLogin = async (e) => {
    e.preventDefault();
    setCarregando(true);
    setStatus({ tipo: '', mensagem: '' });

    try {
      const resposta = await fetch(`${API_BASE_URL}/api/v1/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: senha }),
      });

      if (!resposta.ok) {
        const erroJson = await resposta.json().catch(() => ({}));
        let msgErro = 'Erro ao realizar login.';

        if (resposta.status === 401) {
          msgErro = erroJson.erro?.mensagem || 'E-mail ou senha incorretos.';
        } else if (resposta.status === 400) {
          msgErro = 'Dados inválidos. Verifique o e-mail e a senha.';
        }
        throw new Error(msgErro);
      }

      const dados = await resposta.json();

      localStorage.setItem('token', dados.token);

      setStatus({ tipo: 'sucesso', mensagem: 'Login realizado com sucesso!' });

    } catch (erro) {
      if (erro.message.includes('Failed to fetch')) {
        setStatus({ tipo: 'erro', mensagem: 'Erro de conexão: A API parece estar fora do ar.' });
      } else {
        setStatus({ tipo: 'erro', mensagem: erro.message });
      }
    } finally {
      setCarregando(false);
    }
  };

  return (
    <main className="pagina-submissao">
      <header className="cabecalho-submissao">
        <p>Acesso ao Sistema</p>
        <h1>Login</h1>
      </header>

      {status.mensagem && (
        <div style={{ width: 'min(100%, 860px)', margin: '20px auto 0' }} className={`status-mensagem ${status.tipo}`}>
          {status.mensagem}
        </div>
      )}

      <form className="formulario-submissao" onSubmit={handleLogin}>
        <label className="campo campo-largo" htmlFor="email">
          <span>E-mail <strong aria-hidden="true">*</strong></span>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={carregando}
          />
        </label>

        <label className="campo campo-largo" htmlFor="senha">
          <span>Senha <strong aria-hidden="true">*</strong></span>
          <input
            id="senha"
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            disabled={carregando}
          />
        </label>

        <div className="acoes-formulario campo-largo">
          <button type="submit" disabled={carregando}>
            {carregando ? 'Acessando...' : 'Entrar'}
          </button>
        </div>
      </form>
    </main>
  );
}

export default Login;
