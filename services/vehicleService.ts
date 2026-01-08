/**
 * Vehicle Service
 * Handle semua API calls untuk modul Vehicle
 */

import { VehicleRecord, VehicleContractRecord, ServiceRecord, TaxKirRecord, MutationRecord, SalesRecord } from '../types';
import api from './api';

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export const vehicleService = {
  // === VEHICLES ===
  getAll: async (): Promise<VehicleRecord[]> => {
    const response = await api.get<ApiResponse<VehicleRecord[]>>('/vehicles');
    return response.data;
  },

  getById: async (id: string | number): Promise<VehicleRecord> => {
    const response = await api.get<ApiResponse<VehicleRecord>>(`/vehicles/${id}`);
    return response.data;
  },

  create: async (data: Partial<VehicleRecord>): Promise<VehicleRecord> => {
    const response = await api.post<ApiResponse<VehicleRecord>>('/vehicles', data);
    return response.data;
  },

  update: async (id: string | number, data: Partial<VehicleRecord>): Promise<VehicleRecord> => {
    const response = await api.put<ApiResponse<VehicleRecord>>(`/vehicles/${id}`, data);
    return response.data;
  },

  delete: async (id: string | number): Promise<void> => {
    await api.delete(`/vehicles/${id}`);
  },

  // === CONTRACTS ===
  getContracts: async (): Promise<VehicleContractRecord[]> => {
    const response = await api.get<ApiResponse<VehicleContractRecord[]>>('/vehicles/contracts/all');
    return response.data;
  },

  createContract: async (data: Partial<VehicleContractRecord>): Promise<VehicleContractRecord> => {
    const response = await api.post<ApiResponse<VehicleContractRecord>>('/vehicles/contracts', data);
    return response.data;
  },

  // === SERVICES ===
  getServices: async (): Promise<ServiceRecord[]> => {
    const response = await api.get<ApiResponse<ServiceRecord[]>>('/vehicles/services/all');
    return response.data;
  },

  createService: async (data: Partial<ServiceRecord>): Promise<ServiceRecord> => {
    const response = await api.post<ApiResponse<ServiceRecord>>('/vehicles/services', data);
    return response.data;
  },

  // === TAX & KIR ===
  getTaxKir: async (): Promise<TaxKirRecord[]> => {
    const response = await api.get<ApiResponse<TaxKirRecord[]>>('/vehicles/tax-kir/all');
    return response.data;
  },

  createTaxKir: async (data: Partial<TaxKirRecord>): Promise<TaxKirRecord> => {
    const response = await api.post<ApiResponse<TaxKirRecord>>('/vehicles/tax-kir', data);
    return response.data;
  },

  // === MUTATIONS ===
  getMutations: async (): Promise<MutationRecord[]> => {
    const response = await api.get<ApiResponse<MutationRecord[]>>('/vehicles/mutations/all');
    return response.data;
  },

  createMutation: async (data: Partial<MutationRecord>): Promise<MutationRecord> => {
    const response = await api.post<ApiResponse<MutationRecord>>('/vehicles/mutations', data);
    return response.data;
  },

  // === SALES (placeholder) ===
  getSales: async (): Promise<SalesRecord[]> => {
    return Promise.resolve([]);
  },
};

export default vehicleService;
