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
import type { Certificate } from '@/types/certificate';
import { DatePicker } from '@/components/ui/date-picker';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';

const certificateTypeOptions = [
  { value: 'internship', label: 'Internship' },
  { value: 'course', label: 'Course' },
  { value: 'appreciation', label: 'Appreciation' },
  { value: 'workshop', label: 'Workshop' },
];

const statusOptions = [
  { value: 'valid', label: 'Valid' },
  { value: 'expired', label: 'Expired' },
  { value: 'revoked', label: 'Revoked' },
];

function AdminEditCertificate() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [form, setForm] = useState<Omit<Certificate, 'mongoId'>>({
    id: '',
    recipientName: '',
    certificateTitle: '',
    certificateType: 'course',
    issueDate: '',
    expiryDate: '',
    instructorName: '',
    grade: '',
    skills: [],
    status: 'valid',
    duration: '',
  });
  const [skillsInput, setSkillsInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [issueDateObj, setIssueDateObj] = useState<Date | undefined>(undefined);
  const [expiryDateObj, setExpiryDateObj] = useState<Date | undefined>(undefined);

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
        setForm({
          id: certificate.id || '',
          recipientName: certificate.recipientName || '',
          certificateTitle: certificate.certificateTitle || '',
          certificateType: certificate.certificateType || 'course',
          issueDate: certificate.issueDate || '',
          expiryDate: certificate.expiryDate || '',
          instructorName: certificate.instructorName || '',
          grade: certificate.grade || '',
          skills: Array.isArray(certificate.skills) ? certificate.skills : [],
          status: certificate.status || 'valid',
          duration: certificate.duration || '',
        });
        setSkillsInput((certificate.skills || []).join(', '));
        setError(null);
        if (certificate.issueDate) setIssueDateObj(new Date(certificate.issueDate));
        else setIssueDateObj(undefined);
        if (certificate.expiryDate) setExpiryDateObj(new Date(certificate.expiryDate));
        else setExpiryDateObj(new Date());
      } catch (err: any) {      
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

  useEffect(() => {
    if (issueDateObj) setForm(prev => ({ ...prev, issueDate: issueDateObj.toISOString().slice(0, 10) }));
    if (!issueDateObj) setForm(prev => ({ ...prev, issueDate: '' }));
  }, [issueDateObj]);

  useEffect(() => {
    if (expiryDateObj) setForm(prev => ({ ...prev, expiryDate: expiryDateObj.toISOString().slice(0, 10) }));
    if (!expiryDateObj) setForm(prev => ({ ...prev, expiryDate: '' }));
  }, [expiryDateObj]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSkillsInput(e.target.value);
    setForm(prev => ({ ...prev, skills: e.target.value.split(',').map(s => s.trim()).filter(Boolean) }));
  };

  const handleSelectChange = (name: keyof typeof form, value: string) => {
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // Dynamic field logic
  const showGrade = form.certificateType === 'course';
  const showDuration = form.certificateType === 'internship' || form.certificateType === 'course';
  const showSkills = form.certificateType !== 'appreciation';
  const showInstructor = form.certificateType !== 'appreciation';
  const showExpiryDate = form.certificateType === 'course';
  const showStatus = form.certificateType !== 'course';

  const getTitleLabel = (type: string) => {
    switch (type) {
      case 'course': return 'Course Name';
      case 'internship': return 'Internship Title';
      case 'workshop': return 'Workshop Title';
      case 'appreciation': return 'Reason for Appreciation';
      default: return 'Certificate Title';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.id || !form.recipientName || !form.certificateTitle || !form.certificateType || !form.issueDate) {
      setError('Please fill in all required fields.');
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
      await updateCertificate(id, form);
      setSuccess(true);
      toast.success('Certificate updated successfully');
      setTimeout(() => {
        navigate('/admin/certificates');
      }, 1500);
    } catch (err: any) {
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
                  <Label htmlFor="id">Certificate ID</Label>
                  <Input id="id" name="id" value={form.id} onChange={handleChange} placeholder="Enter certificate ID" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="recipientName">Recipient Name</Label>
                  <Input id="recipientName" name="recipientName" value={form.recipientName} onChange={handleChange} placeholder="Enter recipient name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="certificateTitle">{getTitleLabel(form.certificateType)}</Label>
                  <Input id="certificateTitle" name="certificateTitle" value={form.certificateTitle} onChange={handleChange} placeholder={getTitleLabel(form.certificateType)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="certificateType">Certificate Type</Label>
                  <Select value={form.certificateType} onValueChange={value => handleSelectChange('certificateType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {certificateTypeOptions.map(opt => (
                        <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="issueDate">Issue Date</Label>
                  <DatePicker date={issueDateObj} setDate={setIssueDateObj} placeholder="Pick issue date" />
                </div>
                {showExpiryDate && (
                  <div className="space-y-2">
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <DatePicker date={expiryDateObj} setDate={setExpiryDateObj} placeholder="Pick expiry date" />
                  </div>
                )}
                {showInstructor && (
                  <div className="space-y-2">
                    <Label htmlFor="instructorName">Instructor Name</Label>
                    <Input id="instructorName" name="instructorName" value={form.instructorName} onChange={handleChange} placeholder="Enter instructor's name" />
                  </div>
                )}
                {showGrade && (
                  <div className="space-y-2">
                    <Label htmlFor="grade">Grade</Label>
                    <Input id="grade" name="grade" value={form.grade} onChange={handleChange} placeholder="Enter grade (optional)" />
                  </div>
                )}
                {showSkills && (
                  <div className="space-y-2">
                    <Label htmlFor="skills">Skills (comma separated)</Label>
                    <Input id="skills" name="skills" value={skillsInput} onChange={handleSkillsChange} placeholder="e.g. Python, React, Security" />
                  </div>
                )}
                {showDuration && (
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration</Label>
                    <Input id="duration" name="duration" value={form.duration} onChange={handleChange} placeholder="e.g. 3 months" />
                  </div>
                )}
                {showStatus && (
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select value={form.status} onValueChange={value => handleSelectChange('status', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        {statusOptions.map(opt => (
                          <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
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