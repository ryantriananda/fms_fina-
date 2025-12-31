import React, { useState } from 'react';
import { FilterBar } from '../../components/FilterBar';
import { UtilityTable } from '../../components/UtilityTable';
import { UtilityModal } from '../../components/UtilityModal';
import { useAppContext } from '../../contexts/AppContext';

const UtilityMonitoring: React.FC = () => {
  const { utilityData, setUtilityData, buildingData } = useAppContext();
  const [activeTab, setActiveTab] = useState('OVERVIEW');
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
      setUtilityData([...utilityData, { ...data, id: `UTL-${Date.now()}` }]);
    } else {
      setUtilityData(utilityData.map(d => d.id === selectedItem.id ? { ...d, ...data } : d));
    }
    setIsModalOpen(false);
  };

  // Filter data based on active tab
  const filteredData = activeTab === 'OVERVIEW' 
    ? utilityData 
    : utilityData.filter(item => (item.type || '').toUpperCase().includes(activeTab));

  return (
    <>
      <FilterBar
        tabs={['OVERVIEW', 'LISTRIK', 'AIR', 'INTERNET']}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onAddClick={() => openModal('create')}
        customAddLabel="Input Utilitas"
      />
      <UtilityTable
        data={filteredData}
        onEdit={(item) => openModal('edit', item)}
        onView={(item) => openModal('view', item)}
        onDelete={(id) => setUtilityData(prev => prev.filter(i => i.id !== id))}
      />
      {isModalOpen && (
        <UtilityModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          mode={modalMode}
          initialData={selectedItem}
          buildingList={buildingData}
        />
      )}
    </>
  );
};

export default UtilityMonitoring;
