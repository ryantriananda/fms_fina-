
// ... existing imports ...
import { 
    AssetRecord, MasterItem, VehicleRecord, TaxKirRecord, MasterVendorRecord, 
    DeliveryLocationRecord, LogBookRecord, BuildingRecord, ReminderRecord, 
    VehicleContractRecord, GeneralMasterItem, UserRecord, BuildingAssetRecord, 
    BuildingMaintenanceRecord, UtilityRecord, GeneralAssetRecord, VendorRecord, 
    TimesheetRecord, ServiceRecord, MutationRecord, SalesRecord, InsuranceRecord, 
    MaintenanceScheduleRecord, VehicleReminderRecord, LockerRecord, ModenaPodRecord, 
    StockOpnameRecord, LockerRequestRecord, PodRequestRecord, MasterPodRecord, 
    MasterLockerRecord, InsuranceProviderRecord 
} from './types';

// ... existing constants ...

export const MOCK_DELIVERY_LOCATIONS: DeliveryLocationRecord[] = [
    { id: 1, name: 'PICKUP HO', type: 'Internal', status: 'Active', address: 'Jl. Prof. Dr. Satrio C4 No. 13' },
    { id: 2, name: 'PICKUP WAREHOUSE CIKUPA', type: 'Internal', status: 'Active', address: 'Kawasan Industri Cikupa Mas' },
    { id: 3, name: 'VENDOR DELIVERY', type: 'External', status: 'Active', address: '-' },
    { id: 4, name: 'BRANCH SURABAYA', type: 'Internal', status: 'Inactive', address: 'Jl. Mayjen Sungkono' }
];

// ... remaining constants ...
// ... existing constants ...
export const MOCK_UOM_DATA: GeneralMasterItem[] = [
    { id: 1, name: 'Pcs' }, { id: 2, name: 'Box' }, { id: 3, name: 'Pack' }, { id: 4, name: 'Rim' }, { id: 5, name: 'Unit' }
];

export const MOCK_BRAND_DATA: GeneralMasterItem[] = [
    { id: 1, name: 'Toyota' }, { id: 2, name: 'Honda' }, { id: 3, name: 'Suzuki' }, { id: 4, name: 'Daihatsu' }, { id: 5, name: 'Mitsubishi' }, { id: 6, name: 'Hyundai' }, { id: 7, name: 'Wuling' }
];

export const MOCK_BRAND_TYPE_DATA: GeneralMasterItem[] = [
    { id: 1, name: 'Japanese' }, { id: 2, name: 'European' }, { id: 3, name: 'American' }, { id: 4, name: 'Chinese' }, { id: 5, name: 'Korean' }
];

export const MOCK_COLOR_DATA: GeneralMasterItem[] = [
    { id: 1, name: 'Hitam' }, { id: 2, name: 'Putih' }, { id: 3, name: 'Silver' }, { id: 4, name: 'Abu-abu' }, { id: 5, name: 'Merah' }, { id: 6, name: 'Biru' }
];

export const MOCK_PPN_DATA: GeneralMasterItem[] = [
    { id: 1, name: '11%' }, { id: 2, name: '10%' }, { id: 3, name: '0% (Bebas PPN)' }
];

export const MOCK_VEHICLE_MODEL_DATA: GeneralMasterItem[] = [
    { id: 1, name: 'Avanza' }, { id: 2, name: 'Innova' }, { id: 3, name: 'Xenia' }, { id: 4, name: 'Gran Max' }, { id: 5, name: 'Hiace' }
];

export const MOCK_BUILDING_COMPONENT_DATA: GeneralMasterItem[] = [
    { id: 1, name: 'Atap' }, { id: 2, name: 'Dinding' }, { id: 3, name: 'Lantai' }, { id: 4, name: 'Pintu' }, { id: 5, name: 'Jendela' }, { id: 6, name: 'Pagar' }
];

