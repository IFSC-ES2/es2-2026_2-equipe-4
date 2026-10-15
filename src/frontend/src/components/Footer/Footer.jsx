import React from 'react';

function Footer() {
  return (
    <footer style={{ borderTop: '1px solid #dbe2e8', padding: '24px', textAlign: 'center', marginTop: '40px' }}>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', fontSize: '14px', color: '#657786' }}>
        <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Política de Privacidade</a>
        <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Termos de Uso</a>
      </div>
    </footer>
  );
}

export default Footer;