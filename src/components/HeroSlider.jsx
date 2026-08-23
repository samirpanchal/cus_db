import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import '../slider.css';

const slides = [
  {
    id: 1,
    title: 'PLASTIC SCRAP',
    subtitle: 'Post Industrial Regrinds, Lumps, & Rolls',
    image: '/images/plastic_scrap_premium.png',
    link: '/materials'
  },
  {
    id: 2,
    title: 'METAL SCRAP',
    subtitle: 'High-Grade MS, SS, & Aluminium Scraps',
    image: '/images/metals_scrap_premium.png',
    link: '/materials'
  },
  {
    id: 3,
    title: 'PAPER SCRAP',
    subtitle: 'Bulk Stocklot Paper Rolls & Recyclables',
    image: '/images/paper_scrap_premium.png',
    link: '/materials'
  },
  {
    id: 4,
    title: 'TYRE SCRAP',
    subtitle: 'Bales, Cut, & Shredded Tyre Scraps',
    image: '/images/tyre_scrap_premium.png',
    link: '/materials'
  },
  {
    id: 5,
    title: 'BATTERY SCRAP',
    subtitle: 'Reliable Sourcing for Industrial Battery Scraps',
    image: '/images/battery_scrap_premium.png',
    link: '/materials'
  },
  {
    id: 6,
    title: 'E-WASTE SCRAP',
    subtitle: 'Responsible Processing of Electronic Components',
    image: '/images/ewaste_scrap_premium.png',
    link: '/materials'
  }
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="hero-slider">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`slide ${index === currentSlide ? 'active' : ''}`}
        >
          <div
            className="slide-bg"
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          <div className="slide-overlay" />
          <div className="slide-content">
            <h1 className="slide-title">{slide.title}</h1>
            <p className="slide-subtitle">{slide.subtitle}</p>
            <Link to={slide.link} className="slider-btn slider-btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
              EXPLORE MATERIALS <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      ))}

      <div className="slider-dots">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
