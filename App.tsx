
import React, { useState, useMemo, useEffect } from 'react';
import { LayoutDashboard } from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { FilterBar } from './components/FilterBar';

// Tables
import { BuildingTable } from './components/BuildingTable';
import { UtilityTable } from './components/UtilityTable';
import { ReminderTable } from './components/ReminderTable';
import { VehicleTable } from './components/VehicleTable';
import { VehicleContractTable } from './components/VehicleContractTable';
import { ServiceLogTable } from './components/ServiceLogTable';
import { TaxKirTable } from './components/TaxKirTable';
import { VehicleReminderTable } from './components/VehicleReminderTable';
import { MutationTable } from './components/MutationTable';
import { SalesTable } from './components/SalesTable';
import { GeneralAssetTable } from './components/GeneralAssetTable';
import { BuildingMaintenanceTable } from './components/BuildingMaintenanceTable';
import { BuildingAssetTable } from './components/BuildingAssetTable';
import { MaintenanceReminderTable } from './components/MaintenanceReminderTable';
import { InsuranceDashboard } from './components/InsuranceDashboard';
import { InsurancePolicyTable } from './components/InsurancePolicyTable';
import { InsuranceProviderTable } from './components/InsuranceProviderTable';
import { InsuranceClaimTable, DisplayClaim } from './components/InsuranceClaimTable';
import { ModenaPodTable } from './components/ModenaPodTable';
import { PodRequestTable } from './components/PodRequestTable';
import { LockerTable } from './components/LockerTable';
import { LockerRequestTable } from './components/LockerRequestTable';
import { StockOpnameTable } from './components/StockOpnameTable';
import { StationeryRequestTable } from './components/StationeryRequestTable';
import { MasterAtkTable } from './components/MasterAtkTable';
import { LogBookTable } from './components/LogBookTable';
import { TimesheetTable } from './components/TimesheetTable';
import { VendorTable } from './components/VendorTable';
import { UserTable } from './components/UserTable';
import { MasterApprovalTable } from './components/MasterApprovalTable';
import { MasterVendorTable } from './components/MasterVendorTable';
import { GeneralMasterTable } from './components/GeneralMasterTable';
import { MasterModenaPodTable } from './components/MasterModenaPodTable';
import { MasterLockerTable } from './components/MasterLockerTable';

// Modals
import { VehicleModal } from './components/VehicleModal';
import { BuildingModal } from './components/BuildingModal';
import { AssetGeneralModal } from './components/AssetGeneralModal';
import { BuildingMaintenanceModal } from './components/BuildingMaintenanceModal';
import { InsuranceModal } from './components/InsuranceModal';
import { InsuranceProviderModal } from './components/InsuranceProviderModal';
import { InsuranceClaimModal } from './components/InsuranceClaimModal';
import { ServiceModal } from './components/ServiceModal';
import { TaxKirModal } from './components/TaxKirModal';
import { VehicleContractModal } from './components/VehicleContractModal';
import { MutationModal } from './components/MutationModal';
import { SalesModal } from './components/SalesModal';
import { ComplianceModal } from './components/ComplianceModal';
import { UtilityModal } from './components/UtilityModal';
import { AddStockModal } from './components/AddStockModal';
import { TimesheetModal } from './components/TimesheetModal';
import { LockerModal } from './components/LockerModal';
import { LockerRequestModal } from './components/LockerRequestModal';
import { PodCensusModal } from './components/PodCensusModal';
import { PodRequestModal } from './components/PodRequestModal';
import { UserModal } from './components/UserModal';
import { VendorModal } from './components/VendorModal';
import { MasterItemModal } from './components/MasterItemModal';
import { MasterApprovalModal } from './components/MasterApprovalModal';
import { GeneralMasterModal } from './components/GeneralMasterModal';
import { MaintenanceScheduleModal } from './components/MaintenanceScheduleModal';
import { VehicleReminderModal } from './components/VehicleReminderModal';

