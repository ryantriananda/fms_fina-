
import React from 'react';
import { InsuranceRecord } from '../types';
import { ChevronsUpDown, Eye, Pencil, Trash2, Shield, AlertCircle, CheckCircle, Clock, Umbrella, Repeat, Layers } from 'lucide-react';

interface Props {
  data: InsuranceRecord[];
  onEdit?: (item: InsuranceRecord) => void;
  onView?: (item: InsuranceRecord) => void;
  onDelete?: (id: string) => void;
  onRenew?: (item: InsuranceRecord) => void;
}

export const InsurancePolicyTable: React.FC<Props> = ({ data, onEdit, onView, onDelete, onRenew }) => {
  const getStatusStyle = (status: string) => {
      switch(status) {
          case 'Active': return 'bg-[#E8FDF5] text-[#059669] border-[#10B981]/20';
          case 'Expiring': return 'bg-orange-50 text-orange-600 border-orange-200';
          case 'Expired': return 'bg-red-50 text-red-600 border-red-200';
          default: return 'bg-gray-50 text-gray-500';
      }
  };

  return (
    <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden transition-all duration-500">
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full min-w-[1300px] text-left border-collapse">
          <thead>
            <tr className="bg-[#F2F2F2] border-b border-gray-200">
              <th className="p-6 pl-8 w-40 text-[10px] font-black text-gray-400 uppercase tracking-widest">POLICY NO</th>
              <th className="p-6 w-48 text-[10px] font-black text-gray-400 uppercase tracking-widest">PROVIDER</th>
              <th className="p-6 w-40 text-[10px] font-black text-gray-400 uppercase tracking-widest">TYPE</th>
              <th className="p-6 w-48 text-[10px] font-black text-gray-400 uppercase tracking-widest">ASSETS COVERED</th>
              <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">PERIOD</th>
              <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">PREMIUM (IDR)</th>
              <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">STATUS</th>
              <th className="p-6 w-32 text-center pr-8 text-[10px] font-black text-gray-400 uppercase tracking-widest">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {data.map((item) => {
              const assetCount = item.assets?.length || 0;
              const isFleet = assetCount > 1;
              const firstAssetName = item.assets?.[0]?.name || item.assetName || 'Unknown Asset';

              return (
              <tr key={item.id} className="bg-white hover:bg-[#FDFDFD] transition-all group cursor-pointer" onClick={() => onView?.(item)}>
                <td className="p-6 pl-8">
                    <span className="font-mono font-bold text-black text-[12px]">{item.policyNumber}</span>
                </td>
                <td className="p-6">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-black border border-gray-100">
                            <Umbrella size={14} />
                        </div>
                        <span className="font-black text-black text-[12px] uppercase tracking-tight">{item.provider}</span>
                    </div>
                </td>
                <td className="p-6">
                    <span className={`text-[11px] font-bold ${isFleet ? 'text-purple-600' : 'text-gray-600'}`}>
                        {item.type}
                    </span>
                </td>
                <td className="p-6">
                    {isFleet ? (
                        <div className="flex flex-col gap-1">
                            <span className="inline-flex items-center gap-1.5 bg-purple-50 text-purple-700 px-2 py-1 rounded text-[10px] font-black border border-purple-100 w-fit">
                                <Layers size={10} /> {assetCount} Units Covered
                            </span>
                            <span className="text-[10px] text-gray-400 truncate max-w-[200px] pl-1">
                                {firstAssetName}, +{assetCount - 1} more...
                            </span>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-0.5">
                            <span className="text-[11px] font-black text-black uppercase tracking-tight">{firstAssetName}</span>
                            <span className="text-[9px] text-gray-400 font-mono font-bold">{item.assets?.[0]?.identifier || '-'}</span>
                        </div>
                    )}
                </td>
                <td className="p-6 text-center">
                    <div className="text-[11px] font-mono font-medium text-gray-600">
                        {item.startDate} <span className="text-gray-300">➜</span> {item.endDate}
                    </div>
                </td>
                <td className="p-6 text-right">
                    <span className="text-[12px] font-black text-black font-mono">
                        {parseInt(item.premium).toLocaleString('id-ID')}
                    </span>
                </td>
                <td className="p-6 text-center">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${getStatusStyle(item.status)}`}>
                        {item.status}
                    </span>
                </td>
                <td className="p-6 text-center pr-8">
                    <div className="flex items-center justify-center gap-2">
                         <button 
                            onClick={(e) => { e.stopPropagation(); onRenew?.(item); }} 
                            className="p-2 bg-black text-white hover:bg-gray-800 rounded-lg transition-all shadow-md active:scale-95"
                            title="Renew Policy"
                         >
                            <Repeat size={14} />
                         </button>
                         <button onClick={(e) => { e.stopPropagation(); onView?.(item); }} className="p-2 text-gray-300 hover:text-black transition-all">
                            <Eye size={16} />
                         </button>
                         <button onClick={(e) => { e.stopPropagation(); onEdit?.(item); }} className="p-2 text-gray-300 hover:text-black transition-all">
                            <Pencil size={16} />
                         </button>
                         <button onClick={(e) => { e.stopPropagation(); onDelete?.(item.id); }} className="p-2 text-gray-300 hover:text-red-500 transition-all">
                            <Trash2 size={16} />
                         </button>
                    </div>
                </td>
              </tr>
            )})}
            {data.length === 0 && (
                <tr>
                    <td colSpan={8} className="p-24 text-center">
                        <div className="flex flex-col items-center opacity-30">
                            <Shield size={48} className="text-gray-400 mb-4" />
                            <p className="text-[11px] font-black uppercase tracking-[0.3em]">No policies found</p>
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
