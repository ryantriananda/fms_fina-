/**
 * Vehicle Service
 * Handle semua API calls untuk modul Vehicle
 */

import { VehicleRecord, VehicleContractRecord, ServiceRecord, TaxKirRecord, MutationRecord, SalesRecord } from '../types';
import api from './api';

// Untuk development, pakai mock data dulu
// Nanti tinggal uncomment API calls ketika backend ready

export const vehicleService = {
  // === VEHICLES ===
  getAll: async (): Promise<VehicleRecord[]> => {
    // return api.get<VehicleRecord[]>('/vehicles');
    return Promise.resolve([]); // Replace with actual API
  },

  getById: async (id: string | number): Promise<VehicleRecord> => {
    // return api.get<VehicleRecord>(`/vehicles/${id}`);
    return Promise.reject('Not implemented');
  },

  create: async (data: Partial<VehicleRecord>): Promise<VehicleRecord> => {
    // return api.post<VehicleRecord>('/vehicles', data);
    return Promise.resolve({ ...data, id: Date.now() } as VehicleRecord);
  },

  update: async (id: string | number, data: Partial<VehicleRecord>): Promise<VehicleRecord> => {
    // return api.put<VehicleRecord>(`/vehicles/${id}`, data);
    return Promise.resolve({ ...data, id } as VehicleRecord);
  },

  delete: async (id: string | number): Promise<void> => {
    // return api.delete(`/vehicles/${id}`);
    return Promise.resolve();
  },

  // === CONTRACTS ===
  getContracts: async (): Promise<VehicleContractRecord[]> => {
    // return api.get<VehicleContractRecord[]>('/vehicles/contracts');
    return Promise.resolve([]);
  },

  createContract: async (data: Partial<VehicleContractRecord>): Promise<VehicleContractRecord> => {
    // return api.post<VehicleContractRecord>('/vehicles/contracts', data);
    return Promise.resolve({ ...data, id: `CTR-${Date.now()}` } as VehicleContractRecord);
  },

  // === SERVICES ===
  getServices: async (): Promise<ServiceRecord[]> => {
    // return api.get<ServiceRecord[]>('/vehicles/services');
    return Promise.resolve([]);
  },

  createService: async (data: Partial<ServiceRecord>): Promise<ServiceRecord> => {
    // return api.post<ServiceRecord>('/vehicles/services', data);
    return Promise.resolve({ ...data, id: `SRV-${Date.now()}` } as ServiceRecord);
  },

  // === TAX & KIR ===
  getTaxKir: async (): Promise<TaxKirRecord[]> => {
    // return api.get<TaxKirRecord[]>('/vehicles/tax-kir');
    return Promise.resolve([]);
  },

  createTaxKir: async (data: Partial<TaxKirRecord>): Promise<TaxKirRecord> => {
    // return api.post<TaxKirRecord>('/vehicles/tax-kir', data);
    return Promise.resolve({ ...data, id: `TAX-${Date.now()}` } as TaxKirRecord);
  },

  // === MUTATIONS ===
  getMutations: async (): Promise<MutationRecord[]> => {
    // return api.get<MutationRecord[]>('/vehicles/mutations');
    return Promise.resolve([]);
  },

  // === SALES ===
  getSales: async (): Promise<SalesRecord[]> => {
    // return api.get<SalesRecord[]>('/vehicles/sales');
    return Promise.resolve([]);
  },
};

export default vehicleService;
