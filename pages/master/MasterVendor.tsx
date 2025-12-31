import React, { useState } from 'react';
import { FilterBar } from '../../components/FilterBar';
import { MasterVendorTable } from '../../components/MasterVendorTable';
import { VendorModal } from '../../components/VendorModal';
import { useAppContext } from '../../contexts/AppContext';

const MasterVendor: React.FC = () => {
  const { masterVendorData, setMasterVendorData } = useAppContext();
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
      setMasterVendorData([...masterVendorData, { ...data, id: `MVD-${Date.now()}` }]);
    } else {
      setMasterVendorData(masterVendorData.map(d => d.id === selectedItem.id ? { ...d, ...data } : d));
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
        customAddLabel="New Vendor"
      />
      <MasterVendorTable
        data={masterVendorData}
        onEdit={(item) => openModal('edit', item)}
        onView={(item) => openModal('view', item)}
      />
      {isModalOpen && (
        <VendorModal
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

export default MasterVendor;
