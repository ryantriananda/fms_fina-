
// Shared/General Types
export interface GeneralMasterItem {
  id: string | number;
  name: string;
}

// User & Employee
export interface UserRecord {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  phone?: string;
  email?: string;
  department?: string;
  location?: string;
  status?: 'Active' | 'Inactive';
  lastActive?: string;
  joinDate?: string;
  employeeId?: string;
  permissions?: string[];
}

// Vendor
export interface VendorRecord {
  id: string | number;
  vendorName: string;
  vendorCode: string;
  type: 'Goods' | 'Service' | 'Both';
  category: string;
  email: string;
  phone: string;
  address: string;
  status: 'Active' | 'Inactive' | 'Blacklist';
  picName: string;
  rating?: number;
}

export interface MasterVendorRecord {
  id: string | number;
  nama: string;
  merek?: string;
  alamat?: string;
  noTelp?: string;
  tipe?: string;
  cabang?: string;
  aktif?: boolean;
  // Standardizing fields similar to VendorRecord for compatibility or specific master table usage
  vendorName?: string;
  vendorCode?: string;
  type?: string;
  category?: string;
  email?: string;
  phone?: string;
  address?: string;
  status?: string;
  picName?: string;
}

// ATK / ARK / Master Items
export interface MasterItem {
  id: string | number;
  category: string;
  itemName: string;
  itemCode: string;
  uom: string;
  remainingStock: number;
  minimumStock: number;
  maximumStock: number;
  requestedStock: number;
  lastPurchasePrice: string;
  averagePrice: string;
  purchaseDate: string;
  imageUrl?: string;
}

export interface PurchaseRecord {
  id: string;
  date: string;
  vendorName: string;
  qty: number;
  unitPrice: string;
  totalPrice: string;
  status: string;
  attachmentUrl?: string;
}

// Stationery Request (ATK/ARK Request)
export interface AssetRecord {
  id: string | number;
  transactionNumber?: string;
  employee: {
    name: string;
    role: string;
    avatar?: string;
    phone?: string;
  };
  category: string;
  itemName: string;
  itemDescription?: string;
  itemCode?: string;
  qty: number;
  date: string;
  remainingStock?: number;
  status: string;
}

export interface StationeryRequestItem {
  itemId: string;
  qty: string;
  categoryId: string;
  uom: string;
}

export interface StationeryRequestRecord {
  id?: string;
  type: string; // DAILY REQUEST, EVENT REQUEST
  deliveryType: string;
  location: string;
  date: string;
  remarks?: string;
  items?: StationeryRequestItem[];
}

// Vehicles
export interface VehicleRecord {
  id: number | string;
  noPolisi: string;
  nama: string;
  merek: string;
  tipeKendaraan: string;
  model: string;
  tahunPembuatan: string;
  warna: string;
  isiSilinder: string;
  noRangka: string;
  noMesin: string;
  noBpkb: string;
  keteranganBpkb?: string;
  masaBerlaku1: string; // STNK 1th
  masaBerlaku5: string; // STNK 5th
  masaBerlakuKir: string;
  tglBeli: string;
  hargaBeli: string;
  noPolisAsuransi: string;
  jangkaPertanggungan: string;
  channel: string;
  cabang: string;
  pengguna: string;
  status: string;
  ownership: 'Milik Modena' | 'Sewa';
  approvalStatus: string;
  // Depreciation
  depreciationMethod?: string;
  usefulLife?: number;
  residualValue?: string;
  // Photos
  stnkUrl?: string;
  kirUrl?: string;
  photoFront?: string;
  photoRear?: string;
  photoRight?: string;
  photoLeft?: string;
}

export interface VehicleContractRecord {
  id: string;
  noKontrak: string;
  noPolisi: string;
  aset: string; // description
  vendor: string;
  tglMulai: string;
  tglBerakhir: string;
  biayaSewa: string;
  approvalStatus: string;
  status: string;
  channel?: string;
  cabang?: string;
  ownership?: string;
  // Details for modal
  merek?: string;
  tipeKendaraan?: string;
  model?: string;
  tahunPembuatan?: string;
  warna?: string;
  isiSilinder?: string;
  penggunaUtama?: string;
  // Docs
  attachmentUrl?: string;
  stnkUrl?: string;
  kirUrl?: string;
  photoFront?: string;
  photoRear?: string;
  photoRight?: string;
  photoLeft?: string;
}

export interface VehicleReminderRecord {
  id: string;
  noPolisi: string;
  vehicleName: string;
  type: string; // STNK 1 Tahunan, KIR, etc.
  expiryDate: string;
  branch: string;
  status: 'Safe' | 'Warning' | 'Critical' | 'Expired';
}

