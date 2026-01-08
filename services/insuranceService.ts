/**
 * Insurance Service
 * Handle API calls untuk Insurance module
 */

import api from './api';

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export interface InsurancePolicy {
  id: string;
  policyNumber: string;
  policyType: string;
  providerId?: string;
  assetType?: string;
  assetId?: string;
  startDate: string;
  endDate: string;
  premium?: string;
  coverage?: string;
  status: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface InsuranceClaim {
  id: string;
  claimNumber: string;
  policyId: string;
  claimDate: string;
  incidentDate: string;
  description?: string;
  claimAmount?: string;
  approvedAmount?: string;
  status: string;
  documents?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface InsuranceProvider {
  id: string;
  name: string;
  code: string;
  email?: string;
  phone?: string;
  address?: string;
  picName?: string;
  picPhone?: string;
  status: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export const insuranceService = {
  // === POLICIES ===
  getPolicies: async (): Promise<InsurancePolicy[]> => {
    const response = await api.get<ApiResponse<InsurancePolicy[]>>('/insurance/policies');
    return response.data;
  },

  getPolicyById: async (id: string): Promise<InsurancePolicy> => {
    const response = await api.get<ApiResponse<InsurancePolicy>>(`/insurance/policies/${id}`);
    return response.data;
  },

  createPolicy: async (data: Partial<InsurancePolicy>): Promise<InsurancePolicy> => {
    const response = await api.post<ApiResponse<InsurancePolicy>>('/insurance/policies', data);
    return response.data;
  },

  updatePolicy: async (id: string, data: Partial<InsurancePolicy>): Promise<InsurancePolicy> => {
    const response = await api.put<ApiResponse<InsurancePolicy>>(`/insurance/policies/${id}`, data);
    return response.data;
  },

  deletePolicy: async (id: string): Promise<void> => {
    await api.delete(`/insurance/policies/${id}`);
  },

  // === CLAIMS ===
  getClaims: async (): Promise<InsuranceClaim[]> => {
    const response = await api.get<ApiResponse<InsuranceClaim[]>>('/insurance/claims');
    return response.data;
  },

  createClaim: async (data: Partial<InsuranceClaim>): Promise<InsuranceClaim> => {
    const response = await api.post<ApiResponse<InsuranceClaim>>('/insurance/claims', data);
    return response.data;
  },

  updateClaim: async (id: string, data: Partial<InsuranceClaim>): Promise<InsuranceClaim> => {
    const response = await api.put<ApiResponse<InsuranceClaim>>(`/insurance/claims/${id}`, data);
    return response.data;
  },

  // === PROVIDERS ===
  getProviders: async (): Promise<InsuranceProvider[]> => {
    const response = await api.get<ApiResponse<InsuranceProvider[]>>('/insurance/providers');
    return response.data;
  },

  createProvider: async (data: Partial<InsuranceProvider>): Promise<InsuranceProvider> => {
    const response = await api.post<ApiResponse<InsuranceProvider>>('/insurance/providers', data);
    return response.data;
  },

  updateProvider: async (id: string, data: Partial<InsuranceProvider>): Promise<InsuranceProvider> => {
    const response = await api.put<ApiResponse<InsuranceProvider>>(`/insurance/providers/${id}`, data);
    return response.data;
  },

  deleteProvider: async (id: string): Promise<void> => {
    await api.delete(`/insurance/providers/${id}`);
  },
};

export default insuranceService;
