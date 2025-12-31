import React, { useState } from 'react';
import { FilterBar } from '../../components/FilterBar';
import { VehicleContractTable } from '../../components/VehicleContractTable';
import { VehicleContractModal } from '../../components/VehicleContractModal';
import { useAppContext } from '../../contexts/AppContext';

const KontrakKendaraan: React.FC = () => {
  const { vehicleContractData, setVehicleContractData, vehicleData } = useAppContext();
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
      setVehicleContractData([...vehicleContractData, { ...data, id: `CTR-${Date.now()}` }]);
    } else {
      setVehicleContractData(vehicleContractData.map(d => d.id === selectedItem.id ? { ...d, ...data } : d));
    }
    setIsModalOpen(false);
  };

  // Filter data based on active tab
  const filteredData = activeTab === 'SEMUA' 
    ? vehicleContractData 
    : vehicleContractData.filter(item => {
        const status = (item.status || '').toUpperCase();
        if (activeTab === 'ACTIVE') return status === 'ACTIVE' || status === 'AKTIF';
        if (activeTab === 'EXPIRING') return status === 'EXPIRING' || status === 'AKAN HABIS';
        if (activeTab === 'EXPIRED') return status === 'EXPIRED';
        return true;
      });

  return (
    <>
      <FilterBar
        tabs={['SEMUA', 'ACTIVE', 'EXPIRING', 'EXPIRED']}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onAddClick={() => openModal('create')}
        customAddLabel="New Contract"
      />
      <VehicleContractTable
        data={filteredData}
        onEdit={(item) => openModal('edit', item)}
        onView={(item) => openModal('view', item)}
        onDelete={(id) => setVehicleContractData(prev => prev.filter(i => i.id !== id))}
      />
      {isModalOpen && (
        <VehicleContractModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          mode={modalMode}
          initialData={selectedItem}
          vehicleList={vehicleData}
        />
      )}
    </>
  );
};

export default KontrakKendaraan;
