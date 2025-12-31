import React, { useState } from 'react';
import { FilterBar } from '../../components/FilterBar';
import { VehicleReminderTable } from '../../components/VehicleReminderTable';
import { useAppContext } from '../../contexts/AppContext';

const ReminderPajakKir: React.FC = () => {
  const { vehicleReminderData } = useAppContext();
  const [activeTab, setActiveTab] = useState('SEMUA');

  // Filter data based on active tab
  const filteredData = activeTab === 'SEMUA' 
    ? vehicleReminderData 
    : vehicleReminderData.filter(item => (item.status || '').toUpperCase() === activeTab);

  return (
    <>
      <FilterBar
        tabs={['SEMUA', 'URGENT', 'WARNING', 'SAFE']}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      <VehicleReminderTable
        data={filteredData}
        onAction={(item) => {
          // Handle renew action
          console.log('Renew:', item);
        }}
      />
    </>
  );
};

export default ReminderPajakKir;
