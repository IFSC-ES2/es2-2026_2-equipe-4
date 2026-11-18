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
      </div>
    </footer>
  );
}

export default Footer;