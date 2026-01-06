
import React, { useState, useEffect, useMemo } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { FilterBar } from './components/FilterBar';
import { VehicleTable } from './components/VehicleTable';
import { ServiceLogTable } from './components/ServiceLogTable'; 
import { TaxKirTable } from './components/TaxKirTable';
import { MasterVendorTable } from './components/MasterVendorTable';
import { VendorTable } from './components/VendorTable';
import { VehicleContractTable } from './components/VehicleContractTable';
import { BuildingTable } from './components/BuildingTable';
import { BuildingAssetTable } from './components/BuildingAssetTable';
import { BuildingMaintenanceTable } from './components/BuildingMaintenanceTable';
import { UtilityTable } from './components/UtilityTable'; 
import { ReminderTable } from './components/ReminderTable';
import { MaintenanceReminderTable } from './components/MaintenanceReminderTable'; 
import { VehicleReminderTable } from './components/VehicleReminderTable';
import { GeneralMasterTable } from './components/GeneralMasterTable';
import { StationeryRequestTable } from './components/StationeryRequestTable';
import { MasterAtkTable } from './components/MasterAtkTable';
import { MasterDeliveryLocationTable } from './components/MasterDeliveryLocationTable';
import { LogBookTable } from './components/LogBookTable';
import { UserTable } from './components/UserTable';
import { MutationTable } from './components/MutationTable'; 
import { SalesTable } from './components/SalesTable'; 
import { GeneralAssetTable } from './components/GeneralAssetTable';
import { MasterApprovalTable } from './components/MasterApprovalTable';
import { TimesheetTable } from './components/TimesheetTable'; 

// Insurance Modules
import { InsuranceTable } from './components/InsuranceTable'; 
import { InsurancePolicyTable } from './components/InsurancePolicyTable';
import { InsuranceDashboard } from './components/InsuranceDashboard';
import { InsuranceProviderTable } from './components/InsuranceProviderTable';
import { InsuranceClaimTable, DisplayClaim } from './components/InsuranceClaimTable';

// New Tables for Facility Services
import { LockerTable } from './components/LockerTable';
import { ModenaPodTable } from './components/ModenaPodTable';
import { StockOpnameTable } from './components/StockOpnameTable';
import { LockerRequestTable } from './components/LockerRequestTable';
import { PodRequestTable } from './components/PodRequestTable';
import { MasterModenaPodTable } from './components/MasterModenaPodTable';
import { MasterLockerTable } from './components/MasterLockerTable';

import { VehicleModal } from './components/VehicleModal';
import { BuildingModal } from './components/BuildingModal';
import { BuildingAssetItemModal } from './components/BuildingAssetItemModal';
import { BuildingMaintenanceModal } from './components/BuildingMaintenanceModal'; 
import { GeneralMasterModal } from './components/GeneralMasterModal';
import { AddStockModal } from './components/AddStockModal';
import { MasterItemModal } from './components/MasterItemModal';
import { DeliveryLocationModal } from './components/DeliveryLocationModal';
import { AssetGeneralModal } from './components/AssetGeneralModal';
import { ServiceModal } from './components/ServiceModal';
import { TaxKirModal } from './components/TaxKirModal';
import { VehicleContractModal } from './components/VehicleContractModal';
import { UserModal } from './components/UserModal';
import { UtilityModal } from './components/UtilityModal';
import { MutationModal } from './components/MutationModal'; 
import { SalesModal } from './components/SalesModal'; 
import { VendorModal } from './components/VendorModal';
import { MasterApprovalModal } from './components/MasterApprovalModal'; 
import { TimesheetModal } from './components/TimesheetModal'; 
import { WorkflowActionModal } from './components/WorkflowActionModal';
import { ComplianceModal } from './components/ComplianceModal';
import { InsuranceModal } from './components/InsuranceModal';
import { InsuranceProviderModal } from './components/InsuranceProviderModal';
import { InsuranceClaimModal } from './components/InsuranceClaimModal';
import { LockerModal } from './components/LockerModal';
import { LockerRequestModal } from './components/LockerRequestModal';
import { PodCensusModal } from './components/PodCensusModal';
import { PodRequestModal } from './components/PodRequestModal';
import { ImportExcelModal } from './components/ImportExcelModal';
import { ConfirmationModal } from './components/ConfirmationModal';

