import React, { useState } from 'react';
import { FilterBar } from '../components/FilterBar';
import { UserTable } from '../components/UserTable';
import { UserModal } from '../components/UserModal';
import { useAppContext } from '../contexts/AppContext';

const ManajemenUser: React.FC = () => {
  const { userData, setUserData, masterDepartment, masterLocation, masterRole } = useAppContext();
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
      setUserData([...userData, { ...data, id: `USR-${Date.now()}` }]);
    } else {
      setUserData(userData.map(d => d.id === selectedItem.id ? { ...d, ...data } : d));
    }
    setIsModalOpen(false);
  };

  return (
    <>
      <FilterBar
        tabs={['SEMUA', 'ACTIVE', 'INACTIVE']}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onAddClick={() => openModal('create')}
        customAddLabel="New User"
      />
      <UserTable
        data={userData}
        onEdit={(item) => openModal('edit', item)}
        onView={(item) => openModal('view', item)}
        onDelete={(id) => setUserData(prev => prev.filter(i => i.id !== id))}
      />
      {isModalOpen && (
        <UserModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          mode={modalMode}
          initialData={selectedItem}
          departmentList={masterDepartment}
          locationList={masterLocation}
          roleList={masterRole}
        />
      )}
    </>
  );
};

export default ManajemenUser;