// Mock Data
import { 
  MOCK_BUILDING_DATA, MOCK_UTILITY_DATA, MOCK_BRANCH_IMPROVEMENT_DATA, 
  MOCK_REMINDER_DATA, MOCK_VEHICLE_DATA, MOCK_VEHICLE_CONTRACT_DATA, 
  MOCK_SERVICE_DATA, MOCK_TAX_KIR_DATA, MOCK_VEHICLE_REMINDER_DATA, 
  MOCK_MUTATION_DATA, MOCK_SALES_DATA, MOCK_GENERAL_ASSET_DATA, 
  MOCK_BUILDING_MAINTENANCE_DATA, MOCK_MAINTENANCE_SCHEDULE_DATA, 
  MOCK_INSURANCE_DATA, MOCK_INSURANCE_PROVIDERS, MOCK_POD_DATA, 
  MOCK_POD_REQUEST_DATA, MOCK_LOCKER_DATA, MOCK_LOCKER_REQUEST_DATA, 
  MOCK_STOCK_OPNAME_DATA, MOCK_DATA, MOCK_ARK_DATA, MOCK_MASTER_DATA, 
  MOCK_MASTER_ARK_DATA, MOCK_LOGBOOK_DATA, MOCK_TIMESHEET_DATA, 
  MOCK_VENDOR_DATA, MOCK_USER_DATA, MOCK_MASTER_VENDOR_DATA, 
  MOCK_GENERAL_MASTER_DATA, MOCK_BUILDING_ASSETS, 
  MOCK_MASTER_POD_DATA, MOCK_MASTER_LOCKER_GOODS_DATA, MOCK_MASTER_LOCKER_PANTRY_DATA,
  MOCK_BRAND_DATA, MOCK_COLOR_DATA, MOCK_DEPARTMENT_DATA, MOCK_LOCATION_DATA,
  MOCK_BUILDING_TYPE_DATA, MOCK_ASSET_CATEGORY_DATA, MOCK_VEHICLE_TYPE_DATA,
  MOCK_DOCUMENT_TYPES, MOCK_UTILITY_TYPES, MOCK_BRAND_TYPE_DATA, MOCK_COST_CENTER_DATA, 
  MOCK_UOM_MASTER_DATA, MOCK_OPERATOR_DATA, MOCK_GENERAL_ASSET_TYPE_DATA, MOCK_PPN_DATA
} from './constants';

import { InsuranceRecord, InsuranceClaim, GeneralMasterItem } from './types';

