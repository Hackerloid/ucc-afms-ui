import { Bell, Search, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function TopHeader() {
  const { user } = useAuth();

  return (
    <header className="bg-white/70 backdrop-blur-xl shadow-[0_1px_0_0_rgba(0,0,0,0.05)] sticky top-0 z-[80] lg:z-40 border-b border-white/40 px-4 py-3 md:px-6 xl:px-8 2xl:px-10">
      <div className="flex items-center justify-between gap-4 max-w-[1880px] mx-auto">
        <div className="flex items-center gap-3 xl:gap-4 flex-1 min-w-0 max-w-[48rem]">
          <div className="relative group flex-1">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 group-focus-within:text-ucc-blue transition-colors">
              <Search size={18} />
            </span>
            <input
              type="text"
              placeholder="Search records, letters, departments, or users..."
              className="w-full bg-gray-50/80 border border-gray-200/50 rounded-2xl py-2.5 xl:py-3 pl-11 pr-5 focus:bg-white focus:border-ucc-blue/30 focus:ring-4 focus:ring-ucc-blue/5 transition-all outline-none text-sm xl:text-[15px] shadow-inner"
            />
            <div className="absolute inset-y-0 right-3 flex items-center">
              <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-[10px] font-bold text-gray-400 bg-white border border-gray-200 rounded-lg">
                Ctrl K
              </kbd>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 xl:gap-3 ml-2 md:ml-4 xl:ml-8">
          <div className="flex items-center gap-1 xl:gap-2 mr-1 xl:mr-4">
            <div className="hidden md:block h-8 w-[1px] bg-gray-200 mx-2"></div>
            <button className="p-2.5 text-gray-500 hover:text-ucc-blue hover:bg-ucc-blue/5 rounded-xl transition-all relative group">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-ucc-red rounded-full border-2 border-white ring-2 ring-ucc-red/20"></span>
              <div className="absolute top-full right-0 mt-2 bg-white shadow-xl border border-gray-100 rounded-xl p-3 w-64 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all translate-y-2 group-hover:translate-y-0 z-50 pointer-events-none">
                <p className="text-xs font-bold text-gray-900 mb-2 uppercase tracking-tight">
                  Recent Notifications
                </p>
                <div className="space-y-2">
                  <div className="text-[11px] text-gray-600 border-l-2 border-ucc-blue pl-2 py-1">
                    New letter from Academic Affairs
                  </div>
                  <div className="text-[11px] text-gray-600 border-l-2 border-ucc-gold pl-2 py-1">
                    Meeting scheduled for 2:00 PM
                  </div>
                </div>
              </div>
            </button>
            <Link
              to="/settings"
              className="p-2.5 text-gray-500 hover:text-ucc-blue hover:bg-ucc-blue/5 rounded-xl transition-all"
            >
              <User size={20} />
            </Link>
          </div>

          <div className="flex items-center gap-3 xl:gap-4 pl-3 xl:pl-6 border-l border-gray-100">
            <div className="hidden text-right xl:block">
              <p className="text-sm xl:text-[15px] font-black text-gray-900 leading-tight tracking-tight">
                {user?.name}
              </p>
              <div className="flex items-center justify-end gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-ucc-blue animate-pulse-soft"></span>
                <p className="text-[10px] font-bold text-ucc-blue/60 uppercase tracking-widest">
                  {user?.role}
                </p>
              </div>
            </div>
            <Link to="/settings" className="relative">
              <div className="w-11 h-11 xl:w-12 xl:h-12 rounded-2xl bg-gradient-to-tr from-ucc-blue to-ucc-blue/80 flex items-center justify-center text-white shadow-lg shadow-ucc-blue/20 ring-2 ring-white overflow-hidden group cursor-pointer hover:scale-105 transition-transform">
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span className="text-sm font-bold">
                  {user?.name?.split(' ').map((name) => name[0]).join('')}
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
