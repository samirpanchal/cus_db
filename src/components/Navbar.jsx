import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { KineticNavigation } from './ui/kinetic-navigation';

const Navbar = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavbarHidden, setIsNavbarHidden] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    const hideNav = () => setIsNavbarHidden(true);
    const showNav = () => setIsNavbarHidden(false);
    window.addEventListener('hide-navbar', hideNav);
    window.addEventListener('show-navbar', showNav);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hide-navbar', hideNav);
      window.removeEventListener('show-navbar', showNav);
    };
  }, []);

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 w-full px-6 md:px-12 flex justify-between items-center z-50 transition-all duration-500 ${
        isNavbarHidden ? '-translate-y-[150%] opacity-0' : 'translate-y-0 opacity-100'
      } ${
        isScrolled || location.pathname !== '/'
          ? 'bg-white/50 backdrop-blur-2xl saturate-150 shadow-[0_4px_30px_rgba(0,0,0,0.05)] border-b border-white/60 py-6'
          : 'bg-transparent py-9'
      }`}
    >
      {/* Brand Logo & Name */}
      <Link
        to="/"
        className="flex items-center gap-3 cursor-pointer group"
        onClick={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      >
        <img
          src="/logo.png"
          alt="Anchorstone Global Logo"
          className="object-contain transition-transform group-hover:scale-105"
          style={{ height: '40px', width: 'auto' }}
        />
        <div className="flex flex-col">
          <span className="text-xl font-bold tracking-tight text-slate-900 leading-tight">
            Anchorstone Global LLP
          </span>
          <span className="text-[10px] font-semibold text-emerald-600 tracking-wider uppercase hidden sm:inline-block">
            Strategic Trade
          </span>
        </div>
      </Link>

      {/* Kinetic Navigation (replaces desktop links and mobile drawer) */}
      <KineticNavigation />
    </header>
  );
};

export default Navbar;
