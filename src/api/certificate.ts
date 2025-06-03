import api from './index';

export const verifyCertificate = (certificateId: string) => {
  return api.get(`/verify/${certificateId}`);
};