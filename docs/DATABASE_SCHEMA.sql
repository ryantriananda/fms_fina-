-- ============================================
-- FACILITY MANAGEMENT SYSTEM (FMS)
-- DATABASE SCHEMA - PostgreSQL
-- Generated: 2 Januari 2026
-- ============================================

-- ============================================
-- 1. CORE TABLES
-- ============================================

-- Users Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    role VARCHAR(50) DEFAULT 'Staff',
    department VARCHAR(100),
    branch VARCHAR(100),
    phone VARCHAR(20),
    status VARCHAR(20) DEFAULT 'Active'
);

CREATE INDEX idx_users_deleted_at ON users(deleted_at);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_email ON users(email);

-- Vendors Table
CREATE TABLE vendors (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
    vendor_code VARCHAR(50) UNIQUE NOT NULL,
    vendor_name VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    address TEXT,
    city VARCHAR(100),
    province VARCHAR(100),
    postal_code VARCHAR(10),
    phone VARCHAR(20),
    email VARCHAR(255),
    website VARCHAR(255),
    pic_name VARCHAR(255),
    pic_phone VARCHAR(20),
    pic_email VARCHAR(255),
    bank_name VARCHAR(100),
    bank_account VARCHAR(50),
    bank_account_name VARCHAR(255),
    npwp VARCHAR(30),
    status VARCHAR(20) DEFAULT 'Active'
);

CREATE INDEX idx_vendors_deleted_at ON vendors(deleted_at);
CREATE INDEX idx_vendors_vendor_code ON vendors(vendor_code);

-- Buildings Table
CREATE TABLE buildings (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
    asset_no VARCHAR(50) UNIQUE NOT NULL,
    building_name VARCHAR(255) NOT NULL,
    address TEXT,
    city VARCHAR(100),
    province VARCHAR(100),
    postal_code VARCHAR(10),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    ownership VARCHAR(50) DEFAULT 'Own',
    building_type VARCHAR(100),
    total_floors INTEGER,
    total_area DECIMAL(10, 2),
    land_area DECIMAL(10, 2),
    building_area DECIMAL(10, 2),
    year_built VARCHAR(4),
    channel VARCHAR(100),
    branch VARCHAR(100),
    status VARCHAR(20) DEFAULT 'Active',
    approval_status VARCHAR(20) DEFAULT 'Approved',
    pic VARCHAR(255),
    phone VARCHAR(20),
    photo_url VARCHAR(500),
    certificate_url VARCHAR(500)
);

CREATE INDEX idx_buildings_deleted_at ON buildings(deleted_at);
CREATE INDEX idx_buildings_asset_no ON buildings(asset_no);

-- Vehicles Table
CREATE TABLE vehicles (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
    no_polisi VARCHAR(20) UNIQUE NOT NULL,
    no_rangka VARCHAR(50),
    no_mesin VARCHAR(50),
    no_bpkb VARCHAR(50),
    merek VARCHAR(100),
    model VARCHAR(100),
    tipe_kendaraan VARCHAR(100),
    tahun_pembuatan VARCHAR(4),
    warna VARCHAR(50),
    isi_silinder VARCHAR(20),
    bahan_bakar VARCHAR(50),
    ownership VARCHAR(50) DEFAULT 'Own',
    channel VARCHAR(100),
    cabang VARCHAR(100),
    pengguna_utama VARCHAR(255),
    status VARCHAR(20) DEFAULT 'Active',
    approval_status VARCHAR(20) DEFAULT 'Approved',
    stnk_url VARCHAR(500),
    kir_url VARCHAR(500),
    photo_front VARCHAR(500),
    photo_rear VARCHAR(500),
    photo_right VARCHAR(500),
    photo_left VARCHAR(500),
    stnk_expiry DATE,
    kir_expiry DATE,
    purchase_date DATE,
    purchase_price DECIMAL(15, 2)
);

CREATE INDEX idx_vehicles_deleted_at ON vehicles(deleted_at);
CREATE INDEX idx_vehicles_no_polisi ON vehicles(no_polisi);

