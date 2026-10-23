import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [status, setStatus] = useState({ tipo: '', mensagem: '' });
  
  const navigate = useNavigate();
  const API_BASE_URL = 'http://localhost:8080';

  const handleCadastro = async (e) => {
    e.preventDefault();
    setCarregando(true);
    setStatus({ tipo: '', mensagem: '' });

    try {
      const resposta = await fetch(`${API_BASE_URL}/api/v1/users/createAccount/0.0.1/novousers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, password: senha }),
      });

      if (!resposta.ok) {
        throw new Error(resposta.status === 409 ? 'E-mail já cadastrado.' : 'Campos inválidos.');
      }

      setStatus({ tipo: 'sucesso', mensagem: 'Conta criada! A redirecionar...' });

      setNome('');
      setEmail('');
      setSenha('');
     
      setTimeout(() => navigate('/login'), 1500);

    } catch (erro) {
      setStatus({ tipo: 'erro', mensagem: erro.message.includes('Failed to fetch') ? 'Erro de conexão. Tente novamente!' : erro.message });
    } finally {
      setCarregando(false);
    }
  };

  return (
    <main className="container-auth-central pagina-animada">
      <div className="cartao-auth">
        <h1>Criar conta</h1>

        {status.mensagem && (
          <div className={`status-mensagem ${status.tipo}`} style={{ padding: '10px', fontSize: '14px', marginBottom: '16px' }}>
            {status.mensagem}
          </div>
        )}

        <form onSubmit={handleCadastro}>
          <label className="campo" htmlFor="nome">
            <span>Nome completo <strong aria-hidden="true">*</strong></span>
            <input id="nome" type="text" value={nome} onChange={(e) => setNome(e.target.value)} required disabled={carregando} />
          </label>

          <label className="campo" htmlFor="email">
            <span>E-mail <strong aria-hidden="true">*</strong></span>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={carregando} />
          </label>

          <label className="campo" htmlFor="senha">
            <span>Senha <strong aria-hidden="true">*</strong></span>
            <input id="senha" type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required minLength="6" disabled={carregando} />
          </label>

          <button type="submit" disabled={carregando} style={{ marginTop: '8px' }}>
            {carregando ? 'A criar...' : 'Continuar'}
          </button>
        </form>
      </div>
    </main>
  );
}

export default Cadastro;
