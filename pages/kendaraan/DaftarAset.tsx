import React, { useState } from 'react';
import { FilterBar } from '../../components/FilterBar';
import { VehicleTable } from '../../components/VehicleTable';
import { VehicleModal } from '../../components/VehicleModal';
import { useAppContext } from '../../contexts/AppContext';

const DaftarAset: React.FC = () => {
  const { vehicleData, setVehicleData } = useAppContext();
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
      setVehicleData([...vehicleData, { ...data, id: Date.now(), approvalStatus: 'Pending' }]);
    } else {
      setVehicleData(vehicleData.map(d => d.id === selectedItem.id ? { ...d, ...data } : d));
    }
    setIsModalOpen(false);
  };

  const handleAction = (item: any, action: 'Approve' | 'Reject' | 'Revise') => {
    const statusMap = { 'Approve': 'Approved', 'Reject': 'Rejected', 'Revise': 'Revised' };
    setVehicleData(vehicleData.map(d => d.id === item.id ? { ...d, approvalStatus: statusMap[action] } : d));
  };

  // Filter data based on active tab
  const filteredData = activeTab === 'SEMUA' 
    ? vehicleData 
    : vehicleData.filter(item => (item.approvalStatus || 'Approved').toUpperCase() === activeTab);

  return (
    <>
      <FilterBar
        tabs={['SEMUA', 'APPROVED', 'PENDING', 'REJECTED']}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onAddClick={() => openModal('create')}
        customAddLabel="Request Vehicle"
      />
      <VehicleTable
        data={filteredData}
        onEdit={(item) => openModal('edit', item)}
        onView={(item) => openModal('view', item)}
        onDelete={(id) => setVehicleData(prev => prev.filter(i => i.id !== id))}
        onAction={handleAction}
      />
      {isModalOpen && (
        <VehicleModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          mode={modalMode}
          initialData={selectedItem}
        />
      )}
    </>
  );
};

export default DaftarAset;
