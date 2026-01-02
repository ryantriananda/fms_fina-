import React from 'react';
import { GeneralMasterTable } from '../../components/GeneralMasterTable';

const MasterVehicleModel: React.FC = () => {
  return (
    <GeneralMasterTable
      category="VEHICLE_MODEL"
      title="Master Model Kendaraan"
      description="Kelola data model kendaraan"
    />
  );
};

export default MasterVehicleModel;
