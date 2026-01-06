
import React from 'react';
import { InsuranceProviderRecord } from '../types';
import { ChevronsUpDown, Eye, Pencil, Trash2, Building, Phone, Mail, Star, MapPin } from 'lucide-react';

interface Props {
  data: InsuranceProviderRecord[];
  onEdit?: (item: InsuranceProviderRecord) => void;
  onDelete?: (id: number) => void;
}

export const InsuranceProviderTable: React.FC<Props> = ({ data, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden transition-all duration-500">
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full min-w-[1200px] text-left border-collapse">
          <thead>
            <tr className="bg-[#F2F2F2] border-b border-gray-200">
              <th className="p-6 pl-8 w-16 text-center text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">#</th>
              <th className="p-6 w-64 text-[10px] font-black text-gray-400 uppercase tracking-widest">PROVIDER NAME</th>
              <th className="p-6 w-48 text-[10px] font-black text-gray-400 uppercase tracking-widest">CONTACT PERSON</th>
              <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">CONTACT INFO</th>
              <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">ADDRESS</th>
              <th className="p-6 w-32 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">RATING</th>
              <th className="p-6 w-32 text-center pr-8 text-[10px] font-black text-gray-400 uppercase tracking-widest">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {data.map((item, index) => (
              <tr key={item.id} className="bg-white hover:bg-[#FDFDFD] transition-all group">
                <td className="p-6 pl-8 text-center font-bold text-gray-300 text-[11px]">{index + 1}</td>
                <td className="p-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100">
                            <Building size={18} />
                        </div>
                        <span className="font-black text-black text-[13px] uppercase tracking-tight">{item.name}</span>
                    </div>
                </td>
                <td className="p-6">
                    <span className="text-[12px] font-bold text-gray-700">{item.contactPerson}</span>
                </td>
                <td className="p-6">
                    <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-2 text-[11px] font-medium text-gray-600">
                            <Phone size={12} className="text-gray-400" /> {item.phone}
                        </div>
                        <div className="flex items-center gap-2 text-[11px] font-medium text-gray-600">
                            <Mail size={12} className="text-gray-400" /> {item.email}
                        </div>
                    </div>
                </td>
                <td className="p-6">
                    <div className="flex items-start gap-2 text-[11px] text-gray-500 max-w-xs truncate">
                        <MapPin size={12} className="text-gray-400 mt-0.5 shrink-0" />
                        {item.address}
                    </div>
                </td>
                <td className="p-6 text-center">
                    <div className="inline-flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg border border-yellow-100">
                        <Star size={12} className="text-yellow-500 fill-yellow-500" />
                        <span className="text-[11px] font-black text-yellow-700">{item.rating}</span>
                    </div>
                </td>
                <td className="p-6 text-center pr-8">
                    <div className="flex items-center justify-center gap-2">
                         <button onClick={() => onEdit?.(item)} className="p-2 text-gray-300 hover:text-black transition-all bg-gray-50 hover:bg-gray-100 rounded-xl">
                            <Pencil size={16} />
                         </button>
                         <button onClick={() => onDelete?.(item.id)} className="p-2 text-gray-300 hover:text-red-500 transition-all bg-gray-50 hover:bg-red-50 rounded-xl">
                            <Trash2 size={16} />
                         </button>
                    </div>
                </td>
              </tr>
            ))}
            {data.length === 0 && (
                <tr>
                    <td colSpan={7} className="p-24 text-center text-gray-300 italic">No providers found</td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