export const MOCK_DOC_TYPE_DATA: GeneralMasterItem[] = [
    { id: 1, name: 'STNK' }, { id: 2, name: 'BPKB' }, { id: 3, name: 'KIR' }, { id: 4, name: 'SIPA' }, { id: 5, name: 'Izin Reklame' }, { id: 6, name: 'PBB' }
];

export const MOCK_UTILITY_TYPE_DATA: GeneralMasterItem[] = [
    { id: 1, name: 'Listrik (PLN)' }, { id: 2, name: 'Air (PDAM)' }, { id: 3, name: 'Internet (Wifi)' }, { id: 4, name: 'Gas' }, { id: 5, name: 'TV Kabel' }
];

export const MOCK_OPERATOR_DATA: GeneralMasterItem[] = [
    { id: 1, name: 'Telkomsel' }, { id: 2, name: 'Indosat' }, { id: 3, name: 'XL Axiata' }, { id: 4, name: 'Biznet' }, { id: 5, name: 'Indihome' }
];

export const MOCK_ASSET_TYPE_DATA: GeneralMasterItem[] = [
    { id: 1, name: 'Laptop' }, { id: 2, name: 'PC Desktop' }, { id: 3, name: 'Furniture' }, { id: 4, name: 'AC' }, { id: 5, name: 'Generator' }, { id: 6, name: 'Vehicle' }
];

export const MOCK_DEPARTMENT_DATA: GeneralMasterItem[] = [
    { id: 1, name: 'Human Capital' }, { id: 2, name: 'General Affair' }, { id: 3, name: 'Finance' }, { id: 4, name: 'Sales' }, { id: 5, name: 'Marketing' }, { id: 6, name: 'IT' }, { id: 7, name: 'Supply Chain' }
];

export const MOCK_LOCATION_DATA: GeneralMasterItem[] = [
    { id: 1, name: 'Head Office Satrio' }, { id: 2, name: 'Showroom Kemang' }, { id: 3, name: 'Warehouse Cikupa' }, { id: 4, name: 'Branch Bandung' }, { id: 5, name: 'Branch Surabaya' }
];

export const MOCK_BUILDING_TYPE_DATA: GeneralMasterItem[] = [
    { id: 1, name: 'Office' }, { id: 2, name: 'Showroom' }, { id: 3, name: 'Warehouse' }, { id: 4, name: 'MHC (Modena Home Center)' }, { id: 5, name: 'Service Center' }
];

export const MOCK_COST_CENTER_DATA: GeneralMasterItem[] = [
    { id: 1, name: 'CC-HO-001 (General)' }, { id: 2, name: 'CC-MKT-002 (Marketing)' }, { id: 3, name: 'CC-SAL-003 (Sales)' }, { id: 4, name: 'CC-IT-004 (Technology)' }
];

export const MOCK_ASSET_CATEGORY_DATA: GeneralMasterItem[] = [
    { id: 1, name: 'Electronic' }, { id: 2, name: 'Vehicle' }, { id: 3, name: 'Furniture' }, { id: 4, name: 'Machinery' }, { id: 5, name: 'Building' }
];

export const MOCK_TAX_TYPE_DATA: GeneralMasterItem[] = [
    { id: 1, name: 'PPh 21' }, { id: 2, name: 'PPh 23' }, { id: 3, name: 'PPh 4 Ayat 2' }, { id: 4, name: 'PPN Masukan' }
];

export const MOCK_PAYMENT_TYPE_DATA: GeneralMasterItem[] = [
    { id: 1, name: 'Bank Transfer' }, { id: 2, name: 'Cash' }, { id: 3, name: 'Corporate Card' }, { id: 4, name: 'Petty Cash' }, { id: 5, name: 'Cheque' }
];

export const MOCK_SERVICE_TYPE_DATA: GeneralMasterItem[] = [
    { id: 1, name: 'Servis Berkala (Rutin)' }, { id: 2, name: 'Perbaikan Berat (Overhaul)' }, { id: 3, name: 'Ganti Oli' }, { id: 4, name: 'Tune Up' }, { id: 5, name: 'Body Repair' }
];

