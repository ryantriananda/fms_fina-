import React from 'react';
import { GeneralMasterTable } from '../../components/GeneralMasterTable';

const MasterChannel: React.FC = () => (
  <GeneralMasterTable 
    category="CHANNEL" 
    title="Master Channel" 
    description="Kelola data channel bisnis"
  />
);

export default MasterChannel;
