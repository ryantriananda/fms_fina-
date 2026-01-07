
import React, { useState } from 'react';
import { Bell, ChevronDown, Menu, Search, UserCircle, Shield, Briefcase, User } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Props {
  breadcrumbs?: string[];
  onMenuClick?: () => void;
  userRole: 'Admin' | 'Staff' | 'Officer';
  onRoleChange: (role: 'Admin' | 'Staff' | 'Officer') => void;
}

export const TopBar: React.FC<Props> = ({ 
    breadcrumbs = ['Home', 'Asset Monitoring'], 
    onMenuClick,
    userRole,
    onRoleChange
}) => {
  const { language, setLanguage } = useLanguage();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isRoleOpen, setIsRoleOpen] = useState(false);

  const toggleLanguage = (lang: 'id' | 'en') => {
    setLanguage(lang);
    setIsLangOpen(false);
  };

  const handleRoleSelect = (role: 'Admin' | 'Staff' | 'Officer') => {
      onRoleChange(role);
      setIsRoleOpen(false);
  };

  const getRoleIcon = (role: string) => {
      switch(role) {
          case 'Admin': return <Shield size={14} className="text-purple-500" />;
          case 'Officer': return <Briefcase size={14} className="text-blue-500" />;
          default: return <User size={14} className="text-green-500" />;
      }
  };

  const getRoleColor = (role: string) => {
      switch(role) {
          case 'Admin': return 'bg-purple-50 text-purple-700 border-purple-100';
          case 'Officer': return 'bg-blue-50 text-blue-700 border-blue-100';
          default: return 'bg-green-50 text-green-700 border-green-100';
      }
  };

  return (
    <header className="h-20 bg-[#FBFBFB] flex items-center justify-between px-8 sticky top-0 z-30 transition-all">
      <div className="flex items-center gap-6">
        {/* Hamburger Menu for Mobile */}
        <button 
          onClick={onMenuClick} 
          className="lg:hidden p-2 hover:bg-white rounded-xl text-black shadow-sm"
        >
          <Menu size={24} />
        </button>

        {/* Breadcrumbs - Stylish */}
        <div className="hidden sm:flex items-center gap-3 text-sm">
           {breadcrumbs.map((item, index) => (
               <React.Fragment key={index}>
                   <span className={`font-black uppercase tracking-tight ${index === breadcrumbs.length - 1 ? 'text-black text-[14px]' : 'text-gray-300 text-[12px]'}`}>
                     {item}
                   </span>
                   {index < breadcrumbs.length - 1 && <span className="text-gray-300">/</span>}
               </React.Fragment>
           ))}
        </div>
      </div>

      <div className="flex items-center gap-6">
        
        {/* ROLE SWITCHER (FOR DEMO/DEV) */}
        <div className="relative hidden md:block">
            <button 
                onClick={() => setIsRoleOpen(!isRoleOpen)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl border transition-all ${getRoleColor(userRole)}`}
            >
                {getRoleIcon(userRole)}
                <span className="text-[10px] font-black uppercase tracking-wider">View: {userRole}</span>
                <ChevronDown size={12} />
            </button>

            {isRoleOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-gray-100 py-2 z-50 overflow-hidden">
                    <div className="px-4 py-2 text-[9px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50">Switch Role View</div>
                    {['Admin', 'Officer', 'Staff'].map((role) => (
                        <button 
                            key={role}
                            onClick={() => handleRoleSelect(role as any)}
                            className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors"
                        >
                            {getRoleIcon(role)}
                            <span className={`text-[11px] font-bold ${userRole === role ? 'text-black' : 'text-gray-500'}`}>{role}</span>
                            {userRole === role && <div className="w-1.5 h-1.5 rounded-full bg-black ml-auto"></div>}
                        </button>
                    ))}
                </div>
            )}
        </div>

        {/* Search Bar (Visual Only) */}
        <div className="hidden xl:flex items-center bg-white px-4 py-2.5 rounded-full border border-gray-100 shadow-sm w-64">
            <Search size={14} className="text-gray-300" />
            <input type="text" placeholder="Search anything..." className="bg-transparent border-none outline-none text-[11px] font-bold ml-2 w-full placeholder:text-gray-300" />
        </div>

        {/* Language Switcher */}
        <div className="relative">
          <button 
            onClick={() => setIsLangOpen(!isLangOpen)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-gray-100 shadow-sm hover:border-gray-300 transition-all"
          >
            {language === 'id' ? (
                <img src="https://flagcdn.com/w40/id.png" alt="Indonesia" className="w-5 h-auto rounded-sm" />
            ) : (
                <img src="https://flagcdn.com/w40/us.png" alt="English" className="w-5 h-auto rounded-sm" />
            )}
            <span className="text-[10px] font-black text-black uppercase">{language}</span>
            <ChevronDown size={12} className="text-gray-400" />
          </button>

          {isLangOpen && (
            <div className="absolute top-full right-0 mt-2 w-36 bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-gray-100 py-2 z-50 overflow-hidden">
                <button 
                  onClick={() => toggleLanguage('id')}
                  className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors"
                >
                    <img src="https://flagcdn.com/w40/id.png" alt="Indonesia" className="w-5 h-auto" />
                    <span className="text-[11px] font-bold">Indonesia</span>
                </button>
                <button 
                  onClick={() => toggleLanguage('en')}
                  className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors"
                >
                    <img src="https://flagcdn.com/w40/us.png" alt="English" className="w-5 h-auto" />
                    <span className="text-[11px] font-bold">English</span>
                </button>
            </div>
          )}
        </div>

        {/* Notifications */}
        <button className="relative p-2.5 bg-white rounded-xl border border-gray-100 shadow-sm hover:bg-gray-50 transition-all group">
          <Bell size={18} className="text-gray-400 group-hover:text-black transition-colors" />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        
        {/* Divider */}
        <div className="h-8 w-[1px] bg-gray-200"></div>

        {/* User Profile */}
        <div className="flex items-center gap-3 cursor-pointer pl-2">
          <div className="text-right hidden sm:block">
            <p className="text-[12px] font-black text-black leading-tight uppercase">Ibnu Faisal</p>
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">{userRole}</p>
          </div>
          <div className="relative">
             <img 
                src="https://picsum.photos/id/1005/100/100" 
                alt="Profile" 
                className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-md"
            />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
        </div>
      </div>
    </header>
  );
};
