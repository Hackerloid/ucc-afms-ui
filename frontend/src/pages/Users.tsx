import { useState } from 'react';
import { Search, Mail, Shield, MoreVertical, UserPlus, Users as UsersIcon, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { UCC_DEPARTMENTS } from '../constants/departments';

export default function Users() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('All Institutional Roles');
  const [showProvisionModal, setShowProvisionModal] = useState(false);

  const usersData = [
    { name: 'Dr. Kwame Mensah', email: 'kmensah@ucc.edu.gh', role: 'Super Admin', department: 'IT Services', status: 'Active', avatarColor: 'bg-ucc-blue text-white' },
    { name: 'Prof. Yaa Asantewaa', email: 'yasantewaa@ucc.edu.gh', role: 'Department Head', department: 'Computer Science', status: 'Active', avatarColor: 'bg-green-500 text-white' },
    { name: 'Akwasi Appiah', email: 'aappiah@ucc.edu.gh', role: 'Records Clerk', department: 'Registry', status: 'Active', avatarColor: 'bg-ucc-gold text-white' },
    { name: 'Abena Osei', email: 'aosei@ucc.edu.gh', role: 'Records Clerk', department: 'Finance', status: 'Active', avatarColor: 'bg-amber-500 text-white' },
    { name: 'Kofi Annan', email: 'kannan@ucc.edu.gh', role: 'Viewer', department: 'General Admin', status: 'Active', avatarColor: 'bg-gray-400 text-white' },
  ];

  const filteredUsers = usersData.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.department.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRole = selectedRole === 'All Institutional Roles' || user.role === selectedRole;
    
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-8 animate-fade-in p-2 pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="animate-slide-up">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-1 rounded bg-ucc-blue/5 text-ucc-blue text-[10px] font-black uppercase tracking-widest border border-ucc-blue/10">Access Management</span>
            <span className="w-1.5 h-1.5 rounded-full bg-ucc-blue animate-pulse-soft"></span>
          </div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tighter leading-none">
            User <span className="text-ucc-blue">Directories</span>
          </h1>
          <p className="text-sm text-gray-500 mt-3 font-medium max-w-xl leading-relaxed">
            Manage institutional access, administrative roles, and departmental permissions for faculty and staff.
          </p>
        </div>
        {user?.role === 'Super Admin' && (
          <div className="flex gap-3 animate-slide-up" style={{ animationDelay: '100ms' }}>
            <button 
              onClick={() => setShowProvisionModal(true)}
              className="px-6 py-2.5 bg-ucc-blue hover:bg-black text-white rounded-2xl shadow-xl shadow-ucc-blue/20 transition-all hover:-translate-y-1 font-bold text-xs uppercase tracking-widest flex items-center gap-2"
            >
              <UserPlus size={16} /> Provision New Account
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {/* Main Users Interface */}
        <div className="lg:col-span-3 xl:col-span-4 space-y-4 animate-slide-up" style={{ animationDelay: '200ms' }}>
          <div className="glass-panel group">
            {/* Toolbar */}
            <div className="px-8 py-5 border-b border-gray-100 flex flex-col md:flex-row justify-between gap-6 bg-gray-50/30">
              <div className="relative flex-1 group/search">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within/search:text-ucc-blue transition-colors" size={18} />
                <input 
                  type="text" 
                  placeholder="Search by name, email, or institutional ID..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/50 border border-gray-200/50 rounded-xl py-2.5 pl-12 pr-4 focus:bg-white focus:border-ucc-blue/30 focus:ring-4 focus:ring-ucc-blue/5 transition-all outline-none text-sm font-medium"
                />
              </div>
              <div className="flex gap-3">
                <select 
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-600 outline-none focus:border-ucc-blue/20 cursor-pointer"
                >
                  <option>All Institutional Roles</option>
                  <option>Super Admin</option>
                  <option>Department Head</option>
                  <option>Records Clerk</option>
                  <option>Viewer</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-100">
                    <th className="px-8 py-5 font-black text-[10px] text-gray-400 uppercase tracking-widest">Faculty / Staff Identity</th>
                    <th className="px-6 py-5 font-black text-[10px] text-gray-400 uppercase tracking-widest">Institutional Role</th>
                    <th className="px-6 py-5 font-black text-[10px] text-gray-400 uppercase tracking-widest">Department</th>
                    <th className="px-6 py-5 font-black text-[10px] text-gray-400 uppercase tracking-widest">Account Status</th>
                    <th className="px-8 py-5 text-right font-black text-[10px] text-gray-400 uppercase tracking-widest">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredUsers.map((user, idx) => (
                    <tr 
                      key={idx} 
                      onClick={() => {}} // Placeholder for user details
                      className="hover:bg-white transition-all group/row cursor-pointer"
                    >
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black group-hover/row:scale-110 transition-all duration-500 shadow-sm ${user.avatarColor}`}>
                            {user.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                          </div>
                          <div className="min-w-0">
                            <div className="font-bold text-gray-900 truncate tracking-tight group-hover/row:text-ucc-blue transition-colors text-base">{user.name}</div>
                            <div className="text-[10px] text-gray-400 mt-1 font-bold uppercase tracking-wider flex items-center gap-1">
                              <Mail size={12} className="opacity-50" /> {user.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border-2 ${
                          user.role.includes('Admin') ? 'bg-purple-50 text-purple-700 border-purple-100' : 'bg-gray-50 text-gray-600 border-gray-100'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <div className="text-xs font-bold text-gray-700">{user.department}</div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${user.status === 'Active' ? 'bg-green-500 animate-pulse-soft' : 'bg-gray-300'}`}></span>
                          <span className="text-[10px] font-black text-gray-700 uppercase tracking-tight">{user.status}</span>
                        </div>
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
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Showing <span className="text-gray-900">5</span> of <span className="text-ucc-blue">482</span> active faculty/staff</p>
              <div className="flex gap-2">
                <button disabled className="px-4 py-1.5 border border-gray-200 rounded-lg text-[10px] font-black text-gray-400 uppercase tracking-widest bg-gray-100/50 cursor-not-allowed">Previous Page</button>
                <button className="px-4 py-1.5 border border-gray-200 rounded-lg text-[10px] font-black text-gray-700 uppercase tracking-widest hover:bg-white hover:border-ucc-blue/20 transition-all">Next Page</button>
              </div>
            </div>
          </div>
        </div>

        {/* Roles Details Sidebar */}
        <div className="space-y-6 animate-slide-up" style={{ animationDelay: '300ms' }}>
          <div className="glass-panel p-6">
            <h3 className="text-[10px] font-black text-gray-400 tracking-[0.2em] flex items-center mb-6 uppercase">
              <Shield size={16} className="text-ucc-blue mr-2" /> Role Metrics
            </h3>
            <div className="space-y-6">
              {[
                { label: 'System Admin', count: 12, color: 'bg-ucc-blue', percent: '15%' },
                { label: 'Department Head', count: 45, color: 'bg-ucc-gold', percent: '45%' },
                { label: 'Records Officer', count: 120, color: 'bg-green-500', percent: '85%' },
              ].map((role) => (
                <div key={role.label}>
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-xs font-black text-gray-700 uppercase tracking-tight">{role.label}</span>
                    <span className="text-sm font-black text-gray-900">{role.count}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                    <div className={`${role.color} h-full rounded-full transition-all duration-1000`} style={{ width: role.percent }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel p-6 border-l-4 border-l-ucc-blue bg-ucc-blue/[0.02]">
            <div className="w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center text-ucc-blue mb-6">
              <UsersIcon size={24} />
            </div>
            <h3 className="text-lg font-black text-gray-900 tracking-tight mb-2 leading-none">Institutional Sync</h3>
            <p className="text-xs text-gray-500 mb-6 font-medium leading-relaxed">Synchronize user accounts with the University's Active Directory and Faculty records.</p>
            <button className="w-full py-3 bg-white border border-gray-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-ucc-blue hover:bg-ucc-blue hover:text-white hover:border-ucc-blue transition-all shadow-sm">
              Initialize AD Sync
            </button>
          </div>
        </div>
      </div>

      {/* Provisioning Modal Overlay */}
      {showProvisionModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-ucc-blue/20 backdrop-blur-xl animate-fade-in">
          <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col animate-slide-up border border-white/50">
            {/* Modal Header */}
            <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-[#1a1a1a] text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 -mr-32 -mt-32 bg-ucc-blue/30 rounded-full blur-3xl"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 rounded bg-white/10 text-white text-[9px] font-black uppercase tracking-widest backdrop-blur-md">UCC Identity Access</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                </div>
                <h2 className="text-3xl font-black tracking-tighter">Provision New <span className="text-ucc-blue-light">Account</span></h2>
                <p className="text-[10px] text-gray-400 mt-2 font-black uppercase tracking-[0.2em] opacity-80">Institutional Credential Generation</p>
              </div>
              <button 
                onClick={() => setShowProvisionModal(false)}
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
                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 ml-1">Staff / Faculty Full Name</label>
                    <input 
                      type="text" 
                      placeholder="Enter official institutional name..."
                      className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 px-6 focus:bg-white focus:border-ucc-blue/30 outline-none text-sm font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 ml-1">Institutional Email</label>
                    <input 
                      type="email" 
                      placeholder="username@ucc.edu.gh"
                      className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 px-6 focus:bg-white focus:border-ucc-blue/30 outline-none text-sm font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 ml-1">Assigned Department</label>
                    <select className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 px-6 focus:bg-white focus:border-ucc-blue/30 outline-none text-sm font-bold appearance-none cursor-pointer">
                      {UCC_DEPARTMENTS.slice(0, 15).map(dept => (
                        <option key={dept.id} value={dept.name}>{dept.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 ml-1">System Role & Permissions</label>
                    <select className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 px-6 focus:bg-white focus:border-ucc-blue/30 outline-none text-sm font-bold appearance-none cursor-pointer">
                      <option>Super Admin (Full System Oversight)</option>
                      <option>Department Head (Unit Restricted Management)</option>
                      <option>Records Clerk (Document Inflow/Archive Only)</option>
                      <option>Standard Viewer (Read-only Access)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 ml-1">Institutional ID No.</label>
                    <input 
                      type="text" 
                      placeholder="e.g. UCC/STF/1234"
                      className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 px-6 focus:bg-white focus:border-ucc-blue/30 outline-none text-sm font-bold"
                    />
                  </div>
                </div>

                <div className="space-y-6 pt-4">
                  <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.25em] flex items-center gap-3">
                    <Shield size={18} className="text-ucc-blue" /> Access Verification
                  </h3>
                  <div className="p-6 bg-gray-50 border border-gray-100 rounded-[1.5rem] space-y-4">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-ucc-blue focus:ring-ucc-blue" />
                      <span className="text-[11px] font-bold text-gray-600 group-hover:text-gray-900 transition-colors">Enable Multi-Factor Authentication (MFA) via Active Directory</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-ucc-blue focus:ring-ucc-blue" />
                      <span className="text-[11px] font-bold text-gray-600 group-hover:text-gray-900 transition-colors">Require password reset upon initial institutional login</span>
                    </label>
                  </div>
                </div>
              </form>
            </div>

            {/* Modal Footer */}
            <div className="p-8 border-t border-gray-100 bg-gray-50 flex justify-end gap-4">
              <button 
                onClick={() => setShowProvisionModal(false)}
                className="px-8 py-3.5 border border-gray-200 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-gray-900 transition-all rounded-2xl"
              >
                Cancel
              </button>
              <button className="px-10 py-3.5 bg-[#1a1a1a] text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-ucc-blue shadow-xl shadow-black/20 transition-all">
                Provision Credentials
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
