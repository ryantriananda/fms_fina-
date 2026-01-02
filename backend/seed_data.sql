-- SEED DATA FOR FMS - GENERAL MASTERS
-- Run this in DBeaver or psql

-- PPN
INSERT INTO general_masters (category, name, code, value, is_active, is_default, created_at, updated_at) VALUES
('PPN', 'PPN 11%', 'PPN11', '11', true, true, NOW(), NOW()),
('PPN', 'PPN 12%', 'PPN12', '12', true, false, NOW(), NOW()),
('PPN', 'PPN 0%', 'PPN0', '0', true, false, NOW(), NOW());

-- BRAND_TYPE
INSERT INTO general_masters (category, name, code, is_active, created_at, updated_at) VALUES
('BRAND_TYPE', 'Otomotif', 'OTOMOTIF', true, NOW(), NOW()),
('BRAND_TYPE', 'Elektronik', 'ELEKTRONIK', true, NOW(), NOW()),
('BRAND_TYPE', 'Furniture', 'FURNITURE', true, NOW(), NOW());

-- BRAND
INSERT INTO general_masters (category, name, code, is_active, created_at, updated_at) VALUES
('BRAND', 'Toyota', 'TOYOTA', true, NOW(), NOW()),
('BRAND', 'Honda', 'HONDA', true, NOW(), NOW()),
('BRAND', 'Mitsubishi', 'MITSUBISHI', true, NOW(), NOW()),
('BRAND', 'Suzuki', 'SUZUKI', true, NOW(), NOW()),
('BRAND', 'Daihatsu', 'DAIHATSU', true, NOW(), NOW());

-- VEHICLE_MODEL
INSERT INTO general_masters (category, name, code, is_active, created_at, updated_at) VALUES
('VEHICLE_MODEL', 'Avanza', 'AVANZA', true, NOW(), NOW()),
('VEHICLE_MODEL', 'Innova', 'INNOVA', true, NOW(), NOW()),
('VEHICLE_MODEL', 'Fortuner', 'FORTUNER', true, NOW(), NOW()),
('VEHICLE_MODEL', 'Xpander', 'XPANDER', true, NOW(), NOW());

-- BUILDING_COMPONENT
INSERT INTO general_masters (category, name, code, is_active, created_at, updated_at) VALUES
('BUILDING_COMPONENT', 'Atap', 'ATAP', true, NOW(), NOW()),
('BUILDING_COMPONENT', 'Dinding', 'DINDING', true, NOW(), NOW()),
('BUILDING_COMPONENT', 'Lantai', 'LANTAI', true, NOW(), NOW()),
('BUILDING_COMPONENT', 'Plafon', 'PLAFON', true, NOW(), NOW());

-- DOCUMENT_TYPE
INSERT INTO general_masters (category, name, code, is_active, created_at, updated_at) VALUES
('DOCUMENT_TYPE', 'STNK', 'STNK', true, NOW(), NOW()),
('DOCUMENT_TYPE', 'BPKB', 'BPKB', true, NOW(), NOW()),
('DOCUMENT_TYPE', 'KIR', 'KIR', true, NOW(), NOW()),
('DOCUMENT_TYPE', 'SHM', 'SHM', true, NOW(), NOW());

-- UTILITY_TYPE
INSERT INTO general_masters (category, name, code, is_active, created_at, updated_at) VALUES
('UTILITY_TYPE', 'Listrik PLN', 'LISTRIK', true, NOW(), NOW()),
('UTILITY_TYPE', 'Air PDAM', 'AIR', true, NOW(), NOW()),
('UTILITY_TYPE', 'Internet', 'INTERNET', true, NOW(), NOW());

-- OPERATOR
INSERT INTO general_masters (category, name, code, is_active, created_at, updated_at) VALUES
('OPERATOR', 'PLN', 'PLN', true, NOW(), NOW()),
('OPERATOR', 'PDAM', 'PDAM', true, NOW(), NOW()),
('OPERATOR', 'Telkom', 'TELKOM', true, NOW(), NOW());

