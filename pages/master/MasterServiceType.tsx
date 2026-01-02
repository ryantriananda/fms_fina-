import React from 'react';
import { GeneralMasterTable } from '../../components/GeneralMasterTable';

const MasterServiceType: React.FC = () => (
  <GeneralMasterTable 
    category="SERVICE_TYPE" 
    title="Master Tipe Servis" 
    description="Kelola data tipe servis kendaraan"
  />
);

export default MasterServiceType;
