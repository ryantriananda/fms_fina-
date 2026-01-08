import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { FilterBar } from './components/FilterBar';

// Pages
import { 
    DashboardPage, VehiclePage, BuildingPage, AssetPage, 
    ConsumablePage, FacilityPage, InsurancePage, AdminPage, LoginPage 
} from './pages';

// Modals - Vehicle
import { VehicleModal } from './components/VehicleModal';
import { VehicleContractModal } from './components/VehicleContractModal';
import { ServiceModal } from './components/ServiceModal';
import { TaxKirModal } from './components/TaxKirModal';
import { VehicleReminderModal } from './components/VehicleReminderModal';
import { MutationModal } from './components/MutationModal';
import { SalesModal } from './components/SalesModal';

// Modals - Building
import { BuildingModal } from './components/BuildingModal';
import { UtilityModal } from './components/UtilityModal';
import { ComplianceModal } from './components/ComplianceModal';
import { BuildingMaintenanceModal } from './components/BuildingMaintenanceModal';

// Modals - Asset
import { AssetGeneralModal } from './components/AssetGeneralModal';
import { MaintenanceScheduleModal } from './components/MaintenanceScheduleModal';

// Modals - Consumable
import { AddStockModal } from './components/AddStockModal';
import { MasterItemModal } from './components/MasterItemModal';
import { AddStockOpnameModal } from './components/AddStockOpnameModal';
import { DeliveryLocationModal } from './components/DeliveryLocationModal';
import { MasterRequestTypeModal } from './components/MasterRequestTypeModal';

// Modals - Facility
import { PodRequestModal } from './components/PodRequestModal';
import { MasterPodModal } from './components/MasterPodModal';
import { TenantPodModal } from './components/TenantPodModal';
import { LockerModal } from './components/LockerModal';
import { LockerRequestModal } from './components/LockerRequestModal';

// Modals - Insurance
import { InsuranceModal } from './components/InsuranceModal';
import { InsuranceClaimModal } from './components/InsuranceClaimModal';
import { InsuranceProviderModal } from './components/InsuranceProviderModal';

// Modals - Admin
import { LogBookModal } from './components/LogBookModal';
import { TimesheetModal } from './components/TimesheetModal';
import { VendorModal } from './components/VendorModal';
import { UserModal } from './components/UserModal';
import { MasterApprovalModal } from './components/MasterApprovalModal';
import { GeneralMasterModal } from './components/GeneralMasterModal';

// Other Modals
import { ImportDataModal } from './components/ImportDataModal';
import { WorkflowActionModal } from './components/WorkflowActionModal';

// Types
import { 
    AssetRecord, MasterItem, VehicleRecord, VehicleContractRecord, ServiceRecord, TaxKirRecord, 
    VehicleReminderRecord, MutationRecord, SalesRecord, BuildingRecord, UtilityRecord, ReminderRecord, 
    GeneralAssetRecord, BuildingMaintenanceRecord, MaintenanceScheduleRecord, InsuranceRecord, 
    InsuranceProviderRecord, PodRequestRecord, LockerRecord, LockerRequestRecord, 
    LogBookRecord, TimesheetRecord, VendorRecord, UserRecord, MasterApprovalRecord, 
    GeneralMasterItem, DeliveryLocationRecord, StockOpnameRecord, MasterPodRecord, TenantPodRecord,
    RequestTypeRecord
} from './types';

// Mock Data
import { 
    MOCK_DATA, MOCK_MASTER_DATA, MOCK_ARK_DATA, MOCK_MASTER_ARK_DATA,
    MOCK_VEHICLE_DATA, MOCK_VEHICLE_CONTRACT_DATA, MOCK_SERVICE_DATA, MOCK_TAX_KIR_DATA, 
    MOCK_VEHICLE_REMINDER_DATA, MOCK_MUTATION_DATA, MOCK_SALES_DATA,
    MOCK_BUILDING_DATA, MOCK_UTILITY_DATA, MOCK_REMINDER_DATA, MOCK_BUILDING_MAINTENANCE_DATA,
    MOCK_GENERAL_ASSET_DATA, MOCK_ASSET_MAINTENANCE_DATA,
    MOCK_INSURANCE_DATA, MOCK_INSURANCE_PROVIDERS,
    MOCK_POD_REQUEST_DATA, MOCK_LOCKER_DATA, MOCK_LOCKER_REQUEST_DATA,
    MOCK_STOCK_OPNAME_DATA, MOCK_LOGBOOK_DATA, MOCK_TIMESHEET_DATA, MOCK_VENDOR_DATA, 
    MOCK_USER_DATA, MOCK_MASTER_APPROVAL_DATA,
    MOCK_GENERAL_MASTER_DATA, MOCK_BRAND_DATA, MOCK_COLOR_DATA,
    MOCK_PPN_DATA, MOCK_BRAND_TYPE_DATA, MOCK_VEHICLE_MODEL_DATA, MOCK_BUILDING_COMPONENT_DATA,
    MOCK_DOC_TYPE_DATA, MOCK_UTILITY_TYPE_DATA, MOCK_OPERATOR_DATA, MOCK_ASSET_TYPE_DATA,
    MOCK_DEPARTMENT_DATA, MOCK_LOCATION_DATA, MOCK_UOM_DATA, MOCK_BUILDING_TYPE_DATA,
    MOCK_COST_CENTER_DATA, MOCK_ASSET_CATEGORY_DATA, MOCK_TAX_TYPE_DATA, MOCK_PAYMENT_TYPE_DATA,
    MOCK_SERVICE_TYPE_DATA, MOCK_MUTATION_STATUS_DATA, MOCK_SALES_STATUS_DATA, MOCK_REQUEST_STATUS_DATA,
    MOCK_MUTATION_TYPE_DATA, MOCK_VENDOR_TYPE_DATA, MOCK_ROLE_DATA, MOCK_VEHICLE_TYPE_DATA,
    MOCK_DELIVERY_LOCATIONS, MOCK_MASTER_POD_DATA, MOCK_TENANT_POD_DATA, MOCK_REQUEST_TYPES
} from './constants';

