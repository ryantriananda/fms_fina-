/**
 * Asset Service
 * Handle API calls untuk General Asset, ATK, ARK
 */

import { GeneralAssetRecord, AssetRecord, MasterItem, StockOpnameRecord, MaintenanceScheduleRecord } from '../types';
import api from './api';

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export const assetService = {
  // === GENERAL ASSETS ===
  getAll: async (): Promise<GeneralAssetRecord[]> => {
    const response = await api.get<ApiResponse<GeneralAssetRecord[]>>('/assets');
    return response.data;
  },

  getById: async (id: string): Promise<GeneralAssetRecord> => {
    const response = await api.get<ApiResponse<GeneralAssetRecord>>(`/assets/${id}`);
    return response.data;
  },

  create: async (data: Partial<GeneralAssetRecord>): Promise<GeneralAssetRecord> => {
    const response = await api.post<ApiResponse<GeneralAssetRecord>>('/assets', data);
    return response.data;
  },

  update: async (id: string, data: Partial<GeneralAssetRecord>): Promise<GeneralAssetRecord> => {
    const response = await api.put<ApiResponse<GeneralAssetRecord>>(`/assets/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/assets/${id}`);
  },

  // === ATK/ARK ITEMS ===
  getItems: async (type?: string): Promise<MasterItem[]> => {
    const query = type ? `?type=${type}` : '';
    const response = await api.get<ApiResponse<MasterItem[]>>(`/consumables/items${query}`);
    return response.data;
  },

  getItemById: async (id: string): Promise<MasterItem> => {
    const response = await api.get<ApiResponse<MasterItem>>(`/consumables/items/${id}`);
    return response.data;
  },

  createItem: async (data: Partial<MasterItem>): Promise<MasterItem> => {
    const response = await api.post<ApiResponse<MasterItem>>('/consumables/items', data);
    return response.data;
  },

  updateItem: async (id: string, data: Partial<MasterItem>): Promise<MasterItem> => {
    const response = await api.put<ApiResponse<MasterItem>>(`/consumables/items/${id}`, data);
    return response.data;
  },

  deleteItem: async (id: string): Promise<void> => {
    await api.delete(`/consumables/items/${id}`);
  },

  // === ATK REQUESTS (legacy) ===
  getAtkRequests: async (): Promise<AssetRecord[]> => {
    return Promise.resolve([]);
  },

  createAtkRequest: async (data: Partial<AssetRecord>): Promise<AssetRecord> => {
    return Promise.resolve({ ...data, id: Date.now() } as AssetRecord);
  },

  // === ATK MASTER ===
  getMasterAtk: async (): Promise<MasterItem[]> => {
    return assetService.getItems('ATK');
  },

  createMasterAtk: async (data: Partial<MasterItem>): Promise<MasterItem> => {
    return assetService.createItem({ ...data, type: 'ATK' });
  },

  // === ARK REQUESTS ===
  getArkRequests: async (): Promise<AssetRecord[]> => {
    return Promise.resolve([]);
  },

  // === ARK MASTER ===
  getMasterArk: async (): Promise<MasterItem[]> => {
    return assetService.getItems('ARK');
  },

  // === STOCK MUTATIONS ===
  getMutations: async (): Promise<any[]> => {
    const response = await api.get<ApiResponse<any[]>>('/consumables/mutations');
    return response.data;
  },

  createMutation: async (data: any): Promise<any> => {
    const response = await api.post<ApiResponse<any>>('/consumables/mutations', data);
    return response.data;
  },

  // === STOCK OPNAME ===
  getStockOpnames: async (): Promise<StockOpnameRecord[]> => {
    const response = await api.get<ApiResponse<StockOpnameRecord[]>>('/consumables/stock-opname');
    return response.data;
  },

  createStockOpname: async (data: Partial<StockOpnameRecord>): Promise<StockOpnameRecord> => {
    const response = await api.post<ApiResponse<StockOpnameRecord>>('/consumables/stock-opname', data);
    return response.data;
  },

  // === MAINTENANCE SCHEDULE ===
  getMaintenanceSchedules: async (): Promise<MaintenanceScheduleRecord[]> => {
    return Promise.resolve([]);
  },
};

export default assetService;
