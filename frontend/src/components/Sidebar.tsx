import { NavLink } from 'react-router-dom';
import { 
  BarChart2, 
  FileText, 
  Users, 
  Building2, 
  Mail, 
  FileCheck,
  LogOut,
  GitBranch,
  X
} from 'lucide-react';

import { useAuth } from '../context/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { user, hasPermission, logout } = useAuth();
  const handleNavItemClick = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <aside
      className={`sidebar-modern ${isOpen ? 'translate-x-0 pointer-events-auto' : '-translate-x-full pointer-events-none'}`}
      aria-hidden={!isOpen}
    >
      <div className="sidebar-brand">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 lg:hidden w-10 h-10 rounded-xl border border-white/10 bg-white/5 text-white/70 hover:text-white hover:bg-white/10 transition-all"
          aria-label="Close navigation"
        >
          <X size={18} className="mx-auto" />
        </button>
        <div className="w-[4.75rem] h-[4.75rem] xl:w-20 xl:h-20 rounded-2xl bg-white flex items-center justify-center shadow-lg mb-4 ring-4 ring-white/5 group-hover:scale-110 transition-transform duration-500 overflow-hidden">
          <img src="/ucc-logo.png" alt="UCC Logo" className="w-14 h-14 xl:w-16 xl:h-16 object-contain" />
        </div>
        <h2 className="font-display text-[1.25rem] xl:text-[1.35rem] font-black tracking-[-0.06em] text-white uppercase text-center">
          UDMS
          <span className="text-ucc-gold font-semibold tracking-[0.24em] text-[10px] block mt-1.5 opacity-70">
            Document Management
          </span>
        </h2>
      </div>

      <nav className="flex-1 overflow-y-auto custom-scrollbar mt-4">
        <ul className="sidebar-menu">
          {hasPermission('dashboard') && (
            <li>
              <NavLink to="/dashboard" onClick={handleNavItemClick} className={({ isActive }) => isActive ? "active group" : "group"}>
                <BarChart2 size={20} /> <span>Dashboard</span>
              </NavLink>
            </li>
          )}
          {hasPermission('documents') && (
            <li>
              <NavLink to="/documents" onClick={handleNavItemClick} className={({ isActive }) => isActive ? "active group" : "group"}>
                <FileText size={20} /> <span>Documents</span>
              </NavLink>
            </li>
          )}
          {hasPermission('correspondence') && (
            <li>
              <NavLink to="/correspondence" onClick={handleNavItemClick} className={({ isActive }) => isActive ? "active group" : "group"}>
                <Mail size={20} /> <span>Letters</span>
              </NavLink>
            </li>
          )}
          {hasPermission('workflows') && (
            <li>
              <NavLink to="/workflows" onClick={handleNavItemClick} className={({ isActive }) => isActive ? "active group" : "group"}>
                <GitBranch size={20} /> <span>Workflows</span>
              </NavLink>
            </li>
          )}
          
          <div className="px-8 mt-8 mb-2">
            <span className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">Management</span>
          </div>

          {hasPermission('users') && (
            <li>
              <NavLink to="/users" onClick={handleNavItemClick} className={({ isActive }) => isActive ? "active group" : "group"}>
                <Users size={20} /> <span>User Directory</span>
              </NavLink>
            </li>
          )}
          {hasPermission('departments') && (
            <li>
              <NavLink to="/departments" onClick={handleNavItemClick} className={({ isActive }) => isActive ? "active group" : "group"}>
                <Building2 size={20} /> <span>Departments</span>
              </NavLink>
            </li>
          )}
          {hasPermission('reports') && (
            <li>
              <NavLink to="/reports" onClick={handleNavItemClick} className={({ isActive }) => isActive ? "active group" : "group"}>
                <FileCheck size={20} /> <span>Reports</span>
              </NavLink>
            </li>
          )}
        </ul>
      </nav>

      <div className="p-6 border-t border-white/5">
        <div className="bg-white/5 rounded-2xl p-4 flex items-center gap-3 border border-white/10">
          <div className="w-10 h-10 rounded-xl bg-ucc-blue-light flex items-center justify-center text-ucc-gold shadow-inner">
            <Users size={18} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-bold text-white truncate">{user?.name}</p>
            <p className="text-[10px] text-white/40 truncate font-medium uppercase tracking-widest">{user?.role}</p>
          </div>
          <button onClick={logout} className="p-2 text-white/40 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all" title="Logout">
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
}
