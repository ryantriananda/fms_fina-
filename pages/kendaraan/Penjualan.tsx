import React, { useState } from 'react';
import { FilterBar } from '../../components/FilterBar';
import { SalesTable } from '../../components/SalesTable';
import { SalesModal } from '../../components/SalesModal';
import { useAppContext } from '../../contexts/AppContext';

const Penjualan: React.FC = () => {
  const { salesData, setSalesData, vehicleData } = useAppContext();
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
      setSalesData([...salesData, { ...data, id: `SALE-${Date.now()}`, assetType: 'VEHICLE' }]);
    } else {
      setSalesData(salesData.map(d => d.id === selectedItem.id ? { ...d, ...data } : d));
    }
    setIsModalOpen(false);
  };

  const handleAction = (item: any, action: 'Approve' | 'Reject' | 'Revise') => {
    const statusMap = { 'Approve': 'Approved', 'Reject': 'Rejected', 'Revise': 'Revised' };
    setSalesData(salesData.map(d => d.id === item.id ? { ...d, statusApproval: statusMap[action] } : d));
  };

  // Filter vehicle sales only
  const vehicleSales = salesData.filter(s => s.assetType === 'VEHICLE' || !s.assetType);
  
  const filteredData = activeTab === 'SEMUA' 
    ? vehicleSales 
    : vehicleSales.filter(item => (item.status || '').toUpperCase().includes(activeTab.replace(' ', '')));

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
        data={filteredData}
        onEdit={(item) => openModal('edit', item)}
        onView={(item) => openModal('view', item)}
        onDelete={(id) => setSalesData(prev => prev.filter(i => i.id !== id))}
        onAction={handleAction}
      />
      {isModalOpen && (
        <SalesModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          mode={modalMode}
          initialData={selectedItem}
          assetType="VEHICLE"
          vehicleList={vehicleData}
        />
      )}
    </>
  );
};

export default Penjualan;
