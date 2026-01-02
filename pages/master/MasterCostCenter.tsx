import React from 'react';
import { GeneralMasterTable } from '../../components/GeneralMasterTable';

const MasterCostCenter: React.FC = () => {
  return (
    <GeneralMasterTable
      category="COST_CENTER"
      title="Master Cost Center"
      description="Kelola data cost center"
    />
  );
};

export default MasterCostCenter;
