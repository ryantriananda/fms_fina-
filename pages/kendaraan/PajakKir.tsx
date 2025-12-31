import React, { useState } from 'react';
import { FilterBar } from '../../components/FilterBar';
import { TaxKirTable } from '../../components/TaxKirTable';
import { TaxKirModal } from '../../components/TaxKirModal';
import { useAppContext } from '../../contexts/AppContext';

const PajakKir: React.FC = () => {
  const { taxKirData, setTaxKirData, vehicleData } = useAppContext();
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
      setTaxKirData([...taxKirData, { ...data, id: `TAX-${Date.now()}` }]);
    } else {
      setTaxKirData(taxKirData.map(d => d.id === selectedItem.id ? { ...d, ...data } : d));
    }
    setIsModalOpen(false);
  };

  // Filter data based on active tab
  const filteredData = activeTab === 'SEMUA' 
    ? taxKirData 
    : taxKirData.filter(item => (item.jenis || '').toUpperCase().includes(activeTab));

  return (
    <>
      <FilterBar
        tabs={['SEMUA', 'PAJAK', 'KIR']}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onAddClick={() => openModal('create')}
        customAddLabel="New Record"
      />
      <TaxKirTable
        data={filteredData}
        onEdit={(item) => openModal('edit', item)}
        onView={(item) => openModal('view', item)}
        onDelete={(id) => setTaxKirData(prev => prev.filter(i => i.id !== id))}
      />
      {isModalOpen && (
        <TaxKirModal
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

export default PajakKir;
