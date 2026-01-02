import React from 'react';
import { GeneralMasterTable } from '../../components/GeneralMasterTable';

const MasterBuildingComponent: React.FC = () => {
  return (
    <GeneralMasterTable
      category="BUILDING_COMPONENT"
      title="Master Komponen Bangunan"
      description="Kelola data komponen bangunan"
    />
  );
};

export default MasterBuildingComponent;
