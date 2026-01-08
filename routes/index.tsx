/**
 * Route Configuration
 * Definisi semua routes aplikasi
 */

import React from 'react';
import { RouteObject } from 'react-router-dom';

// Route paths sebagai constants
export const ROUTES = {
  DASHBOARD: '/',
  
  // Consumables
  ATK_REQUEST: '/consumables/atk-request',
  ATK_MASTER: '/consumables/atk-master',
  ARK_REQUEST: '/consumables/ark-request',
  ARK_MASTER: '/consumables/ark-master',
  STOCK_OPNAME: '/consumables/stock-opname',
  
  // Vehicle
  VEHICLE_LIST: '/vehicle/list',
  VEHICLE_CONTRACT: '/vehicle/contract',
  VEHICLE_SERVICE: '/vehicle/service',
  VEHICLE_TAX: '/vehicle/tax-kir',
  VEHICLE_REMINDER: '/vehicle/reminder',
  VEHICLE_MUTATION: '/vehicle/mutation',
  VEHICLE_SALES: '/vehicle/sales',
  
  // Building
  BUILDING_LIST: '/building/list',
  BUILDING_UTILITY: '/building/utility',
  BUILDING_COMPLIANCE: '/building/compliance',
  BUILDING_MAINTENANCE: '/building/maintenance',
  
  // General Asset
  ASSET_IT: '/asset/it',
  ASSET_HC: '/asset/hc',
  ASSET_MAINTENANCE: '/asset/maintenance',
  ASSET_MUTATION: '/asset/mutation',
  ASSET_SALES: '/asset/sales',
  
  // Insurance
  INSURANCE_DASHBOARD: '/insurance/dashboard',
  INSURANCE_POLICY: '/insurance/policy',
  INSURANCE_CLAIM: '/insurance/claim',
  INSURANCE_PROVIDER: '/insurance/provider',
  INSURANCE_REMINDER: '/insurance/reminder',
  
  // Facility
  POD_REQUEST: '/facility/pod-request',
  POD_APPROVAL: '/facility/pod-approval',
  POD_MASTER: '/facility/pod-master',
  POD_TENANT: '/facility/pod-tenant',
  LOCKER_LIST: '/facility/locker',
  LOCKER_REQUEST: '/facility/locker-request',
  
  // Daily Ops
  LOGBOOK: '/ops/logbook',
  TIMESHEET: '/ops/timesheet',
  
  // Admin
  USER_MANAGEMENT: '/admin/users',
  VENDOR_MANAGEMENT: '/admin/vendors',
  MASTER_APPROVAL: '/admin/approval-workflow',
  MASTER_DATA: '/admin/master-data',
} as const;

// Helper untuk generate breadcrumb dari path
export const getPageTitle = (path: string): string => {
  const titles: Record<string, string> = {
    [ROUTES.DASHBOARD]: 'Dashboard',
    [ROUTES.ATK_REQUEST]: 'Request ATK',
    [ROUTES.ATK_MASTER]: 'Master ATK',
    [ROUTES.VEHICLE_LIST]: 'Daftar Kendaraan',
    [ROUTES.BUILDING_LIST]: 'Daftar Gedung',
    // ... tambahkan sesuai kebutuhan
  };
  return titles[path] || 'FMS';
};

// Menu structure untuk Sidebar (bisa dipindah ke file terpisah)
export interface MenuItem {
  label: string;
  path?: string;
  icon?: string;
  children?: MenuItem[];
}

export const menuItems: MenuItem[] = [
  { label: 'Dashboard', path: ROUTES.DASHBOARD },
  {
    label: 'Consumables',
    children: [
      { label: 'Request ATK', path: ROUTES.ATK_REQUEST },
      { label: 'Master ATK', path: ROUTES.ATK_MASTER },
      { label: 'Request ARK', path: ROUTES.ARK_REQUEST },
      { label: 'Master ARK', path: ROUTES.ARK_MASTER },
      { label: 'Stock Opname', path: ROUTES.STOCK_OPNAME },
    ],
  },
  {
    label: 'Vehicle',
    children: [
      { label: 'Daftar Kendaraan', path: ROUTES.VEHICLE_LIST },
      { label: 'Kontrak', path: ROUTES.VEHICLE_CONTRACT },
      { label: 'Servis', path: ROUTES.VEHICLE_SERVICE },
      { label: 'Pajak & KIR', path: ROUTES.VEHICLE_TAX },
      { label: 'Reminder', path: ROUTES.VEHICLE_REMINDER },
      { label: 'Mutasi', path: ROUTES.VEHICLE_MUTATION },
      { label: 'Penjualan', path: ROUTES.VEHICLE_SALES },
    ],
  },
  {
    label: 'Building',
    children: [
      { label: 'Daftar Gedung', path: ROUTES.BUILDING_LIST },
      { label: 'Utility', path: ROUTES.BUILDING_UTILITY },
      { label: 'Compliance', path: ROUTES.BUILDING_COMPLIANCE },
      { label: 'Maintenance', path: ROUTES.BUILDING_MAINTENANCE },
    ],
  },
  {
    label: 'General Asset',
    children: [
      { label: 'Asset IT', path: ROUTES.ASSET_IT },
      { label: 'Asset HC', path: ROUTES.ASSET_HC },
      { label: 'Maintenance', path: ROUTES.ASSET_MAINTENANCE },
    ],
  },
  {
    label: 'Facility',
    children: [
      { label: 'Pod Request', path: ROUTES.POD_REQUEST },
      { label: 'Master Pod', path: ROUTES.POD_MASTER },
      { label: 'Locker', path: ROUTES.LOCKER_LIST },
    ],
  },
  {
    label: 'Admin',
    children: [
      { label: 'Users', path: ROUTES.USER_MANAGEMENT },
      { label: 'Vendors', path: ROUTES.VENDOR_MANAGEMENT },
      { label: 'Approval Workflow', path: ROUTES.MASTER_APPROVAL },
    ],
  },
];
