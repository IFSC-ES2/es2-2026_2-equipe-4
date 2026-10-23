import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import './index.css';

import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';
import Enviar from './pages/Submissao/Enviar.jsx';
import Login from './pages/Login/Login.jsx';
import Cadastro from './pages/Cadastro/Cadastro.jsx';
import Sobre from './pages/Sobre/Sobre.jsx';
import Projetos from './pages/Projetos/Projetos.jsx';

createRoot(document.getElementById('root')).render(
<StrictMode>
    <BrowserRouter>
      <Header />
      
      <Routes>
        <Route path="/" element={<Sobre />} />
        <Route path="/projetos" element={<Projetos />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/submissao" element={<Enviar />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  </StrictMode>,
);
