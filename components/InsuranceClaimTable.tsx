
import React from 'react';
import { InsuranceClaim } from '../types';
import { ChevronsUpDown, Eye, Pencil, Trash2, AlertTriangle, CheckCircle, Clock, FileText, XCircle } from 'lucide-react';

// Extended type for display purposes (flattened)
export interface DisplayClaim extends InsuranceClaim {
    policyNumber: string;
    assetName: string;
    provider: string;
    policyId: string;
}

interface Props {
  data: DisplayClaim[];
  onEdit?: (item: DisplayClaim) => void;
  onDelete?: (policyId: string, claimId: string) => void;
}

export const InsuranceClaimTable: React.FC<Props> = ({ data, onEdit, onDelete }) => {
  const getStatusStyle = (status: string) => {
      switch(status) {
          case 'Paid': return 'bg-[#E8FDF5] text-[#059669] border-[#10B981]/20';
          case 'Approved': return 'bg-blue-50 text-blue-600 border-blue-200';
          case 'Survey': return 'bg-orange-50 text-orange-600 border-orange-200';
          case 'Rejected': return 'bg-red-50 text-red-600 border-red-200';
          default: return 'bg-gray-50 text-gray-500 border-gray-200';
      }
  };

  const getStatusIcon = (status: string) => {
      switch(status) {
          case 'Paid': return <CheckCircle size={10} />;
          case 'Approved': return <CheckCircle size={10} />;
          case 'Rejected': return <XCircle size={10} />;
          case 'Survey': return <Clock size={10} />;
          default: return <FileText size={10} />;
      }
  };

  return (
    <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden transition-all duration-500">
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full min-w-[1300px] text-left border-collapse">
          <thead>
            <tr className="bg-[#F2F2F2] border-b border-gray-200">
              <th className="p-6 pl-8 w-32 text-[10px] font-black text-gray-400 uppercase tracking-widest">CLAIM ID</th>
              <th className="p-6 w-40 text-[10px] font-black text-gray-400 uppercase tracking-widest">INCIDENT DATE</th>
              <th className="p-6 w-56 text-[10px] font-black text-gray-400 uppercase tracking-widest">POLICY / ASSET</th>
              <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">DESCRIPTION</th>
              <th className="p-6 w-32 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">AMOUNT (IDR)</th>
              <th className="p-6 w-32 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">STATUS</th>
              <th className="p-6 w-24 text-center pr-8 text-[10px] font-black text-gray-400 uppercase tracking-widest">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {data.map((item) => (
              <tr key={item.id} className="bg-white hover:bg-[#FDFDFD] transition-all group">
                <td className="p-6 pl-8">
                    <span className="font-mono font-bold text-black text-[12px]">{item.id}</span>
                </td>
                <td className="p-6 text-[11px] font-medium text-gray-600">
                    {item.incidentDate}
                </td>
                <td className="p-6">
                    <div className="flex flex-col gap-0.5">
                        <span className="text-[12px] font-black text-black uppercase tracking-tight">{item.assetName}</span>
                        <span className="text-[9px] text-gray-400 font-bold uppercase">{item.policyNumber}</span>
                        <span className="text-[9px] text-blue-500 font-bold uppercase">{item.provider}</span>
                    </div>
                </td>
                <td className="p-6">
                    <p className="text-[11px] text-gray-600 line-clamp-2 max-w-xs">{item.description}</p>
                </td>
                <td className="p-6 text-right">
                    <div className="flex flex-col gap-1 items-end">
                        <span className="text-[12px] font-black text-black font-mono">
                            {parseInt(item.claimAmount).toLocaleString('id-ID')}
                        </span>
                        {item.coveredAmount && parseInt(item.coveredAmount) > 0 && (
                            <span className="text-[9px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded">
                                Covered: {parseInt(item.coveredAmount).toLocaleString('id-ID')}
                            </span>
                        )}
                    </div>
                </td>
                <td className="p-6 text-center">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${getStatusStyle(item.status)}`}>
                        {getStatusIcon(item.status)}
                        {item.status}
                    </span>
                </td>
                <td className="p-6 text-center pr-8">
                    <div className="flex items-center justify-center gap-2">
                         <button onClick={() => onEdit?.(item)} className="p-2 text-gray-300 hover:text-black transition-all bg-gray-50 hover:bg-gray-100 rounded-xl">
                            <Pencil size={16} />
                         </button>
                         <button onClick={() => onDelete?.(item.policyId, item.id)} className="p-2 text-gray-300 hover:text-red-500 transition-all bg-gray-50 hover:bg-red-50 rounded-xl">
                            <Trash2 size={16} />
                         </button>
                    </div>
                </td>
              </tr>
            ))}
            {data.length === 0 && (
                <tr>
                    <td colSpan={7} className="p-24 text-center">
                        <div className="flex flex-col items-center opacity-30">
                            <AlertTriangle size={48} className="text-gray-400 mb-4" />
                            <p className="text-[11px] font-black uppercase tracking-[0.3em]">No claims history</p>
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
