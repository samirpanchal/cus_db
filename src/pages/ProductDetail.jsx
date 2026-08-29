import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getProductDetail } from '../data/productDetailsData';
import { 
  ShieldCheck, 
  Recycle, 
  Settings, 
  Leaf, 
  Battery, 
  Car, 
  Package, 
  Trash2, 
  ArrowLeft, 
  Send, 
  PhoneCall, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';

const getIconComponent = (iconName) => {
  switch (iconName) {
    case 'ShieldCheck': return <ShieldCheck size={28} />;
    case 'Recycle': return <Recycle size={28} />;
    case 'Settings': return <Settings size={28} />;
    case 'Leaf': return <Leaf size={28} />;
    case 'Battery': return <Battery size={28} />;
    case 'Car': return <Car size={28} />;
    case 'Package': return <Package size={28} />;
    case 'Trash2': return <Trash2 size={28} />;
    default: return <CheckCircle2 size={28} />;
  }
};

const ProductDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const currentSlug = slug || 'polypropylene-pp-scrap';
  
  // Format readable title from slug if needed
  const rawName = currentSlug.replace(/-/g, ' ');
  const product = getProductDetail(currentSlug, rawName);

  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div style={{ backgroundColor: '#ffffff', color: '#0f172a', minHeight: '100vh', paddingBottom: '5rem' }}>
      <Helmet>
        <title>{`${product.name} | Anchorstone Global Materials`}</title>
        <meta name="description" content={product.sourceText} />
        <link rel="canonical" href={`https://anchorstoneglobal.co.in/materials/${product.slug}`} />
      </Helmet>



      {/* Main Brochure Hero Container */}
      <section style={{ padding: '3.5rem 0 4rem', position: 'relative', overflow: 'hidden' }}>
        <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
          
          <div className="product-hero-container">

            {/* Left Column: Title, Origin Subtitle & Quality Badges */}
            <div>
              <div className="product-badge-pill">
                <Sparkles size={16} /> ANCHORSTONE GLOBAL REIMAGINING PLASTICS
              </div>

              <h1 className="product-title">
                {product.name.toUpperCase()}
              </h1>

              <h2 className="product-subtitle">
                {product.tagline}
              </h2>

              <p style={{ color: '#475569', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '2.5rem' }}>
                {product.sourceText}
              </p>

              {/* 4 Core Quality Badges matching Abir layout */}
              <div className="product-quality-badges">
                {product.badges.map((badge) => (
                  <div key={badge.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                    <div style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(46, 204, 113, 0.12)',
                      border: '2px solid #2ecc71',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#2ecc71',
                      flexShrink: 0
                    }}>
                      {getIconComponent(badge.icon)}
                    </div>
                    <div>
                      <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a', letterSpacing: '0.5px', margin: '0 0 0.2rem 0' }}>
                        {badge.title}
                      </h3>
                      <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0, lineHeight: 1.3 }}>
                        {badge.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Large Circular Photo Frame & Floating Badge */}
            <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              
              {/* Outer Glow Ring */}
              <div className="product-image-glow" />

              {/* Circular Cropped Material Image Frame matching Abir brochure */}
              <div className="product-image-frame" style={{
                backgroundImage: `url(${product.heroImage})`
              }} />

              {/* Floating Orange/Green Badge */}
              <div style={{
                position: 'absolute',
                bottom: '10px',
                right: '20px',
                zIndex: 2,
                width: '160px',
                height: '160px',
                borderRadius: '50%',
                backgroundColor: '#ea580c',
                background: 'linear-gradient(135deg, #f97316 0%, #c2410c 100%)',
                border: '4px solid #ffffff',
                boxShadow: '0 10px 25px rgba(0,0,0,0.4)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '1rem',
                color: '#ffffff'
              }}>
                <Recycle size={32} style={{ marginBottom: '0.4rem' }} />
                <span style={{ fontSize: '0.75rem', fontWeight: 900, textTransform: 'uppercase', lineHeight: 1.25, letterSpacing: '0.5px' }}>
                  {product.sustainabilityBadgeText}
                </span>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Applications Section Divider matching Abir brochure */}
      <section style={{ padding: '3rem 0 4rem' }}>
        <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
          
          {/* Section Header Line */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', marginBottom: '3.5rem' }}>
            <div style={{ height: '2px', backgroundColor: '#e2e8f0', flex: 1, maxWidth: '200px' }} />
            <h2 style={{ fontSize: '2.25rem', fontWeight: 900, letterSpacing: '2px', color: '#0f172a', textTransform: 'uppercase', margin: 0 }}>
              APPLICATIONS
            </h2>
            <div style={{ height: '2px', backgroundColor: '#e2e8f0', flex: 1, maxWidth: '200px' }} />
          </div>

          {/* 4 Application Cards Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
            {product.applications.map((app) => (
              <div key={app.id} style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                overflow: 'hidden',
                border: '1px solid #e2e8f0',
                boxShadow: '0 8px 25px rgba(0,0,0,0.05)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.3s ease, border-color 0.3s ease'
              }}>
                
                {/* Photo Header */}
                <div style={{
                  height: '200px',
                  backgroundImage: `url(${app.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  position: 'relative'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(180deg, rgba(0,0,0,0.0) 0%, rgba(255,255,255,1) 100%)'
                  }} />
                  
                  {/* Floating Circular Icon Badge */}
                  <div style={{
                    position: 'absolute',
                    bottom: '-22px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '46px',
                    height: '46px',
                    borderRadius: '50%',
                    backgroundColor: '#ea580c',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    border: '3px solid #ffffff'
                  }}>
                    {getIconComponent(app.icon)}
                  </div>
                </div>

                {/* Card Content */}
                <div style={{ padding: '2.25rem 1.5rem 1.5rem', textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.5rem', marginTop: 0 }}>
                      {app.title}
                    </h3>
                    <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: 1.5, margin: 0 }}>
                      {app.desc}
                    </p>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Technical Specifications Table */}
      <section style={{ padding: '2rem 0 4rem' }}>
        <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 1.5rem' }}>
          
          <div className="product-specs-container">
            <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#2ecc71', marginBottom: '1.5rem', textAlign: 'center' }}>
              TECHNICAL SPECIFICATIONS & SUPPLY DETAILS
            </h3>

            <div className="product-specs-grid">
              {product.specifications.map((spec, idx) => (
                <div key={idx} style={{ padding: '1rem 1.25rem', backgroundColor: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.25rem' }}>
                    {spec.label}
                  </div>
                  <div style={{ fontSize: '1rem', color: '#0f172a', fontWeight: 600 }}>
                    {spec.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Direct Inquiry CTA Bar */}
            <div className="product-cta-bar">
              <Link 
                to="/quote" 
                className="btn" 
                style={{ 
                  backgroundColor: '#2ecc71', 
                  color: '#0f172a', 
                  fontWeight: 800, 
                  fontSize: '1rem', 
                  padding: '0.85rem 2rem', 
                  borderRadius: '10px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.6rem'
                }}
              >
                <Send size={18} /> REQUEST QUOTE FOR {product.name.toUpperCase()}
              </Link>

              <a 
                href={`https://wa.me/919825000000?text=${encodeURIComponent(`Hello, I am interested in inquiring about ${product.name}. Please share pricing and specs.`)}`}
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ 
                  backgroundColor: '#25D366', 
                  color: '#ffffff', 
                  fontWeight: 800, 
                  fontSize: '1rem', 
                  padding: '0.85rem 2rem', 
                  borderRadius: '10px',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.6rem'
                }}
              >
                <PhoneCall size={18} /> INQUIRE ON WHATSAPP
              </a>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};

export default ProductDetail;
