import React from 'react';
import { LayoutDashboard } from 'lucide-react';

const Dashboard: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-10">
      <LayoutDashboard size={64} className="text-gray-200 mb-6" />
      <h2 className="text-xl font-black text-gray-300 uppercase tracking-widest">Dashboard Overview</h2>
      <p className="text-gray-400 mt-2">Statistics and charts will appear here.</p>
    </div>
  );
};

export default Dashboard;