-- General Assets Table
CREATE TABLE general_assets (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
    asset_number VARCHAR(50) UNIQUE NOT NULL,
    asset_category VARCHAR(50) NOT NULL, -- HC, IT, CS
    type VARCHAR(100),
    asset_name VARCHAR(255),
    ownership VARCHAR(50) DEFAULT 'Own',
    building_id INTEGER REFERENCES buildings(id),
    asset_location VARCHAR(255),
    sub_location VARCHAR(255),
    department VARCHAR(100),
    channel VARCHAR(100),
    status VARCHAR(20) DEFAULT 'Active',
    approval_status VARCHAR(20) DEFAULT 'Approved',
    address TEXT,
    purchase_price DECIMAL(15, 2),
    purchase_date DATE,
    brand VARCHAR(100),
    model_number VARCHAR(100),
    pic VARCHAR(255),
    source_category VARCHAR(100)
);

CREATE INDEX idx_general_assets_deleted_at ON general_assets(deleted_at);
CREATE INDEX idx_general_assets_asset_number ON general_assets(asset_number);
CREATE INDEX idx_general_assets_building_id ON general_assets(building_id);

-- ============================================
-- 2. VEHICLE RELATED TABLES
-- ============================================

-- Vehicle Contracts Table
CREATE TABLE vehicle_contracts (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
    no_kontrak VARCHAR(50) UNIQUE NOT NULL,
    no_polisi VARCHAR(20) NOT NULL,
    aset VARCHAR(255),
    vendor_id INTEGER REFERENCES vendors(id),
    vendor VARCHAR(255),
    tgl_mulai DATE,
    tgl_berakhir DATE,
    biaya_sewa DECIMAL(15, 2),
    approval_status VARCHAR(20) DEFAULT 'Pending',
    status VARCHAR(20) DEFAULT 'Active',
    channel VARCHAR(100),
    cabang VARCHAR(100),
    pengguna_utama VARCHAR(255),
    attachment_url VARCHAR(500),
    stnk_url VARCHAR(500),
    kir_url VARCHAR(500),
    photo_front VARCHAR(500),
    photo_rear VARCHAR(500),
    photo_right VARCHAR(500),
    photo_left VARCHAR(500),
    merek VARCHAR(100),
    tipe_kendaraan VARCHAR(100),
    model VARCHAR(100),
    tahun_pembuatan VARCHAR(4),
    warna VARCHAR(50),
    isi_silinder VARCHAR(20),
    ownership VARCHAR(50) DEFAULT 'Sewa'
);

CREATE INDEX idx_vehicle_contracts_deleted_at ON vehicle_contracts(deleted_at);
CREATE INDEX idx_vehicle_contracts_vendor_id ON vehicle_contracts(vendor_id);

-- Services Table
CREATE TABLE services (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
    vehicle_id INTEGER REFERENCES vehicles(id),
    no_polisi VARCHAR(20),
    asset_name VARCHAR(255),
    tgl_request DATE,
    channel VARCHAR(100),
    cabang VARCHAR(100),
    status VARCHAR(20) DEFAULT 'Pending',
    status_approval VARCHAR(20) DEFAULT 'Pending',
    vendor_id INTEGER REFERENCES vendors(id),
    vendor VARCHAR(255),
    km_kendaraan VARCHAR(20),
    masalah TEXT,
    jenis_servis VARCHAR(100),
    estimasi_biaya DECIMAL(15, 2),
    technician VARCHAR(255)
);

CREATE INDEX idx_services_deleted_at ON services(deleted_at);
CREATE INDEX idx_services_vehicle_id ON services(vehicle_id);
CREATE INDEX idx_services_vendor_id ON services(vendor_id);

-- Spare Parts Table
CREATE TABLE spare_parts (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
    service_id INTEGER REFERENCES services(id),
    name VARCHAR(255),
    qty INTEGER,
    price DECIMAL(15, 2),
    image_url VARCHAR(500)
);

CREATE INDEX idx_spare_parts_deleted_at ON spare_parts(deleted_at);
CREATE INDEX idx_spare_parts_service_id ON spare_parts(service_id);

