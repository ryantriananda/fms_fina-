
import React from 'react';
import { LogBookRecord } from '../types';
import { ChevronsUpDown, Eye, Pencil, User, CheckCircle2, Baby, MapPin, Calendar, MessageSquare, Trash2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Props {
  data: LogBookRecord[];
  onEdit?: (item: LogBookRecord) => void;
  onView?: (item: LogBookRecord) => void;
  onDelete?: (id: string) => void;
}

export const LogBookTable: React.FC<Props> = ({ data, onEdit, onView, onDelete }) => {
  const { t } = useLanguage();

  const getCategoryBadge = (category: string) => {
      const cat = category.toUpperCase();
      let styles = 'bg-gray-100 text-gray-600';
      
      if (cat === 'CUSTOMER') styles = 'bg-blue-50 text-blue-600 border-blue-100';
      else if (cat === 'VENDOR' || cat === 'SUPPLIER') styles = 'bg-purple-50 text-purple-600 border-purple-100';
      else if (cat === 'INTERVIEWEE') styles = 'bg-gray-50 text-gray-600 border-gray-200';
      else if (cat === 'OTHERS') styles = 'bg-orange-50 text-orange-600 border-orange-100';
      else if (cat === 'INTERNAL') styles = 'bg-green-50 text-green-600 border-green-100';

      return (
          <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded border ${styles}`}>
              {category}
          </span>
      );
  };

  return (
    <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden transition-all duration-500">
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full min-w-[1400px] text-left border-collapse">
          <thead>
            <tr className="bg-[#FBFBFB] border-b border-gray-200 h-14">
              <th className="p-4 w-14 text-center pl-8 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">#</th>
              <th className="p-4 w-56 group cursor-pointer hover:bg-gray-100/50 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">{t('LOKASI MODENA')}</span>
                  <ChevronsUpDown size={12} className="text-gray-300 group-hover:text-black transition-colors"/>
                </div>
              </th>
              <th className="p-4 w-44 group cursor-pointer hover:bg-gray-100/50 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">{t('KATEGORI TAMU')}</span>
                  <ChevronsUpDown size={12} className="text-gray-300 group-hover:text-black transition-colors"/>
                </div>
              </th>
              <th className="p-4 w-64 group cursor-pointer hover:bg-gray-100/50 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">{t('NAMA TAMU')}</span>
                  <ChevronsUpDown size={12} className="text-gray-300 group-hover:text-black transition-colors"/>
                </div>
              </th>
              <th className="p-4 w-40 group cursor-pointer hover:bg-gray-100/50 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">{t('TANGGAL')}</span>
                  <ChevronsUpDown size={12} className="text-gray-300 group-hover:text-black transition-colors"/>
                </div>
              </th>
              <th className="p-4 w-44 text-center text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">TIME LOG</th>
              <th className="p-4 w-56 text-center text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">BREAKDOWN</th>
              <th className="p-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">{t('CATATAN')}</th>
              <th className="p-4 w-32 text-center text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {data.length > 0 ? (
                data.map((item, index) => {
                const isStillVisiting = !item.jamPulang;
                return (
                <tr 
                    key={item.id} 
                    onClick={() => onView?.(item)}
                    className="bg-white hover:bg-[#FDFDFD] transition-all group cursor-pointer h-20"
                >
                    <td className="p-4 text-center font-bold text-gray-300 text-[11px] pl-8">
                        {index + 1}
                    </td>
                    <td className="p-4">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                                <MapPin size={10} />
                            </div>
                            <span className="font-black text-black text-[12px] uppercase tracking-tight">{item.lokasiModena}</span>
                        </div>
                    </td>
                    <td className="p-4">
                        {getCategoryBadge(item.kategoriTamu)}
                    </td>
                    <td className="p-4">
                        <div className="font-black text-black text-[13px] uppercase group-hover:text-blue-600 transition-colors">{item.namaTamu}</div>
                    </td>
                    <td className="p-4">
                        <div className="flex items-center gap-2 text-gray-500 font-bold text-[11px]">
                            <Calendar size={12} className="text-gray-400" />
                            {item.tanggalKunjungan}
                        </div>
                    </td>
                    <td className="p-4">
                        <div className="flex items-center justify-center gap-6">
                            <div className="text-center">
                                <div className="text-[8px] font-black text-gray-300 uppercase tracking-wider mb-0.5">IN</div>
                                <div className="font-black text-black text-[12px]">{item.jamDatang}</div>
                            </div>
                            <div className="text-center">
                                <div className="text-[8px] font-black text-gray-300 uppercase tracking-wider mb-0.5">OUT</div>
                                <div className={`font-black text-[12px] ${item.jamPulang ? 'text-gray-500' : 'text-gray-200'}`}>{item.jamPulang || '--:--'}</div>
                            </div>
                        </div>
                    </td>
                    <td className="p-4">
                        <div className="flex items-center justify-center gap-6">
                            <div className="flex flex-col items-center gap-1 group/icon">
                                <User size={14} className="text-purple-300 group-hover/icon:text-purple-500 transition-colors" />
                                <span className="text-[10px] font-black text-black">{item.countAdult || 0}</span>
                            </div>
                            <div className="flex flex-col items-center gap-1 group/icon">
                                <CheckCircle2 size={14} className="text-blue-300 group-hover/icon:text-blue-500 transition-colors" />
                                <span className="text-[10px] font-black text-black">{item.countIndividual || 0}</span>
                            </div>
                            <div className="flex flex-col items-center gap-1 group/icon">
                                <Baby size={14} className="text-orange-300 group-hover/icon:text-orange-500 transition-colors" />
                                <span className="text-[10px] font-black text-black">{item.countChild || 0}</span>
                            </div>
                        </div>
                    </td>
                    <td className="p-4">
                        <div className="flex items-start gap-2 text-gray-400 text-[11px] italic truncate max-w-[250px]">
                            <MessageSquare size={12} className="shrink-0 text-gray-300 mt-0.5" />
                            {item.note || '-'}
                        </div>
                    </td>
                    <td className="p-4 text-center pr-8">
                        <div className="flex items-center justify-center gap-2">
                            <button 
                                onClick={(e) => { e.stopPropagation(); onView?.(item); }}
                                className="text-gray-300 hover:text-black transition-all p-2 rounded-xl hover:bg-gray-50 active:scale-90"
                            >
                                <Eye size={16} />
                            </button>
                            <button 
                                onClick={(e) => { e.stopPropagation(); onEdit?.(item); }}
                                className="text-gray-300 hover:text-black transition-all p-2 rounded-xl hover:bg-gray-50 active:scale-90"
                            >
                                <Pencil size={16} />
                            </button>
                            <button 
                                onClick={(e) => { e.stopPropagation(); onDelete?.(item.id); }}
                                className="text-gray-300 hover:text-red-500 transition-all p-2 rounded-xl hover:bg-red-50 active:scale-90"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </td>
                </tr>
                )})
            ) : (
                <tr>
                    <td colSpan={9} className="p-20 text-center">
                        <p className="text-[11px] font-black text-gray-300 uppercase tracking-widest italic">{t('No data available')}</p>
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Pagination Footer */}
      <div className="px-8 py-5 bg-[#FAFAFA] border-t border-gray-100 flex items-center justify-between">
            <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                DISPLAYING <span className="text-black ml-1 font-black">{data.length} GUEST RECORDS</span>
            </div>
            
            <div className="flex items-center gap-2">
                 <button className="w-8 h-8 flex items-center justify-center rounded-xl border border-gray-200 hover:border-black text-gray-300 hover:text-black transition-all bg-white shadow-sm active:scale-95">
                    <span className="sr-only">Previous</span>
                    &lt;
                 </button>
                 <div className="bg-black text-white w-8 h-8 flex items-center justify-center rounded-xl font-black text-[10px] shadow-xl shadow-black/20">1</div>
                 <button className="w-8 h-8 flex items-center justify-center rounded-xl border border-gray-200 hover:border-black text-gray-300 hover:text-black transition-all bg-white shadow-sm active:scale-95">
                    <span className="sr-only">Next</span>
                    &gt;
                 </button>
            </div>
      </div>
    </div>
  );
};
