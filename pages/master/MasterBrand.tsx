import React from 'react';
import { GeneralMasterTable } from '../../components/GeneralMasterTable';

const MasterBrand: React.FC = () => (
  <GeneralMasterTable 
    category="BRAND" 
    title="Master Merek" 
    description="Kelola data merek kendaraan dan aset"
  />
);

export default MasterBrand;
