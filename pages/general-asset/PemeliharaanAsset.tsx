import React, { useState } from 'react';
import { FilterBar } from '../../components/FilterBar';
import { BuildingMaintenanceTable } from '../../components/BuildingMaintenanceTable';
import { BuildingMaintenanceModal } from '../../components/BuildingMaintenanceModal';
import { useAppContext } from '../../contexts/AppContext';

const PemeliharaanAsset: React.FC = () => {
  const { buildingMaintenanceData, setBuildingMaintenanceData, buildingAssetData, itBuildingData, csBuildingData } = useAppContext();
  const [activeTab, setActiveTab] = useState('SEMUA');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('create');
  const [selectedItem, setSelectedItem] = useState<any>(null);

  // Combine all assets for the modal
  const allAssets = [...buildingAssetData, ...itBuildingData, ...csBuildingData];

  const openModal = (mode: 'create' | 'edit' | 'view', item: any = null) => {
    setModalMode(mode);
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleSave = (data: any) => {
    if (modalMode === 'create') {
      setBuildingMaintenanceData([...buildingMaintenanceData, { ...data, id: `MNT-${Date.now()}` }]);
    } else {
      setBuildingMaintenanceData(buildingMaintenanceData.map(d => d.id === selectedItem.id ? { ...d, ...data } : d));
    }
    setIsModalOpen(false);
  };

  const handleAction = (item: any, action: 'Approve' | 'Reject' | 'Revise') => {
    const statusMap: Record<string, 'Approved' | 'Rejected' | 'Revised'> = { 'Approve': 'Approved', 'Reject': 'Rejected', 'Revise': 'Revised' };
    setBuildingMaintenanceData(buildingMaintenanceData.map(d => d.id === item.id ? { ...d, approvalStatus: statusMap[action] } : d));
  };

  // Filter data based on active tab
  const filteredData = activeTab === 'SEMUA' 
    ? buildingMaintenanceData 
    : buildingMaintenanceData.filter(item => (item.status || '').toUpperCase().includes(activeTab.replace(' ', '')));

  return (
    <>
      <FilterBar
        tabs={['SEMUA', 'SCHEDULED', 'IN PROGRESS', 'COMPLETED']}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onAddClick={() => openModal('create')}
        customAddLabel="New Maintenance"
      />
      <BuildingMaintenanceTable
        data={filteredData}
        onEdit={(item) => openModal('edit', item)}
        onView={(item) => openModal('view', item)}
        onDelete={(id) => setBuildingMaintenanceData(prev => prev.filter(i => i.id !== id))}
        onAction={handleAction}
      />
      {isModalOpen && (
        <BuildingMaintenanceModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          mode={modalMode}
          initialData={selectedItem}
          assetList={allAssets}
        />
      )}
    </>
  );
};

export default PemeliharaanAsset;