import { Zap, Droplets, TrendingUp, Sun, LayoutDashboard, Home, Box } from 'lucide-react';
import { 
  MOCK_VEHICLE_DATA, 
  MOCK_TAX_KIR_DATA, 
  MOCK_MASTER_VENDOR_DATA, 
  MOCK_VEHICLE_CONTRACT_DATA, 
  MOCK_BUILDING_DATA, 
  MOCK_BUILDING_ASSETS,
  MOCK_IT_BUILDING_ASSETS,
  MOCK_CS_BUILDING_ASSETS,
  MOCK_BUILDING_MAINTENANCE_DATA, 
  MOCK_BRANCH_IMPROVEMENT_DATA,
  MOCK_UTILITY_DATA,
  MOCK_REMINDER_DATA, 
  MOCK_MAINTENANCE_REMINDER,
  MOCK_GENERAL_MASTER_DATA,
  MOCK_DATA as MOCK_ATK_DATA,
  MOCK_ARK_DATA,
  MOCK_MASTER_DATA as MOCK_ATK_MASTER,
  MOCK_MASTER_ARK_DATA,
  MOCK_LOGBOOK_DATA,
  MOCK_UOM_DATA,
  MOCK_ATK_CATEGORY,
  MOCK_ARK_CATEGORY,
  MOCK_DELIVERY_LOCATIONS,
  MOCK_USER_DATA,
  MOCK_VEHICLE_TYPE_DATA,
  MOCK_ASSET_CATEGORY_DATA,
  MOCK_LOCATION_DATA,
  MOCK_DEPARTMENT_DATA,
  MOCK_UOM_MASTER_DATA,
  MOCK_BRAND_DATA,
  MOCK_COST_CENTER_DATA,
  MOCK_GENERAL_ASSET_DATA,
  MOCK_IT_ASSET_DATA,
  MOCK_COLOR_DATA,
  MOCK_BUILDING_TYPE_DATA,
  MOCK_GENERAL_ASSET_TYPE_DATA,
  MOCK_PPN_DATA,
  MOCK_BRAND_TYPE_DATA,
  MOCK_OPERATOR_DATA,
  MOCK_VENDOR_DATA,
  MOCK_TIMESHEET_DATA,
  MOCK_SERVICE_DATA,
  MOCK_MUTATION_DATA,
  MOCK_SALES_DATA,
  MOCK_INSURANCE_DATA,
  MOCK_INSURANCE_PROVIDERS,
  MOCK_MAINTENANCE_SCHEDULE_DATA,
  MOCK_VEHICLE_REMINDER_DATA,
  MOCK_LOCKER_DATA,
  MOCK_STOCK_OPNAME_DATA,
  MOCK_LOCKER_REQUEST_DATA,
  MOCK_POD_REQUEST_DATA,
  MOCK_POD_DATA,
  MOCK_MASTER_POD_DATA,
  MOCK_MASTER_LOCKER_GOODS_DATA,
  MOCK_MASTER_LOCKER_PANTRY_DATA,
  MOCK_GA_MUTATION_DATA,
  MOCK_GA_SALES_DATA,
  MOCK_VEHICLE_MODEL,
  MOCK_BUILDING_COMPONENTS,
  MOCK_DOCUMENT_TYPES,
  MOCK_UTILITY_TYPES
} from './constants';
import { 
  VehicleRecord, 
  ServiceRecord, 
  TaxKirRecord, 
  VehicleContractRecord, 
  BuildingRecord, 
  BuildingAssetRecord,
  BuildingMaintenanceRecord,
  UtilityRecord,
  ReminderRecord, 
  GeneralMasterItem,
  AssetRecord, 
  LogBookRecord,
  MasterItem,
  DeliveryLocationRecord,
  StationeryRequestRecord,
  UserRecord,
  MutationRecord,
  SalesRecord,
  GeneralAssetRecord,
  MasterVendorRecord,
  VendorRecord,
  MasterApprovalRecord,
  TimesheetRecord,
  InsuranceRecord,
  InsuranceProviderRecord,
  InsuranceClaim,
  MaintenanceScheduleRecord,
  VehicleReminderRecord,
  LockerRecord,
  ModenaPodRecord,
  StockOpnameRecord,
  LockerRequestRecord,
  PodRequestRecord,
  MasterPodRecord,
  MasterLockerRecord
} from './types';
import { useLanguage } from './contexts/LanguageContext';

// Helper for LocalStorage Persistence
const getInitialData = <T,>(key: string, fallback: T): T => {
  try {
    const stored = localStorage.getItem(key);
    // If stored data is empty array but fallback has data, use fallback (Reset mechanism)
    if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length === 0 && Array.isArray(fallback) && fallback.length > 0) {
            return fallback;
        }
        return parsed;
    }
    return fallback;
  } catch (e) {
    console.warn(`Error reading ${key} from localStorage`, e);
    return fallback;
  }
};

