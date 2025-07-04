import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Search, QrCode, Loader2, Shield } from 'lucide-react';

interface VerificationFormProps {
  onVerify: (certificateId: string) => void;
  isVerifying: boolean;
  error: string | null;
}

export const VerificationForm: React.FC<VerificationFormProps> = ({
  onVerify,
  isVerifying,
  error
}) => {
  const [certificateId, setCertificateId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (certificateId.trim()) {
      onVerify(certificateId.trim());
    }
  };

  const handleDemoVerification = () => {
    setCertificateId('TC-2024-001');
    onVerify('TC-2024-001');
  };

  return (
    <Card className="bg-white shadow-2xl border-0 max-w-2xl mx-auto">
      <CardContent className="p-6 sm:p-8 lg:p-12">
        <div className="text-center mb-8 lg:mb-10">
          <div className="inline-flex p-4 sm:p-6 bg-orange-100 rounded-full mb-4 sm:mb-6">
            <Shield className="h-8 w-8 sm:h-12 sm:w-12 text-orange-500" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
            Verify Your Certificate
          </h2>
          <p className="text-gray-600 text-base sm:text-lg px-2">
            Enter your certificate ID to verify its authenticity
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
          <div>
            <label htmlFor="certificateId" className="block text-sm sm:text-base font-semibold text-gray-700 mb-2 sm:mb-3">
              Certificate ID
            </label>
            <Input
              id="certificateId"
              type="text"
              placeholder="e.g., TC-2024-001"
              value={certificateId}
              onChange={(e) => setCertificateId(e.target.value)}
              className="text-center text-lg sm:text-xl font-mono bg-gray-50 border-2 border-gray-200 focus:border-orange-500 focus:ring-orange-500 h-12 sm:h-14"
              disabled={isVerifying}
            />
          </div>

          {error && (
            <div className="p-4 sm:p-6 bg-red-50 border-2 border-red-200 rounded-xl">
              <p className="text-red-700 text-center font-medium text-sm sm:text-base">{error}</p>
            </div>
          )}

          <div className="space-y-4 sm:space-y-6">
            <Button
              type="submit"
              disabled={!certificateId.trim() || isVerifying}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 sm:py-4 text-base sm:text-lg rounded-xl shadow-lg"
            >
              {isVerifying ? (
                <>
                  <Loader2 className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                  <span className="text-sm sm:text-base">Verifying Certificate...</span>
                </>
              ) : (
                <>
                  <Search className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="text-sm sm:text-base">Verify Certificate</span>
                </>
              )}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-xs sm:text-sm uppercase">
                <span className="bg-white px-3 sm:px-4 text-gray-500 font-medium">or try demo</span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={handleDemoVerification}
              disabled={isVerifying}
              className="w-full border-2 border-dashed border-orange-300 hover:border-orange-500 hover:bg-orange-50 text-orange-600 font-medium py-3 sm:py-4 text-base sm:text-lg rounded-xl"
            >
              <QrCode className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5" />
              <span className="text-sm sm:text-base">Try Sample Certificate</span>
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
