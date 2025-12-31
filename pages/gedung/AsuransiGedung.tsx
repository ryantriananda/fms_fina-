import React, { useState } from 'react';
import { FilterBar } from '../../components/FilterBar';
import { InsuranceTable } from '../../components/InsuranceTable';
import { InsuranceModal } from '../../components/InsuranceModal';
import { useAppContext } from '../../contexts/AppContext';

const AsuransiGedung: React.FC = () => {
  const { buildingInsuranceData, setBuildingInsuranceData, buildingData } = useAppContext();
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
      setBuildingInsuranceData([...buildingInsuranceData, { ...data, id: `INS-B-${Date.now()}`, category: 'Building' }]);
    } else {
      setBuildingInsuranceData(buildingInsuranceData.map(d => d.id === selectedItem.id ? { ...d, ...data } : d));
    }
    setIsModalOpen(false);
  };

  return (
    <>
      <FilterBar
        tabs={['SEMUA', 'AKTIF', 'AKAN HABIS', 'EXPIRED']}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onAddClick={() => openModal('create')}
        customAddLabel="Polis Baru"
      />
      <InsuranceTable
        data={buildingInsuranceData}
        onView={(item) => openModal('view', item)}
        onEdit={(item) => openModal('edit', item)}
        onDelete={(id) => setBuildingInsuranceData(prev => prev.filter(i => i.id !== id))}
      />
      {isModalOpen && (
        <InsuranceModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          mode={modalMode}
          initialData={selectedItem}
          category="Building"
          assetList={buildingData}
        />
      )}
    </>
  );
};

export default AsuransiGedung;
