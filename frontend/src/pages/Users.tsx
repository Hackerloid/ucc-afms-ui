import { useState } from 'react';
import { Search, Mail, Shield, UserPlus, X, PencilLine, Trash2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { DEPARTMENT_DIRECTORY, formatDepartmentLabel } from '../constants/departments';

type AccountStatus = 'Active' | 'Inactive';
type DirectoryRole = 'Super Admin' | 'Department Head' | 'Records Clerk' | 'Viewer';

interface DirectoryUser {
  id: string;
  name: string;
  email: string;
  role: DirectoryRole;
  department: string;
  status: AccountStatus;
  avatarColor: string;
  employeeId: string;
}

interface UserFormState {
  name: string;
  email: string;
  role: DirectoryRole;
  department: string;
  status: AccountStatus;
  employeeId: string;
}

const getAvatarColor = (role: DirectoryRole) => {
  switch (role) {
    case 'Super Admin':
      return 'bg-ucc-blue text-white';
    case 'Department Head':
      return 'bg-green-500 text-white';
    case 'Records Clerk':
      return 'bg-ucc-gold text-white';
    default:
      return 'bg-gray-400 text-white';
  }
};

const createEmptyUserForm = (defaults: Partial<UserFormState> = {}): UserFormState => ({
  name: '',
  email: '',
  role: 'Department Head',
  department: DEPARTMENT_DIRECTORY[0]?.name ?? '',
  status: 'Active',
  employeeId: '',
  ...defaults,
});

const initialUsers: DirectoryUser[] = [
  {
    id: 'USR-001',
    name: 'Dr. Kwame Mensah',
    email: 'kmensah@ucc.edu.gh',
    role: 'Super Admin',
    department: 'Directorate of Information & Communication Technology Services (DICTS)',
    status: 'Active',
    avatarColor: getAvatarColor('Super Admin'),
    employeeId: 'UCC/STF/1001',
  },
  {
    id: 'USR-002',
    name: 'Prof. Yaa Asantewaa',
    email: 'yasantewaa@ucc.edu.gh',
    role: 'Department Head',
    department: 'Computer Science',
    status: 'Active',
    avatarColor: getAvatarColor('Department Head'),
    employeeId: 'UCC/STF/1045',
  },
  {
    id: 'USR-003',
    name: 'Akwasi Appiah',
    email: 'aappiah@ucc.edu.gh',
    role: 'Records Clerk',
    department: "Registrar's Office",
    status: 'Active',
    avatarColor: getAvatarColor('Records Clerk'),
    employeeId: 'UCC/STF/1130',
  },
  {
    id: 'USR-004',
    name: 'Abena Osei',
    email: 'aosei@ucc.edu.gh',
    role: 'Records Clerk',
    department: 'Directorate of Finance',
    status: 'Active',
    avatarColor: getAvatarColor('Records Clerk'),
    employeeId: 'UCC/STF/1184',
  },
  {
    id: 'USR-005',
    name: 'Kofi Annan',
    email: 'kannan@ucc.edu.gh',
    role: 'Viewer',
    department: "Registrar's Office",
    status: 'Active',
    avatarColor: getAvatarColor('Viewer'),
    employeeId: 'UCC/STF/1272',
  },
];

export default function Users() {
  const { user } = useAuth();
  const isDepartmentHead = user?.role === 'Department Head';
  const canCreateAccounts = user?.role === 'Super Admin' || isDepartmentHead;
  const canManageUsers = user?.role === 'Super Admin';
  const defaultDepartment = isDepartmentHead
    ? user?.department ?? DEPARTMENT_DIRECTORY[0]?.name ?? ''
    : DEPARTMENT_DIRECTORY[0]?.name ?? '';
  const getDefaultForm = (): UserFormState =>
    createEmptyUserForm(
      isDepartmentHead
        ? { role: 'Records Clerk', department: defaultDepartment }
        : { department: defaultDepartment }
    );
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('All Roles');
  const [showProvisionModal, setShowProvisionModal] = useState(false);
  const [usersData, setUsersData] = useState<DirectoryUser[]>(initialUsers);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [formData, setFormData] = useState<UserFormState>(getDefaultForm());

  const filteredUsers = usersData.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.employeeId.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRole = selectedRole === 'All Roles' || user.role === selectedRole;
    
    return matchesSearch && matchesRole;
  });

  const openCreateModal = () => {
    setEditingUserId(null);
    setFormData(getDefaultForm());
    setShowProvisionModal(true);
  };

  const openEditModal = (directoryUser: DirectoryUser) => {
    setEditingUserId(directoryUser.id);
    setFormData({
      name: directoryUser.name,
      email: directoryUser.email,
      role: directoryUser.role,
      department: directoryUser.department,
      status: directoryUser.status,
      employeeId: directoryUser.employeeId,
    });
    setShowProvisionModal(true);
  };

  const handleInputChange = (
    field: keyof UserFormState,
    value: UserFormState[keyof UserFormState]
  ) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSaveUser = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextRole = !editingUserId && isDepartmentHead ? 'Records Clerk' : formData.role;
    const nextDepartment = !editingUserId && isDepartmentHead ? defaultDepartment : formData.department;

    const nextUser: DirectoryUser = {
      id: editingUserId ?? `USR-${Date.now()}`,
      ...formData,
      role: nextRole,
      department: nextDepartment,
      avatarColor: getAvatarColor(nextRole),
    };

    setUsersData((current) =>
      editingUserId
        ? current.map((directoryUser) =>
            directoryUser.id === editingUserId ? nextUser : directoryUser
          )
        : [nextUser, ...current]
    );

    setShowProvisionModal(false);
    setEditingUserId(null);
    setFormData(getDefaultForm());
  };

  const handleRemoveUser = (userId: string) => {
    const targetUser = usersData.find((directoryUser) => directoryUser.id === userId);

    if (!targetUser) {
      return;
    }

    const shouldRemove = window.confirm(`Remove ${targetUser.name} from the user directory?`);

    if (!shouldRemove) {
      return;
    }

    setUsersData((current) => current.filter((directoryUser) => directoryUser.id !== userId));
  };

  return (
    <div className="workspace-page">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="animate-slide-up">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-1 rounded bg-ucc-blue/5 text-ucc-blue text-[10px] font-black uppercase tracking-widest border border-ucc-blue/10">Access Management</span>
            <span className="w-1.5 h-1.5 rounded-full bg-ucc-blue animate-pulse-soft"></span>
          </div>
          <h1 className="workspace-title">
            User <span className="text-ucc-blue">Directory</span>
          </h1>
          <p className="workspace-subtitle max-w-2xl">
            Manage staff accounts, access levels, and department permissions across the university.
          </p>
        </div>
        {canCreateAccounts && (
          <div className="flex gap-3 animate-slide-up" style={{ animationDelay: '100ms' }}>
            <button 
              onClick={openCreateModal}
              className="px-6 py-2.5 bg-ucc-blue hover:bg-black text-white rounded-2xl shadow-xl shadow-ucc-blue/20 transition-all hover:-translate-y-1 font-bold text-xs uppercase tracking-widest flex items-center gap-2"
            >
              <UserPlus size={16} /> {isDepartmentHead ? 'Create Clerk Account' : 'Create New Account'}
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-5 2xl:grid-cols-6 gap-6 xl:gap-7 2xl:gap-8">
        {/* Main Users Interface */}
        <div className="xl:col-span-4 2xl:col-span-5 space-y-4 animate-slide-up" style={{ animationDelay: '200ms' }}>
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
                  <option>All Roles</option>
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
                    <th className="px-6 py-5 font-black text-[10px] text-gray-400 uppercase tracking-widest">Role</th>
                    <th className="px-6 py-5 font-black text-[10px] text-gray-400 uppercase tracking-widest">Department</th>
                    <th className="px-6 py-5 font-black text-[10px] text-gray-400 uppercase tracking-widest">Account Status</th>
                    <th className="px-8 py-5 text-right font-black text-[10px] text-gray-400 uppercase tracking-widest">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredUsers.map((user) => (
                    <tr 
                      key={user.id}
                      className="hover:bg-white transition-all group/row"
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
                        {canManageUsers ? (
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => openEditModal(user)}
                              className="px-3 py-2 rounded-xl border border-gray-200 text-[10px] font-black uppercase tracking-widest text-ucc-blue hover:bg-ucc-blue/5 transition-all inline-flex items-center gap-2"
                            >
                              <PencilLine size={14} /> Edit
                            </button>
                            <button
                              onClick={() => handleRemoveUser(user.id)}
                              className="px-3 py-2 rounded-xl border border-red-100 bg-red-50 text-[10px] font-black uppercase tracking-widest text-red-700 hover:bg-red-100 transition-all inline-flex items-center gap-2"
                            >
                              <Trash2 size={14} /> Remove
                            </button>
                          </div>
                        ) : (
                          <span className="text-[10px] font-black uppercase tracking-widest text-gray-300">View Only</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="px-8 py-5 border-t border-gray-100 bg-gray-50/30 flex items-center justify-between">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Showing <span className="text-gray-900">{filteredUsers.length}</span> of <span className="text-ucc-blue">{usersData.length}</span> active faculty/staff</p>
              <div className="flex gap-2">
                <button disabled className="px-4 py-1.5 border border-gray-200 rounded-lg text-[10px] font-black text-gray-400 uppercase tracking-widest bg-gray-100/50 cursor-not-allowed">Previous Page</button>
                <button className="px-4 py-1.5 border border-gray-200 rounded-lg text-[10px] font-black text-gray-700 uppercase tracking-widest hover:bg-white hover:border-ucc-blue/20 transition-all">Next Page</button>
              </div>
            </div>
          </div>
        </div>

        {/* Roles Details Sidebar */}
        <div className="space-y-6 animate-slide-up xl:col-span-1" style={{ animationDelay: '300ms' }}>
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
        </div>
      </div>

      {/* Provisioning Modal Overlay */}
      {showProvisionModal && (
        <div className="modal-overlay animate-fade-in">
          <div className="modal-frame">
          <div className="modal-shell max-w-4xl animate-slide-up">
            {/* Modal Header */}
            <div className="modal-header bg-[#1a1a1a] text-white overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 -mr-32 -mt-32 bg-ucc-blue/30 rounded-full blur-3xl"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 rounded bg-white/10 text-white text-[9px] font-black uppercase tracking-widest backdrop-blur-md">Account Setup</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                </div>
                <h2 className="modal-title">
                  {editingUserId ? 'Edit' : isDepartmentHead ? 'Create Clerk' : 'Create New'} <span className="text-ucc-blue-light">Account</span>
                </h2>
                <p className="text-[11px] text-gray-300 mt-3 font-medium max-w-xl leading-relaxed">
                  Create or update an account and assign the correct role and department access.
                </p>
              </div>
              <button 
                onClick={() => {
                  setShowProvisionModal(false);
                  setEditingUserId(null);
                  setFormData(getDefaultForm());
                }}
                className="p-3 bg-white/10 hover:bg-white/20 rounded-2xl transition-all group relative z-10"
              >
                <X size={24} className="group-hover:rotate-90 transition-transform duration-500" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="modal-body">
              <form id="user-directory-form" className="space-y-10" onSubmit={handleSaveUser}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="md:col-span-2">
                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 ml-1">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="Enter full name..."
                      value={formData.name}
                      onChange={(event) => handleInputChange('name', event.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 px-6 focus:bg-white focus:border-ucc-blue/30 outline-none text-sm font-bold"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 ml-1">Email Address</label>
                    <input 
                      type="email" 
                      placeholder="username@ucc.edu.gh"
                      value={formData.email}
                      onChange={(event) => handleInputChange('email', event.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 px-6 focus:bg-white focus:border-ucc-blue/30 outline-none text-sm font-bold"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 ml-1">Assigned Department</label>
                    {isDepartmentHead && !editingUserId ? (
                      <input
                        type="text"
                        value={defaultDepartment}
                        readOnly
                        className="w-full bg-gray-100 border border-gray-200 rounded-2xl py-4 px-6 outline-none text-sm font-bold text-gray-500"
                      />
                    ) : (
                      <select
                        value={formData.department}
                        onChange={(event) => handleInputChange('department', event.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 px-6 focus:bg-white focus:border-ucc-blue/30 outline-none text-sm font-bold appearance-none cursor-pointer"
                      >
                        {DEPARTMENT_DIRECTORY.map(dept => (
                          <option key={dept.id} value={dept.name}>{formatDepartmentLabel(dept)}</option>
                        ))}
                      </select>
                    )}
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 ml-1">System Role & Permissions</label>
                    {isDepartmentHead && !editingUserId ? (
                      <input
                        type="text"
                        value="Records Clerk"
                        readOnly
                        className="w-full bg-gray-100 border border-gray-200 rounded-2xl py-4 px-6 outline-none text-sm font-bold text-gray-500"
                      />
                    ) : (
                      <select
                        value={formData.role}
                        onChange={(event) => handleInputChange('role', event.target.value as DirectoryRole)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 px-6 focus:bg-white focus:border-ucc-blue/30 outline-none text-sm font-bold appearance-none cursor-pointer"
                      >
                        <option value="Super Admin">Super Admin</option>
                        <option value="Department Head">Department Head</option>
                        <option value="Records Clerk">Records Clerk</option>
                        <option value="Viewer">Viewer</option>
                      </select>
                    )}
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 ml-1">Staff ID</label>
                    <input 
                      type="text" 
                      placeholder="e.g. UCC/STF/1234"
                      value={formData.employeeId}
                      onChange={(event) => handleInputChange('employeeId', event.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 px-6 focus:bg-white focus:border-ucc-blue/30 outline-none text-sm font-bold"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 ml-1">Account Status</label>
                    <select
                      value={formData.status}
                      onChange={(event) => handleInputChange('status', event.target.value as AccountStatus)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 px-6 focus:bg-white focus:border-ucc-blue/30 outline-none text-sm font-bold appearance-none cursor-pointer"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-6 pt-4">
                  <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.25em] flex items-center gap-3">
                    <Shield size={18} className="text-ucc-blue" /> Security Options
                  </h3>
                  <div className="p-6 bg-gray-50 border border-gray-100 rounded-[1.5rem] space-y-4">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-ucc-blue focus:ring-ucc-blue" />
                      <span className="text-[11px] font-bold text-gray-600 group-hover:text-gray-900 transition-colors">Enable multi-factor authentication for this account</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-ucc-blue focus:ring-ucc-blue" />
                      <span className="text-[11px] font-bold text-gray-600 group-hover:text-gray-900 transition-colors">Require a password reset on first sign in</span>
                    </label>
                  </div>
                </div>
              </form>
            </div>

            {/* Modal Footer */}
            <div className="modal-footer">
              <button 
                onClick={() => {
                  setShowProvisionModal(false);
                  setEditingUserId(null);
                  setFormData(getDefaultForm());
                }}
                className="px-8 py-3.5 border border-gray-200 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-gray-900 transition-all rounded-2xl"
              >
                Cancel
              </button>
              <button type="submit" form="user-directory-form" className="px-10 py-3.5 bg-[#1a1a1a] text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-ucc-blue shadow-xl shadow-black/20 transition-all">
                {editingUserId ? 'Save Changes' : isDepartmentHead ? 'Create Clerk Account' : 'Create Account'}
              </button>
            </div>
          </div>
          </div>
        </div>
      )}
    </div>
  );
}
