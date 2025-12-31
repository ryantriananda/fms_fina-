import React, { useState } from 'react';
import { FilterBar } from '../components/FilterBar';
import { TimesheetTable } from '../components/TimesheetTable';
import { TimesheetModal } from '../components/TimesheetModal';
import { useAppContext } from '../contexts/AppContext';

const Timesheet: React.FC = () => {
  const { timesheetData, setTimesheetData, buildingData, userData } = useAppContext();
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
      setTimesheetData([...timesheetData, { ...data, id: `TS-${Date.now()}` }]);
    } else {
      setTimesheetData(timesheetData.map(d => d.id === selectedItem.id ? { ...d, ...data } : d));
    }
    setIsModalOpen(false);
  };

  return (
    <>
      <FilterBar
        tabs={['SEMUA', 'PENDING', 'APPROVED']}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onAddClick={() => openModal('create')}
        customAddLabel="New Entry"
      />
      <TimesheetTable
        data={timesheetData}
        onEdit={(item) => openModal('edit', item)}
        onView={(item) => openModal('view', item)}
        onDelete={(id) => setTimesheetData(prev => prev.filter(i => i.id !== id))}
      />
      {isModalOpen && (
        <TimesheetModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          mode={modalMode}
          initialData={selectedItem}
          buildingList={buildingData}
          userList={userData}
        />
      )}
    </>
  );
};

export default Timesheet;
