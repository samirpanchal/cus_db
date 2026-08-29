import React from 'react';
import { Link } from 'react-router-dom';
import FlowArt, { FlowSection } from './ui/story-scroll';
import { LiquidButton } from './ui/liquid-glass-button';

export default function AnchorstoneStory() {
  return (
    <FlowArt aria-label="Anchorstone Global Story">
      <FlowSection aria-label="Who we are" style={{ backgroundColor: '#2dfc52', color: '#000' }}>
        <p className="text-sm sm:text-base md:text-lg font-bold uppercase tracking-[0.2em] text-black/80">01 — Who we are</p>
        <hr className="my-[2vw] border-none border-t border-black/30" />
        <div>
          <h1 className="text-[clamp(2.5rem,6vw,7rem)] font-bold leading-[0.85] uppercase tracking-tight">
            Anchorstone
            <br />
            Global LLP
          </h1>
        </div>
        <hr className="my-[2vw] border-none border-t border-black/30" />
        <p className="mt-auto max-w-[50ch] text-[clamp(1rem,2.5vw,2rem)] font-medium leading-relaxed text-black/90">
          We are a strategic trade and logistics partner based in Ahmedabad, supplying premium recycled materials to global manufacturers.
        </p>
      </FlowSection>

      <FlowSection aria-label="Our Mission" style={{ backgroundColor: '#6bfc83', color: '#000' }}>
        <p className="text-sm sm:text-base md:text-lg font-bold uppercase tracking-[0.2em] text-black/80">02 — The mission</p>
        <hr className="my-[2vw] border-none border-t border-black/30" />
        <div>
          <h2 className="text-[clamp(2.5rem,6vw,7rem)] font-bold leading-[0.85] uppercase tracking-tight">
            Circular
            <br />
            Economy
            <br />
            First
          </h2>
        </div>
        <hr className="my-[2vw] border-none border-t border-black/30" />
        <p className="max-w-[50ch] text-[clamp(1rem,2.5vw,2rem)] font-medium leading-relaxed text-black/90">
          We bridge the gap between waste generation and sustainable manufacturing. Every ton of material we supply reduces the world's carbon footprint.
        </p>
        <hr className="my-[2vw] border-none border-t border-black/30" />
        <div className="flex flex-wrap gap-[3vw]">
          <div className="min-w-[180px] flex-1">
            <p className="mb-2 text-sm font-bold uppercase tracking-wider text-black">Sustainable Sourcing</p>
            <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed text-black/75">
              High-grade regrinds, lumps, and scrap materials recovered responsibly.
            </p>
          </div>
          <div className="min-w-[180px] flex-1">
            <p className="mb-2 text-sm font-bold uppercase tracking-wider text-black">Global Export</p>
            <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed text-black/75">
              A robust international network ensuring seamless delivery worldwide.
            </p>
          </div>
          <div className="min-w-[180px] flex-1">
            <p className="mb-2 text-sm font-bold uppercase tracking-wider text-black">Reliable Supply Chain</p>
            <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed text-black/75">
              Timely logistics so you get exactly what you need without disruptions.
            </p>
          </div>
        </div>
        <hr className="my-[2vw] border-none border-t border-black/30" />
        <p className="mt-auto ml-auto max-w-[50ch] text-right text-[clamp(1rem,2.5vw,2rem)] font-medium leading-relaxed text-black/90">
          Quality raw materials that empower industries to build a greener future.
        </p>
      </FlowSection>

      <FlowSection aria-label="Our Materials" style={{ backgroundColor: '#98fca9', color: '#000' }}>
        <p className="text-sm sm:text-base md:text-lg font-bold uppercase tracking-[0.2em] text-black/80">03 — Our Materials</p>
        <hr className="my-[2vw] border-none border-t border-black/30" />
        <div>
          <h2 className="text-[clamp(2.5rem,6vw,7rem)] font-bold leading-[0.85] uppercase tracking-tight">
            Premium
            <br />
            Scrap &
            <br />
            Granules
          </h2>
        </div>
        <hr className="my-[2vw] border-none border-t border-black/30" />
        <p className="max-w-[50ch] text-[clamp(1rem,2.5vw,2rem)] font-medium leading-relaxed text-black/90">
          From industrial plastic waste to high-grade metals, we supply clean, processed materials ready for manufacturing.
        </p>
        <hr className="my-[2vw] border-none border-t border-black/30" />
        <div className="flex flex-wrap gap-[3vw]">
          <div className="min-w-[180px] flex-1">
            <p className="mb-2 text-sm font-bold uppercase tracking-wider text-black">Plastic Scrap</p>
            <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed text-black/75">
              Post-industrial regrinds, lumps, and rolls. PP, PE, PVC, and more.
            </p>
          </div>
          <div className="min-w-[180px] flex-1">
            <p className="mb-2 text-sm font-bold uppercase tracking-wider text-black">Metal Scrap</p>
            <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed text-black/75">
              High-grade MS, Stainless Steel, and Aluminium scraps.
            </p>
          </div>
          <div className="min-w-[180px] flex-1">
            <p className="mb-2 text-sm font-bold uppercase tracking-wider text-black">Paper Scrap</p>
            <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed text-black/75">
              OCC, ONP, OMG, and specialized stocklot paper rolls.
            </p>
          </div>
        </div>
        <hr className="my-[2vw] border-none border-t border-black/30" />
        <div className="flex flex-wrap gap-[3vw]">
          <div className="min-w-[180px] flex-1">
            <p className="mb-2 text-sm font-bold uppercase tracking-wider text-black">Stocklot Films</p>
            <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed text-black/75">
              LDPE, PE/PA, Polyester, and BOPP film rolls for industrial use.
            </p>
          </div>
          <div className="min-w-[180px] flex-1">
            <p className="mb-2 text-sm font-bold uppercase tracking-wider text-black">Reprocessed Granules</p>
            <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed text-black/75">
              High-quality pellets ready for direct injection molding and extrusion.
            </p>
          </div>
        </div>
      </FlowSection>

      <FlowSection aria-label="Join us" style={{ backgroundColor: '#d0fce0', color: '#000' }}>
        <p className="text-sm sm:text-base md:text-lg font-bold uppercase tracking-[0.2em] text-black/80">04 — Partner with us</p>
        <hr className="my-[2vw] border-none border-t border-black/30" />
        <div>
          <h2 className="text-[clamp(2.5rem,6vw,7rem)] font-bold leading-[0.85] uppercase tracking-tight">
            Ready
            <br />
            To
            <br />
            Begin?
          </h2>
        </div>
        <hr className="my-[2vw] border-none border-t border-black/30" />
        <p className="mt-auto max-w-[50ch] text-[clamp(1rem,2.5vw,2rem)] font-medium leading-relaxed text-black/90">
          Whether you need plastic films, metal scrap, or reprocessed granules, we have the inventory to meet your industrial demands.
        </p>
      </FlowSection>
    </FlowArt>
  );
}
