import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MapaProjetos from '../../components/MapaProjetos/MapaProjetos';
import { API_BASE_URL } from '../../config/api';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [status, setStatus] = useState({ tipo: '', mensagem: '' });
  const [projetosMapa, setProjetosMapa] = useState([]);
  const [temaLogin, setTemaLogin] = useState('Todos'); 

  useEffect(() => {
    async function carregarProjetosParaMapa() {
      try {
        const resposta = await fetch(`${API_BASE_URL}/api/v1/projetos?size=100`);
        if (resposta.ok) {
          const dados = await resposta.json();
          setProjetosMapa(dados.content || []);
        }
      } catch (e) {
      }
    }
    carregarProjetosParaMapa();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setCarregando(true);
    setStatus({ tipo: '', mensagem: '' });

    try {
      const resposta = await fetch(`${API_BASE_URL}/api/v1/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: senha }),
      });

      if (!resposta.ok) {
        if (resposta.status === 401 || resposta.status === 404) throw new Error('Credenciais incorretas.');
        const erroJson = await resposta.json().catch(() => ({}));
        throw new Error(erroJson.erro?.mensagem || 'Erro ao realizar login.');
      }

      const dados = await resposta.json();
      localStorage.setItem('token', dados.token);
      setStatus({ tipo: 'sucesso', mensagem: 'Acesso liberado!' });
      setTimeout(() => navigate('/'), 800); 

    } catch (erro) {
      setStatus({ tipo: 'erro', mensagem: erro.message.includes('Failed to fetch') ? 'Sistema offline temporariamente.' : erro.message });
    } finally {
      setCarregando(false);
    }
  };

  return (
    <main className="container-auth-split pagina-animada" style={{ background: '#f8fafc' }}>
      
      <div className="cartao-auth" style={{ border: '1px solid #e2e8f0', boxShadow: '0 10px 30px -10px rgba(0,0,0,0.05)' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: '800', margin: '0 0 8px' }}>Bem-vindo de volta</h1>
          <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>Acesse sua conta para publicar projetos.</p>
        </div>
        
        {status.mensagem && (
          <div className={`status-mensagem ${status.tipo}`} style={{ textAlign: 'center' }}>
            {status.mensagem}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <label className="campo" htmlFor="email">
            <span style={{ fontSize: '13px', color: '#475569' }}>E-mail Institucional ou Pessoal</span>
            <input id="email" type="email" placeholder="nome@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={carregando} />
          </label>

          <label className="campo" htmlFor="senha">
            <span style={{ fontSize: '13px', color: '#475569' }}>Senha de Acesso</span>
            <input id="senha" type="password" placeholder="••••••••" value={senha} onChange={(e) => setSenha(e.target.value)} required disabled={carregando} />
          </label>

          <button type="submit" disabled={carregando} style={{ marginTop: '16px', height: '48px', width: '100%' }}>
            {carregando ? 'Autenticando...' : 'Entrar na Plataforma'}
          </button>
        </form>
      </div>

      <div style={{ flex: 1, minWidth: '300px', maxWidth: '600px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ background: '#ffffff', borderRadius: '16px', padding: '24px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
          <h3 style={{ margin: '0 0 16px', fontSize: '16px', color: '#0f172a' }}>Rede Ativa</h3>
          {projetosMapa.length > 0 ? (
            <MapaProjetos projetos={projetosMapa} temaSelecionado="Todos" />
          ) : (
            <div style={{ textAlign: 'center', padding: '40px 0', color: '#94a3b8', background: '#f8fafc', borderRadius: '8px' }}>
              Carregando conexões da rede...
            </div>
          )}
        </div>
      </div>
      
    </main>
  );
}

export default Login;