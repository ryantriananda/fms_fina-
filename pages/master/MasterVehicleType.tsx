import React from 'react';
import { GeneralMasterTable } from '../../components/GeneralMasterTable';

const MasterVehicleType: React.FC = () => (
  <GeneralMasterTable 
    category="VEHICLE_TYPE" 
    title="Master Tipe Kendaraan" 
    description="Kelola data tipe kendaraan"
  />
);

export default MasterVehicleType;
