
import React, { useState, useEffect } from 'react';
import { X, Save, Lock, User, MapPin, Briefcase, Info, Unlock, AlertCircle, ChevronDown } from 'lucide-react';
import { LockerRequestRecord, UserRecord } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<LockerRequestRecord>) => void;
  initialData?: LockerRequestRecord | null;
  mode?: 'create' | 'edit' | 'view';
  currentUser?: UserRecord;
}

export const LockerRequestModal: React.FC<Props> = ({ 
    isOpen, 
    onClose, 
    onSave, 
    initialData, 
    mode = 'create',
    currentUser 
}) => {
  const [form, setForm] = useState<Partial<LockerRequestRecord>>({
    requestDate: new Date().toISOString().split('T')[0],
    lockerNumber: '',
    floor: '',
    requestType: 'REQUEST LOKER BARU',
    requesterName: '',
    requesterRole: '',
    jobTitle: '',
    department: '',
    statusLocker: 'Kosong',
    status: 'Pending',
    reason: ''
  });

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setForm(initialData);
      } else {
        setForm({
            requestDate: new Date().toISOString().split('T')[0],
            lockerNumber: '001', // Example default from image
            floor: 'LANTAI 1',
            requestType: 'REQUEST LOKER BARU',
            requesterName: currentUser?.name || 'AAN JUNAIDI',
            requesterRole: currentUser?.role || 'TECHNICIAN',
            jobTitle: 'TEAM LEADER', // Mock default
            department: currentUser?.department || 'AFTER SALES',
            statusLocker: 'Kosong',
            status: 'Pending',
            reason: ''
        });
      }
    }
  }, [isOpen, initialData, currentUser]);

  if (!isOpen) return null;

  const isView = mode === 'view';

  const Label = ({ children }: { children?: React.ReactNode }) => (
    <label className="block text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2 ml-1">
      {children}
    </label>
  );

  const SectionHeader = ({ icon: Icon, title }: { icon: any, title: string }) => (
    <div className="flex items-center gap-3 mb-6">
        <Icon size={16} className="text-black" />
        <h3 className="text-[11px] font-black text-black uppercase tracking-[0.2em]">{title}</h3>
    </div>
  );

  const InputField = ({ label, value, onChange, placeholder, icon: Icon, disabled, className }: any) => (
    <div className={`mb-4 ${className}`}>
        <Label>{label}</Label>
        <div className="relative">
            <input 
                type="text"
                className="w-full bg-[#F8F9FA] border-none rounded-2xl px-5 py-4 pl-12 text-[12px] font-black text-black outline-none focus:ring-2 focus:ring-black/5 placeholder:text-gray-300 transition-all shadow-inner"
                placeholder={placeholder}
                value={value || ''}
                onChange={(e) => onChange(e.target.value)}
                disabled={disabled || isView}
            />
            {Icon && <Icon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />}
        </div>
    </div>
  );

  const handleStatusChange = (status: 'Terisi' | 'Kosong' | 'Kunci Hilang') => {
      if (isView) return;
      setForm(prev => ({ ...prev, statusLocker: status }));
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-[100] flex items-center justify-center backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-5xl rounded-[2rem] shadow-2xl overflow-hidden flex flex-col transform transition-all scale-100 max-h-[95vh] animate-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="px-10 py-8 bg-white border-b border-gray-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center text-white shadow-xl shadow-black/20">
                  <Lock size={20} strokeWidth={2.5} />
              </div>
              <div>
                  <h2 className="text-[16px] font-black text-black uppercase tracking-[0.2em] leading-none">
                    {mode === 'create' ? 'TAMBAH DATA PERMINTAAN LOKER' : 'DETAIL PERMINTAAN LOKER'}
                  </h2>
                  <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-widest">FORMULIR PENGAJUAN FASILITAS LOKER</p>
              </div>
          </div>
          <button onClick={onClose} className="text-gray-300 hover:text-black transition-all p-2 rounded-full hover:bg-gray-50">
            <X size={24} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-10 overflow-y-auto custom-scrollbar flex-1 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                
                {/* Left Column: INFORMASI DASAR */}
                <div className="p-2">
                    <SectionHeader icon={Info} title="INFORMASI DASAR" />
                    
                    <div className="space-y-6">
                        <InputField 
                            label="LOCKER NO" 
                            value={form.lockerNumber} 
                            onChange={(val: string) => setForm({...form, lockerNumber: val})}
                            placeholder="001"
                            icon={Lock}
                        />
                        
                        <InputField 
                            label="FLOOR / LOCATION" 
                            value={form.floor}
                            onChange={(val: string) => setForm({...form, floor: val})}
                            placeholder="LANTAI 1"
                            icon={MapPin}
                        />

                        <div className="mb-4">
                            <Label>TIPE REQUEST</Label>
                            <div className="relative">
                                <select 
                                    className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 text-[12px] font-black text-black outline-none focus:ring-2 focus:ring-black/5 appearance-none cursor-pointer uppercase shadow-sm"
                                    value={form.requestType}
                                    onChange={(e) => setForm({...form, requestType: e.target.value})}
                                    disabled={isView}
                                >
                                    <option value="REQUEST LOKER BARU">REQUEST LOKER BARU</option>
                                    <option value="PINDAH LOKER">PINDAH LOKER</option>
                                    <option value="PINJAM KUNCI CADANGAN LOKER">PINJAM KUNCI CADANGAN LOKER</option>
                                    <option value="LAPOR KUNCI HILANG">LAPOR KUNCI HILANG</option>
                                </select>
                                <ChevronDown size={16} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: OCCUPANT DETAILS */}
                <div className="p-2 border-l border-dashed border-gray-100 pl-12">
                    <SectionHeader icon={User} title="OCCUPANT DETAILS" />
                    
                    <div className="space-y-6">
                        <InputField 
                            label="NAMA PENGHUNI" 
                            value={form.requesterName} 
                            onChange={(val: string) => setForm({...form, requesterName: val})}
                            placeholder="AAN JUNAIDI"
                            icon={User}
                        />
                        
                        <InputField 
                            label="ROLE / POSITION" 
                            value={form.requesterRole} 
                            onChange={(val: string) => setForm({...form, requesterRole: val})}
                            placeholder="TECHNICIAN"
                            icon={Briefcase}
                        />

                        <div className="grid grid-cols-2 gap-6">
                            <div className="mb-4">
                                <Label>JABATAN</Label>
                                <div className="relative">
                                    <input 
                                        type="text"
                                        className="w-full bg-[#F8F9FA] border-none rounded-2xl px-5 py-4 text-[12px] font-black text-black outline-none focus:ring-2 focus:ring-black/5 placeholder:text-gray-300 transition-all shadow-inner"
                                        placeholder="TEAM LEADER"
                                        value={form.jobTitle || ''}
                                        onChange={(e) => setForm({...form, jobTitle: e.target.value})}
                                        disabled={isView}
                                    />
                                </div>
                            </div>
                            <div className="mb-4">
                                <Label>DEPARTMENT</Label>
                                <div className="relative">
                                    <input 
                                        type="text"
                                        className="w-full bg-[#F8F9FA] border-none rounded-2xl px-5 py-4 text-[12px] font-black text-black outline-none focus:ring-2 focus:ring-black/5 placeholder:text-gray-300 transition-all shadow-inner"
                                        placeholder="AFTER SALES"
                                        value={form.department || ''}
                                        onChange={(e) => setForm({...form, department: e.target.value})}
                                        disabled={isView}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* STATUS LOKER Section */}
            <div className="mt-12 pt-8 border-t border-gray-100">
                <SectionHeader icon={Lock} title="STATUS LOKER" />
                
                <div className="grid grid-cols-3 gap-6">
                    <button
                        onClick={() => handleStatusChange('Terisi')}
                        disabled={isView}
                        className={`h-32 rounded-[2rem] flex flex-col items-center justify-center gap-3 transition-all duration-300 border-2 ${
                            form.statusLocker === 'Terisi' 
                            ? 'bg-black text-white border-black shadow-xl scale-[1.02]' 
                            : 'bg-white text-gray-300 border-gray-100 hover:border-gray-200 hover:text-gray-400'
                        }`}
                    >
                        <Lock size={24} strokeWidth={2.5} />
                        <span className="text-[11px] font-black uppercase tracking-widest">TERISI</span>
                    </button>

                    <button
                        onClick={() => handleStatusChange('Kosong')}
                        disabled={isView}
                        className={`h-32 rounded-[2rem] flex flex-col items-center justify-center gap-3 transition-all duration-300 border-2 ${
                            form.statusLocker === 'Kosong' 
                            ? 'bg-[#10B981] text-white border-[#10B981] shadow-xl shadow-green-500/30 scale-[1.02]' 
                            : 'bg-white text-gray-300 border-gray-100 hover:border-gray-200 hover:text-gray-400'
                        }`}
                    >
                        <Unlock size={24} strokeWidth={2.5} />
                        <span className="text-[11px] font-black uppercase tracking-widest">KOSONG</span>
                    </button>

                    <button
                        onClick={() => handleStatusChange('Kunci Hilang')}
                        disabled={isView}
                        className={`h-32 rounded-[2rem] flex flex-col items-center justify-center gap-3 transition-all duration-300 border-2 ${
                            form.statusLocker === 'Kunci Hilang' 
                            ? 'bg-red-500 text-white border-red-500 shadow-xl shadow-red-500/30 scale-[1.02]' 
                            : 'bg-white text-gray-300 border-gray-100 hover:border-gray-200 hover:text-gray-400'
                        }`}
                    >
                        <AlertCircle size={24} strokeWidth={2.5} />
                        <span className="text-[11px] font-black uppercase tracking-widest">KUNCI HILANG</span>
                    </button>
                </div>
            </div>
        </div>

        {/* Footer */}
        <div className="px-10 py-8 bg-white border-t border-gray-100 flex justify-end gap-4 shrink-0">
          <button 
            onClick={onClose} 
            className="px-12 py-4 text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 hover:text-black transition-all"
          >
            BATAL
          </button>
          {!isView && (
            <button 
                onClick={() => onSave(form)} 
                className="px-16 py-4 text-[11px] font-black uppercase tracking-[0.2em] text-white bg-black rounded-2xl hover:bg-gray-900 shadow-2xl shadow-black/20 transition-all active:scale-95 flex items-center gap-3"
            >
                <Save size={18} strokeWidth={2.5} /> SIMPAN PERMINTAAN
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
