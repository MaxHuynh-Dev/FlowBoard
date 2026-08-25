import type React from 'react';
import CallToAction from './sections/CallToAction';
import Features from './sections/Features';
import Footer from './sections/Footer';
import Hero from './sections/Hero';
import Navbar from './sections/Navbar';
import TrustBand from './sections/TrustBand';
import Workflow from './sections/Workflow';

export default function LandingPage(): React.ReactElement {
  return (
    <>
      <Navbar />
      <Hero />
      <TrustBand />
      <Features />
      <Workflow />
      <CallToAction />
      <Footer />
    </>
  );
}
