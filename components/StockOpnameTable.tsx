
import React from 'react';
import { StockOpnameRecord } from '../types';
import { ChevronsUpDown, Eye, Pencil, ClipboardList, CheckCircle, AlertTriangle } from 'lucide-react';

interface Props {
  data: StockOpnameRecord[];
  onView?: (item: StockOpnameRecord) => void;
  onEdit?: (item: StockOpnameRecord) => void;
}

export const StockOpnameTable: React.FC<Props> = ({ data, onView, onEdit }) => {
  const getStatusBadge = (status: string) => {
      switch(status) {
          case 'Completed': return <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border border-green-200">Completed</span>;
          case 'Review': return <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border border-orange-200">In Review</span>;
          default: return <span className="bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">Draft</span>;
      }
  };

  return (
    <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden transition-all duration-500">
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full min-w-[1200px] text-left border-collapse">
          <thead>
            <tr className="bg-[#F2F2F2] border-b border-gray-200">
              <th className="p-6 pl-8 w-40 text-[10px] font-black text-gray-400 uppercase tracking-widest">ID</th>
              <th className="p-6 w-32 text-[10px] font-black text-gray-400 uppercase tracking-widest">TANGGAL</th>
              <th className="p-6 w-48 text-[10px] font-black text-gray-400 uppercase tracking-widest">LOKASI & KATEGORI</th>
              <th className="p-6 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">TOTAL ITEM</th>
              <th className="p-6 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">MATCHED</th>
              <th className="p-6 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">DISCREPANCY</th>
              <th className="p-6 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">STATUS</th>
              <th className="p-6 w-24 text-center pr-8 text-[10px] font-black text-gray-400 uppercase tracking-widest">AKSI</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {data.map((item) => (
              <tr key={item.id} className="bg-white hover:bg-[#FDFDFD] transition-all group cursor-pointer" onClick={() => onView?.(item)}>
                <td className="p-6 pl-8">
                    <span className="font-mono font-bold text-blue-600 text-[12px]">{item.id}</span>
                </td>
                <td className="p-6 text-[11px] font-medium text-black">
                    {item.date}
                </td>
                <td className="p-6">
                    <div className="flex flex-col gap-1">
                        <span className="text-[12px] font-black text-black uppercase">{item.location}</span>
                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">{item.itemCategory}</span>
                    </div>
                </td>
                <td className="p-6 text-center">
                    <span className="text-[14px] font-black text-black">{item.totalItems}</span>
                </td>
                <td className="p-6 text-center">
                    <span className="text-[14px] font-black text-green-600">{item.matchedItems}</span>
                </td>
                <td className="p-6 text-center">
                    <span className={`text-[14px] font-black ${item.discrepancyItems > 0 ? 'text-red-500' : 'text-gray-300'}`}>
                        {item.discrepancyItems}
                    </span>
                </td>
                <td className="p-6 text-center">
                    {getStatusBadge(item.status)}
                </td>
                <td className="p-6 text-center pr-8">
                    <div className="flex items-center justify-center gap-2">
                         <button onClick={(e) => { e.stopPropagation(); onView?.(item); }} className="p-2 text-gray-300 hover:text-black transition-all bg-gray-50 rounded-lg hover:bg-gray-100">
                            <Eye size={16} />
                         </button>
                         <button onClick={(e) => { e.stopPropagation(); onEdit?.(item); }} className="p-2 text-gray-300 hover:text-black transition-all bg-gray-50 rounded-lg hover:bg-blue-50 hover:text-blue-600">
                            <Pencil size={16} />
                         </button>
                    </div>
                </td>
              </tr>
            ))}
            {data.length === 0 && (
                <tr>
                    <td colSpan={8} className="p-24 text-center">
                        <div className="flex flex-col items-center opacity-30">
                            <ClipboardList size={48} className="text-gray-400 mb-4" />
                            <p className="text-[11px] font-black uppercase tracking-[0.3em]">Belum ada data stock opname</p>
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
