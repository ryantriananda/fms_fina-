import React from 'react';
import { GeneralMasterTable } from '../../components/GeneralMasterTable';

const MasterInsuranceType: React.FC = () => (
  <GeneralMasterTable 
    category="INSURANCE_TYPE" 
    title="Master Tipe Asuransi" 
    description="Kelola data tipe asuransi"
  />
);

export default MasterInsuranceType;
