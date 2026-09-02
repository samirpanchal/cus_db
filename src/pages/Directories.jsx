import React, { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { globalLocations } from '../data/locations';
import { indiaPortsLocations } from '../data/indiaPortsLocations';
import { indiaLocations } from '../data/indiaLocations';
import { Search } from 'lucide-react';

// Reusable Directory Component
const DirectoryList = ({ title, description, locationsMap, basePath, iconColor }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLocations = useMemo(() => {
    return Object.entries(locationsMap).filter(([slug, name]) => 
      name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [locationsMap, searchTerm]);

  return (
    <>
      <Helmet>
        <title>{title} | Anchorstone Global</title>
        <meta name="description" content={description} />
      </Helmet>

      <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="mb-12">
            <Link to="/locations" className="text-emerald-600 font-bold hover:text-emerald-700 transition-colors mb-6 inline-block">
              &larr; Back to Global Network
            </Link>
            <h1 className="text-4xl font-bold text-slate-900 tracking-tight mb-4">{title}</h1>
            <p className="text-lg text-slate-600 max-w-3xl mb-8">
              {description}
            </p>

            {/* Search Bar */}
            <div className="relative max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-xl leading-5 bg-white placeholder-slate-500 focus:outline-none focus:placeholder-slate-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 sm:text-sm transition-shadow shadow-sm"
                placeholder="Search locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredLocations.map(([slug, name]) => (
              <Link 
                key={slug} 
                to={`${basePath}/${slug}`}
                className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex items-center group"
              >
                <div className={`w-2 h-full rounded-full ${iconColor} mr-4 opacity-70 group-hover:opacity-100 transition-opacity`} />
                <span className="font-medium text-slate-700 group-hover:text-slate-900">{name}</span>
              </Link>
            ))}
            {filteredLocations.length === 0 && (
              <div className="col-span-full py-12 text-center text-slate-500">
                No locations found matching "{searchTerm}"
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  );
};


export const GlobalDirectory = () => (
  <DirectoryList 
    title="Global Export Destinations"
    description="We supply bulk scrap and reprocessed granules to major ports worldwide. Select a port below to view available products."
    locationsMap={globalLocations}
    basePath="/export"
    iconColor="bg-emerald-500"
  />
);

export const IndiaPortsDirectory = () => (
  <DirectoryList 
    title="India Import Ports & ICDs"
    description="We handle massive import logistics for scrap materials arriving at sea ports and inland container depots across India."
    locationsMap={indiaPortsLocations}
    basePath="/import-india"
    iconColor="bg-blue-500"
  />
);

export const IndiaDirectory = () => (
  <DirectoryList 
    title="India Domestic Distribution"
    description="Anchorstone Global and The Polylot Company maintain a massive localized distribution network spanning over 500 cities in India."
    locationsMap={indiaLocations}
    basePath="/india"
    iconColor="bg-orange-500"
  />
);
