import React from 'react';
import { GeneralMasterTable } from '../../components/GeneralMasterTable';

const MasterDepartment: React.FC = () => (
  <GeneralMasterTable 
    category="DEPARTMENT" 
    title="Master Departemen" 
    description="Kelola data departemen"
  />
);

export default MasterDepartment;