export interface TaxKirRecord {
  id: string;
  noPolisi: string;
  aset?: string;
  tglRequest: string;
  jenis: string; // Pajak STNK / KIR
  channel: string;
  cabang: string;
  status: string;
  statusApproval: string;
  jatuhTempo?: string;
  estimasiBiaya?: string;
  targetSelesai?: string;
  jenisPembayaran?: string;
  attachmentUrl?: string;
}

// Service / Maintenance (Vehicle)
export interface SparePart {
  name: string;
  qty: number;
  price: string;
  imageUrl?: string; 
  imageBefore?: string; 
  imageAfter?: string; 
}

export interface ServiceRecord {
  id: string;
  noPolisi: string;
  aset?: string;
  tglRequest: string;
  channel: string;
  cabang: string;
  status: string;
  statusApproval: string;
  vendor?: string;
  kmKendaraan?: string;
  masalah?: string;
  jenisServis?: string;
  spareParts?: SparePart[];
  estimasiBiaya?: string;
  technician?: string;
  photoBefore?: string;
  photoAfter?: string;
}

// Buildings
export interface BuildingRecord {
  id: string;
  name: string;
  assetNo: string;
  type: string;
  location: string;
  address: string;
  status: string;
  ownership: 'Own' | 'Rent';
  rentCost: string;
  totalMaintenanceCost: string;
  utilityCost: string;
  startDate?: string;
  endDate?: string;
  // Details for Modal
  city?: string;
  district?: string;
  province?: string;
  distanceToDealer?: string;
  roadCondition?: string;
  electricityPower?: string;
  waterSource?: string;
  phoneLineCount?: string;
  landArea?: string;
  buildingArea?: string;
  frontYardArea?: string;
  totalFloors?: string;
  parkingCapacity?: string;
  buildingAge?: string;
  fenceCondition?: string;
  gateCondition?: string;
  securityFeatures?: string[];
  structureChecklist?: {
    tiang: string[];
    atap: string[];
    dinding: string[];
    lantai: string[];
    pintu: string[];
    jendela: string[];
    others: string[];
  };
  locationContext?: {
    right: string;
    left: string;
    front: string;
    back: string;
    nearIndustry: boolean;
    operationalHours: string;
  };
  environmentConditions?: string[];
  renovationNeeded?: boolean;
  renovationCostEstimate?: string;
  renovationTimeEstimate?: string;
  renovationDetailsObj?: {
    costSharing: string;
    gracePeriod: string;
    items: {
      partition: boolean;
      paint: boolean;
      roof: string;
      lights: boolean;
      other: string;
    }
  };
  taxPPH?: string;
  notaryFee?: string;
  purchasePrice?: string;
  ownerName?: string;
  ownerPhone?: string;
  ownerAddress?: string;
  documentsAvailable?: string[];
  businessNotes?: {
    deliveryTime: string;
    dealersCount: string;
    staffComposition: string;
    margin: string;
    competitorPareto: string;
  };
  proposals?: BuildingProposal[];
  workflow?: WorkflowStep[];
  floorPlanImage?: string;
}

export interface BuildingProposal {
  id: string;
  name: string;
  address: {
    jl: string;
    kota: string;
    kabupaten: string;
    propinsi: string;
  };
  rentPrice?: string;
  leaseNature?: string;
  floors?: { ground: string; f1: string; f2: string; f3: string; f4: string };
  owner?: { name: string; address: string; phone: string };
  surveySummary?: { pros: string; cons: string };
  securityFeatures?: string[];
  structureChecklist?: BuildingRecord['structureChecklist'];
  renovationDetailsObj?: BuildingRecord['renovationDetailsObj'];
  locationContext?: BuildingRecord['locationContext'];
  businessNotes?: BuildingRecord['businessNotes'];
  documents?: string[];
  environmentConditions?: string[];
  distanceToDealer?: string;
  roadCondition?: string;
  electricity?: string;
  water?: string;
  phoneLines?: string;
  telephoneDetails?: { canAdd: boolean; costPerLine: string; borneBy: string };
  landArea?: string;
  buildingArea?: string;
  frontYardArea?: string;
  totalFloors?: string;
  parkingCapacity?: string;
  buildingAge?: string;
  fenceCondition?: string;
  gateCondition?: string;
  renovationNeeded?: boolean;
  renovationCostEstimate?: string;
  renovationTimeEstimate?: string;
  leasePeriod?: string;
  taxPPH?: string;
  notaryFee?: string;
  previousRentPrice?: string;
}

export interface WorkflowStep {
  role: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  date?: string;
  approver?: string;
  comment?: string;
}