-- Tax KIR Table
CREATE TABLE tax_kirs (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
    vehicle_id INTEGER REFERENCES vehicles(id),
    no_polisi VARCHAR(20) NOT NULL,
    asset_name VARCHAR(255),
    tgl_request DATE,
    jenis VARCHAR(50), -- Pajak STNK, KIR
    channel VARCHAR(100),
    cabang VARCHAR(100),
    status VARCHAR(20) DEFAULT 'Pending',
    status_approval VARCHAR(20) DEFAULT 'Pending',
    jatuh_tempo DATE,
    estimasi_biaya DECIMAL(15, 2),
    target_selesai DATE,
    jenis_pembayaran VARCHAR(100),
    attachment_url VARCHAR(500)
);

CREATE INDEX idx_tax_kirs_deleted_at ON tax_kirs(deleted_at);
CREATE INDEX idx_tax_kirs_vehicle_id ON tax_kirs(vehicle_id);

-- Vehicle Reminders Table
CREATE TABLE vehicle_reminders (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
    vehicle_id INTEGER REFERENCES vehicles(id),
    no_polisi VARCHAR(20),
    vehicle_name VARCHAR(255),
    type VARCHAR(50), -- STNK 1 Tahunan, STNK 5 Tahunan, KIR
    expiry_date DATE,
    branch VARCHAR(100),
    status VARCHAR(20) -- Safe, Warning, Critical, Expired
);

CREATE INDEX idx_vehicle_reminders_deleted_at ON vehicle_reminders(deleted_at);
CREATE INDEX idx_vehicle_reminders_vehicle_id ON vehicle_reminders(vehicle_id);


-- ============================================
-- 3. INSURANCE TABLES
-- ============================================

-- Insurances Table
CREATE TABLE insurances (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
    policy_number VARCHAR(50) UNIQUE NOT NULL,
    asset_id INTEGER,
    asset_name VARCHAR(255),
    category VARCHAR(50), -- Vehicle, Building
    provider VARCHAR(255),
    vendor_id INTEGER REFERENCES vendors(id),
    type VARCHAR(100), -- All Risk, TLO, Property All Risk
    start_date DATE,
    end_date DATE,
    premium DECIMAL(15, 2),
    sum_insured DECIMAL(15, 2),
    status VARCHAR(20) DEFAULT 'Active',
    deductible DECIMAL(15, 2),
    attachment_url VARCHAR(500)
);

CREATE INDEX idx_insurances_deleted_at ON insurances(deleted_at);
CREATE INDEX idx_insurances_policy_number ON insurances(policy_number);
CREATE INDEX idx_insurances_vendor_id ON insurances(vendor_id);

-- Insurance Claims Table
CREATE TABLE insurance_claims (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
    insurance_id INTEGER REFERENCES insurances(id),
    incident_date DATE,
    description TEXT,
    claim_amount DECIMAL(15, 2),
    covered_amount DECIMAL(15, 2),
    status VARCHAR(50), -- Submitted, Survey, Approved, Paid, Rejected
    remarks TEXT
);

CREATE INDEX idx_insurance_claims_deleted_at ON insurance_claims(deleted_at);
CREATE INDEX idx_insurance_claims_insurance_id ON insurance_claims(insurance_id);

-- ============================================
-- 4. MUTATION & SALES TABLES
-- ============================================

-- Mutations Table
CREATE TABLE mutations (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
    vehicle_id INTEGER REFERENCES vehicles(id),
    general_asset_id INTEGER REFERENCES general_assets(id),
    no_polisi VARCHAR(20),
    asset_number VARCHAR(50),
    asset_name VARCHAR(255),
    cabang_aset VARCHAR(100),
    tipe_mutasi VARCHAR(100),
    tgl_permintaan DATE,
    lokasi_asal VARCHAR(255),
    lokasi_tujuan VARCHAR(255),
    status VARCHAR(20) DEFAULT 'Pending',
    status_approval VARCHAR(20) DEFAULT 'Pending',
    pic_before VARCHAR(255),
    pic_after VARCHAR(255),
    asset_type VARCHAR(50), -- VEHICLE, GENERAL_ASSET
    biaya_mutasi DECIMAL(15, 2)
);

