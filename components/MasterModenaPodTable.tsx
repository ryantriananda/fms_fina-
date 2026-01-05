
import React from 'react';
import { MasterPodRecord } from '../types';
import { ChevronsUpDown, Pencil, Bed, User } from 'lucide-react';

interface Props {
  data: MasterPodRecord[];
  onEdit: (item: MasterPodRecord) => void;
}

export const MasterModenaPodTable: React.FC<Props> = ({ data, onEdit }) => {
  return (
    <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden transition-all duration-500">
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full min-w-[1000px] text-left border-collapse">
          <thead>
            <tr className="bg-[#F2F2F2] border-b border-gray-200">
              <th className="p-6 pl-8 w-16 text-center text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">#</th>
              <th className="p-6 w-40 group cursor-pointer hover:bg-gray-200/50 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Lantai</span>
                  <ChevronsUpDown size={12} className="text-gray-300" />
                </div>
              </th>
              <th className="p-6 w-40 group cursor-pointer hover:bg-gray-200/50 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Jenis Kamar</span>
                  <ChevronsUpDown size={12} className="text-gray-300" />
                </div>
              </th>
              <th className="p-6 w-32 text-[10px] font-black text-gray-400 uppercase tracking-widest">Nomor</th>
              <th className="p-6 w-40 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
              <th className="p-6 w-56 text-[10px] font-black text-gray-400 uppercase tracking-widest">Occupied By</th>
              <th className="p-6 w-24 text-center pr-8 text-[10px] font-black text-gray-400 uppercase tracking-widest">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 text-[12px] text-gray-700">
            {data.map((item, index) => (
              <tr key={item.id} className="bg-white hover:bg-[#FDFDFD] transition-all group">
                <td className="p-6 text-center font-bold text-gray-300 pl-8">{index + 1}</td>
                <td className="p-6 font-black text-black uppercase text-[11px]">{item.lantai}</td>
                <td className="p-6">
                    <div className="flex items-center gap-2">
                        <Bed size={14} className="text-gray-400" />
                        <span className="font-bold text-black">{item.jenisKamar}</span>
                    </div>
                </td>
                <td className="p-6">
                    <span className="bg-black text-white px-3 py-1 rounded-lg text-[11px] font-black font-mono">
                        {item.nomorKamar}
                    </span>
                </td>
                <td className="p-6">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                        item.status === 'Available' ? 'bg-green-50 text-green-600 border-green-200' : 'bg-red-50 text-red-600 border-red-200'
                    }`}>
                        {item.status}
                    </span>
                </td>
                <td className="p-6">
                    {item.occupiedBy ? (
                        <div className="flex items-center gap-2 text-black font-bold">
                            <User size={14} className="text-blue-500" />
                            {item.occupiedBy}
                        </div>
                    ) : (
                        <span className="text-gray-300 italic font-medium">-</span>
                    )}
                </td>
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
                    <td colSpan={7} className="p-24 text-center text-gray-300 italic text-[11px] uppercase tracking-widest">No master pod data found</td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
