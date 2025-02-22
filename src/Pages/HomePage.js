import React from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import QueryForm from '../components/QueryForm';
import PackageInfo from '../components/PackageInfo';
import TempleCards from '../components/TempleCards';
import PackagesSection from '../components/PackagesSection';
import OpeningClosingDates from '../components/OpeningClosingDates';
import TopDestinationsSection from '../components/TopDestination';
import CharDhamInfoAndMap from '../components/InfoMap';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main>
        <HeroSection />
        <div className="max-w-7xl mx-auto px-1 sm:px-2 lg:px-0">
          <QueryForm />
        </div>
        <div className="max-w-7xl mx-auto px-1 sm:px-2 lg:px-0">
        <PackageInfo />
        <TempleCards/>
          <PackagesSection/>
          <TopDestinationsSection/>
          <OpeningClosingDates/>
          <CharDhamInfoAndMap />
        </div>
        <Footer/>
      </main>
    </div>
  );
};

export default HomePage;