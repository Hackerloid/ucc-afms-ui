import { 
  FileText, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  TrendingUp,
  ArrowRight,
  Users,
  Settings,
  Plus
} from 'lucide-react';

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Reusable Stat Card Component
const StatCard = ({ title, value, icon, colorClass, trend, delay }: { title: string, value: string, icon: React.ReactNode, colorClass: string, trend?: string, delay: string }) => (
  <div className="glass-card p-6 relative overflow-hidden group hover:scale-[1.02] border-t-2" style={{ borderTopColor: colorClass, animationDelay: delay }}>
    <div className="absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 bg-current opacity-[0.03] rounded-full transition-transform duration-700 group-hover:scale-150" style={{ color: colorClass }}></div>
    <div className="flex justify-between items-start relative z-10">
      <div>
        <p className="text-[10px] font-black tracking-[0.15em] text-gray-400 uppercase mb-2">{title}</p>
        <h3 className="text-3xl font-black text-gray-900 tracking-tight">{value}</h3>
      </div>
      <div className={`p-3 rounded-2xl shadow-inner transition-colors duration-500`} style={{ backgroundColor: `${colorClass}15`, color: colorClass }}>
        {icon}
      </div>
    </div>
    {trend && (
      <div className="mt-4 flex items-center text-[11px] font-bold uppercase tracking-wider relative z-10">
        <span className="text-green-500 flex items-center bg-green-500/10 px-2 py-0.5 rounded-full">
          <TrendingUp size={14} className="mr-1" />
          {trend}
        </span>
        <span className="text-gray-400 ml-2">Growth vs Last Term</span>
      </div>
    )}
  </div>
);

