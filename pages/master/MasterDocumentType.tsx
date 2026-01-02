import React from 'react';
import { GeneralMasterTable } from '../../components/GeneralMasterTable';

const MasterDocumentType: React.FC = () => {
  return (
    <GeneralMasterTable
      category="DOCUMENT_TYPE"
      title="Master Tipe Dokumen"
      description="Kelola data tipe dokumen"
    />
  );
};

export default MasterDocumentType;
