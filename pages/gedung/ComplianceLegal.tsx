import React, { useState } from 'react';
import { FilterBar } from '../../components/FilterBar';
import { ReminderTable } from '../../components/ReminderTable';
import { ComplianceModal } from '../../components/ComplianceModal';
import { useAppContext } from '../../contexts/AppContext';

const ComplianceLegal: React.FC = () => {
  const { aggregatedComplianceData, complianceData, setComplianceData } = useAppContext();
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
      setComplianceData([...complianceData, { ...data, id: `DOC-${Date.now()}` }]);
    } else {
      setComplianceData(complianceData.map(d => d.id === selectedItem.id ? { ...d, ...data } : d));
    }
    setIsModalOpen(false);
  };

  return (
    <>
      <FilterBar
        tabs={['SEMUA', 'URGENT', 'WARNING', 'SAFE']}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onAddClick={() => openModal('create')}
        customAddLabel="Add Document"
      />
      <ReminderTable
        data={aggregatedComplianceData}
        onView={(item) => openModal('view', item)}
        onDelete={() => {}}
      />
      {isModalOpen && (
        <ComplianceModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          mode={modalMode}
          initialData={selectedItem}
        />
      )}
    </>
  );
};

export default ComplianceLegal;
