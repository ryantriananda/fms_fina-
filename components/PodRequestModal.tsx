
import React, { useState, useEffect } from 'react';
import { X, Send, Calendar, MapPin, User, MessageSquare, Bed, Save } from 'lucide-react';
import { PodRequestRecord, UserRecord } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<PodRequestRecord>) => void;
  initialData?: PodRequestRecord | null;
  mode?: 'create' | 'edit' | 'view';
  currentUser?: UserRecord;
}

export const PodRequestModal: React.FC<Props> = ({ 
    isOpen, 
    onClose, 
    onSave, 
    initialData, 
    mode = 'create',
    currentUser 
}) => {
  const [form, setForm] = useState<Partial<PodRequestRecord>>({
    requestDate: new Date().toISOString().split('T')[0],
    reason: '',
    floorPreference: 'No Preference',
    roomType: 'Single Bed',
    status: 'Pending'
  });

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setForm(initialData);
      } else {
        setForm({
            requestDate: new Date().toISOString().split('T')[0],
            reason: '',
            floorPreference: 'No Preference',
            roomType: 'Single Bed',
            status: 'Pending',
            requesterName: currentUser?.name || 'Unknown',
            department: currentUser?.department || 'General',
            requesterRole: currentUser?.role || 'Staff'
        });
      }
    }
  }, [isOpen, initialData, currentUser]);

  if (!isOpen) return null;

  const isView = mode === 'view';

  const Label = ({ children, icon: Icon }: { children?: React.ReactNode, icon?: any }) => (
    <div className="flex items-center gap-2 mb-2">
        {Icon && <Icon size={12} className="text-black" />}
        <label className="block text-[9px] font-black text-black uppercase tracking-[0.2em]">
            {children}
        </label>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center backdrop-blur-[2px] p-4 animate-in fade-in duration-200">
      <div className="bg-[#F8F9FA] w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden flex flex-col transform transition-all scale-100 max-h-[90vh]">
        
        {/* Header */}
        <div className="px-8 py-6 bg-white border-b border-gray-100 flex items-center justify-between shrink-0">
          <div>
              <h2 className="text-[14px] font-black text-black uppercase tracking-[0.2em] leading-none">
                {mode === 'create' ? 'SUBMIT POD ASSIGNMENT REQUEST' : 'POD REQUEST DETAILS'}
              </h2>
          </div>
          <button onClick={onClose} className="text-gray-300 hover:text-black transition-all p-1">
            <X size={20} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-8 overflow-y-auto custom-scrollbar flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Section 1: Application Info */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-full">
                    <div className="flex items-center gap-2 mb-6">
                        <Send size={16} className="text-black" />
                        <h3 className="text-[11px] font-black text-black uppercase tracking-[0.2em]">APPLICATION INFO</h3>
                    </div>
                    
                    <div className="space-y-4">
                        <div>
                            <Label>REQUEST DATE</Label>
                            <div className="relative">
                                <input 
                                    type="date" 
                                    disabled={isView}
                                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[12px] font-black text-black outline-none focus:border-black shadow-sm"
                                    value={form.requestDate}
                                    onChange={(e) => setForm({...form, requestDate: e.target.value})}
                                />
                                <Calendar size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label>FLOOR PREFERENCE</Label>
                                <select 
                                    disabled={isView}
                                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[12px] font-black text-black outline-none focus:border-black appearance-none cursor-pointer shadow-sm"
                                    value={form.floorPreference}
                                    onChange={(e) => setForm({...form, floorPreference: e.target.value})}
                                >
                                    <option value="No Preference">No Preference</option>
                                    <option value="Lt 2 Pria">Lt 2 Pria</option>
                                    <option value="Lt 2 Perempuan">Lt 2 Perempuan</option>
                                    <option value="Lt 3 Pria">Lt 3 Pria</option>
                                    <option value="Lt 3 Perempuan">Lt 3 Perempuan</option>
                                </select>
                            </div>
                            <div>
                                <Label>ROOM TYPE</Label>
                                <select 
                                    disabled={isView}
                                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[12px] font-black text-black outline-none focus:border-black appearance-none cursor-pointer shadow-sm"
                                    value={form.roomType}
                                    onChange={(e) => setForm({...form, roomType: e.target.value})}
                                >
                                    <option value="Single Bed">Single Bed</option>
                                    <option value="Double Bed">Double Bed</option>
                                    <option value="Quadruple Bed">Quadruple Bed</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section 2: Applicant Details */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-full flex flex-col">
                    <div className="flex items-center gap-2 mb-6">
                        <User size={16} className="text-black" />
                        <h3 className="text-[11px] font-black text-black uppercase tracking-[0.2em]">APPLICANT</h3>
                    </div>

                    <div className="flex-1 flex flex-col justify-center">
                        <div className="flex items-center gap-4 bg-[#F8F9FA] p-4 rounded-xl border border-gray-100">
                            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md">
                                <img 
                                    src={`https://ui-avatars.com/api/?name=${form.requesterName}&background=random`} 
                                    alt="Profile" 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <h4 className="text-[13px] font-black text-black uppercase tracking-tight">{form.requesterName}</h4>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest bg-white px-2 py-0.5 rounded border border-gray-100">
                                        {form.requesterRole || 'STAFF'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section 3: Reason for Stay (Full Width) */}
                <div className="md:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-2 mb-6">
                        <MessageSquare size={16} className="text-black" />
                        <h3 className="text-[11px] font-black text-black uppercase tracking-[0.2em]">REASON FOR STAY</h3>
                    </div>
                    
                    <div>
                        <textarea 
                            disabled={isView}
                            rows={4}
                            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[12px] font-medium text-black outline-none focus:border-black placeholder:text-gray-300 shadow-sm resize-none"
                            placeholder="Briefly explain the reason for your pod request..."
                            value={form.reason || ''}
                            onChange={(e) => setForm({...form, reason: e.target.value})}
                        />
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
