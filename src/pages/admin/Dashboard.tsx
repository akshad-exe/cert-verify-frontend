import { useState, useEffect } from 'react';
import { getDashboardData } from '../../api/admin';
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
import { Fade, Slide } from 'react-awesome-reveal';
import { Award, Clock, FileText, User, RefreshCw, AlertCircle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from "@/components/ui/button";
import type { Certificate } from '@/types/certificate';
import { castError } from '@/types/error';
import { getCertificateTypeIcon, formatCertificateDate } from '@/utils/certificateHelpers';

function AdminDashboard() {
  const [totalCertificates, setTotalCertificates] = useState(0);
  const [recentCertificates, setRecentCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch dashboard data
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null); // Clear previous errors
      const response = await getDashboardData();
      const certificates: Certificate[] = response.data; // Assuming backend returns an array of certificates
      setTotalCertificates(certificates.length);
      // Display the last 5 certificates as recent additions
      setRecentCertificates(certificates.slice(-5)); // Adjust slice number as needed
    } catch (err: unknown) {
      const error = castError(err);
      console.error('Error fetching dashboard data:', error);
      if (error.response) {
        setError(error.response.data?.message || 'Failed to fetch dashboard data.');
      } else {
        setError('An unexpected error occurred while fetching dashboard data.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Fetch dashboard data on component mount
  useEffect(() => {
    fetchDashboardData();
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div className="space-y-8 w-full">
      <Fade>
        <div className="flex items-center justify-between w-full">
          <h1 className="text-3xl items-center font-bold tracking-tight">Dashboard</h1>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={fetchDashboardData} 
            disabled={loading} 
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
      </Fade>

      <Slide direction="up" triggerOnce>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 w-full">
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-blue-100 dark:border-blue-900">
            <CardHeader className="pb-2">
              <CardDescription className="text-blue-600 dark:text-blue-400 flex items-center">
                <Award className="h-4 w-4 mr-1" />
                Total Certificates
              </CardDescription>
              <CardTitle className="text-4xl font-bold text-blue-700 dark:text-blue-300">
                {loading ? <Skeleton className="h-10 w-20" /> : totalCertificates}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-blue-600/80 dark:text-blue-400/80">
                Certificates issued to date
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 border-emerald-100 dark:border-emerald-900">
            <CardHeader className="pb-2">
              <CardDescription className="text-emerald-600 dark:text-emerald-400 flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                Recent Activity
              </CardDescription>
              <CardTitle className="text-4xl font-bold text-emerald-700 dark:text-emerald-300">
                {loading ? <Skeleton className="h-10 w-20" /> : recentCertificates.length}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-emerald-600/80 dark:text-emerald-400/80">
                New certificates this week
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border-amber-100 dark:border-amber-900">
            <CardHeader className="pb-2">
              <CardDescription className="text-amber-600 dark:text-amber-400 flex items-center">
                <Award className="h-4 w-4 mr-1" />
                Achievements
              </CardDescription>
              <CardTitle className="text-4xl font-bold text-amber-700 dark:text-amber-300">
                {loading ? <Skeleton className="h-10 w-20" /> : "100%"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-amber-600/80 dark:text-amber-400/80">
                Verification success rate
              </p>
            </CardContent>
          </Card>
        </div>
      </Slide>

      <Fade delay={200}>
        <Card className="w-full">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-semibold">Recent Certificates</CardTitle>
                <CardDescription>Latest certificates issued in the system</CardDescription>
              </div>
              <FileText className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="text-center py-4 text-red-500 flex items-center justify-center gap-2">
                 <AlertCircle className="h-5 w-5" />
                 {error} 
              </div>
            )}
            {loading ? (
              <div className="space-y-2">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </div>
            ) : recentCertificates.length === 0 && !error ? (
              <div className="text-center py-4 text-muted-foreground">No certificates found</div>
            ) : !loading && !error && recentCertificates.length > 0 ? (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[160px] text-left pl-4">ID</TableHead>
                      <TableHead>Recipient</TableHead>
                      <TableHead className="hidden sm:table-cell font-bold px-2 py-2 text-left">Type</TableHead>
                      <TableHead className="hidden sm:table-cell font-bold px-2 py-2 text-left">Title</TableHead>
                      <TableHead className="text-right">Issue Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentCertificates.map((cert) => (
                      <TableRow key={cert.mongoId}>
                        <TableCell className="font-mono text-xs text-left align-middle truncate max-w-[200px] pl-4">{cert.id}</TableCell>
                        <TableCell className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span>{cert.recipientName}</span>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell font-medium truncate px-2 py-2 text-left" title={cert.certificateType}>
                          <span className="flex items-center gap-1">
                            {getCertificateTypeIcon(cert.certificateType)}
                            {cert.certificateType ? cert.certificateType.charAt(0).toUpperCase() + cert.certificateType.slice(1) : 'Unknown'}
                          </span>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell align-middle font-semibold text-left truncate max-w-[200px] px-2 py-2" title={cert.certificateTitle}>{cert.certificateTitle || 'Unknown'}</TableCell>
                        <TableCell className="text-right">{formatCertificateDate(cert.issueDate)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : null /* Handle other cases if necessary */}
          </CardContent>
        </Card>
      </Fade>
    </div>
  );
}

export default AdminDashboard;
