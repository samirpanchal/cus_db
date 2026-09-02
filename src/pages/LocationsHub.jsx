import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Globe, Anchor, MapPin } from 'lucide-react';

const LocationsHub = () => {
  return (
    <>
      <Helmet>
        <title>Global Network & Locations | Anchorstone Global</title>
        <meta name="description" content="Explore Anchorstone Global's extensive network of supply chain locations, including global export destinations and our domestic India network." />
      </Helmet>
      
      <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl font-bold text-slate-900 tracking-tight mb-4">Our Global Network</h1>
            <p className="text-lg text-slate-600">
              Anchorstone Global LLP operates a massive supply chain network across the world. Select a region below to explore our specific material availability and logistics capabilities in that area.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Global Directory */}
            <Link to="/locations/global" className="group block bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-500 transition-colors duration-300">
                <Globe className="w-7 h-7 text-emerald-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">Global Exports</h2>
              <p className="text-slate-600 mb-6">
                Discover our massive international reach. We export bulk scraps and granules to all major global ports across the USA, Europe, Asia, and Africa.
              </p>
              <span className="text-emerald-600 font-bold group-hover:text-emerald-700 flex items-center gap-2">
                Browse Global Ports &rarr;
              </span>
            </Link>

            {/* India Ports Directory */}
            <Link to="/locations/import-india" className="group block bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                <Anchor className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">India Import Ports</h2>
              <p className="text-slate-600 mb-6">
                We handle high-volume import logistics directly to all major sea ports and Inland Container Depots (ICDs) across India.
              </p>
              <span className="text-blue-600 font-bold group-hover:text-blue-700 flex items-center gap-2">
                Browse India Ports &rarr;
              </span>
            </Link>

            {/* India Domestic Directory */}
            <Link to="/locations/india" className="group block bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-orange-500 transition-colors duration-300">
                <MapPin className="w-7 h-7 text-orange-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">India Domestic</h2>
              <p className="text-slate-600 mb-6">
                Our domestic distribution network covers over 500 cities across India, ensuring localized supply of reprocessed granules and scrap.
              </p>
              <span className="text-orange-600 font-bold group-hover:text-orange-700 flex items-center gap-2">
                Browse India Cities &rarr;
              </span>
            </Link>

          </div>
        </div>
      </div>
    </>
  );
};

export default LocationsHub;
