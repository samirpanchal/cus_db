import React, { useState } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getProductDetail, productDetailsData } from '../data/productDetailsData';
import { globalLocations } from '../data/locations';
import { indiaLocations } from '../data/indiaLocations';
import { indiaPortsLocations } from '../data/indiaPortsLocations';
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
  Sparkles,
  MapPin
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
  const { slug, location: locParam } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const rawSlug = slug || 'polypropylene-pp-scrap';
  const currentSlug = rawSlug.replace(/\.html$/, '');
  
  const isIndiaRoute = pathname.startsWith('/india/');
  const isExportRoute = pathname.startsWith('/export/');
  const isIndiaPortRoute = pathname.startsWith('/import-india/');

  const locationName = isIndiaRoute ? indiaLocations[locParam] : 
                       (isExportRoute ? globalLocations[locParam] : 
                       (isIndiaPortRoute ? indiaPortsLocations[locParam] : null));

  // Format readable title from slug if needed
  const rawName = currentSlug.replace(/-/g, ' ');
  const product = getProductDetail(currentSlug, rawName);

  let visualHeadline = product.name;
  let displayTitle = product.name;
  let displaySeoTitle = product.seoTitle || `${product.name} | Anchorstone Global Materials`;
  let displayDesc = product.seoDescription || product.sourceText;
  let displayUrl = `https://anchorstoneglobal.co.in/materials/${product.slug}.html`;

  if (isExportRoute && locationName) {
    displayTitle = `Import ${product.name} to ${locationName}`;
    visualHeadline = product.name;
    displaySeoTitle = `Import ${product.name} to ${locationName} | Bulk Suppliers`;
    displayDesc = `Anchorstone Global specializes in exporting bulk ${product.name} to ${locationName}. Contact us today for a quote!`;
    displayUrl = `https://anchorstoneglobal.co.in/export/${locParam}/${currentSlug}.html`;
  } else if (isIndiaPortRoute && locationName) {
    displayTitle = `Import ${product.name} to ${locationName}`;
    visualHeadline = product.name;
    displaySeoTitle = `Import ${product.name} to ${locationName} | Bulk Suppliers`;
    displayDesc = `Anchorstone Global specializes in supplying bulk ${product.name} directly to ${locationName}. Contact us today for import and logistics quotes!`;
    displayUrl = `https://anchorstoneglobal.co.in/import-india/${locParam}/${currentSlug}.html`;
  } else if (isIndiaRoute && locationName) {
    displayTitle = `Buy ${product.name} in ${locationName}`;
    visualHeadline = product.name;
    displaySeoTitle = `${product.name} Suppliers in ${locationName} | Anchorstone Global`;
    displayDesc = `Anchorstone Global and The Polylot Company are leading suppliers and distributors of bulk ${product.name} across ${locationName}. Contact us for domestic pricing!`;
    displayUrl = `https://anchorstoneglobal.co.in/india/${locParam}/${currentSlug}.html`;
  }

  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div style={{ backgroundColor: '#ffffff', color: '#0f172a', minHeight: '100vh', paddingBottom: '5rem' }}>
      <Helmet>
        <title>{displaySeoTitle}</title>
        <meta name="description" content={displayDesc} />
        <link rel="canonical" href={displayUrl} />
        
        {/* Hreflang for global targeting */}
        <link rel="alternate" hreflang="x-default" href={displayUrl} />
        <link rel="alternate" hreflang="en" href={displayUrl} />
        
        {/* Open Graph Tags for WhatsApp / LinkedIn Sharing */}
        <meta property="og:title" content={displaySeoTitle} />
        <meta property="og:description" content={displayDesc} />
        <meta property="og:image" content={`https://anchorstoneglobal.co.in${product.heroImage}`} />
        <meta property="og:url" content={displayUrl} />
        <meta property="og:type" content="product" />
        
        {/* JSON-LD Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Product",
            "name": displayTitle,
            "image": `https://anchorstoneglobal.co.in${product.heroImage}`,
            "description": displayDesc,
            "brand": {
              "@type": "Brand",
              "name": "Anchorstone Global"
            },
            "category": product.category,
            "offers": {
              "@type": "Offer",
              "url": displayUrl,
              "priceCurrency": "USD",
              "price": "Request Quote",
              "availability": "https://schema.org/InStock"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "reviewCount": "124"
            }
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [{
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://anchorstoneglobal.co.in"
            },{
              "@type": "ListItem",
              "position": 2,
              "name": "Materials",
              "item": "https://anchorstoneglobal.co.in/materials"
            },{
              "@type": "ListItem",
              "position": 3,
              "name": isIndiaRoute ? `Supply to ${locationName}` : (isExportRoute && locationName ? `Export to ${locationName}` : product.name),
              "item": displayUrl
            }]
          })}
        </script>
        
        {/* FAQ Schema for Google Rich Snippets */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": `What is the minimum order quantity for ${product.name}?`,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": `Our minimum order quantity for ${product.name} is generally 1 x 20ft Container. Please request a quote for exact details.`
                }
              },
              {
                "@type": "Question",
                "name": `How is ${product.name} packaged for export?`,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": `Depending on the format, it can be shipped in 25kg bags, 1000kg jumbo super sacks, or loose in containers.`
                }
              }
            ]
          })}
        </script>
      </Helmet>



      {/* Visual Breadcrumbs */}
      <div style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0' }}>
        <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '1rem 1.5rem' }}>
          <nav style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 500 }}>
            <Link to="/" style={{ color: '#2ecc71', textDecoration: 'none' }}>Home</Link>
            <span style={{ margin: '0 0.5rem' }}>&gt;</span>
            <Link to="/materials" style={{ color: '#2ecc71', textDecoration: 'none' }}>Materials</Link>
            <span style={{ margin: '0 0.5rem' }}>&gt;</span>
            {isExportRoute && (
              <>
                <span style={{ color: '#64748b' }}>Export</span>
                <span style={{ margin: '0 0.5rem' }}>&gt;</span>
                <span style={{ color: '#64748b' }}>{locationName}</span>
                <span style={{ margin: '0 0.5rem' }}>&gt;</span>
              </>
            )}
            {isIndiaPortRoute && (
              <>
                <span style={{ color: '#64748b' }}>Import</span>
                <span style={{ margin: '0 0.5rem' }}>&gt;</span>
                <span style={{ color: '#64748b' }}>{locationName}</span>
                <span style={{ margin: '0 0.5rem' }}>&gt;</span>
              </>
            )}
            {isIndiaRoute && (
              <>
                <span style={{ color: '#64748b' }}>Domestic</span>
                <span style={{ margin: '0 0.5rem' }}>&gt;</span>
                <span style={{ color: '#64748b' }}>{locationName}</span>
                <span style={{ margin: '0 0.5rem' }}>&gt;</span>
              </>
            )}
            <span style={{ color: '#0f172a' }}>{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Main Brochure Hero Container */}
      <section style={{ padding: '3.5rem 0 4rem', position: 'relative', overflow: 'hidden' }}>
        <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
          
          <div className="product-hero-container">

            {/* Left Column: Title, Origin Subtitle & Quality Badges */}
            <div>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                <div className="product-badge-pill" style={{ margin: 0 }}>
                  <Sparkles size={16} /> ANCHORSTONE GLOBAL REIMAGINING PLASTICS
                </div>
                {locationName && (
                  <div className="product-badge-pill" style={{ margin: 0, backgroundColor: '#f8fafc', color: '#0f172a', border: '1px solid #cbd5e1' }}>
                    <MapPin size={16} style={{ color: '#2ecc71' }} /> {isExportRoute || isIndiaPortRoute ? `IMPORT TO ${locationName.toUpperCase()}` : `SUPPLYING ${locationName.toUpperCase()}`}
                  </div>
                )}
              </div>

              <h1 className="product-title" style={{ marginTop: '0.5rem' }}>
                {visualHeadline.toUpperCase()}
              </h1>

              <h2 className="product-subtitle">
                {product.tagline}
              </h2>

              <p style={{ color: '#475569', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: locationName ? '1.5rem' : '2.5rem' }}>
                {product.sourceText}
              </p>

              {locationName && (
                <p style={{ color: '#0f172a', fontSize: '1rem', lineHeight: 1.6, marginBottom: '2.5rem', fontWeight: 500, backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid #2ecc71' }}>
                  Anchorstone Global provides dedicated logistics and expedited customs clearance for delivering <strong>{product.name}</strong> directly to <strong>{locationName}</strong>. Request a quote today for specialized pricing.
                </p>
              )}

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
                      <h2 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a', letterSpacing: '0.5px', margin: '0 0 0.2rem 0' }}>
                        {badge.title}
                      </h2>
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
              <div className="product-image-frame" style={{ overflow: 'hidden' }}>
                <img 
                  src={product.heroImage} 
                  alt={product.altText || `Industrial ${product.name} available for export`} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              </div>

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

      {/* Related Locations Section (Internal Linking Web) */}
      {locationName && (
        <section style={{ padding: '4rem 0', backgroundColor: '#ffffff' }}>
          <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '1.5rem', marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                Also Supplying {product.name} To:
              </h2>
            </div>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              {(isExportRoute 
                  ? Object.entries(globalLocations)
                  : (isIndiaPortRoute ? Object.entries(indiaPortsLocations) : Object.entries(indiaLocations))
                )
                .filter(([key, val]) => val !== locationName)
                .sort(() => 0.5 - Math.random())
                .slice(0, 12)
                .map(([locKey, locName]) => {
                  let linkBase = '/india';
                  if (isExportRoute) linkBase = '/export';
                  if (isIndiaPortRoute) linkBase = '/import-india';
                  return (
                    <Link 
                      key={locKey} 
                      to={`${linkBase}/${locKey}/${currentSlug}.html`}
                      style={{
                        padding: '0.6rem 1.2rem',
                        backgroundColor: '#f1f5f9',
                        color: '#475569',
                        borderRadius: '20px',
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        textDecoration: 'none',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = '#e2e8f0';
                        e.currentTarget.style.color = '#0f172a';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = '#f1f5f9';
                        e.currentTarget.style.color = '#475569';
                      }}
                    >
                      {locName}
                    </Link>
                  );
                })}
            </div>
          </div>
        </section>
      )}

      {/* Related Materials Section */}
      <section style={{ padding: '4rem 0', backgroundColor: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
        <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', marginBottom: '3rem' }}>
            <div style={{ height: '2px', backgroundColor: '#e2e8f0', flex: 1, maxWidth: '100px' }} />
            <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#0f172a', margin: 0, textTransform: 'uppercase' }}>
              Related Materials
            </h2>
            <div style={{ height: '2px', backgroundColor: '#e2e8f0', flex: 1, maxWidth: '100px' }} />
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {Object.values(productDetailsData)
              .filter(p => {
                if (p.slug === product.slug) return false;
                const getSuperCategory = (prod) => {
                  if (prod.heroImage?.includes('metal_final')) return 'Metal';
                  if (prod.heroImage?.includes('plastics_final')) return 'Plastic';
                  if (prod.heroImage?.includes('stocklots_final')) {
                    if (prod.category?.includes('Fabric')) return 'Stocklot Fabric';
                    if (prod.category?.includes('Paper')) return 'Stocklot Paper';
                    return 'Stocklot Plastic';
                  }
                  return 'Unknown';
                };
                return getSuperCategory(p) === getSuperCategory(product);
              })
              .sort(() => 0.5 - Math.random())
              .slice(0, 4)
              .map(related => (
                <Link 
                  to={`/materials/${related.slug}.html`} 
                  key={related.slug}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <div style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '1.5rem',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.05)';
                  }}
                  >
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem', lineHeight: 1.3 }}>
                      {related.name}
                    </h3>
                    <p style={{ fontSize: '0.9rem', color: '#64748b', margin: 0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {related.tagline || related.sourceText}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem', color: '#2ecc71', fontWeight: 600, fontSize: '0.9rem' }}>
                      View {related.name} Specs <ArrowLeft size={16} style={{ transform: 'rotate(180deg)' }} />
                    </div>
                  </div>
                </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default ProductDetail;
