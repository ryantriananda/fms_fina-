import React from 'react';
import { GeneralMasterTable } from '../../components/GeneralMasterTable';

const MasterOperator: React.FC = () => {
  return (
    <GeneralMasterTable
      category="OPERATOR"
      title="Master Operator"
      description="Kelola data operator"
    />
  );
};

export default MasterOperator;
