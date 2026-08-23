import React from 'react';

const AnimatedTypography = () => {
  return (
    <section className="animated-typography-section" style={{
      padding: '5rem 0',
      backgroundColor: '#f8fafc',
      overflow: 'hidden',
      borderTop: '1px solid #e2e8f0',
      borderBottom: '1px solid #e2e8f0'
    }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          gap: '1rem'
        }}>
          <h2 style={{
            fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
            fontWeight: 900,
            lineHeight: 1.1,
            letterSpacing: '-1.5px',
            margin: 0,
            textTransform: 'uppercase'
          }}>
            <span style={{ color: '#2ecc71', fontWeight: 900 }}>SUSTAINABLE </span>
            <span style={{ color: '#cbd5e1', fontWeight: 800 }}>SOURCING.</span>
          </h2>

          <h2 style={{
            fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
            fontWeight: 900,
            lineHeight: 1.1,
            letterSpacing: '-1.5px',
            margin: 0,
            textTransform: 'uppercase'
          }}>
            <span style={{ color: '#2ecc71', fontWeight: 900 }}>GLOBAL </span>
            <span style={{ color: '#cbd5e1', fontWeight: 800 }}>EXPORT.</span>
          </h2>

          <h2 style={{
            fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
            fontWeight: 900,
            lineHeight: 1.1,
            letterSpacing: '-1.5px',
            margin: 0,
            textTransform: 'uppercase'
          }}>
            <span style={{ color: '#2ecc71', fontWeight: 900 }}>RELIABLE </span>
            <span style={{ color: '#cbd5e1', fontWeight: 800 }}>SUPPLY.</span>
          </h2>
        </div>
      </div>
    </section>
  );
};

export default AnimatedTypography;
