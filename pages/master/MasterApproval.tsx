import React, { useState } from 'react';
import { FilterBar } from '../../components/FilterBar';
import { MasterApprovalTable } from '../../components/MasterApprovalTable';
import { MasterApprovalModal } from '../../components/MasterApprovalModal';
import { useAppContext } from '../../contexts/AppContext';

const MasterApproval: React.FC = () => {
  const { masterApprovalData, setMasterApprovalData, masterRole } = useAppContext();
  const [activeTab, setActiveTab] = useState('LIST');
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
      setMasterApprovalData([...masterApprovalData, { ...data, id: `APR-${Date.now()}` }]);
    } else {
      setMasterApprovalData(masterApprovalData.map(d => d.id === selectedItem.id ? { ...d, ...data } : d));
    }
    setIsModalOpen(false);
  };

  return (
    <>
      <FilterBar
        tabs={['LIST']}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onAddClick={() => openModal('create')}
        customAddLabel="New Approval Flow"
      />
      <MasterApprovalTable
        data={masterApprovalData}
        onEdit={(item) => openModal('edit', item)}
        onDelete={(id) => setMasterApprovalData(prev => prev.filter(i => i.id !== id))}
      />
      {isModalOpen && (
        <MasterApprovalModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          mode={modalMode}
          initialData={selectedItem}
          roleList={masterRole}
        />
      )}
    </>
  );
};

export default MasterApproval;
