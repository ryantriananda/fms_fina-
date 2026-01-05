
import React, { useRef, useState } from 'react';
import { X, UploadCloud, FileSpreadsheet, CheckCircle2 } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onImport: (file: File) => void;
  title: string;
}

export const ImportExcelModal: React.FC<Props> = ({ isOpen, onClose, onImport, title }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleImport = () => {
    if (selectedFile) {
      onImport(selectedFile);
      onClose();
      setSelectedFile(null);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col transform transition-all scale-100">
        
        <div className="px-10 py-8 bg-white border-b border-gray-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 shadow-sm border border-green-100">
              <FileSpreadsheet size={24} />
            </div>
            <div>
              <h2 className="text-[16px] font-black text-black uppercase tracking-tight leading-none">
                {title}
              </h2>
              <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-widest">Excel / CSV Import</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-300 hover:text-black transition-all p-2 rounded-full hover:bg-gray-50">
            <X size={24} />
          </button>
        </div>

        <div className="p-10">
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept=".xlsx, .xls, .csv" 
            onChange={handleFileChange} 
          />
          
          <div 
            onClick={() => fileInputRef.current?.click()}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`h-64 border-2 border-dashed rounded-[2rem] flex flex-col items-center justify-center cursor-pointer transition-all
              ${isDragging ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-black hover:bg-gray-50'}
              ${selectedFile ? 'border-green-500 bg-green-50/30' : ''}
            `}
          >
            {selectedFile ? (
              <div className="text-center animate-in zoom-in duration-300">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
                  <CheckCircle2 size={32} />
                </div>
                <p className="text-[12px] font-black text-black uppercase tracking-widest mb-1">{selectedFile.name}</p>
                <p className="text-[10px] font-bold text-gray-400">{(selectedFile.size / 1024).toFixed(2)} KB</p>
                <p className="text-[10px] font-bold text-green-600 mt-4 uppercase tracking-widest">Click to change file</p>
              </div>
            ) : (
              <div className="text-center p-8">
                <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm text-gray-400">
                  <UploadCloud size={32} />
                </div>
                <p className="text-[12px] font-black text-black uppercase tracking-widest mb-2">
                  {isDragging ? 'Drop file here' : 'Click or Drag file here'}
                </p>
                <p className="text-[10px] font-bold text-gray-400">Supports .xlsx, .xls, .csv</p>
              </div>
            )}
          </div>

          <div className="mt-6 flex justify-end gap-4">
            <button 
              onClick={onClose}
              className="px-8 py-4 bg-gray-50 text-gray-400 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-gray-100 hover:text-black transition-all"
            >
              Cancel
            </button>
            <button 
              onClick={handleImport}
              disabled={!selectedFile}
              className="px-10 py-4 bg-black text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-gray-900 transition-all shadow-xl shadow-black/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Start Import
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
