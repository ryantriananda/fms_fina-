import React from 'react';
import { GeneralMasterTable } from '../../components/GeneralMasterTable';

const MasterUtilityType: React.FC = () => (
  <GeneralMasterTable 
    category="UTILITY_TYPE" 
    title="Master Tipe Utilitas" 
    description="Kelola data tipe utilitas (Listrik, Air, Internet)"
  />
);

export default MasterUtilityType;
