import React from 'react';
import { FileText } from 'lucide-react';

interface Props {
  title: string;
}

const PagePlaceholder: React.FC<Props> = ({ title }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-10">
      <FileText size={64} className="text-gray-200 mb-6" />
      <h2 className="text-xl font-black text-gray-300 uppercase tracking-widest">{title}</h2>
      <p className="text-gray-400 mt-2">Content will be implemented here.</p>
    </div>
  );
};

export default PagePlaceholder;