// Services
import { setAuthToken } from './services';

// Menu categories for routing
const VEHICLE_MENUS = ['Daftar Kendaraan', 'Kontrak Kendaraan', 'Servis', 'Pajak & KIR', 'Reminder Kendaraan', 'Mutasi Kendaraan', 'Penjualan Kendaraan'];
const BUILDING_MENUS = ['Daftar Gedung', 'Utility Monitoring', 'Compliance & Legal', 'Branch Improvement'];
const ASSET_MENUS = ['Asset HC', 'Asset IT', 'Customer Service', 'Reminder Pemeliharaan', 'Mutasi Asset', 'Penjualan Asset'];
const CONSUMABLE_MENUS = ['Request ATK', 'Master ATK', 'Request ARK', 'Master ARK', 'Stock Opname', 'Input Stock Opname', 'Master Delivery Location', 'Master Request Type'];
const FACILITY_MENUS = ['Pod Request', 'Pod Approval', 'Master Pod', 'Tenant Pod', 'Daftar Loker', 'Locker Request'];
const INSURANCE_MENUS = ['Insurance Dashboard', 'All Policies', 'Vehicle Insurance', 'Building Insurance', 'Asset Insurance', 'Claims', 'Insurance Providers', 'Expiring Soon'];
const ADMIN_MENUS = ['Log Book', 'Timesheet', 'Vendor', 'Master Vendor', 'Manajemen User', 'Master Approval'];

