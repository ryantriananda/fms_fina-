import React from 'react';
import { 
    Clock, Users, AlertTriangle, Wrench, Layers, Bed, Lock, 
    Car, Building, Package, ArrowRight, CheckCircle2, AlertCircle, Timer
} from 'lucide-react';

interface DashboardPageProps {
    // Stats data
    pendingATK: number;
    pendingARK: number;
    pendingVehicle: number;
    pendingService: number;
    pendingPod: number;
    pendingLocker: number;
    totalPods: number;
    occupiedPods: number;
    totalLockers: number;
    occupiedLockers: number;
    activeVehicles: number;
    serviceVehicles: number;
    maintenanceBuildings: number;
    lowStockATK: number;
    lowStockARK: number;
    activeVisitors: number;
    totalBuildings: number;
    totalAssets: number;
    recentActivities: any[];
    onNavigate: (item: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
    pendingATK, pendingARK, pendingVehicle, pendingService, pendingPod, pendingLocker,
    totalPods, occupiedPods, totalLockers, occupiedLockers,
    activeVehicles, serviceVehicles, maintenanceBuildings,
    lowStockATK, lowStockARK, activeVisitors, totalBuildings, totalAssets,
    recentActivities, onNavigate
}) => {
    const totalPendingRequests = pendingATK + pendingARK + pendingVehicle + pendingService + pendingPod + pendingLocker;

    const getStatusIcon = (status: string) => {
        const s = status?.toLowerCase() || '';
        if (s.includes('approved') || s.includes('completed')) return <CheckCircle2 size={14} className="text-green-500" />;
        if (s.includes('pending') || s.includes('waiting')) return <Timer size={14} className="text-orange-500" />;
        if (s.includes('rejected')) return <AlertCircle size={14} className="text-red-500" />;
        return <Clock size={14} className="text-gray-400" />;
    };

    return (
        <div className="p-8 space-y-8 animate-in fade-in duration-500">
            {/* TOP STATS ROW */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center justify-between group hover:shadow-md transition-all">
                    <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Pending</p>
                        <h3 className="text-[28px] font-black text-black leading-none">{totalPendingRequests}</h3>
                        <p className="text-[10px] font-medium text-orange-500 mt-2">Requests awaiting approval</p>
                    </div>
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-orange-50 text-orange-600 group-hover:scale-110 transition-transform">
                        <Clock size={24} />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center justify-between group hover:shadow-md transition-all">
                    <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Active Issues</p>
                        <h3 className="text-[28px] font-black text-black leading-none">{serviceVehicles + maintenanceBuildings}</h3>
                        <p className="text-[10px] font-medium text-blue-500 mt-2">Maint. & Service In Progress</p>
                    </div>
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-blue-50 text-blue-600 group-hover:scale-110 transition-transform">
                        <Wrench size={24} />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center justify-between group hover:shadow-md transition-all">
                    <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Inventory Alert</p>
                        <h3 className="text-[28px] font-black text-black leading-none">{lowStockATK + lowStockARK}</h3>
                        <p className="text-[10px] font-medium text-red-500 mt-2">Items below min. stock</p>
                    </div>
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-red-50 text-red-600 group-hover:scale-110 transition-transform">
                        <AlertTriangle size={24} />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center justify-between group hover:shadow-md transition-all">
                    <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Live Visitors</p>
                        <h3 className="text-[28px] font-black text-black leading-none">{activeVisitors}</h3>
                        <p className="text-[10px] font-medium text-green-500 mt-2">Currently checked in</p>
                    </div>
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-green-50 text-green-600 group-hover:scale-110 transition-transform">
                        <Users size={24} />
                    </div>
                </div>
            </div>

            {/* MIDDLE ROW: ASSET & FACILITY STATUS */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Facility Occupancy */}
                <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <Layers size={18} className="text-black"/>
                        <h3 className="text-[12px] font-black text-black uppercase tracking-[0.2em]">FACILITY STATUS</h3>
                    </div>
                    
                    <div className="space-y-6">
                        <div>
                            <div className="flex justify-between items-end mb-2">
                                <div className="flex items-center gap-2">
                                    <Bed size={14} className="text-gray-400" />
                                    <span className="text-[11px] font-bold text-gray-600 uppercase">POD OCCUPANCY</span>
                                </div>
                                <span className="text-[11px] font-bold text-black">{occupiedPods}/{totalPods}</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-2">
                                <div 
                                    className="bg-blue-500 h-2 rounded-full transition-all" 
                                    style={{ width: `${totalPods > 0 ? (occupiedPods / totalPods) * 100 : 0}%` }}
                                />
                            </div>
                        </div>
                        
                        <div>
                            <div className="flex justify-between items-end mb-2">
                                <div className="flex items-center gap-2">
                                    <Lock size={14} className="text-gray-400" />
                                    <span className="text-[11px] font-bold text-gray-600 uppercase">LOCKER USAGE</span>
                                </div>
                                <span className="text-[11px] font-bold text-black">{occupiedLockers}/{totalLockers}</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-2">
                                <div 
                                    className="bg-purple-500 h-2 rounded-full transition-all" 
                                    style={{ width: `${totalLockers > 0 ? (occupiedLockers / totalLockers) * 100 : 0}%` }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Asset Overview */}
                <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <Package size={18} className="text-black"/>
                        <h3 className="text-[12px] font-black text-black uppercase tracking-[0.2em]">ASSET OVERVIEW</h3>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-gray-50 rounded-2xl text-center">
                            <Car size={20} className="mx-auto text-blue-500 mb-2" />
                            <p className="text-[20px] font-black text-black">{activeVehicles}</p>
                            <p className="text-[10px] text-gray-500 uppercase">Active Vehicles</p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-2xl text-center">
                            <Building size={20} className="mx-auto text-green-500 mb-2" />
                            <p className="text-[20px] font-black text-black">{totalBuildings}</p>
                            <p className="text-[10px] text-gray-500 uppercase">Buildings</p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-2xl text-center">
                            <Package size={20} className="mx-auto text-purple-500 mb-2" />
                            <p className="text-[20px] font-black text-black">{totalAssets}</p>
                            <p className="text-[10px] text-gray-500 uppercase">General Assets</p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-2xl text-center">
                            <Wrench size={20} className="mx-auto text-orange-500 mb-2" />
                            <p className="text-[20px] font-black text-black">{serviceVehicles}</p>
                            <p className="text-[10px] text-gray-500 uppercase">In Service</p>
                        </div>
                    </div>
                </div>

                {/* Recent Activities */}
                <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-[12px] font-black text-black uppercase tracking-[0.2em]">RECENT ACTIVITIES</h3>
                    </div>
                    
                    <div className="space-y-3">
                        {recentActivities.slice(0, 5).map((activity, idx) => (
                            <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                                {getStatusIcon(activity.status)}
                                <div className="flex-1 min-w-0">
                                    <p className="text-[11px] font-bold text-black truncate">{activity.itemName || activity.type}</p>
                                    <p className="text-[10px] text-gray-500">{activity.type}</p>
                                </div>
                                <span className={`text-[9px] font-bold px-2 py-1 rounded-full ${
                                    activity.status?.toLowerCase().includes('approved') ? 'bg-green-100 text-green-700' :
                                    activity.status?.toLowerCase().includes('pending') ? 'bg-orange-100 text-orange-700' :
                                    'bg-gray-100 text-gray-700'
                                }`}>
                                    {activity.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* QUICK ACCESS */}
            <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                <h3 className="text-[12px] font-black text-black uppercase tracking-[0.2em] mb-6">QUICK ACCESS</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {[
                        { label: 'Request ATK', icon: Package, menu: 'Request ATK' },
                        { label: 'Daftar Kendaraan', icon: Car, menu: 'Daftar Kendaraan' },
                        { label: 'Daftar Gedung', icon: Building, menu: 'Daftar Gedung' },
                        { label: 'Pod Request', icon: Bed, menu: 'Pod Request' },
                        { label: 'Locker Request', icon: Lock, menu: 'Locker Request' },
                        { label: 'Log Book', icon: Users, menu: 'Log Book' },
                    ].map((item, idx) => (
                        <button
                            key={idx}
                            onClick={() => onNavigate(item.menu)}
                            className="p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-all group text-center"
                        >
                            <item.icon size={24} className="mx-auto text-gray-600 group-hover:text-black mb-2" />
                            <p className="text-[10px] font-bold text-gray-600 group-hover:text-black uppercase">{item.label}</p>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