const App: React.FC = () => {
  const { t } = useLanguage();
  const [activeModule, setActiveModule] = useState('Dashboard'); 
  const [activeTab, setActiveTab] = useState('SEMUA');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // DATA STATES
  const [atkData, setAtkData] = useState<AssetRecord[]>(() => getInitialData('atkData', MOCK_ATK_DATA));
  const [arkData, setArkData] = useState<AssetRecord[]>(() => getInitialData('arkData', MOCK_ARK_DATA));
  const [vehicleData, setVehicleData] = useState<VehicleRecord[]>(() => getInitialData('vehicleData', MOCK_VEHICLE_DATA));
  const [buildingData, setBuildingData] = useState<BuildingRecord[]>(() => getInitialData('buildingData', MOCK_BUILDING_DATA));
  const [buildingAssetData, setBuildingAssetData] = useState<BuildingAssetRecord[]>(() => getInitialData('buildingAssetData', MOCK_BUILDING_ASSETS));
  
  const [itBuildingData, setItBuildingData] = useState<BuildingAssetRecord[]>(() => getInitialData('itBuildingData', MOCK_IT_BUILDING_ASSETS));
  const [csBuildingData, setCsBuildingData] = useState<BuildingAssetRecord[]>(() => getInitialData('csBuildingData', MOCK_CS_BUILDING_ASSETS));

  const [buildingMaintenanceData, setBuildingMaintenanceData] = useState<BuildingMaintenanceRecord[]>(() => getInitialData('buildingMaintenanceData', MOCK_BUILDING_MAINTENANCE_DATA));
  const [utilityData, setUtilityData] = useState<UtilityRecord[]>(() => getInitialData('utilityData', MOCK_UTILITY_DATA));
  const [branchImprovementData, setBranchImprovementData] = useState<BuildingRecord[]>(() => getInitialData('branchImprovementData', MOCK_BRANCH_IMPROVEMENT_DATA));
  const [serviceData, setServiceData] = useState<ServiceRecord[]>(() => getInitialData('serviceData', MOCK_SERVICE_DATA));
  const [taxKirData, setTaxKirData] = useState<TaxKirRecord[]>(() => getInitialData('taxKirData', MOCK_TAX_KIR_DATA));
  const [vehicleContractData, setVehicleContractData] = useState<VehicleContractRecord[]>(() => getInitialData('vehicleContractData', MOCK_VEHICLE_CONTRACT_DATA));
  const [masterVendorData, setMasterVendorData] = useState<MasterVendorRecord[]>(() => getInitialData('masterVendorData', MOCK_MASTER_VENDOR_DATA));
  const [vendorData, setVendorData] = useState<VendorRecord[]>(() => getInitialData('vendorData', MOCK_VENDOR_DATA));
  const [logBookData, setLogBookData] = useState<LogBookRecord[]>(() => getInitialData('logBookData', MOCK_LOGBOOK_DATA));
  const [userData, setUserData] = useState<UserRecord[]>(() => getInitialData('userData', MOCK_USER_DATA));
  const [timesheetData, setTimesheetData] = useState<TimesheetRecord[]>(() => getInitialData('timesheetData', MOCK_TIMESHEET_DATA));
  const [generalAssetData, setGeneralAssetData] = useState<GeneralAssetRecord[]>(() => getInitialData('generalAssetData', MOCK_GENERAL_ASSET_DATA));
  const [mutationData, setMutationData] = useState<MutationRecord[]>(() => getInitialData('mutationData', MOCK_MUTATION_DATA));
  const [gaMutationData, setGaMutationData] = useState<MutationRecord[]>(() => getInitialData('gaMutationData', MOCK_GA_MUTATION_DATA)); // New state for GA Mutation
  const [salesData, setSalesData] = useState<SalesRecord[]>(() => getInitialData('salesData', MOCK_SALES_DATA));
  const [gaSalesData, setGaSalesData] = useState<SalesRecord[]>(() => getInitialData('gaSalesData', MOCK_GA_SALES_DATA)); // New state for GA Sales
  // Master Approval is initialized locally to demonstrate
  const [masterApprovalData, setMasterApprovalData] = useState<MasterApprovalRecord[]>([]); 
  const [complianceData, setComplianceData] = useState<ReminderRecord[]>(() => getInitialData('complianceData', MOCK_REMINDER_DATA));
  const [maintenanceScheduleData, setMaintenanceScheduleData] = useState<MaintenanceScheduleRecord[]>(() => getInitialData('maintenanceScheduleData', MOCK_MAINTENANCE_SCHEDULE_DATA));
  const [vehicleReminderData, setVehicleReminderData] = useState<VehicleReminderRecord[]>(() => getInitialData('vehicleReminderData', MOCK_VEHICLE_REMINDER_DATA));

  // NEW MODULES STATES
  const [lockerData, setLockerData] = useState<LockerRecord[]>(() => getInitialData('lockerData', MOCK_LOCKER_DATA));
  const [podData, setPodData] = useState<ModenaPodRecord[]>(() => getInitialData('podData', MOCK_POD_DATA));
  const [stockOpnameData, setStockOpnameData] = useState<StockOpnameRecord[]>(() => getInitialData('stockOpnameData', MOCK_STOCK_OPNAME_DATA));
  const [lockerRequestData, setLockerRequestData] = useState<LockerRequestRecord[]>(() => getInitialData('lockerRequestData', MOCK_LOCKER_REQUEST_DATA));
  const [podRequestData, setPodRequestData] = useState<PodRequestRecord[]>(() => getInitialData('podRequestData', MOCK_POD_REQUEST_DATA));
  const [masterPodData, setMasterPodData] = useState<MasterPodRecord[]>(() => getInitialData('masterPodData', MOCK_MASTER_POD_DATA));
  const [masterLockerGoodsData, setMasterLockerGoodsData] = useState<MasterLockerRecord[]>(() => getInitialData('masterLockerGoodsData', MOCK_MASTER_LOCKER_GOODS_DATA));
  const [masterLockerPantryData, setMasterLockerPantryData] = useState<MasterLockerRecord[]>(() => getInitialData('masterLockerPantryData', MOCK_MASTER_LOCKER_PANTRY_DATA));

  // INSURANCE STATES - Consolidated
  const [insuranceData, setInsuranceData] = useState<InsuranceRecord[]>(() => getInitialData('insuranceData', MOCK_INSURANCE_DATA));
  const [insuranceProviders, setInsuranceProviders] = useState<InsuranceProviderRecord[]>(() => getInitialData('insuranceProviders', MOCK_INSURANCE_PROVIDERS));

  // Aggregated Claims View (Flattened)
  const flattenedClaims = useMemo(() => {
      const claims: DisplayClaim[] = [];
      insuranceData.forEach(policy => {
          if (policy.claims) {
              policy.claims.forEach(claim => {
                  claims.push({
                      ...claim,
                      policyId: policy.id,
                      policyNumber: policy.policyNumber,
                      assetName: policy.assets && policy.assets.length > 0 ? policy.assets[0].name : (policy.assetName || 'Unknown'),
                      provider: policy.provider
                  });
              });
          }
      });
      return claims;
  }, [insuranceData]);

  // Aggregated Compliance Data (Automated)
  const aggregatedComplianceData = useMemo(() => {
      const reminders: ReminderRecord[] = [];
      reminders.push(...complianceData.map(c => ({...c, category: 'Legal' as const, source: 'Manual' as const})));
      return reminders;
  }, [complianceData]);

  // MASTER DATA STATES (Generic & Complex)
  const [masterItems, setMasterItems] = useState<MasterItem[]>(() => getInitialData('masterItems', MOCK_ATK_MASTER));
  const [masterArkItems, setMasterArkItems] = useState<MasterItem[]>(() => getInitialData('masterArkItems', MOCK_MASTER_ARK_DATA));
  const [deliveryLocations, setDeliveryLocations] = useState<DeliveryLocationRecord[]>(() => getInitialData('deliveryLocations', MOCK_DELIVERY_LOCATIONS));

  // --- GENERAL MASTERS (From MOCK_GENERAL_MASTER_DATA and others) ---
  const [masterPPN, setMasterPPN] = useState<GeneralMasterItem[]>(() => getInitialData('masterPPN', MOCK_PPN_DATA));
  const [masterBrandType, setMasterBrandType] = useState<GeneralMasterItem[]>(() => getInitialData('masterBrandType', MOCK_BRAND_TYPE_DATA));
  const [masterBrand, setMasterBrand] = useState<GeneralMasterItem[]>(() => getInitialData('masterBrand', MOCK_BRAND_DATA));
  const [masterOperator, setMasterOperator] = useState<GeneralMasterItem[]>(() => getInitialData('masterOperator', MOCK_OPERATOR_DATA));
  const [masterAssetType, setMasterAssetType] = useState<GeneralMasterItem[]>(() => getInitialData('masterAssetType', MOCK_GENERAL_ASSET_TYPE_DATA));
  const [masterDepartment, setMasterDepartment] = useState<GeneralMasterItem[]>(() => getInitialData('masterDepartment', MOCK_DEPARTMENT_DATA));
  const [masterLocation, setMasterLocation] = useState<GeneralMasterItem[]>(() => getInitialData('masterLocation', MOCK_LOCATION_DATA));
  const [masterUOM, setMasterUOM] = useState<GeneralMasterItem[]>(() => getInitialData('masterUOM', MOCK_UOM_MASTER_DATA));
  const [masterColor, setMasterColor] = useState<GeneralMasterItem[]>(() => getInitialData('masterColor', MOCK_COLOR_DATA));
  const [masterBuildingType, setMasterBuildingType] = useState<GeneralMasterItem[]>(() => getInitialData('masterBuildingType', MOCK_BUILDING_TYPE_DATA));
  const [masterCostCenter, setMasterCostCenter] = useState<GeneralMasterItem[]>(() => getInitialData('masterCostCenter', MOCK_COST_CENTER_DATA));
  const [masterAssetCategory, setMasterAssetCategory] = useState<GeneralMasterItem[]>(() => getInitialData('masterAssetCategory', MOCK_ASSET_CATEGORY_DATA));
  const [masterVehicleType, setMasterVehicleType] = useState<GeneralMasterItem[]>(() => getInitialData('masterVehicleType', MOCK_VEHICLE_TYPE_DATA));
  
  // --- NEW MASTER DATA STATES ---
  const [masterVehicleModel, setMasterVehicleModel] = useState<GeneralMasterItem[]>(() => getInitialData('masterVehicleModel', MOCK_VEHICLE_MODEL));
  const [masterBuildingComponents, setMasterBuildingComponents] = useState<GeneralMasterItem[]>(() => getInitialData('masterBuildingComponents', MOCK_BUILDING_COMPONENTS));
  const [masterDocumentTypes, setMasterDocumentTypes] = useState<GeneralMasterItem[]>(() => getInitialData('masterDocumentTypes', MOCK_DOCUMENT_TYPES));
  const [masterUtilityTypes, setMasterUtilityTypes] = useState<GeneralMasterItem[]>(() => getInitialData('masterUtilityTypes', MOCK_UTILITY_TYPES));

  // From MOCK_GENERAL_MASTER_DATA Object
  const [masterJenisPajak, setMasterJenisPajak] = useState<GeneralMasterItem[]>(() => getInitialData('masterJenisPajak', MOCK_GENERAL_MASTER_DATA.jenisPajak));
  const [masterJenisPembayaran, setMasterJenisPembayaran] = useState<GeneralMasterItem[]>(() => getInitialData('masterJenisPembayaran', MOCK_GENERAL_MASTER_DATA.jenisPembayaran));
  const [masterJenisServis, setMasterJenisServis] = useState<GeneralMasterItem[]>(() => getInitialData('masterJenisServis', MOCK_GENERAL_MASTER_DATA.jenisServis));
  const [masterStatusMutasi, setMasterStatusMutasi] = useState<GeneralMasterItem[]>(() => getInitialData('masterStatusMutasi', MOCK_GENERAL_MASTER_DATA.statusMutasi));
  const [masterStatusPenjualan, setMasterStatusPenjualan] = useState<GeneralMasterItem[]>(() => getInitialData('masterStatusPenjualan', MOCK_GENERAL_MASTER_DATA.statusPenjualan));
  const [masterStatusRequest, setMasterStatusRequest] = useState<GeneralMasterItem[]>(() => getInitialData('masterStatusRequest', MOCK_GENERAL_MASTER_DATA.statusRequest));
  const [masterTipeMutasi, setMasterTipeMutasi] = useState<GeneralMasterItem[]>(() => getInitialData('masterTipeMutasi', MOCK_GENERAL_MASTER_DATA.tipeMutasi));
  const [masterTipeVendor, setMasterTipeVendor] = useState<GeneralMasterItem[]>(() => getInitialData('masterTipeVendor', MOCK_GENERAL_MASTER_DATA.tipeVendor));
  const [masterRole, setMasterRole] = useState<GeneralMasterItem[]>(() => getInitialData('masterRole', MOCK_GENERAL_MASTER_DATA.peran));
  const [masterSyncBranchs, setMasterSyncBranchs] = useState<GeneralMasterItem[]>([]);
  const [masterSyncChannels, setMasterSyncChannels] = useState<GeneralMasterItem[]>([]);

  // MODAL STATES
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<string | null>(null);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('create');
  const [selectedItem, setSelectedItem] = useState<any>(null);

  // WORKFLOW ACTION MODAL STATE
  const [workflowModalOpen, setWorkflowModalOpen] = useState(false);
  const [pendingWorkflow, setPendingWorkflow] = useState<{
      item: any;
      action: 'Approve' | 'Reject' | 'Revise';
      module: string;
  } | null>(null);

  const [isImportExcelModalOpen, setIsImportExcelModalOpen] = useState(false);
  const [isCloseTransactionConfirmOpen, setIsCloseTransactionConfirmOpen] = useState(false);

  // Combined Asset List for General Asset Mutation/Sales & Insurance Linking
  const combinedGeneralAssets = useMemo(() => {
      const hc = buildingAssetData.map(i => ({...i, sourceCategory: 'Asset HC'}));
      const it = itBuildingData.map(i => ({...i, sourceCategory: 'Asset IT'}));
      const cs = csBuildingData.map(i => ({...i, sourceCategory: 'Customer Service'}));
      return [...hc, ...it, ...cs];
  }, [buildingAssetData, itBuildingData, csBuildingData]);

  // Combine all assets for Insurance linking
  const allAssetsForInsurance = useMemo(() => {
      return [...vehicleData, ...buildingData];
  }, [vehicleData, buildingData]);

  // Sync Data on Change (Persistence)
  useEffect(() => { localStorage.setItem('atkData', JSON.stringify(atkData)); }, [atkData]);
  useEffect(() => { localStorage.setItem('arkData', JSON.stringify(arkData)); }, [arkData]);
  useEffect(() => { localStorage.setItem('vehicleData', JSON.stringify(vehicleData)); }, [vehicleData]);
  useEffect(() => { localStorage.setItem('buildingData', JSON.stringify(buildingData)); }, [buildingData]);
  useEffect(() => { localStorage.setItem('insuranceData', JSON.stringify(insuranceData)); }, [insuranceData]);
  useEffect(() => { localStorage.setItem('insuranceProviders', JSON.stringify(insuranceProviders)); }, [insuranceProviders]);
  useEffect(() => { localStorage.setItem('podData', JSON.stringify(podData)); }, [podData]);
  useEffect(() => { localStorage.setItem('lockerData', JSON.stringify(lockerData)); }, [lockerData]);
  useEffect(() => { localStorage.setItem('stockOpnameData', JSON.stringify(stockOpnameData)); }, [stockOpnameData]);
  
  // Handler Helpers
  const openModal = (type: string, mode: 'create' | 'edit' | 'view' = 'create', item: any = null) => {
    setModalType(type);
    setModalMode(mode);
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType(null);
    setSelectedItem(null);
  };

  // General Save Handler (updates state based on modalType)
  const handleSaveData = (data: any) => {
    switch (modalType) {
      case 'VEHICLE':
        if (modalMode === 'create') setVehicleData([...vehicleData, { ...data, id: Date.now() }]);
        else setVehicleData(vehicleData.map(d => d.id === selectedItem.id ? { ...d, ...data } : d));
        break;
      case 'BUILDING':
        if (modalMode === 'create') setBuildingData([...buildingData, { ...data, id: `BLD-${Date.now()}` }]);
        else setBuildingData(buildingData.map(d => d.id === selectedItem.id ? { ...d, ...data } : d));
        break;
      case 'INSURANCE_POLICY':
        if (modalMode === 'create') setInsuranceData([...insuranceData, { ...data, id: `INS-${Date.now()}` }]);
        else setInsuranceData(insuranceData.map(d => d.id === selectedItem.id ? { ...d, ...data } : d));
        break;
      case 'INSURANCE_PROVIDER':
        if (modalMode === 'create') setInsuranceProviders([...insuranceProviders, { ...data, id: Date.now() }]);
        else setInsuranceProviders(insuranceProviders.map(d => d.id === selectedItem.id ? { ...d, ...data } : d));
        break;
      case 'COMPLIANCE':
        if (modalMode === 'create') setComplianceData([...complianceData, { ...data, id: `DOC-${Date.now()}` }]);
        else setComplianceData(complianceData.map(d => d.id === selectedItem.id ? { ...d, ...data } : d));
        break;
      // ... (Other cases)
      
      default:
        break;
    }
    closeModal();
  };

  const handleSaveMasterLocker = (data: Partial<MasterLockerRecord>) => {
    // ... same as before
    closeModal();
  };

  const handleInitiateWorkflow = (item: any, action: 'Approve' | 'Reject' | 'Revise', module: string) => {
      setPendingWorkflow({ item, action, module });
      setWorkflowModalOpen(true);
  };

  const handleConfirmWorkflow = (comment: string) => {
      if(pendingWorkflow) {
          const { module, action, item } = pendingWorkflow;
          const statusMap = { 'Approve': 'Approved', 'Reject': 'Rejected', 'Revise': 'Revised' };
          const newStatus = statusMap[action];

          if(module === 'VEHICLE') {
              setVehicleData(vehicleData.map(v => v.id === item.id ? { ...v, approvalStatus: newStatus } : v));
          } else if (module === 'BUILDING') {
              setBuildingData(buildingData.map(b => b.id === item.id ? { ...b, status: newStatus } : b));
          }
      }
      setWorkflowModalOpen(false);
      setPendingWorkflow(null);
  };

  // Renewal Logic
  const handleRenewPolicy = (policy: InsuranceRecord) => {
      // Create a copy for renewal, resetting dates and setting to draft/active
      const renewalData: Partial<InsuranceRecord> = {
          ...policy,
          id: undefined, // Will be new ID
          policyNumber: '', // Clear policy number for new entry
          startDate: policy.endDate, // Start where old one ends
          endDate: new Date(new Date(policy.endDate).setFullYear(new Date(policy.endDate).getFullYear() + 1)).toISOString().split('T')[0], // Default +1 year
          premium: '', // Clear premium as it likely changes
          status: 'Active',
          claims: [] // Clear history
      };
      
      openModal('INSURANCE_POLICY', 'create', renewalData);
  };

  // Claim Logic
  const handleSaveClaim = (policyId: string, claimData: InsuranceClaim) => {
      const updatedPolicies = insuranceData.map(policy => {
          if (policy.id === policyId) {
              const existingClaims = policy.claims || [];
              // Check if edit or create
              const existingIndex = existingClaims.findIndex(c => c.id === claimData.id);
              let newClaims;
              if (existingIndex >= 0) {
                  newClaims = [...existingClaims];
                  newClaims[existingIndex] = claimData;
              } else {
                  newClaims = [...existingClaims, claimData];
              }
              return { ...policy, claims: newClaims };
          }
          return policy;
      });
      setInsuranceData(updatedPolicies);
      closeModal();
  };

  const handleDeleteClaim = (policyId: string, claimId: string) => {
      if (window.confirm('Are you sure you want to delete this claim?')) {
          const updatedPolicies = insuranceData.map(policy => {
              if (policy.id === policyId) {
                  return { 
                      ...policy, 
                      claims: policy.claims?.filter(c => c.id !== claimId) || [] 
                  };
              }
              return policy;
          });
          setInsuranceData(updatedPolicies);
      }
  };

  // New filters for Pod
  const [podFilters, setPodFilters] = useState({ lantai: '', jenisKamar: '' });
  const filteredPodData = useMemo(() => {
      return podData.filter(p => {
          const matchesTab = activeTab === 'SEMUA' || activeTab === '' || p.lantai === activeTab;
          const matchesLantai = !podFilters.lantai || p.lantai === podFilters.lantai;
          const matchesJenisKamar = !podFilters.jenisKamar || p.jenisKamar === podFilters.jenisKamar;
          return matchesTab && matchesLantai && matchesJenisKamar;
      });
  }, [podData, activeTab, podFilters]);

  // Statistics for Pods
  const podStats = useMemo(() => {
    return podData.reduce((acc, curr) => ({
        pria: acc.pria + (curr.lantai.includes('Pria') ? 1 : 0),
        perempuan: acc.perempuan + (curr.lantai.includes('Perempuan') ? 1 : 0),
        total: acc.total + 1
    }), { pria: 0, perempuan: 0, total: 0 });
  }, [podData]);

  // Filtered Locker Data
  const filteredLockerData = useMemo(() => {
    if (activeTab === 'Terisi') return lockerData.filter(l => l.status === 'Terisi');
    if (activeTab === 'Kosong') return lockerData.filter(l => l.status === 'Kosong');
    if (activeTab === 'Kunci Hilang') return lockerData.filter(l => l.status === 'Kunci Hilang');
    return lockerData;
  }, [lockerData, activeTab]);

  const renderGeneralMasterPage = (title: string, data: GeneralMasterItem[], stateSetter: React.Dispatch<React.SetStateAction<GeneralMasterItem[]>>) => (
    <>
        <FilterBar tabs={['LIST']} activeTab="LIST" onTabChange={() => {}} onAddClick={() => openModal('GEN_MASTER', 'create', { title })} customAddLabel={`Add ${title}`} />
        <GeneralMasterTable 
            data={data} 
            title={title}
            onEdit={(item) => openModal('GEN_MASTER', 'edit', { ...item, title })} 
            onDelete={(id) => stateSetter(prev => prev.filter(i => i.id !== id))} 
        />
    </>
  );

  const renderModuleContent = () => {
    switch (activeModule) {
        case 'Dashboard': return (
            <div className="flex flex-col items-center justify-center h-full text-center p-10">
                <LayoutDashboard size={64} className="text-gray-200 mb-6" />
                <h2 className="text-xl font-black text-gray-300 uppercase tracking-widest">Dashboard Overview</h2>
                <p className="text-gray-400 mt-2">Statistics and charts will appear here.</p>
            </div>
        );
        
        // --- INSURANCE MANAGEMENT (NEW) ---
        case 'Insurance Dashboard': return <InsuranceDashboard data={insuranceData} />;
        case 'All Policies': 
        case 'Expiring Soon':
            return (
                <>
                    <FilterBar tabs={['SEMUA', 'ACTIVE', 'EXPIRING', 'EXPIRED']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('INSURANCE_POLICY', 'create')} customAddLabel="New Policy" />
                    <InsurancePolicyTable 
                        data={insuranceData} 
                        onView={(item) => openModal('INSURANCE_POLICY', 'view', item)} 
                        onEdit={(item) => openModal('INSURANCE_POLICY', 'edit', item)} 
                        onRenew={handleRenewPolicy}
                        onDelete={() => {}} 
                    />
                </>
            );
        case 'Insurance Providers':
            return (
                <>
                    <FilterBar tabs={['LIST']} activeTab="LIST" onTabChange={() => {}} onAddClick={() => openModal('INSURANCE_PROVIDER', 'create')} customAddLabel="Add Provider" />
                    <InsuranceProviderTable 
                        data={insuranceProviders}
                        onEdit={(item) => openModal('INSURANCE_PROVIDER', 'edit', item)}
                        onDelete={(id) => setInsuranceProviders(prev => prev.filter(p => p.id !== id))}
                    />
                </>
            );
        case 'Insurance Claims':
            return (
                <>
                    <FilterBar tabs={['SEMUA', 'PENDING', 'APPROVED', 'PAID']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('INSURANCE_CLAIM', 'create')} customAddLabel="New Claim" />
                    <InsuranceClaimTable 
                        data={flattenedClaims}
                        onEdit={(item) => openModal('INSURANCE_CLAIM', 'edit', item)}
                        onDelete={handleDeleteClaim}
                    />
                </>
            );

        // ... (Other cases)

        // --- GROUP 1: HARD ASSETS ---
        // Building
        case 'Daftar Gedung':
            return (
                <>
                    <FilterBar tabs={['SEMUA', 'PENDING', 'APPROVED', 'REJECTED']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('BUILDING', 'create')} customAddLabel="New Building" />
                    <BuildingTable 
                        data={buildingData} 
                        onEdit={(item) => openModal('BUILDING', 'edit', item)}
                        onView={(item) => openModal('BUILDING', 'view', item)}
                        onDelete={(id) => setBuildingData(prev => prev.filter(i => i.id !== id))}
                        onAction={(item, action) => handleInitiateWorkflow(item, action, 'BUILDING')}
                    />
                </>
            );
        case 'Utility Monitoring': return (
            <>
                <FilterBar tabs={['OVERVIEW', 'LISTRIK', 'AIR', 'INTERNET']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('UTILITY', 'create')} customAddLabel="Input Utilitas" />
                <UtilityTable data={utilityData} onEdit={(item) => openModal('UTILITY', 'edit', item)} onDelete={() => {}} onView={(item) => openModal('UTILITY', 'view', item)} />
            </>
        );
        // Removed Asuransi Gedung from here
        case 'Compliance & Legal': return (
            <>
                <FilterBar tabs={['SEMUA', 'URGENT', 'WARNING', 'SAFE']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('COMPLIANCE', 'create')} customAddLabel="Add Document" />
                <ReminderTable data={aggregatedComplianceData} onView={(item) => openModal('COMPLIANCE', 'view', item)} onDelete={() => {}} />
            </>
        );

        // Vehicle
        case 'Daftar Aset': return (
            <>
                <FilterBar tabs={['SEMUA', 'APPROVED', 'PENDING', 'REJECTED']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('VEHICLE', 'create')} customAddLabel="Request Vehicle" />
                <VehicleTable 
                    data={vehicleData} 
                    onEdit={(item) => openModal('VEHICLE', 'edit', item)} 
                    onView={(item) => openModal('VEHICLE', 'view', item)} 
                    onDelete={(id) => setVehicleData(prev => prev.filter(i => i.id !== id))}
                    onAction={(item, action) => handleInitiateWorkflow(item, action, 'VEHICLE')}
                />
            </>
        );
        // Removed Asuransi Kendaraan from here
        
        // ... (Rest of existing cases)

        default:
            return <div className="p-10 text-center text-gray-400 font-bold uppercase tracking-widest">Select a module from sidebar</div>;
    }
  };

  return (
    <div className="flex h-screen bg-[#FBFBFB]">
      <Sidebar 
        activeItem={activeModule} 
        onNavigate={setActiveModule} 
        isCollapsed={isSidebarCollapsed} 
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} 
        isMobileOpen={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
      />
      
      <div className={`flex-1 flex flex-col h-screen overflow-hidden relative transition-all duration-300 ${isSidebarCollapsed ? 'lg:ml-[90px]' : 'lg:ml-[280px]'}`}>
        <TopBar breadcrumbs={['Home', activeModule]} onMenuClick={() => setIsMobileMenuOpen(true)} />
        
        <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
            {renderModuleContent()}
        </main>
      </div>

      {/* Modals Layer */}
      {isModalOpen && (
        <>
            {modalType === 'VEHICLE' && <VehicleModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSaveData} initialData={selectedItem} mode={modalMode} branchList={masterLocation} channelList={masterDepartment} brandList={masterBrand} colorList={masterColor} />}
            {/* PASS EXISTING BUILDING DATA HERE */}
            {modalType === 'BUILDING' && <BuildingModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSaveData} initialData={selectedItem} mode={modalMode} buildingTypeList={masterBuildingType} existingBuildings={buildingData} />}
            
            {/* Unified Insurance Modal */}
            {modalType === 'INSURANCE_POLICY' && (
                <InsuranceModal 
                    isOpen={isModalOpen} 
                    onClose={closeModal} 
                    onSave={handleSaveData} 
                    initialData={selectedItem} 
                    mode={modalMode} 
                    assetList={allAssetsForInsurance}
                    category='Mixed' // Default to mixed, modal handles specific logic
                />
            )}

            {modalType === 'INSURANCE_PROVIDER' && (
                <InsuranceProviderModal 
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    onSave={handleSaveData}
                    initialData={selectedItem}
                    mode={modalMode as 'create' | 'edit'}
                />
            )}

            {modalType === 'INSURANCE_CLAIM' && (
                <InsuranceClaimModal 
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    onSave={handleSaveClaim}
                    initialData={selectedItem}
                    mode={modalMode as 'create' | 'edit'}
                    policies={insuranceData}
                />
            )}
            
            {/* ... Other modals ... */}
        </>
      )}

      {/* ... Confirmation Modals ... */}
      
    </div>
  );
};

export default App;