export const MOCK_MUTATION_STATUS_DATA: GeneralMasterItem[] = [
    { id: 1, name: 'Draft' }, { id: 2, name: 'Pending Approval' }, { id: 3, name: 'Approved' }, { id: 4, name: 'In Transit' }, { id: 5, name: 'Received' }, { id: 6, name: 'Rejected' }
];

export const MOCK_SALES_STATUS_DATA: GeneralMasterItem[] = [
    { id: 1, name: 'Open Bidding' }, { id: 2, name: 'Closed' }, { id: 3, name: 'Sold' }, { id: 4, name: 'Scrapped' }
];

export const MOCK_REQUEST_STATUS_DATA: GeneralMasterItem[] = [
    { id: 1, name: 'New' }, { id: 2, name: 'In Progress' }, { id: 3, name: 'Completed' }, { id: 4, name: 'Cancelled' }
];

export const MOCK_MUTATION_TYPE_DATA: GeneralMasterItem[] = [
    { id: 1, name: 'Permanent' }, { id: 2, name: 'Temporary (Pinjam Pakai)' }
];

export const MOCK_VENDOR_TYPE_DATA: GeneralMasterItem[] = [
    { id: 1, name: 'PT' }, { id: 2, name: 'CV' }, { id: 3, name: 'Perorangan' }, { id: 4, name: 'UD' }, { id: 5, name: 'Koperasi' }
];

export const MOCK_ROLE_DATA: GeneralMasterItem[] = [
    { id: 1, name: 'Super Admin' }, { id: 2, name: 'Admin GA' }, { id: 3, name: 'Branch Manager' }, { id: 4, name: 'Department Head' }, { id: 5, name: 'Staff' }, { id: 6, name: 'Viewer' }
];

export const MOCK_VEHICLE_TYPE_DATA: GeneralMasterItem[] = [
    { id: 1, name: 'MPV' }, { id: 2, name: 'SUV' }, { id: 3, name: 'Sedan' }, { id: 4, name: 'City Car' }, { id: 5, name: 'Pickup' }, { id: 6, name: 'Truck Box' }, { id: 7, name: 'Motorcycle' }
];

export const MOCK_GENERAL_MASTER_DATA: GeneralMasterItem[] = [
    { id: 1, name: 'Example Master Item 1' }, { id: 2, name: 'Example Master Item 2' }
];

export const MOCK_ATK_CATEGORY: GeneralMasterItem[] = [
    { id: 1, name: 'Kertas' }, { id: 2, name: 'Tinta' }, { id: 3, name: 'Alat Tulis' }, { id: 4, name: 'Amplop' }
];

export const MOCK_ARK_CATEGORY: GeneralMasterItem[] = [
    { id: 1, name: 'Pantry' }, { id: 2, name: 'Cleaning' }, { id: 3, name: 'Obat-obatan' }
];

// Vehicles
export const MOCK_VEHICLE_DATA: VehicleRecord[] = [
    {
        id: 1, noPolisi: 'B 1234 ABC', nama: 'Toyota Avanza 1.3 G', merek: 'Toyota', tipeKendaraan: 'MPV', model: 'G', tahunPembuatan: '2022', warna: 'Hitam',
        isiSilinder: '1300', noRangka: 'MHF123...', noMesin: '1TR...', noBpkb: 'K-123...', masaBerlaku1: '2025-01-01', masaBerlaku5: '2027-01-01',
        masaBerlakuKir: '2024-12-01', tglBeli: '2022-01-01', hargaBeli: '200000000', noPolisAsuransi: 'POL-001', jangkaPertanggungan: '2025-01-01',
        channel: 'Direct', cabang: 'Jakarta', pengguna: 'Staff A', status: 'Aktif', ownership: 'Milik Modena', approvalStatus: 'Approved'
    },
    {
        id: 2, noPolisi: 'B 5678 DEF', nama: 'Daihatsu Xenia 1.3 R', merek: 'Daihatsu', tipeKendaraan: 'MPV', model: 'R', tahunPembuatan: '2023', warna: 'Silver',
        isiSilinder: '1300', noRangka: 'DAI123...', noMesin: 'DAI...', noBpkb: 'K-456...', masaBerlaku1: '2025-06-01', masaBerlaku5: '2028-06-01',
        masaBerlakuKir: '2024-11-01', tglBeli: '2023-06-01', hargaBeli: '210000000', noPolisAsuransi: 'POL-002', jangkaPertanggungan: '2025-06-01',
        channel: 'Branch', cabang: 'Bandung', pengguna: 'Staff B', status: 'Aktif', ownership: 'Sewa', approvalStatus: 'Approved'
    }
];

