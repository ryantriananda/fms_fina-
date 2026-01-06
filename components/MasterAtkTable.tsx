
import React from 'react';
import { MasterItem } from '../types';
import { ChevronsUpDown, ChevronLeft, ChevronRight, Eye } from 'lucide-react';

interface Props {
  data: MasterItem[];
  onEdit?: (item: MasterItem) => void;
}

export const MasterAtkTable: React.FC<Props> = ({ data, onEdit }) => {
  const formatCurrency = (val?: string) => {
    if (!val) return '-';
    const num = parseInt(val.replace(/\D/g, '')) || 0;
    return `Rp ${num.toLocaleString('id-ID')}`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full min-w-[1400px] text-left border-collapse">
          <thead>
            <tr className="bg-white border-b border-gray-100 h-14 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              <th className="pl-8 w-16 text-center">#</th>
              <th className="px-4 w-32 group cursor-pointer hover:text-black transition-colors">
                <div className="flex items-center justify-between">
                    PART CODE <ChevronsUpDown size={12} className="opacity-0 group-hover:opacity-100" />
                </div>
              </th>
              <th className="px-4 w-40 group cursor-pointer hover:text-black transition-colors">
                <div className="flex items-center justify-between">
                    CATEGORY <ChevronsUpDown size={12} className="opacity-0 group-hover:opacity-100" />
                </div>
              </th>
              <th className="px-4 w-64 group cursor-pointer hover:text-black transition-colors">
                <div className="flex items-center justify-between">
                    ITEM NAME <ChevronsUpDown size={12} className="opacity-0 group-hover:opacity-100" />
                </div>
              </th>
              <th className="px-4 w-20 text-center group cursor-pointer hover:text-black transition-colors">
                 UOM
              </th>
              <th className="px-4 w-24 text-center group cursor-pointer hover:text-black transition-colors">
                 STOCK
              </th>
              <th className="px-4 w-20 text-center text-gray-300">
                 MIN
              </th>
              <th className="px-4 w-24 text-center text-gray-300">
                 REQUESTED
              </th>
              <th className="px-4 w-32 text-gray-300">
                 LAST BUY
              </th>
              <th className="px-4 w-32 text-right text-gray-300">
                 UNIT PRICE
              </th>
              <th className="px-4 w-32 text-right text-gray-300">
                 AVG PRICE
              </th>
              <th className="px-4 text-center w-20">
                 AKSI
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {data.map((item, index) => (
              <tr 
                key={item.id} 
                className="hover:bg-gray-50 transition-colors cursor-pointer h-16 group"
                onClick={() => onEdit?.(item)}
              >
                <td className="pl-8 text-center text-xs font-bold text-gray-300">{index + 1}</td>
                
                <td className="px-4 text-xs font-bold text-gray-600 uppercase font-mono">
                    {item.itemCode || '-'}
                </td>
                
                <td className="px-4">
                    <span className="inline-block px-3 py-1 bg-[#F8F9FA] border border-gray-100 rounded-[6px] text-[10px] font-black text-gray-500 uppercase tracking-wide">
                        {item.category}
                    </span>
                </td>
                
                <td className="px-4 text-[11px] font-black text-black uppercase tracking-tight">
                    {item.itemName}
                </td>
                
                <td className="px-4 text-center text-[11px] font-black text-black uppercase">
                    {item.uom}
                </td>
                
                {/* Stock Logic: Red if <= min */}
                <td className={`px-4 text-center text-[12px] font-black ${item.remainingStock <= item.minimumStock ? 'text-red-500' : 'text-black'}`}>
                    {item.remainingStock}
                </td>
                
                <td className="px-4 text-center text-[11px] font-bold text-gray-300">
                    {item.minimumStock}
                </td>
                
                {/* Requested Logic: Orange if > 0 */}
                <td className={`px-4 text-center text-[11px] font-bold ${item.requestedStock > 0 ? 'text-orange-500' : 'text-gray-200'}`}>
                    {item.requestedStock}
                </td>
                
                <td className="px-4 text-[11px] font-medium text-gray-500">
                    {item.purchaseDate || '-'}
                </td>
                
                <td className="px-4 text-right text-[11px] font-black text-black">
                    {formatCurrency(item.lastPurchasePrice)}
                </td>
                
                <td className="px-4 text-right text-[11px] font-bold text-gray-500">
                    {formatCurrency(item.averagePrice)}
                </td>
                
                <td className="px-4 text-center">
                    <button 
                        className="w-8 h-8 flex items-center justify-center rounded-full text-gray-300 hover:text-black hover:bg-gray-100 transition-all"
                        onClick={(e) => { e.stopPropagation(); onEdit?.(item); }}
                    >
                        <Eye size={16} />
                    </button>
                </td>
              </tr>
            ))}
            {data.length === 0 && (
                <tr>
                    <td colSpan={12} className="p-12 text-center text-gray-400 text-xs font-bold uppercase tracking-widest">
                        No Items Found
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Footer */}
      <div className="px-8 py-5 flex items-center justify-between border-t border-gray-100 bg-white">
         <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            DISPLAYING <span className="text-black font-black mx-1">{data.length} SEMUA</span> ITEMS
         </div>
         <div className="flex items-center gap-2">
            <button className="w-7 h-7 flex items-center justify-center text-gray-300 hover:text-black transition-colors">
                <ChevronLeft size={16} />
            </button>
            <div className="w-7 h-7 bg-black text-white rounded-lg flex items-center justify-center text-[11px] font-black shadow-lg shadow-black/20">1</div>
            <button className="w-7 h-7 flex items-center justify-center text-gray-300 hover:text-black transition-colors">
                <ChevronRight size={16} />
            </button>
         </div>
      </div>
    </div>
  );
};
