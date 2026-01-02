import React from 'react';
import { GeneralMasterTable } from '../../components/GeneralMasterTable';

const MasterBuildingType: React.FC = () => (
  <GeneralMasterTable 
    category="BUILDING_TYPE" 
    title="Master Tipe Gedung" 
    description="Kelola data tipe gedung"
  />
);

export default MasterBuildingType;
