import { useEffect, useState } from 'react';
import { Menu } from 'lucide-react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import TopHeader from '../components/TopHeader';

export default function MainLayout() {
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth >= 1024 : false
  );
  const [sidebarOpen, setSidebarOpen] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth >= 1024 : false
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)');
    const syncSidebar = (matches: boolean) => {
      setIsDesktop(matches);
      setSidebarOpen(matches);
    };

    syncSidebar(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      syncSidebar(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return (
    <div className={`app-shell flex h-screen overflow-hidden bg-gray-50 font-sans ${sidebarOpen ? 'layout-sidebar-open' : ''}`}>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-[60] bg-[#001226]/50 backdrop-blur-[2px] lg:hidden"
        />
      )}
      <button
        type="button"
        aria-label={sidebarOpen ? 'Hide navigation' : 'Show navigation'}
        aria-pressed={sidebarOpen}
        onClick={() => setSidebarOpen((current) => !current)}
        className={`fixed top-4 sm:top-5 z-[90] h-12 w-12 rounded-2xl border transition-all duration-300 ease-out ${
          sidebarOpen
            ? 'bg-ucc-gold text-[#001226] border-ucc-gold shadow-xl shadow-ucc-gold/20'
            : 'bg-white/95 text-gray-600 border-gray-200 shadow-lg shadow-black/10 hover:border-ucc-blue/20 hover:text-ucc-blue'
        }`}
        style={{
          left: isDesktop && sidebarOpen ? 'calc(var(--sidebar-shell-width) - 1.6rem)' : '1rem',
        }}
      >
        <Menu size={18} className="mx-auto" />
      </button>
      <div
        className={`flex-1 min-w-0 flex flex-col overflow-hidden relative transition-[margin] duration-300 ease-out ${
          sidebarOpen ? 'lg:ml-[var(--sidebar-shell-width)]' : 'lg:ml-0'
        }`}
      >
        {/* Background Decorative Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM5QzkyQUMiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djI2SDI0VjM0SDN2LWhatWMzZWM2aDIydjI2aDEyVjM0aDMyVjIyaC0zMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50 pointer-events-none"></div>
        
        <TopHeader />
        
        <main className="flex-1 overflow-y-auto px-4 py-4 md:px-6 md:py-6 xl:px-8 xl:py-7 2xl:px-10 2xl:py-8 relative z-10">
          <div className="max-w-[1880px] mx-auto w-full h-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
