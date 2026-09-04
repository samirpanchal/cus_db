import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { materialsMenu } from '../data/materialsMenu';
import { Layers, ArrowRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { TiltCard } from '../components/ui/TiltCard';
import { HoverLinkAnimation } from '../components/ui/hover-link-animation';

const slugify = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const getCategoryImage = (catName) => {
  switch(catName) {
    case 'Plastics': return '/images/slider_plastic_scrap.png';
    case 'Metals': return '/images/slider_metal_scrap.png';
    case 'Stock Lots Plastic/Paper': return '/images/slider_stocklot_paper_rolls.png';
    case 'Stocklot Plastic Films': return '/images/slider_stocklot_plastic_films.png';
    case 'Stocklot Papers': return '/images/slider_stocklot_paper_rolls.png';
    case 'Stocklot Fabrics & Other': return '/images/stocklot_fabrics_temp.png';
    default: return '/images/slider_plastic_scrap.png';
  }
};

const getCategoryVideo = (catName) => {
  switch(catName) {
    case 'Metals': return '/videos/metals_animation.mp4';
    case 'Stocklot Plastic Films': return '/videos/A_cinematic_slow_panning_shot.mp4';
    case 'Stocklot Papers': return '/videos/stocklot_ani_paper.mp4';
    case 'Plastics': return '/videos/Materials_Products_1.mp4';
    case 'Stocklot Fabrics & Other': return '/videos/stocklot_fabric.mp4';
    default: return '/videos/Materials_Products_1.mp4';
  }
};

const Materials = () => {
  const location = useLocation();
  
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const [activeCategoryIndex, setActiveCategoryIndex] = useState(() => {
    if (location.state && location.state.categoryIndex !== undefined) {
      return location.state.categoryIndex;
    }
    const saved = sessionStorage.getItem('activeMaterialCategory');
    return saved !== null ? parseInt(saved, 10) : 0;
  });

  useEffect(() => {
    if (location.state && location.state.categoryIndex !== undefined) {
      setActiveCategoryIndex(location.state.categoryIndex);
    }
  }, [location.state]);

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
      <section className="section" style={{ backgroundColor: '#ffffff', color: '#0f172a', padding: '60px 0', textAlign: 'center', borderBottom: '1px solid #e2e8f0' }}>
        <div className="container">
          <h1 className="bg-gradient-to-br from-[#5cb878] to-[#387a9f] bg-clip-text text-transparent" style={{ fontSize: '3rem', marginBottom: '1rem' }}>Materials & Products</h1>
          <p style={{ fontSize: '1.2rem', color: '#475569', maxWidth: '800px', margin: '0 auto' }}>
            Anchorstone Global supplies a comprehensive range of industrial-grade recyclable materials. From high-quality PP, PE, PVC, PS, and PET scraps to bales, lumps, and regranulates, we cater to the global demands of plastic, metal, and paper processing companies.
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
              <ul className="category-list flex flex-col gap-3">
                {materialsMenu.map((cat, index) => (
                  <li key={index}>
                    <TiltCard max={3} glare={false} className="w-full rounded-lg overflow-hidden">
                      <button 
                        className={`w-full text-left flex justify-between items-center transition-all duration-300 ${activeCategoryIndex === index ? 'active bg-[var(--primary-green)]/10 text-[var(--primary-green)] font-semibold' : 'hover:bg-slate-50'}`}
                        style={{ padding: '0.8rem 1rem', border: 'none', background: activeCategoryIndex === index ? 'linear-gradient(to bottom right, #5cb878, #387a9f)' : 'transparent', color: activeCategoryIndex === index ? 'white' : 'inherit' }}
                        onClick={() => setActiveCategoryIndex(index)}
                      >
                        {cat.name}
                        {activeCategoryIndex === index && <Layers size={18} />}
                      </button>
                    </TiltCard>
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
                overflow: 'hidden',
                boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                position: 'relative'
              }}>
                {getCategoryVideo(activeCategory?.name) && !isMobile ? (
                  <div 
                    key={activeCategory?.name}
                    style={{ width: '100%', height: '100%' }}
                    dangerouslySetInnerHTML={{
                      __html: `<video autoplay loop muted playsinline webkit-playsinline preload="auto" poster="${getCategoryImage(activeCategory?.name)}" style="width:100%;height:100%;object-fit:cover;"><source src="${getCategoryVideo(activeCategory?.name)}" type="video/mp4" /></video>`
                    }}
                  />
                ) : (
                  <img
                    key={activeCategory?.name}
                    src={getCategoryImage(activeCategory?.name)}
                    alt={activeCategory?.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                )}
              </div>
              
              <h2 className="bg-gradient-to-br from-[#5cb878] to-[#387a9f] bg-clip-text text-transparent" style={{ fontSize: '2.5rem', marginBottom: '2rem', display: 'inline-block' }}>
                {activeCategory?.name}
              </h2>

              {activeCategory?.subcategories ? (
                <div className="subcategory-grid relative z-10" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
                  {activeCategory.subcategories.map((sub, subIdx) => (
                    <TiltCard 
                      key={subIdx} 
                      className="group p-8 rounded-2xl border-l-4 border-l-[var(--primary-green)] bg-white border border-white/60 transition-all duration-300 shadow-xl"
                      glare={true}
                      max={2}
                    >
                      <h4 
                        style={{ fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '1.2rem' }} 
                        className="text-slate-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-br group-hover:from-[#5cb878] group-hover:to-[#387a9f] transition-all duration-300"
                      >
                        {sub.name}
                      </h4>
                      
                      {/* Render Sub-Sub Categories if they exist */}
                      {sub.subcategories && sub.subcategories.length > 0 && (
                        <ul className="sub-sub-list relative z-20" style={{ listStyleType: 'disc', color: 'var(--primary-green)' }}>
                          {sub.subcategories.map((subSub, ssIdx) => (
                            <li key={ssIdx} style={{ marginBottom: '0.8rem', marginLeft: '1rem' }}>
                              <Link 
                                to={`/materials/${slugify(subSub.name)}.html`}
                                className="text-slate-500 font-medium transition-colors duration-200"
                                style={{ 
                                  textDecoration: 'none',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  fontSize: '0.875rem'
                                }}
                              >
                                <HoverLinkAnimation highlightColor="#ffffff" barGradient="linear-gradient(to bottom right, #5cb878, #387a9f)" barThickness={0} className="flex items-center gap-1">
                                  {subSub.name}
                                </HoverLinkAnimation>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </TiltCard>
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                  <p style={{ color: 'var(--gray)', fontSize: '1.1rem', marginBottom: '1.5rem' }}>
                    Detailed specifications for {activeCategory?.name} are available upon request.
                  </p>
                  <Link 
                    to={`/materials/${slugify(activeCategory?.name || 'materials')}.html`}
                    className="btn btn-primary"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                  >
                    View {activeCategory?.name || 'Material'} Specifications <ArrowRight size={16} />
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