// Building Assets
export interface BuildingAssetRecord {
  id: string;
  assetName: string;
  assetCode: string;
  assetType: string;
  buildingName: string;
  floor: string;
  roomName: string;
  status: string; // Condition
  approvalStatus: string;
  maintenanceFrequency: string;
  brand: string;
  purchaseDate: string;
  // details
  ownership?: 'Own' | 'Rent';
  purchasePrice?: string;
  pic?: string;
  attachmentUrl?: string; // For photo
  proposals?: MaintenanceProposal[];
}

export interface MaintenanceProposal {
  id: string;
  vendorName: string;
  proposalName: string;
  estimatedCost: string;
  status: 'Pending' | 'Reviewing' | 'Approved' | 'Rejected';
  submissionDate: string;
  // extended fields for modal
  unitPhoto?: string;
  proposalDoc?: string;
}

// Building Maintenance
export interface BuildingMaintenanceRecord {
  id: string;
  assetId: string;
  assetName: string;
  buildingLocation: string; // derived
  requestDate: string;
  completionDate?: string;
  maintenanceType: 'Preventive' | 'Corrective' | 'Emergency';
  cost: string;
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Pending';
  approvalStatus: string;
  description: string;
  vendor?: string;
  technician?: string;
  evidenceBefore?: string;
  evidenceAfter?: string;
  rating?: number;
}

export interface MaintenanceScheduleRecord {
  id: string;
  assetId: string;
  assetName: string;
  assetCode: string;
  location: string;
  category: string;
  frequency: 'Monthly' | 'Quarterly' | 'Yearly';
  lastMaintenanceDate: string;
  nextMaintenanceDate: string;
  status: 'Safe' | 'Warning' | 'Overdue';
  vendor?: string;
}

// General Asset
export interface GeneralAssetRecord {
  id: string;
  assetNumber: string; // or assetCode
  assetCode?: string; // sometimes used interchangeably
  assetCategory: string;
  type: string; // or assetName
  assetName?: string;
  ownership: 'Own' | 'Rent';
  assetLocation: string;
  subLocation: string;
  department: string;
  channel: string;
  status: string;
  approvalStatus: string;
  purchasePrice: string;
  purchaseDate: string;
  brand?: string;
  address?: string;
  modelNumber?: string;
  sourceCategory?: 'Asset HC' | 'Asset IT' | 'Customer Service' | 'General Asset';
  buildingName?: string; // alias for assetLocation in some contexts
  floor?: string;
  roomName?: string;
  pic?: string;
}

// Mutations & Sales
export interface MutationRecord {
  id: string;
  assetType: 'VEHICLE' | 'GENERAL_ASSET';
  
  // Vehicle specific
  noPolisi?: string;
  
  // General Asset specific
  assetNumber?: string;
  assetName?: string;
  
  cabangAset: string;
  tglPermintaan: string;
  tipeMutasi: 'Permanent' | 'Temporary';
  
  lokasiAsal: string;
  lokasiTujuan: string;
  
  status: string; // Draft, Pending, Approved, etc.
  statusApproval: string;
  
  picBefore?: string;
  picAfter?: string;
  
  // Vehicle details
  biayaMutasi?: string;
  checklistCondition?: string[];
  checklistNotes?: Record<string, string>;
  
  // Photos
  photoFront?: string;
  photoRear?: string;
  photoRight?: string;
  photoLeft?: string;
  photoInterior?: string;
  documentStnk?: string;
}

export interface SalesRecord {
  id: string;
  assetType: 'VEHICLE' | 'GENERAL_ASSET';
  
  noPolisi?: string;
  assetNumber?: string;
  assetName?: string;
  
  tglRequest: string;
  channel: string;
  cabang: string;
  
  status: string; // Open Bidding, Sold, Scrap
  statusApproval: string;
  
  hargaTertinggi: string;
  hargaPembuka: string;
  
  bids?: BidRecord[];
}

export interface BidRecord {
  id: string;
  amount: string;
  bidderName: string;
  bidderRole: string;
  bidderEmail: string;
  bidderPhone: string;
  bidderKtp: string;
  bidderAvatar: string;
  timestamp: string;
}

export interface BidderRegistration {
  name: string;
  ktp: string;
  phone: string;
  email: string;
  agreedToTerms: boolean;
}

// Utility
export interface UtilityRecord {
  id: string;
  period: string;
  date: string;
  location: string;
  type: string; // Listrik, Air, etc.
  meterStart: number;
  meterEnd: number;
  usage: number;
  unit: string;
  cost: string;
  status: 'Paid' | 'Unpaid' | 'Pending Review';
  attachmentUrl?: string;
}

