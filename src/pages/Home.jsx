import { Link } from 'react-router-dom';
import { Recycle, Globe, Truck } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import HeroSlider from '../components/HeroSlider';
import AnimatedTypography from '../components/AnimatedTypography';
import MaterialHorizontalSlider from '../components/MaterialHorizontalSlider';
import '../slider.css';

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Global Scrap Material Supplier & Plastic Recycling | Anchorstone Global</title>
        <meta name="description" content="Anchorstone Global LLP specializes in the supply and export of bulk plastic scraps, metal scraps, and reprocessed granules globally from Ahmedabad." />
        <meta name="keywords" content="Plastic Scrap, Metal Scrap, PP Regrind, PVC Scrap, Anchorstone Global LLP, Scrap Materials Supplier, Circular Economy, Ahmedabad" />
        <link rel="canonical" href="https://anchorstoneglobal.co.in/" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Anchorstone Global LLP",
            "url": "https://anchorstoneglobal.co.in",
            "logo": "https://anchorstoneglobal.co.in/logo.png",
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "customer service",
              "areaServed": "Worldwide"
            }
          })}
        </script>
      </Helmet>

      {/* Section 1: Hero Slider */}
      <HeroSlider />

      {/* Section 2: Text Animation */}
      <AnimatedTypography />

      {/* Section 3: Horizontal Card Slider */}
      <MaterialHorizontalSlider />

      {/* Section 4: Features Section */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Why Choose <span className="text-green">Anchorstone?</span></h2>
          <div className="card-grid">
            <div className="card">
              <div className="card-icon"><Recycle /></div>
              <h3>Sustainable Sourcing</h3>
              <p>We provide high-grade regrinds, lumps, and scrap materials that help industries reduce their carbon footprint and promote sustainability.</p>
            </div>
            <div className="card">
              <div className="card-icon"><Globe /></div>
              <h3>Global Export</h3>
              <p>With a robust international network, we ensure seamless delivery of materials to manufacturers and recyclers across the globe.</p>
            </div>
            <div className="card">
              <div className="card-icon"><Truck /></div>
              <h3>Reliable Supply Chain</h3>
              <p>Our commitment to quality and timely logistics means you get exactly what you need, when you need it, without disruptions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: CTA Section */}
      <section className="section" style={{ 
        background: `linear-gradient(rgba(46, 204, 113, 0.85), rgba(39, 174, 96, 0.9)), url('/images/cta_recycling.png') center/cover no-repeat`, 
        color: 'white', 
        textAlign: 'center' 
      }}>
        <div className="container">
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'white' }}>Ready to Partner With Us?</h2>
          <p style={{ fontSize: '1.25rem', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem', color: 'white' }}>
            Whether you need plastic films, metal scrap, or reprocessed granules, we have the inventory to meet your industrial demands.
          </p>
          <Link to="/quote" className="btn" style={{ backgroundColor: 'white', color: 'var(--primary-green)', fontWeight: 'bold' }}>
            Request a Formal Quote
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;

