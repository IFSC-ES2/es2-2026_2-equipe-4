import { useState, useMemo } from 'react';
import './MapaProjetos.css';

function MapaProjetos({ projetos, onTemaClick, temaSelecionado = 'Todos' }) {
  const [tooltip, setTooltip] = useState(null);

  const paletaCores = ['#93c5fd', '#fca5a5', '#86efac', '#c4b5fd', '#fcd34d', '#67e8f9', '#f9a8d4', '#d9f99d'];

  const { temasConfig, projetosMapeados } = useMemo(() => {
    const temasUnicos = Array.from(new Set(projetos.map(p => p.tema).filter(Boolean)));
    const config = {};
    
    temasUnicos.forEach((tema, index) => {
      const colunas = 4;
      const linha = Math.floor(index / colunas);
      const coluna = index % colunas;
      
      config[tema] = {
        cor: paletaCores[index % paletaCores.length],
        cx: 150 + (coluna * 220) + (linha % 2 === 0 ? 0 : 60),
        cy: 100 + (linha * 130)
      };
    });

    const hashString = (str) => {
      let hash = 0;
      for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
      return Math.abs(hash);
    };

    const mapeados = projetos.map((p) => {
      const base = config[p.tema];
      if (!base) return p;
      
      const seed1 = hashString(p.id + "x");
      const seed2 = hashString(p.id + "y");
      
      const raioMaximo = 65;
      const offsetX = Math.sin(seed1) * raioMaximo;
      const offsetY = Math.cos(seed2) * raioMaximo;
      
      return { ...p, cor: base.cor, cx: base.cx + offsetX, cy: base.cy + offsetY };
    });

    return { temasConfig: config, projetosMapeados: mapeados };
  }, [projetos]);

  return (
    <div className="mapa-container">
      <p className="mapa-texto-instrucao">
        FineWeb Style: Explorando dados textuais. Clique num tema para isolar os projetos ou clique num ponto para detalhes.
      </p>
      
      <svg className="mapa-svg" viewBox="0 0 1000 450" preserveAspectRatio="xMidYMid meet">
        {projetosMapeados.map((p) => {
          if (!p.cx) return null;
          const isAtivo = temaSelecionado === 'Todos' || temaSelecionado === p.tema;
          
          return (
            <circle 
              key={p.id} 
              className="dot-projeto" 
              cx={p.cx} 
              cy={p.cy} 
              r={tooltip?.id === p.id ? "8" : "4.5"} 
              fill={p.cor} 
              opacity={isAtivo ? "0.8" : "0.05"}
              onMouseEnter={() => setTooltip({ id: p.id, x: p.cx, y: p.cy, texto: p.titulo, tema: p.tema })}
              onMouseLeave={() => setTooltip(null)}
            />
          );
        })}

        {Object.entries(temasConfig).map(([nome, config]) => {
          const isAtivo = temaSelecionado === 'Todos' || temaSelecionado === nome;
          return (
            <g 
              key={nome} 
              className="grupo-tema"
              transform={`translate(${config.cx}, ${config.cy - 20})`}
              onClick={() => onTemaClick && onTemaClick(nome)}
              style={{ opacity: isAtivo ? 1 : 0.3 }}
            >
              <rect x={-(nome.length * 4) - 8} y="-14" width={(nome.length * 8) + 16} height="20" fill={config.cor} rx="2" />
              <text x="0" y="0" textAnchor="middle" style={{ fontSize: '11px', fontWeight: '700', fill: '#0f172a', pointerEvents: 'none' }}>
                {nome}
              </text>
            </g>
          );
        })}
      </svg>

      {tooltip && (
        <div 
          className="mapa-tooltip"
          style={{ left: `${(tooltip.x / 1000) * 100}%`, top: `${(tooltip.y / 450) * 100}%` }}
        >
          <strong>{tooltip.texto}</strong>
          <span style={{ opacity: 0.8 }}>Tema: {tooltip.tema}</span>
        </div>
      )}
    </div>
  );
}

export default MapaProjetos;