import { NavLink } from 'react-router-dom';
import { 
  BarChart2, 
  FileText, 
  Users, 
  Building2, 
  Mail, 
  FileCheck,
  LogOut,
  GitBranch
} from 'lucide-react';

import { useAuth } from '../context/AuthContext';

export default function Sidebar() {
  const { user, hasPermission, logout } = useAuth();

  return (
    <aside className="sidebar-modern animate-slide-left">
      <div className="sidebar-brand">
        <div className="w-20 h-20 rounded-2xl bg-white flex items-center justify-center shadow-lg mb-4 ring-4 ring-white/5 group-hover:scale-110 transition-transform duration-500 overflow-hidden">
          <img src="/ucc-logo.png" alt="UCC Logo" className="w-16 h-16 object-contain" />
        </div>
        <h2 className="text-xl font-black tracking-tighter text-white uppercase">University <span className="text-ucc-gold font-light tracking-widest text-[10px] block mt-1 opacity-60">Document Management</span></h2>
        <div className="mt-4 flex items-center gap-2 bg-white/5 py-1 px-3 rounded-full border border-white/10">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
          <span className="text-[10px] uppercase tracking-widest font-bold text-white/50">Institutional Sync</span>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto custom-scrollbar mt-4">
        <ul className="sidebar-menu">
          {hasPermission('dashboard') && (
            <li>
              <NavLink to="/dashboard" className={({ isActive }) => isActive ? "active group" : "group"}>
                <BarChart2 size={20} /> <span>Dashboard</span>
              </NavLink>
            </li>
          )}
          {hasPermission('documents') && (
            <li>
              <NavLink to="/documents" className={({ isActive }) => isActive ? "active group" : "group"}>
                <FileText size={20} /> <span>Documents</span>
              </NavLink>
            </li>
          )}
          {hasPermission('correspondence') && (
            <li>
              <NavLink to="/correspondence" className={({ isActive }) => isActive ? "active group" : "group"}>
                <Mail size={20} /> <span>Correspondence</span>
              </NavLink>
            </li>
          )}
          {hasPermission('workflows') && (
            <li>
              <NavLink to="/workflows" className={({ isActive }) => isActive ? "active group" : "group"}>
                <GitBranch size={20} /> <span>Workflows</span>
              </NavLink>
            </li>
          )}
          
          <div className="px-8 mt-8 mb-2">
            <span className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">Management</span>
          </div>

          {hasPermission('users') && (
            <li>
              <NavLink to="/users" className={({ isActive }) => isActive ? "active group" : "group"}>
                <Users size={20} /> <span>User Directory</span>
              </NavLink>
            </li>
          )}
          {hasPermission('departments') && (
            <li>
              <NavLink to="/departments" className={({ isActive }) => isActive ? "active group" : "group"}>
                <Building2 size={20} /> <span>Departments</span>
              </NavLink>
            </li>
          )}
          {hasPermission('reports') && (
            <li>
              <NavLink to="/reports" className={({ isActive }) => isActive ? "active group" : "group"}>
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
            <p className="text-xs font-bold text-white truncate">{user?.name}</p>
            <p className="text-[10px] text-white/40 truncate font-medium">{user?.role}</p>
          </div>
          <button onClick={logout} className="p-2 text-white/40 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all" title="Logout">
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
}
