import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Leaf } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <img src="/logo.png" alt="Anchorstone Global" style={{ height: '50px', width: 'auto' }} />
              <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--text-light)' }}>Anchorstone Global LLP</span>
            </div>
            <p>Your trusted partner in supplying and exporting high-quality scrap materials for recycling and reuse. Leading the charge in the circular economy.</p>
          </div>
          <div className="footer-col">
            <h3>Quick Links</h3>
            <Link to="/">Home</Link>
            <Link to="/about">About Us</Link>
            <Link to="/materials">Materials & Products</Link>
            <Link to="/contact">Contact Us</Link>
          </div>
          <div className="footer-col">
            <h3>Contact Info</h3>
            <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', lineHeight: '1.2' }}><MapPin size={18} style={{ flexShrink: 0 }}/> SHED NO. 19, HITENDRANAGAR DIAMAND PARK FEEDER NO.9<br/>Ahmedabad, Gujarat, India 382340</p>
            <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>LLPIN: ACU-7275</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Anchorstone Global LLP. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