export const MOCK_VEHICLE_CONTRACT_DATA: VehicleContractRecord[] = [
    {
        id: 'CTR-001', noKontrak: 'KTR/2024/001', noPolisi: 'B 5678 DEF', aset: 'Daihatsu Xenia', vendor: 'TRAC', tglMulai: '2024-01-01', tglBerakhir: '2025-01-01',
        biayaSewa: '5000000', approvalStatus: 'Approved', status: 'Active'
    }
];

export const MOCK_SERVICE_DATA: ServiceRecord[] = [
    {
        id: 'SRV-001', noPolisi: 'B 1234 ABC', tglRequest: '2024-03-01', channel: 'Direct', cabang: 'Jakarta', status: 'Completed', statusApproval: 'Approved',
        jenisServis: 'Servis Rutin', estimasiBiaya: '1500000'
    }
];

export const MOCK_TAX_KIR_DATA: TaxKirRecord[] = [
    {
        id: 'TAX-001', noPolisi: 'B 1234 ABC', tglRequest: '2024-02-01', jenis: 'Pajak STNK', channel: 'Direct', cabang: 'Jakarta', status: 'Selesai', statusApproval: 'Approved'
    }
];

export const MOCK_VEHICLE_REMINDER_DATA: VehicleReminderRecord[] = [
    { id: 'REM-001', noPolisi: 'B 1234 ABC', vehicleName: 'Toyota Avanza', type: 'STNK 1 Tahunan', expiryDate: '2024-05-01', branch: 'Jakarta', status: 'Safe' }
];

export const MOCK_MUTATION_DATA: MutationRecord[] = [
    {
        id: 'MUT-001', assetType: 'VEHICLE', noPolisi: 'B 1234 ABC', cabangAset: 'Jakarta', tglPermintaan: '2024-03-10', tipeMutasi: 'Permanent',
        lokasiAsal: 'Jakarta', lokasiTujuan: 'Bandung', status: 'Approved', statusApproval: 'Approved'
    }
];

export const MOCK_SALES_DATA: SalesRecord[] = [
    {
        id: 'SAL-001', assetType: 'VEHICLE', noPolisi: 'B 9999 XYZ', tglRequest: '2024-03-15', channel: 'Direct', cabang: 'Jakarta',
        status: 'Open Bidding', statusApproval: 'Approved', hargaTertinggi: '120000000', hargaPembuka: '100000000'
    }
];

// Buildings
export const MOCK_BUILDING_DATA: BuildingRecord[] = [
    {
        id: 'BLD-001', name: 'Head Office Satrio', assetNo: 'BLD-HO-001', type: 'Office', location: 'Jakarta', address: 'Jl. Prof. Dr. Satrio', status: 'Active',
        ownership: 'Own', rentCost: '0', totalMaintenanceCost: '50000000', utilityCost: '15000000',
        city: 'Jakarta Selatan', district: 'Setiabudi', province: 'DKI Jakarta'
    },
    {
        id: 'BLD-002', name: 'Showroom Kemang', assetNo: 'BLD-SR-002', type: 'Showroom', location: 'Jakarta', address: 'Jl. Kemang Raya', status: 'Active',
        ownership: 'Rent', rentCost: '200000000', totalMaintenanceCost: '20000000', utilityCost: '10000000',
        city: 'Jakarta Selatan', district: 'Mampang Prapatan', province: 'DKI Jakarta'
    }
];

