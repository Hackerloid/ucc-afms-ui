import { useState } from 'react';
import { Mail, ArrowUpRight, ArrowDownLeft, Search, Filter, Paperclip, X, Send, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Correspondence() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [showComposeModal, setShowComposeModal] = useState(false);
  const [activeFolder, setActiveFolder] = useState('Incoming');

  const messagesData = [
    { id: 'MSG-001', type: 'Incoming', sender: 'Ministry of Education', subject: 'Updated Curriculum Guidelines for 2026/2027 Academic Year', date: 'Today, 10:45 AM', urgent: true, read: false, folder: 'Incoming', priority: 'Urgent' },
    { id: 'MSG-002', type: 'Outgoing', sender: 'Vice Chancellor Office', subject: 'Invitation to Annual Research Symposium', date: 'Yesterday', urgent: false, read: true, folder: 'Outgoing', priority: 'Normal' },
    { id: 'MSG-003', type: 'Internal', sender: 'Registrar', subject: 'Notice of Academic Board Meeting', date: 'Oct 15, 2026', urgent: false, read: true, folder: 'Internal', priority: 'Normal' },
    { id: 'MSG-004', type: 'Incoming', sender: 'Ghana Tertiary Education Commission', subject: 'Accreditation Renewal Requirements', date: 'Oct 12, 2026', urgent: true, read: true, folder: 'Incoming', priority: 'Confidential' },
  ];

  const filteredMessages = messagesData.filter(msg => {
    const matchesSearch = msg.subject.toLowerCase().includes(searchQuery.toLowerCase()) || 
      msg.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFolder =
      activeFolder === 'All' ||
      (activeFolder === 'Urgent' && msg.priority === 'Urgent') ||
      (activeFolder === 'Confidential' && msg.priority === 'Confidential') ||
      msg.folder === activeFolder;
    
    return matchesSearch && matchesFolder;
  });

  return (
    <div className="workspace-page h-full flex flex-col">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 flex-shrink-0">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-1 rounded bg-ucc-blue/5 text-ucc-blue text-[10px] font-black uppercase tracking-widest border border-ucc-blue/10">Correspondence Desk</span>
            <span className="w-1.5 h-1.5 rounded-full bg-ucc-blue animate-pulse-soft"></span>
          </div>
          <h1 className="workspace-title">
            Letters <span className="text-ucc-blue">Desk</span>
          </h1>
          <p className="workspace-subtitle max-w-2xl">
            Track internal letters, incoming mail, and outgoing university correspondence.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button 
            onClick={() => setActiveFolder('Incoming')}
            className={`px-4 py-2 border rounded-xl transition-colors shadow-sm font-medium text-sm flex items-center ${activeFolder === 'Incoming' ? 'bg-ucc-blue/10 border-ucc-blue text-ucc-blue' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}`}
          >
            <Mail size={16} className={`mr-2 ${activeFolder === 'Incoming' ? 'text-ucc-blue' : 'text-gray-400'}`} /> Inbox
            <span className="ml-2 bg-red-100 text-red-700 py-0.5 px-2 rounded-full text-xs font-bold">2</span>
          </button>
          {user?.role !== 'Viewer' && (
            <button 
              onClick={() => setShowComposeModal(true)}
              className="px-4 py-2 bg-ucc-blue hover:bg-black text-white rounded-xl shadow-lg shadow-ucc-blue/20 transition-all hover:-translate-y-0.5 font-medium text-sm flex items-center"
            >
              <span className="mr-2 text-lg leading-none">+</span> Compose a Letter
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[280px,minmax(0,1fr)] 2xl:grid-cols-[320px,minmax(0,1fr)] gap-6 xl:gap-7 2xl:gap-8 flex-1 min-h-0">
        
        {/* Sidebar Nav */}
        <div className="hidden lg:flex flex-col gap-2">
          <div className="glass-card p-4 flex flex-col gap-1">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-2">Mailboxes</h3>
            
            <button 
              onClick={() => setActiveFolder('Incoming')}
              className={`flex justify-between items-center w-full px-3 py-2 text-sm font-medium rounded-lg transition-colors text-left ${activeFolder === 'Incoming' ? 'text-ucc-blue bg-ucc-blue/10' : 'text-gray-700 hover:bg-gray-50'}`}
            >
              <span className="flex items-center"><ArrowDownLeft size={16} className="mr-2" /> Incoming (Registry)</span>
              <span className={`text-xs py-0.5 px-2 rounded-full font-bold ${activeFolder === 'Incoming' ? 'bg-ucc-blue text-white' : 'bg-gray-100 text-gray-500'}`}>12</span>
            </button>
            <button 
              onClick={() => setActiveFolder('Outgoing')}
              className={`flex justify-between items-center w-full px-3 py-2 text-sm font-medium rounded-lg transition-colors text-left ${activeFolder === 'Outgoing' ? 'text-ucc-blue bg-ucc-blue/10' : 'text-gray-700 hover:bg-gray-50'}`}
            >
              <span className="flex items-center"><ArrowUpRight size={16} className="mr-2 opacity-60" /> Outgoing</span>
            </button>
            <button 
              onClick={() => setActiveFolder('Internal')}
              className={`flex justify-between items-center w-full px-3 py-2 text-sm font-medium rounded-lg transition-colors text-left ${activeFolder === 'Internal' ? 'text-ucc-blue bg-ucc-blue/10' : 'text-gray-700 hover:bg-gray-50'}`}
            >
              <span className="flex items-center"><Mail size={16} className="mr-2 opacity-60" /> Internal Letters</span>
              <span className={`text-xs py-0.5 px-2 rounded-full font-bold ${activeFolder === 'Internal' ? 'bg-ucc-blue text-white' : 'bg-gray-100 text-gray-500'}`}>5</span>
            </button>
            <button 
              onClick={() => setActiveFolder('Urgent')}
              className={`flex justify-between items-center w-full px-3 py-2 text-sm font-medium rounded-lg transition-colors text-left ${activeFolder === 'Urgent' ? 'text-ucc-blue bg-ucc-blue/10' : 'text-gray-700 hover:bg-gray-50'}`}
            >
              <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-red-400 mr-3"></span> Urgent</span>
              <span className={`text-xs py-0.5 px-2 rounded-full font-bold ${activeFolder === 'Urgent' ? 'bg-ucc-blue text-white' : 'bg-gray-100 text-gray-500'}`}>2</span>
            </button>
            <button 
              onClick={() => setActiveFolder('Confidential')}
              className={`flex justify-between items-center w-full px-3 py-2 text-sm font-medium rounded-lg transition-colors text-left ${activeFolder === 'Confidential' ? 'text-ucc-blue bg-ucc-blue/10' : 'text-gray-700 hover:bg-gray-50'}`}
            >
              <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-purple-400 mr-3"></span> Confidential</span>
              <span className={`text-xs py-0.5 px-2 rounded-full font-bold ${activeFolder === 'Confidential' ? 'bg-ucc-blue text-white' : 'bg-gray-100 text-gray-500'}`}>1</span>
            </button>
            
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-6 mb-2 px-2">Folders</h3>
            
            <button 
              onClick={() => setSearchQuery('Academic')}
              className="flex justify-between items-center w-full px-3 py-2 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-left"
            >
              <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-blue-400 mr-3"></span> Academic Affairs</span>
            </button>
            <button 
              onClick={() => setSearchQuery('General')}
              className="flex justify-between items-center w-full px-3 py-2 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-left"
            >
              <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-ucc-gold mr-3"></span> General Inquiries</span>
            </button>
          </div>
        </div>

        {/* Message List */}
        <div className="glass-card flex flex-col overflow-hidden min-h-[500px]">
          {/* Toolbar */}
          <div className="p-3 border-b border-gray-100 flex justify-between items-center bg-white/80">
            <div className="flex gap-2">
              <button className="p-2 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 transition-colors">
                <Filter size={16} />
              </button>
            </div>
            <div className="relative w-full max-w-sm ml-4">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <Search size={16} />
              </span>
              <input 
                type="text" 
                placeholder="Search letters..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:bg-white focus:ring-2 focus:ring-ucc-blue/20 outline-none transition-all"
              />
            </div>
          </div>

          {/* List */}
          <div className="overflow-y-auto flex-1 bg-white/50">
            <ul className="divide-y divide-gray-100">
              {filteredMessages.map((msg, idx) => (
                <li 
                  key={idx} 
                  onClick={() => {}} // Placeholder for opening message
                  className={`p-4 hover:bg-white transition-colors cursor-pointer group flex gap-4 ${!msg.read ? 'bg-blue-50/30' : ''}`}
                >
                  
                  <div className="flex-shrink-0 pt-1">
                     <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${
                        msg.type === 'Incoming' ? 'bg-ucc-blue' : 
                        msg.type === 'Outgoing' ? 'bg-amber-500' : 'bg-gray-400'
                     }`}>
                       {msg.type === 'Incoming' ? <ArrowDownLeft size={18} /> : 
                        msg.type === 'Outgoing' ? <ArrowUpRight size={18} /> : <Mail size={18} />}
                     </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline mb-1">
                      <h4 className={`text-sm truncate pr-4 ${!msg.read ? 'font-bold text-gray-900' : 'font-medium text-gray-700'}`}>
                        {msg.subject}
                      </h4>
                      <span className={`text-xs whitespace-nowrap ${!msg.read ? 'text-ucc-blue font-bold' : 'text-gray-400'}`}>
                        {msg.date}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">{msg.id}</span>
                      <span className="text-gray-300">-</span>
                      <span className="text-sm text-gray-600 truncate">{msg.sender}</span>
                      
                      {msg.urgent && (
                        <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-700">
                          URGENT
                        </span>
                      )}
                      {msg.priority === 'Confidential' && (
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-700">
                          CONFIDENTIAL
                        </span>
                      )}
                      {idx === 0 && (
                        <span className="ml-1 text-gray-400"><Paperclip size={14} /></span>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            
            {/* Empty State placeholder if needed */}
            {/* 
            <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-gray-50/50">
              <Mail size={48} className="text-gray-300 mb-4" />
              <h3 className="text-lg font-bold text-gray-900">No messages found</h3>
              <p className="text-sm text-gray-500 mt-2 max-w-sm">You've reached the end of the correspondence list in this folder.</p>
            </div>
            */}
          </div>
        </div>
      </div>
      {/* Compose Letter Modal */}
      {showComposeModal && (
        <div className="modal-overlay animate-fade-in">
          <div className="modal-frame">
          <div className="modal-shell max-w-4xl animate-slide-up">
            {/* Modal Header */}
            <div className="modal-header bg-gray-50">
              <div>
                <h2 className="modal-title text-gray-900">Compose a <span className="text-ucc-blue">Letter</span></h2>
                <p className="text-sm text-gray-500 mt-2 font-medium max-w-xl leading-relaxed">Create an official university letter for internal or external delivery.</p>
              </div>
              <button 
                onClick={() => setShowComposeModal(false)}
                className="p-3 hover:bg-gray-100 rounded-2xl transition-all group"
              >
                <X size={24} className="group-hover:rotate-90 transition-transform duration-500" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="modal-body">
              <form className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="md:col-span-2">
                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 ml-1">Letter Subject</label>
                    <input 
                      type="text" 
                      placeholder="e.g. NOTICE OF ACADEMIC BOARD MEETING - OCTOBER 2026"
                      className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 px-6 focus:bg-white focus:border-ucc-blue/30 outline-none text-sm font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 ml-1">Letter Type</label>
                    <select className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 px-6 focus:bg-white focus:border-ucc-blue/30 outline-none text-sm font-bold appearance-none cursor-pointer">
                      <option>Internal Letter (Departmental)</option>
                      <option>Academic Board Circular</option>
                      <option>Executive Directive (VC Office)</option>
                      <option>General Staff Notice</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 ml-1">Priority Level</label>
                    <select className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 px-6 focus:bg-white focus:border-ucc-blue/30 outline-none text-sm font-bold appearance-none cursor-pointer text-red-600">
                      <option value="Normal">Normal Distribution</option>
                      <option value="Urgent">Urgent Action Required</option>
                      <option value="Confidential">Confidential / Restricted</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 ml-1">Recipients</label>
                    <div className="relative group/recipients">
                      <User className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within/recipients:text-ucc-blue" size={18} />
                      <input 
                        type="text" 
                        placeholder="Search for departments, deans, or staff names..."
                        className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 pl-14 pr-6 focus:bg-white focus:border-ucc-blue/30 outline-none text-sm font-bold"
                      />
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 ml-1">Message</label>
                    <textarea 
                      rows={6}
                      placeholder="Type the official content of the letter here..."
                      className="w-full bg-gray-50 border border-gray-200 rounded-[2rem] py-6 px-8 focus:bg-white focus:border-ucc-blue/30 outline-none text-sm font-medium leading-relaxed"
                    ></textarea>
                  </div>
                </div>

                <div className="p-8 border-2 border-dashed border-gray-200 rounded-3xl bg-gray-50/50 flex flex-col items-center justify-center text-center hover:bg-white hover:border-ucc-blue/30 transition-all cursor-pointer">
                  <Paperclip size={32} className="text-ucc-blue mb-4" />
                  <p className="text-xs font-black text-gray-900 uppercase tracking-widest">Attach Supporting Files</p>
                  <p className="text-[10px] text-gray-400 mt-2 font-medium">Drag and drop PDFs, scans, or circulars here. Max 50MB.</p>
                </div>
              </form>
            </div>

            {/* Modal Footer */}
            <div className="modal-footer">
              <button 
                onClick={() => setShowComposeModal(false)}
                className="px-8 py-3.5 border border-gray-200 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-gray-900 transition-all rounded-2xl"
              >
                Save as Draft
              </button>
              <button className="px-10 py-3.5 bg-ucc-blue text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-black shadow-xl shadow-ucc-blue/20 transition-all flex items-center gap-3">
                Dispatch Letter <Send size={16} />
              </button>
            </div>
          </div>
          </div>
        </div>
      )}
    </div>
  );
}
