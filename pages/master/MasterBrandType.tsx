import React from 'react';
import { GeneralMasterTable } from '../../components/GeneralMasterTable';

const MasterBrandType: React.FC = () => {
  return (
    <GeneralMasterTable
      category="BRAND_TYPE"
      title="Master Tipe Brand"
      description="Kelola data tipe brand"
    />
  );
};

export default MasterBrandType;
