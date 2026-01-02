import React from 'react';
import { GeneralMasterTable } from '../../components/GeneralMasterTable';

const MasterAssetCategory: React.FC = () => {
  return (
    <GeneralMasterTable
      category="ASSET_CATEGORY"
      title="Kategori Aset"
      description="Kelola data kategori aset"
    />
  );
};

export default MasterAssetCategory;