export const App: React.FC = () => {
  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  
  // UI State
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('Dashboard');
  const [activeTab, setActiveTab] = useState('SEMUA');
  const [userRole, setUserRole] = useState<'Admin' | 'Staff' | 'Officer'>('Admin');

  // Check for existing token on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      setIsAuthenticated(true);
      setCurrentUser(JSON.parse(user));
      setAuthToken(token);
    }
  }, []);

  // Handle Login
  const handleLoginSuccess = (user: any, token: string) => {
    setIsAuthenticated(true);
    setCurrentUser(user);
    localStorage.setItem('user', JSON.stringify(user));
    setAuthToken(token);
  };

  // Handle Logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuthToken(null);
  };


  // --- DATA STATES ---
  // ATK/ARK
  const [atkRequests, setAtkRequests] = useState<AssetRecord[]>(MOCK_DATA);
  const [masterAtk, setMasterAtk] = useState<MasterItem[]>(MOCK_MASTER_DATA);
  const [arkRequests, setArkRequests] = useState<AssetRecord[]>(MOCK_ARK_DATA);
  const [masterArk, setMasterArk] = useState<MasterItem[]>(MOCK_MASTER_ARK_DATA);
  const [deliveryLocations, setDeliveryLocations] = useState<DeliveryLocationRecord[]>(MOCK_DELIVERY_LOCATIONS);
  const [stockOpnames, setStockOpnames] = useState<StockOpnameRecord[]>(MOCK_STOCK_OPNAME_DATA);
  const [requestTypes, setRequestTypes] = useState<RequestTypeRecord[]>(MOCK_REQUEST_TYPES);
  
  // Vehicle
  const [vehicles, setVehicles] = useState<VehicleRecord[]>(MOCK_VEHICLE_DATA);
  const [vehicleContracts, setVehicleContracts] = useState<VehicleContractRecord[]>(MOCK_VEHICLE_CONTRACT_DATA);
  const [vehicleServices, setVehicleServices] = useState<ServiceRecord[]>(MOCK_SERVICE_DATA);
  const [vehicleTaxes, setVehicleTaxes] = useState<TaxKirRecord[]>(MOCK_TAX_KIR_DATA);
  const [vehicleReminders, setVehicleReminders] = useState<VehicleReminderRecord[]>(MOCK_VEHICLE_REMINDER_DATA);
  const [vehicleMutations, setVehicleMutations] = useState<MutationRecord[]>(MOCK_MUTATION_DATA.filter(m => m.assetType === 'VEHICLE'));
  const [vehicleSales, setVehicleSales] = useState<SalesRecord[]>(MOCK_SALES_DATA.filter(s => s.assetType === 'VEHICLE'));

  // Building
  const [buildings, setBuildings] = useState<BuildingRecord[]>(MOCK_BUILDING_DATA);
  const [utilities, setUtilities] = useState<UtilityRecord[]>(MOCK_UTILITY_DATA);
  const [complianceDocs, setComplianceDocs] = useState<ReminderRecord[]>(MOCK_REMINDER_DATA);
  const [buildingMaintenances, setBuildingMaintenances] = useState<BuildingMaintenanceRecord[]>(MOCK_BUILDING_MAINTENANCE_DATA);

  // General Asset
  const [generalAssets, setGeneralAssets] = useState<GeneralAssetRecord[]>(MOCK_GENERAL_ASSET_DATA);
  const [assetMaintenances, setAssetMaintenances] = useState<MaintenanceScheduleRecord[]>(MOCK_ASSET_MAINTENANCE_DATA);
  const [assetMutations, setAssetMutations] = useState<MutationRecord[]>(MOCK_MUTATION_DATA.filter(m => m.assetType === 'GENERAL_ASSET'));
  const [assetSales, setAssetSales] = useState<SalesRecord[]>(MOCK_SALES_DATA.filter(s => s.assetType === 'GENERAL_ASSET'));

  // Insurance
  const [insurances, setInsurances] = useState<InsuranceRecord[]>(MOCK_INSURANCE_DATA);
  const [insuranceProviders, setInsuranceProviders] = useState<InsuranceProviderRecord[]>(MOCK_INSURANCE_PROVIDERS);
  const [insuranceReminders, setInsuranceReminders] = useState<ReminderRecord[]>([]);

  // Facility
  const [masterPods, setMasterPods] = useState<MasterPodRecord[]>(MOCK_MASTER_POD_DATA);
  const [tenantPods, setTenantPods] = useState<TenantPodRecord[]>(MOCK_TENANT_POD_DATA);
  const [podRequests, setPodRequests] = useState<PodRequestRecord[]>(MOCK_POD_REQUEST_DATA);
  const [lockers, setLockers] = useState<LockerRecord[]>(MOCK_LOCKER_DATA);
  const [lockerRequests, setLockerRequests] = useState<LockerRequestRecord[]>(MOCK_LOCKER_REQUEST_DATA);

  // Admin
  const [logBooks, setLogBooks] = useState<LogBookRecord[]>(MOCK_LOGBOOK_DATA);
  const [timesheets, setTimesheets] = useState<TimesheetRecord[]>(MOCK_TIMESHEET_DATA);
  const [vendors, setVendors] = useState<VendorRecord[]>(MOCK_VENDOR_DATA);
  const [users, setUsers] = useState<UserRecord[]>(MOCK_USER_DATA);
  const [masterApprovals, setMasterApprovals] = useState<MasterApprovalRecord[]>(MOCK_MASTER_APPROVAL_DATA);
  
  // General Masters Data Map
  const masterDataMap: Record<string, GeneralMasterItem[]> = {
    'Master PPN': MOCK_PPN_DATA,
    'Master Brand Type': MOCK_BRAND_TYPE_DATA,
    'Master Brand': MOCK_BRAND_DATA,
    'Master Model Kendaraan': MOCK_VEHICLE_MODEL_DATA,
    'Master Komponen Bangunan': MOCK_BUILDING_COMPONENT_DATA,
    'Master Tipe Dokumen': MOCK_DOC_TYPE_DATA,
    'Master Tipe Utilitas': MOCK_UTILITY_TYPE_DATA,
    'Master Operator': MOCK_OPERATOR_DATA,
    'Master Asset Type': MOCK_ASSET_TYPE_DATA,
    'Master Department': MOCK_DEPARTMENT_DATA,
    'Master Lokasi': MOCK_LOCATION_DATA,
    'Master Satuan': MOCK_UOM_DATA,
    'Master Warna': MOCK_COLOR_DATA,
    'Master Tipe Gedung': MOCK_BUILDING_TYPE_DATA,
    'Master Cost Center': MOCK_COST_CENTER_DATA,
    'Asset Category': MOCK_ASSET_CATEGORY_DATA,
    'Jenis Pajak': MOCK_TAX_TYPE_DATA,
    'Jenis Pembayaran': MOCK_PAYMENT_TYPE_DATA,
    'Jenis Servis': MOCK_SERVICE_TYPE_DATA,
    'Status Mutasi': MOCK_MUTATION_STATUS_DATA,
    'Status Penjualan': MOCK_SALES_STATUS_DATA,
    'Status Request': MOCK_REQUEST_STATUS_DATA,
    'Tipe Mutasi': MOCK_MUTATION_TYPE_DATA,
    'Tipe Vendor': MOCK_VENDOR_TYPE_DATA,
    'Role': MOCK_ROLE_DATA,
    'Jenis Kendaraan': MOCK_VEHICLE_TYPE_DATA
  };

  // --- MODAL STATE ---
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: string;
    mode: 'create' | 'edit' | 'view' | 'approve';
    data?: any;
    extraData?: any;
  }>({ isOpen: false, type: '', mode: 'create' });

  // --- IMPORT MODAL STATE ---
  const [importState, setImportState] = useState<{
    isOpen: boolean;
    module: string;
    title: string;
  }>({ isOpen: false, module: '', title: '' });

  // --- WORKFLOW ACTION STATE ---
  const [workflowAction, setWorkflowAction] = useState<{
    isOpen: boolean;
    action: 'Approve' | 'Reject' | 'Revise';
    item: any;
    module: 'ATK' | 'ARK' | 'LOCKER' | 'OPNAME';
  }>({ isOpen: false, action: 'Approve', item: null, module: 'ATK' });


  // --- MODAL HANDLERS ---
  const openModal = (type: string, mode: 'create' | 'edit' | 'view' | 'approve' = 'create', data?: any, extraData?: any) => {
    setModalState({ isOpen: true, type, mode, data, extraData });
  };

  const closeModal = () => {
    setModalState({ ...modalState, isOpen: false, data: undefined, extraData: undefined });
  };

  // --- NAVIGATION ---
  const handleNavigate = (item: string) => {
    setActiveItem(item);
    setActiveTab('SEMUA');
  };

  // --- IMPORT HANDLERS ---
  const handleOpenImport = () => {
    setImportState({ isOpen: true, module: activeItem, title: activeItem });
  };

  const handleCloseImport = () => {
    setImportState({ isOpen: false, module: '', title: '' });
  };

  // --- WORKFLOW HANDLERS ---
  const handleOpenWorkflow = (item: any, action: 'Approve' | 'Reject' | 'Revise', module: 'ATK' | 'ARK' | 'LOCKER' | 'OPNAME') => {
    setWorkflowAction({ isOpen: true, action, item, module });
  };

  const handleCloseWorkflow = () => {
    setWorkflowAction(prev => ({ ...prev, isOpen: false }));
  };

  const handleSubmitWorkflow = (comment: string) => {
    const { action, item, module } = workflowAction;
    const status = action === 'Approve' ? 'Approved' : action === 'Reject' ? 'Rejected' : 'Revised';
    
    if (module === 'ATK') {
      setAtkRequests(prev => prev.map(r => r.id === item.id ? { ...r, status } : r));
    } else if (module === 'ARK') {
      setArkRequests(prev => prev.map(r => r.id === item.id ? { ...r, status } : r));
    } else if (module === 'LOCKER') {
      setLockerRequests(prev => prev.map(r => r.id === item.id ? { ...r, status } : r));
    } else if (module === 'OPNAME') {
      setStockOpnames(prev => prev.map(r => r.opnameId === item.opnameId ? { 
        ...r, statusApproval: status as any, approvalNote: comment, 
        approvalDate: new Date().toISOString().split('T')[0] 
      } : r));
    }
    handleCloseWorkflow();
  };

  // --- DELETE HANDLERS ---
  const handleDelete = (type: string, id: string | number) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus item ini?")) return;
    
    switch (type) {
      case 'vehicle': setVehicles(prev => prev.filter(i => i.id !== id)); break;
      case 'vehicleContract': setVehicleContracts(prev => prev.filter(i => i.id !== id)); break;
      case 'service': setVehicleServices(prev => prev.filter(i => i.id !== id)); break;
      case 'taxKir': setVehicleTaxes(prev => prev.filter(i => i.id !== id)); break;
      case 'vehicleReminder': setVehicleReminders(prev => prev.filter(i => i.id !== id)); break;
      case 'building': setBuildings(prev => prev.filter(i => i.id !== id)); break;
      case 'utility': setUtilities(prev => prev.filter(i => i.id !== id)); break;
      case 'compliance': setComplianceDocs(prev => prev.filter(i => i.id !== id)); break;
      case 'buildingMaintenance': setBuildingMaintenances(prev => prev.filter(i => i.id !== id)); break;
      case 'generalAsset': setGeneralAssets(prev => prev.filter(i => i.id !== id)); break;
      case 'maintenanceSchedule': setAssetMaintenances(prev => prev.filter(i => i.id !== id)); break;
      case 'masterAtk': setMasterAtk(prev => prev.filter(i => i.id !== id)); break;
      case 'masterArk': setMasterArk(prev => prev.filter(i => i.id !== id)); break;
      case 'atkRequest': setAtkRequests(prev => prev.filter(i => i.id !== id)); break;
      case 'arkRequest': setArkRequests(prev => prev.filter(i => i.id !== id)); break;
      case 'deliveryLocation': setDeliveryLocations(prev => prev.filter(i => i.id !== id)); break;
      case 'requestType': setRequestTypes(prev => prev.filter(i => i.id !== id)); break;
      case 'podRequest': setPodRequests(prev => prev.filter(i => i.id !== id)); break;
      case 'masterPod': setMasterPods(prev => prev.filter(i => i.id !== id)); break;
      case 'tenantPod': setTenantPods(prev => prev.filter(i => i.id !== id)); break;
      case 'locker': setLockers(prev => prev.filter(i => i.id !== id)); break;
      case 'lockerRequest': setLockerRequests(prev => prev.filter(i => i.id !== id)); break;
      case 'insurance': setInsurances(prev => prev.filter(i => i.id !== id)); break;
      case 'insuranceProvider': setInsuranceProviders(prev => prev.filter(i => i.id !== id)); break;
      case 'logBook': setLogBooks(prev => prev.filter(i => i.id !== id)); break;
      case 'timesheet': setTimesheets(prev => prev.filter(i => i.id !== id)); break;
      case 'vendor': setVendors(prev => prev.filter(i => i.id !== id)); break;
      case 'user': setUsers(prev => prev.filter(i => i.id !== id)); break;
      case 'masterApproval': setMasterApprovals(prev => prev.filter(i => i.id !== id)); break;
      case 'mutation': 
        setVehicleMutations(prev => prev.filter(i => i.id !== id));
        setAssetMutations(prev => prev.filter(i => i.id !== id));
        break;
      case 'sales':
        setVehicleSales(prev => prev.filter(i => i.id !== id));
        setAssetSales(prev => prev.filter(i => i.id !== id));
        break;
    }
  };


  // --- SAVE HANDLERS ---
  const handleSave = (type: string, data: any) => {
    const isCreate = modalState.mode === 'create';
    const newId = Date.now();

    switch (type) {
      case 'vehicle':
        if (isCreate) setVehicles(prev => [{ ...data, id: newId }, ...prev]);
        else setVehicles(prev => prev.map(i => i.id === data.id ? data : i));
        break;
      case 'vehicleContract':
        if (isCreate) setVehicleContracts(prev => [{ ...data, id: newId }, ...prev]);
        else setVehicleContracts(prev => prev.map(i => i.id === data.id ? data : i));
        break;
      case 'service':
        if (isCreate) setVehicleServices(prev => [{ ...data, id: newId }, ...prev]);
        else setVehicleServices(prev => prev.map(i => i.id === data.id ? data : i));
        break;
      case 'taxKir':
        if (isCreate) setVehicleTaxes(prev => [{ ...data, id: newId }, ...prev]);
        else setVehicleTaxes(prev => prev.map(i => i.id === data.id ? data : i));
        break;
      case 'vehicleReminder':
        if (isCreate) setVehicleReminders(prev => [{ ...data, id: newId }, ...prev]);
        else setVehicleReminders(prev => prev.map(i => i.id === data.id ? data : i));
        break;
      case 'building':
        if (isCreate) setBuildings(prev => [{ ...data, id: newId }, ...prev]);
        else setBuildings(prev => prev.map(i => i.id === data.id ? data : i));
        break;
      case 'utility':
        if (isCreate) setUtilities(prev => [{ ...data, id: newId }, ...prev]);
        else setUtilities(prev => prev.map(i => i.id === data.id ? data : i));
        break;
      case 'compliance':
        if (isCreate) setComplianceDocs(prev => [{ ...data, id: newId }, ...prev]);
        else setComplianceDocs(prev => prev.map(i => i.id === data.id ? data : i));
        break;
      case 'buildingMaintenance':
        if (isCreate) setBuildingMaintenances(prev => [{ ...data, id: newId }, ...prev]);
        else setBuildingMaintenances(prev => prev.map(i => i.id === data.id ? data : i));
        break;
      case 'generalAsset':
        if (isCreate) setGeneralAssets(prev => [{ ...data, id: `GA-${newId}` }, ...prev]);
        else setGeneralAssets(prev => prev.map(i => i.id === data.id ? data : i));
        break;
      case 'maintenanceSchedule':
        if (isCreate) setAssetMaintenances(prev => [{ ...data, id: newId }, ...prev]);
        else setAssetMaintenances(prev => prev.map(i => i.id === data.id ? data : i));
        break;
      case 'masterAtk':
        if (isCreate) setMasterAtk(prev => [{ ...data, id: newId }, ...prev]);
        else setMasterAtk(prev => prev.map(i => i.id === data.id ? data : i));
        break;
      case 'masterArk':
        if (isCreate) setMasterArk(prev => [{ ...data, id: newId }, ...prev]);
        else setMasterArk(prev => prev.map(i => i.id === data.id ? data : i));
        break;
      case 'atkRequest':
        if (isCreate) setAtkRequests(prev => [{ ...data, id: newId, status: 'Pending' }, ...prev]);
        else setAtkRequests(prev => prev.map(i => i.id === data.id ? data : i));
        break;
      case 'arkRequest':
        if (isCreate) setArkRequests(prev => [{ ...data, id: newId, status: 'Pending' }, ...prev]);
        else setArkRequests(prev => prev.map(i => i.id === data.id ? data : i));
        break;
      case 'deliveryLocation':
        if (isCreate) setDeliveryLocations(prev => [{ ...data, id: newId }, ...prev]);
        else setDeliveryLocations(prev => prev.map(i => i.id === data.id ? data : i));
        break;
      case 'requestType':
        if (isCreate) setRequestTypes(prev => [{ ...data, id: newId }, ...prev]);
        else setRequestTypes(prev => prev.map(i => i.id === data.id ? data : i));
        break;
      case 'stockOpname':
        if (isCreate) setStockOpnames(prev => [{ ...data, opnameId: `SO-${newId}`, statusApproval: 'Pending' }, ...prev]);
        else setStockOpnames(prev => prev.map(i => i.opnameId === data.opnameId ? data : i));
        break;
      case 'podRequest':
        if (isCreate) setPodRequests(prev => [{ ...data, id: newId, status: 'Waiting Approval' }, ...prev]);
        else setPodRequests(prev => prev.map(i => i.id === data.id ? data : i));
        break;
      case 'masterPod':
        if (isCreate) setMasterPods(prev => [{ ...data, id: newId }, ...prev]);
        else setMasterPods(prev => prev.map(i => i.id === data.id ? data : i));
        break;
      case 'tenantPod':
        if (isCreate) setTenantPods(prev => [{ ...data, id: newId }, ...prev]);
        else setTenantPods(prev => prev.map(i => i.id === data.id ? data : i));
        break;
      case 'locker':
        if (isCreate) setLockers(prev => [{ ...data, id: newId }, ...prev]);
        else setLockers(prev => prev.map(i => i.id === data.id ? data : i));
        break;
      case 'lockerRequest':
        if (isCreate) setLockerRequests(prev => [{ ...data, id: newId, status: 'Pending' }, ...prev]);
        else setLockerRequests(prev => prev.map(i => i.id === data.id ? data : i));
        break;
      case 'insurance':
        if (isCreate) setInsurances(prev => [{ ...data, id: newId }, ...prev]);
        else setInsurances(prev => prev.map(i => i.id === data.id ? data : i));
        break;
      case 'insuranceProvider':
        if (isCreate) setInsuranceProviders(prev => [{ ...data, id: newId }, ...prev]);
        else setInsuranceProviders(prev => prev.map(i => i.id === data.id ? data : i));
        break;
      case 'logBook':
        if (isCreate) setLogBooks(prev => [{ ...data, id: `${newId}` }, ...prev]);
        else setLogBooks(prev => prev.map(i => i.id === data.id ? data : i));
        break;
      case 'timesheet':
        if (isCreate) setTimesheets(prev => [{ ...data, id: newId }, ...prev]);
        else setTimesheets(prev => prev.map(i => i.id === data.id ? data : i));
        break;
      case 'vendor':
        if (isCreate) setVendors(prev => [{ ...data, id: newId }, ...prev]);
        else setVendors(prev => prev.map(i => i.id === data.id ? data : i));
        break;
      case 'user':
        if (isCreate) setUsers(prev => [{ ...data, id: newId }, ...prev]);
        else setUsers(prev => prev.map(i => i.id === data.id ? data : i));
        break;
      case 'masterApproval':
        if (isCreate) setMasterApprovals(prev => [{ ...data, id: newId }, ...prev]);
        else setMasterApprovals(prev => prev.map(i => i.id === data.id ? data : i));
        break;
      case 'mutation':
        const mutationData = { ...data, id: isCreate ? newId : data.id };
        if (data.assetType === 'VEHICLE') {
          if (isCreate) setVehicleMutations(prev => [mutationData, ...prev]);
          else setVehicleMutations(prev => prev.map(i => i.id === data.id ? mutationData : i));
        } else {
          if (isCreate) setAssetMutations(prev => [mutationData, ...prev]);
          else setAssetMutations(prev => prev.map(i => i.id === data.id ? mutationData : i));
        }
        break;
      case 'sales':
        const salesData = { ...data, id: isCreate ? newId : data.id };
        if (data.assetType === 'VEHICLE') {
          if (isCreate) setVehicleSales(prev => [salesData, ...prev]);
          else setVehicleSales(prev => prev.map(i => i.id === data.id ? salesData : i));
        } else {
          if (isCreate) setAssetSales(prev => [salesData, ...prev]);
          else setAssetSales(prev => prev.map(i => i.id === data.id ? salesData : i));
        }
        break;
      case 'addStock':
        // Update stock for master item
        const itemId = modalState.data?.id;
        if (activeItem.includes('ARK')) {
          setMasterArk(prev => prev.map(i => i.id === itemId ? { ...i, remainingStock: i.remainingStock + (data.quantity || 0) } : i));
        } else {
          setMasterAtk(prev => prev.map(i => i.id === itemId ? { ...i, remainingStock: i.remainingStock + (data.quantity || 0) } : i));
        }
        break;
    }
    closeModal();
  };


  // --- CALCULATE DASHBOARD STATS ---
  const getDashboardStats = () => {
    const pendingATK = atkRequests.filter(r => r.status === 'Pending' || r.status === 'Waiting Approval').length;
    const pendingARK = arkRequests.filter(r => r.status === 'Pending' || r.status === 'Waiting Approval').length;
    const pendingVehicle = vehicles.filter(v => (v.approvalStatus || '').toLowerCase().includes('pending')).length;
    const pendingService = vehicleServices.filter(s => (s.statusApproval || '').toLowerCase().includes('pending')).length;
    const pendingPod = podRequests.filter(r => r.status === 'Waiting Approval').length;
    const pendingLocker = lockerRequests.filter(r => r.status === 'Pending').length;
    
    const totalPods = masterPods.length;
    const occupiedPods = tenantPods.length;
    const totalLockers = lockers.length;
    const occupiedLockers = lockers.filter(l => l.status === 'Terisi').length;
    
    const activeVehicles = vehicles.filter(v => v.status === 'Aktif' || v.status === 'Available').length;
    const serviceVehicles = vehicles.filter(v => v.status === 'Service').length;
    const maintenanceBuildings = buildingMaintenances.filter(m => m.status === 'In Progress').length;
    
    const lowStockATK = masterAtk.filter(i => i.remainingStock <= i.minimumStock).length;
    const lowStockARK = masterArk.filter(i => i.remainingStock <= i.minimumStock).length;
    
    const activeVisitors = logBooks.filter(l => !l.jamPulang).length;

    const recentActivities = [
      ...atkRequests.map(r => ({ ...r, type: 'ATK Request', code: 'ATK' })),
      ...arkRequests.map(r => ({ ...r, type: 'ARK Request', code: 'ARK' })),
      ...vehicleServices.map(s => ({ 
        id: s.id, itemName: `Servis ${s.noPolisi}`, status: s.statusApproval, 
        date: s.tglRequest, transactionNumber: s.id, type: 'Vehicle Service', code: 'SRV'
      })),
      ...podRequests.map(p => ({
        id: p.id, itemName: `Pod Request ${p.roomType}`, status: p.status,
        date: p.requestDate, transactionNumber: p.id, type: 'Pod Request', code: 'POD'
      })),
      ...lockerRequests.map(l => ({
        id: l.id, itemName: `Locker Request`, status: l.status,
        date: l.requestDate, transactionNumber: l.id, type: 'Locker Request', code: 'LOC'
      }))
    ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);

    return {
      pendingATK, pendingARK, pendingVehicle, pendingService, pendingPod, pendingLocker,
      totalPods, occupiedPods, totalLockers, occupiedLockers,
      activeVehicles, serviceVehicles, maintenanceBuildings,
      lowStockATK, lowStockARK, activeVisitors,
      totalBuildings: buildings.length,
      totalAssets: generalAssets.length,
      recentActivities
    };
  };

  // --- RENDER PAGE CONTENT ---
  const renderPageContent = () => {
    // Dashboard
    if (activeItem === 'Dashboard') {
      const stats = getDashboardStats();
      return (
        <DashboardPage
          {...stats}
          onNavigate={handleNavigate}
        />
      );
    }

    // Vehicle Pages
    if (VEHICLE_MENUS.includes(activeItem)) {
      return (
        <VehiclePage
          activeItem={activeItem}
          vehicles={vehicles}
          contracts={vehicleContracts}
          services={vehicleServices}
          taxes={vehicleTaxes}
          reminders={vehicleReminders}
          mutations={vehicleMutations}
          sales={vehicleSales}
          onOpenModal={openModal}
          onDelete={handleDelete}
        />
      );
    }

    // Building Pages
    if (BUILDING_MENUS.includes(activeItem)) {
      return (
        <BuildingPage
          activeItem={activeItem}
          buildings={buildings}
          utilities={utilities}
          complianceDocs={complianceDocs}
          maintenances={buildingMaintenances}
          onOpenModal={openModal}
          onDelete={handleDelete}
        />
      );
    }

    // Asset Pages
    if (ASSET_MENUS.includes(activeItem)) {
      return (
        <AssetPage
          activeItem={activeItem}
          assets={generalAssets}
          maintenances={assetMaintenances}
          mutations={assetMutations}
          sales={assetSales}
          onOpenModal={openModal}
          onDelete={handleDelete}
        />
      );
    }

    // Consumable Pages
    if (CONSUMABLE_MENUS.includes(activeItem)) {
      return (
        <ConsumablePage
          activeItem={activeItem}
          atkRequests={atkRequests}
          arkRequests={arkRequests}
          masterAtk={masterAtk}
          masterArk={masterArk}
          stockOpnames={stockOpnames}
          deliveryLocations={deliveryLocations}
          requestTypes={requestTypes}
          userRole={userRole}
          onOpenModal={openModal}
          onDelete={handleDelete}
          onWorkflow={handleOpenWorkflow}
        />
      );
    }

    // Facility Pages
    if (FACILITY_MENUS.includes(activeItem)) {
      return (
        <FacilityPage
          activeItem={activeItem}
          podRequests={podRequests}
          masterPods={masterPods}
          tenantPods={tenantPods}
          lockers={lockers}
          lockerRequests={lockerRequests}
          userRole={userRole}
          onOpenModal={openModal}
          onDelete={handleDelete}
          onWorkflow={handleOpenWorkflow}
        />
      );
    }

    // Insurance Pages
    if (INSURANCE_MENUS.includes(activeItem)) {
      return (
        <InsurancePage
          activeItem={activeItem}
          insurances={insurances}
          providers={insuranceProviders}
          reminders={insuranceReminders}
          onOpenModal={openModal}
          onDelete={handleDelete}
          onNavigate={handleNavigate}
        />
      );
    }

    // Admin Pages & General Masters
    if (ADMIN_MENUS.includes(activeItem) || masterDataMap[activeItem]) {
      return (
        <AdminPage
          activeItem={activeItem}
          logBooks={logBooks}
          timesheets={timesheets}
          vendors={vendors}
          users={users}
          masterApprovals={masterApprovals}
          masterDataMap={masterDataMap}
          onOpenModal={openModal}
          onDelete={handleDelete}
          onOpenImport={handleOpenImport}
        />
      );
    }

    return <div className="p-8 text-gray-500">Page not found: {activeItem}</div>;
  };


  // --- RENDER MODALS ---
  const renderModals = () => {
    const { isOpen, type, mode, data, extraData } = modalState;
    if (!isOpen) return null;

    const commonProps = {
      isOpen,
      onClose: closeModal,
      mode,
      data,
    };

    switch (type) {
      // Vehicle Modals
      case 'vehicle':
        return <VehicleModal {...commonProps} onSave={(d) => handleSave('vehicle', d)} />;
      case 'vehicleContract':
        return <VehicleContractModal {...commonProps} vehicles={vehicles} onSave={(d) => handleSave('vehicleContract', d)} />;
      case 'service':
        return <ServiceModal {...commonProps} vehicles={vehicles} onSave={(d) => handleSave('service', d)} />;
      case 'taxKir':
        return <TaxKirModal {...commonProps} vehicles={vehicles} onSave={(d) => handleSave('taxKir', d)} />;
      case 'vehicleReminder':
        return <VehicleReminderModal {...commonProps} vehicles={vehicles} onSave={(d) => handleSave('vehicleReminder', d)} />;
      case 'mutation':
        return <MutationModal {...commonProps} onSave={(d) => handleSave('mutation', d)} />;
      case 'sales':
        return <SalesModal {...commonProps} onSave={(d) => handleSave('sales', d)} />;

      // Building Modals
      case 'building':
        return <BuildingModal {...commonProps} onSave={(d) => handleSave('building', d)} />;
      case 'utility':
        return <UtilityModal {...commonProps} buildings={buildings} onSave={(d) => handleSave('utility', d)} />;
      case 'compliance':
        return <ComplianceModal {...commonProps} buildings={buildings} onSave={(d) => handleSave('compliance', d)} />;
      case 'buildingMaintenance':
        return <BuildingMaintenanceModal {...commonProps} buildings={buildings} onSave={(d) => handleSave('buildingMaintenance', d)} />;

      // Asset Modals
      case 'generalAsset':
        return <AssetGeneralModal {...commonProps} onSave={(d) => handleSave('generalAsset', d)} />;
      case 'maintenanceSchedule':
        return <MaintenanceScheduleModal {...commonProps} assets={generalAssets} onSave={(d) => handleSave('maintenanceSchedule', d)} />;

      // Consumable Modals
      case 'masterAtk':
      case 'masterArk':
        return <MasterItemModal {...commonProps} type={type === 'masterArk' ? 'ARK' : 'ATK'} onSave={(d) => handleSave(type, d)} />;
      case 'addStock':
        return <AddStockModal {...commonProps} item={data} onSave={(d) => handleSave('addStock', d)} />;
      case 'stockOpname':
        return <AddStockOpnameModal {...commonProps} masterItems={[...masterAtk, ...masterArk]} onSave={(d) => handleSave('stockOpname', d)} />;
      case 'deliveryLocation':
        return <DeliveryLocationModal {...commonProps} onSave={(d) => handleSave('deliveryLocation', d)} />;
      case 'requestType':
        return <MasterRequestTypeModal {...commonProps} onSave={(d) => handleSave('requestType', d)} />;

      // Facility Modals
      case 'podRequest':
        return <PodRequestModal {...commonProps} masterPods={masterPods} onSave={(d) => handleSave('podRequest', d)} />;
      case 'masterPod':
        return <MasterPodModal {...commonProps} onSave={(d) => handleSave('masterPod', d)} />;
      case 'tenantPod':
        return <TenantPodModal {...commonProps} masterPods={masterPods} onSave={(d) => handleSave('tenantPod', d)} />;
      case 'locker':
        return <LockerModal {...commonProps} onSave={(d) => handleSave('locker', d)} />;
      case 'lockerRequest':
        return <LockerRequestModal {...commonProps} lockers={lockers} onSave={(d) => handleSave('lockerRequest', d)} />;

      // Insurance Modals
      case 'insurance':
        return <InsuranceModal {...commonProps} providers={insuranceProviders} onSave={(d) => handleSave('insurance', d)} />;
      case 'insuranceClaim':
        return <InsuranceClaimModal {...commonProps} insurances={insurances} onSave={(d) => handleSave('insuranceClaim', d)} />;
      case 'insuranceProvider':
        return <InsuranceProviderModal {...commonProps} onSave={(d) => handleSave('insuranceProvider', d)} />;

      // Admin Modals
      case 'logBook':
        return <LogBookModal {...commonProps} onSave={(d) => handleSave('logBook', d)} />;
      case 'timesheet':
        return <TimesheetModal {...commonProps} onSave={(d) => handleSave('timesheet', d)} />;
      case 'vendor':
        return <VendorModal {...commonProps} onSave={(d) => handleSave('vendor', d)} />;
      case 'user':
        return <UserModal {...commonProps} onSave={(d) => handleSave('user', d)} />;
      case 'masterApproval':
        return <MasterApprovalModal {...commonProps} users={users} onSave={(d) => handleSave('masterApproval', d)} />;
      case 'generalMaster':
        return <GeneralMasterModal {...commonProps} category={data?.category} onSave={(d) => handleSave('generalMaster', d)} />;

      default:
        return null;
    }
  };

  // --- MAIN RENDER ---
  // Show login page if not authenticated
  if (!isAuthenticated) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="flex h-screen bg-[#FAFAFA] overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        isMobileOpen={isMobileMenuOpen}
        activeItem={activeItem}
        onItemClick={handleNavigate}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        onMobileClose={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <TopBar
          onMenuClick={() => setIsMobileMenuOpen(true)}
          onLogout={handleLogout}
          user={currentUser}
        />

        {/* Filter Bar (optional based on page) */}
        {activeItem !== 'Dashboard' && !INSURANCE_MENUS.includes(activeItem) && (
          <FilterBar
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onImport={handleOpenImport}
          />
        )}

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          {renderPageContent()}
        </main>
      </div>

      {/* Modals */}
      {renderModals()}

      {/* Import Modal */}
      {importState.isOpen && (
        <ImportDataModal
          isOpen={importState.isOpen}
          onClose={handleCloseImport}
          module={importState.module}
          title={importState.title}
        />
      )}

      {/* Workflow Action Modal */}
      {workflowAction.isOpen && (
        <WorkflowActionModal
          isOpen={workflowAction.isOpen}
          onClose={handleCloseWorkflow}
          action={workflowAction.action}
          item={workflowAction.item}
          onSubmit={handleSubmitWorkflow}
        />
      )}
    </div>
  );
};

export default App;
