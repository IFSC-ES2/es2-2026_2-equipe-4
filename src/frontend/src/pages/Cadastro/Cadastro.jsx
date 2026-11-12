import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../config/api';

function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [status, setStatus] = useState({ tipo: '', mensagem: '' });
  
  const navigate = useNavigate();
  //const API_BASE_URL = 'http://localhost:8080';

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
        throw new Error(resposta.status === 409 ? 'E-mail já está em uso.' : 'Preencha todos os campos corretamente.');
      }

      setStatus({ tipo: 'sucesso', mensagem: 'Conta criada! Redirecionando para login...' });
      setTimeout(() => navigate('/login'), 1500);

    } catch (erro) {
      setStatus({ tipo: 'erro', mensagem: erro.message.includes('Failed to fetch') ? 'Serviço temporariamente indisponível.' : erro.message });
      setCarregando(false);
    }
  };

  return (
    <main className="container-auth-central pagina-animada" style={{ background: '#f8fafc' }}>
      <div className="cartao-auth" style={{ border: '1px solid #e2e8f0', boxShadow: '0 10px 30px -10px rgba(0,0,0,0.05)', maxWidth: '480px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: '800', margin: '0 0 8px' }}>Junte-se à Comunidade</h1>
          <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>Crie sua conta para publicar e interagir com projetos.</p>
        </div>

        {status.mensagem && (
          <div className={`status-mensagem ${status.tipo}`} style={{ textAlign: 'center' }}>
            {status.mensagem}
          </div>
        )}

        <form onSubmit={handleCadastro}>
          <label className="campo" htmlFor="nome">
            <span style={{ fontSize: '13px', color: '#475569' }}>Nome Completo</span>
            <input id="nome" type="text" placeholder="Ex: Maria Oliveira" value={nome} onChange={(e) => setNome(e.target.value)} required disabled={carregando} />
          </label>

          <label className="campo" htmlFor="email">
            <span style={{ fontSize: '13px', color: '#475569' }}>E-mail</span>
            <input id="email" type="email" placeholder="nome@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={carregando} />
          </label>

          <label className="campo" htmlFor="senha">
            <span style={{ fontSize: '13px', color: '#475569' }}>Criar Senha <small style={{ color: '#94a3b8', fontWeight: 'normal' }}>(mín. 6 caracteres)</small></span>
            <input id="senha" type="password" placeholder="••••••••" value={senha} onChange={(e) => setSenha(e.target.value)} required minLength="6" disabled={carregando} />
          </label>

          <button type="submit" disabled={carregando} style={{ marginTop: '16px', height: '48px', width: '100%' }}>
            {carregando ? 'Criando conta...' : 'Registrar'}
          </button>
        </form>
      </div>
    </main>
  );
}

export default Cadastro;