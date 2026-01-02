import React from 'react';
import { GeneralMasterTable } from '../../components/GeneralMasterTable';

const MasterServiceCategory: React.FC = () => {
  return (
    <GeneralMasterTable
      category="SERVICE_CATEGORY"
      title="Jenis Servis"
      description="Kelola data jenis servis"
    />
  );
};

export default MasterServiceCategory;
