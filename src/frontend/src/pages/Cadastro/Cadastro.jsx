import React, { useState } from 'react';
import '../Submissao/Enviar.css';

function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [status, setStatus] = useState({ tipo: '', mensagem: '' });

  const API_BASE_URL = 'http://localhost:8080';

  const handleCadastro = async (e) => {
    e.preventDefault();
    setCarregando(true);
    setStatus({ tipo: '', mensagem: '' });

    try {
      const resposta = await fetch(`${API_BASE_URL}/api/v1/users/createAccount/0.0.1/novousers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome: nome, email: email, password: senha }),
      });

      if (!resposta.ok) {
        let msgErro = 'Erro ao criar conta.';

        if (resposta.status === 409) {
          msgErro = 'Este e-mail já está cadastrado no sistema.';
        } else if (resposta.status === 400) {
          msgErro = 'Campos inválidos. Verifique as informações preenchidas.';
        }
        throw new Error(msgErro);
      }

      setStatus({ tipo: 'sucesso', mensagem: 'Usuário criado com sucesso! Você já pode fazer login.' });

      setNome('');
      setEmail('');
      setSenha('');

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
        <p>Novo Usuário</p>
        <h1>Cadastro</h1>
      </header>

      {status.mensagem && (
        <div style={{ width: 'min(100%, 860px)', margin: '20px auto 0' }} className={`status-mensagem ${status.tipo}`}>
          {status.mensagem}
        </div>
      )}

      <form className="formulario-submissao" onSubmit={handleCadastro}>
        <label className="campo campo-largo" htmlFor="nome">
          <span>Nome Completo <strong aria-hidden="true">*</strong></span>
          <input
            id="nome"
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            disabled={carregando}
          />
        </label>

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
            minLength="6"
          />
        </label>

        <div className="acoes-formulario campo-largo">
          <button type="submit" disabled={carregando}>
            {carregando ? 'Cadastrando...' : 'Criar Conta'}
          </button>
        </div>
      </form>
    </main>
  );
}

export default Cadastro;