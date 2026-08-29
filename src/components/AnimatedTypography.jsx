import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AnimatedTypography = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    
    // Select all the text lines
    const textLines = gsap.utils.toArray('.animated-line', el);

    // Animate each line from grey to green as it enters the viewport
    textLines.forEach((line) => {
      gsap.to(line, {
        scrollTrigger: {
          trigger: line,
          start: "top 80%", // When the top of the text hits 80% of the viewport height
          end: "top 40%",   // When it reaches 40%
          scrub: true,      // Smoothly ties animation to scroll
        },
        color: '#2ecc71',
        ease: "none"
      });
    });

    return () => {
      // Cleanup scroll triggers
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const lines = [
    { first: 'SUSTAINABLE', second: 'SOURCING.' },
    { first: 'GLOBAL', second: 'EXPORT.' },
    { first: 'RELIABLE', second: 'SUPPLY.' },
  ];

  return (
    <section className="animated-typography-section" style={{
      padding: '5rem 0',
      backgroundColor: '#f8fafc',
      overflow: 'hidden',
      borderTop: '1px solid #e2e8f0',
      borderBottom: '1px solid #e2e8f0'
    }} ref={containerRef}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          gap: '1rem'
        }}>
          {lines.map((line, index) => (
            <h2 key={index} style={{
              fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: '-1.5px',
              margin: 0,
              textTransform: 'uppercase'
            }}>
              {/* Start entirely grey, animate to green */}
              <span className="animated-line" style={{ color: '#cbd5e1', display: 'inline-block' }}>
                <span style={{ fontWeight: 900 }}>{line.first} </span>
                <span style={{ fontWeight: 800 }}>{line.second}</span>
              </span>
            </h2>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AnimatedTypography;
