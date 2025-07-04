import { useState } from 'react';
import { VerificationForm } from '@/components/VerificationForm';
import { CertificateDisplay } from '@/components/CertificateDisplay';
import type { Certificate } from '@/types/certificate';
import { verifyCertificate as verifyCertificateApi } from '@/api/certificate';
// import { normalizeCertificate } from '@/types/normalizeCertificate';

export const CertificateVerification = () => {
  const [verifiedCertificate, setVerifiedCertificate] = useState<Certificate | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleVerification = async (certificateId: string) => {
    setError(null);
    setVerifiedCertificate(null);
    setIsVerifying(true);
    try {
      const response = await verifyCertificateApi(certificateId); 
      // setVerifiedCertificate(normalizeCertificate(response.data));
      setVerifiedCertificate(response.data);
      setIsVerifying(false);
    } catch (err: any) {
      setIsVerifying(false);
      if (err.response && err.response.status === 404) {
        setError('Certificate not found. Please check the ID and try again.');
      } else if (err.response && err.response.status === 403) {
        setError('You are not authorized to view this certificate.');
      } else {
        setError('An error occurred during verification. Please try again.');
      }
    }
  };

  const handleReset = () => {
    setVerifiedCertificate(null);
    setError(null);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {!verifiedCertificate ? (
        <VerificationForm 
          onVerify={handleVerification}
          isVerifying={isVerifying}
          error={error}
        />
      ) : (
        <CertificateDisplay 
          certificate={verifiedCertificate}
          onReset={handleReset}
        />
      )}
    </div>
  );
};
