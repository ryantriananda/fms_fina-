import React from 'react';
import { GeneralMasterTable } from '../../components/GeneralMasterTable';

const MasterTaxType: React.FC = () => {
  return (
    <GeneralMasterTable
      category="TAX_TYPE"
      title="Jenis Pajak"
      description="Kelola data jenis pajak"
      showValue={true}
      valueLabel="Persentase (%)"
    />
  );
};

export default MasterTaxType;
