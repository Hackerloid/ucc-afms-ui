import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
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
import { DEPARTMENT_DIRECTORY, formatDepartmentLabel } from '../constants/departments';
import { useAuth } from '../context/AuthContext';

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
  const [searchParams, setSearchParams] = useSearchParams();
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showBatchModal, setShowBatchModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (searchParams.get('new') === 'true') {
      setShowRegisterModal(true);
      // Clear the param after opening to avoid re-opening on refresh if not intended, 
      // but usually keeping it is fine. Let's clear it for a better UX.
      const newParams = new URLSearchParams(searchParams);
      newParams.delete('new');
      setSearchParams(newParams);
    }
  }, [searchParams, setSearchParams]);

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
      department: 'Directorate of Finance', 
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
      department: 'Directorate of Information & Communication Technology Services (DICTS)', 
      sender: 'Head of IT', 
      date: '2026-03-10', 
      priority: 'Immediate', 
      status: 'Draft',
      tags: ['IT', 'Infrastructure', 'Upgrade']
    },
  ];

  const filteredDocuments = documentsData.filter(doc => 
    doc.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.refNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

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

  const { user } = useAuth();

  return (
    <div className="workspace-page">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="animate-slide-up">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-1 rounded bg-ucc-blue/5 text-ucc-blue text-[10px] font-black uppercase tracking-widest border border-ucc-blue/10">Institutional Repository</span>
            <span className="w-1.5 h-1.5 rounded-full bg-ucc-blue"></span>
          </div>
          <h1 className="workspace-title">
            Document <span className="text-ucc-blue">Registry</span>
          </h1>
          <p className="workspace-subtitle max-w-2xl">
            Access, register, and review university records, letters, and official reports from one central registry.
          </p>
        </div>
        
        {user?.role !== 'Viewer' && (
          <div className="flex gap-3 animate-slide-up" style={{ animationDelay: '100ms' }}>
            <button 
              onClick={() => setShowBatchModal(true)}
              className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-2xl hover:bg-gray-50 transition-all shadow-sm font-bold text-xs uppercase tracking-widest hover:shadow-md flex items-center gap-2"
            >
              <Layers size={16} className="text-gray-400" /> Batch Actions
            </button>
            <button 
              onClick={() => setShowRegisterModal(true)}
              className="px-6 py-2.5 bg-ucc-blue hover:bg-black text-white rounded-2xl shadow-xl shadow-ucc-blue/20 transition-all hover:-translate-y-1 font-bold text-xs uppercase tracking-widest flex items-center gap-2"
            >
              <Plus size={16} /> Register Record
            </button>
          </div>
        )}
      </div>

      {/* Stats Quick View */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 xl:gap-6 2xl:gap-7 animate-slide-up" style={{ animationDelay: '200ms' }}>
        {[
          { label: 'Total Records', count: '1,248', icon: FileText, color: 'text-ucc-blue', bg: 'bg-ucc-blue/5', border: 'border-ucc-blue/10' },
          { label: 'Pending Review', count: '42', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100' },
          { label: 'Recently Uploaded', count: '156', icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-100' },
          { label: 'Urgent Records', count: '08', icon: AlertCircle, color: 'text-ucc-red', bg: 'bg-ucc-red/5', border: 'border-ucc-red/10' },
        ].map((stat, i) => (
          <div key={i} className={`glass-card p-5 group hover:scale-[1.02] transition-all border-t-2`} style={{ borderTopColor: stat.color.startsWith('text-ucc') ? '#003366' : (stat.color.includes('amber') ? '#F2A900' : (stat.color.includes('green') ? '#10B981' : '#C8102E')) }}>
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-500`}>
                <stat.icon size={22} />
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
                <p className="text-2xl font-black text-gray-900 tracking-tight">{stat.count}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Documents Table Interface */}
      <div className="space-y-4 animate-slide-up" style={{ animationDelay: '300ms' }}>
        <div className="glass-panel group">
          {/* Toolbar */}
          <div className="px-8 py-5 border-b border-gray-100 flex flex-col md:flex-row justify-between gap-6 bg-gray-50/30">
            <div className="relative flex-1 group/search">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within/search:text-ucc-blue transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search repository by subject, reference no, or tags..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/50 border border-gray-200/50 rounded-xl py-2.5 pl-12 pr-4 focus:bg-white focus:border-ucc-blue/30 focus:ring-4 focus:ring-ucc-blue/5 transition-all outline-none text-sm font-medium"
              />
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-600 hover:bg-gray-50 hover:border-ucc-blue/20 transition-all flex items-center gap-2">
                <Filter size={14} /> Advanced Filters
              </button>
              <select className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-600 outline-none focus:border-ucc-blue/20 cursor-pointer">
                <option>Newest First</option>
                <option>Oldest First</option>
                <option>Priority: High</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  <th className="px-8 py-5 font-black text-[10px] text-gray-400 uppercase tracking-widest">Document Entity</th>
                  <th className="px-6 py-5 font-black text-[10px] text-gray-400 uppercase tracking-widest">Classification / Unit</th>
                  <th className="px-6 py-5 font-black text-[10px] text-gray-400 uppercase tracking-widest">Urgency</th>
                  <th className="px-6 py-5 font-black text-[10px] text-gray-400 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-5 text-right font-black text-[10px] text-gray-400 uppercase tracking-widest">Management</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredDocuments.map((doc) => (
                  <tr 
                    key={doc.id} 
                    onClick={() => {}} // Placeholder for opening document
                    className="hover:bg-white transition-all group/row cursor-pointer"
                  >
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover/row:scale-110 group-hover/row:bg-ucc-blue/5 group-hover/row:text-ucc-blue transition-all duration-500 shadow-sm">
                          <FileText size={20} />
                        </div>
                        <div className="min-w-0">
                          <div className="font-bold text-gray-900 truncate tracking-tight group-hover/row:text-ucc-blue transition-colors">{doc.subject}</div>
                          <div className="text-[10px] text-gray-400 mt-1 font-bold uppercase tracking-wider">{doc.refNo}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="text-xs font-black text-gray-700">{doc.type}</div>
                      <div className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-tight">{doc.department}</div>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border-2 ${getPriorityColor(doc.priority)}`}>
                        {doc.priority}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(doc.status)}
                        <span className="text-[10px] font-black text-gray-700 uppercase tracking-tight">{doc.status}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex justify-end gap-1 opacity-0 group-hover/row:opacity-100 transition-all transform translate-x-2 group-hover/row:translate-x-0">
                        <button title="View digital original" className="p-2 text-gray-400 hover:text-ucc-blue hover:bg-ucc-blue/5 rounded-xl transition-all"><Eye size={18} /></button>
                        <button title="Export record" className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-xl transition-all"><Download size={18} /></button>
                        <button title="Audit history" className="p-2 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all"><History size={18} /></button>
                        <button className="p-2 text-gray-400 hover:text-gray-900 rounded-xl"><MoreVertical size={18} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-8 py-5 border-t border-gray-100 bg-gray-50/30 flex items-center justify-between">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Showing <span className="text-gray-900">4</span> of <span className="text-gray-900 text-ucc-blue">1,248</span> repository records</p>
            <div className="flex gap-2">
              <button disabled className="px-4 py-1.5 border border-gray-200 rounded-lg text-[10px] font-black text-gray-400 uppercase tracking-widest bg-gray-100/50 cursor-not-allowed">Previous Page</button>
              <button className="px-4 py-1.5 border border-gray-200 rounded-lg text-[10px] font-black text-gray-700 uppercase tracking-widest hover:bg-white hover:border-ucc-blue/20 transition-all">Next Entries</button>
            </div>
          </div>
        </div>
      </div>

      {/* Registration Modal Overlay */}
      {showRegisterModal && (
        <div className="modal-overlay animate-fade-in">
          <div className="modal-frame">
          <div className="modal-shell max-w-4xl animate-slide-up">
            {/* Modal Header */}
            <div className="modal-header bg-gradient-to-r from-ucc-blue to-ucc-blue-dark text-white overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 -mr-32 -mt-32 bg-white/10 rounded-full blur-3xl"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 rounded bg-white/20 text-white text-[9px] font-black uppercase tracking-widest backdrop-blur-md">Document Registration</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-ucc-gold animate-pulse"></span>
                </div>
                <h2 className="modal-title">Register a <span className="text-ucc-gold">New Record</span></h2>
                <p className="text-[11px] text-blue-100 mt-3 font-medium max-w-xl leading-relaxed">
                  Enter the record details below and upload the source file for the registry.
                </p>
              </div>
              <button 
                onClick={() => setShowRegisterModal(false)}
                className="p-3 bg-white/10 hover:bg-white/20 rounded-2xl transition-all group relative z-10"
              >
                <X size={24} className="group-hover:rotate-90 transition-transform duration-500" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="modal-body">
              <form className="space-y-10">
                {/* Form Group: Identity */}
                <div className="space-y-6">
                  <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.25em] flex items-center gap-3">
                    <span className="w-8 h-px bg-gray-200"></span> 01. Record Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-2">
                    <div className="md:col-span-2">
                      <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 ml-1">Document Subject</label>
                      <input 
                        type="text" 
                        placeholder="Enter the official subject title as written on the document..."
                        className="w-full bg-gray-50 border border-gray-200 rounded-[1.25rem] py-4 px-6 focus:bg-white focus:border-ucc-blue/30 focus:ring-8 focus:ring-ucc-blue/5 transition-all outline-none text-sm font-bold placeholder:font-medium placeholder:text-gray-300"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 ml-1">Document Type</label>
                      <select className="w-full bg-gray-50 border border-gray-200 rounded-[1.25rem] py-4 px-6 focus:bg-white focus:border-ucc-blue/30 transition-all outline-none text-sm font-bold appearance-none cursor-pointer">
                        <option>Internal Memo</option>
                        <option>Incoming Correspondence</option>
                        <option>Outgoing Correspondence</option>
                        <option>Academic Circular</option>
                        <option>Administrative Report</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 ml-1">Priority Level</label>
                      <select className="w-full bg-gray-50 border border-gray-200 rounded-[1.25rem] py-4 px-6 focus:bg-white focus:border-ucc-blue/30 transition-all outline-none text-sm font-bold appearance-none cursor-pointer">
                        <option>Standard Distribution</option>
                        <option>Urgent Processing</option>
                        <option>Confidential Handling</option>
                        <option>Immediate Executive Action</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 ml-1">Source Department / Unit</label>
                      <select className="w-full bg-gray-50 border border-gray-200 rounded-[1.25rem] py-4 px-6 focus:bg-white focus:border-ucc-blue/30 transition-all outline-none text-sm font-bold appearance-none cursor-pointer">
                        {DEPARTMENT_DIRECTORY.map(dept => (
                          <option key={dept.id} value={dept.name}>{formatDepartmentLabel(dept)}</option>
                        ))}
                        <option>Other / External Entity</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 ml-1">Sender / Source Officer</label>
                      <input 
                        type="text" 
                        placeholder="Name of Dean, Director, or External Entity"
                        className="w-full bg-gray-50 border border-gray-200 rounded-[1.25rem] py-4 px-6 focus:bg-white focus:border-ucc-blue/30 transition-all outline-none text-sm font-bold placeholder:font-medium placeholder:text-gray-300"
                      />
                    </div>
                  </div>
                </div>

                {/* Form Group: Assets */}
                <div className="space-y-6">
                  <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.25em] flex items-center gap-3">
                    <span className="w-8 h-px bg-gray-200"></span> 02. File Upload
                  </h3>
                  <div className="px-2">
                    <div className="group relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-ucc-blue/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl"></div>
                      <div className="p-12 border-2 border-dashed border-gray-200 rounded-3xl bg-gray-50/50 flex flex-col items-center justify-center text-center group-hover:border-ucc-blue/30 group-hover:bg-white transition-all cursor-pointer relative z-10">
                        <div className="w-20 h-20 rounded-[2rem] bg-white shadow-xl flex items-center justify-center text-ucc-blue mb-6 group-hover:scale-110 group-hover:translate-y-[-10px] transition-all duration-500">
                          <Upload size={36} strokeWidth={1.5} />
                        </div>
                        <h4 className="text-xl font-black text-gray-900 tracking-tight">Upload Source File</h4>
                        <p className="text-sm text-gray-400 mt-2 font-medium">Drag in a PDF, DOCX, or image file for this record.</p>
                        <div className="mt-8 flex gap-4">
                          <span className="px-3 py-1 bg-white rounded-lg border border-gray-100 text-[9px] font-black text-gray-400 uppercase tracking-widest">Max 25MB</span>
                          <span className="px-3 py-1 bg-ucc-blue/5 rounded-lg border border-ucc-blue/10 text-[9px] font-black text-ucc-blue uppercase tracking-widest flex items-center gap-1">
                            <CheckCircle2 size={10} /> OCR Enabled Indexing
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Form Group: Taxonomy */}
                <div className="space-y-6">
                  <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.25em] flex items-center gap-3">
                    <span className="w-8 h-px bg-gray-200"></span> 03. Tags And Search
                  </h3>
                  <div className="px-2">
                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3 ml-1">Archival Tags & Keywords</label>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {['Budget-2026', 'Academic-Board', 'VC-Directive'].map((tag) => (
                        <span key={tag} className="px-3 py-1.5 bg-ucc-blue/5 text-ucc-blue text-[10px] font-black uppercase tracking-widest rounded-xl border border-ucc-blue/10 flex items-center gap-2">
                          {tag} <X size={12} className="cursor-pointer hover:scale-125 transition-transform" />
                        </span>
                      ))}
                      <input 
                        type="text" 
                        placeholder="Add tag..."
                        className="bg-transparent border-none outline-none text-xs font-bold text-gray-900 placeholder:text-gray-300 w-24"
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>

            {/* Modal Footer */}
            <div className="modal-footer">
              <button 
                onClick={() => setShowRegisterModal(false)}
                className="px-8 py-3.5 border border-gray-200 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-gray-900 hover:bg-white hover:border-gray-300 transition-all rounded-2xl"
              >
                Cancel
              </button>
              <button className="px-10 py-3.5 bg-ucc-blue text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-black shadow-xl shadow-ucc-blue/20 transition-all hover:translate-y-[-2px] active:translate-y-0">
                Finalize and Upload Record
              </button>
            </div>
          </div>
          </div>
        </div>
      )}
      {/* Batch Actions Modal */}
      {showBatchModal && (
        <div className="modal-overlay animate-fade-in">
          <div className="modal-frame">
          <div className="modal-shell max-w-2xl animate-slide-up">
            <div className="modal-header bg-gray-50">
              <div>
                <h2 className="text-2xl font-black text-gray-900 tracking-tight">Batch Operations</h2>
                <p className="text-sm text-gray-500 mt-2 font-medium">Choose what to do with the records you have selected.</p>
              </div>
              <button 
                onClick={() => setShowBatchModal(false)}
                className="p-2 hover:bg-gray-100 rounded-xl transition-all"
              >
                <X size={20} />
              </button>
            </div>
            <div className="modal-body space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button className="p-6 border border-gray-100 rounded-2xl hover:border-ucc-blue/30 hover:bg-ucc-blue/5 transition-all flex flex-col items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Download size={24} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest">Bulk Download</span>
                </button>
                <button className="p-6 border border-gray-100 rounded-2xl hover:border-green-600/30 hover:bg-green-50 transition-all flex flex-col items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
                    <CheckCircle2 size={24} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest">Mark as Archived</span>
                </button>
                <button className="p-6 border border-gray-100 rounded-2xl hover:border-amber-600/30 hover:bg-amber-50 transition-all flex flex-col items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                    <Paperclip size={24} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest">Attach to Workflow</span>
                </button>
                <button className="p-6 border border-gray-100 rounded-2xl hover:border-red-600/30 hover:bg-red-50 transition-all flex flex-col items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
                    <AlertCircle size={24} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest">Flag for Review</span>
                </button>
              </div>
              <p className="text-center text-[10px] text-gray-400 font-medium">Please select documents from the repository grid first to enable batch processing.</p>
            </div>
            <div className="modal-footer">
              <button 
                onClick={() => setShowBatchModal(false)}
                className="px-6 py-2.5 bg-ucc-blue text-white rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-black transition-all"
              >
                Close
              </button>
            </div>
          </div>
          </div>
        </div>
      )}
    </div>
  );
}
