
import React from 'react';
import { DeliveryLocationRecord } from '../types';
import { ChevronsUpDown, Pencil, Trash2, ChevronLeft, ChevronRight, Building2, Globe, CheckCircle2, AlertCircle } from 'lucide-react';

interface Props {
  data: DeliveryLocationRecord[];
  onEdit: (item: DeliveryLocationRecord) => void;
  onDelete: (id: number) => void;
}

export const MasterDeliveryLocationTable: React.FC<Props> = ({ data, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden transition-all duration-500">
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full min-w-[1000px] text-left border-collapse">
          <thead>
            <tr className="bg-[#F2F2F2] border-b border-gray-200">
              <th className="p-6 pl-8 w-16 text-center text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">#</th>
              <th className="p-6 w-1/3 group cursor-pointer hover:bg-gray-200/50 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-black uppercase tracking-[0.15em]">METHOD NAME</span>
                  <ChevronsUpDown size={12} className="text-gray-300 group-hover:text-black transition-colors"/>
                </div>
              </th>
              <th className="p-6 w-40 text-center text-[10px] font-black text-black uppercase tracking-[0.15em]">DELIVERY TYPE</th>
              <th className="p-6 w-40 text-center text-[10px] font-black text-black uppercase tracking-[0.15em]">STATUS</th>
              <th className="p-6 w-24 text-center pr-8 text-[10px] font-black text-black uppercase tracking-[0.15em]">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 text-[12px] text-gray-700">
            {data.length > 0 ? (
                data.map((item, index) => (
                    <tr key={item.id} className="bg-white hover:bg-[#FDFDFD] transition-all group">
                        <td className="p-6 text-center font-bold text-gray-300 pl-8">{index + 1}</td>
                        <td className="p-6 font-black text-black text-[13px] uppercase tracking-tight">{item.name}</td>
                        <td className="p-6 text-center">
                          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border w-28 justify-center ${
                              item.type === 'Internal' ? 'bg-gray-50 text-gray-700 border-gray-200' : 'bg-blue-50 text-blue-700 border-blue-200'
                          }`}>
                            {item.type === 'Internal' ? <Building2 size={12} /> : <Globe size={12} />}
                            <span className="text-[10px] font-bold uppercase tracking-wide">{item.type}</span>
                          </div>
                        </td>
                        <td className="p-6 text-center">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                              item.status === 'Active' 
                              ? 'bg-[#E8FDF5] text-[#059669] border-[#10B981]/20' 
                              : 'bg-gray-50 text-gray-400 border-gray-200'
                          }`}>
                            {item.status === 'Active' ? <CheckCircle2 size={10} strokeWidth={3} /> : <AlertCircle size={10} strokeWidth={3} />}
                            {item.status}
                          </span>
                        </td>
                        <td className="p-6 text-center pr-8">
                            <div className="flex items-center justify-center gap-2">
                                <button 
                                    onClick={() => onEdit(item)}
                                    className="p-2 text-gray-300 hover:text-black bg-white hover:bg-gray-50 rounded-xl transition-all"
                                >
                                    <Pencil size={16} />
                                </button>
                                <button 
                                    onClick={() => onDelete(item.id)}
                                    className="p-2 text-gray-300 hover:text-red-500 bg-white hover:bg-red-50 rounded-xl transition-all"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan={5} className="p-24 text-center">
                        <p className="text-[11px] font-black uppercase tracking-[0.3em] text-gray-300 opacity-50">No delivery locations configured</p>
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
       {/* Pagination Footer */}
       <div className="px-8 py-6 bg-[#FAFAFA] border-t border-gray-100 flex items-center justify-between">
            <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                Showing {data.length > 0 ? 1 : 0} - {data.length} of <span className="text-black">{data.length}</span> items
            </div>
            
            <div className="flex items-center gap-2">
                 <button className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 hover:border-black text-gray-300 hover:text-black transition-all bg-white shadow-sm active:scale-95">
                    <ChevronLeft size={16} />
                 </button>
                 <button className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 hover:border-black text-gray-300 hover:text-black transition-all bg-white shadow-sm active:scale-95">
                    <ChevronRight size={16} />
                 </button>
            </div>
      </div>
    </div>
  );
};
