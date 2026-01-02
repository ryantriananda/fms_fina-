
import React, { useState, useEffect } from 'react';
import { X, Save, Lock, User, MessageSquare, Key, MapPin } from 'lucide-react';
import { LockerRecord } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<LockerRecord>) => void;
  initialData?: LockerRecord | null;
  mode?: 'create' | 'edit' | 'view';
}

export const LockerModal: React.FC<Props> = ({ isOpen, onClose, onSave, initialData, mode = 'create' }) => {
  const [form, setForm] = useState<Partial<LockerRecord>>({
    lockerNumber: '',
    status: 'Kosong',
    spareKeyStatus: 'Ada',
    floor: 'Lantai 1',
    area: '-',
    lastAuditDate: new Date().toISOString().split('T')[0],
    remarks: ''
  });

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setForm(initialData);
      } else {
        setForm({
            lockerNumber: '',
            status: 'Kosong',
            spareKeyStatus: 'Ada',
            floor: 'Lantai 1',
            area: '-',
            lastAuditDate: new Date().toISOString().split('T')[0],
            remarks: ''
        });
      }
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const isView = mode === 'view';

  const Label = ({ children }: { children?: React.ReactNode }) => (
    <label className="block text-[9px] font-black text-gray-400 uppercase tracking-[0.1em] mb-1.5">
      {children}
    </label>
  );

  const handleStatusChange = (status: 'Terisi' | 'Kosong' | 'Kunci Hilang') => {
      if (isView) return;
      setForm(prev => ({ 
          ...prev, 
          status, 
          // Clear occupant if set to Empty or Lost Key
          assignedTo: status !== 'Terisi' ? undefined : prev.assignedTo,
          department: status !== 'Terisi' ? undefined : prev.department
      }));
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center backdrop-blur-[2px] p-4 animate-in fade-in duration-200">
      <div className="bg-[#F8F9FA] w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden flex flex-col transform transition-all scale-100 max-h-[90vh]">
        
        {/* Header */}
        <div className="px-8 py-6 bg-white border-b border-gray-100 flex items-center justify-between shrink-0">
          <div>
              <h2 className="text-[14px] font-black text-black uppercase tracking-[0.2em] leading-none">
                {mode === 'create' ? 'REGISTER NEW LOCKER' : 'LOCKER DETAILS'}
              </h2>
          </div>
          <button onClick={onClose} className="text-gray-300 hover:text-black transition-all p-1">
            <X size={20} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-8 overflow-y-auto custom-scrollbar flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Section 1: Locker Identification */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-full">
                    <div className="flex items-center gap-2 mb-6">
                        <Lock size={16} className="text-black" />
                        <h3 className="text-[11px] font-black text-black uppercase tracking-[0.2em]">LOCKER IDENTIFICATION</h3>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <Label>LOCKER NUMBER</Label>
                            <input 
                                type="text" 
                                disabled={isView}
                                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[12px] font-black text-black outline-none focus:border-black placeholder:text-gray-300 transition-all shadow-sm"
                                placeholder="e.g. S-2001"
                                value={form.lockerNumber}
                                onChange={(e) => setForm({...form, lockerNumber: e.target.value})}
                            />
                        </div>
                        <div>
                            <Label>SPARE KEY STATUS</Label>
                            <div className="relative">
                                <select 
                                    disabled={isView}
                                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[12px] font-black text-black outline-none focus:border-black appearance-none cursor-pointer shadow-sm"
                                    value={form.spareKeyStatus}
                                    onChange={(e) => setForm({...form, spareKeyStatus: e.target.value as any})}
                                >
                                    <option value="Ada">Ada</option>
                                    <option value="Tidak Ada">Tidak Ada</option>
                                </select>
                                <Key size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                            <Label>FLOOR LOCATION</Label>
                            <select 
                                disabled={isView}
                                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[12px] font-black text-black outline-none focus:border-black appearance-none cursor-pointer shadow-sm"
                                value={form.floor}
                                onChange={(e) => setForm({...form, floor: e.target.value})}
                            >
                                <option value="Lantai 1">Lantai 1</option>
                                <option value="Lantai 2">Lantai 2</option>
                                <option value="Lantai 3">Lantai 3</option>
                                <option value="Lantai 4">Lantai 4</option>
                            </select>
                        </div>
                        <div>
                            <Label>AREA / SUB LOCATION</Label>
                            <input 
                                type="text" 
                                disabled={isView}
                                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[12px] font-black text-black outline-none focus:border-black placeholder:text-gray-300 transition-all shadow-sm"
                                placeholder="-"
                                value={form.area}
                                onChange={(e) => setForm({...form, area: e.target.value})}
                            />
                        </div>
                    </div>

                    <div>
                        <Label>STATUS</Label>
                        <div className="flex gap-2 mt-1">
                            <button 
                                onClick={() => handleStatusChange('Kosong')}
                                className={`flex-1 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest border transition-all ${
                                    form.status === 'Kosong' ? 'bg-green-500 text-white border-green-600 shadow-md' : 'bg-white text-gray-400 border-gray-200 hover:border-green-500 hover:text-green-500'
                                }`}
                            >
                                KOSONG
                            </button>
                            <button 
                                onClick={() => handleStatusChange('Terisi')}
                                className={`flex-1 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest border transition-all ${
                                    form.status === 'Terisi' ? 'bg-white text-black border-black shadow-md' : 'bg-white text-gray-400 border-gray-200 hover:border-black hover:text-black'
                                }`}
                            >
                                TERISI
                            </button>
                            <button 
                                onClick={() => handleStatusChange('Kunci Hilang')}
                                className={`flex-1 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest border transition-all ${
                                    form.status === 'Kunci Hilang' ? 'bg-red-500 text-white border-red-600 shadow-md' : 'bg-white text-gray-400 border-gray-200 hover:border-red-500 hover:text-red-500'
                                }`}
                            >
                                KUNCI HILANG
                            </button>
                        </div>
                    </div>
                </div>

                {/* Section 2: Occupant Details */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-full flex flex-col">
                    <div className="flex items-center gap-2 mb-6">
                        <User size={16} className="text-black" />
                        <h3 className="text-[11px] font-black text-black uppercase tracking-[0.2em]">OCCUPANT DETAILS</h3>
                    </div>

                    {form.status === 'Terisi' ? (
                        <div className="flex-1 flex flex-col justify-center gap-4">
                            <div>
                                <Label>OCCUPANT NAME</Label>
                                <input 
                                    type="text" 
                                    disabled={isView}
                                    className="w-full bg-[#F8F9FA] border-none rounded-xl px-4 py-3 text-[12px] font-black text-black outline-none focus:ring-2 focus:ring-black/5"
                                    placeholder="Enter Employee Name"
                                    value={form.assignedTo || ''}
                                    onChange={(e) => setForm({...form, assignedTo: e.target.value})}
                                />
                            </div>
                            <div>
                                <Label>POSITION / DEPT</Label>
                                <input 
                                    type="text" 
                                    disabled={isView}
                                    className="w-full bg-[#F8F9FA] border-none rounded-xl px-4 py-3 text-[12px] font-black text-black outline-none focus:ring-2 focus:ring-black/5"
                                    placeholder="e.g. Finance / HR"
                                    value={form.department || ''}
                                    onChange={(e) => setForm({...form, department: e.target.value})}
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-gray-100 rounded-xl bg-gray-50/50 p-8 text-center">
                            <User size={32} className="text-gray-200 mb-3" />
                            <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">NO OCCUPANT ASSIGNED</p>
                        </div>
                    )}
                </div>

                {/* Section 3: Audit & Remarks (Full Width) */}
                <div className="md:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-2 mb-6">
                        <MessageSquare size={16} className="text-black" />
                        <h3 className="text-[11px] font-black text-black uppercase tracking-[0.2em]">AUDIT & REMARKS</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <Label>LAST AUDIT / UPDATE</Label>
                            <input 
                                type="date" 
                                disabled={isView}
                                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[12px] font-black text-black outline-none focus:border-black shadow-sm"
                                value={form.lastAuditDate}
                                onChange={(e) => setForm({...form, lastAuditDate: e.target.value})}
                            />
                        </div>
                        <div className="md:col-span-2">
                            <Label>REMARKS</Label>
                            <textarea 
                                disabled={isView}
                                rows={1}
                                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[12px] font-medium text-black outline-none focus:border-black placeholder:text-gray-300 shadow-sm resize-none"
                                placeholder="Maintenance notes, damage, or other info..."
                                value={form.remarks || ''}
                                onChange={(e) => setForm({...form, remarks: e.target.value})}
                            />
                        </div>
                    </div>
                </div>

            </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-5 bg-white border-t border-gray-100 flex justify-end gap-3 shrink-0">
          <button onClick={onClose} className="px-10 py-3 text-[11px] font-black uppercase tracking-widest text-gray-400 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:text-black transition-all">CANCEL</button>
          {!isView && (
            <button 
                onClick={() => onSave(form)} 
                className="px-12 py-3 text-[11px] font-black uppercase tracking-widest text-white bg-black rounded-xl hover:bg-gray-900 shadow-xl shadow-black/20 transition-all active:scale-95"
            >
                SAVE DATA
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
