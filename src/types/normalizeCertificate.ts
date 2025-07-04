// import type { Certificate } from './certificate';

// export function normalizeCertificate(raw: any): Certificate {
//   return {
//     id: raw.certificateId || raw.certificate_id || '',
//     mongoId: raw._id || raw.id || '',
//     recipientName: raw.recipientName || raw.student_name || raw.holderName || '',
//     courseName: raw.courseName || raw.awarded_for || '',
//     certificateType: raw.certificateType || raw.type || 'course',
//     issueDate: raw.issueDate || raw.issue_date || '',
//     expiryDate: raw.expiryDate || raw.expiry_date || '',
//     instructorName: raw.instructorName || raw.instructor_name || '',
//     grade: raw.grade ?? '',
//     skills: Array.isArray(raw.skills) ? raw.skills : [],
//     status: raw.status || 'valid',
//     duration: raw.duration ?? '',
//   };
// } 