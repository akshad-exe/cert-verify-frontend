import React, { useState} from 'react';
import { verifyCertificate as verifyCertificateApi } from '../api/certificate';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AlertCircle, Search, Award, Calendar, User, FileCheck, ArrowRight } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ModeToggle } from "@/components/mode-toggle";
import { Fade, Slide, Zoom } from 'react-awesome-reveal';
import MouseSparkles from '@/components/MouseSparkles';

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
      const response = await verifyCertificateApi(certificateId);
      setCertificateData(response.data);
      // Change cursor to verification check mark when certificate is verified
      if (window.setCursorVerify) {
        window.setCursorVerify();
        setTimeout(() => {
          if (window.resetCursor) window.resetCursor();
        }, 2000); // Reset cursor after 2 seconds
      }
    } catch (err: any) {
      if (err.response) {
        if (err.response.status === 404) {
          setError('Certificate Not Found');
        } else {
           setError('An error occurred while verifying the certificate.');
        }
      } else {
         setError('An error occurred while verifying the certificate.');
      }
      console.error('API Error:', err);
      
      // Change cursor to invalid X mark when verification fails
      if (window.setCursorInvalid) {
        window.setCursorInvalid();
        setTimeout(() => {
          if (window.resetCursor) window.resetCursor();
        }, 2000); // Reset cursor after 2 seconds
      }
    } finally {
      setLoading(false);
    }
  };

  // Custom cursor event handlers
  const handleVerifyButtonMouseEnter = () => {
    if (!loading && window.setCursorVerify) window.setCursorVerify();
  };

  const handleVerifyButtonMouseLeave = () => {
    if (window.resetCursor) window.resetCursor();
  };

  const handleCertificateResultMouseEnter = () => {
    if (window.setCursorVerify) window.setCursorVerify();
  };

  const handleCertificateResultMouseLeave = () => {
    if (window.resetCursor) window.resetCursor();
  };

  const handleErrorResultMouseEnter = () => {
    if (window.setCursorInvalid) window.setCursorInvalid();
  };

  const handleErrorResultMouseLeave = () => {
    if (window.resetCursor) window.resetCursor();
  };

  return (
    <div className={`min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white`}>
      <MouseSparkles />
      <Fade>
        <header className="bg-primary text-white py-6 shadow-md">
          <div className="container mx-auto flex flex-row items-center px-4">
            <h1 className="flex-1 break-words text-2xl sm:text-4xl md:text-6xl font-bold leading-tight text-center sm:text-left">Certificate Verification System-TechCognita</h1>
            <div className="ml-4 flex-shrink-0">
              <ModeToggle />
            </div>
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
              onMouseEnter={handleVerifyButtonMouseEnter}
              onMouseLeave={handleVerifyButtonMouseLeave}
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
                <Alert 
                  variant="destructive" 
                  className="mt-6 animate-pulse"
                  onMouseEnter={handleErrorResultMouseEnter}
                  onMouseLeave={handleErrorResultMouseLeave}
                >
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
                <div 
                  className={`mt-8 p-6 border rounded-xl border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/30 text-gray-900 dark:text-white`}
                  onMouseEnter={handleCertificateResultMouseEnter}
                  onMouseLeave={handleCertificateResultMouseLeave}
                >
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