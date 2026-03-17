import { NavLink } from 'react-router-dom';
import { 
  BarChart2, 
  FileText, 
  Users, 
  Settings, 
  Building2, 
  Mail, 
  FileCheck,
  LogOut,
  GitBranch,
  FileCode,
  WifiOff
} from 'lucide-react';

import { useAuth } from '../context/AuthContext';

export default function Sidebar() {
  const { user, hasPermission, logout } = useAuth();

  return (
    <aside className="sidebar-modern animate-slide-left">
      <div className="sidebar-brand">
        <h2 className="text-2xl font-bold tracking-wider">UCC DMS</h2>
        <div className="flex flex-col mt-2">
          <span className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-bold">Acting As</span>
          <span className="text-xs text-ucc-gold/80 font-bold flex items-center gap-1.5 min-w-[120px]">
            <span className="w-1.5 h-1.5 rounded-full bg-ucc-gold"></span>
            {user?.role || 'Guest'}
          </span>
        </div>
      </div>
      <ul className="sidebar-menu">
        {hasPermission('dashboard') && (
          <li>
            <NavLink to="/dashboard" className={({ isActive }) => isActive ? "active" : ""}>
              <BarChart2 size={20} /> <span>Dashboard</span>
            </NavLink>
          </li>
        )}
        {hasPermission('documents') && (
          <li>
            <NavLink to="/documents" className={({ isActive }) => isActive ? "active" : ""}>
              <FileText size={20} /> <span>Documents</span>
            </NavLink>
          </li>
        )}
        {hasPermission('reports') && (
          <li>
            <NavLink to="/reports" className={({ isActive }) => isActive ? "active" : ""}>
              <FileCheck size={20} /> <span>Reports</span>
            </NavLink>
          </li>
        )}
        {hasPermission('users') && (
          <li>
            <NavLink to="/users" className={({ isActive }) => isActive ? "active" : ""}>
              <Users size={20} /> <span>Users</span>
            </NavLink>
          </li>
        )}
        {hasPermission('departments') && (
          <li>
            <NavLink to="/departments" className={({ isActive }) => isActive ? "active" : ""}>
              <Building2 size={20} /> <span>Departments</span>
            </NavLink>
          </li>
        )}
        {hasPermission('correspondence') && (
          <li>
            <NavLink to="/correspondence" className={({ isActive }) => isActive ? "active" : ""}>
              <Mail size={20} /> <span>Correspondence</span>
            </NavLink>
          </li>
        )}
        {hasPermission('workflows') && (
          <li>
            <NavLink to="/workflows" className={({ isActive }) => isActive ? "active" : ""}>
              <GitBranch size={20} /> <span>Workflows</span>
            </NavLink>
          </li>
        )}
        {hasPermission('templates') && (
          <li>
            <NavLink to="/templates" className={({ isActive }) => isActive ? "active" : ""}>
              <FileCode size={20} /> <span>Templates</span>
            </NavLink>
          </li>
        )}
        {hasPermission('settings') && (
          <li>
            <NavLink to="/settings" className={({ isActive }) => isActive ? "active" : ""}>
              <Settings size={20} /> <span>Settings</span>
            </NavLink>
          </li>
        )}
        {hasPermission('offline') && (
          <li>
            <NavLink to="/offline" className={({ isActive }) => isActive ? "active" : ""}>
              <WifiOff size={20} /> <span>Offline Mode</span>
            </NavLink>
          </li>
        )}
        <li className="logout">
          <button onClick={logout} className="w-full flex items-center gap-4 px-6 py-4 text-white/60 hover:text-white transition-colors">
            <LogOut size={20} /> <span>Logout</span>
          </button>
        </li>
      </ul>
      <div className="p-4 text-center mt-auto border-t border-white/10">
        <p className="text-xs text-white/40">© 2026 UCC DMS</p>
      </div>
    </aside>
  );
}
