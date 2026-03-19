import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import TopHeader from '../components/TopHeader';

export default function MainLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col lg:ml-64 xl:ml-72 overflow-hidden relative transition-all duration-300">
        {/* Background Decorative Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM5QzkyQUMiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djI2SDI0VjM0SDN2LWhatWMzZWM2aDIydjI2aDEyVjM0aDMyVjIyaC0zMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50 pointer-events-none"></div>
        
        <TopHeader />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-8 relative z-10">
          <div className="max-w-[1600px] mx-auto w-full h-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
