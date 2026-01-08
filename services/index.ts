/**
 * Services Index
 * Export semua services dari satu tempat
 */

export { default as api } from './api';
export { default as vehicleService } from './vehicleService';
export { default as buildingService } from './buildingService';
export { default as assetService } from './assetService';
export { default as facilityService } from './facilityService';

// Re-export untuk convenience
export * from './vehicleService';
export * from './buildingService';
export * from './assetService';
export * from './facilityService';
