import React, { useState, Suspense } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { TopBar } from '../components/TopBar';
import { routeMap } from '../routeMap';

// Reverse map untuk mendapatkan label dari path
const pathToLabel: Record<string, string> = Object.entries(routeMap).reduce(
  (acc, [label, path]) => ({ ...acc, [path]: label }),
  {}
);

const MainLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Get active item from current path
  const activeItem = pathToLabel[location.pathname] || 'Dashboard';

  const handleNavigate = (item: string) => {
    const path = routeMap[item];
    if (path) {
      navigate(path);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        activeItem={activeItem}
        onNavigate={handleNavigate}
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        isMobileOpen={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
      />

      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isSidebarCollapsed ? 'lg:ml-[90px]' : 'lg:ml-[280px]'
        }`}
      >
        <TopBar
          onMenuClick={() => setIsMobileMenuOpen(true)}
        />

        <main className="flex-1 overflow-auto p-6">
          <Suspense
            fallback={
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
              </div>
            }
          >
            <Outlet />
          </Suspense>
        </main>
      </div>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default MainLayout;