CREATE INDEX idx_mutations_deleted_at ON mutations(deleted_at);
CREATE INDEX idx_mutations_vehicle_id ON mutations(vehicle_id);
CREATE INDEX idx_mutations_general_asset_id ON mutations(general_asset_id);

-- Sales Table
CREATE TABLE sales (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
    vehicle_id INTEGER REFERENCES vehicles(id),
    general_asset_id INTEGER REFERENCES general_assets(id),
    no_polisi VARCHAR(20),
    asset_number VARCHAR(50),
    asset_name VARCHAR(255),
    tgl_request DATE,
    channel VARCHAR(100),
    cabang VARCHAR(100),
    harga_tertinggi DECIMAL(15, 2),
    harga_pembuka DECIMAL(15, 2),
    status VARCHAR(50) DEFAULT 'Open Bidding',
    status_approval VARCHAR(20) DEFAULT 'Pending',
    asset_type VARCHAR(50) -- VEHICLE, GENERAL_ASSET
);

CREATE INDEX idx_sales_deleted_at ON sales(deleted_at);
CREATE INDEX idx_sales_vehicle_id ON sales(vehicle_id);
CREATE INDEX idx_sales_general_asset_id ON sales(general_asset_id);

-- Bids Table
CREATE TABLE bids (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
    sale_id INTEGER REFERENCES sales(id),
    amount DECIMAL(15, 2),
    bidder_name VARCHAR(255),
    bidder_role VARCHAR(100),
    bidder_email VARCHAR(255),
    bidder_phone VARCHAR(20),
    bidder_ktp VARCHAR(20),
    timestamp TIMESTAMP
);

CREATE INDEX idx_bids_deleted_at ON bids(deleted_at);
CREATE INDEX idx_bids_sale_id ON bids(sale_id);

-- ============================================
-- 5. BUILDING RELATED TABLES
-- ============================================

-- Utilities Table
CREATE TABLE utilities (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
    building_id INTEGER REFERENCES buildings(id),
    period VARCHAR(10),
    date DATE,
    location VARCHAR(255),
    type VARCHAR(50), -- Listrik, Air, Internet
    meter_start DECIMAL(15, 2),
    meter_end DECIMAL(15, 2),
    usage DECIMAL(15, 2),
    unit VARCHAR(20),
    cost DECIMAL(15, 2),
    status VARCHAR(20) DEFAULT 'Pending',
    attachment_url VARCHAR(500)
);

CREATE INDEX idx_utilities_deleted_at ON utilities(deleted_at);
CREATE INDEX idx_utilities_building_id ON utilities(building_id);

-- Log Books Table
CREATE TABLE log_books (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
    building_id INTEGER REFERENCES buildings(id),
    lokasi_modena VARCHAR(255),
    kategori_tamu VARCHAR(100),
    nama_tamu VARCHAR(255),
    tanggal_kunjungan DATE,
    jam_datang VARCHAR(10),
    jam_pulang VARCHAR(10),
    wanita INTEGER DEFAULT 0,
    laki_laki INTEGER DEFAULT 0,
    anak_anak INTEGER DEFAULT 0,
    note TEXT
);

CREATE INDEX idx_log_books_deleted_at ON log_books(deleted_at);
CREATE INDEX idx_log_books_building_id ON log_books(building_id);

-- Building Assets Table
CREATE TABLE building_assets (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
    asset_name VARCHAR(255) NOT NULL,
    asset_code VARCHAR(50) UNIQUE NOT NULL,
    asset_type VARCHAR(100), -- AC, Genset, Lift, etc.
    building_id INTEGER REFERENCES buildings(id),
    building_name VARCHAR(255),
    floor VARCHAR(20),
    room_name VARCHAR(100),
    status VARCHAR(20) DEFAULT 'Active',
    approval_status VARCHAR(20) DEFAULT 'Draft',
    maintenance_frequency VARCHAR(50), -- Monthly, Quarterly, Yearly
    ownership VARCHAR(50),
    purchase_price DECIMAL(15, 2),
    purchase_date DATE,
    pic VARCHAR(255),
    brand VARCHAR(100),
    attachment_url VARCHAR(500)
);

