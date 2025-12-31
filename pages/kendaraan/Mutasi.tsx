import React, { useState } from 'react';
import { FilterBar } from '../../components/FilterBar';
import { MutationTable } from '../../components/MutationTable';
import { MutationModal } from '../../components/MutationModal';
import { useAppContext } from '../../contexts/AppContext';

const Mutasi: React.FC = () => {
  const { mutationData, setMutationData, vehicleData } = useAppContext();
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
      setMutationData([...mutationData, { ...data, id: `MUT-${Date.now()}`, assetType: 'VEHICLE' }]);
    } else {
      setMutationData(mutationData.map(d => d.id === selectedItem.id ? { ...d, ...data } : d));
    }
    setIsModalOpen(false);
  };

  const handleAction = (item: any, action: 'Approve' | 'Reject' | 'Revise') => {
    const statusMap = { 'Approve': 'Approved', 'Reject': 'Rejected', 'Revise': 'Revised' };
    setMutationData(mutationData.map(d => d.id === item.id ? { ...d, statusApproval: statusMap[action] } : d));
  };

  // Filter vehicle mutations only
  const vehicleMutations = mutationData.filter(m => m.assetType === 'VEHICLE' || !m.assetType);
  
  const filteredData = activeTab === 'SEMUA' 
    ? vehicleMutations 
    : vehicleMutations.filter(item => (item.status || '').toUpperCase() === activeTab);

  return (
    <>
      <FilterBar
        tabs={['SEMUA', 'PENDING', 'APPROVED', 'COMPLETED']}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onAddClick={() => openModal('create')}
        customAddLabel="New Mutation"
      />
      <MutationTable
        data={filteredData}
        onEdit={(item) => openModal('edit', item)}
        onView={(item) => openModal('view', item)}
        onDelete={(id) => setMutationData(prev => prev.filter(i => i.id !== id))}
        onAction={handleAction}
      />
      {isModalOpen && (
        <MutationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          mode={modalMode}
          initialData={selectedItem}
          assetType="VEHICLE"
          vehicleList={vehicleData}
        />
      )}
    </>
  );
};

export default Mutasi;