export const MOCK_BRANCH_IMPROVEMENT_DATA: BuildingRecord[] = [
    { 
        id: 'REQ-IMP-001', name: 'Renovasi Showroom Kemang', assetNo: 'AST-BLD-006', type: 'Showroom', location: 'Jakarta', address: 'Jl. Kemang Raya No. 15', 
        status: 'PENDING APPROVAL', ownership: 'Rent', rentCost: '200000000', totalMaintenanceCost: '0', utilityCost: '0', startDate: '2024-06-01', endDate: '2029-06-01',
        renovationNeeded: true, renovationCostEstimate: '500000000'
    }
];

export const MOCK_UTILITY_DATA: UtilityRecord[] = [
    { id: 'UTIL-001', period: 'Maret 2024', date: '2024-03-25', location: 'Head Office Satrio', type: 'Listrik (PLN)', meterStart: 1000, meterEnd: 1500, usage: 500, unit: 'kWh', cost: '750000', status: 'Paid' }
];

export const MOCK_REMINDER_DATA: ReminderRecord[] = [
    { id: 'REM-DOC-001', documentName: 'SHGB Certificate', buildingName: 'Head Office Satrio', assetNo: 'BLD-HO-001', expiryDate: '2025-12-31', status: 'Safe', daysRemaining: 600, category: 'Legal', source: 'System' }
];

export const MOCK_BUILDING_ASSETS: BuildingAssetRecord[] = [
    { id: 'BA-001', assetName: 'AC Split 2PK', assetCode: 'AC-001', assetType: 'AC', buildingName: 'Head Office Satrio', floor: '1', roomName: 'Lobby', status: 'Good', approvalStatus: 'Approved', maintenanceFrequency: 'Quarterly', brand: 'Daikin', purchaseDate: '2023-01-01' }
];

export const MOCK_BUILDING_MAINTENANCE_DATA: BuildingMaintenanceRecord[] = [
    { id: 'MT-001', assetId: 'BA-001', assetName: 'AC Split 2PK', buildingLocation: 'Head Office - Lt 1', requestDate: '2024-03-10', maintenanceType: 'Preventive', cost: '150000', status: 'Completed', approvalStatus: 'Approved', description: 'Cuci AC Rutin' }
];

// General Assets
export const MOCK_GENERAL_ASSET_DATA: GeneralAssetRecord[] = [
    { id: 'GA-001', assetNumber: 'GA-IT-001', assetCategory: 'IT Asset', type: 'Laptop', ownership: 'Own', assetLocation: 'Jakarta', subLocation: 'IT Dept', department: 'IT', channel: 'Direct', status: 'Good', approvalStatus: 'Approved', purchasePrice: '15000000', purchaseDate: '2023-06-01' }
];

// Insurance
export const MOCK_INSURANCE_DATA: InsuranceRecord[] = [
    { id: 'INS-001', policyNumber: 'POL-VH-001', category: 'Vehicle', provider: 'AXA Mandiri', type: 'All Risk', startDate: '2024-01-01', endDate: '2025-01-01', premium: '5000000', sumInsured: '200000000', status: 'Active', assetName: 'Toyota Avanza B 1234 ABC' }
];

export const MOCK_INSURANCE_PROVIDERS: InsuranceProviderRecord[] = [
    { id: 1, name: 'AXA Mandiri', contactPerson: 'Budi', phone: '021-123456', email: 'claim@axa.com', address: 'Jakarta', rating: 5 }
];

// Facility
export const MOCK_POD_DATA: ModenaPodRecord[] = [
    { id: 1, lantai: 'Lt 2 Pria', jenisKamar: 'Single Bed', nomorKamar: '201', namaPenghuni: 'Andi', statusLokerBarang: 'Terpakai', statusLokerPantry: 'Terpakai', jadwalLaundry: 'Senin', keterangan: '', status: 'Occupied' }
];

