/**
 * Building Service
 * Handle semua API calls untuk modul Building
 */

import { BuildingRecord, UtilityRecord, ReminderRecord, BuildingMaintenanceRecord } from '../types';
import api from './api';

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export const buildingService = {
  // === BUILDINGS ===
  getAll: async (): Promise<BuildingRecord[]> => {
    const response = await api.get<ApiResponse<BuildingRecord[]>>('/buildings');
    return response.data;
  },

  getById: async (id: string | number): Promise<BuildingRecord> => {
    const response = await api.get<ApiResponse<BuildingRecord>>(`/buildings/${id}`);
    return response.data;
  },

  create: async (data: Partial<BuildingRecord>): Promise<BuildingRecord> => {
    const response = await api.post<ApiResponse<BuildingRecord>>('/buildings', data);
    return response.data;
  },

  update: async (id: string | number, data: Partial<BuildingRecord>): Promise<BuildingRecord> => {
    const response = await api.put<ApiResponse<BuildingRecord>>(`/buildings/${id}`, data);
    return response.data;
  },

  delete: async (id: string | number): Promise<void> => {
    await api.delete(`/buildings/${id}`);
  },

  // === UTILITIES ===
  getUtilities: async (): Promise<UtilityRecord[]> => {
    const response = await api.get<ApiResponse<UtilityRecord[]>>('/buildings/utilities/all');
    return response.data;
  },

  createUtility: async (data: Partial<UtilityRecord>): Promise<UtilityRecord> => {
    const response = await api.post<ApiResponse<UtilityRecord>>('/buildings/utilities', data);
    return response.data;
  },

  // === COMPLIANCE / REMINDERS ===
  getReminders: async (): Promise<ReminderRecord[]> => {
    const response = await api.get<ApiResponse<ReminderRecord[]>>('/buildings/reminders/all');
    return response.data;
  },

  createReminder: async (data: Partial<ReminderRecord>): Promise<ReminderRecord> => {
    const response = await api.post<ApiResponse<ReminderRecord>>('/buildings/reminders', data);
    return response.data;
  },

  // === MAINTENANCE ===
  getMaintenances: async (): Promise<BuildingMaintenanceRecord[]> => {
    const response = await api.get<ApiResponse<BuildingMaintenanceRecord[]>>('/buildings/maintenance/all');
    return response.data;
  },

  createMaintenance: async (data: Partial<BuildingMaintenanceRecord>): Promise<BuildingMaintenanceRecord> => {
    const response = await api.post<ApiResponse<BuildingMaintenanceRecord>>('/buildings/maintenance', data);
    return response.data;
  },
};

export default buildingService;
