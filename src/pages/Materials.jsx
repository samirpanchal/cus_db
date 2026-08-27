import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { materialsMenu } from '../data/materialsMenu';
import { Layers, ArrowRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const slugify = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const getCategoryImage = (catName) => {
  switch(catName) {
    case 'Plastics': return '/images/plastic_scrap_premium.png';
    case 'Metals': return '/images/metals_scrap_premium.png';
    case 'Used Tyre / Tire Scrap': return '/images/tyre_scrap_premium.png';
    case 'Stock Lots Plastic/Paper': return '/images/paper_scrap_premium.png';
    case 'E-waste Scrap': return '/images/ewaste_scrap_premium.png';
    case 'Battery Scrap': return '/images/battery_scrap_premium.png';
    default: return '/images/hero_logistics_premium.png';
  }
};

const Materials = () => {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(() => {
    const saved = sessionStorage.getItem('activeMaterialCategory');
    return saved !== null ? parseInt(saved, 10) : 0;
  });

  useEffect(() => {
    sessionStorage.setItem('activeMaterialCategory', activeCategoryIndex);
  }, [activeCategoryIndex]);

  const activeCategory = materialsMenu[activeCategoryIndex];

  return (
    <div>
      <Helmet>
        <title>Plastic Scraps, Regrinds & Polymers | Anchorstone Global Materials</title>
        <meta name="description" content="Explore our massive inventory of Plastic Scraps (PP, PE, PVC, PS, PET), Regrinds, Lumps, Bales, Regranulates, Sheets, Polymers, Prime & Off Grade materials globally." />
        <meta name="keywords" content="Plastics Scraps, Polypropylene -PP Scrap, Polyethylene -PE Scrap, Polyvinyl Chloride Scrap - PVC Scrap, High Impact Polystyrene Scrap - PS Scrap, Polyethylene terephthalate - PET Scrap, Regrind, PP Regrind, PE Regrind, PVC Regrind, PS Regrind, PET Regrind, PET Hot Washed Flakes, Plastic Lumps, PP Lumps, PE Lumps, PVC Lumps, PS Lumps, PET Lumps, Bales, PP Bales, PS Bales, PET Bales, Regranulate, PP Regranulate, PE Regranulate, PVC Regranulate, PET Regranulate, PS Regranulate, Sheets, PET sheets, PP Sheets, PS Sheets, PVC Sheets, PE Sheets, Plastisizers, DOP, DBP, DOA, ESBO, Polymers, PVC Resin, PVC Compounds, Titanium Dioxide, Plastic Granules, Zinc Oxide, High Impact Polystyrene Prime, PP Polymers, PE Polymers, PET Prime, Technical Plastic, ABS, PA6, PA66, PC, PMMA, POM, PBT, PTFE, Off Grade, PP Off Grade, PE Off Grade, PVC Off Grade, PET Off Grade, PS Off Grade, Non Prime, Near Prime" />
        <link rel="canonical" href="https://anchorstoneglobal.co.in/materials" />
      </Helmet>
      <section className="section" style={{ backgroundColor: 'var(--bg-dark)', color: 'white', padding: '60px 0', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Materials & Products</h1>
          <p style={{ fontSize: '1.2rem', color: '#ccc' }}>
            Explore our extensive catalog of high-quality scrap materials for recycling and industrial use.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="materials-layout">
            
            {/* Sidebar Navigation */}
            <aside className="materials-sidebar">
              <h3 style={{ marginBottom: '1.5rem', color: 'var(--bg-dark)', borderBottom: '2px solid var(--border)', paddingBottom: '0.5rem' }}>
                Categories
              </h3>
              <ul className="category-list">
                {materialsMenu.map((cat, index) => (
                  <li key={index}>
                    <button 
                      className={activeCategoryIndex === index ? 'active' : ''}
                      onClick={() => setActiveCategoryIndex(index)}
                    >
                      {cat.name}
                      {activeCategoryIndex === index && <Layers size={18} />}
                    </button>
                  </li>
                ))}
              </ul>
            </aside>

            {/* Main Content Area */}
            <main className="materials-content">
              <div style={{
                width: '100%',
                height: '300px',
                borderRadius: '12px',
                marginBottom: '2.5rem',
                backgroundImage: `url(${getCategoryImage(activeCategory?.name)})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
              }}></div>
              
              <h2 style={{ fontSize: '2.5rem', color: 'var(--primary-green)', marginBottom: '2rem' }}>
                {activeCategory?.name}
              </h2>

              {activeCategory?.subcategories ? (
                <div className="subcategory-grid">
                  {activeCategory.subcategories.map((sub, subIdx) => (
                    <div key={subIdx} className="subcategory-card">
                      <h4 style={{ fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--bg-dark)' }}>{sub.name}</h4>
                      
                      {/* Render Sub-Sub Categories if they exist */}
                      {sub.subcategories && sub.subcategories.length > 0 && (
                        <ul className="sub-sub-list">
                          {sub.subcategories.map((subSub, ssIdx) => (
                            <li key={ssIdx} style={{ marginBottom: '0.5rem' }}>
                              <Link 
                                to={`/materials/${slugify(subSub.name)}`}
                                style={{ 
                                  color: 'var(--primary-green)', 
                                  fontWeight: 600, 
                                  textDecoration: 'none',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '0.4rem'
                                }}
                              >
                                {subSub.name} <ArrowRight size={14} />
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                  <p style={{ color: 'var(--gray)', fontSize: '1.1rem', marginBottom: '1.5rem' }}>
                    Detailed specifications for {activeCategory?.name} are available upon request.
                  </p>
                  <Link 
                    to={`/materials/${slugify(activeCategory?.name || 'materials')}`}
                    className="btn btn-primary"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                  >
                    View Product Details <ArrowRight size={16} />
                  </Link>
                </div>
              )}
            </main>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Materials;