export const MOCK_POD_REQUEST_DATA: PodRequestRecord[] = [
    { id: 'POD-REQ-001', requesterName: 'Budi', department: 'Sales', requestDate: '2024-03-20', checkInDate: '2024-04-01', checkOutDate: '2024-04-05', roomType: 'Single Bed', status: 'Pending' }
];

export const MOCK_LOCKER_DATA: LockerRecord[] = [
    { id: 1, lockerNumber: 'L-001', floor: 'Lantai 1', status: 'Terisi', assignedTo: 'Budi', department: 'Sales', spareKeyStatus: 'Ada', lastAuditDate: '2024-03-01' }
];

export const MOCK_LOCKER_REQUEST_DATA: LockerRequestRecord[] = [
    { id: 'LOC-REQ-001', requesterName: 'Siti', department: 'HR', requestDate: '2024-03-25', reason: 'Need locker', preferredLocation: 'Lantai 1', status: 'Pending' }
];

export const MOCK_STOCK_OPNAME_DATA: StockOpnameRecord[] = [
    { id: 'SO-001', date: '2024-03-01', location: 'Jakarta', itemCategory: 'ATK', totalItems: 100, matchedItems: 98, discrepancyItems: 2, status: 'Completed' }
];

// Consumables
export const MOCK_DATA: AssetRecord[] = [
    { id: 1, transactionNumber: 'TRX/ATK/001', employee: { name: 'User 1', role: 'Staff' }, category: 'ATK', itemName: 'Kertas A4', qty: 5, date: '2024-03-20', status: 'Approved' }
];

export const MOCK_ARK_DATA: AssetRecord[] = [
    { id: 1, transactionNumber: 'TRX/ARK/001', employee: { name: 'OB 1', role: 'Cleaning' }, category: 'ARK', itemName: 'Sabun Cuci', qty: 10, date: '2024-03-20', status: 'Approved' }
];

export const MOCK_MASTER_DATA: MasterItem[] = [
    { id: 1, category: 'Kertas', itemName: 'Kertas A4 70gr', itemCode: 'ATK-001', uom: 'Rim', remainingStock: 50, minimumStock: 10, maximumStock: 100, requestedStock: 0, lastPurchasePrice: '45000', averagePrice: '44000', purchaseDate: '2024-01-01' }
];

export const MOCK_MASTER_ARK_DATA: MasterItem[] = [
    { id: 1, category: 'Cleaning', itemName: 'Pembersih Lantai', itemCode: 'ARK-001', uom: 'Galon', remainingStock: 20, minimumStock: 5, maximumStock: 50, requestedStock: 0, lastPurchasePrice: '50000', averagePrice: '48000', purchaseDate: '2024-01-01' }
];

// Daily Ops
export const MOCK_LOGBOOK_DATA: LogBookRecord[] = [
    { id: 1, tanggalKunjungan: '2024-03-25', jamDatang: '09:00', jamPulang: '11:00', lokasiModena: 'HO', kategoriTamu: 'Visitor', namaTamu: 'Tamu A', wanita: 1, lakiLaki: 1, anakAnak: 0 }
];

export const MOCK_TIMESHEET_DATA: TimesheetRecord[] = [
    { id: 1, date: '2024-03-25', employee: { name: 'Cleaner 1', role: 'Cleaner' }, location: 'HO', area: 'Lobby', shift: 'Pagi', clockIn: '07:00', clockOut: '16:00', status: 'Tepat Waktu' }
];

// Administration
export const MOCK_VENDOR_DATA: VendorRecord[] = [
    { id: 1, vendorName: 'PT ATK Jaya', vendorCode: 'V-001', type: 'Goods', category: 'ATK', email: 'sales@atkjaya.com', phone: '021-555555', address: 'Jakarta', status: 'Active', picName: 'Joko' }
];

export const MOCK_USER_DATA: UserRecord[] = [
    { id: 'USR-001', name: 'Ibnu Faisal', role: 'Facility Manager', email: 'ibnu@modena.com', phone: '08111111', department: 'GA', status: 'Active', lastActive: 'Now' }
];
