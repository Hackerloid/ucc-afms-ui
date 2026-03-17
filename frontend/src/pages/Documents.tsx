import { useState } from 'react';
import { 
  FileText, 
  Search, 
  Plus, 
  Filter, 
  MoreVertical, 
  Download, 
  Eye, 
  History, 
  Paperclip,
  CheckCircle2,
  Clock,
  AlertCircle,
  X,
  Upload,
  Layers
} from 'lucide-react';
import { UCC_DEPARTMENTS } from '../constants/departments';

interface Document {
  id: string;
  refNo: string;
  subject: string;
  type: string;
  department: string;
  sender: string;
  date: string;
  priority: 'Normal' | 'Urgent' | 'Confidential' | 'Immediate';
  status: 'Draft' | 'Submitted' | 'In Review' | 'Approved' | 'Rejected' | 'Archived';
  tags: string[];
}

export default function Documents() {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const documentsData: Document[] = [
    { 
      id: '1', 
      refNo: 'UCC/REG/2026/042', 
      subject: 'Annual Staff Performance Review 2025', 
      type: 'Internal Memo', 
      department: 'Directorate of Human Resource', 
      sender: 'Director of HR', 
      date: '2026-03-15', 
      priority: 'Normal', 
      status: 'In Review',
      tags: ['HR', 'Review', '2025']
    },
    { 
      id: '2', 
      refNo: 'UCC/VC/EXT/2026/015', 
      subject: 'Grant Approval for Science Research Lab', 
      type: 'Incoming Letter', 
      department: 'Office of the Vice-Chancellor', 
      sender: 'Ministry of Education', 
      date: '2026-03-14', 
      priority: 'Urgent', 
      status: 'Approved',
      tags: ['Grant', 'Research', 'Science']
    },
    { 
      id: '3', 
      refNo: 'UCC/FIN/2026/112', 
      subject: 'Quarterly Budget Allocation - Q2', 
      type: 'Report', 
      department: 'Office of the Director of Finance', 
      sender: 'Finance Officer', 
      date: '2026-03-12', 
      priority: 'Confidential', 
      status: 'Submitted',
      tags: ['Finance', 'Budget', 'Q2']
    },
    { 
      id: '4', 
      refNo: 'UCC/IT/2026/008', 
      subject: 'Network Infrastructure Upgrade Proposal', 
      type: 'Internal Memo', 
      department: 'Directorate of ICT Services (DICTS)', 
      sender: 'Head of IT', 
      date: '2026-03-10', 
      priority: 'Immediate', 
      status: 'Draft',
      tags: ['IT', 'Infrastructure', 'Upgrade']
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Immediate': return 'bg-red-100 text-red-700 border-red-200';
      case 'Urgent': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Confidential': return 'bg-purple-100 text-purple-700 border-purple-200';
      default: return 'bg-blue-100 text-blue-700 border-blue-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Approved': return <CheckCircle2 size={14} className="text-green-500" />;
      case 'Rejected': return <AlertCircle size={14} className="text-red-500" />;
      case 'In Review': return <Clock size={14} className="text-amber-500" />;
      default: return <FileText size={14} className="text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6 animate-fade pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Documents Explorer</h1>
          <p className="text-sm text-gray-500 mt-1">Central repository for all institutional letters, memos, and reports.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 shadow-sm transition-all font-medium text-sm flex items-center">
            <Layers size={18} className="mr-2 text-gray-400" /> Batch Actions
          </button>
          <button 
            onClick={() => setShowRegisterModal(true)}
            className="px-4 py-2 bg-ucc-blue hover:bg-ucc-blue/90 text-white rounded-xl shadow-lg shadow-ucc-blue/20 transition-all hover:-translate-y-0.5 font-medium text-sm flex items-center"
          >
            <Plus size={18} className="mr-2" /> Register Document
          </button>
        </div>
      </div>

      {/* Stats Quick View */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'All Documents', count: '1,248', icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Pending Review', count: '42', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Recently Approved', count: '156', icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Urgent Action', count: '8', icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50' },
        ].map((stat, i) => (
          <div key={i} className="glass-card p-4 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">{stat.label}</p>
              <p className="text-xl font-bold text-gray-900">{stat.count}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="glass-card overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row justify-between gap-4 bg-white/50">
          <div className="relative flex-1 max-w-md">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <Search size={16} />
            </span>
            <input 
              type="text" 
              placeholder="Search by subject, reference no, or tags..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-ucc-blue/20 outline-none transition-shadow"
            />
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 flex items-center">
              <Filter size={16} className="mr-2" /> Filters
            </button>
            <select className="px-3 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 bg-white outline-none">
              <option>Sort by: Newest First</option>
              <option>Sort by: Priority</option>
              <option>Sort by: Reference No</option>
            </select>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Document Details</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Type / Dept</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white/30">
              {documentsData.map((doc) => (
                <tr key={doc.id} className="hover:bg-white/60 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-ucc-blue/5 group-hover:text-ucc-blue transition-colors">
                        <FileText size={20} />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-gray-900 group-hover:text-ucc-blue transition-colors line-clamp-1">{doc.subject}</div>
                        <div className="text-xs font-mono text-gray-500 mt-0.5">{doc.refNo}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="text-gray-900 font-medium">{doc.type}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{doc.department}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-[11px] font-bold border uppercase tracking-tighter ${getPriorityColor(doc.priority)}`}>
                      {doc.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(doc.status)}
                      <span className="text-sm font-medium text-gray-700">{doc.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(doc.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button title="View" className="p-2 text-gray-400 hover:text-ucc-blue hover:bg-ucc-blue/5 rounded-lg transition-colors"><Eye size={16} /></button>
                      <button title="Download" className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"><Download size={16} /></button>
                      <button title="History" className="p-2 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"><History size={16} /></button>
                      <button className="p-2 text-gray-400 hover:text-gray-900 rounded-lg"><MoreVertical size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-gray-100 bg-gray-50/30 flex items-center justify-between">
          <p className="text-sm text-gray-500">Showing <span className="font-bold text-gray-900">1-4</span> of <span className="font-bold text-gray-900">1,248</span> documents</p>
          <div className="flex gap-2">
            <button disabled className="px-3 py-1 border border-gray-200 rounded text-sm text-gray-400 bg-gray-100 cursor-not-allowed">Previous</button>
            <button className="px-3 py-1 border border-gray-200 rounded text-sm text-gray-700 hover:bg-white transition-colors">Next</button>
          </div>
        </div>
      </div>

      {/* Registration Modal Overlay */}
      {showRegisterModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col animate-slide-up">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-ucc-blue text-white">
              <div>
                <h2 className="text-xl font-bold">Register New Document</h2>
                <p className="text-xs text-blue-100 mt-1 uppercase tracking-widest font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span> Ref No: [AUTO-GENERATED]
                </p>
              </div>
              <button 
                onClick={() => setShowRegisterModal(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1">
              <form className="space-y-6">
                {/* Basic Metadata */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-1">Subject / Title FR-303</label>
                    <input 
                      type="text" 
                      placeholder="Enter the main subject of the document"
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-ucc-blue/20 focus:border-ucc-blue transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Document Type</label>
                    <select className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-ucc-blue/20 focus:border-ucc-blue transition-all">
                      <option>Internal Memo</option>
                      <option>Incoming Letter</option>
                      <option>Outgoing Letter</option>
                      <option>Circular</option>
                      <option>Report</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Priority Level</label>
                    <select className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-ucc-blue/20 focus:border-ucc-blue transition-all">
                      <option>Normal</option>
                      <option>Urgent</option>
                      <option>Confidential</option>
                      <option>Immediate</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Originating Department</label>
                    <select className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-ucc-blue/20 focus:border-ucc-blue transition-all">
                      {UCC_DEPARTMENTS.map(dept => (
                        <option key={dept.id} value={dept.name}>{dept.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Sender Name/Entity</label>
                    <input 
                      type="text" 
                      placeholder="Internal staff or External entity"
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-ucc-blue/20 transition-all"
                    />
                  </div>
                </div>

                {/* File Upload Section FR-304 & FR-307 */}
                <div className="p-8 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50 flex flex-col items-center justify-center text-center group hover:border-ucc-blue/30 transition-colors cursor-pointer">
                  <div className="w-16 h-16 rounded-full bg-ucc-blue/5 flex items-center justify-center text-ucc-blue mb-4 group-hover:scale-110 transition-transform">
                    <Upload size={32} />
                  </div>
                  <h3 className="font-bold text-gray-900">Click to upload or drag and drop</h3>
                  <p className="text-sm text-gray-500 mt-1">PDF, DOCX, PNG or JPG (Max 10MB)</p>
                  <p className="text-xs text-amber-600 mt-3 font-medium flex items-center">
                    <Paperclip size={12} className="mr-1" /> FR-307: Supports automatic OCR indexing
                  </p>
                </div>

                {/* Tags FR-303 */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Tags / Keywords (Comma separated)</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Budget, Academic, MoE"
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-ucc-blue/20 transition-all"
                  />
                </div>
              </form>
            </div>

            <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
              <button 
                onClick={() => setShowRegisterModal(false)}
                className="px-6 py-2 border border-gray-200 text-gray-700 rounded-xl hover:bg-white transition-all font-medium"
              >
                Cancel
              </button>
              <button className="px-6 py-2 bg-ucc-blue text-white rounded-xl hover:bg-ucc-blue/90 shadow-lg shadow-ucc-blue/20 transition-all font-bold">
                Register Document
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
