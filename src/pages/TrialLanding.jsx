import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Component as HorizonHeroSection } from '../components/ui/horizon-hero-section';
import '../trial.css';

const TrialLanding = () => {
  return (
    <>
      <Helmet>
        <title>Trial Landing - Anchorstone Global</title>
      </Helmet>
      <HorizonHeroSection />
    </>
  );
};

export default TrialLanding;
