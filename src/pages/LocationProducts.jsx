import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { productDetailsData } from '../data/productDetailsData';
import { globalLocations } from '../data/locations';
import { indiaPortsLocations } from '../data/indiaPortsLocations';
import { indiaLocations } from '../data/indiaLocations';
import { Package, ArrowRight } from 'lucide-react';

const LocationProducts = ({ region }) => {
  const { location } = useParams();

  // Determine which location dictionary to use based on the region route
  const locationsMap = useMemo(() => {
    if (region === 'export') return globalLocations;
    if (region === 'import-india') return indiaPortsLocations;
    return indiaLocations; // default to 'india'
  }, [region]);

  const locationName = locationsMap[location];
  
  // If the location doesn't exist in our dictionary, show a 404-like message
  if (!locationName) {
    return (
      <div className="pt-40 pb-24 text-center min-h-screen bg-slate-50">
        <h1 className="text-3xl font-bold text-slate-800">Location not found</h1>
        <Link to="/locations" className="text-emerald-600 mt-4 inline-block hover:underline">Back to Locations Directory</Link>
      </div>
    );
  }

  const regionTitle = 
    region === 'export' ? 'Global Export' : 
    region === 'import-india' ? 'Import Ports' : 
    'Domestic Distribution';

  const backLink = 
    region === 'export' ? '/locations/global' : 
    region === 'import-india' ? '/locations/import-india' : 
    '/locations/india';

  return (
    <>
      <Helmet>
        <title>Bulk Scraps & Granules in {locationName} | Anchorstone Global</title>
        <meta name="description" content={`Explore our complete catalog of bulk plastic scrap, metal scrap, and reprocessed granules available for ${locationName}.`} />
      </Helmet>

      <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="mb-12">
            <Link to={backLink} className="text-emerald-600 font-bold hover:text-emerald-700 transition-colors mb-6 inline-block">
              &larr; Back to {regionTitle} Directory
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-4">
              Materials in <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">{locationName}</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-3xl">
              Anchorstone Global supplies the following bulk materials for {locationName}. Select a product below to view detailed specifications, request a quote, or arrange logistics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(productDetailsData).map(([slug, product]) => {
              // Only link to the final generated HTML file to ensure Google indexes it properly
              // We append .html so the UI acts as a true HTML Sitemap for the statically generated pages
              let finalUrl = "";
              if (region === 'export') finalUrl = `/export/${location}/${slug}.html`;
              if (region === 'import-india') finalUrl = `/import-india/${location}/${slug}.html`;
              if (region === 'india') finalUrl = `/india/${location}/${slug}.html`;

              return (
                <a 
                  key={slug} 
                  href={finalUrl}
                  className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col"
                >
                  <div className="h-48 overflow-hidden relative bg-slate-100">
                    {/* Fallback pattern if no hero image */}
                    <img 
                      src={product.heroImage} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  
                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Package className="w-5 h-5 text-emerald-500" />
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                          {product.category || 'Material'}
                        </span>
                      </div>
                      <h2 className="text-xl font-bold text-slate-900 mb-2 leading-tight">
                        {product.name}
                      </h2>
                    </div>
                    
                    <div className="mt-6 flex items-center justify-between text-emerald-600 font-bold group-hover:text-emerald-700 transition-colors">
                      <span className="text-sm uppercase tracking-wide">View Details</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </a>
              );
            })}
          </div>

        </div>
      </div>
    </>
  );
};

export default LocationProducts;
