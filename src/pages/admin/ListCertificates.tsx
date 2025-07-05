import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Fade, Slide } from 'react-awesome-reveal';
import { Search, Edit, Trash2, FileText, User, Calendar, Award, AlertTriangle, Loader2, RefreshCw } from 'lucide-react';
import { getCertificates, deleteCertificate } from '../../api/admin';
import type { Certificate } from '@/types/certificate';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { castError } from '@/types/error';
import { getCertificateTypeIcon, formatCertificateDate } from '@/utils/certificateHelpers';

function AdminListCertificates() {
  const [certificateToDeleteId, setCertificateToDeleteId] = useState<string | null>(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Filter certificates based on search term, handling both naming conventions
  const filteredCertificates = certificates.filter(cert => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      cert.id?.toLowerCase().includes(searchTermLower) ||
      cert.recipientName?.toLowerCase().includes(searchTermLower) ||
      cert.certificateTitle?.toLowerCase().includes(searchTermLower) ||
      cert.issueDate?.toLowerCase().includes(searchTermLower)
    );
  });

  // Function to fetch certificates
  const fetchCertificates = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getCertificates();
      setCertificates(response.data);
    } catch (err: unknown) {
      const error = castError(err);
      console.error('Error fetching certificates:', error);
      setError('Failed to load certificates. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []); // Empty dependency array means this effect runs once on mount

  const handleDelete = (mongoId: string) => {
    setCertificateToDeleteId(mongoId);
    setShowDeleteConfirmation(true);
  };

  const confirmDelete = async () => {
    if (!certificateToDeleteId) return;

    try {
      setIsDeleting(true);
      await deleteCertificate(certificateToDeleteId);

      // Remove the deleted certificate from the state
      setCertificates(certificates.filter(cert => cert.mongoId !== certificateToDeleteId));

      toast.success('Certificate deleted successfully');
    } catch (err: unknown) {
      const error = castError(err);
      console.error('Error deleting certificate:', error);
      toast.error('Failed to delete certificate. Please try again.');
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirmation(false);
      setCertificateToDeleteId(null);
    }
  };

  return (
    <div className="space-y-6">
      <Fade>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <Award className="h-8 w-8 text-orange-500" />
              Certificates
            </h1>
            <p className="text-muted-foreground mt-1">Manage all issued certificates</p>
          </div>
          {/* Add Certificate and Reload Buttons */}
          <div className="flex gap-2">
            <Link to="/admin/certificates/add">
              <Button className="w-full sm:w-auto">
                <FileText className="h-4 w-4 mr-2" />
                Add New Certificate
              </Button>
            </Link>
            <Button
              variant="outline"
              size="sm"
              onClick={fetchCertificates}
              disabled={loading || isDeleting} // Disable while loading or deleting
              className="flex items-center gap-1"
            >
              {loading ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
              Reload
            </Button>
          </div>
        </div>
      </Fade>

      <Slide direction="up" triggerOnce>
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle>All Certificates</CardTitle>
                <CardDescription>View, edit or delete certificates</CardDescription>
              </div>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search certificates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            {error && (
                <div className="text-center py-2 text-red-500 flex items-center justify-center gap-2">
                   <AlertTriangle className="h-5 w-5" />
                   {error}
                </div>
            )}
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center items-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="ml-2 text-muted-foreground">Loading certificates...</span>
              </div>
            ) : filteredCertificates.length === 0 && !error ? (
              <div className="text-center py-8 text-muted-foreground flex flex-col items-center gap-3">
                <Award className="h-12 w-12 text-muted-foreground/50" />
                <span>{searchTerm ? 'No certificates match your search.' : 'No certificates found.'}</span>
              </div>
            ) : !loading && !error && filteredCertificates.length > 0 ? (
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[160px] text-left pl-4">ID</TableHead>
                      <TableHead>Recipient</TableHead>
                      <TableHead className="hidden md:table-cell">Type</TableHead>
                      <TableHead className="hidden md:table-cell text-left">Title</TableHead>
                      <TableHead className="hidden sm:table-cell">Issue Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCertificates.map((cert) => {
                      return (
                        <TableRow key={cert.mongoId}>
                          <TableCell className="font-mono text-xs text-left align-middle truncate max-w-[200px] pl-4">{cert.id}</TableCell>
                          <TableCell className="flex items-center gap-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span>{cert.recipientName}</span>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            <span className="flex items-center gap-1">
                              {getCertificateTypeIcon(cert.certificateType)}
                              {cert.certificateType ? cert.certificateType.charAt(0).toUpperCase() + cert.certificateType.slice(1) : 'Unknown'}
                            </span>
                          </TableCell>
                          <TableCell className="hidden md:table-cell align-middle font-semibold text-left truncate max-w-[200px]">{cert.certificateTitle || 'Unknown'}</TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span>{formatCertificateDate(cert.issueDate)}</span>
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Link to={`/admin/certificates/edit/${cert.mongoId}`}>
                                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </Link>
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-8 w-8 p-0 text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600 dark:border-red-800 dark:hover:bg-red-950/20"
                                onClick={() => handleDelete(cert.mongoId)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            ) : null /* Handle other cases if necessary */}
          </CardContent>
        </Card>
      </Slide>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteConfirmation} onOpenChange={setShowDeleteConfirmation}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the certificate.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-500 hover:bg-red-600" disabled={isDeleting}>
              {isDeleting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default AdminListCertificates;