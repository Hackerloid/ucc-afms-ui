import { useState } from 'react';
import { 
  FileCode, 
  Plus, 
  Search, 
  Edit3, 
  Copy, 
  Trash2, 
  Layout, 
  Variable, 
  CheckCircle,
  FileText
} from 'lucide-react';

interface Template {
  id: string;
  name: string;
  category: string;
  lastModified: string;
  author: string;
  placeholders: string[];
}

export default function Templates() {
  const [_selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  const templatesData: Template[] = [
    {
      id: 'T-001',
      name: 'Standard Memo Template',
      category: 'Internal',
      lastModified: '2026-03-01',
      author: 'Super Admin',
      placeholders: ['recipient_name', 'sender_dept', 'subject', 'date', 'ref_no']
    },
    {
      id: 'T-002',
      name: 'External Response Letter',
      category: 'External',
      lastModified: '2026-02-15',
      author: 'Registrar',
      placeholders: ['org_name', 'salutation', 'our_ref', 'your_ref', 'body_text']
    },
    {
      id: 'T-003',
      name: 'Academic Board Circular',
      category: 'Circular',
      lastModified: '2026-03-10',
      author: 'Vice Chancellor Office',
      placeholders: ['board_meeting_date', 'venue', 'agenda_items']
    }
  ];

  return (
    <div className="space-y-6 animate-fade pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Template Management</h1>
          <p className="text-sm text-gray-500 mt-1">Design and manage reusable document templates with dynamic placeholders (FR-1200).</p>
        </div>
        <button className="px-4 py-2 bg-ucc-blue hover:bg-ucc-blue/90 text-white rounded-xl shadow-lg shadow-ucc-blue/20 transition-all hover:-translate-y-0.5 font-medium text-sm flex items-center">
          <Plus size={18} className="mr-2" /> New Template
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Templates Grid / List */}
        <div className="lg:col-span-3 space-y-4">
          <div className="glass-card p-4 border-b border-gray-100 flex justify-between items-center bg-white/50">
            <div className="relative flex-1 max-w-sm">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <Search size={16} />
              </span>
              <input 
                type="text" 
                placeholder="Search templates..." 
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-ucc-blue/20 transition-shadow"
              />
            </div>
            <div className="flex gap-2">
               <button className="p-2 text-gray-400 hover:text-gray-900"><Layout size={20} /></button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {templatesData.map((template) => (
              <div key={template.id} className="glass-card p-5 group hover:border-ucc-blue/30 transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-ucc-blue/5 text-ucc-blue rounded-lg group-hover:bg-ucc-blue group-hover:text-white transition-colors">
                    <FileCode size={24} />
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 text-gray-400 hover:text-ucc-blue"><Edit3 size={16} /></button>
                    <button className="p-1.5 text-gray-400 hover:text-ucc-blue"><Copy size={16} /></button>
                    <button className="p-1.5 text-gray-400 hover:text-red-500"><Trash2 size={16} /></button>
                  </div>
                </div>
                
                <h3 className="font-bold text-gray-900 group-hover:text-ucc-blue transition-colors">{template.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{template.id}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                  <span className="text-xs text-ucc-blue font-semibold">{template.category}</span>
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {template.placeholders.slice(0, 3).map((p, i) => (
                    <span key={i} className="text-[10px] font-mono bg-amber-50 text-amber-700 px-2 py-0.5 rounded flex items-center">
                      <Variable size={10} className="mr-1 opacity-50" /> {`{{${p}}}`}
                    </span>
                  ))}
                  {template.placeholders.length > 3 && (
                    <span className="text-[10px] text-gray-400 font-medium">+{template.placeholders.length - 3} more</span>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-gray-50 flex justify-between items-center bg-gray-50/50 -mx-5 -mb-5 px-5 py-3 rounded-b-2xl">
                   <div className="text-[10px] text-gray-500">
                     Edited {new Date(template.lastModified).toLocaleDateString()}
                   </div>
                   <button 
                     onClick={() => setSelectedTemplate(template)}
                     className="text-xs font-bold text-ucc-blue hover:underline"
                   >
                     Preview & Edit
                   </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Placeholder Info / Editor Sidebar FR-1203 */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-card p-6 border-t-4 border-t-amber-500">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-4 flex items-center">
              <Variable size={16} className="text-amber-500 mr-2" /> Dynamic Placeholders
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed mb-6">
              Use these global placeholders in your template design. They will auto-populate with document metadata during registration (FR-1203).
            </p>
            
            <div className="space-y-4">
              {[
                { key: 'recipient_name', desc: 'Recipient full name' },
                { key: 'date', desc: 'Current system date' },
                { key: 'ref_no', desc: 'Auto-generated reference number' },
                { key: 'sender_dept', desc: 'Department of the sender' },
                { key: 'subject', desc: 'The document subject' }
              ].map((item, i) => (
                <div key={i} className="flex flex-col gap-1">
                  <code className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-1 rounded self-start">
                    {`{{${item.key}}}`}
                  </code>
                  <span className="text-[10px] text-gray-400 ml-1">{item.desc}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col items-center text-center">
               <div className="w-12 h-12 rounded-full bg-green-50 text-green-600 flex items-center justify-center mb-3">
                 <CheckCircle size={24} />
               </div>
               <h4 className="text-sm font-bold text-gray-900">FR-1202 Ready</h4>
               <p className="text-[11px] text-gray-500 mt-1">Department Admins can create department-specific templates here.</p>
            </div>
          </div>

          <div className="glass-card p-6 bg-gradient-to-br from-ucc-blue/5 to-transparent">
             <h4 className="text-sm font-bold text-gray-900 mb-2 flex items-center">
               <FileText size={16} className="text-ucc-blue mr-2" /> Recent Actions
             </h4>
             <ul className="space-y-3">
               <li className="text-[11px] text-gray-600 flex gap-2">
                 <span className="w-1.5 h-1.5 rounded-full bg-ucc-blue mt-1.5"></span>
                 <span>You modified **Standard Memo** 2h ago</span>
               </li>
               <li className="text-[11px] text-gray-600 flex gap-2">
                 <span className="w-1.5 h-1.5 rounded-full bg-gray-300 mt-1.5"></span>
                 <span>Registrar added **External Response** yesterday</span>
               </li>
             </ul>
          </div>
        </div>

      </div>
    </div>
  );
}
