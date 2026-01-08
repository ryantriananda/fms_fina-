/**
 * Facility Service
 * Handle API calls untuk Pod, Locker, dll
 */

import { PodRequestRecord, MasterPodRecord, TenantPodRecord, LockerRecord, LockerRequestRecord } from '../types';
import api from './api';

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export const facilityService = {
  // === PODS ===
  getPods: async (): Promise<MasterPodRecord[]> => {
    const response = await api.get<ApiResponse<MasterPodRecord[]>>('/facility/pods');
    return response.data;
  },

  getPodById: async (id: string): Promise<MasterPodRecord> => {
    const response = await api.get<ApiResponse<MasterPodRecord>>(`/facility/pods/${id}`);
    return response.data;
  },

  createPod: async (data: Partial<MasterPodRecord>): Promise<MasterPodRecord> => {
    const response = await api.post<ApiResponse<MasterPodRecord>>('/facility/pods', data);
    return response.data;
  },

  updatePod: async (id: string, data: Partial<MasterPodRecord>): Promise<MasterPodRecord> => {
    const response = await api.put<ApiResponse<MasterPodRecord>>(`/facility/pods/${id}`, data);
    return response.data;
  },

  deletePod: async (id: string): Promise<void> => {
    await api.delete(`/facility/pods/${id}`);
  },

  // === POD REQUESTS ===
  getPodRequests: async (): Promise<PodRequestRecord[]> => {
    const response = await api.get<ApiResponse<PodRequestRecord[]>>('/facility/pod-requests');
    return response.data;
  },

  createPodRequest: async (data: Partial<PodRequestRecord>): Promise<PodRequestRecord> => {
    const response = await api.post<ApiResponse<PodRequestRecord>>('/facility/pod-requests', data);
    return response.data;
  },

  // === MASTER POD (legacy) ===
  getMasterPods: async (): Promise<MasterPodRecord[]> => {
    return facilityService.getPods();
  },

  createMasterPod: async (data: Partial<MasterPodRecord>): Promise<MasterPodRecord> => {
    return facilityService.createPod(data);
  },

  // === TENANT POD ===
  getTenantPods: async (): Promise<TenantPodRecord[]> => {
    return Promise.resolve([]);
  },

  createTenantPod: async (data: Partial<TenantPodRecord>): Promise<TenantPodRecord> => {
    return Promise.resolve({ ...data, id: Date.now() } as TenantPodRecord);
  },

  // === LOCKERS ===
  getLockers: async (): Promise<LockerRecord[]> => {
    const response = await api.get<ApiResponse<LockerRecord[]>>('/facility/lockers');
    return response.data;
  },

  getLockerById: async (id: string): Promise<LockerRecord> => {
    const response = await api.get<ApiResponse<LockerRecord>>(`/facility/lockers/${id}`);
    return response.data;
  },

  createLocker: async (data: Partial<LockerRecord>): Promise<LockerRecord> => {
    const response = await api.post<ApiResponse<LockerRecord>>('/facility/lockers', data);
    return response.data;
  },

  updateLocker: async (id: string, data: Partial<LockerRecord>): Promise<LockerRecord> => {
    const response = await api.put<ApiResponse<LockerRecord>>(`/facility/lockers/${id}`, data);
    return response.data;
  },

  deleteLocker: async (id: string): Promise<void> => {
    await api.delete(`/facility/lockers/${id}`);
  },

  // === LOCKER REQUESTS ===
  getLockerRequests: async (): Promise<LockerRequestRecord[]> => {
    const response = await api.get<ApiResponse<LockerRequestRecord[]>>('/facility/locker-requests');
    return response.data;
  },

  createLockerRequest: async (data: Partial<LockerRequestRecord>): Promise<LockerRequestRecord> => {
    const response = await api.post<ApiResponse<LockerRequestRecord>>('/facility/locker-requests', data);
    return response.data;
  },
};

export default facilityService;
