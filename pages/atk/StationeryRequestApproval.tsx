import React, { useState } from 'react';
import { FilterBar } from '../../components/FilterBar';
import { StationeryRequestTable } from '../../components/StationeryRequestTable';
import { useAppContext } from '../../contexts/AppContext';

const StationeryRequestApproval: React.FC = () => {
  const { atkData, setAtkData } = useAppContext();
  const [activeTab, setActiveTab] = useState('PENDING');

  // Filter data based on active tab
  const filteredData = activeTab === 'SEMUA' 
    ? atkData 
    : atkData.filter(item => (item.status || '').toUpperCase() === activeTab);

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

export default StationeryRequestApproval;
