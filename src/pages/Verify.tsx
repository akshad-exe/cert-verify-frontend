import React, { useState } from 'react';
import axios from 'axios';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AlertCircle, Search, Award, Calendar, User, FileCheck, ArrowRight } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ModeToggle } from "@/components/mode-toggle";
import { Fade, Slide, Zoom } from 'react-awesome-reveal';

interface CertificateData {
  status: string;
  student_name: string;
  awarded_for: string;
  issue_date: string; // Or Date, depending on how the backend sends it
  certificate_id: string;
}

function Verify() {
  const [certificateId, setCertificateId] = useState('');
  const [certificateData, setCertificateData] = useState<CertificateData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCertificateId(event.target.value);
    setCertificateData(null); // Clear previous data on new input
    setError(null); // Clear previous errors on new input
  };

  const verifyCertificate = async () => {
    if (!certificateId) {
      setError('Please enter a Certificate ID.');
      return;
    }

    setLoading(true);
    setError(null);
    setCertificateData(null);

    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/verify/${certificateId}`);
      setCertificateData(response.data);
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response) {
        if (err.response.status === 404) {
          setError('Certificate Not Found');
        } else {
           setError('An error occurred while verifying the certificate.');
        }
      } else {
         setError('An error occurred while verifying the certificate.');
      }
      console.error('API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white`}>
      <Fade>
        <header className="bg-primary text-white py-6 shadow-md">
          <div className="container mx-auto flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center px-4">
            <h1 className="text-2xl font-bold text-center">Certificate Verification System – TechCognita</h1>
            <ModeToggle />
          </div>
        </header>
      </Fade>

      <main className={`container mx-auto py-12 px-4 flex-grow`}>
        <Slide direction="up" triggerOnce>
          <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden p-6 transition-all duration-300 hover:shadow-xl">
            <h2 className={`text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white`}>Verify Your Certificate</h2>
            
            <div className="mb-6">
              <label htmlFor="certificateId" className={`block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300`}>Certificate ID</label>
              <div className="relative">
                <Input
                  type="text"
                  id="certificateId"
                  className={`w-full pl-10 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-primary focus:border-primary rounded-md`}
                  value={certificateId}
                  onChange={handleInputChange}
                  placeholder="Enter Certificate ID"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <Button
              onClick={verifyCertificate}
              className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded-md transition-all duration-300 flex items-center justify-center gap-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="small" />
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <FileCheck className="h-5 w-5" />
                  <span>Verify Certificate</span>
                </>
              )}
            </Button>

            {loading && (
              <div className="mt-6 text-center">
                <Spinner size="medium" />
                <p className={'text-gray-700 dark:text-gray-300 mt-2'}>Searching for certificate...</p>
              </div>
            )}

            {error && (
              <Zoom duration={500}>
                <Alert variant="destructive" className="mt-6 animate-pulse">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Verification Failed</AlertTitle>
                  <AlertDescription>
                    {error}
                  </AlertDescription>
                </Alert>
              </Zoom>
            )}

            {certificateData && (
              <Fade delay={300} cascade damping={0.2}>
                <div className={`mt-8 p-6 border rounded-xl border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/30 text-gray-900 dark:text-white`}>
                  <h3 className={`text-xl font-bold mb-4 text-green-800 dark:text-green-400 flex items-center gap-2`}>
                    <Award className="h-6 w-6" />
                    <span>Certificate Verified</span>
                  </h3>
                  
                  <div className="space-y-3">
                    <p className={'flex items-center gap-2 text-gray-700 dark:text-gray-300'}>
                      <User className="h-5 w-5 text-primary" />
                      <span><strong>Student Name:</strong> {certificateData.student_name}</span>
                    </p>
                    
                    <p className={'flex items-center gap-2 text-gray-700 dark:text-gray-300'}>
                      <FileCheck className="h-5 w-5 text-primary" />
                      <span><strong>Awarded For:</strong> {certificateData.awarded_for}</span>
                    </p>
                    
                    <p className={'flex items-center gap-2 text-gray-700 dark:text-gray-300'}>
                      <Calendar className="h-5 w-5 text-primary" />
                      <span><strong>Date of Issue:</strong> {new Date(certificateData.issue_date).toDateString()}</span>
                    </p>
                    
                    <p className={'flex items-center gap-2 text-gray-700 dark:text-gray-300'}>
                      <ArrowRight className="h-5 w-5 text-primary" />
                      <span><strong>Certificate ID:</strong> {certificateData.certificate_id}</span>
                    </p>
                    
                    <p className={'flex items-center gap-2 mt-4'}>
                      <span className="text-green-600 dark:text-green-400 font-bold flex items-center gap-2">
                        <Award className="h-5 w-5" />
                        <span>{certificateData.status}</span>
                      </span>
                    </p>
                  </div>
                </div>
              </Fade>
            )}
          </div>
        </Slide>
      </main>
    </div>
  );
}

export default Verify;