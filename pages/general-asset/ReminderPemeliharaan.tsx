import React, { useState } from 'react';
import { FilterBar } from '../../components/FilterBar';
import { MaintenanceReminderTable } from '../../components/MaintenanceReminderTable';
import { useAppContext } from '../../contexts/AppContext';

const ReminderPemeliharaan: React.FC = () => {
  const { maintenanceScheduleData } = useAppContext();
  const [activeTab, setActiveTab] = useState('SEMUA');

  // Filter data based on active tab
  const filteredData = activeTab === 'SEMUA' 
    ? maintenanceScheduleData 
    : maintenanceScheduleData.filter(item => (item.status || '').toUpperCase() === activeTab);

  return (
    <>
      <FilterBar
        tabs={['SEMUA', 'URGENT', 'WARNING', 'SAFE']}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      <MaintenanceReminderTable
        data={filteredData}
        onAction={(item) => {
          // Handle create maintenance ticket
          console.log('Create ticket for:', item);
        }}
      />
    </>
  );
};

export default ReminderPemeliharaan;