-- ASSET_TYPE
INSERT INTO general_masters (category, name, code, is_active, created_at, updated_at) VALUES
('ASSET_TYPE', 'Komputer', 'KOMPUTER', true, NOW(), NOW()),
('ASSET_TYPE', 'Laptop', 'LAPTOP', true, NOW(), NOW()),
('ASSET_TYPE', 'Printer', 'PRINTER', true, NOW(), NOW()),
('ASSET_TYPE', 'Meja', 'MEJA', true, NOW(), NOW());

-- DEPARTMENT
INSERT INTO general_masters (category, name, code, is_active, created_at, updated_at) VALUES
('DEPARTMENT', 'Sales', 'SALES', true, NOW(), NOW()),
('DEPARTMENT', 'Service', 'SERVICE', true, NOW(), NOW()),
('DEPARTMENT', 'Finance', 'FINANCE', true, NOW(), NOW()),
('DEPARTMENT', 'HR', 'HR', true, NOW(), NOW()),
('DEPARTMENT', 'IT', 'IT', true, NOW(), NOW()),
('DEPARTMENT', 'GA', 'GA', true, NOW(), NOW());

-- LOCATION
INSERT INTO general_masters (category, name, code, is_active, created_at, updated_at) VALUES
('LOCATION', 'Jakarta', 'JKT', true, NOW(), NOW()),
('LOCATION', 'Bandung', 'BDG', true, NOW(), NOW()),
('LOCATION', 'Surabaya', 'SBY', true, NOW(), NOW());

-- UOM
INSERT INTO general_masters (category, name, code, is_active, created_at, updated_at) VALUES
('UOM', 'Pcs', 'PCS', true, NOW(), NOW()),
('UOM', 'Box', 'BOX', true, NOW(), NOW()),
('UOM', 'Unit', 'UNIT', true, NOW(), NOW());

-- COLOR
INSERT INTO general_masters (category, name, code, is_active, created_at, updated_at) VALUES
('COLOR', 'Putih', 'WHITE', true, NOW(), NOW()),
('COLOR', 'Hitam', 'BLACK', true, NOW(), NOW()),
('COLOR', 'Silver', 'SILVER', true, NOW(), NOW());

-- BUILDING_TYPE
INSERT INTO general_masters (category, name, code, is_active, created_at, updated_at) VALUES
('BUILDING_TYPE', 'Showroom', 'SHOWROOM', true, NOW(), NOW()),
('BUILDING_TYPE', 'Workshop', 'WORKSHOP', true, NOW(), NOW()),
('BUILDING_TYPE', 'Office', 'OFFICE', true, NOW(), NOW());

-- COST_CENTER
INSERT INTO general_masters (category, name, code, is_active, created_at, updated_at) VALUES
('COST_CENTER', 'Head Office', 'CC-HO', true, NOW(), NOW()),
('COST_CENTER', 'Branch Jakarta', 'CC-JKT', true, NOW(), NOW());

-- ASSET_CATEGORY
INSERT INTO general_masters (category, name, code, is_active, created_at, updated_at) VALUES
('ASSET_CATEGORY', 'Human Capital', 'HC', true, NOW(), NOW()),
('ASSET_CATEGORY', 'Information Technology', 'IT', true, NOW(), NOW()),
('ASSET_CATEGORY', 'Customer Service', 'CS', true, NOW(), NOW());

-- TAX_TYPE
INSERT INTO general_masters (category, name, code, value, is_active, created_at, updated_at) VALUES
('TAX_TYPE', 'PPh 21', 'PPH21', '5', true, NOW(), NOW()),
('TAX_TYPE', 'PPh 23', 'PPH23', '2', true, NOW(), NOW()),
('TAX_TYPE', 'PPN', 'PPN', '11', true, NOW(), NOW());

