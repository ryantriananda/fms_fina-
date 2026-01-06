
import React from 'react';
import { Shield, AlertTriangle, FileText, DollarSign, Activity } from 'lucide-react';
import { InsuranceRecord } from '../types';

interface Props {
  data: InsuranceRecord[];
}

export const InsuranceDashboard: React.FC<Props> = ({ data }) => {
  const activePolicies = data.filter(i => i.status === 'Active').length;
  const expiringPolicies = data.filter(i => i.status === 'Expiring').length;
  const totalPremium = data.reduce((acc, curr) => acc + parseInt(curr.premium), 0);
  const totalClaims = data.reduce((acc, curr) => acc + (curr.claims?.length || 0), 0);

  const StatCard = ({ title, value, icon: Icon, color, subtext }: any) => (
    <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center justify-between">
      <div>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{title}</p>
        <h3 className="text-[28px] font-black text-black leading-none">{value}</h3>
        {subtext && <p className="text-[10px] font-medium text-gray-500 mt-2">{subtext}</p>}
      </div>
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${color}`}>
        <Icon size={24} />
      </div>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
            title="Total Active Policies" 
            value={activePolicies} 
            icon={Shield} 
            color="bg-blue-50 text-blue-600" 
            subtext="Across all assets"
        />
        <StatCard 
            title="Total Premium Value" 
            value={`Rp ${(totalPremium / 1000000).toFixed(1)}M`} 
            icon={DollarSign} 
            color="bg-green-50 text-green-600" 
            subtext="Year to Date"
        />
        <StatCard 
            title="Expiring Soon" 
            value={expiringPolicies} 
            icon={AlertTriangle} 
            color="bg-orange-50 text-orange-600" 
            subtext="Next 30 Days"
        />
        <StatCard 
            title="Total Claims" 
            value={totalClaims} 
            icon={Activity} 
            color="bg-purple-50 text-purple-600" 
            subtext="Active & Closed"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm h-80 flex flex-col justify-center items-center text-center">
             <FileText size={48} className="text-gray-200 mb-4" />
             <h3 className="text-[14px] font-black text-gray-400 uppercase tracking-widest">Policy Distribution Chart</h3>
             <p className="text-[10px] text-gray-300">Visual representation coming soon</p>
          </div>
           <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm h-80 flex flex-col justify-center items-center text-center">
             <Activity size={48} className="text-gray-200 mb-4" />
             <h3 className="text-[14px] font-black text-gray-400 uppercase tracking-widest">Claims Ratio Analysis</h3>
             <p className="text-[10px] text-gray-300">Visual representation coming soon</p>
          </div>
      </div>
    </div>
  );
};
