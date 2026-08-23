import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const materialCards = [
  {
    id: 1,
    title: 'Plastic Scrap',
    desc: 'Post Industrial Regrinds, Lumps, & Rolls.',
    image: '/images/plastic_scrap_premium.png',
    link: '/materials'
  },
  {
    id: 2,
    title: 'Metal Scrap',
    desc: 'High-Grade MS, SS, & Aluminium Scraps.',
    image: '/images/metals_scrap_premium.png',
    link: '/materials'
  },
  {
    id: 3,
    title: 'Paper Scrap',
    desc: 'Bulk Stocklot Paper Rolls & Recyclables.',
    image: '/images/paper_scrap_premium.png',
    link: '/materials'
  },
  {
    id: 4,
    title: 'Tyre Scrap',
    desc: 'Bales, Cut, & Shredded Tyre Scraps.',
    image: '/images/tyre_scrap_premium.png',
    link: '/materials'
  },
  {
    id: 5,
    title: 'Battery Scrap',
    desc: 'Reliable Sourcing for Industrial Battery Scraps.',
    image: '/images/battery_scrap_premium.png',
    link: '/materials'
  },
  {
    id: 6,
    title: 'E-Waste Scrap',
    desc: 'Responsible Processing of Electronic Components.',
    image: '/images/ewaste_scrap_premium.png',
    link: '/materials'
  }
];

const MaterialHorizontalSlider = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.7;
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section style={{ padding: '5rem 0', backgroundColor: '#f1f5f9', position: 'relative' }}>
      <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
        
        {/* Header with Navigation Controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
          <div>
            <h2 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--bg-dark)', margin: 0 }}>
              Material <span style={{ color: 'var(--primary-green)' }}>Divisions</span>
            </h2>
            <p style={{ color: 'var(--gray)', marginTop: '0.5rem', fontSize: '1.05rem' }}>
              Swipe or use controls to browse our industrial recyclables catalog.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              onClick={() => scroll('left')}
              aria-label="Scroll left"
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                backgroundColor: 'white',
                border: '1px solid #cbd5e1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                transition: 'all 0.2s ease'
              }}
            >
              <ChevronLeft size={22} color="#334155" />
            </button>
            <button
              onClick={() => scroll('right')}
              aria-label="Scroll right"
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                backgroundColor: 'white',
                border: '1px solid #cbd5e1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                transition: 'all 0.2s ease'
              }}
            >
              <ChevronRight size={22} color="#334155" />
            </button>
          </div>
        </div>

        {/* Scrollable Container */}
        <div
          ref={scrollRef}
          style={{
            display: 'flex',
            gap: '1.75rem',
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            paddingBottom: '1rem',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          {materialCards.map((card) => (
            <div
              key={card.id}
              style={{
                minWidth: '380px',
                maxWidth: '400px',
                flexShrink: 0,
                scrollSnapAlign: 'start',
                backgroundColor: 'white',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.06)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}
            >
              <div
                style={{
                  height: '240px',
                  backgroundImage: `url(${card.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  position: 'relative'
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 100%)'
                  }}
                />
              </div>

              <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
                    {card.title}
                  </h3>
                  <p style={{ color: '#64748b', fontSize: '1rem', lineHeight: '1.5', marginBottom: '1.5rem' }}>
                    {card.desc}
                  </p>
                </div>

                <Link
                  to={card.link}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontWeight: 700,
                    fontSize: '1rem',
                    color: 'var(--primary-green)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}
                >
                  VIEW DETAILS <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default MaterialHorizontalSlider;
