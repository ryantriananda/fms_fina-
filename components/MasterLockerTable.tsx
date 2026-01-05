
import React from 'react';
import { MasterLockerRecord } from '../types';
import { ChevronsUpDown, Pencil, Lock, MapPin } from 'lucide-react';

interface Props {
  data: MasterLockerRecord[];
  title: string;
  onEdit: (item: MasterLockerRecord) => void;
}

export const MasterLockerTable: React.FC<Props> = ({ data, title, onEdit }) => {
  return (
    <div className="space-y-4">
        <h3 className="text-[14px] font-black text-black uppercase tracking-tight ml-1">{title}</h3>
        <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden transition-all duration-500">
        <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full min-w-[1000px] text-left border-collapse">
            <thead>
                <tr className="bg-[#F2F2F2] border-b border-gray-200">
                <th className="p-6 pl-8 w-16 text-center text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">#</th>
                <th className="p-6 w-40 text-[10px] font-black text-gray-400 uppercase tracking-widest">LOCKER NO</th>
                <th className="p-6 w-48 text-[10px] font-black text-gray-400 uppercase tracking-widest">FLOOR</th>
                <th className="p-6 w-40 text-[10px] font-black text-gray-400 uppercase tracking-widest">TYPE</th>
                <th className="p-6 w-40 text-[10px] font-black text-gray-400 uppercase tracking-widest">STATUS</th>
                <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">REMARKS</th>
                <th className="p-6 w-24 text-center pr-8 text-[10px] font-black text-gray-400 uppercase tracking-widest">ACTION</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-[12px] text-gray-700">
                {data.map((item, index) => (
                <tr key={item.id} className="bg-white hover:bg-[#FDFDFD] transition-all group">
                    <td className="p-6 text-center font-bold text-gray-300 pl-8">{index + 1}</td>
                    <td className="p-6">
                        <div className="flex items-center gap-2">
                            <Lock size={14} className="text-gray-400" />
                            <span className="font-black text-black">{item.lockerNumber}</span>
                        </div>
                    </td>
                    <td className="p-6">
                        <div className="flex items-center gap-2">
                            <MapPin size={14} className="text-gray-400" />
                            <span className="font-medium">{item.floor}</span>
                        </div>
                    </td>
                    <td className="p-6 uppercase font-bold text-gray-600">{item.type}</td>
                    <td className="p-6">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                            item.status === 'Active' ? 'bg-green-50 text-green-600 border-green-200' : 'bg-gray-50 text-gray-500 border-gray-200'
                        }`}>
                            {item.status}
                        </span>
                    </td>
                    <td className="p-6 text-gray-500 italic">{item.remarks || '-'}</td>
                    <td className="p-6 text-center pr-8">
                        <button 
                            onClick={() => onEdit(item)}
                            className="p-2 text-gray-300 hover:text-black bg-white hover:bg-gray-50 rounded-lg transition-all"
                        >
                            <Pencil size={16} />
                        </button>
                    </td>
                </tr>
                ))}
                {data.length === 0 && (
                    <tr>
                        <td colSpan={7} className="p-24 text-center text-gray-300 italic text-[11px] uppercase tracking-widest">No locker data available</td>
                    </tr>
                )}
            </tbody>
            </table>
        </div>
        </div>
    </div>
  );
};
