
import React from 'react';
import { LockerRecord } from '../types';
import { ChevronsUpDown, Eye, Pencil, Lock, MapPin, User, AlertCircle, CheckCircle, Key } from 'lucide-react';

interface Props {
  data: LockerRecord[];
  onEdit?: (item: LockerRecord) => void;
  onView?: (item: LockerRecord) => void;
}

export const LockerTable: React.FC<Props> = ({ data, onEdit, onView }) => {
  
  const getStatusBadge = (status: string) => {
      switch(status) {
          case 'Terisi': return <span className="bg-black text-white px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border border-black shadow-sm">Terisi</span>;
          case 'Kosong': return <span className="bg-green-500 text-white px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border border-green-600 shadow-sm">Kosong</span>;
          case 'Kunci Hilang': return <span className="bg-red-500 text-white px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border border-red-600 shadow-sm">Kunci Hilang</span>;
          default: return <span className="bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">Unknown</span>;
      }
  };

  return (
    <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden transition-all duration-500">
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full min-w-[1200px] text-left border-collapse">
          <thead>
            <tr className="bg-[#F2F2F2] border-b border-gray-200">
              <th className="p-6 pl-8 w-24 group cursor-pointer hover:bg-gray-200/50 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">LOCKER NO</span>
                  <ChevronsUpDown size={12} className="text-gray-300" />
                </div>
              </th>
              <th className="p-6 w-40 group cursor-pointer hover:bg-gray-200/50 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">FLOOR / LOCATION</span>
                  <ChevronsUpDown size={12} className="text-gray-300" />
                </div>
              </th>
              <th className="p-6 w-56 group cursor-pointer hover:bg-gray-200/50 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">OCCUPANT DETAILS</span>
                  <ChevronsUpDown size={12} className="text-gray-300" />
                </div>
              </th>
              <th className="p-6 w-40 group cursor-pointer hover:bg-gray-200/50 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">POSITION / DEPT</span>
                  <ChevronsUpDown size={12} className="text-gray-300" />
                </div>
              </th>
              <th className="p-6 w-32 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">SPARE KEY</th>
              <th className="p-6 w-32 text-[10px] font-black text-gray-400 uppercase tracking-widest">LAST UPDATE</th>
              <th className="p-6 w-32 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">STATUS</th>
              <th className="p-6 w-24 text-center pr-8 text-[10px] font-black text-gray-400 uppercase tracking-widest">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {data.map((item) => (
              <tr key={item.id} className="bg-white hover:bg-[#FDFDFD] transition-all group cursor-pointer" onClick={() => onView?.(item)}>
                <td className="p-6 pl-8">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-white shadow-lg shadow-black/20">
                            <Lock size={16} strokeWidth={2.5} />
                        </div>
                        <span className="font-black text-black text-[13px]">{item.lockerNumber}</span>
                    </div>
                </td>
                <td className="p-6">
                    <div className="flex flex-col gap-1">
                        <span className="text-[11px] font-black text-black uppercase">{item.floor}</span>
                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                            <MapPin size={10} /> {item.area || '-'}
                        </span>
                    </div>
                </td>
                <td className="p-6">
                    {item.assignedTo ? (
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center font-bold text-[10px] border-2 border-white shadow-sm overflow-hidden">
                                {item.assignedTo.charAt(0)}
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[12px] font-black text-black">{item.assignedTo}</span>
                                <span className="text-[9px] text-gray-400 font-bold uppercase">Active User</span>
                            </div>
                        </div>
                    ) : (
                        <span className="text-[11px] text-gray-400 italic font-medium">Vacant</span>
                    )}
                </td>
                <td className="p-6">
                    <span className="text-[11px] font-bold text-gray-600 uppercase">{item.department || '-'}</span>
                </td>
                <td className="p-6 text-center">
                    <span className={`text-[10px] font-black uppercase ${item.spareKeyStatus === 'Ada' ? 'text-black' : 'text-red-500'}`}>
                        {item.spareKeyStatus || 'Unknown'}
                    </span>
                </td>
                <td className="p-6">
                    <span className="text-[11px] font-mono font-medium text-gray-500">{item.lastAuditDate}</span>
                </td>
                <td className="p-6 text-center">
                    {getStatusBadge(item.status)}
                </td>
                <td className="p-6 text-center pr-8">
                    <button onClick={(e) => { e.stopPropagation(); onView?.(item); }} className="p-2 bg-black text-white hover:bg-gray-800 transition-all rounded-xl shadow-lg shadow-black/20 active:scale-95">
                        <Eye size={16} />
                    </button>
                </td>
              </tr>
            ))}
            {data.length === 0 && (
                <tr>
                    <td colSpan={8} className="p-24 text-center">
                        <div className="flex flex-col items-center opacity-30">
                            <Lock size={48} className="text-gray-400 mb-4" />
                            <p className="text-[11px] font-black uppercase tracking-[0.3em]">Data loker tidak ditemukan</p>
                        </div>
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
