export interface Certificate {
  id: string; // user-facing certificate ID
  mongoId: string; // MongoDB ObjectId
  recipientName: string;
  certificateTitle: string;
  certificateType: 'internship' | 'course' | 'appreciation' | 'workshop';
  issueDate: string;
  expiryDate?: string;
  instructorName?: string;
  grade?: string;
  skills?: string[];
  status: 'valid' | 'expired' | 'revoked';
  duration?: string;
}


export interface CertificateData extends Omit<Certificate, 'status'> {
  status: string;
} 