CREATE INDEX idx_building_assets_deleted_at ON building_assets(deleted_at);
CREATE INDEX idx_building_assets_asset_code ON building_assets(asset_code);
CREATE INDEX idx_building_assets_building_id ON building_assets(building_id);

-- Building Maintenances Table
CREATE TABLE building_maintenances (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
    asset_id INTEGER REFERENCES building_assets(id),
    asset_name VARCHAR(255),
    building_location VARCHAR(255),
    request_date DATE,
    completion_date DATE,
    maintenance_type VARCHAR(50), -- Preventive, Corrective, Emergency
    description TEXT,
    cost DECIMAL(15, 2),
    vendor_id INTEGER REFERENCES vendors(id),
    vendor VARCHAR(255),
    technician VARCHAR(255),
    status VARCHAR(20) DEFAULT 'Scheduled',
    approval_status VARCHAR(20) DEFAULT 'Draft',
    evidence_before VARCHAR(500),
    evidence_after VARCHAR(500),
    rating INTEGER
);

CREATE INDEX idx_building_maintenances_deleted_at ON building_maintenances(deleted_at);
CREATE INDEX idx_building_maintenances_asset_id ON building_maintenances(asset_id);
CREATE INDEX idx_building_maintenances_vendor_id ON building_maintenances(vendor_id);

-- Building Reminders Table
CREATE TABLE building_reminders (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
    building_id INTEGER REFERENCES buildings(id),
    document_name VARCHAR(255),
    building_name VARCHAR(255),
    asset_no VARCHAR(50),
    expiry_date DATE,
    category VARCHAR(100), -- Insurance, Lease, Legal, Permit
    source VARCHAR(50), -- System, Manual
    status VARCHAR(20) -- Safe, Warning, Urgent, Expired
);

CREATE INDEX idx_building_reminders_deleted_at ON building_reminders(deleted_at);
CREATE INDEX idx_building_reminders_building_id ON building_reminders(building_id);

-- Maintenance Schedules Table
CREATE TABLE maintenance_schedules (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
    asset_id INTEGER REFERENCES building_assets(id),
    asset_name VARCHAR(255),
    asset_code VARCHAR(50),
    location VARCHAR(255),
    category VARCHAR(100), -- AC, Genset, etc.
    frequency VARCHAR(50), -- Monthly, Quarterly, Yearly
    last_maintenance_date DATE,
    next_maintenance_date DATE,
    status VARCHAR(20), -- Safe, Warning, Overdue
    vendor_id INTEGER REFERENCES vendors(id),
    vendor VARCHAR(255)
);

CREATE INDEX idx_maintenance_schedules_deleted_at ON maintenance_schedules(deleted_at);
CREATE INDEX idx_maintenance_schedules_asset_id ON maintenance_schedules(asset_id);
CREATE INDEX idx_maintenance_schedules_vendor_id ON maintenance_schedules(vendor_id);

-- Compliances Table
CREATE TABLE compliances (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
    document_name VARCHAR(255) NOT NULL,
    document_type VARCHAR(100), -- Contract, Permit, License, Certificate
    building_id INTEGER REFERENCES buildings(id),
    building_name VARCHAR(255),
    asset_no VARCHAR(50),
    issue_date DATE,
    expiry_date DATE,
    issuing_body VARCHAR(255),
    document_no VARCHAR(100),
    category VARCHAR(100), -- Insurance, Lease, Legal, Permit
    status VARCHAR(20), -- Safe, Warning, Urgent, Expired
    attachment_url VARCHAR(500),
    notes TEXT
);

CREATE INDEX idx_compliances_deleted_at ON compliances(deleted_at);
CREATE INDEX idx_compliances_building_id ON compliances(building_id);


-- ============================================
-- 6. STATIONERY (ATK/ARK) TABLES
-- ============================================

-- Master Items Table
CREATE TABLE master_items (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
    category VARCHAR(20), -- ATK, ARK
    item_name VARCHAR(255) NOT NULL,
    item_code VARCHAR(50) UNIQUE NOT NULL,
    uom VARCHAR(50),
    remaining_stock INTEGER DEFAULT 0,
    minimum_stock INTEGER DEFAULT 0,
    maximum_stock INTEGER DEFAULT 0,
    requested_stock INTEGER DEFAULT 0,
    last_purchase_price DECIMAL(15, 2),
    average_price DECIMAL(15, 2),
    purchase_date DATE,
    image_url VARCHAR(500)
);

