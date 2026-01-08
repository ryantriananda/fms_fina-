/**
 * Services Index
 * Export semua services dari satu tempat
 */

export { default as api, setAuthToken, getAuthToken } from './api';
export { default as authService } from './authService';
export { default as vehicleService } from './vehicleService';
export { default as buildingService } from './buildingService';
export { default as assetService } from './assetService';
export { default as facilityService } from './facilityService';

// Re-export untuk convenience
export * from './authService';
export * from './vehicleService';
export * from './buildingService';
export * from './assetService';
export * from './facilityService';