// Compliance / Reminders
export interface ReminderRecord {
  id: string;
  documentName: string;
  buildingName: string;
  assetNo: string;
  expiryDate: string;
  status: 'Safe' | 'Warning' | 'Urgent' | 'Expired';
  daysRemaining: number;
  category: 'Legal' | 'Permit' | 'Insurance' | 'Lease';
  source: 'Manual' | 'System';
}

// Insurance
export interface InsuranceRecord {
  id: string;
  policyNumber: string;
  category: 'Vehicle' | 'Building' | 'Mixed';
  provider: string;
  type: string; // All Risk, TLO, etc.
  startDate: string;
  endDate: string;
  premium: string;
  sumInsured: string;
  status: 'Active' | 'Expiring' | 'Expired';
  deductible?: string;
  assetName?: string; // if single asset
  claims?: InsuranceClaim[];
  assets?: LinkedAsset[]; // if fleet
}

export interface LinkedAsset {
  id: string;
  name: string;
  type: 'Vehicle' | 'Building';
  identifier: string; // No Polisi or Asset No
}

export interface InsuranceClaim {
  id: string;
  incidentDate: string;
  description: string;
  claimAmount: string;
  coveredAmount?: string;
  status: 'Submitted' | 'Survey' | 'Approved' | 'Paid' | 'Rejected';
  remarks?: string;
}

// Insurance Provider
export interface InsuranceProviderRecord {
  id: number;
  name: string;
  contactPerson: string;
  phone: string;
  email: string;
  address: string;
  rating: number;
}

// Facility
export interface ModenaPodRecord {
  id: number;
  lantai: string;
  jenisKamar: string;
  nomorKamar: string;
  namaPenghuni: string;
  statusLokerBarang: string;
  statusLokerPantry: string;
  jadwalLaundry: string;
  keterangan: string;
  status?: 'Occupied' | 'Available'; // For MasterPodRecord compatibility if needed, or derived
}

export interface MasterPodRecord {
  id: number;
  lantai: string;
  jenisKamar: string;
  nomorKamar: string;
  status: 'Occupied' | 'Available';
  occupiedBy?: string;
}

export interface PodRequestRecord {
  id: string;
  requesterName: string;
  requesterRole?: string;
  department: string;
  requestDate: string;
  checkInDate?: string;
  checkOutDate?: string;
  roomType: string;
  floorPreference?: string;
  reason?: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

export interface LockerRecord {
  id: number;
  lockerNumber: string;
  floor: string;
  area?: string;
  status: 'Terisi' | 'Kosong' | 'Kunci Hilang';
  assignedTo?: string;
  department?: string;
  spareKeyStatus: 'Ada' | 'Tidak Ada';
  lastAuditDate: string;
  remarks?: string;
}

export interface MasterLockerRecord {
  id: number;
  lockerNumber: string;
  floor: string;
  type: 'Goods' | 'Pantry';
  status: 'Active' | 'Inactive';
  remarks?: string;
}

export interface LockerRequestRecord {
  id: string;
  requesterName: string;
  requesterRole?: string;
  department: string;
  requestDate: string;
  reason: string;
  preferredLocation: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

export interface StockOpnameRecord {
  id: string;
  date: string;
  location: string;
  itemCategory: string;
  totalItems: number;
  matchedItems: number;
  discrepancyItems: number;
  status: 'Draft' | 'Review' | 'Completed';
  auditor?: string;
}

// Others
export interface DeliveryLocationRecord {
  id: number;
  name: string;
  address: string;
  type: string;
}

export interface LogBookRecord {
  id: number;
  tanggalKunjungan: string;
  jamDatang: string;
  jamPulang?: string;
  lokasiModena: string;
  kategoriTamu: string;
  namaTamu: string;
  wanita: number;
  lakiLaki: number;
  anakAnak: number;
  note?: string;
}

export interface TimesheetRecord {
  id: number;
  date: string;
  employee: {
    name: string;
    role: string;
    avatar?: string;
    phone?: string;
  };
  location: string;
  area: string;
  shift: string;
  clockIn: string;
  clockOut?: string;
  status: 'Tepat Waktu' | 'Terlambat' | 'Absen';
  tasks?: string[];
  photos?: string[];
}

// Approval Master
export interface ApprovalTier {
  level: number;
  type: 'Role' | 'User';
  value: string;
  sla: number;
}

export interface MasterApprovalRecord {
  id: string;
  module: string;
  branch: string;
  tiers: ApprovalTier[];
  updatedAt: string;
}

// Legacy export for backward compatibility if any
export interface ContractRecord extends VehicleContractRecord {}
