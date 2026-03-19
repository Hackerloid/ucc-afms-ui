import { useState } from 'react';
import { 
  BarChart2, 
  BarChart3,
  FileCheck,
  FileText, 
  Download, 
  Eye, 
  Calendar, 
  TrendingUp, 
  Plus, 
  Search, 
  CheckCircle2, 
  Shield,
  Clock, 
  Filter,
  X,
  Users,
  MoreVertical
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Reports() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [showReportModal, setShowReportModal] = useState(false);

  const reportsData = [
    { id: 'REP-7829', name: 'Annual Security Audit', type: 'Audit', date: 'Oct 24, 2026', author: 'Dr. Mensah', status: 'Final' },
    { id: 'REP-7830', name: 'Q3 Financial Statement', type: 'Financial', date: 'Oct 22, 2026', author: 'Finance Dept', status: 'Draft' },
    { id: 'REP-7831', name: 'Equipment Inventory', type: 'Administrative', date: 'Oct 20, 2026', author: 'Procurement', status: 'Final' },
    { id: 'REP-7832', name: 'Staff Performance Review', type: 'HR', date: 'Oct 15, 2026', author: 'HR Director', status: 'Archived' },
  ];

  const filteredReports = reportsData.filter(report => 
    report.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    report.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    report.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fade-in p-2 pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="animate-slide-up">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-1 rounded bg-ucc-blue/5 text-ucc-blue text-[10px] font-black uppercase tracking-widest border border-ucc-blue/10">Audit & Analytics</span>
            <span className="w-1.5 h-1.5 rounded-full bg-ucc-gold animate-pulse-soft"></span>
          </div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tighter leading-none">
            System <span className="text-ucc-blue">Reports</span>
          </h1>
          <p className="text-sm text-gray-500 mt-3 font-medium max-w-xl leading-relaxed">
            Generate and analyze institutional performance, document flow, and departmental metrics.
          </p>
        </div>
        {(user?.role === 'Super Admin' || user?.role === 'Department Head') && (
          <div className="flex gap-3 animate-slide-up" style={{ animationDelay: '100ms' }}>
            <button 
              onClick={() => setShowReportModal(true)}
              className="px-6 py-2.5 bg-ucc-blue hover:bg-black text-white rounded-2xl shadow-xl shadow-ucc-blue/20 transition-all hover:-translate-y-1 font-bold text-xs uppercase tracking-widest flex items-center gap-2"
            >
              <Plus size={16} /> New Analytics Report
            </button>
          </div>
        )}
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 xl:gap-8 animate-slide-up" style={{ animationDelay: '200ms' }}>
        <div className="glass-card p-6 flex items-center justify-between group hover:scale-[1.02] transition-all border-t-2 border-ucc-blue">
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Generated</p>
            <h3 className="text-3xl font-black text-gray-900 tracking-tight">1,248</h3>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-ucc-blue/5 text-ucc-blue flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
            <FileCheck size={24} />
          </div>
        </div>
        
        <div className="glass-card p-6 flex items-center justify-between group hover:scale-[1.02] transition-all border-t-2 border-ucc-gold">
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Pending Review</p>
            <h3 className="text-3xl font-black text-gray-900 tracking-tight">24</h3>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-ucc-gold/5 text-ucc-gold flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
            <Shield size={24} />
          </div>
        </div>

        <div className="glass-card p-6 flex items-center justify-between group hover:scale-[1.02] transition-all border-t-2 border-green-500">
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Finalized Month</p>
            <h3 className="text-3xl font-black text-gray-900 tracking-tight">86</h3>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
            <FileCheck size={24} />
          </div>
        </div>
      </div>

      {/* Main Content Interface */}
      <div className="space-y-4 animate-slide-up" style={{ animationDelay: '300ms' }}>
        <div className="glass-panel group">
          {/* Toolbar */}
          <div className="px-8 py-5 border-b border-gray-100 flex flex-col md:flex-row justify-between gap-6 bg-gray-50/30">
            <div className="relative flex-1 group/search">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within/search:text-ucc-blue transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search archive by report name or ID..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/50 border border-gray-200/50 rounded-xl py-2.5 pl-12 pr-4 focus:bg-white focus:border-ucc-blue/30 focus:ring-4 focus:ring-ucc-blue/5 transition-all outline-none text-sm font-medium"
              />
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-600 hover:bg-gray-50 hover:border-ucc-blue/20 transition-all flex items-center gap-2">
                <Filter size={14} /> Filter Logic
              </button>
              <button className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-600 hover:bg-gray-50 hover:border-ucc-blue/20 transition-all flex items-center gap-2">
                <Download size={14} /> Export Dataset
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  <th className="px-8 py-5 font-black text-[10px] text-gray-400 uppercase tracking-widest">Report Title & Identification</th>
                  <th className="px-6 py-5 font-black text-[10px] text-gray-400 uppercase tracking-widest">Classification</th>
                  <th className="px-6 py-5 font-black text-[10px] text-gray-400 uppercase tracking-widest">Authorized By</th>
                  <th className="px-6 py-5 font-black text-[10px] text-gray-400 uppercase tracking-widest">Status</th>
                  <th className="px-8 py-5 text-right font-black text-[10px] text-gray-400 uppercase tracking-widest">Management</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredReports.map((report, idx) => (
                  <tr key={idx} className="hover:bg-white transition-all group/row cursor-pointer">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover/row:scale-110 group-hover/row:bg-ucc-blue/5 group-hover/row:text-ucc-blue transition-all duration-500 shadow-sm">
                          <FileCheck size={20} />
                        </div>
                        <div className="min-w-0">
                          <div className="font-bold text-gray-900 truncate tracking-tight group-hover/row:text-ucc-blue transition-colors text-base">{report.name}</div>
                          <div className="text-[10px] text-gray-400 mt-1 font-bold uppercase tracking-wider">{report.id} • {report.date}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="text-xs font-black text-gray-700 uppercase tracking-tight">{report.type}</div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="text-xs font-bold text-gray-700">{report.author}</div>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border-2 ${
                        report.status === 'Final' ? 'bg-green-50 text-green-700 border-green-200' :
                        report.status === 'Draft' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                        'bg-gray-100 text-gray-700 border-gray-200'
                      }`}>
                        {report.status}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <button className="p-2 text-gray-300 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all">
                        <MoreVertical size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-8 py-5 border-t border-gray-100 bg-gray-50/30 flex items-center justify-between">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Showing <span className="text-gray-900">4</span> of <span className="text-ucc-blue">1,248</span> audit files</p>
            <div className="flex gap-2">
              <button disabled className="px-4 py-1.5 border border-gray-200 rounded-lg text-[10px] font-black text-gray-400 uppercase tracking-widest bg-gray-100/50 cursor-not-allowed">Previous</button>
              <button className="px-4 py-1.5 border border-gray-200 rounded-lg text-[10px] font-black text-gray-700 uppercase tracking-widest hover:bg-white hover:border-ucc-blue/20 transition-all">Next Dataset</button>
            </div>
          </div>
        </div>
      </div>
      {/* Report Generation Modal */}
      {showReportModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-ucc-blue/20 backdrop-blur-xl animate-fade-in">
          <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col animate-slide-up border border-white/50">
            {/* Modal Header */}
            <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gradient-to-br from-gray-900 to-black text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 -mr-32 -mt-32 bg-ucc-blue/20 rounded-full blur-3xl"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 rounded bg-white/10 text-white text-[9px] font-black uppercase tracking-widest backdrop-blur-md">UCC Data Intelligence</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-ucc-gold animate-pulse"></span>
                </div>
                <h2 className="text-3xl font-black tracking-tighter">Generate <span className="text-ucc-blue">Analytic Report</span></h2>
                <p className="text-[10px] text-gray-400 mt-2 font-black uppercase tracking-[0.2em] opacity-80">Composite Institutional Insight Engine</p>
              </div>
              <button 
                onClick={() => setShowReportModal(false)}
                className="p-3 bg-white/10 hover:bg-white/20 rounded-2xl transition-all group relative z-10"
              >
                <X size={24} className="group-hover:rotate-90 transition-transform duration-500" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-8 overflow-y-auto flex-1 custom-scrollbar">
              <form className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="md:col-span-2">
                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 ml-1">Report Narrative / Title</label>
                    <input 
                      type="text" 
                      placeholder="e.g. 2026 Academic Performance Correlation Matrix"
                      className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 px-6 focus:bg-white focus:border-ucc-blue/30 outline-none text-sm font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 ml-1">Data Source Module</label>
                    <select className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 px-6 focus:bg-white focus:border-ucc-blue/30 outline-none text-sm font-bold appearance-none cursor-pointer">
                      <option>Document Flow & Archival</option>
                      <option>Departmental Resource Allocation</option>
                      <option>Faculty/Staff Engagement Metrics</option>
                      <option>Institutional Compliance & Audit</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 ml-1">Temporal Range</label>
                    <div className="flex items-center gap-2">
                      <div className="relative flex-1">
                        <Calendar size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 px-0.5" />
                        <input type="date" className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-xs font-bold focus:bg-white focus:border-ucc-blue transition-all outline-none" />
                      </div>
                      <span className="text-gray-300">to</span>
                      <div className="relative flex-1">
                        <Calendar size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 px-0.5" />
                        <input type="date" className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-xs font-bold focus:bg-white focus:border-ucc-blue transition-all outline-none" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6 pt-4">
                  <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.25em] flex items-center gap-3">
                    <Filter size={18} className="text-ucc-blue" /> Dimension Sculpting
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {['Metadata', 'User Activity', 'Departmental', 'Workflow Latency', 'Resource Usage', 'Security Logs'].map(dim => (
                      <label key={dim} className="flex items-center gap-2 p-4 border border-gray-100 rounded-xl hover:bg-gray-50 cursor-pointer transition-all">
                        <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-ucc-blue" />
                        <span className="text-[10px] font-black uppercase tracking-tight text-gray-600">{dim}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="p-8 bg-blue-50/30 border border-blue-100 rounded-[2rem] flex flex-col items-center text-center">
                  <Users size={32} className="text-ucc-blue mb-4" />
                  <h4 className="text-sm font-black text-gray-900 uppercase tracking-widest">Share with Executive Board</h4>
                  <p className="text-[10px] text-gray-500 mt-2 font-medium max-w-sm">Automatically distribute this report to the Vice-Chancellor's office and relevant Deans upon generation.</p>
                </div>
              </form>
            </div>

            {/* Modal Footer */}
            <div className="p-8 border-t border-gray-100 bg-gray-50 flex justify-end gap-4">
              <button 
                onClick={() => setShowReportModal(false)}
                className="px-8 py-3.5 border border-gray-200 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-gray-900 transition-all rounded-2xl"
              >
                Abort
              </button>
              <button className="px-10 py-3.5 bg-black text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-ucc-blue shadow-xl transition-all flex items-center gap-3">
                Compile & Dispatch <BarChart3 size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