CREATE INDEX idx_master_items_deleted_at ON master_items(deleted_at);
CREATE INDEX idx_master_items_item_code ON master_items(item_code);

-- Delivery Locations Table
CREATE TABLE delivery_locations (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
    name VARCHAR(255) NOT NULL,
    address TEXT,
    type VARCHAR(50) -- Warehouse, Branch
);

CREATE INDEX idx_delivery_locations_deleted_at ON delivery_locations(deleted_at);

-- Stationery Requests Table
CREATE TABLE stationery_requests (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
    type VARCHAR(20), -- ATK, ARK
    delivery_type VARCHAR(100),
    location_id INTEGER REFERENCES delivery_locations(id),
    location VARCHAR(255),
    date DATE,
    remarks TEXT,
    status VARCHAR(20) DEFAULT 'Pending',
    approval_status VARCHAR(20) DEFAULT 'Pending',
    requested_by INTEGER REFERENCES users(id)
);

CREATE INDEX idx_stationery_requests_deleted_at ON stationery_requests(deleted_at);
CREATE INDEX idx_stationery_requests_location_id ON stationery_requests(location_id);
CREATE INDEX idx_stationery_requests_requested_by ON stationery_requests(requested_by);

-- Stationery Request Items Table
CREATE TABLE stationery_request_items (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
    request_id INTEGER REFERENCES stationery_requests(id),
    item_id INTEGER REFERENCES master_items(id),
    qty INTEGER,
    category_id INTEGER,
    uom VARCHAR(50)
);

CREATE INDEX idx_stationery_request_items_deleted_at ON stationery_request_items(deleted_at);
CREATE INDEX idx_stationery_request_items_request_id ON stationery_request_items(request_id);
CREATE INDEX idx_stationery_request_items_item_id ON stationery_request_items(item_id);

-- Purchases Table
CREATE TABLE purchases (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
    date DATE,
    vendor_id INTEGER REFERENCES vendors(id),
    vendor_name VARCHAR(255),
    item_id INTEGER REFERENCES master_items(id),
    item_name VARCHAR(255),
    qty INTEGER,
    unit_price DECIMAL(15, 2),
    total_price DECIMAL(15, 2),
    status VARCHAR(20) DEFAULT 'Pending',
    attachment_url VARCHAR(500)
);

CREATE INDEX idx_purchases_deleted_at ON purchases(deleted_at);
CREATE INDEX idx_purchases_vendor_id ON purchases(vendor_id);
CREATE INDEX idx_purchases_item_id ON purchases(item_id);

-- ============================================
-- 7. TIMESHEET TABLE
-- ============================================

-- Timesheets Table
CREATE TABLE timesheets (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
    employee_id INTEGER REFERENCES users(id),
    location VARCHAR(255),
    area VARCHAR(255),
    date DATE,
    shift VARCHAR(50),
    clock_in TIMESTAMP,
    clock_out TIMESTAMP,
    status VARCHAR(50) -- Tepat Waktu, Terlambat, Absen
);

CREATE INDEX idx_timesheets_deleted_at ON timesheets(deleted_at);
CREATE INDEX idx_timesheets_employee_id ON timesheets(employee_id);

-- ============================================
-- 8. MASTER DATA TABLES
-- ============================================

-- Master Approvals Table
CREATE TABLE master_approvals (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
    module VARCHAR(100) NOT NULL, -- Service, TaxKir, Mutation, etc.
    branch VARCHAR(100)
);

CREATE INDEX idx_master_approvals_deleted_at ON master_approvals(deleted_at);

-- Approval Tiers Table
CREATE TABLE approval_tiers (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
    master_approval_id INTEGER REFERENCES master_approvals(id),
    level INTEGER,
    type VARCHAR(50), -- Role, User
    value VARCHAR(255), -- Role name or User ID
    sla INTEGER -- SLA in hours
);