const App: React.FC = () => {
  const [activeModule, setActiveModule] = useState('Dashboard');
  const [activeTab, setActiveTab] = useState('SEMUA');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<string | null>(null);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('create');
  const [selectedItem, setSelectedItem] = useState<any>(null);

  // Data States
  const [buildingData, setBuildingData] = useState(MOCK_BUILDING_DATA);
  const [utilityData, setUtilityData] = useState(MOCK_UTILITY_DATA);
  const [branchImprovementData, setBranchImprovementData] = useState(MOCK_BRANCH_IMPROVEMENT_DATA);
  const [complianceData, setComplianceData] = useState(MOCK_REMINDER_DATA);
  const [vehicleData, setVehicleData] = useState(MOCK_VEHICLE_DATA);
  const [vehicleContractData, setVehicleContractData] = useState(MOCK_VEHICLE_CONTRACT_DATA);
  const [serviceData, setServiceData] = useState(MOCK_SERVICE_DATA);
  const [taxKirData, setTaxKirData] = useState(MOCK_TAX_KIR_DATA);
  const [vehicleReminderData, setVehicleReminderData] = useState(MOCK_VEHICLE_REMINDER_DATA);
  const [mutationData, setMutationData] = useState(MOCK_MUTATION_DATA);
  const [salesData, setSalesData] = useState(MOCK_SALES_DATA);
  const [generalAssetData, setGeneralAssetData] = useState(MOCK_GENERAL_ASSET_DATA);
  const [buildingMaintenanceData, setBuildingMaintenanceData] = useState(MOCK_BUILDING_MAINTENANCE_DATA);
  const [buildingAssetData, setBuildingAssetData] = useState(MOCK_BUILDING_ASSETS);
  const [maintenanceScheduleData, setMaintenanceScheduleData] = useState(MOCK_MAINTENANCE_SCHEDULE_DATA);
  const [insuranceData, setInsuranceData] = useState(MOCK_INSURANCE_DATA);
  const [insuranceProviders, setInsuranceProviders] = useState(MOCK_INSURANCE_PROVIDERS);
  const [podData, setPodData] = useState(MOCK_POD_DATA);
  const [podRequestData, setPodRequestData] = useState(MOCK_POD_REQUEST_DATA);
  const [lockerData, setLockerData] = useState(MOCK_LOCKER_DATA);
  const [lockerRequestData, setLockerRequestData] = useState(MOCK_LOCKER_REQUEST_DATA);
  const [stockOpnameData, setStockOpnameData] = useState(MOCK_STOCK_OPNAME_DATA);
  const [atkData, setAtkData] = useState(MOCK_DATA);
  const [arkData, setArkData] = useState(MOCK_ARK_DATA);
  const [masterAtkData, setMasterAtkData] = useState(MOCK_MASTER_DATA);
  const [masterArkData, setMasterArkData] = useState(MOCK_MASTER_ARK_DATA);
  const [logBookData, setLogBookData] = useState(MOCK_LOGBOOK_DATA);
  const [timesheetData, setTimesheetData] = useState(MOCK_TIMESHEET_DATA);
  const [vendorData, setVendorData] = useState(MOCK_VENDOR_DATA);
  const [userData, setUserData] = useState(MOCK_USER_DATA);
  const [masterVendorData, setMasterVendorData] = useState(MOCK_MASTER_VENDOR_DATA);
  
  const [insuranceReminders, setInsuranceReminders] = useState(MOCK_REMINDER_DATA.filter(r => r.category === 'Insurance'));

  // Flattened Claims for Table
  const flattenedClaims: DisplayClaim[] = useMemo(() => {
    return insuranceData.flatMap(policy => 
        (policy.claims || []).map(claim => ({
            ...claim,
            policyNumber: policy.policyNumber,
            assetName: policy.assets && policy.assets.length > 0 ? policy.assets[0].name : (policy.assetName || 'Unknown'),
            provider: policy.provider,
            policyId: policy.id
        }))
    );
  }, [insuranceData]);

  // General Master Data Mapping
  const generalMasters: Record<string, GeneralMasterItem[]> = {
      'Master Lokasi': MOCK_LOCATION_DATA,
      'Master Department': MOCK_DEPARTMENT_DATA,
      'Master Brand': MOCK_BRAND_DATA,
      'Master Warna': MOCK_COLOR_DATA,
      'Master Tipe Gedung': MOCK_BUILDING_TYPE_DATA,
      'Master Asset Type': MOCK_GENERAL_ASSET_TYPE_DATA,
      'Asset Category': MOCK_ASSET_CATEGORY_DATA,
      'Jenis Kendaraan': MOCK_VEHICLE_TYPE_DATA,
      'Jenis Servis': MOCK_GENERAL_MASTER_DATA.jenisServis,
      'Role': MOCK_GENERAL_MASTER_DATA.peran,
      'Master Satuan': MOCK_UOM_MASTER_DATA,
      'Master Cost Center': MOCK_COST_CENTER_DATA,
      'Master Brand Type': MOCK_BRAND_TYPE_DATA,
      'Master Operator': MOCK_OPERATOR_DATA,
      'Master PPN': MOCK_PPN_DATA,
      // Add missing mappings as needed
      'Master Tipe Dokumen': MOCK_DOCUMENT_TYPES,
      'Master Tipe Utilitas': MOCK_UTILITY_TYPES,
  };

  const openModal = (type: string, mode: 'create' | 'edit' | 'view' = 'create', item: any = null) => {
    setModalType(type);
    setModalMode(mode);
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
    setModalType(null);
  };

  const handleSaveData = (data: any) => {
    // Implement data saving logic here based on modalType
    console.log('Saving data:', data, 'Type:', modalType);
    closeModal();
  };

  const handleSaveClaim = (policyId: string, claim: InsuranceClaim) => {
      setInsuranceData(prev => prev.map(p => {
          if (p.id === policyId) {
              const existingClaims = p.claims || [];
              const claimIndex = existingClaims.findIndex(c => c.id === claim.id);
              let newClaims;
              if (claimIndex >= 0) {
                  newClaims = [...existingClaims];
                  newClaims[claimIndex] = claim;
              } else {
                  newClaims = [claim, ...existingClaims];
              }
              return { ...p, claims: newClaims };
          }
          return p;
      }));
      closeModal();
  };

  const handleRenewPolicy = (item: InsuranceRecord) => {
      openModal('INSURANCE_POLICY', 'create', { ...item, id: undefined, policyNumber: '', startDate: '', endDate: '' });
  };

  // Content Renderer
  const renderModuleContent = () => {
    switch (activeModule) {
        // --- DASHBOARD ---
        case 'Dashboard': return (
            <div className="flex flex-col items-center justify-center h-full text-center p-10">
                <LayoutDashboard size={64} className="text-gray-200 mb-6" />
                <h2 className="text-xl font-black text-gray-300 uppercase tracking-widest">Dashboard Overview</h2>
            </div>
        );

        // --- ASSET MANAGEMENT: GEDUNG ---
        case 'Daftar Gedung': return (
            <>
                <FilterBar tabs={['SEMUA', 'PENDING', 'APPROVED', 'REJECTED']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('BUILDING', 'create')} customAddLabel="New Building" />
                <BuildingTable data={buildingData} onEdit={(item) => openModal('BUILDING', 'edit', item)} onView={(item) => openModal('BUILDING', 'view', item)} onDelete={() => {}} onAction={(item, action) => {}} />
            </>
        );
        case 'Utility Monitoring': return (
            <>
                <FilterBar tabs={['OVERVIEW', 'LISTRIK', 'AIR', 'INTERNET']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('UTILITY', 'create')} customAddLabel="Input Utilitas" />
                <UtilityTable data={utilityData} onEdit={(item) => openModal('UTILITY', 'edit', item)} onDelete={() => {}} onView={(item) => openModal('UTILITY', 'view', item)} />
            </>
        );
        case 'Branch Improvement': return ( // Implemented Branch Improvement View
            <>
                <FilterBar tabs={['SEMUA', 'PENDING', 'ON PROGRESS', 'COMPLETED']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('BRANCH_IMPROVEMENT', 'create')} customAddLabel="New Improvement" />
                <BuildingTable data={branchImprovementData} onEdit={(item) => openModal('BRANCH_IMPROVEMENT', 'edit', item)} onView={(item) => openModal('BRANCH_IMPROVEMENT', 'view', item)} onDelete={() => {}} onAction={(item, action) => {}} />
            </>
        );
        case 'Compliance & Legal': return (
            <>
                <FilterBar tabs={['SEMUA', 'URGENT', 'WARNING', 'SAFE']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('COMPLIANCE', 'create')} customAddLabel="Add Document" />
                <ReminderTable data={complianceData} onView={(item) => openModal('COMPLIANCE', 'view', item)} onDelete={() => {}} />
            </>
        );
        
        // --- ASSET MANAGEMENT: KENDARAAN ---
        case 'Daftar Kendaraan': return (
            <>
                <FilterBar tabs={['SEMUA', 'APPROVED', 'PENDING', 'REJECTED']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('VEHICLE', 'create')} customAddLabel="Request Vehicle" />
                <VehicleTable data={vehicleData} onEdit={(item) => openModal('VEHICLE', 'edit', item)} onView={(item) => openModal('VEHICLE', 'view', item)} onDelete={() => {}} onAction={() => {}} />
            </>
        );
        case 'Kontrak Kendaraan': return (
            <>
                <FilterBar tabs={['SEMUA', 'ACTIVE', 'PENDING', 'EXPIRED']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('VEHICLE_CONTRACT', 'create')} customAddLabel="New Contract" />
                <VehicleContractTable data={vehicleContractData} onEdit={(item) => openModal('VEHICLE_CONTRACT', 'edit', item)} onView={(item) => openModal('VEHICLE_CONTRACT', 'view', item)} onDelete={() => {}} onAction={() => {}} />
            </>
        );
        case 'Servis': return (
            <>
                <FilterBar tabs={['SEMUA', 'SCHEDULED', 'IN PROGRESS', 'COMPLETED']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('SERVICE', 'create')} customAddLabel="Add Service" />
                <ServiceLogTable data={serviceData} onEdit={(item) => openModal('SERVICE', 'edit', item)} onView={(item) => openModal('SERVICE', 'view', item)} onDelete={() => {}} onAction={() => {}} />
            </>
        );
        case 'Pajak & KIR': return (
            <>
                <FilterBar tabs={['SEMUA', 'PROSES', 'SELESAI']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('TAX_KIR', 'create')} customAddLabel="Request Tax/KIR" />
                <TaxKirTable data={taxKirData} onEdit={(item) => openModal('TAX_KIR', 'edit', item)} onView={(item) => openModal('TAX_KIR', 'view', item)} onDelete={() => {}} onAction={() => {}} />
            </>
        );
        case 'Reminder Pajak & KIR': return (
            <>
                <FilterBar tabs={['SEMUA', 'CRITICAL', 'WARNING', 'SAFE']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('VEHICLE_REMINDER', 'create')} customAddLabel="Set Reminder" />
                <VehicleReminderTable data={vehicleReminderData} onEdit={(item) => openModal('VEHICLE_REMINDER', 'edit', item)} onDelete={(id) => setVehicleReminderData(prev => prev.filter(p => p.id !== id))} onAction={(item) => openModal('TAX_KIR', 'create', { noPolisi: item.noPolisi, jenis: item.type === 'KIR' ? 'KIR' : 'Pajak STNK' })} />
            </>
        );
        case 'Mutasi': return (
            <>
                <FilterBar tabs={['SEMUA', 'DRAFT', 'PENDING', 'APPROVED']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('MUTATION', 'create', { assetType: 'VEHICLE' })} customAddLabel="Mutasi Kendaraan" />
                <MutationTable data={mutationData.filter(m => m.assetType === 'VEHICLE')} onEdit={(item) => openModal('MUTATION', 'edit', item)} onView={(item) => openModal('MUTATION', 'view', item)} onDelete={() => {}} onAction={() => {}} />
            </>
        );
        case 'Penjualan': return (
            <>
                <FilterBar tabs={['SEMUA', 'OPEN BIDDING', 'SOLD']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('SALES', 'create', { assetType: 'VEHICLE' })} customAddLabel="Jual Kendaraan" />
                <SalesTable data={salesData.filter(s => s.assetType === 'VEHICLE')} onEdit={(item) => openModal('SALES', 'edit', item)} onView={(item) => openModal('SALES', 'view', item)} onDelete={() => {}} onAction={() => {}} />
            </>
        );

        // --- GENERAL ASSET ---
        case 'Asset HC': 
        case 'Asset IT':
        case 'Customer Service': 
            const categoryMap: any = { 'Asset HC': 'Asset HC', 'Asset IT': 'Asset IT', 'Customer Service': 'Customer Service' };
            const filteredGA = generalAssetData.filter(item => item.sourceCategory === categoryMap[activeModule]);
            return (
                <>
                    <FilterBar tabs={['SEMUA', 'APPROVED', 'PENDING']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('GENERAL_ASSET', 'create', { sourceCategory: categoryMap[activeModule] })} customAddLabel={`Add ${activeModule}`} />
                    <GeneralAssetTable data={filteredGA} onEdit={(item) => openModal('GENERAL_ASSET', 'edit', item)} onView={(item) => openModal('GENERAL_ASSET', 'view', item)} onDelete={() => {}} />
                </>
            );
        case 'Pemeliharaan Asset': return (
            <>
                <FilterBar tabs={['SEMUA', 'SCHEDULED', 'COMPLETED']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('BUILDING_MAINTENANCE', 'create')} customAddLabel="Maintenance Request" />
                <BuildingMaintenanceTable data={buildingMaintenanceData} onEdit={(item) => openModal('BUILDING_MAINTENANCE', 'edit', item)} onView={(item) => openModal('BUILDING_MAINTENANCE', 'view', item)} onAction={() => {}} onDelete={() => {}} />
            </>
        );
        case 'Reminder Pemeliharaan': return (
            <>
                <FilterBar tabs={['SEMUA', 'OVERDUE', 'WARNING', 'SAFE']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('MAINTENANCE_SCHEDULE', 'create')} customAddLabel="Set Schedule" />
                <MaintenanceReminderTable data={maintenanceScheduleData} onEdit={(item) => openModal('MAINTENANCE_SCHEDULE', 'edit', item)} onDelete={(id) => setMaintenanceScheduleData(prev => prev.filter(p => p.id !== id))} onAction={(item) => openModal('BUILDING_MAINTENANCE', 'create', { assetId: item.assetId })} />
            </>
        );
        case 'Mutasi Aset': return (
            <>
                <FilterBar tabs={['SEMUA', 'PENDING']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('MUTATION', 'create', { assetType: 'GENERAL_ASSET' })} customAddLabel="Mutasi Aset" />
                <MutationTable data={mutationData.filter(m => m.assetType === 'GENERAL_ASSET')} onEdit={(item) => openModal('MUTATION', 'edit', item)} onView={(item) => openModal('MUTATION', 'view', item)} onDelete={() => {}} onAction={() => {}} />
            </>
        );
        case 'Penjualan Aset': return (
            <>
                <FilterBar tabs={['SEMUA', 'OPEN BIDDING']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('SALES', 'create', { assetType: 'GENERAL_ASSET' })} customAddLabel="Jual Aset" />
                <SalesTable data={salesData.filter(s => s.assetType === 'GENERAL_ASSET')} onEdit={(item) => openModal('SALES', 'edit', item)} onView={(item) => openModal('SALES', 'view', item)} onDelete={() => {}} onAction={() => {}} />
            </>
        );

        // --- INSURANCE ---
        case 'Insurance Dashboard': return <InsuranceDashboard data={insuranceData} />;
        case 'All Policies': 
            return (
                <>
                    <FilterBar tabs={['SEMUA', 'ACTIVE', 'EXPIRING', 'EXPIRED']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('INSURANCE_POLICY', 'create')} customAddLabel="New Policy" />
                    <InsurancePolicyTable data={insuranceData} onView={(item) => openModal('INSURANCE_POLICY', 'view', item)} onEdit={(item) => openModal('INSURANCE_POLICY', 'edit', item)} onRenew={handleRenewPolicy} onDelete={() => {}} />
                </>
            );
        case 'Expiring Soon':
            return (
                <>
                    <FilterBar tabs={['SEMUA', 'URGENT', 'WARNING', 'EXPIRED']} activeTab={activeTab} onTabChange={setActiveTab} hideAdd={true} />
                    <ReminderTable data={insuranceReminders} onView={(item) => { const policy = insuranceData.find(i => i.id === item.id); if(policy) openModal('INSURANCE_POLICY', 'view', policy); }} onDelete={() => {}} />
                </>
            );
        case 'Insurance Providers':
            return (
                <>
                    <FilterBar tabs={['LIST']} activeTab="LIST" onTabChange={() => {}} onAddClick={() => openModal('INSURANCE_PROVIDER', 'create')} customAddLabel="Add Provider" />
                    <InsuranceProviderTable data={insuranceProviders} onEdit={(item) => openModal('INSURANCE_PROVIDER', 'edit', item)} onDelete={(id) => setInsuranceProviders(prev => prev.filter(p => p.id !== id))} />
                </>
            );
        case 'Insurance Claims':
            return (
                <>
                    <FilterBar tabs={['SEMUA', 'PENDING', 'APPROVED', 'PAID']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('INSURANCE_CLAIM', 'create')} customAddLabel="New Claim" />
                    <InsuranceClaimTable data={flattenedClaims} onEdit={(item) => openModal('INSURANCE_CLAIM', 'edit', item)} onDelete={() => {}} />
                </>
            );

        // --- FACILITY ---
        case 'Pod Census': return (
            <>
                <FilterBar tabs={['SEMUA', 'TERISI', 'KOSONG']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('POD_CENSUS', 'create')} customAddLabel="Update Census" />
                <ModenaPodTable data={podData} onEdit={(item) => openModal('POD_CENSUS', 'edit', item)} onView={(item) => openModal('POD_CENSUS', 'view', item)} />
            </>
        );
        case 'Request MODENA Pod': return (
            <>
                <FilterBar tabs={['SEMUA', 'PENDING', 'APPROVED']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('POD_REQUEST', 'create')} customAddLabel="Request Pod" />
                <PodRequestTable data={podRequestData} onView={(item) => openModal('POD_REQUEST', 'view', item)} />
            </>
        );
        case 'Daftar Loker': return (
            <>
                <FilterBar tabs={['SEMUA', 'TERISI', 'KOSONG']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('LOCKER', 'create')} customAddLabel="Register Locker" />
                <LockerTable data={lockerData} onEdit={(item) => openModal('LOCKER', 'edit', item)} onView={(item) => openModal('LOCKER', 'view', item)} />
            </>
        );
        case 'Request Locker': return (
            <>
                <FilterBar tabs={['SEMUA', 'PENDING']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('LOCKER_REQUEST', 'create')} customAddLabel="Request Locker" />
                <LockerRequestTable data={lockerRequestData} onView={(item) => openModal('LOCKER_REQUEST', 'view', item)} />
            </>
        );
        case 'Stock Opname': return (
            <>
                <FilterBar tabs={['SEMUA', 'COMPLETED', 'DRAFT']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => {}} customAddLabel="Start Opname" />
                <StockOpnameTable data={stockOpnameData} />
            </>
        );

        // --- ATK / ARK ---
        case 'Request ATK': return (
            <>
                <FilterBar tabs={['SEMUA', 'PENDING']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('ATK_REQUEST', 'create')} customAddLabel="Request ATK" />
                <StationeryRequestTable data={atkData} onView={(item) => openModal('ATK_REQUEST', 'view', item)} />
            </>
        );
        case 'Master ATK': return (
            <>
                <FilterBar tabs={['LIST']} activeTab="LIST" onTabChange={() => {}} onAddClick={() => openModal('MASTER_ATK', 'create', { moduleName: 'ATK' })} customAddLabel="Add ATK Item" />
                <MasterAtkTable data={masterAtkData} onEdit={(item) => openModal('MASTER_ATK', 'edit', item)} />
            </>
        );
        case 'Daftar ARK': return (
            <>
                <FilterBar tabs={['SEMUA', 'PENDING']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('ARK_REQUEST', 'create', { moduleName: 'ARK' })} customAddLabel="Request ARK" />
                <StationeryRequestTable data={arkData} onView={(item) => openModal('ARK_REQUEST', 'view', item)} />
            </>
        );
        case 'Master ARK': return (
            <>
                <FilterBar tabs={['LIST']} activeTab="LIST" onTabChange={() => {}} onAddClick={() => openModal('MASTER_ARK', 'create', { moduleName: 'ARK' })} customAddLabel="Add ARK Item" />
                <MasterAtkTable data={masterArkData} onEdit={(item) => openModal('MASTER_ARK', 'edit', item)} />
            </>
        );

        // --- OPERATIONS ---
        case 'Log Book': return (
            <>
                <FilterBar tabs={['SEMUA', 'VISITOR']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('LOGBOOK', 'create')} customAddLabel="Entry Log" />
                <LogBookTable data={logBookData} onEdit={(item) => openModal('LOGBOOK', 'edit', item)} onView={(item) => openModal('LOGBOOK', 'view', item)} />
            </>
        );
        case 'Timesheet': return (
            <>
                <FilterBar tabs={['SEMUA', 'TEPAT WAKTU']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('TIMESHEET', 'create')} customAddLabel="Add Log" />
                <TimesheetTable data={timesheetData} onEdit={(item) => openModal('TIMESHEET', 'edit', item)} onView={(item) => openModal('TIMESHEET', 'view', item)} onDelete={() => {}} />
            </>
        );

        // --- ADMIN ---
        case 'Vendor': return (
            <>
                <FilterBar tabs={['SEMUA', 'ACTIVE', 'INACTIVE']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('VENDOR', 'create')} customAddLabel="Add Vendor" />
                <VendorTable data={vendorData} onEdit={(item) => openModal('VENDOR', 'edit', item)} onView={(item) => openModal('VENDOR', 'view', item)} onDelete={() => {}} />
            </>
        );
        case 'Manajemen User': return (
            <>
                <FilterBar tabs={['SEMUA', 'ACTIVE']} activeTab={activeTab} onTabChange={setActiveTab} onAddClick={() => openModal('USER', 'create')} customAddLabel="Add User" />
                <UserTable data={userData} onEdit={(item) => openModal('USER', 'edit', item)} onView={(item) => openModal('USER', 'view', item)} onDelete={() => {}} />
            </>
        );
        case 'Master Approval': return (
            <>
                <FilterBar tabs={['ALL WORKFLOWS']} activeTab="ALL WORKFLOWS" onTabChange={() => {}} onAddClick={() => openModal('MASTER_APPROVAL', 'create')} customAddLabel="Add Workflow" />
                <MasterApprovalTable data={[]} onEdit={() => {}} onDelete={() => {}} />
            </>
        );
        case 'Master Vendor': return (
            <>
                <FilterBar tabs={['LIST']} activeTab="LIST" onTabChange={() => {}} onAddClick={() => openModal('MASTER_VENDOR', 'create')} customAddLabel="Add Master Vendor" />
                <MasterVendorTable data={masterVendorData} onEdit={(item) => openModal('MASTER_VENDOR', 'edit', item)} onView={(item) => openModal('MASTER_VENDOR', 'view', item)} />
            </>
        );

        // --- GENERIC MASTER DATA ---
        default:
            if (generalMasters[activeModule]) {
                return (
                    <>
                        <FilterBar tabs={['LIST']} activeTab="LIST" onTabChange={() => {}} onAddClick={() => openModal('GEN_MASTER', 'create', { title: activeModule })} customAddLabel={`Add ${activeModule}`} />
                        <GeneralMasterTable data={generalMasters[activeModule]} title={activeModule} onEdit={(item) => openModal('GEN_MASTER', 'edit', { ...item, title: activeModule })} onDelete={() => {}} />
                    </>
                );
            }
            return <div className="p-10 text-center text-gray-400 font-bold uppercase tracking-widest">Select a module from sidebar</div>;
    }
  };

  const allAssets = useMemo(() => [...vehicleData, ...buildingData], [vehicleData, buildingData]);

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
            {/* Asset Management */}
            {modalType === 'VEHICLE' && <VehicleModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSaveData} initialData={selectedItem} mode={modalMode} branchList={generalMasters['Master Lokasi']} channelList={generalMasters['Master Department']} brandList={generalMasters['Master Brand']} colorList={generalMasters['Master Warna']} />}
            {modalType === 'BUILDING' && <BuildingModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSaveData} initialData={selectedItem} mode={modalMode} buildingTypeList={generalMasters['Master Tipe Gedung']} existingBuildings={buildingData} />}
            {modalType === 'BRANCH_IMPROVEMENT' && <BuildingModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSaveData} initialData={selectedItem} mode={modalMode} buildingTypeList={generalMasters['Master Tipe Gedung']} existingBuildings={buildingData} />}
            {modalType === 'GENERAL_ASSET' && <AssetGeneralModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSaveData} initialData={selectedItem} mode={modalMode} assetTypeList={generalMasters['Master Asset Type']} categoryList={generalMasters['Asset Category']} locationList={generalMasters['Master Lokasi']} departmentList={generalMasters['Master Department']} />}
            {modalType === 'BUILDING_MAINTENANCE' && <BuildingMaintenanceModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSaveData} initialData={selectedItem} assetList={buildingAssetData} buildingList={buildingData} mode={modalMode} />}
            
            {/* Insurance */}
            {modalType === 'INSURANCE_POLICY' && <InsuranceModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSaveData} initialData={selectedItem} mode={modalMode} assetList={allAssets} />}
            {modalType === 'INSURANCE_PROVIDER' && <InsuranceProviderModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSaveData} initialData={selectedItem} mode={modalMode} />}
            {modalType === 'INSURANCE_CLAIM' && <InsuranceClaimModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSaveClaim} initialData={selectedItem} mode={modalMode} policies={insuranceData} />}
            
            {/* Operations & Requests */}
            {modalType === 'SERVICE' && <ServiceModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSaveData} initialData={selectedItem} mode={modalMode} vehicleList={vehicleData} serviceTypeList={generalMasters['Jenis Servis']} vendorList={vendorData} />}
            {modalType === 'TAX_KIR' && <TaxKirModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSaveData} initialData={selectedItem} mode={modalMode} vehicleList={vehicleData} channelList={generalMasters['Master Department']} branchList={generalMasters['Master Lokasi']} />}
            {modalType === 'VEHICLE_CONTRACT' && <VehicleContractModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSaveData} initialData={selectedItem} mode={modalMode} vehicleList={vehicleData} />}
            {modalType === 'MUTATION' && <MutationModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSaveData} initialData={selectedItem} mode={modalMode} vehicleList={vehicleData} generalAssetList={selectedItem?.assetType === 'VEHICLE' ? [] : generalAssetData} assetType={selectedItem?.assetType} />}
            {modalType === 'SALES' && <SalesModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSaveData} initialData={selectedItem} mode={modalMode} vehicleList={vehicleData} generalAssetList={generalAssetData} assetType={selectedItem?.assetType} />}
            {modalType === 'COMPLIANCE' && <ComplianceModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSaveData} initialData={selectedItem} mode={modalMode} buildingList={buildingData} />}
            {modalType === 'UTILITY' && <UtilityModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSaveData} initialData={selectedItem} mode={modalMode} buildingList={buildingData} />}
            
            {/* Consumables & Services */}
            {(modalType === 'ATK_REQUEST' || modalType === 'ARK_REQUEST') && <AddStockModal isOpen={isModalOpen} onClose={closeModal} moduleName={modalType === 'ARK_REQUEST' ? 'ARK' : 'ATK'} mode={modalMode} initialAssetData={selectedItem} />}
            {modalType === 'LOGBOOK' && <AddStockModal isOpen={isModalOpen} onClose={closeModal} moduleName="Log Book" mode={modalMode} initialLogBookData={selectedItem} />}
            {modalType === 'TIMESHEET' && <TimesheetModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSaveData} initialData={selectedItem} mode={modalMode} buildingList={buildingData} userList={userData} />}
            
            {/* Facility Services */}
            {modalType === 'LOCKER' && <LockerModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSaveData} initialData={selectedItem} mode={modalMode} />}
            {modalType === 'LOCKER_REQUEST' && <LockerRequestModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSaveData} initialData={selectedItem} mode={modalMode} currentUser={userData[0]} />}
            {modalType === 'POD_CENSUS' && <PodCensusModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSaveData} initialData={selectedItem} mode={modalMode} />}
            {modalType === 'POD_REQUEST' && <PodRequestModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSaveData} initialData={selectedItem} mode={modalMode} currentUser={userData[0]} />}

            {/* Masters */}
            {modalType === 'USER' && <UserModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSaveData} initialData={selectedItem} mode={modalMode} departmentList={generalMasters['Master Department']} locationList={generalMasters['Master Lokasi']} roleList={generalMasters['Role']} />}
            {modalType === 'VENDOR' && <VendorModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSaveData} initialData={selectedItem} mode={modalMode} />}
            {modalType === 'MASTER_ATK' && <MasterItemModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSaveData} initialData={selectedItem} moduleName="ATK" mode={modalMode} />}
            {modalType === 'MASTER_ARK' && <MasterItemModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSaveData} initialData={selectedItem} moduleName="ARK" mode={modalMode} />}
            {modalType === 'MASTER_VENDOR' && <VendorModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSaveData} initialData={selectedItem} mode={modalMode} />}
            {modalType === 'MASTER_APPROVAL' && <MasterApprovalModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSaveData} initialData={selectedItem} mode={modalMode} branchList={generalMasters['Master Lokasi']} roleList={generalMasters['Role']} userList={userData} />}
            {modalType === 'GEN_MASTER' && <GeneralMasterModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSaveData} initialData={selectedItem} title={selectedItem?.title || 'Master Data'} />}
            
            {/* New Reminder Modals */}
            {modalType === 'MAINTENANCE_SCHEDULE' && <MaintenanceScheduleModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSaveData} initialData={selectedItem} mode={modalMode} assetList={buildingAssetData} />}
            {modalType === 'VEHICLE_REMINDER' && <VehicleReminderModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSaveData} initialData={selectedItem} mode={modalMode} vehicleList={vehicleData} />}
        </>
      )}
    </div>
  );
};

export default App;
