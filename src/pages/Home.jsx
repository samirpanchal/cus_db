import { Link } from 'react-router-dom';
import { Recycle, Globe as GlobeIcon, Truck } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Globe3D } from '../components/Globe3D';
import { HeroSection } from '../components/HeroSection';
import { LiquidButton } from '../components/ui/liquid-glass-button';
import AnimatedTypography from '../components/AnimatedTypography';
import MaterialHorizontalSlider from '../components/MaterialHorizontalSlider';
import AnchorstoneStory from '../components/AnchorstoneStory';
import '../slider.css';

const Home = () => {
  return (
    <div className="relative min-h-screen">
      <Helmet>
        <title>Global Scrap Material Supplier & Plastic Recycling | Anchorstone Global</title>
        <meta name="description" content="Anchorstone Global LLP specializes in the supply and export of bulk plastic scraps, metal scraps, and reprocessed granules globally from Ahmedabad." />
        <meta name="keywords" content="Plastic Scrap, Metal Scrap, PP Regrind, PVC Scrap, Anchorstone Global LLP, Scrap Materials Supplier, Circular Economy, Ahmedabad" />
        <link rel="canonical" href="https://anchorstoneglobal.co.in/" />
        
        {/* Hreflang for global targeting */}
        <link rel="alternate" hreflang="x-default" href="https://anchorstoneglobal.co.in/" />
        <link rel="alternate" hreflang="en" href="https://anchorstoneglobal.co.in/" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="Global Scrap Material Supplier & Plastic Recycling | Anchorstone Global" />
        <meta property="og:description" content="Anchorstone Global LLP specializes in the supply and export of bulk plastic scraps, metal scraps, and reprocessed granules globally from Ahmedabad." />
        <meta property="og:image" content="https://anchorstoneglobal.co.in/logo.png" />
        <meta property="og:url" content="https://anchorstoneglobal.co.in/" />
        <meta property="og:type" content="website" />
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

      {/* 3D Background Canvas */}
      <Globe3D />

      {/* Section 1: Hero Section */}
      <div className="relative z-10 w-full">
        <HeroSection 
          onExploreSolutions={() => window.location.href = '/contact'}
          onOpenNetwork={() => window.location.href = '/quote'}
          onOpenQuote={() => window.location.href = '/quote'}
        />
      </div>

      <div className="relative z-20 bg-white w-full">
        {/* Section 2: Text Animation */}
        <AnimatedTypography />

        {/* Section 3: Horizontal Card Slider */}
        <MaterialHorizontalSlider />

      {/* Section 4 & 5: Anchorstone Story Scroll & CTA */}
      {/* <AnchorstoneStory /> */}
      </div>
    </div>
  );
};

export default Home;