CREATE INDEX idx_approval_tiers_deleted_at ON approval_tiers(deleted_at);
CREATE INDEX idx_approval_tiers_master_approval_id ON approval_tiers(master_approval_id);

-- General Masters Table (Dynamic Dropdown Data)
CREATE TABLE general_masters (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
    category VARCHAR(100) NOT NULL, -- PPN, BRAND, COLOR, VEHICLE_TYPE, etc.
    name VARCHAR(255) NOT NULL,
    code VARCHAR(50),
    description TEXT,
    parent_id INTEGER REFERENCES general_masters(id), -- For hierarchical data
    sort_order INTEGER DEFAULT 0,
    value VARCHAR(255), -- Additional value (e.g., percentage for PPN)
    metadata TEXT, -- JSON string for extra flexible data
    is_active BOOLEAN DEFAULT TRUE,
    is_default BOOLEAN DEFAULT FALSE
);

CREATE INDEX idx_general_masters_deleted_at ON general_masters(deleted_at);
CREATE INDEX idx_general_masters_category ON general_masters(category);
CREATE INDEX idx_general_masters_code ON general_masters(code);
CREATE INDEX idx_general_masters_parent_id ON general_masters(parent_id);
CREATE INDEX idx_general_masters_is_active ON general_masters(is_active);

-- Master Categories Table
CREATE TABLE master_categories (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
    code VARCHAR(50) UNIQUE NOT NULL, -- PPN, BRAND, COLOR, etc.
    name VARCHAR(255) NOT NULL, -- Display name
    description TEXT,
    module VARCHAR(100), -- Which module uses this
    is_editable BOOLEAN DEFAULT TRUE,
    is_active BOOLEAN DEFAULT TRUE
);

CREATE INDEX idx_master_categories_deleted_at ON master_categories(deleted_at);
CREATE INDEX idx_master_categories_code ON master_categories(code);

-- ============================================
-- 9. SAMPLE DATA FOR GENERAL MASTERS
-- ============================================

-- PPN Categories
INSERT INTO general_masters (category, name, code, value, is_active, is_default) VALUES
('PPN', 'PPN 11%', 'PPN11', '11', TRUE, TRUE),
('PPN', 'PPN 0%', 'PPN0', '0', TRUE, FALSE),
('PPN', 'Non PPN', 'NONPPN', '0', TRUE, FALSE);

-- Vehicle Brands
INSERT INTO general_masters (category, name, code, is_active) VALUES
('BRAND', 'Toyota', 'TOYOTA', TRUE),
('BRAND', 'Honda', 'HONDA', TRUE),
('BRAND', 'Mitsubishi', 'MITSUBISHI', TRUE),
('BRAND', 'Suzuki', 'SUZUKI', TRUE),
('BRAND', 'Daihatsu', 'DAIHATSU', TRUE),
('BRAND', 'Isuzu', 'ISUZU', TRUE),
('BRAND', 'Hino', 'HINO', TRUE);

-- Vehicle Types
INSERT INTO general_masters (category, name, code, is_active) VALUES
('VEHICLE_TYPE', 'Sedan', 'SEDAN', TRUE),
('VEHICLE_TYPE', 'SUV', 'SUV', TRUE),
('VEHICLE_TYPE', 'MPV', 'MPV', TRUE),
('VEHICLE_TYPE', 'Pick Up', 'PICKUP', TRUE),
('VEHICLE_TYPE', 'Truck', 'TRUCK', TRUE),
('VEHICLE_TYPE', 'Bus', 'BUS', TRUE),
('VEHICLE_TYPE', 'Motor', 'MOTOR', TRUE);

-- Colors
INSERT INTO general_masters (category, name, code, is_active) VALUES
('COLOR', 'Putih', 'WHITE', TRUE),
('COLOR', 'Hitam', 'BLACK', TRUE),
('COLOR', 'Silver', 'SILVER', TRUE),
('COLOR', 'Merah', 'RED', TRUE),
('COLOR', 'Biru', 'BLUE', TRUE),
('COLOR', 'Abu-abu', 'GRAY', TRUE);

