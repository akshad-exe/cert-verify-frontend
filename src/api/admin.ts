import api from './index';

export const adminLogin = (username: string, password: string) => {
  return api.post('/admin/login', { username, password });
};

export const getDashboardData = () => {
  return api.get('/admin/certificates');
};

export const addCertificate = (certificateData: any) => {
  return api.post('/admin/certificates/', certificateData);
};

export const getCertificates = () => {
  return api.get('/admin/certificates');
};

export const getCertificateById = (id: string) => {
  return api.get(`/admin/certificates/${id}`);
};

export const updateCertificate = (id: string, certificateData: any) => {
  return api.put(`/admin/certificates/${id}`, certificateData);
};

export const deleteCertificate = (id: string) => {
  return api.delete(`/admin/certificates/${id}`);
};