export default function Dashboard() {
  const { user, hasPermission } = useAuth();
  const navigate = useNavigate();

  const recentDocuments = [
    { id: 'DOC-2026-089', title: 'Q1 Financial Report', department: 'Finance', status: 'Approved', date: '2 hours ago', iconColor: 'text-green-500', bgColor: 'bg-green-100' },
    { id: 'DOC-2026-088', title: 'New Employee Onboarding Policy', department: 'HR', status: 'Pending Review', date: '5 hours ago', iconColor: 'text-amber-500', bgColor: 'bg-amber-100' },
    { id: 'DOC-2026-087', title: 'IT Infrastructure Upgrade Proposal', department: 'IT', status: 'In Progress', date: '1 day ago', iconColor: 'text-blue-500', bgColor: 'bg-blue-100' },
    { id: 'DOC-2026-086', title: 'Annual General Meeting Minutes', department: 'Administration', status: 'Approved', date: '2 days ago', iconColor: 'text-green-500', bgColor: 'bg-green-100' },
  ];

  return (
    <div className="workspace-page">
      {/* Header / Greetings */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="animate-slide-up">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-1 rounded bg-ucc-blue/5 text-ucc-blue text-[10px] font-black uppercase tracking-widest border border-ucc-blue/10">Academic Term 2025/2026</span>
            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
          </div>
          <h1 className="workspace-title">
            Welcome back, <span className="text-ucc-blue">{user?.name.split(' ')[0]}</span>
          </h1>
          <p className="workspace-subtitle max-w-2xl">
            {user?.role === 'Super Admin' ? 
              'System health is optimal. You have full oversight of University document flows and institutional records.' : 
              `Accessing established records for the ${user?.department}. Ensure all incoming correspondence is digitized.`}
          </p>
        </div>
        <div className="flex gap-3 animate-slide-up" style={{ animationDelay: '100ms' }}>
          {hasPermission('reports') && (
            <button 
              onClick={() => navigate('/reports')}
              className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-2xl hover:bg-gray-50 transition-all shadow-sm font-bold text-xs uppercase tracking-widest hover:shadow-md"
            >
              Open Reports
            </button>
          )}
          {hasPermission('documents') && (
            <button 
              onClick={() => navigate('/documents?new=true')}
              className="px-6 py-2.5 bg-ucc-blue hover:bg-black text-white rounded-2xl shadow-xl shadow-ucc-blue/20 transition-all hover:-translate-y-1 font-bold text-xs uppercase tracking-widest flex items-center gap-2"
            >
              <Plus size={16} /> Register Document
            </button>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 xl:gap-6 2xl:gap-7 animate-slide-up" style={{ animationDelay: '200ms' }}>
        <StatCard 
          title="Total Repository" 
          value="1,284" 
          icon={<FileText size={22} />} 
          colorClass="#003366" // ucc-blue
          trend="+12%"
          delay="0ms"
        />
        <StatCard 
          title="Pending Unit Action" 
          value="42" 
          icon={<Clock size={22} />} 
          colorClass="#FFCC00" // ucc-gold
          trend="-5%"
          delay="50ms"
        />
        <StatCard 
          title="Letters Finalized" 
          value="156" 
          icon={<CheckCircle size={22} />} 
          colorClass="#10B981" // emerald-500
          trend="+18%"
          delay="100ms"
        />
        <StatCard 
          title="Urgent Flags" 
          value="07" 
          icon={<AlertCircle size={22} />} 
          colorClass="#CC0000" // ucc-red
          delay="150ms"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-5 2xl:grid-cols-6 gap-6 xl:gap-7 2xl:gap-8">
        
        {/* Recent Activity List */}
        <div className="xl:col-span-4 2xl:col-span-5 space-y-4 animate-slide-up" style={{ animationDelay: '300ms' }}>
          <div className="flex items-center justify-between px-2">
            <h3 className="section-title">Recent Activities</h3>
            <button 
              onClick={() => navigate('/documents')}
              className="text-[10px] font-black text-ucc-blue hover:underline uppercase tracking-widest flex items-center gap-1 group"
            >
              View Repository <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <div className="glass-panel group">
            <div className="p-0 overflow-x-auto">
              <table className="w-full text-sm text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/50">
                    <th className="px-8 py-5 font-black text-[10px] text-gray-400 uppercase tracking-widest">Document Entity</th>
                    <th className="px-6 py-5 font-black text-[10px] text-gray-400 uppercase tracking-widest">Origin Unit</th>
                    <th className="px-6 py-5 font-black text-[10px] text-gray-400 uppercase tracking-widest">Classification</th>
                    <th className="px-6 py-5"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {recentDocuments.map((doc, idx) => (
                    <tr 
                      key={idx} 
                      onClick={() => navigate('/documents')}
                      className="hover:bg-white transition-colors group/row cursor-pointer"
                    >
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-2xl ${doc.bgColor} rounded-xl flex items-center justify-center group-hover/row:scale-110 transition-transform duration-500 shadow-sm shadow-black/5`}>
                            <FileText size={20} className={doc.iconColor} />
                          </div>
                          <div className="min-w-0">
                            <div className="font-bold text-gray-900 truncate tracking-tight">{doc.title}</div>
                            <div className="text-[10px] text-gray-400 mt-1 font-bold uppercase tracking-wider">{doc.id} - {doc.date}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className="text-xs font-bold text-gray-600 bg-gray-100/80 px-3 py-1 rounded-lg">
                          {doc.department}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter border-2 ${
                          doc.status === 'Approved' ? 'bg-green-50 text-green-700 border-green-200' :
                          doc.status === 'Pending Review' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                          'bg-blue-50 text-blue-700 border-blue-200'
                        }`}>
                          {doc.status}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <button className="text-gray-300 hover:text-ucc-blue transition-all p-2 rounded-xl group-hover/row:bg-ucc-blue/5">
                          <ArrowRight size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Sidebar Info Panels */}
        <div className="space-y-8 animate-slide-up xl:col-span-1" style={{ animationDelay: '400ms' }}>
          
          {/* Quick Hub */}
          <div className="space-y-4">
            <h3 className="section-title px-2">Access Hub</h3>
            <div className="grid grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-4">
              <QuickActionBtn 
                icon={<FileText size={20} />} 
                label="Registry" 
                color="bg-blue-50 text-blue-600" 
                hasPermission={hasPermission('documents')}
                onClick={() => navigate('/documents')}
              />
              <QuickActionBtn 
                icon={<Clock size={20} />} 
                label="Approvals" 
                color="bg-amber-50 text-amber-600" 
                hasPermission={hasPermission('workflows')}
                onClick={() => navigate('/workflows')}
              />
              <QuickActionBtn 
                icon={<Users size={20} />} 
                label="Directory" 
                color="bg-green-50 text-green-600" 
                hasPermission={hasPermission('users')}
                onClick={() => navigate('/users')}
              />
              <QuickActionBtn 
                icon={<Settings size={20} />} 
                label="Support" 
                color="bg-purple-50 text-purple-600" 
                hasPermission={hasPermission('settings')}
                onClick={() => navigate('/settings')}
              />
            </div>
          </div>

          {/* Institutional Reminders */}
          <div className="space-y-4">
            <h3 className="section-title px-2">Institutional Letters</h3>
            <div className="glass-panel p-2">
              <ul className="space-y-1">
                <MemoItem title="Review VC Annual Address" due="Action Required" priority="high" onClick={() => navigate('/correspondence')} />
                <MemoItem title="Digital Transition Workshop" due="Ongoing" priority="medium" onClick={() => navigate('/correspondence')} />
                <MemoItem title="Budget Planning Phase 2" due="Tomorrow" priority="medium" onClick={() => navigate('/correspondence')} />
              </ul>
              <button className="w-full mt-4 py-3 text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-ucc-blue transition-colors border-t border-gray-100">
                Open Integrated Calendar
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// Sub-components for cleaner Dashboard
const QuickActionBtn = ({ icon, label, color, hasPermission, onClick }: any) => {
  if (!hasPermission) return null;
  return (
    <button 
      onClick={onClick}
      className="glass-card flex flex-col items-center justify-center p-5 group hover:bg-white hover:border-ucc-blue/30 transition-all shadow-sm"
    >
      <div className={`w-12 h-12 rounded-2xl ${color.split(' ')[0]} flex items-center justify-center ${color.split(' ')[1]} mb-3 group-hover:scale-110 group-hover:shadow-lg transition-all duration-500`}>
        {icon}
      </div>
      <span className="text-[11px] font-black uppercase tracking-widest text-gray-600">{label}</span>
    </button>
  );
};

const MemoItem = ({ title, due, priority, onClick }: { title: string, due: string, priority: 'high' | 'medium', onClick?: () => void }) => (
  <li 
    onClick={onClick}
    className="p-4 hover:bg-gray-50/50 rounded-xl transition-all flex items-start gap-4 group cursor-pointer"
  >
    <div className={`w-1.5 h-1.5 mt-1.5 rounded-full flex-shrink-0 ${priority === 'high' ? 'bg-ucc-red shadow-[0_0_10px_rgba(204,0,0,0.5)]' : 'bg-ucc-gold'}`}></div>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-bold text-gray-900 truncate tracking-tight">{title}</p>
      <p className="text-[10px] text-gray-400 mt-1 font-bold uppercase tracking-widest">{due}</p>
    </div>
    <ArrowRight size={14} className="text-gray-300 group-hover:text-ucc-blue group-hover:translate-x-1 transition-all" />
  </li>
);
