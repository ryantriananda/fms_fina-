import React from 'react';
import { GeneralMasterTable } from '../../components/GeneralMasterTable';

const MasterUOM: React.FC = () => (
  <GeneralMasterTable 
    category="UOM" 
    title="Master Satuan" 
    description="Kelola data satuan (Unit of Measure)"
  />
);

export default MasterUOM;
