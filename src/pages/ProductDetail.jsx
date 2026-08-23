import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
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
  const currentSlug = slug || 'polypropylene-pp-scrap';
  
  // Format readable title from slug if needed
  const rawName = currentSlug.replace(/-/g, ' ');
  const product = getProductDetail(currentSlug, rawName);

  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div style={{ backgroundColor: '#0f172a', color: '#f8fafc', minHeight: '100vh', paddingBottom: '5rem' }}>
      <Helmet>
        <title>{`${product.name} | Anchorstone Global Materials`}</title>
        <meta name="description" content={product.sourceText} />
        <link rel="canonical" href={`https://anchorstoneglobal.co.in/materials/${product.slug}`} />
      </Helmet>

      {/* Top Navigation & Breadcrumb Header */}
      <div style={{ backgroundColor: '#1e293b', borderBottom: '1px solid #334155', padding: '1rem 0' }}>
        <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem', color: '#94a3b8' }}>
            <Link to="/materials" style={{ color: '#2ecc71', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600 }}>
              <ArrowLeft size={16} /> Back to Materials
            </Link>
            <span>/</span>
            <span>{product.category}</span>
            <span>/</span>
            <span style={{ color: '#f8fafc', fontWeight: 600 }}>{product.name}</span>
          </div>

          <Link to="/quote" className="btn" style={{ backgroundColor: '#2ecc71', color: '#0f172a', padding: '0.5rem 1.25rem', fontSize: '0.9rem', fontWeight: 700, borderRadius: '8px' }}>
            Request Quote
          </Link>
        </div>
      </div>

      {/* Main Brochure Hero Container */}
      <section style={{ padding: '3.5rem 0 4rem', position: 'relative', overflow: 'hidden' }}>
        <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', 
            gap: '3.5rem', 
            alignItems: 'center',
            backgroundColor: '#1e293b',
            borderRadius: '24px',
            padding: '3rem',
            boxShadow: '0 20px 50px rgba(0,0,0,0.4)',
            border: '1px solid #334155',
            position: 'relative'
          }}>

            {/* Left Column: Title, Origin Subtitle & Quality Badges */}
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.35rem 1rem', borderRadius: '50px', backgroundColor: 'rgba(46, 204, 113, 0.15)', border: '1px solid rgba(46, 204, 113, 0.3)', color: '#2ecc71', fontWeight: 700, fontSize: '0.85rem', marginBottom: '1.25rem' }}>
                <Sparkles size={16} /> ANCHORSTONE GLOBAL REIMAGINING PLASTICS
              </div>

              <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-1px', marginBottom: '1rem', color: '#ffffff' }}>
                {product.name.toUpperCase()}
              </h1>

              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f97316', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '1.25rem', lineHeight: 1.3 }}>
                {product.tagline}
              </h2>

              <p style={{ color: '#cbd5e1', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '2.5rem' }}>
                {product.sourceText}
              </p>

              {/* 4 Core Quality Badges matching Abir layout */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
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
                      <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#ffffff', letterSpacing: '0.5px', margin: '0 0 0.2rem 0' }}>
                        {badge.title}
                      </h3>
                      <p style={{ fontSize: '0.85rem', color: '#94a3b8', margin: 0, lineHeight: 1.3 }}>
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
              <div style={{
                position: 'absolute',
                width: '380px',
                height: '380px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(46,204,113,0.2) 0%, rgba(0,0,0,0) 70%)',
                zIndex: 0
              }} />

              {/* Circular Cropped Material Image Frame matching Abir brochure */}
              <div style={{
                position: 'relative',
                zIndex: 1,
                width: '360px',
                height: '360px',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '6px solid #2ecc71',
                boxShadow: '0 15px 35px rgba(0,0,0,0.5)',
                backgroundImage: `url(${product.heroImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
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
            <div style={{ height: '2px', backgroundColor: '#334155', flex: 1, maxWidth: '200px' }} />
            <h2 style={{ fontSize: '2.25rem', fontWeight: 900, letterSpacing: '2px', color: '#ffffff', textTransform: 'uppercase', margin: 0 }}>
              APPLICATIONS
            </h2>
            <div style={{ height: '2px', backgroundColor: '#334155', flex: 1, maxWidth: '200px' }} />
          </div>

          {/* 4 Application Cards Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
            {product.applications.map((app) => (
              <div key={app.id} style={{
                backgroundColor: '#1e293b',
                borderRadius: '16px',
                overflow: 'hidden',
                border: '1px solid #334155',
                boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
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
                    background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(15,23,42,0.8) 100%)'
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
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                    border: '3px solid #1e293b'
                  }}>
                    {getIconComponent(app.icon)}
                  </div>
                </div>

                {/* Card Content */}
                <div style={{ padding: '2.25rem 1.5rem 1.5rem', textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.5rem', marginTop: 0 }}>
                      {app.title}
                    </h3>
                    <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.5, margin: 0 }}>
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
          
          <div style={{ backgroundColor: '#1e293b', borderRadius: '20px', padding: '2.5rem', border: '1px solid #334155', boxShadow: '0 12px 35px rgba(0,0,0,0.3)' }}>
            <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#2ecc71', marginBottom: '1.5rem', textAlign: 'center' }}>
              TECHNICAL SPECIFICATIONS & SUPPLY DETAILS
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              {product.specifications.map((spec, idx) => (
                <div key={idx} style={{ padding: '1rem 1.25rem', backgroundColor: '#0f172a', borderRadius: '10px', border: '1px solid #334155' }}>
                  <div style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.25rem' }}>
                    {spec.label}
                  </div>
                  <div style={{ fontSize: '1rem', color: '#ffffff', fontWeight: 600 }}>
                    {spec.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Direct Inquiry CTA Bar */}
            <div style={{ marginTop: '2.5rem', paddingTop: '2rem', borderTop: '1px solid #334155', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'center', alignItems: 'center' }}>
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
