import React from 'react';
import { GeneralMasterTable } from '../../components/GeneralMasterTable';

const MasterLocation: React.FC = () => {
  return (
    <GeneralMasterTable
      category="LOCATION"
      title="Master Lokasi"
      description="Kelola data lokasi"
    />
  );
};

export default MasterLocation;
