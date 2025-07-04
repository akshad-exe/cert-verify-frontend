import api from './index';
import type { Certificate } from '@/types/certificate';
// import type { Admin } from '@/types/admin';
// import axios from '@/lib/axios';

export const adminLogin = (username: string, password: string) => {
  return api.post('/admin/login', { username, password });
};

export const getDashboardData = () => {
  return api.get('/admin/certificates');
};

export const addCertificate = (certificateData: Omit<Certificate, 'mongoId'>) => {
  return api.post('/admin/certificates/', certificateData);
};

export const getCertificates = () => {
  return api.get('/admin/certificates');
};

export const getCertificateById = (id: string) => {
  return api.get(`/admin/certificates/${id}`);
};

export const updateCertificate = (id: string, certificateData: Omit<Certificate, 'mongoId'>) => {
  return api.put(`/admin/certificates/${id}`, certificateData);
};

export const deleteCertificate = (id: string) => {
  return api.delete(`/admin/certificates/${id}`);
};

// export async function getAdmins() {
//   return axios.get<Admin[]>('/api/admin/users');
// }

// export async function addAdmin(admin: Omit<Admin, 'mongoId'>) {
//   return axios.post('/api/admin/users', admin);
// }

// export async function updateAdmin(mongoId: string, admin: Partial<Omit<Admin, 'mongoId'>>) {
//   return axios.put(`/api/admin/users/${mongoId}`, admin);
// }

// export async function deleteAdmin(mongoId: string) {
//   return axios.delete(`/api/admin/users/${mongoId}`);
// }