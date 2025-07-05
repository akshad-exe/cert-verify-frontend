import { useState } from 'react';
import { VerificationForm } from '@/components/VerificationForm';
import { CertificateDisplay } from '@/components/CertificateDisplay';
import type { Certificate } from '@/types/certificate';
import { verifyCertificate as verifyCertificateApi } from '@/api/certificate';
import { castError } from '@/types/error';

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
      setVerifiedCertificate(response.data);
      setIsVerifying(false);
    } catch (err: unknown) {
      setIsVerifying(false);
      const error = castError(err);
      if (error.response && error.response.status === 404) {
        setError('Certificate not found. Please check the ID and try again.');
      } else if (error.response && error.response.status === 403) {
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
