import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { RuixenGradientFooter } from './ui/ruixen-gradient-footer';
import { LiquidButton } from './ui/liquid-glass-button';
import { HoverLinkAnimation } from './ui/hover-link-animation';

const columns = [
  {
    title: "Plastics",
    links: [
      { name: "PP Regrind", path: "/materials/polypropylene-pp-regrind.html" },
      { name: "PE Lumps", path: "/materials/polyethylene-pe-lumps.html" },
      { name: "PVC Scrap", path: "/materials/polyvinyl-chloride-scrap-pvc-scrap.html" },
      { name: "PET Flakes", path: "/materials/polyethylene-terephthalate-pet-hot-washed-flakes.html" },
      { name: "HDPE Drums", path: "/materials/polyethylene-pe-scrap.html" }
    ],
  },
  {
    title: "Metal",
    links: [
      { name: "SS 304 Scrap", path: "/materials/ss-304-scrap.html" },
      { name: "SS 316 Scrap", path: "/materials/ss-316-scrap.html" },
      { name: "HMS 1 Scrap", path: "/materials/hms-1-scrap.html" },
      { name: "Aluminium Wire", path: "/materials/aluminium-wire-scrap.html" },
      { name: "Aluminium 6063", path: "/materials/aluminium-6063-scrap.html" }
    ],
  },
  {
    title: "Plastic Films",
    links: [
      { name: "LDPE Rolls", path: "/materials/ldpe-film-in-reels.html" },
      { name: "BOPP Films", path: "/materials/bopp-film-in-reels-natural-metalized-pearlised.html" },
      { name: "PET Uncoated", path: "/materials/polyester-pet-uncoated-film-in-reels-natural-holographic-metalized.html" },
      { name: "PVC Rigid Film", path: "/materials/pvc-soft-rigid-film-in-reels-sheet-natural-white-color.html" },
      { name: "PE/PA Films", path: "/materials/pe-pa-film-any-color.html" }
    ],
  },
  {
    title: "Stocklot Paper",
    links: [
      { name: "Silicon Paper", path: "/materials/silicon-printed-unprinted-paper-release-paper.html" },
      { name: "Kraft Paper", path: "/materials/kraft-papers-virgin-bleach-sack-max-width-1600mm.html" },
      { name: "Thermal Paper", path: "/materials/thermal-paper.html" },
      { name: "Alu Laminated", path: "/materials/alu-laminated-paper-reels-sheet.html" },
      { name: "Metalized Paper", path: "/materials/metalized-paper-silver-gold-paper-reels-sheet.html" }
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
              <div className="flex flex-col justify-center">
                <span className="text-xl font-bold tracking-tight leading-tight bg-gradient-to-br from-[#5cb878] to-[#387a9f] bg-clip-text text-transparent">
                  Anchorstone Global LLP
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
            <div className="flex flex-col gap-3">
              <Link to="/locations" className="text-emerald-600 font-bold hover:text-emerald-700 transition-colors flex items-center gap-2 uppercase tracking-widest text-sm">
                <MapPin className="w-5 h-5" />
                Global Network & Locations
              </Link>
            </div>
          </div>

          <nav className="grid grid-cols-2 gap-x-8 gap-y-12 text-sm sm:grid-cols-4 lg:col-span-4 mt-2">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="font-bold uppercase tracking-wider mb-5 bg-gradient-to-br from-[#5cb878] to-[#387a9f] bg-clip-text text-transparent">{col.title}</h3>
                <ul className="flex flex-col gap-3.5">
                  {col.links.map((link) => (
                    <li key={link.name}>
                      <Link to={link.path}>
                        <HoverLinkAnimation
                          as="span"
                          className="text-slate-500 font-medium transition-colors hover:text-[#2ecc71]"
                          barGradient="linear-gradient(to bottom right, #5cb878, #387a9f)"
                        >
                          {link.name}
                        </HoverLinkAnimation>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-200 pt-8 pb-4 text-xs font-bold uppercase tracking-widest text-slate-400 sm:flex-row bg-white relative z-10">
          <div className="flex items-center gap-4">
            <span>&copy; {new Date().getFullYear()} Anchorstone Global LLP</span>
            <Link to="/privacy-policy" className="hover:text-emerald-500 transition-colors hidden sm:inline-block">Privacy Policy</Link>
          </div>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Global Export Ready
          </span>
          <Link to="/privacy-policy" className="hover:text-emerald-500 transition-colors sm:hidden">Privacy Policy</Link>
        </div>
      </div>
    </RuixenGradientFooter>
  );
};

export default Footer;
