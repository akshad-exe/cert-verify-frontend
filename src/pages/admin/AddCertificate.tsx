import { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Fade, Zoom } from 'react-awesome-reveal';
import { Calendar, Award, FileText, Loader2, PlusCircle, User, Check, Star } from 'lucide-react';
import { addCertificate } from '../../api/admin';
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

function AdminAddCertificate() {
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
  const [issueDateObj, setIssueDateObj] = useState<Date | undefined>(undefined);
  const [expiryDateObj, setExpiryDateObj] = useState<Date | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Dynamic field logic
  const showGrade = form.certificateType === 'course';
  const showDuration = form.certificateType === 'internship' || form.certificateType === 'course';
  const showSkills = form.certificateType !== 'appreciation';
  const showInstructor = form.certificateType !== 'appreciation';
  const showStatus = form.certificateType !== 'course';
  const showExpiryDate = form.certificateType === 'course';

  useEffect(() => {
    if (issueDateObj) setForm(prev => ({ ...prev, issueDate: issueDateObj.toISOString().slice(0, 10) }));
    if (!issueDateObj) setForm(prev => ({ ...prev, issueDate: '' }));
  }, [issueDateObj]);
  useEffect(() => {
    if (expiryDateObj) setForm(prev => ({ ...prev, expiryDate: expiryDateObj.toISOString().slice(0, 10) }));
    if (!expiryDateObj) setForm(prev => ({ ...prev, expiryDate: '' }));
  }, [expiryDateObj]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setSuccess(false);
    if (!form.id || !form.recipientName || !form.certificateTitle || !form.certificateType || !form.issueDate) {
      toast.error('Please fill in all required fields.');
      setLoading(false);
      return;
    }
    try {
      await addCertificate(form);
      toast.success('Certificate added successfully!');
      setSuccess(true);
      setForm({
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
      setSkillsInput('');
      setIssueDateObj(undefined);
      setExpiryDateObj(undefined);
    } catch (error: any) {
      console.error('Error adding certificate:', error);
      toast.error('Failed to add certificate. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getTitleLabel = (type: string) => {
    switch (type) {
      case 'course': return 'Course Name';
      case 'internship': return 'Internship Title';
      case 'workshop': return 'Workshop Title';
      case 'appreciation': return 'Reason for Appreciation';
      default: return 'Certificate Title';
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
                <Label htmlFor="id">Certificate ID</Label>
                <Input id="id" name="id" placeholder="Enter unique certificate ID" value={form.id} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="recipientName">Recipient Name</Label>
                <Input id="recipientName" name="recipientName" placeholder="Enter recipient's full name" value={form.recipientName} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="certificateTitle">{getTitleLabel(form.certificateType)}</Label>
                <Input id="certificateTitle" name="certificateTitle" placeholder={getTitleLabel(form.certificateType)} value={form.certificateTitle} onChange={handleChange} required />
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
                  <Input id="instructorName" name="instructorName" placeholder="Enter instructor's name" value={form.instructorName} onChange={handleChange} />
                </div>
              )}
              {showGrade && (
                <div className="space-y-2">
                  <Label htmlFor="grade">Grade</Label>
                  <Input id="grade" name="grade" placeholder="Enter grade (optional)" value={form.grade} onChange={handleChange} />
                </div>
              )}
              {showSkills && (
                <div className="space-y-2">
                  <Label htmlFor="skills">Skills (comma separated)</Label>
                  <Input id="skills" name="skills" placeholder="e.g. Python, React, Security" value={skillsInput} onChange={handleSkillsChange} />
                </div>
              )}
              {showDuration && (
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Input id="duration" name="duration" placeholder="e.g. 3 months" value={form.duration} onChange={handleChange} />
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
            </CardContent>
            <CardFooter className="flex justify-between items-center border-t px-6 py-4 bg-gray-50 dark:bg-gray-800/50">
              {success && (
                <div className="flex items-center text-green-600 dark:text-green-400">
                  <Check className="h-5 w-5 mr-2" />
                  <span>Certificate added successfully!</span>
                </div>
              )}
              <div className={success ? 'ml-auto' : 'w-full flex justify-end'}>
                <Button type="submit" disabled={loading} className="bg-primary hover:bg-primary/90 text-white px-6 flex items-center gap-2 transition-all">
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