import { Mail, ArrowUpRight, ArrowDownLeft, Search, Filter, Paperclip } from 'lucide-react';

export default function Correspondence() {
  const messagesData = [
    { id: 'MSG-001', type: 'Incoming', sender: 'Ministry of Education', subject: 'Updated Curriculum Guidelines for 2026/2027 Academic Year', date: 'Today, 10:45 AM', urgent: true, read: false },
    { id: 'MSG-002', type: 'Outgoing', sender: 'Vice Chancellor Office', subject: 'Invitation to Annual Research Symposium', date: 'Yesterday', urgent: false, read: true },
    { id: 'MSG-003', type: 'Internal', sender: 'Registrar', subject: 'Notice of Academic Board Meeting', date: 'Oct 15, 2026', urgent: false, read: true },
    { id: 'MSG-004', type: 'Incoming', sender: 'Ghana Tertiary Education Commission', subject: 'Accreditation Renewal Requirements', date: 'Oct 12, 2026', urgent: true, read: true },
  ];

  return (
    <div className="space-y-6 animate-fade h-full flex flex-col pt-2 pb-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Correspondence Manager</h1>
          <p className="text-sm text-gray-500 mt-1">Track internal memos and external communications.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors shadow-sm font-medium text-sm flex items-center">
            <Mail size={16} className="mr-2 text-gray-400" /> Inbox
            <span className="ml-2 bg-red-100 text-red-700 py-0.5 px-2 rounded-full text-xs font-bold">4</span>
          </button>
          <button className="px-4 py-2 bg-ucc-blue hover:bg-ucc-blue/90 text-white rounded-xl shadow-lg shadow-ucc-blue/20 transition-all hover:-translate-y-0.5 font-medium text-sm flex items-center">
            <span className="mr-2 text-lg leading-none">+</span> Compose Memos
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1 min-h-0">
        
        {/* Sidebar Nav */}
        <div className="hidden lg:flex flex-col gap-2">
          <div className="glass-card p-4 flex flex-col gap-1">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-2">Mailboxes</h3>
            
            <button className="flex justify-between items-center w-full px-3 py-2 text-sm font-medium rounded-lg text-ucc-blue bg-ucc-blue/10 transition-colors text-left">
              <span className="flex items-center"><ArrowDownLeft size={16} className="mr-2" /> Incoming (Registry)</span>
              <span className="bg-ucc-blue text-white text-xs py-0.5 px-2 rounded-full font-bold">12</span>
            </button>
            <button className="flex justify-between items-center w-full px-3 py-2 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-left">
              <span className="flex items-center"><ArrowUpRight size={16} className="mr-2 opacity-60" /> Outgoing</span>
            </button>
            <button className="flex justify-between items-center w-full px-3 py-2 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-left">
              <span className="flex items-center"><Mail size={16} className="mr-2 opacity-60" /> Internal Memos</span>
              <span className="bg-gray-200 text-gray-700 text-xs py-0.5 px-2 rounded-full font-bold">5</span>
            </button>
            
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-6 mb-2 px-2">Folders</h3>
            
            <button className="flex justify-between items-center w-full px-3 py-2 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-left">
              <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-red-400 mr-3"></span> Urgent</span>
            </button>
            <button className="flex justify-between items-center w-full px-3 py-2 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-left mt-1">
              <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-blue-400 mr-3"></span> Academic Affairs</span>
            </button>
            <button className="flex justify-between items-center w-full px-3 py-2 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-left mt-1">
              <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-green-400 mr-3"></span> HR & Finance</span>
            </button>
          </div>
        </div>

        {/* Message List */}
        <div className="glass-card lg:col-span-3 flex flex-col overflow-hidden min-h-[500px]">
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
                placeholder="Search correspondence..." 
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:bg-white focus:ring-2 focus:ring-ucc-blue/20 outline-none transition-all"
              />
            </div>
          </div>

          {/* List */}
          <div className="overflow-y-auto flex-1 bg-white/50">
            <ul className="divide-y divide-gray-100">
              {messagesData.map((msg, idx) => (
                <li key={idx} className={`p-4 hover:bg-white transition-colors cursor-pointer group flex gap-4 ${!msg.read ? 'bg-blue-50/30' : ''}`}>
                  
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
                      <span className="text-gray-300">•</span>
                      <span className="text-sm text-gray-600 truncate">{msg.sender}</span>
                      
                      {msg.urgent && (
                        <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-700">
                          URGENT
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
    </div>
  );
}
