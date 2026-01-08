/**
 * Asset Service
 * Handle API calls untuk General Asset, ATK, ARK
 */

import { GeneralAssetRecord, AssetRecord, MasterItem, StockOpnameRecord, MaintenanceScheduleRecord } from '../types';
import api from './api';

export const assetService = {
  // === GENERAL ASSETS ===
  getAll: async (): Promise<GeneralAssetRecord[]> => {
    // return api.get<GeneralAssetRecord[]>('/assets');
    return Promise.resolve([]);
  },

  getById: async (id: string): Promise<GeneralAssetRecord> => {
    // return api.get<GeneralAssetRecord>(`/assets/${id}`);
    return Promise.reject('Not implemented');
  },

  create: async (data: Partial<GeneralAssetRecord>): Promise<GeneralAssetRecord> => {
    // return api.post<GeneralAssetRecord>('/assets', data);
    return Promise.resolve({ ...data, id: `GA-${Date.now()}` } as GeneralAssetRecord);
  },

  update: async (id: string, data: Partial<GeneralAssetRecord>): Promise<GeneralAssetRecord> => {
    // return api.put<GeneralAssetRecord>(`/assets/${id}`, data);
    return Promise.resolve({ ...data, id } as GeneralAssetRecord);
  },

  delete: async (id: string): Promise<void> => {
    // return api.delete(`/assets/${id}`);
    return Promise.resolve();
  },

  // === ATK REQUESTS ===
  getAtkRequests: async (): Promise<AssetRecord[]> => {
    // return api.get<AssetRecord[]>('/atk/requests');
    return Promise.resolve([]);
  },

  createAtkRequest: async (data: Partial<AssetRecord>): Promise<AssetRecord> => {
    // return api.post<AssetRecord>('/atk/requests', data);
    return Promise.resolve({ ...data, id: Date.now() } as AssetRecord);
  },

  // === ATK MASTER ===
  getMasterAtk: async (): Promise<MasterItem[]> => {
    // return api.get<MasterItem[]>('/atk/master');
    return Promise.resolve([]);
  },

  createMasterAtk: async (data: Partial<MasterItem>): Promise<MasterItem> => {
    // return api.post<MasterItem>('/atk/master', data);
    return Promise.resolve({ ...data, id: Date.now() } as MasterItem);
  },

  // === ARK REQUESTS ===
  getArkRequests: async (): Promise<AssetRecord[]> => {
    // return api.get<AssetRecord[]>('/ark/requests');
    return Promise.resolve([]);
  },

  // === ARK MASTER ===
  getMasterArk: async (): Promise<MasterItem[]> => {
    // return api.get<MasterItem[]>('/ark/master');
    return Promise.resolve([]);
  },

  // === STOCK OPNAME ===
  getStockOpnames: async (): Promise<StockOpnameRecord[]> => {
    // return api.get<StockOpnameRecord[]>('/stock-opname');
    return Promise.resolve([]);
  },

  createStockOpname: async (data: Partial<StockOpnameRecord>): Promise<StockOpnameRecord> => {
    // return api.post<StockOpnameRecord>('/stock-opname', data);
    return Promise.resolve({ ...data, id: Date.now() } as StockOpnameRecord);
  },

  // === MAINTENANCE SCHEDULE ===
  getMaintenanceSchedules: async (): Promise<MaintenanceScheduleRecord[]> => {
    // return api.get<MaintenanceScheduleRecord[]>('/assets/maintenance-schedules');
    return Promise.resolve([]);
  },
};

export default assetService;
