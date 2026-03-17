import { 
  FileText, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  TrendingUp,
  MoreVertical,
  ArrowRight,
  Users,
  Settings
} from 'lucide-react';

import { useAuth } from '../context/AuthContext';

// Reusable Stat Card Component
const StatCard = ({ title, value, icon, colorClass, trend }: { title: string, value: string, icon: React.ReactNode, colorClass: string, trend?: string }) => (
  <div className="glass-card p-6 border-l-4" style={{ borderLeftColor: colorClass }}>
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm font-medium tracking-wide text-gray-500 uppercase mb-1">{title}</p>
        <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
      </div>
      <div className={`p-3 rounded-xl bg-opacity-10`} style={{ backgroundColor: `${colorClass}20`, color: colorClass }}>
        {icon}
      </div>
    </div>
    {trend && (
      <div className="mt-4 flex items-center text-sm">
        <span className="text-green-500 flex items-center font-medium">
          <TrendingUp size={16} className="mr-1" />
          {trend}
        </span>
        <span className="text-gray-400 ml-2">vs last month</span>
      </div>
    )}
  </div>
);

export default function Dashboard() {
  const { user, hasPermission } = useAuth();

  const recentDocuments = [
    { id: 'DOC-2026-089', title: 'Q1 Financial Report', department: 'Finance', status: 'Approved', date: '2 hours ago', iconColor: 'text-green-500', bgColor: 'bg-green-100' },
    { id: 'DOC-2026-088', title: 'New Employee Onboarding Policy', department: 'HR', status: 'Pending Review', date: '5 hours ago', iconColor: 'text-amber-500', bgColor: 'bg-amber-100' },
    { id: 'DOC-2026-087', title: 'IT Infrastructure Upgrade Proposal', department: 'IT', status: 'In Progress', date: '1 day ago', iconColor: 'text-blue-500', bgColor: 'bg-blue-100' },
    { id: 'DOC-2026-086', title: 'Annual General Meeting Minutes', department: 'Administration', status: 'Approved', date: '2 days ago', iconColor: 'text-green-500', bgColor: 'bg-green-100' },
  ];

  return (
    <div className="space-y-6 animate-fade">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Greetings, {user?.name.split(' ')[0]}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {user?.role === 'Super Admin' ? 'Viewing organization-wide statistics and activity.' : 
             `Viewing activity and documents for ${user?.department}.`}
          </p>
        </div>
        <div className="flex gap-3">
          {hasPermission('reports') && (
            <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors shadow-sm font-medium text-sm">
              Generate Report
            </button>
          )}
          {hasPermission('documents') && (
            <button className="px-4 py-2 bg-ucc-blue hover:bg-ucc-blue/90 text-white rounded-xl shadow-lg shadow-ucc-blue/20 transition-all hover:-translate-y-0.5 font-medium text-sm flex items-center">
              <span className="mr-2 text-lg leading-none">+</span> New Document
            </button>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Documents" 
          value="1,284" 
          icon={<FileText size={24} />} 
          colorClass="#162C53" // ucc-blue
          trend="+12%"
        />
        <StatCard 
          title="Pending Approvals" 
          value="42" 
          icon={<Clock size={24} />} 
          colorClass="#F2A900" // ucc-gold
          trend="-5%"
        />
        <StatCard 
          title="Approved This Week" 
          value="156" 
          icon={<CheckCircle size={24} />} 
          colorClass="#10B981" // emerald-500
          trend="+18%"
        />
        <StatCard 
          title="Requires Attention" 
          value="7" 
          icon={<AlertCircle size={24} />} 
          colorClass="#C8102E" // ucc-red
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Activity List - Takes up 2 columns on large screens */}
        <div className="glass-card lg:col-span-2 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white/50">
            <h3 className="text-lg font-bold text-gray-900 tracking-tight">Recent Activity</h3>
            <button className="text-sm font-medium text-ucc-blue hover:text-ucc-blue/80 px-3 py-1 bg-ucc-blue/5 rounded-lg transition-colors">
              View All
            </button>
          </div>
          <div className="p-0 overflow-x-auto flex-1">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-500 uppercase bg-gray-50/50">
                <tr>
                  <th className="px-6 py-4 font-semibold tracking-wider">Document</th>
                  <th className="px-6 py-4 font-semibold tracking-wider">Department</th>
                  <th className="px-6 py-4 font-semibold tracking-wider">Status</th>
                  <th className="px-6 py-4 font-semibold tracking-wider">Date</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentDocuments.map((doc, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/80 transition-colors group cursor-pointer">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className={`w-10 h-10 rounded-xl ${doc.bgColor} rounded-xl flex items-center justify-center mr-4 group-hover:scale-105 transition-transform`}>
                          <FileText size={18} className={doc.iconColor} />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{doc.title}</div>
                          <div className="text-xs text-gray-500 mt-0.5">{doc.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
                        {doc.department}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                        doc.status === 'Approved' ? 'bg-green-50 text-green-700 border-green-200' :
                        doc.status === 'Pending Review' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                        'bg-blue-50 text-blue-700 border-blue-200'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                          doc.status === 'Approved' ? 'bg-green-500' :
                          doc.status === 'Pending Review' ? 'bg-amber-500' :
                          'bg-blue-500'
                        }`}></span>
                        {doc.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                      {doc.date}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-gray-400 hover:text-gray-900 transition-colors p-1.5 rounded-lg hover:bg-gray-100 opacity-0 group-hover:opacity-100">
                        <MoreVertical size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions / Tasks - Takes up 1 column */}
        <div className="space-y-6 flex flex-col">
          {/* Quick Actions */}
          <div className="glass-card overflow-hidden">
            <div className="p-6 border-b border-gray-100 bg-white/50">
              <h3 className="text-lg font-bold text-gray-900 tracking-tight">Quick Actions</h3>
            </div>
            <div className="p-3">
              <div className="grid grid-cols-2 gap-3">
                {hasPermission('documents') && (
                  <button className="flex flex-col items-center justify-center p-4 rounded-xl border border-gray-100 bg-white hover:bg-gray-50 hover:border-ucc-blue/30 transition-all group">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mb-2 group-hover:scale-110 transition-transform">
                      <FileText size={20} />
                    </div>
                    <span className="text-sm font-medium text-gray-700">Draft Doc</span>
                  </button>
                )}
                {hasPermission('workflows') && (
                  <button className="flex flex-col items-center justify-center p-4 rounded-xl border border-gray-100 bg-white hover:bg-gray-50 hover:border-ucc-blue/30 transition-all group">
                    <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 mb-2 group-hover:scale-110 transition-transform">
                      <Clock size={20} />
                    </div>
                    <span className="text-sm font-medium text-gray-700">Approvals</span>
                  </button>
                )}
                {hasPermission('correspondence') && (
                  <button className="flex flex-col items-center justify-center p-4 rounded-xl border border-gray-100 bg-white hover:bg-gray-50 hover:border-ucc-blue/30 transition-all group">
                    <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600 mb-2 group-hover:scale-110 transition-transform">
                      <Users size={20} />
                    </div>
                    <span className="text-sm font-medium text-gray-700">Share</span>
                  </button>
                )}
                {hasPermission('settings') && (
                  <button className="flex flex-col items-center justify-center p-4 rounded-xl border border-gray-100 bg-white hover:bg-gray-50 hover:border-ucc-blue/30 transition-all group">
                    <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 mb-2 group-hover:scale-110 transition-transform">
                      <Settings size={20} />
                    </div>
                    <span className="text-sm font-medium text-gray-700">Config</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Pending Tasks */}
          <div className="glass-card overflow-hidden flex-1">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white/50">
              <h3 className="text-lg font-bold text-gray-900 tracking-tight">Your Tasks</h3>
              <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded-full">3</span>
            </div>
            <div className="p-0">
              <ul className="divide-y divide-gray-100">
                <li className="p-4 hover:bg-gray-50/50 transition-colors flex items-start gap-3">
                  <div className="w-2 h-2 mt-2 rounded-full bg-ucc-red flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">Review Q1 Budget</p>
                    <p className="text-xs text-gray-500 mt-1">Due today</p>
                  </div>
                  <ArrowRight size={16} className="text-gray-400 mt-1" />
                </li>
                <li className="p-4 hover:bg-gray-50/50 transition-colors flex items-start gap-3">
                  <div className="w-2 h-2 mt-2 rounded-full bg-amber-500 flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">Sign Employee Contracts</p>
                    <p className="text-xs text-gray-500 mt-1">Due tomorrow</p>
                  </div>
                  <ArrowRight size={16} className="text-gray-400 mt-1" />
                </li>
              </ul>
              <div className="p-4 border-t border-gray-100 text-center">
                <a href="#" className="text-sm font-medium text-ucc-blue hover:text-ucc-blue/80 transition-colors">Go to Task Manager</a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
