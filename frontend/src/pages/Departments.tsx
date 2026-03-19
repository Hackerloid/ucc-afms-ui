import { useState } from 'react';
import { 
  Building2, 
  Search, 
  Plus, 
  MapPin, 
  MoreVertical, 
  User as UserIcon, 
  ArrowRight, 
  X, 
  Upload, 
  Filter, 
  Layers, 
  Users 
} from 'lucide-react';
import { UCC_DEPARTMENTS } from '../constants/departments';
import { useAuth } from '../context/AuthContext';

export default function Departments() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDivision, setSelectedDivision] = useState('All Divisions');
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  
  const divisions = [
    'All Divisions',
    'Central Administration',
    'Academic Support & Governance',
    'College of Humanities and Legal Studies',
    'College of Education',
    'College of Agriculture and Natural Sciences',
    'College of Health and Allied Sciences',
    'School of Economics',
    'Institute of Development Studies',
    'College of Distance Education'
  ];

  const departmentsData = UCC_DEPARTMENTS.filter(dept => {
    const matchesSearch = dept.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      dept.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (dept.head && dept.head.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesDivision = selectedDivision === 'All Divisions' || dept.division === selectedDivision;
    
    return matchesSearch && matchesDivision;
  });

  return (
    <div className="space-y-8 animate-fade-in p-2">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="animate-slide-up">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-1 rounded bg-ucc-blue/5 text-ucc-blue text-[10px] font-black uppercase tracking-widest border border-ucc-blue/10">Institutional Directory</span>
            <span className="w-1.5 h-1.5 rounded-full bg-ucc-gold animate-pulse-soft"></span>
          </div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tighter leading-none">
            University <span className="text-ucc-blue">Departments</span>
          </h1>
          <p className="text-sm text-gray-500 mt-3 font-medium max-w-xl leading-relaxed">
            Navigate the organizational structure of the University. View departments, divisions, and specialized units.
          </p>
        </div>
        {user?.role === 'Super Admin' && (
          <div className="flex gap-3 animate-slide-up" style={{ animationDelay: '100ms' }}>
            <button 
              onClick={() => setShowRegisterModal(true)}
              className="px-6 py-2.5 bg-ucc-blue hover:bg-black text-white rounded-2xl shadow-xl shadow-ucc-blue/20 transition-all hover:-translate-y-1 font-bold text-xs uppercase tracking-widest flex items-center gap-2"
            >
              <Plus size={16} /> Register New Unit
            </button>
          </div>
        )}
      </div>

      {/* Filter & Search Bar */}
      <div className="glass-panel p-4 animate-slide-up" style={{ animationDelay: '200ms' }}>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-ucc-blue transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Filter by Unit Name, ID, or Head of Department..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50/50 border border-gray-200/50 rounded-xl py-3 pl-12 pr-4 focus:bg-white focus:border-ucc-blue/30 focus:ring-4 focus:ring-ucc-blue/5 transition-all outline-none text-sm font-medium"
            />
          </div>
          <select 
            value={selectedDivision}
            onChange={(e) => setSelectedDivision(e.target.value)}
            className="bg-gray-50/50 border border-gray-200/50 rounded-xl py-3 px-4 text-sm font-bold text-gray-600 outline-none focus:bg-white focus:border-ucc-blue/30 transition-all cursor-pointer min-w-[200px]"
          >
            {divisions.map(div => (
              <option key={div} value={div}>{div}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Departments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 xl:gap-8 animate-slide-up" style={{ animationDelay: '300ms' }}>
        {departmentsData.map((dept) => (
          <div key={dept.id} className="glass-card group relative p-6 flex flex-col hover:border-ucc-blue/20">
            <div className="flex items-start justify-between mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-ucc-blue/5 to-ucc-blue/10 flex items-center justify-center text-ucc-blue group-hover:bg-ucc-blue group-hover:text-white transition-all duration-500 shadow-inner">
                <Building2 size={28} />
              </div>
              <button className="p-2 text-gray-300 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all">
                <MoreVertical size={20} />
              </button>
            </div>
            
            <div className="flex-1">
              <div className="text-[10px] font-black text-ucc-blue/40 uppercase tracking-[0.2em] mb-1">{dept.id}</div>
              <h3 className="text-lg font-black text-gray-900 tracking-tight leading-snug group-hover:text-ucc-blue transition-colors">{dept.name}</h3>
              
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 text-gray-500 group-hover:text-gray-700 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-ucc-blue/5 group-hover:text-ucc-blue transition-all">
                    <UserIcon size={14} />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">Head of Unit</div>
                    <div className="text-xs font-black">{dept.head || 'To be assigned'}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-gray-500 group-hover:text-gray-700 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-ucc-blue/5 group-hover:text-ucc-blue transition-all">
                    <MapPin size={14} />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">Location</div>
                    <div className="text-xs font-bold">{dept.location || 'Main Campus, UCC'}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-7 h-7 rounded-lg border-2 border-white bg-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-500">
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
                <div className="w-7 h-7 rounded-lg border-2 border-white bg-ucc-blue/10 flex items-center justify-center text-[10px] font-bold text-ucc-blue">
                  +12
                </div>
              </div>
              <button className="text-xs font-black text-ucc-blue uppercase tracking-widest hover:underline flex items-center gap-1 group/btn">
                View Archives <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Registration Modal Overlay */}
      {showRegisterModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-ucc-blue/20 backdrop-blur-xl animate-fade-in">
          <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col animate-slide-up border border-white/50">
            {/* Modal Header */}
            <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-ucc-blue text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 -mr-32 -mt-32 bg-white/10 rounded-full blur-3xl"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 rounded bg-white/20 text-white text-[9px] font-black uppercase tracking-widest backdrop-blur-md">Institutional Registry</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-ucc-gold animate-pulse"></span>
                </div>
                <h2 className="text-3xl font-black tracking-tighter">Register New <span className="text-ucc-gold">Unit</span></h2>
                <p className="text-[10px] text-blue-100 mt-2 font-black uppercase tracking-[0.2em] opacity-80">Official Departmental Onboarding</p>
              </div>
              <button 
                onClick={() => setShowRegisterModal(false)}
                className="p-3 bg-white/10 hover:bg-white/20 rounded-2xl transition-all group relative z-10"
              >
                <X size={24} className="group-hover:rotate-90 transition-transform duration-500" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-8 overflow-y-auto flex-1 custom-scrollbar">
              <form className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="md:col-span-2">
                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 ml-1">Full Unit Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Directorate of Academic Planning & Quality Assurance"
                      className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 px-6 focus:bg-white focus:border-ucc-blue/30 outline-none text-sm font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 ml-1">Parent Division</label>
                    <select className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 px-6 focus:bg-white focus:border-ucc-blue/30 outline-none text-sm font-bold appearance-none cursor-pointer">
                      {divisions.filter(d => d !== 'All Divisions').map(div => (
                        <option key={div} value={div}>{div}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 ml-1">Unit Code / ID</label>
                    <input 
                      type="text" 
                      placeholder="e.g. DAPQA"
                      className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 px-6 focus:bg-white focus:border-ucc-blue/30 outline-none text-sm font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 ml-1">Head of Unit</label>
                    <input 
                      type="text" 
                      placeholder="Enter Full Name and Title"
                      className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 px-6 focus:bg-white focus:border-ucc-blue/30 outline-none text-sm font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 ml-1">Office Location</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Old Library Block, Ground Floor"
                      className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 px-6 focus:bg-white focus:border-ucc-blue/30 outline-none text-sm font-bold"
                    />
                  </div>
                </div>
                
                <div className="space-y-6 pt-4">
                  <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.25em] flex items-center gap-3">
                    <span className="w-8 h-px bg-gray-200"></span> Unit Asset Verification
                  </h3>
                  <div className="p-8 border-2 border-dashed border-gray-200 rounded-3xl bg-gray-50/50 flex flex-col items-center justify-center text-center hover:bg-white hover:border-ucc-blue/30 transition-all cursor-pointer">
                    <Upload size={32} className="text-ucc-blue mb-4" />
                    <p className="text-xs font-black text-gray-900 uppercase tracking-widest">Upload Establishment Warrant</p>
                    <p className="text-[10px] text-gray-400 mt-2 font-medium">Digital copy of official formation document (PDF/JPG)</p>
                  </div>
                </div>
              </form>
            </div>

            {/* Modal Footer */}
            <div className="p-8 border-t border-gray-100 bg-gray-50 flex justify-end gap-4">
              <button 
                onClick={() => setShowRegisterModal(false)}
                className="px-8 py-3.5 border border-gray-200 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-gray-900 transition-all rounded-2xl"
              >
                Discard
              </button>
              <button className="px-10 py-3.5 bg-ucc-blue text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-black shadow-xl shadow-ucc-blue/20 transition-all">
                Registry Onboarding
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
