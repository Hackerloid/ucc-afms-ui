import { useState } from 'react';
import { 
  GitBranch, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  Clock, 
  User, 
  MessageSquare, 
  AlertTriangle,
  Send,
  Calendar,
  MoreVertical,
  Filter
} from 'lucide-react';

interface WorkflowStep {
  id: string;
  role: string;
  user: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Skipped';
  timestamp?: string;
  comment?: string;
}

interface Workflow {
  id: string;
  docRef: string;
  docSubject: string;
  currentStep: number;
  steps: WorkflowStep[];
  deadline: string;
  priority: 'Normal' | 'Urgent' | 'Immediate';
}

export default function Workflows() {
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(null);

  const workflowsData: Workflow[] = [
    {
      id: 'WF-001',
      docRef: 'UCC/REG/2026/042',
      docSubject: 'Annual Staff Performance Review 2025',
      currentStep: 1,
      deadline: '2026-03-25',
      priority: 'Normal',
      steps: [
        { id: 's1', role: 'Records Clerk', user: 'James Amissah', status: 'Approved', timestamp: '2026-03-15 10:30', comment: 'Document registered and verified.' },
        { id: 's2', role: 'Department Head', user: 'Dr. Kwame Mensah', status: 'Pending' },
        { id: 's3', role: 'Super Admin', user: 'Admin User', status: 'Pending' }
      ]
    },
    {
      id: 'WF-002',
      docRef: 'UCC/IT/2026/008',
      docSubject: 'Network Infrastructure Upgrade Proposal',
      currentStep: 0,
      deadline: '2026-03-20',
      priority: 'Immediate',
      steps: [
        { id: 's1', role: 'Records Clerk', user: 'James Amissah', status: 'Pending' },
        { id: 's2', role: 'Department Head', user: 'Head of IT', status: 'Pending' }
      ]
    }
  ];

  return (
    <div className="space-y-6 animate-fade pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Workflow Automation</h1>
          <p className="text-sm text-gray-500 mt-1">Track and manage multi-step document approval processes (FR-400 Series).</p>
        </div>
        <div className="flex gap-2 text-sm">
          <div className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full font-bold flex items-center border border-amber-200">
            <AlertTriangle size={14} className="mr-1.5" /> 3 Overdue Items
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Active Workflows List */}
        <div className="lg:col-span-1 space-y-4">
          <div className="flex justify-between items-center px-1">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Active Routings</h3>
            <button className="text-gray-400 hover:text-gray-900"><Filter size={16} /></button>
          </div>
          
          {workflowsData.map((wf) => (
            <div 
              key={wf.id}
              onClick={() => setSelectedWorkflow(wf)}
              className={`glass-card p-4 cursor-pointer transition-all border-l-4 hover:shadow-lg ${
                selectedWorkflow?.id === wf.id ? 'border-l-ucc-blue ring-1 ring-ucc-blue/10 bg-white/80' : 'border-l-transparent'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-bold text-ucc-blue bg-ucc-blue/5 px-2 py-0.5 rounded uppercase tracking-wider">
                  {wf.id}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                  wf.priority === 'Immediate' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                }`}>
                  {wf.priority}
                </span>
              </div>
              <h4 className="text-sm font-bold text-gray-900 line-clamp-2 mb-3 group-hover:text-ucc-blue transition-colors">
                {wf.docSubject}
              </h4>
              
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                  <Clock size={12} /> Deadline: {new Date(wf.deadline).toLocaleDateString()}
                </div>
                <div className="flex -space-x-2">
                  {wf.steps.map((step, i) => (
                    <div 
                      key={i} 
                      title={`${step.role}: ${step.status}`}
                      className={`w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-[8px] font-bold text-white ${
                        step.status === 'Approved' ? 'bg-green-500' : step.status === 'Pending' ? 'bg-gray-300' : 'bg-red-500'
                      }`}
                    >
                      {i + 1}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Workflow Detail View */}
        <div className="lg:col-span-2">
          {selectedWorkflow ? (
            <div className="glass-card flex flex-col h-full min-h-[600px] animate-slide-left">
              <div className="p-6 border-b border-gray-100 flex justify-between items-start bg-white/50">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{selectedWorkflow.docSubject}</h2>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-1 rounded">{selectedWorkflow.docRef}</span>
                    <span className="text-xs text-gray-400 flex items-center"><Calendar size={12} className="mr-1" /> Started Mar 15, 2026</span>
                  </div>
                </div>
                <div className="flex gap-2">
                   <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-400"><MoreVertical size={20} /></button>
                </div>
              </div>

              {/* Steps Visualizer FR-402, FR-403 */}
              <div className="p-8 flex-1 overflow-y-auto">
                <div className="relative space-y-12">
                  {/* Vertical Line */}
                  <div className="absolute left-6 top-2 bottom-2 w-0.5 bg-gray-100"></div>

                  {selectedWorkflow.steps.map((step, idx) => (
                    <div key={idx} className="relative flex gap-8 group">
                      {/* Step Indicator */}
                      <div className={`relative z-10 w-12 h-12 rounded-full border-4 border-white shadow-md flex items-center justify-center transition-transform group-hover:scale-110 ${
                        step.status === 'Approved' ? 'bg-green-500 text-white' : 
                        step.status === 'Pending' ? 'bg-white text-ucc-blue ring-1 ring-ucc-blue/20' : 
                        'bg-red-500 text-white'
                      }`}>
                        {step.status === 'Approved' ? <CheckCircle2 size={24} /> : 
                         step.status === 'Pending' ? <Clock size={20} /> : <XCircle size={24} />}
                      </div>

                      {/* Step Content */}
                      <div className="flex-1 pt-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h5 className="font-bold text-gray-900 leading-none">{step.role}</h5>
                            <p className="text-sm text-gray-500 mt-1 flex items-center">
                              <User size={14} className="mr-1.5 opacity-60" /> {step.user}
                            </p>
                          </div>
                          {step.timestamp && (
                            <span className="text-xs text-gray-400 font-medium">{step.timestamp}</span>
                          )}
                        </div>

                        {step.comment && (
                          <div className="mt-3 p-3 bg-gray-50 rounded-xl border border-gray-100 relative group-hover:bg-white transition-colors">
                            <div className="absolute -left-2 top-3 w-4 h-4 bg-gray-50 border-l border-t border-gray-100 rotate-45 group-hover:bg-white transition-colors"></div>
                            <p className="text-sm text-gray-600 italic flex items-start gap-2">
                              <MessageSquare size={14} className="mt-1 flex-shrink-0 opacity-40 text-ucc-blue" />
                              "{step.comment}"
                            </p>
                          </div>
                        )}

                        {step.status === 'Pending' && idx === selectedWorkflow.currentStep && (
                          <div className="mt-6 p-6 border-2 border-ucc-blue/10 bg-ucc-blue/5 rounded-2xl animate-fade">
                            <h6 className="text-xs font-bold text-ucc-blue uppercase tracking-widest mb-4">Your Action Required</h6>
                            <textarea 
                              placeholder="Add comments or reasons for decision..."
                              className="w-full p-4 border border-blue-200 rounded-xl outline-none focus:ring-2 focus:ring-ucc-blue/20 transition-shadow text-sm min-h-[100px]"
                            ></textarea>
                            <div className="flex gap-3 mt-4">
                              <button className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-lg shadow-green-600/20 transition-all font-bold text-sm flex items-center">
                                <CheckCircle2 size={16} className="mr-2" /> Approve
                              </button>
                              <button className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-lg shadow-red-600/20 transition-all font-bold text-sm flex items-center">
                                <XCircle size={16} className="mr-2" /> Reject
                              </button>
                              <button className="px-5 py-2 bg-white border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-all font-bold text-sm flex items-center">
                                <ArrowRight size={16} className="mr-2" /> Forward
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions Footer */}
              <div className="p-4 border-t border-gray-100 bg-gray-50/50 flex justify-between items-center">
                <div className="text-xs text-gray-500 font-medium ml-4">
                  FR-406: <button className="text-ucc-blue hover:underline font-bold">Delegate this workflow</button>
                </div>
                <button className="px-4 py-2 text-ucc-blue hover:bg-ucc-blue/5 rounded-lg text-sm font-bold flex items-center">
                  <Send size={16} className="mr-2" /> Notify Current Holder
                </button>
              </div>
            </div>
          ) : (
            <div className="glass-card flex flex-col items-center justify-center p-12 text-center h-[600px] border-dashed">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-6">
                <GitBranch size={40} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 leading-tight">No Workflow Selected</h3>
              <p className="text-sm text-gray-500 mt-2 max-w-sm">Select a routing from the list to view its audit trail, history, and perform pending actions.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
