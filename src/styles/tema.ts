export const tema = {
  cores: {
    primaria: '#8B4A8B',
    primariaEscura: '#7A3E7A',
    primariaClara: '#A855A8',
    gradientePrimario: 'linear-gradient(135deg, #8B4A8B 0%, #A855A8 100%)',
    gradientePrimarioHover: 'linear-gradient(135deg, #7A3E7A 0%, #9333EA 100%)',
    
    secundaria: '#007bff',
    
    texto: {
      primario: '#333',
      secundario: '#666',
      terciario: '#999',
      branco: '#ffffff',
    },
    
    fundo: {
      branco: '#ffffff',
      claro: '#f8f9fa',
      cinza: '#f0f0f0',
      card: '#ffffff',
    },
    
    borda: {
      clara: '#e5e5e5',
      media: '#ddd',
      escura: '#f0f0f0',
    },
    
    botao: {
      hover: '#f0f0f0',
      ativo: '#e0e0e0',
    },
    
    carrinho: {
      fundo: '#2d2d2d',
      item: '#3d3d3d',
      controles: '#4d4d4d',
      display: '#5d5d5d',
      overlay: 'rgba(0, 0, 0, 0.5)',
      preco: '#a3e635',
      remover: '#ef4444',
    },
    
    tag: {
      protecao: {
        bg: '#E3F2FD',
        texto: '#1976D2',
      },
      rosto: {
        bg: '#FCE4EC',
        texto: '#C2185B',
      },
    },
    
    promocao: '#ff6b6b',
    
    sombra: {
      clara: 'rgba(0, 0, 0, 0.1)',
      media: 'rgba(0, 0, 0, 0.08)',
      escura: 'rgba(0, 0, 0, 0.12)',
      primaria: 'rgba(139, 74, 139, 0.3)',
      primariaHover: 'rgba(139, 74, 139, 0.4)',
    },
  },
  
  espacamento: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
  },
  
  raioBorda: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    xxl: '20px',
    redondo: '50%',
    pilula: '25px',
  },
  
  tamanhoFonte: {
    xs: '0.7rem',
    sm: '0.85rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '4rem',
  },
  
  pesoFonte: {
    normal: 400,
    medio: 500,
    semibold: 600,
    bold: 700,
  },
  
  alturaLinha: {
    justa: 1.1,
    normal: 1.3,
    relaxada: 1.4,
    solta: 1.5,
  },
  
  pontosQuebra: {
    sm: '480px',
    md: '768px',
    lg: '1024px',
    xl: '1200px',
  },
  
  transicoes: {
    rapida: '0.2s ease',
    normal: '0.3s ease',
    lenta: '0.6s ease',
  },
  
  sombras: {
    sm: '0 2px 4px rgba(0, 0, 0, 0.1)',
    md: '0 4px 12px rgba(0, 0, 0, 0.08)',
    lg: '0 8px 24px rgba(0, 0, 0, 0.12)',
    primaria: '0 4px 16px rgba(139, 74, 139, 0.3)',
    primariaHover: '0 8px 24px rgba(139, 74, 139, 0.4)',
    carrinho: '0 10px 30px rgba(0, 0, 0, 0.3)',
  },
  
  zIndex: {
    dropdown: 100,
    modal: 1000,
    tooltip: 2000,
  },
} as const;

export type Tema = typeof tema;

export const media = {
  sm: `@media (max-width: ${tema.pontosQuebra.sm})`,
  md: `@media (max-width: ${tema.pontosQuebra.md})`,
  lg: `@media (max-width: ${tema.pontosQuebra.lg})`,
  xl: `@media (max-width: ${tema.pontosQuebra.xl})`,
} as const;