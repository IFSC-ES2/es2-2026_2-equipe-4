import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MapaProjetos from '../../components/MapaProjetos/MapaProjetos';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [status, setStatus] = useState({ tipo: '', mensagem: '' });
  const [projetosMapa, setProjetosMapa] = useState([]);
  const [temaLogin, setTemaLogin] = useState('Todos'); 
  
  const navigate = useNavigate();
  const API_BASE_URL = 'http://localhost:8080';

  useEffect(() => {
    async function carregarProjetosParaMapa() {
      try {
        const resposta = await fetch(`${API_BASE_URL}/api/v1/projetos`);
        if (resposta.ok) {
          const dados = await resposta.json();
          setProjetosMapa(dados);
        }
      } catch (e) {
        console.log("A API ainda não está ligada para carregar o mapa.");
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
        // Se a resposta for 401 ou 404, tratamos como conta inexistente ou credenciais erradas
        if (resposta.status === 401 || resposta.status === 404) {
          throw new Error('Esta conta não existe ou a senha está incorreta.');
        }
        
        const erroJson = await resposta.json().catch(() => ({}));
        throw new Error(erroJson.erro?.mensagem || 'Erro ao realizar login.');
      }

      const dados = await resposta.json();
      localStorage.setItem('token', dados.token);
      setStatus({ tipo: 'sucesso', mensagem: 'Login realizado com sucesso!' });
      setTimeout(() => navigate('/'), 1000); 

    } catch (erro) {
      const mensagemErro = erro.message.includes('Failed to fetch') 
        ? 'Erro de conexão: A API parece estar fora do ar.' 
        : erro.message;
        
      setStatus({ tipo: 'erro', mensagem: mensagemErro });
    } finally {
      setCarregando(false);
    }
  };

  return (
    <main className="container-auth-split pagina-animada">
      
      {/* Esquerda: O Cartão Compacto Estilo Amazon */}
      <div className="cartao-auth">
        <h1>Fazer login</h1>
        
        {status.mensagem && (
          <div className={`status-mensagem ${status.tipo}`}>
            {status.mensagem}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <label className="campo" htmlFor="email">
            <span>E-mail <strong aria-hidden="true">*</strong></span>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={carregando} />
          </label>

          <label className="campo" htmlFor="senha">
            <span>Senha <strong aria-hidden="true">*</strong></span>
            <input id="senha" type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required disabled={carregando} />
          </label>

          <button type="submit" disabled={carregando} style={{ marginTop: '8px' }}>
            {carregando ? 'A aguardar...' : 'Entrar'}
          </button>
        </form>
      </div>

      <div style={{ flex: 1, minWidth: '300px', maxWidth: '600px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {projetosMapa.length > 0 ? (
          <MapaProjetos 
            projetos={projetosMapa} 
            temaSelecionado={temaLogin} 
            onTemaClick={setTemaLogin} 
          />
        ) : (
          <div style={{ 
            textAlign: 'center', 
            color: '#94a3b8', 
            padding: '40px', 
            border: '2px dashed #e2e8f0', 
            borderRadius: '12px',
            background: 'rgba(255,255,255,0.5)'
          }}>
            <div style={{ fontSize: '40px', marginBottom: '16px' }}>🗺️</div>
            <h3 style={{ color: '#475569', margin: '0 0 8px 0' }}>Vitrine em construção</h3>
            <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.5' }}>
              O mapa interativo aparecerá aqui assim que os primeiros projetos forem submetidos no banco de dados.
            </p>
          </div>
        )}
      </div>
      
    </main>
  );
}

export default Login;