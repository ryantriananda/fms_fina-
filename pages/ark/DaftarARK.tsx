import React, { useState } from 'react';
import { FilterBar } from '../../components/FilterBar';
import { StationeryRequestTable } from '../../components/StationeryRequestTable';
import { AddStockModal } from '../../components/AddStockModal';
import { useAppContext } from '../../contexts/AppContext';

const DaftarARK: React.FC = () => {
  const { arkData, setArkData } = useAppContext();
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
      setArkData([...arkData, { ...data, id: Date.now() }]);
    } else {
      setArkData(arkData.map(d => d.id === selectedItem.id ? { ...d, ...data } : d));
    }
    setIsModalOpen(false);
  };

  // Filter data based on active tab
  const filteredData = activeTab === 'SEMUA' 
    ? arkData 
    : arkData.filter(item => (item.status || '').toUpperCase() === activeTab);

  return (
    <>
      <FilterBar
        tabs={['SEMUA', 'PENDING', 'APPROVED', 'REJECTED']}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onAddClick={() => openModal('create')}
        customAddLabel="Request ARK"
      />
      <StationeryRequestTable
        data={filteredData}
        onView={(item) => openModal('view', item)}
      />
      {isModalOpen && (
        <AddStockModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          moduleName="ARK"
          onSaveStationeryRequest={handleSave}
          initialAssetData={selectedItem}
          mode={modalMode}
        />
      )}
    </>
  );
};

export default DaftarARK;
