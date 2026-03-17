import { Users as UsersIcon, Search, Shield, UserPlus, MoreVertical, Mail } from 'lucide-react';

export default function Users() {
  const usersData = [
    { name: 'Dr. Kwame Mensah', email: 'kmensah@ucc.edu.gh', role: 'Super Admin', department: 'IT Services', status: 'Active', avatarColor: 'bg-ucc-blue text-white' },
    { name: 'Prof. Yaa Asantewaa', email: 'yasantewaa@ucc.edu.gh', role: 'Department Head', department: 'Computer Science', status: 'Active', avatarColor: 'bg-green-500 text-white' },
    { name: 'Akwasi Appiah', email: 'aappiah@ucc.edu.gh', role: 'Records Clerk', department: 'Registry', status: 'Active', avatarColor: 'bg-ucc-gold text-white' },
    { name: 'Abena Osei', email: 'aosei@ucc.edu.gh', role: 'Records Clerk', department: 'Finance', status: 'Active', avatarColor: 'bg-amber-500 text-white' },
    { name: 'Kofi Annan', email: 'kannan@ucc.edu.gh', role: 'Viewer', department: 'General Admin', status: 'Active', avatarColor: 'bg-gray-400 text-white' },
  ];

  return (
    <div className="space-y-6 animate-fade">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">User Management</h1>
          <p className="text-sm text-gray-500 mt-1">Manage system access, roles, and user accounts.</p>
        </div>
        <button className="px-4 py-2 bg-ucc-blue hover:bg-ucc-blue/90 text-white rounded-xl shadow-lg shadow-ucc-blue/20 transition-all hover:-translate-y-0.5 font-medium text-sm flex items-center">
          <UserPlus size={18} className="mr-2" /> Add New User
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Main Users Table - Takes up 3 cols */}
        <div className="glass-card lg:col-span-3 overflow-hidden flex flex-col">
          <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-white/50">
            <div className="relative w-full max-w-sm">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <Search size={16} />
              </span>
              <input 
                type="text" 
                placeholder="Search users..." 
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-ucc-blue/20 outline-none transition-shadow"
              />
            </div>
            <div className="flex gap-2">
              <select className="border border-gray-200 rounded-lg text-sm py-2 px-3 outline-none focus:ring-2 focus:ring-ucc-blue/20 bg-white">
                <option>All Roles</option>
                <option>Admin</option>
                <option>Editor</option>
                <option>Viewer</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto flex-1">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-500 uppercase bg-gray-50/50">
                <tr>
                  <th className="px-6 py-4 font-semibold">User</th>
                  <th className="px-6 py-4 font-semibold">Role</th>
                  <th className="px-6 py-4 font-semibold">Department</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {usersData.map((user, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/80 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 font-bold ${user.avatarColor}`}>
                          {user.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{user.name}</div>
                          <div className="text-xs text-gray-500 flex items-center mt-0.5">
                            <Mail size={12} className="mr-1" /> {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium ${
                        user.role.includes('Admin') ? 'bg-purple-50 text-purple-700 border border-purple-200' : 'bg-gray-100 text-gray-700 border border-gray-200'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{user.department}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full border ${
                        user.status === 'Active' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-100 text-gray-500 border-gray-200'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${user.status === 'Active' ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                        {user.status}
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
        </div>

        {/* Roles Details - Takes up 1 col */}
        <div className="space-y-6">
          <div className="glass-card p-6">
            <h3 className="text-sm font-bold text-gray-900 tracking-tight flex items-center mb-4 uppercase">
              <Shield size={16} className="text-ucc-blue mr-2" /> Role Distribution
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 font-medium">System Admin</span>
                  <span className="text-gray-900 font-bold">12</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-ucc-blue h-2 rounded-full" style={{ width: '15%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 font-medium">Department Head</span>
                  <span className="text-gray-900 font-bold">45</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-ucc-gold h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 font-medium">Clerk / Editor</span>
                  <span className="text-gray-900 font-bold">120</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card p-6 border border-ucc-blue/20 bg-ucc-blue/5">
            <div className="flex items-center justify-center w-12 h-12 bg-white rounded-xl shadow-sm mb-4 text-ucc-blue">
              <UsersIcon size={24} />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Need to import users?</h3>
            <p className="text-sm text-gray-600 mb-4">You can bulk import users via CSV or sync directly with the university Active Directory.</p>
            <button className="w-full py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-ucc-blue hover:bg-gray-50 transition-colors shadow-sm">
              Setup AD Sync
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
