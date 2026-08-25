import type React from 'react';
import Header from '@/layout/Header';
import CallToAction from './sections/CallToAction';
import Features from './sections/Features';
import Footer from './sections/Footer';
import Hero from './sections/Hero';
import TrustBand from './sections/TrustBand';
import Workflow from './sections/Workflow';

export default function LandingPage(): React.ReactElement {
  return (
    <>
      <Header />
      <Hero />
      <TrustBand />
      <Features />
      <Workflow />
      <CallToAction />
      <Footer />
    </>
  );
}
