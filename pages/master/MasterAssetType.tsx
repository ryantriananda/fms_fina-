import React from 'react';
import { GeneralMasterTable } from '../../components/GeneralMasterTable';

const MasterAssetType: React.FC = () => {
  return (
    <GeneralMasterTable
      category="ASSET_TYPE"
      title="Master Tipe Aset"
      description="Kelola data tipe aset"
    />
  );
};

export default MasterAssetType;
