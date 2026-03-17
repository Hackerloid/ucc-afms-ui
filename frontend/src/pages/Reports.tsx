import { FileCheck, Search, Filter, Download, MoreVertical, Shield } from 'lucide-react';

export default function Reports() {
  const reportsData = [
    { id: 'REP-7829', name: 'Annual Security Audit', type: 'Audit', date: 'Oct 24, 2026', author: 'Dr. Mensah', status: 'Final' },
    { id: 'REP-7830', name: 'Q3 Financial Statement', type: 'Financial', date: 'Oct 22, 2026', author: 'Finance Dept', status: 'Draft' },
    { id: 'REP-7831', name: 'Equipment Inventory', type: 'Administrative', date: 'Oct 20, 2026', author: 'Procurement', status: 'Final' },
    { id: 'REP-7832', name: 'Staff Performance Review', type: 'HR', date: 'Oct 15, 2026', author: 'HR Director', status: 'Archived' },
  ];

  return (
    <div className="space-y-6 animate-fade">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">System Reports</h1>
          <p className="text-sm text-gray-500 mt-1">Generate, view, and export institutional reports.</p>
        </div>
        <button className="px-4 py-2 bg-ucc-blue hover:bg-ucc-blue/90 text-white rounded-xl shadow-lg shadow-ucc-blue/20 transition-all hover:-translate-y-0.5 font-medium text-sm flex items-center">
          <span className="mr-2 text-lg leading-none">+</span> New Report
        </button>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 bg-gradient-to-br from-ucc-blue/5 to-transparent border-l-4 border-l-ucc-blue">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Generated</p>
              <h3 className="text-3xl font-bold text-ucc-blue mt-1">1,248</h3>
            </div>
            <div className="p-3 bg-white rounded-xl shadow-sm text-ucc-blue">
              <FileCheck size={24} />
            </div>
          </div>
        </div>
        
        <div className="glass-card p-6 border-l-4 border-l-ucc-gold">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Pending Review</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-1">24</h3>
            </div>
            <div className="p-3 bg-amber-50 rounded-xl text-amber-600">
              <Shield size={24} />
            </div>
          </div>
        </div>

        <div className="glass-card p-6 border-l-4 border-l-green-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Finalized This Month</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-1">86</h3>
            </div>
            <div className="p-3 bg-green-50 rounded-xl text-green-600">
              <FileCheck size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="glass-card overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row justify-between gap-4 bg-white/50">
          <div className="flex items-center gap-3">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <Search size={16} />
              </span>
              <input 
                type="text" 
                placeholder="Search reports..." 
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-ucc-blue/20 outline-none w-full md:w-64"
              />
            </div>
            <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
              <Filter size={16} /> Filter
            </button>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors bg-white shadow-sm">
            <Download size={16} /> Export CSV
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50/50">
              <tr>
                <th className="px-6 py-4 font-semibold">Report Name</th>
                <th className="px-6 py-4 font-semibold">Type</th>
                <th className="px-6 py-4 font-semibold">Author</th>
                <th className="px-6 py-4 font-semibold">Date</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {reportsData.map((report, idx) => (
                <tr key={idx} className="hover:bg-gray-50/80 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-ucc-blue mr-3 group-hover:scale-105 transition-transform">
                        <FileCheck size={16} />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 group-hover:text-ucc-blue transition-colors">{report.name}</div>
                        <div className="text-xs text-gray-500">{report.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{report.type}</td>
                  <td className="px-6 py-4 text-gray-600 font-medium">{report.author}</td>
                  <td className="px-6 py-4 text-gray-500 whitespace-nowrap">{report.date}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                      report.status === 'Final' ? 'bg-green-50 text-green-700 border-green-200' :
                      report.status === 'Draft' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                      'bg-gray-100 text-gray-700 border-gray-200'
                    }`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-gray-400 hover:text-gray-900 p-1.5 rounded-lg hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-all">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Skeleton */}
        <div className="p-4 border-t border-gray-100 flex items-center justify-between bg-white/50 text-sm">
          <span className="text-gray-500">Showing 1 to 4 of 1,248 entries</span>
          <div className="flex gap-1">
            <button className="px-3 py-1 border border-gray-200 rounded disabled:opacity-50 text-gray-600" disabled>Prev</button>
            <button className="px-3 py-1 bg-ucc-blue text-white rounded">1</button>
            <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50 text-gray-600">2</button>
            <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50 text-gray-600">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
