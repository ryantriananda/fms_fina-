import React, { useState } from 'react';
import { FilterBar } from '../../components/FilterBar';
import { BuildingTable } from '../../components/BuildingTable';
import { BuildingModal } from '../../components/BuildingModal';
import { useAppContext } from '../../contexts/AppContext';

const DaftarGedung: React.FC = () => {
  const { buildingData, setBuildingData } = useAppContext();
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
      setBuildingData([...buildingData, { ...data, id: `BLD-${Date.now()}` }]);
    } else {
      setBuildingData(buildingData.map(d => d.id === selectedItem.id ? { ...d, ...data } : d));
    }
    setIsModalOpen(false);
  };

  const handleAction = (item: any, action: 'Approve' | 'Reject' | 'Revise') => {
    const statusMap = { 'Approve': 'Approved', 'Reject': 'Rejected', 'Revise': 'Revised' };
    setBuildingData(buildingData.map(d => d.id === item.id ? { ...d, status: statusMap[action] } : d));
  };

  // Filter data based on active tab
  const filteredData = activeTab === 'SEMUA' 
    ? buildingData 
    : buildingData.filter(item => (item.status || '').toUpperCase() === activeTab);

  return (
    <>
      <FilterBar
        tabs={['SEMUA', 'PENDING', 'APPROVED', 'REJECTED']}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onAddClick={() => openModal('create')}
        customAddLabel="New Building"
      />
      <BuildingTable
        data={filteredData}
        onEdit={(item) => openModal('edit', item)}
        onView={(item) => openModal('view', item)}
        onDelete={(id) => setBuildingData(prev => prev.filter(i => i.id !== id))}
        onAction={handleAction}
      />
      {isModalOpen && (
        <BuildingModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          mode={modalMode}
          initialData={selectedItem}
          existingBuildings={buildingData}
        />
      )}
    </>
  );
};

export default DaftarGedung;