-- PAYMENT_TYPE
INSERT INTO general_masters (category, name, code, is_active, created_at, updated_at) VALUES
('PAYMENT_TYPE', 'Cash', 'CASH', true, NOW(), NOW()),
('PAYMENT_TYPE', 'Transfer Bank', 'TRANSFER', true, NOW(), NOW()),
('PAYMENT_TYPE', 'Giro', 'GIRO', true, NOW(), NOW());

-- SERVICE_CATEGORY
INSERT INTO general_masters (category, name, code, is_active, created_at, updated_at) VALUES
('SERVICE_CATEGORY', 'Servis Berkala', 'BERKALA', true, NOW(), NOW()),
('SERVICE_CATEGORY', 'Servis Ringan', 'RINGAN', true, NOW(), NOW()),
('SERVICE_CATEGORY', 'Servis Berat', 'BERAT', true, NOW(), NOW());

-- VEHICLE_TYPE
INSERT INTO general_masters (category, name, code, is_active, created_at, updated_at) VALUES
('VEHICLE_TYPE', 'Sedan', 'SEDAN', true, NOW(), NOW()),
('VEHICLE_TYPE', 'SUV', 'SUV', true, NOW(), NOW()),
('VEHICLE_TYPE', 'MPV', 'MPV', true, NOW(), NOW()),
('VEHICLE_TYPE', 'Pick Up', 'PICKUP', true, NOW(), NOW());

-- VENDOR_CATEGORY
INSERT INTO general_masters (category, name, code, is_active, created_at, updated_at) VALUES
('VENDOR_CATEGORY', 'Bengkel', 'BENGKEL', true, NOW(), NOW()),
('VENDOR_CATEGORY', 'Asuransi', 'ASURANSI', true, NOW(), NOW()),
('VENDOR_CATEGORY', 'Supplier ATK', 'SUPPLIER_ATK', true, NOW(), NOW());

-- INSURANCE_TYPE
INSERT INTO general_masters (category, name, code, is_active, created_at, updated_at) VALUES
('INSURANCE_TYPE', 'All Risk', 'ALL_RISK', true, NOW(), NOW()),
('INSURANCE_TYPE', 'TLO', 'TLO', true, NOW(), NOW());

-- SERVICE_TYPE
INSERT INTO general_masters (category, name, code, is_active, created_at, updated_at) VALUES
('SERVICE_TYPE', 'Preventive', 'PREVENTIVE', true, NOW(), NOW()),
('SERVICE_TYPE', 'Corrective', 'CORRECTIVE', true, NOW(), NOW());

-- MAINTENANCE_TYPE
INSERT INTO general_masters (category, name, code, is_active, created_at, updated_at) VALUES
('MAINTENANCE_TYPE', 'Preventive', 'PREVENTIVE', true, NOW(), NOW()),
('MAINTENANCE_TYPE', 'Corrective', 'CORRECTIVE', true, NOW(), NOW());

-- BUILDING_ASSET_TYPE
INSERT INTO general_masters (category, name, code, is_active, created_at, updated_at) VALUES
('BUILDING_ASSET_TYPE', 'AC', 'AC', true, NOW(), NOW()),
('BUILDING_ASSET_TYPE', 'Genset', 'GENSET', true, NOW(), NOW()),
('BUILDING_ASSET_TYPE', 'CCTV', 'CCTV', true, NOW(), NOW());

-- OWNERSHIP
INSERT INTO general_masters (category, name, code, is_active, created_at, updated_at) VALUES
('OWNERSHIP', 'Milik Sendiri', 'OWN', true, NOW(), NOW()),
('OWNERSHIP', 'Sewa', 'SEWA', true, NOW(), NOW());

-- CHANNEL
INSERT INTO general_masters (category, name, code, is_active, created_at, updated_at) VALUES
('CHANNEL', 'Retail', 'RETAIL', true, NOW(), NOW()),
('CHANNEL', 'Fleet', 'FLEET', true, NOW(), NOW()),
('CHANNEL', 'Corporate', 'CORPORATE', true, NOW(), NOW());
