import React, { useState } from 'react';
import './MapaProjetos.css';

function MapaProjetos({ projetos, onTemaClick, temaSelecionado = 'Todos' }) {
  const [tooltip, setTooltip] = useState(null);

  const configTemas = {
    'Web': { cor: '#78b4f2', cx: 150, cy: 220 },
    'Mobile': { cor: '#f27fc4', cx: 380, cy: 100 },
    'IA e Dados': { cor: '#7bd67a', cx: 780, cy: 220 },
    'Jogos': { cor: '#a9b1d6', cx: 550, cy: 250 },
    'IoT': { cor: '#f5a67c', cx: 650, cy: 340 },
    'Segurança': { cor: '#e3bd4b', cx: 300, cy: 320 },
    'Ferramentas': { cor: '#5fd0c2', cx: 850, cy: 90 },
    'Outros': { cor: '#ccc', cx: 500, cy: 400 }
  };

  const projetosMapeados = projetos.map((p, index) => {
    const tema = configTemas[p.tema] || configTemas['Outros'];
    // Espalha os pontos matematicamente para não ficarem sobrepostos
    const offsetX = Math.sin(index * 123) * 60;
    const offsetY = Math.cos(index * 321) * 40;
    return { ...p, cor: tema.cor, cx: tema.cx + offsetX, cy: tema.cy + offsetY };
  });

  return (
    <div className="mapa-container">
      <p className="mapa-texto-instrucao">
        Cada ponto é um projeto e cada cor, um tema. Passe o mouse no ponto para ver o projeto; clique no nome do tema para filtrar.
      </p>
      
      <svg className="mapa-svg" viewBox="0 0 1000 440" role="img" aria-label="Mapa de projetos por tema">
        {Object.entries(configTemas).map(([nome, config]) => nome !== 'Outros' && (
           <g 
             key={nome} 
             className="grupo-tema"
             transform={`translate(${config.cx - 40}, ${config.cy - 10})`}
             onClick={() => onTemaClick && onTemaClick(nome)}
           >
             <rect x="-10" y="-15" width="100" height="25" fill={config.cor} rx="4" opacity="0.8"/>
             <text x="40" y="2" textAnchor="middle" style={{ fontSize: '14px', fontWeight: 'bold', fill: '#111', pointerEvents: 'none' }}>
               {nome}
             </text>
           </g>
        ))}
        
        {projetosMapeados.map((p) => {
          // Esmaece os pontos que não pertencem ao tema selecionado
          const isAtivo = temaSelecionado === 'Todos' || temaSelecionado === p.tema;
          
          return (
            <circle 
              key={p.id} 
              className="dot-projeto" 
              cx={p.cx} 
              cy={p.cy} 
              r={tooltip?.id === p.id ? "10" : "6.5"} 
              fill={p.cor} 
              stroke="#fff" 
              strokeWidth="1.5" 
              opacity={isAtivo ? "0.9" : "0.15"}
              onMouseEnter={() => setTooltip({ id: p.id, x: p.cx, y: p.cy, texto: p.titulo, tema: p.tema })}
              onMouseLeave={() => setTooltip(null)}
            />
          );
        })}
      </svg>

      {/* Tooltip HTML Posicionado sobre o SVG */}
      {tooltip && (
        <div 
          className="mapa-tooltip"
          style={{ 
            left: `${(tooltip.x / 1000) * 100}%`, 
            top: `${(tooltip.y / 440) * 100}%` 
          }}
        >
          <strong>{tooltip.texto}</strong> <span style={{ opacity: 0.8, fontWeight: 'normal' }}>({tooltip.tema})</span>
        </div>
      )}
    </div>
  );
}

export default MapaProjetos;