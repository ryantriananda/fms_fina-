import React, { useState } from 'react';
import { FilterBar } from '../components/FilterBar';
import { LogBookTable } from '../components/LogBookTable';
import { AddStockModal } from '../components/AddStockModal';
import { useAppContext } from '../contexts/AppContext';

const LogBook: React.FC = () => {
  const { logBookData, setLogBookData } = useAppContext();
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
      setLogBookData([...logBookData, { ...data, id: `LB-${Date.now()}` }]);
    } else {
      setLogBookData(logBookData.map(d => d.id === selectedItem.id ? { ...d, ...data } : d));
    }
    setIsModalOpen(false);
  };

  return (
    <>
      <FilterBar
        tabs={['SEMUA', 'TODAY', 'THIS WEEK', 'THIS MONTH']}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onAddClick={() => openModal('create')}
        customAddLabel="New Guest"
      />
      <LogBookTable
        data={logBookData}
        onView={(item) => openModal('view', item)}
        onEdit={(item) => openModal('edit', item)}
      />
      {isModalOpen && (
        <AddStockModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          moduleName="Log Book"
          onSaveLogBook={handleSave}
          initialLogBookData={selectedItem}
          mode={modalMode}
        />
      )}
    </>
  );
};

export default LogBook;
