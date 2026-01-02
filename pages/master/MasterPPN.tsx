import React from 'react';
import { GeneralMasterTable } from '../../components/GeneralMasterTable';

const MasterPPN: React.FC = () => (
  <GeneralMasterTable 
    category="PPN" 
    title="Master PPN" 
    description="Kelola data Pajak Pertambahan Nilai"
    showValue={true}
    valueLabel="Persentase (%)"
  />
);

export default MasterPPN;
