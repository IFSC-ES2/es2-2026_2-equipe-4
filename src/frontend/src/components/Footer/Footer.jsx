function Footer() {
  return (
    <footer style={{ 
      borderTop: '1px solid #e2e8f0', 
      padding: '32px 24px', 
      backgroundColor: '#ffffff',
      marginTop: 'auto'
    }}>
      <div style={{ 
        maxWidth: '1140px', 
        margin: '0 auto',
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div style={{ color: '#0f172a', fontWeight: '700', fontSize: '15px' }}>
          Publica<span style={{ color: '#146c5a' }}>IFSC</span>
        </div>
        <div style={{ display: 'flex', gap: '24px', fontSize: '13px', color: '#64748b', fontWeight: '500' }}>
          <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Política de Privacidade</a>
          <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Termos de Serviço</a>
          <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Diretrizes da Comunidade</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;