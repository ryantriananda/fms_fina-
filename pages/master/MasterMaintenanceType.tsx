import React from 'react';
import { GeneralMasterTable } from '../../components/GeneralMasterTable';

const MasterMaintenanceType: React.FC = () => (
  <GeneralMasterTable 
    category="MAINTENANCE_TYPE" 
    title="Master Tipe Pemeliharaan" 
    description="Kelola data tipe pemeliharaan"
  />
);

export default MasterMaintenanceType;
