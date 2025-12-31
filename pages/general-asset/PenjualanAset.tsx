import React, { useState, useMemo } from 'react';
import { FilterBar } from '../../components/FilterBar';
import { SalesTable } from '../../components/SalesTable';
import { SalesModal } from '../../components/SalesModal';
import { useAppContext } from '../../contexts/AppContext';

const PenjualanAset: React.FC = () => {
  const { gaSalesData, setGaSalesData, buildingAssetData, itBuildingData, csBuildingData } = useAppContext();
  
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
      setGaSalesData([...gaSalesData, { ...data, id: `SALE-GA-${Date.now()}`, assetType: 'GENERAL_ASSET' }]);
    } else {
      setGaSalesData(gaSalesData.map(d => d.id === selectedItem.id ? { ...d, ...data } : d));
    }
    setIsModalOpen(false);
  };

  return (
    <>
      <FilterBar
        tabs={['SEMUA', 'OPEN BIDDING', 'CLOSED', 'SOLD']}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onAddClick={() => openModal('create')}
        customAddLabel="New Sale"
      />
      <SalesTable
        data={gaSalesData}
        onEdit={(item) => openModal('edit', item)}
        onView={(item) => openModal('view', item)}
        onDelete={(id) => setGaSalesData(prev => prev.filter(i => i.id !== id))}
        onAction={() => {}}
      />
      {isModalOpen && (
        <SalesModal
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

export default PenjualanAset;
