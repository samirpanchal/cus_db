import { Leaf, ShieldCheck, TrendingUp } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const About = () => {
  return (
    <div>
      <Helmet>
        <title>About Us | Anchorstone Global LLP</title>
        <meta name="description" content="Anchorstone Global LLP is a dynamic enterprise committed to transforming the global waste management and recycling landscape with industrial scraps." />
        <link rel="canonical" href="https://anchorstoneglobal.co.in/about" />
      </Helmet>
      <section className="section" style={{ backgroundColor: '#ffffff', color: '#0f172a', padding: '60px 0', textAlign: 'center', borderBottom: '1px solid #e2e8f0' }}>
        <div className="container">
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>About Anchorstone Global LLP</h1>
          <p style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto', color: '#475569' }}>
            Empowering Global Sustainability Through Advanced Recycling and Scrap Solutions.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="about-grid">
            <div>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: 'var(--bg-dark)' }}>Who We Are</h2>
              <p style={{ fontSize: '1.1rem', marginBottom: '1rem', textAlign: 'justify' }}>
                <strong>Anchorstone Global LLP</strong> is a premier international waste management and resource recovery enterprise dedicated to transforming discarded materials into high-grade secondary commodities. Operating at the forefront of the global recycling supply chain, we specialize in the large-scale sourcing, processing, and export of essential industrial recyclables, including Metal Scrap, Plastic Scrap, and Paper Scrap.
              </p>
              <p style={{ fontSize: '1.1rem', marginBottom: '1rem', textAlign: 'justify' }}>
                Our core mission is to bridge the gap between industrial waste generation and sustainable manufacturing. By engineering tailored, eco-conscious resource solutions, we enable businesses worldwide to optimize their operations while drastically reducing their ecological footprint. At Anchorstone Global LLP, our operations are deeply anchored in the principles of the Circular Economy. We utilize innovative processing technologies to ensure that every material we handle meets rigorous international quality benchmarks, closing the loop on consumption and championing a regenerative economic model.
              </p>
              <p style={{ fontSize: '1.1rem', marginBottom: '1rem', textAlign: 'justify' }}>
                Recognized as a trusted global partner, Anchorstone Global LLP proudly serves a diverse portfolio of industries spanning multiple continents. Through a robust logistics network and unwavering dedication to transparency, we have established ourselves as a dominant player in the international scrap trading arena, seamlessly connecting verified buyers and sellers across borders.
              </p>

              <ul style={{ marginTop: '2rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', fontSize: '1.1rem', fontWeight: '600' }}>
                  <ShieldCheck className="text-green" size={28} /> Reliable Quality Assurance
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', fontSize: '1.1rem', fontWeight: '600' }}>
                  <TrendingUp className="text-green" size={28} /> Sustainable Economic Growth
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', fontSize: '1.1rem', fontWeight: '600' }}>
                  <Leaf className="text-green" size={28} /> Environmental Responsibility
                </li>
              </ul>
            </div>
            <div style={{ background: 'var(--text-light)', padding: '3rem', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
              <h3 style={{ color: 'var(--primary-green)', marginBottom: '1.5rem', fontSize: '1.5rem' }}>Core Categories</h3>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ color: 'var(--bg-dark)' }}>Plastic Scrap</h4>
                <p style={{ color: 'var(--gray)' }}>Regrinds, lumps, rolls, scrap films, and reprocessed granules (PP, PE, PET, PVC, PS).</p>
              </div>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ color: 'var(--bg-dark)' }}>Metal Scrap</h4>
                <p style={{ color: 'var(--gray)' }}>MS scrap, SS scrap, and aluminum scrap.</p>
              </div>

              <div>
                <h4 style={{ color: 'var(--bg-dark)' }}>Paper & Others</h4>
                <p style={{ color: 'var(--gray)' }}>Stocklot paper rolls and used tyre scraps for diverse industrial needs.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
