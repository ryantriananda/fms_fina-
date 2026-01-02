import React from 'react';
import { GeneralMasterTable } from '../../components/GeneralMasterTable';

const MasterPaymentType: React.FC = () => {
  return (
    <GeneralMasterTable
      category="PAYMENT_TYPE"
      title="Jenis Pembayaran"
      description="Kelola data jenis pembayaran"
    />
  );
};

export default MasterPaymentType;
