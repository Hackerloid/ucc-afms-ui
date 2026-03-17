import { useState } from 'react';
import { Building2, Search, Plus, MapPin, Phone, Mail, MoreVertical, User as UserIcon } from 'lucide-react';
import { UCC_DEPARTMENTS } from '../constants/departments';

export default function Departments() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const departmentsData = UCC_DEPARTMENTS.filter(dept => 
    dept.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    dept.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dept.head.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Departments Directory</h1>
          <p className="text-sm text-gray-500 mt-1">Manage institutional departments and administrative units.</p>
        </div>
        <button className="px-4 py-2 bg-ucc-blue hover:bg-ucc-blue/90 text-white rounded-xl shadow-lg shadow-ucc-blue/20 transition-all hover:-translate-y-0.5 font-medium text-sm flex items-center">
          <Plus size={18} className="mr-2" /> Add Department
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main List */}
        <div className="glass-card lg:col-span-2 overflow-hidden flex flex-col">
          <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-white/50">
            <div className="relative w-full max-w-sm">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <Search size={16} />
              </span>
              <input 
                type="text" 
                placeholder="Search departments..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-ucc-blue/20 outline-none transition-shadow"
              />
            </div>
            <div className="text-sm text-gray-500">
              Showing <span className="font-bold text-gray-900">{departmentsData.length}</span> departments
            </div>
          </div>

          <div className="overflow-x-auto flex-1 p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {departmentsData.map((dept, idx) => (
                <div key={idx} className="border border-gray-100 rounded-xl p-5 hover:border-ucc-blue/30 hover:shadow-md transition-all group bg-white">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-ucc-blue/5 text-ucc-blue border border-ucc-blue/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Building2 size={20} />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 leading-tight group-hover:text-ucc-blue transition-colors line-clamp-1">{dept.name}</h3>
                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{dept.id}</span>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-900 p-1 rounded-lg">
                      <MoreVertical size={18} />
                    </button>
                  </div>
                  
                  <div className="space-y-2 mt-4 pt-4 border-t border-gray-50 text-sm">
                    <div className="flex items-center text-gray-600">
                      <span className="w-6 flex justify-center"><UserIcon size={14} className="opacity-50" /></span>
                      <span className="font-medium text-gray-800 ml-1">{dept.head}</span> <span className="text-xs text-gray-400 ml-2">(Head)</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <span className="w-6 flex justify-center"><MapPin size={14} className="opacity-50" /></span>
                      <span className="ml-1 text-xs truncate max-w-[200px]">{dept.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <span className="w-6 flex justify-center"><Mail size={14} className="opacity-50" /></span>
                      <a href={`mailto:${dept.email}`} className="ml-1 text-xs text-ucc-blue hover:underline truncate">{dept.email}</a>
                    </div>
                  </div>
                  
                  <div className="mt-5 pt-3 border-t border-gray-50 flex justify-between items-center">
                    <span className="inline-flex items-center px-2 py-1 bg-gray-50 border border-gray-100 rounded text-xs font-medium text-gray-600">
                      {dept.employees} Employees
                    </span>
                    <button className="text-sm font-medium text-ucc-blue hover:text-ucc-blue/80">View Details →</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Analytics Sidebar */}
        <div className="space-y-6">
          <div className="glass-card p-6">
            <h3 className="text-sm font-bold text-gray-900 tracking-tight flex items-center mb-4 uppercase">
              <Building2 size={16} className="text-ucc-blue mr-2" /> Top Departments
            </h3>
            <p className="text-xs text-gray-500 mb-4">By volume of processed documents</p>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 font-medium truncate">Finance & Accounting</span>
                  <span className="text-gray-900 font-bold ml-2">4,291</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-ucc-blue h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 font-medium truncate">Information Technology</span>
                  <span className="text-gray-900 font-bold ml-2">3,105</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-ucc-gold h-2 rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 font-medium truncate">Human Resources</span>
                  <span className="text-gray-900 font-bold ml-2">2,840</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card p-6 border-l-4 border-l-amber-500 flex items-start gap-4">
            <div className="p-2 bg-amber-50 rounded-lg text-amber-600 mt-1">
              <Phone size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900">Internal Directory</h4>
              <p className="text-xs text-gray-600 mt-1 mb-3 leading-relaxed">Need the full institutional contact list? Download the updated PDF directory.</p>
              <button className="text-xs font-semibold px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                Download PDF
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
