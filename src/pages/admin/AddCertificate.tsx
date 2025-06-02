import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Fade, Zoom } from 'react-awesome-reveal';
import { Calendar, Award, FileText, Loader2, PlusCircle, User, Check } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

function AdminAddCertificate() {
  const [studentName, setStudentName] = useState('');
  const [certificateId, setCertificateId] = useState('');
  const [awardedFor, setAwardedFor] = useState('');
  const [issueDate, setIssueDate] = useState(''); // Consider using a Date picker component later
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setSuccess(false);
    
    const newCertificateData = {
      holderName: studentName,
      certificateId: certificateId,
      courseName: awardedFor,
      issueDate: issueDate,
    };

    try {
      // Make API call to create the certificate
      await axios.post('/api/admin/certificates', newCertificateData);
      
      // Show success message
      toast.success('Certificate added successfully!');
      setSuccess(true);
      
      // Reset form
      setStudentName('');
      setCertificateId('');
      setAwardedFor('');
      setIssueDate('');
    } catch (error) {
      console.error('Error adding certificate:', error);
      toast.error('Failed to add certificate. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Fade>
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Add New Certificate</h1>
          <p className="text-muted-foreground">Create a new certificate for a student or course participant.</p>
        </div>
      </Fade>

      <Zoom delay={100}>
        <Card className="shadow-lg border-gray-200 dark:border-gray-700">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Award className="h-5 w-5 text-primary" />
              <CardTitle>Certificate Details</CardTitle>
            </div>
            <CardDescription>
              Fill in all the required information to create a new certificate.  
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="studentName" className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>Recipient Name</span>
                </Label>
                <div className="relative">
                  <Input
                    id="studentName"
                    placeholder="Enter recipient's full name"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    required
                    className="pl-10"
                  />
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="certificateId" className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span>Certificate ID</span>
                </Label>
                <div className="relative">
                  <Input
                    id="certificateId"
                    placeholder="Enter unique certificate ID"
                    value={certificateId}
                    onChange={(e) => setCertificateId(e.target.value)}
                    required
                    className="pl-10"
                  />
                  <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="awardedFor" className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-muted-foreground" />
                  <span>Course Name</span>
                </Label>
                <div className="relative">
                  <Input
                    id="awardedFor"
                    placeholder="Enter course or achievement name"
                    value={awardedFor}
                    onChange={(e) => setAwardedFor(e.target.value)}
                    required
                    className="pl-10"
                  />
                  <Award className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="issueDate" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Issue Date</span>
                </Label>
                <div className="relative">
                  <Input
                    id="issueDate"
                    type="date"
                    value={issueDate}
                    onChange={(e) => setIssueDate(e.target.value)}
                    required
                    className="pl-10"
                  />
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-between items-center border-t px-6 py-4 bg-gray-50 dark:bg-gray-800/50">
              {success && (
                <div className="flex items-center text-green-600 dark:text-green-400">
                  <Check className="h-5 w-5 mr-2" />
                  <span>Certificate added successfully!</span>
                </div>
              )}
              <div className={success ? 'ml-auto' : 'w-full flex justify-end'}>
                <Button 
                  type="submit" 
                  disabled={loading}
                  className="bg-primary hover:bg-primary/90 text-white px-6 flex items-center gap-2 transition-all"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <PlusCircle className="h-4 w-4" />
                      Add Certificate
                    </>
                  )}
                </Button>
              </div>
            </CardFooter>
          </form>
        </Card>
      </Zoom>
    </div>
  );
}

export default AdminAddCertificate;