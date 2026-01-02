import React from 'react';
import { GeneralMasterTable } from '../../components/GeneralMasterTable';

const MasterBuildingAssetType: React.FC = () => (
  <GeneralMasterTable 
    category="BUILDING_ASSET_TYPE" 
    title="Master Tipe Aset Gedung" 
    description="Kelola data tipe aset gedung (AC, Genset, Lift, dll)"
  />
);

export default MasterBuildingAssetType;
