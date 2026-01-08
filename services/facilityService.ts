/**
 * Facility Service
 * Handle API calls untuk Pod, Locker, dll
 */

import { PodRequestRecord, MasterPodRecord, TenantPodRecord, LockerRecord, LockerRequestRecord } from '../types';
import api from './api';

export const facilityService = {
  // === POD REQUESTS ===
  getPodRequests: async (): Promise<PodRequestRecord[]> => {
    // return api.get<PodRequestRecord[]>('/facility/pod-requests');
    return Promise.resolve([]);
  },

  createPodRequest: async (data: Partial<PodRequestRecord>): Promise<PodRequestRecord> => {
    // return api.post<PodRequestRecord>('/facility/pod-requests', data);
    return Promise.resolve({ ...data, id: Date.now() } as PodRequestRecord);
  },

  // === MASTER POD ===
  getMasterPods: async (): Promise<MasterPodRecord[]> => {
    // return api.get<MasterPodRecord[]>('/facility/master-pods');
    return Promise.resolve([]);
  },

  createMasterPod: async (data: Partial<MasterPodRecord>): Promise<MasterPodRecord> => {
    // return api.post<MasterPodRecord>('/facility/master-pods', data);
    return Promise.resolve({ ...data, id: Date.now() } as MasterPodRecord);
  },

  // === TENANT POD ===
  getTenantPods: async (): Promise<TenantPodRecord[]> => {
    // return api.get<TenantPodRecord[]>('/facility/tenant-pods');
    return Promise.resolve([]);
  },

  createTenantPod: async (data: Partial<TenantPodRecord>): Promise<TenantPodRecord> => {
    // return api.post<TenantPodRecord>('/facility/tenant-pods', data);
    return Promise.resolve({ ...data, id: Date.now() } as TenantPodRecord);
  },

  // === LOCKERS ===
  getLockers: async (): Promise<LockerRecord[]> => {
    // return api.get<LockerRecord[]>('/facility/lockers');
    return Promise.resolve([]);
  },

  createLocker: async (data: Partial<LockerRecord>): Promise<LockerRecord> => {
    // return api.post<LockerRecord>('/facility/lockers', data);
    return Promise.resolve({ ...data, id: Date.now() } as LockerRecord);
  },

  // === LOCKER REQUESTS ===
  getLockerRequests: async (): Promise<LockerRequestRecord[]> => {
    // return api.get<LockerRequestRecord[]>('/facility/locker-requests');
    return Promise.resolve([]);
  },

  createLockerRequest: async (data: Partial<LockerRequestRecord>): Promise<LockerRequestRecord> => {
    // return api.post<LockerRequestRecord>('/facility/locker-requests', data);
    return Promise.resolve({ ...data, id: Date.now() } as LockerRequestRecord);
  },
};

export default facilityService;
