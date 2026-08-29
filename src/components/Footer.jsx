import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { RuixenGradientFooter } from './ui/ruixen-gradient-footer';
import { LiquidButton } from './ui/liquid-glass-button';

const columns = [
  {
    title: "Plastics",
    links: [
      { name: "PP Regrind", path: "/materials/polypropylene-pp-regrind" },
      { name: "PE Lumps", path: "/materials/polyethylene-pe-lumps" },
      { name: "PVC Scrap", path: "/materials/polyvinyl-chloride-scrap-pvc-scrap" },
      { name: "PET Flakes", path: "/materials/polyethylene-terephthalate-pet-hot-washed-flakes" },
      { name: "HDPE Drums", path: "/materials/polyethylene-pe-scrap" }
    ],
  },
  {
    title: "Metal",
    links: [
      { name: "MS Scrap", path: "/materials" },
      { name: "Stainless Steel", path: "/materials" },
      { name: "Aluminium", path: "/materials" },
      { name: "Copper", path: "/materials" },
      { name: "Brass", path: "/materials" }
    ],
  },
  {
    title: "Plastic Films",
    links: [
      { name: "LDPE Rolls", path: "/materials" },
      { name: "PE/PA Films", path: "/materials" },
      { name: "Polyester Rolls", path: "/materials" },
      { name: "BOPP Films", path: "/materials" },
      { name: "CPP Films", path: "/materials" }
    ],
  },
  {
    title: "Stocklot Paper",
    links: [
      { name: "OCC", path: "/materials" },
      { name: "ONP", path: "/materials" },
      { name: "OMG", path: "/materials" },
      { name: "Kraft Paper", path: "/materials" },
      { name: "Duplex Board", path: "/materials" }
    ],
  },
];

const Footer = () => {
  return (
    <RuixenGradientFooter gradientHeight="35vh" className="relative">
      <div className="mx-auto w-full max-w-7xl px-6 pb-8 relative z-10 bg-white" style={{ paddingTop: '4rem' }}>
        <div className="grid gap-10 pb-10 sm:grid-cols-2 lg:grid-cols-6 bg-white">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 text-slate-900 mb-6">
              <img src="/logo.png" alt="Anchorstone Global" style={{ height: '45px', width: 'auto' }} />
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-slate-900 leading-tight">
                  Anchorstone Global
                </span>
                <span className="text-[10px] font-semibold text-emerald-600 tracking-wider uppercase">
                  Strategic Trade & Logistics
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-2 text-sm text-slate-600 mb-8 font-medium">
              <p className="flex items-start gap-2">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0 text-emerald-600" />
                <span>SHED NO. 19, HITENDRANAGAR DIAMAND PARK FEEDER NO.9<br />Ahmedabad, Gujarat, India 382340</span>
              </p>
              <p className="font-bold text-slate-800 mt-2">LLPIN: ACU-7275</p>
            </div>

            <Link to="/quote">
              <LiquidButton size="lg" className="w-full sm:w-auto text-emerald-900">
                Request a Formal Quote
              </LiquidButton>
            </Link>
          </div>

          <nav className="grid grid-cols-2 gap-x-8 gap-y-12 text-sm sm:grid-cols-4 lg:col-span-4 mt-2">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="text-slate-900 font-bold uppercase tracking-wider mb-5">{col.title}</h3>
                <ul className="flex flex-col gap-3.5">
                  {col.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.path}
                        className="text-slate-500 font-medium transition-colors hover:text-emerald-600"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-200 pt-8 pb-4 text-xs font-bold uppercase tracking-widest text-slate-400 sm:flex-row bg-white relative z-10">
          <span>&copy; {new Date().getFullYear()} Anchorstone Global LLP</span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Global Export Ready
          </span>
        </div>
      </div>
    </RuixenGradientFooter>
  );
};

export default Footer;
