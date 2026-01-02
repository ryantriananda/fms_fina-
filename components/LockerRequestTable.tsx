
import React from 'react';
import { LockerRequestRecord } from '../types';
import { ChevronsUpDown, Eye, CheckCircle, XCircle } from 'lucide-react';

interface Props {
  data: LockerRequestRecord[];
  onView?: (item: LockerRequestRecord) => void;
}

export const LockerRequestTable: React.FC<Props> = ({ data, onView }) => {
  return (
    <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden transition-all duration-500">
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full min-w-[1000px] text-left border-collapse">
          <thead>
            <tr className="bg-[#F2F2F2] border-b border-gray-200">
              <th className="p-6 pl-8 w-40 text-[10px] font-black text-gray-400 uppercase tracking-widest">REQ ID</th>
              <th className="p-6 w-56 text-[10px] font-black text-gray-400 uppercase tracking-widest">REQUESTER</th>
              <th className="p-6 w-40 text-[10px] font-black text-gray-400 uppercase tracking-widest">DEPARTEMEN</th>
              <th className="p-6 w-40 text-[10px] font-black text-gray-400 uppercase tracking-widest">TANGGAL</th>
              <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">ALASAN</th>
              <th className="p-6 w-40 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">STATUS</th>
              <th className="p-6 w-24 text-center pr-8 text-[10px] font-black text-gray-400 uppercase tracking-widest">AKSI</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {data.map((item) => (
              <tr key={item.id} className="bg-white hover:bg-[#FDFDFD] transition-all group cursor-pointer" onClick={() => onView?.(item)}>
                <td className="p-6 pl-8 text-[11px] font-mono font-bold text-black">{item.id}</td>
                <td className="p-6 text-[12px] font-bold text-black uppercase">{item.requesterName}</td>
                <td className="p-6 text-[11px] font-bold text-gray-500 uppercase">{item.department}</td>
                <td className="p-6 text-[11px] font-medium text-black">{item.requestDate}</td>
                <td className="p-6 text-[11px] text-gray-600 truncate max-w-xs">{item.reason}</td>
                <td className="p-6 text-center">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                        item.status === 'Approved' ? 'bg-green-50 text-green-600 border-green-200' :
                        item.status === 'Rejected' ? 'bg-red-50 text-red-600 border-red-200' :
                        'bg-orange-50 text-orange-600 border-orange-200'
                    }`}>
                        {item.status}
                    </span>
                </td>
                <td className="p-6 text-center pr-8">
                    <button onClick={(e) => { e.stopPropagation(); onView?.(item); }} className="p-2 text-gray-300 hover:text-black transition-all bg-gray-50 rounded-lg hover:bg-gray-100">
                        <Eye size={16} />
                    </button>
                </td>
              </tr>
            ))}
            {data.length === 0 && (
                <tr>
                    <td colSpan={7} className="p-24 text-center text-gray-300 italic text-[11px] uppercase tracking-widest">Tidak ada request pending</td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
