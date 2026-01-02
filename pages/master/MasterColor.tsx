import React from 'react';
import { GeneralMasterTable } from '../../components/GeneralMasterTable';

const MasterColor: React.FC = () => (
  <GeneralMasterTable 
    category="COLOR" 
    title="Master Warna" 
    description="Kelola data warna kendaraan"
  />
);

export default MasterColor;
