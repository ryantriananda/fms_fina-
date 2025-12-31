import React, { useState } from 'react';
import { FilterBar } from '../../components/FilterBar';
import { StationeryRequestTable } from '../../components/StationeryRequestTable';
import { useAppContext } from '../../contexts/AppContext';

const HouseholdRequestApproval: React.FC = () => {
  const { arkData, setArkData } = useAppContext();
  const [activeTab, setActiveTab] = useState('PENDING');

  // Filter data based on active tab
  const filteredData = activeTab === 'SEMUA' 
    ? arkData 
    : arkData.filter(item => (item.status || '').toUpperCase() === activeTab);

  return (
    <>
      <FilterBar
        tabs={['SEMUA', 'PENDING', 'APPROVED', 'REJECTED']}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      <StationeryRequestTable
        data={filteredData}
        onView={(item) => {
          // View item details - could open modal
        }}
      />
    </>
  );
};

export default HouseholdRequestApproval;
