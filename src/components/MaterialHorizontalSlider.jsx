import React from 'react';
import { ImagesScrollingAnimation } from './ui/images-scrolling-animation';

const materialCards = [
  {
    id: 1,
    title: 'Plastic Scrap',
    desc: 'Post Industrial Regrinds, Lumps, & Rolls.',
    image: '/images/slider_plastic_scrap.png',
    video: '/videos/Materials_Products_1.mp4',
    link: '/materials',
    categoryIndex: 0
  },
  {
    id: 2,
    title: 'Metal Scrap',
    desc: 'High-Grade MS, SS, & Aluminium Scraps.',
    image: '/images/slider_metal_scrap.png',
    video: '/videos/metals_animation.mp4',
    link: '/materials',
    categoryIndex: 1
  },
  {
    id: 3,
    title: 'Paper Scrap',
    desc: 'Old Corrugated Containers (OCC), Old Newspapers (ONP) & Magazines (OMG).',
    image: '/images/slider_paper_scrap.png',
    video: '/videos/stocklot_ani_paper.mp4',
    link: '/materials',
    categoryIndex: 3
  },
  {
    id: 4,
    title: 'Stocklot Plastic Films',
    desc: 'LDPE Films Rolls, PE/PA Rolls, Polyester Rolls & BOPP.',
    image: '/images/slider_stocklot_plastic_films.png',
    video: '/videos/A_cinematic_slow_panning_shot.mp4',
    link: '/materials',
    categoryIndex: 2
  },
  {
    id: 5,
    title: 'Stocklot Paper Rolls',
    desc: 'Kraft Paper, Silicon Coated Paper & ALU/PAPER Duplex.',
    image: '/images/slider_stocklot_paper_rolls.png',
    video: '/videos/stocklot_ani_paper.mp4',
    link: '/materials',
    categoryIndex: 3
  }
];

const MaterialHorizontalSlider = () => {
  return (
    <div style={{ backgroundColor: '#f1f5f9', paddingTop: '6rem', paddingBottom: '24rem' }}>
      <ImagesScrollingAnimation cards={materialCards} />
    </div>
  );
};

export default MaterialHorizontalSlider;
