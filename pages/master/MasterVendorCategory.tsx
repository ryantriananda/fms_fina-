import React from 'react';
import { GeneralMasterTable } from '../../components/GeneralMasterTable';

const MasterVendorCategory: React.FC = () => (
  <GeneralMasterTable 
    category="VENDOR_CATEGORY" 
    title="Master Kategori Vendor" 
    description="Kelola data kategori vendor"
  />
);

export default MasterVendorCategory;
