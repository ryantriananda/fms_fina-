import React, { useState, useMemo } from 'react';
import { FilterBar } from '../../components/FilterBar';
import { MutationTable } from '../../components/MutationTable';
import { MutationModal } from '../../components/MutationModal';
import { useAppContext } from '../../contexts/AppContext';

const MutasiAset: React.FC = () => {
  const { gaMutationData, setGaMutationData, buildingAssetData, itBuildingData, csBuildingData } = useAppContext();
  
  // Combine all general assets with source category for filtering
  const combinedAssetList = useMemo(() => {
    return [
      ...buildingAssetData.map(a => ({ ...a, sourceCategory: 'Asset HC' })),
      ...itBuildingData.map(a => ({ ...a, sourceCategory: 'Asset IT' })),
      ...csBuildingData.map(a => ({ ...a, sourceCategory: 'Customer Service' })),
    ];
  }, [buildingAssetData, itBuildingData, csBuildingData]);
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
      setGaMutationData([...gaMutationData, { ...data, id: `MUT-GA-${Date.now()}`, assetType: 'GENERAL_ASSET' }]);
    } else {
      setGaMutationData(gaMutationData.map(d => d.id === selectedItem.id ? { ...d, ...data } : d));
    }
    setIsModalOpen(false);
  };

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
        data={gaMutationData}
        onEdit={(item) => openModal('edit', item)}
        onView={(item) => openModal('view', item)}
        onDelete={(id) => setGaMutationData(prev => prev.filter(i => i.id !== id))}
        onAction={() => {}}
      />
      {isModalOpen && (
        <MutationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          mode={modalMode}
          initialData={selectedItem}
          assetType="GENERAL_ASSET"
          generalAssetList={combinedAssetList}
        />
      )}
    </>
  );
};

export default MutasiAset;
