/**
 * Building Service
 * Handle semua API calls untuk modul Building
 */

import { BuildingRecord, UtilityRecord, ReminderRecord, BuildingMaintenanceRecord } from '../types';
import api from './api';

export const buildingService = {
  // === BUILDINGS ===
  getAll: async (): Promise<BuildingRecord[]> => {
    // return api.get<BuildingRecord[]>('/buildings');
    return Promise.resolve([]);
  },

  getById: async (id: string | number): Promise<BuildingRecord> => {
    // return api.get<BuildingRecord>(`/buildings/${id}`);
    return Promise.reject('Not implemented');
  },

  create: async (data: Partial<BuildingRecord>): Promise<BuildingRecord> => {
    // return api.post<BuildingRecord>('/buildings', data);
    return Promise.resolve({ ...data, id: Date.now() } as BuildingRecord);
  },

  update: async (id: string | number, data: Partial<BuildingRecord>): Promise<BuildingRecord> => {
    // return api.put<BuildingRecord>(`/buildings/${id}`, data);
    return Promise.resolve({ ...data, id } as BuildingRecord);
  },

  delete: async (id: string | number): Promise<void> => {
    // return api.delete(`/buildings/${id}`);
    return Promise.resolve();
  },

  // === UTILITIES ===
  getUtilities: async (): Promise<UtilityRecord[]> => {
    // return api.get<UtilityRecord[]>('/buildings/utilities');
    return Promise.resolve([]);
  },

  createUtility: async (data: Partial<UtilityRecord>): Promise<UtilityRecord> => {
    // return api.post<UtilityRecord>('/buildings/utilities', data);
    return Promise.resolve({ ...data, id: `UTIL-${Date.now()}` } as UtilityRecord);
  },

  // === COMPLIANCE / REMINDERS ===
  getReminders: async (): Promise<ReminderRecord[]> => {
    // return api.get<ReminderRecord[]>('/buildings/reminders');
    return Promise.resolve([]);
  },

  createReminder: async (data: Partial<ReminderRecord>): Promise<ReminderRecord> => {
    // return api.post<ReminderRecord>('/buildings/reminders', data);
    return Promise.resolve({ ...data, id: Date.now() } as ReminderRecord);
  },

  // === MAINTENANCE ===
  getMaintenances: async (): Promise<BuildingMaintenanceRecord[]> => {
    // return api.get<BuildingMaintenanceRecord[]>('/buildings/maintenances');
    return Promise.resolve([]);
  },

  createMaintenance: async (data: Partial<BuildingMaintenanceRecord>): Promise<BuildingMaintenanceRecord> => {
    // return api.post<BuildingMaintenanceRecord>('/buildings/maintenances', data);
    return Promise.resolve({ ...data, id: `BM-${Date.now()}` } as BuildingMaintenanceRecord);
  },
};

export default buildingService;