-- Building Types
INSERT INTO general_masters (category, name, code, is_active) VALUES
('BUILDING_TYPE', 'Showroom', 'SHOWROOM', TRUE),
('BUILDING_TYPE', 'Workshop', 'WORKSHOP', TRUE),
('BUILDING_TYPE', 'Warehouse', 'WAREHOUSE', TRUE),
('BUILDING_TYPE', 'Office', 'OFFICE', TRUE),
('BUILDING_TYPE', 'Branch', 'BRANCH', TRUE);

-- Asset Categories
INSERT INTO general_masters (category, name, code, is_active) VALUES
('ASSET_CATEGORY', 'Human Capital', 'HC', TRUE),
('ASSET_CATEGORY', 'Information Technology', 'IT', TRUE),
('ASSET_CATEGORY', 'Customer Service', 'CS', TRUE);

-- Channels
INSERT INTO general_masters (category, name, code, is_active) VALUES
('CHANNEL', 'Retail', 'RETAIL', TRUE),
('CHANNEL', 'Fleet', 'FLEET', TRUE),
('CHANNEL', 'Corporate', 'CORPORATE', TRUE);

-- Departments
INSERT INTO general_masters (category, name, code, is_active) VALUES
('DEPARTMENT', 'Sales', 'SALES', TRUE),
('DEPARTMENT', 'Service', 'SERVICE', TRUE),
('DEPARTMENT', 'Finance', 'FINANCE', TRUE),
('DEPARTMENT', 'HR', 'HR', TRUE),
('DEPARTMENT', 'IT', 'IT', TRUE),
('DEPARTMENT', 'GA', 'GA', TRUE);

-- UOM (Unit of Measure)
INSERT INTO general_masters (category, name, code, is_active) VALUES
('UOM', 'Pcs', 'PCS', TRUE),
('UOM', 'Box', 'BOX', TRUE),
('UOM', 'Rim', 'RIM', TRUE),
('UOM', 'Pack', 'PACK', TRUE),
('UOM', 'Unit', 'UNIT', TRUE),
('UOM', 'Set', 'SET', TRUE),
('UOM', 'Lusin', 'LUSIN', TRUE);

-- Vendor Categories
INSERT INTO general_masters (category, name, code, is_active) VALUES
('VENDOR_CATEGORY', 'Bengkel', 'BENGKEL', TRUE),
('VENDOR_CATEGORY', 'Asuransi', 'ASURANSI', TRUE),
('VENDOR_CATEGORY', 'Supplier ATK', 'SUPPLIER_ATK', TRUE),
('VENDOR_CATEGORY', 'Supplier ARK', 'SUPPLIER_ARK', TRUE),
('VENDOR_CATEGORY', 'Kontraktor', 'KONTRAKTOR', TRUE),
('VENDOR_CATEGORY', 'Maintenance', 'MAINTENANCE', TRUE);

-- Master Categories
INSERT INTO master_categories (code, name, description, module, is_editable, is_active) VALUES
('PPN', 'Pajak Pertambahan Nilai', 'Kategori PPN untuk transaksi', 'All', TRUE, TRUE),
('BRAND', 'Merek Kendaraan', 'Daftar merek kendaraan', 'Vehicle', TRUE, TRUE),
('VEHICLE_TYPE', 'Tipe Kendaraan', 'Daftar tipe kendaraan', 'Vehicle', TRUE, TRUE),
('COLOR', 'Warna', 'Daftar warna', 'All', TRUE, TRUE),
('BUILDING_TYPE', 'Tipe Gedung', 'Daftar tipe gedung', 'Building', TRUE, TRUE),
('ASSET_CATEGORY', 'Kategori Aset', 'Kategori aset umum', 'GeneralAsset', TRUE, TRUE),
('CHANNEL', 'Channel', 'Channel bisnis', 'All', TRUE, TRUE),
('DEPARTMENT', 'Department', 'Daftar department', 'All', TRUE, TRUE),
('UOM', 'Unit of Measure', 'Satuan ukuran', 'Stationery', TRUE, TRUE),
('VENDOR_CATEGORY', 'Kategori Vendor', 'Kategori vendor/supplier', 'Vendor', TRUE, TRUE);

-- ============================================
-- END OF SCHEMA
-- ============================================
