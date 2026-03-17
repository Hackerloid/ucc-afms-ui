import { Bell, Search, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function TopHeader() {
  const { user } = useAuth();
  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-40 border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex-1 max-w-xl">
          <div className="relative group">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
              <Search size={18} />
            </span>
            <input 
              type="text" 
              placeholder="Search documents, records..." 
              className="w-full bg-gray-100/50 border border-transparent rounded-full py-2 pl-10 pr-4 focus:bg-white focus:border-ucc-blue/30 focus:ring-2 focus:ring-ucc-blue/20 transition-all outline-none"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-6 ml-4">
          <Link to="/offline" className="hidden md:flex items-center text-sm font-medium text-amber-600 bg-amber-50 px-3 py-1.5 rounded-full hover:bg-amber-100 transition-colors">
            <span className="w-2 h-2 rounded-full bg-amber-500 mr-2 animate-pulse"></span>
            Offline Mode
          </Link>
          
          <button className="relative p-2 text-gray-500 hover:text-ucc-blue hover:bg-gray-100 rounded-full transition-colors">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          
          <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
            <div className="hidden text-right md:block">
              <p className="text-sm font-semibold text-gray-800">{user?.name || 'Guest User'}</p>
              <p className="text-xs text-gray-500">{user?.role || 'Access Restricted'}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-ucc-blue/10 flex items-center justify-center text-ucc-blue border border-ucc-blue/20">
              <User size={20} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
