import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Fade, Zoom } from 'react-awesome-reveal';
import { FileText, User, Award, Calendar, Save, ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react';
import { getCertificateById, updateCertificate } from '../../api/admin';
import { toast } from 'react-hot-toast';

function AdminEditCertificate() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [certificateId, setCertificateId] = useState('');
  const [studentName, setStudentName] = useState('');
  const [awardedFor, setAwardedFor] = useState('');
  const [issueDate, setIssueDate] = useState('');
  
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        setLoading(true);
        if (!id) {
          setError('Certificate ID is missing.');
          setLoading(false);
          return;
        }
        const response = await getCertificateById(id);
        
        const certificate = response.data;
        
        // Handle both snake_case and camelCase naming conventions
        setCertificateId(certificate.certificate_id || certificate.certificateId || '');
        setStudentName(certificate.student_name || certificate.holderName || '');
        setAwardedFor(certificate.awarded_for || certificate.courseName || '');
        setIssueDate(certificate.issue_date || certificate.issueDate || '');
        
        setError(null);
      } catch (err) {
        console.error('Error fetching certificate:', err);
        setError('Failed to load certificate data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCertificate();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!certificateId || !studentName || !awardedFor || !issueDate) {
      setError('All fields are required');
      return;
    }
    
    try {
      setSubmitting(true);
      setError(null);
      
      if (!id) {
        setError('Certificate ID is missing for update.');
        setSubmitting(false);
        return;
      }
      await updateCertificate(id, {
        certificate_id: certificateId,
        student_name: studentName,
        awarded_for: awardedFor,
        issue_date: issueDate
      });
      
      setSuccess(true);
      toast.success('Certificate updated successfully');
      
      // Navigate back after a short delay
      setTimeout(() => {
        navigate('/admin/certificates');
      }, 1500);
      
    } catch (err) {
      console.error('Error updating certificate:', err);
      setError('Failed to update certificate. Please try again.');
      toast.error('Failed to update certificate');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <Fade>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Edit Certificate</h1>
            <p className="text-muted-foreground mt-1">Update certificate information</p>
          </div>
          <Button 
            variant="outline" 
            onClick={() => navigate('/admin/certificates')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to List
          </Button>
        </div>
      </Fade>

      <Zoom>
        <Card className="overflow-hidden">
          {loading ? (
            <div className="flex justify-center items-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2 text-muted-foreground">Loading certificate data...</span>
            </div>
          ) : error ? (
            <div className="p-6 text-center text-red-500">
              <p>{error}</p>
              <Button 
                variant="outline" 
                onClick={() => navigate('/admin/certificates')} 
                className="mt-4"
              >
                Back to List
              </Button>
            </div>
          ) : success ? (
            <div className="p-8 text-center">
              <div className="flex justify-center mb-4">
                <CheckCircle2 className="h-16 w-16 text-green-500" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Certificate Updated!</h2>
              <p className="text-muted-foreground mb-6">The certificate has been successfully updated.</p>
              <Button onClick={() => navigate('/admin/certificates')}>
                Return to Certificate List
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>Certificate Details</CardTitle>
                <CardDescription>Edit the certificate information below</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="certificateId">Certificate ID</Label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="certificateId"
                      value={certificateId}
                      onChange={(e) => setCertificateId(e.target.value)}
                      placeholder="Enter certificate ID"
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="studentName">Student Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="studentName"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      placeholder="Enter student name"
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="awardedFor">Awarded For</Label>
                  <div className="relative">
                    <Award className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="awardedFor"
                      value={awardedFor}
                      onChange={(e) => setAwardedFor(e.target.value)}
                      placeholder="Enter course or achievement"
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="issueDate">Issue Date</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="issueDate"
                      type="date"
                      value={issueDate}
                      onChange={(e) => setIssueDate(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                {error && <p className="text-sm text-red-500">{error}</p>}
              </CardContent>
              
              <CardFooter className="flex justify-end">
                <Button 
                  type="submit" 
                  disabled={submitting}
                  className="w-full sm:w-auto transition-all hover:shadow-md"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Update Certificate
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          )}
        </Card>
      </Zoom>
    </div>
  );
}

export default AdminEditCertificate;