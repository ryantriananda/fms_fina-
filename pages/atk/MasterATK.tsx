import React, { useState } from 'react';
import { FilterBar } from '../../components/FilterBar';
import { MasterAtkTable } from '../../components/MasterAtkTable';
import { MasterItemModal } from '../../components/MasterItemModal';
import { useAppContext } from '../../contexts/AppContext';

const MasterATK: React.FC = () => {
  const { masterItems, setMasterItems } = useAppContext();
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
      setMasterItems([...masterItems, { ...data, id: Date.now() }]);
    } else {
      setMasterItems(masterItems.map(d => d.id === selectedItem.id ? { ...d, ...data } : d));
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
        customAddLabel="Add Item"
      />
      <MasterAtkTable
        data={masterItems}
        onEdit={(item) => openModal('edit', item)}
      />
      {isModalOpen && (
        <MasterItemModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          mode={modalMode}
          initialData={selectedItem}
          moduleName="ATK"
        />
      )}
    </>
  );
};

export default MasterATK;
