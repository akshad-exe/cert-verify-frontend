import React from 'react';
import Header from '../components/Header';
import { Footer } from '@/components/Footer';
import { CertificateVerification } from '@/components/CertificateVerification';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-gray-50 flex flex-col">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex-grow">
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent mb-4 sm:mb-6 px-4">
            Certificate Verification
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            Verify the authenticity of TechCognita certificates and achievements. 
            Enter your certificate ID below to validate your certification.
          </p>
        </div>
        <CertificateVerification />
      </main>
      <Footer />
    </div>
  );
};

export default Index;