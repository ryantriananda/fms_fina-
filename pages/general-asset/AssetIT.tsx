import React, { useState } from 'react';
import { FilterBar } from '../../components/FilterBar';
import { BuildingAssetTable } from '../../components/BuildingAssetTable';
import { BuildingAssetItemModal } from '../../components/BuildingAssetItemModal';
import { useAppContext } from '../../contexts/AppContext';

const AssetIT: React.FC = () => {
  const { itBuildingData, setItBuildingData, buildingData, vendorData } = useAppContext();
  const [activeTab, setActiveTab] = useState('SEMUA');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('create');
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const openModal = (mode: 'create' | 'edit' | 'view', item: any = null) => {
    setModalMode(mode);
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleSave = (data: any) => {
    if (modalMode === 'create') {
      setItBuildingData([...itBuildingData, { ...data, id: `AST-IT-${Date.now()}`, approvalStatus: 'Pending Approval' as const }]);
    } else {
      setItBuildingData(itBuildingData.map(d => d.id === selectedItem.id ? { ...d, ...data } : d));
    }
    setIsModalOpen(false);
  };

  const handleAction = (item: any, action: 'Approve' | 'Reject' | 'Revise') => {
    const statusMap: Record<string, 'Approved' | 'Rejected' | 'Revised'> = { 'Approve': 'Approved', 'Reject': 'Rejected', 'Revise': 'Revised' };
    setItBuildingData(itBuildingData.map(d => d.id === item.id ? { ...d, approvalStatus: statusMap[action] } : d));
  };

  // Filter data based on active tab
  const filteredData = activeTab === 'SEMUA' 
    ? itBuildingData 
    : itBuildingData.filter(item => (item.status || '').toUpperCase() === activeTab);

  return (
    <>
      <FilterBar
        tabs={['SEMUA', 'GOOD', 'FAIR', 'CRITICAL']}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onAddClick={() => openModal('create')}
        customAddLabel="New IT Asset"
      />
      <BuildingAssetTable
        data={filteredData}
        onEdit={(item) => openModal('edit', item)}
        onView={(item) => openModal('view', item)}
        onDelete={(id) => setItBuildingData(prev => prev.filter(i => i.id !== id))}
        onAction={handleAction}
      />
      {isModalOpen && (
        <BuildingAssetItemModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          mode={modalMode}
          initialData={selectedItem}
          buildingList={buildingData}
          vendorList={vendorData}
        />
      )}
    </>
  );
};

export default AssetIT;
