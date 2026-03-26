import { useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  Building2,
  CheckCircle2,
  GraduationCap,
  Landmark,
  Layers3,
  Network,
  Plus,
  Search,
  Upload,
  X,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import {
  TOTAL_ACADEMIC_DEPARTMENTS,
  TOTAL_ADMIN_UNITS,
  TOTAL_DIRECTORY_ENTRIES,
  TOTAL_FACULTIES_AND_SCHOOLS,
  UCC_ADMIN_STRUCTURE,
  UCC_COLLEGE_STRUCTURE,
} from '../constants/departments';

type StructureView = 'academic' | 'administrative';

type RegisterLayer =
  | 'College'
  | 'Faculty / School'
  | 'Academic Department'
  | 'Administrative Cluster'
  | 'Office / Directorate / Unit'
  | 'Section / Service';

interface SearchResult {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  view: StructureView;
  collegeId?: string;
  clusterId?: string;
  unitId?: string;
}

interface RegisterFormState {
  name: string;
  layer: RegisterLayer;
  parent: string;
  code: string;
  notes: string;
}

const STRUCTURE_LAYERS: RegisterLayer[] = [
  'College',
  'Faculty / School',
  'Academic Department',
  'Administrative Cluster',
  'Office / Directorate / Unit',
  'Section / Service',
];

const createEmptyRegisterForm = (): RegisterFormState => ({
  name: '',
  layer: 'Academic Department',
  parent: UCC_COLLEGE_STRUCTURE[0]?.name ?? '',
  code: '',
  notes: '',
});

export default function Departments() {
  const { user } = useAuth();
  const [activeView, setActiveView] = useState<StructureView>('academic');
  const [selectedCollegeId, setSelectedCollegeId] = useState(UCC_COLLEGE_STRUCTURE[0]?.id ?? '');
  const [selectedClusterId, setSelectedClusterId] = useState(UCC_ADMIN_STRUCTURE[0]?.id ?? '');
  const [selectedUnitId, setSelectedUnitId] = useState(UCC_ADMIN_STRUCTURE[0]?.units[0]?.id ?? '');
  const [searchQuery, setSearchQuery] = useState('');
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [recentDraftName, setRecentDraftName] = useState<string | null>(null);
  const [registerForm, setRegisterForm] = useState<RegisterFormState>(createEmptyRegisterForm());

  const selectedCollege =
    UCC_COLLEGE_STRUCTURE.find((college) => college.id === selectedCollegeId) ?? UCC_COLLEGE_STRUCTURE[0];
  const selectedCluster =
    UCC_ADMIN_STRUCTURE.find((cluster) => cluster.id === selectedClusterId) ?? UCC_ADMIN_STRUCTURE[0];
  const selectedUnit =
    selectedCluster?.units.find((unit) => unit.id === selectedUnitId) ?? selectedCluster?.units[0];

  const searchResults: SearchResult[] = [
    ...UCC_COLLEGE_STRUCTURE.flatMap((college) => [
      {
        id: `college-${college.id}`,
        title: college.name,
        subtitle: `College - ${college.code}`,
        description: `${college.faculties.length} faculties or schools - ${college.departments.length} departments`,
        view: 'academic' as const,
        collegeId: college.id,
      },
      ...college.faculties.map((faculty) => ({
        id: `faculty-${faculty.id}`,
        title: faculty.name,
        subtitle: `Faculty / School - ${college.code}`,
        description: college.name,
        view: 'academic' as const,
        collegeId: college.id,
      })),
      ...college.departments.map((department) => ({
        id: `department-${department.id}`,
        title: department.name,
        subtitle: `Academic Department - ${college.code}`,
        description: college.name,
        view: 'academic' as const,
        collegeId: college.id,
      })),
    ]),
    ...UCC_ADMIN_STRUCTURE.flatMap((cluster) => [
      {
        id: `cluster-${cluster.id}`,
        title: cluster.name,
        subtitle: 'Administrative Cluster',
        description: `${cluster.units.length} linked units`,
        view: 'administrative' as const,
        clusterId: cluster.id,
      },
      ...cluster.units.map((unit) => ({
        id: `unit-${unit.id}`,
        title: unit.name,
        subtitle: `${unit.kind} - ${cluster.name}`,
        description: unit.children?.length ? `${unit.children.length} sections or services` : 'Primary university unit',
        view: 'administrative' as const,
        clusterId: cluster.id,
        unitId: unit.id,
      })),
      ...cluster.units.flatMap((unit) =>
        (unit.children ?? []).map((child) => ({
          id: `child-${child.id}`,
          title: child.name,
          subtitle: `Section - ${unit.name}`,
          description: cluster.name,
          view: 'administrative' as const,
          clusterId: cluster.id,
          unitId: unit.id,
        }))
      ),
    ]),
  ].filter((entry) => {
    if (!searchQuery.trim()) {
      return false;
    }

    const query = searchQuery.toLowerCase();
    return [entry.title, entry.subtitle, entry.description].some((value) =>
      value.toLowerCase().includes(query)
    );
  });

  const registerParentOptions = [
    ...UCC_COLLEGE_STRUCTURE.map((college) => college.name),
    ...UCC_COLLEGE_STRUCTURE.flatMap((college) =>
      college.faculties.map((faculty) => `${faculty.name} (${college.code})`)
    ),
    ...UCC_ADMIN_STRUCTURE.map((cluster) => cluster.name),
    ...UCC_ADMIN_STRUCTURE.flatMap((cluster) =>
      cluster.units.map((unit) => `${unit.name} (${cluster.name})`)
    ),
  ];

  const closeRegisterModal = () => {
    setShowRegisterModal(false);
    setRegisterForm(createEmptyRegisterForm());
  };

  const handleClusterChange = (clusterId: string) => {
    setSelectedClusterId(clusterId);
    const cluster =
      UCC_ADMIN_STRUCTURE.find((entry) => entry.id === clusterId) ?? UCC_ADMIN_STRUCTURE[0];
    setSelectedUnitId(cluster?.units[0]?.id ?? '');
  };

  const handleSearchSelection = (result: SearchResult) => {
    setActiveView(result.view);
    setSearchQuery('');

    if (result.collegeId) {
      setSelectedCollegeId(result.collegeId);
    }

    if (result.clusterId) {
      setSelectedClusterId(result.clusterId);
      const cluster =
        UCC_ADMIN_STRUCTURE.find((entry) => entry.id === result.clusterId) ?? UCC_ADMIN_STRUCTURE[0];
      setSelectedUnitId(result.unitId ?? cluster?.units[0]?.id ?? '');
    }
  };

  const handleRegisterInputChange = (
    field: keyof RegisterFormState,
    value: RegisterFormState[keyof RegisterFormState]
  ) => {
    setRegisterForm((current) => ({ ...current, [field]: value }));
  };

  const handleRegisterSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setRecentDraftName(registerForm.name);
    closeRegisterModal();
  };

  return (
    <div className="workspace-page">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="animate-slide-up">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-1 rounded bg-ucc-blue/5 text-ucc-blue text-[10px] font-black uppercase tracking-widest border border-ucc-blue/10">
              UCC Structure Registry
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-ucc-blue animate-pulse-soft"></span>
          </div>
          <h1 className="workspace-title">
            UCC <span className="text-ucc-blue">Structure Directory</span>
          </h1>
          <p className="workspace-subtitle max-w-3xl">
            Explore the exact UCC hierarchy across colleges, faculties, departments, offices,
            directorates, units, and DICTS sections.
          </p>
          <p className="text-[10px] text-gray-400 mt-3 font-black uppercase tracking-[0.2em]">
            Connected registry map: {TOTAL_DIRECTORY_ENTRIES} academic and administrative entries
          </p>
        </div>

        {user?.role !== 'Viewer' && (
          <button
            onClick={() => setShowRegisterModal(true)}
            className="px-6 py-2.5 bg-ucc-blue hover:bg-black text-white rounded-2xl shadow-xl shadow-ucc-blue/20 transition-all hover:-translate-y-1 font-bold text-xs uppercase tracking-widest flex items-center gap-2 animate-slide-up"
            style={{ animationDelay: '100ms' }}
          >
            <Plus size={16} /> Register New Department
          </button>
        )}
      </div>

      {recentDraftName && (
        <div className="glass-panel p-5 border border-green-100 bg-green-50/70 animate-slide-up">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-green-100 text-green-700 flex items-center justify-center">
              <CheckCircle2 size={22} />
            </div>
            <div>
              <p className="text-[10px] font-black text-green-700 uppercase tracking-[0.2em]">
                Draft Saved
              </p>
              <p className="text-sm text-gray-700 font-medium mt-1">
                <span className="font-black text-gray-900">{recentDraftName}</span> has been saved
                as a new structure draft.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 xl:gap-6 2xl:gap-7 animate-slide-up" style={{ animationDelay: '150ms' }}>
        {[
          { label: 'Colleges', count: UCC_COLLEGE_STRUCTURE.length, icon: GraduationCap, color: 'text-ucc-blue', bg: 'bg-ucc-blue/5' },
          { label: 'Faculties & Schools', count: TOTAL_FACULTIES_AND_SCHOOLS, icon: BookOpen, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Academic Departments', count: TOTAL_ACADEMIC_DEPARTMENTS, icon: Layers3, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Administrative Units', count: TOTAL_ADMIN_UNITS, icon: Network, color: 'text-red-600', bg: 'bg-red-50' },
        ].map((stat) => (
          <div key={stat.label} className="glass-card p-5 group hover:scale-[1.02] transition-all">
            <div className="flex items-center gap-4">
              <div
                className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-500`}
              >
                <stat.icon size={22} />
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  {stat.label}
                </p>
                <p className="text-2xl font-black text-gray-900 tracking-tight">{stat.count}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="glass-panel p-4 sm:p-6 animate-slide-up" style={{ animationDelay: '200ms' }}>
        <div className="flex flex-col xl:flex-row gap-4 xl:items-center xl:justify-between">
          <div className="relative flex-1 max-w-3xl group/search">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within/search:text-ucc-blue transition-colors"
              size={18}
            />
            <input
              type="text"
              placeholder="Search colleges, faculties, departments, directorates, or DICTS sections..."
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="w-full bg-white/70 border border-gray-200/70 rounded-2xl py-3 pl-12 pr-4 focus:bg-white focus:border-ucc-blue/30 focus:ring-4 focus:ring-ucc-blue/5 transition-all outline-none text-sm font-medium"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setActiveView('academic')}
              className={`px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                activeView === 'academic'
                  ? 'bg-ucc-blue text-white shadow-lg shadow-ucc-blue/20'
                  : 'bg-white border border-gray-200 text-gray-500 hover:border-ucc-blue/20 hover:text-ucc-blue'
              }`}
            >
              <GraduationCap size={16} /> Academic Structure
            </button>
            <button
              onClick={() => setActiveView('administrative')}
              className={`px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                activeView === 'administrative'
                  ? 'bg-[#1a1a1a] text-white shadow-lg shadow-black/20'
                  : 'bg-white border border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-900'
              }`}
            >
              <Building2 size={16} /> Administrative Structure
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[360px,minmax(0,1fr)] 2xl:grid-cols-[400px,minmax(0,1fr)] gap-6 xl:gap-8">
        <div className="glass-panel p-6 space-y-6 animate-slide-up" style={{ animationDelay: '250ms' }}>
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
              {activeView === 'academic' ? 'Colleges In UCC' : 'Administrative Divisions'}
            </p>
            <h2 className="text-2xl font-black text-gray-900 tracking-tight mt-2">
              {activeView === 'academic' ? 'Academic Hierarchy' : 'Administrative Hierarchy'}
            </h2>
            <p className="text-sm text-gray-500 mt-2 leading-relaxed">
              {activeView === 'academic'
                ? 'Select a college to inspect its faculties, schools, and department register.'
                : 'Select a support division to inspect its core units and linked operational sections.'}
            </p>
          </div>

          {searchQuery.trim() && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                  Search Results
                </p>
                <span className="text-[10px] font-black text-ucc-blue uppercase tracking-widest">
                  {searchResults.length} matches
                </span>
              </div>
              <div className="space-y-2 max-h-[340px] overflow-y-auto pr-1 custom-scrollbar">
                {searchResults.length > 0 ? (
                  searchResults.map((result) => (
                    <button
                      key={result.id}
                      onClick={() => handleSearchSelection(result)}
                      className="w-full text-left p-4 rounded-2xl border border-gray-100 bg-gray-50/70 hover:bg-white hover:border-ucc-blue/20 transition-all"
                    >
                      <p className="text-xs font-black text-gray-900 tracking-tight">{result.title}</p>
                      <p className="text-[10px] text-ucc-blue font-black uppercase tracking-widest mt-1">
                        {result.subtitle}
                      </p>
                      <p className="text-[11px] text-gray-500 font-medium mt-2 leading-relaxed">
                        {result.description}
                      </p>
                    </button>
                  ))
                ) : (
                  <div className="p-4 rounded-2xl border border-dashed border-gray-200 bg-gray-50 text-sm text-gray-500 font-medium">
                    No structure entries match your search yet.
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="space-y-3">
            {activeView === 'academic' &&
              UCC_COLLEGE_STRUCTURE.map((college) => {
                const isActive = college.id === selectedCollege?.id;
                return (
                  <button
                    key={college.id}
                    onClick={() => setSelectedCollegeId(college.id)}
                    className={`w-full p-4 rounded-2xl text-left border transition-all ${
                      isActive
                        ? 'border-ucc-blue/20 bg-ucc-blue/5 shadow-sm'
                        : 'border-gray-100 bg-white hover:border-gray-200 hover:bg-gray-50/70'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-black text-gray-900 tracking-tight">{college.name}</p>
                        <p className="text-[10px] text-gray-400 mt-1 font-black uppercase tracking-widest">
                          {college.code} - {college.faculties.length} faculties or schools
                        </p>
                      </div>
                      <ArrowRight size={16} className={isActive ? 'text-ucc-blue' : 'text-gray-300'} />
                    </div>
                  </button>
                );
              })}

            {activeView === 'administrative' &&
              UCC_ADMIN_STRUCTURE.map((cluster) => {
                const isActive = cluster.id === selectedCluster?.id;
                return (
                  <button
                    key={cluster.id}
                    onClick={() => handleClusterChange(cluster.id)}
                    className={`w-full p-4 rounded-2xl text-left border transition-all ${
                      isActive
                        ? 'border-ucc-blue/20 bg-ucc-blue/5 shadow-sm'
                        : 'border-gray-100 bg-white hover:border-gray-200 hover:bg-gray-50/70'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-black text-gray-900 tracking-tight">{cluster.name}</p>
                        <p className="text-[10px] text-gray-400 mt-1 font-black uppercase tracking-widest">
                          {cluster.units.length} linked units
                        </p>
                      </div>
                      <ArrowRight size={16} className={isActive ? 'text-ucc-blue' : 'text-gray-300'} />
                    </div>
                  </button>
                );
              })}
          </div>
        </div>

        <div className="space-y-6 animate-slide-up" style={{ animationDelay: '300ms' }}>
          {activeView === 'academic' && selectedCollege && (
            <>
              <div className="glass-panel p-8 bg-gradient-to-br from-ucc-blue to-ucc-blue-dark text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-72 h-72 -mr-28 -mt-28 bg-white/10 rounded-full blur-3xl"></div>
                <div className="relative z-10">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="px-3 py-1 rounded-full bg-white/15 text-white text-[10px] font-black uppercase tracking-widest">
                      {selectedCollege.code}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-white/10 text-white text-[10px] font-black uppercase tracking-widest">
                      {selectedCollege.faculties.length} faculties or schools
                    </span>
                    <span className="px-3 py-1 rounded-full bg-white/10 text-white text-[10px] font-black uppercase tracking-widest">
                      {selectedCollege.departments.length} departments
                    </span>
                  </div>
                  <h2 className="text-3xl font-black tracking-tight max-w-3xl">{selectedCollege.name}</h2>
                  <p className="text-sm text-blue-50 mt-4 max-w-3xl leading-relaxed font-medium">
                    {selectedCollege.overview}
                  </p>
                </div>
              </div>

              <div className="glass-panel p-8">
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                      Faculties / Schools
                    </p>
                    <h3 className="text-2xl font-black text-gray-900 tracking-tight mt-2">
                      Teaching And Leadership Structure
                    </h3>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-ucc-blue/5 text-ucc-blue flex items-center justify-center">
                    <BookOpen size={22} />
                  </div>
                </div>
                {selectedCollege.faculties.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4">
                    {selectedCollege.faculties.map((faculty, index) => (
                      <div
                        key={faculty.id}
                        className="p-5 rounded-3xl border border-gray-100 bg-gray-50/60 hover:bg-white hover:border-ucc-blue/20 transition-all"
                      >
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                          Structure Node {String(index + 1).padStart(2, '0')}
                        </p>
                        <p className="text-base font-black text-gray-900 tracking-tight mt-3">
                          {faculty.name}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 rounded-3xl border border-dashed border-gray-200 bg-gray-50">
                    <p className="text-sm text-gray-500 font-medium leading-relaxed">
                      This school is programme-based and does not maintain a faculty list.
                    </p>
                  </div>
                )}
              </div>

              <div className="glass-panel p-8">
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                      Department Register
                    </p>
                    <h3 className="text-2xl font-black text-gray-900 tracking-tight mt-2">
                      Departments Under This College
                    </h3>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                    <Layers3 size={22} />
                  </div>
                </div>
                {selectedCollege.departments.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4">
                    {selectedCollege.departments.map((department) => (
                      <div
                        key={department.id}
                        className="p-5 rounded-3xl border border-gray-100 bg-white hover:border-ucc-blue/20 hover:shadow-sm transition-all"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-[10px] font-black text-ucc-blue uppercase tracking-widest">
                              Academic Department
                            </p>
                            <p className="text-base font-black text-gray-900 tracking-tight mt-3">
                              {department.name}
                            </p>
                          </div>
                          <ArrowRight size={18} className="text-gray-300" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 rounded-3xl border border-dashed border-gray-200 bg-gray-50">
                    <p className="text-sm text-gray-500 font-medium leading-relaxed">
                      This school coordinates programmes across the university and does not maintain
                      a separate department list.
                    </p>
                  </div>
                )}
              </div>

              {selectedCollege.note && (
                <div className="glass-panel p-8 border border-ucc-blue/10 bg-ucc-blue/5">
                  <p className="text-[10px] font-black text-ucc-blue uppercase tracking-[0.2em]">
                    Registry Note
                  </p>
                  <p className="text-sm text-gray-700 font-medium mt-3 leading-relaxed">
                    {selectedCollege.note}
                  </p>
                </div>
              )}
            </>
          )}

          {activeView === 'administrative' && selectedCluster && (
            <>
              <div className="glass-panel p-8 bg-[#1a1a1a] text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-72 h-72 -mr-24 -mt-24 bg-ucc-blue/20 rounded-full blur-3xl"></div>
                <div className="relative z-10">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="px-3 py-1 rounded-full bg-white/10 text-white text-[10px] font-black uppercase tracking-widest">
                      Administrative Cluster
                    </span>
                    <span className="px-3 py-1 rounded-full bg-white/10 text-white text-[10px] font-black uppercase tracking-widest">
                      {selectedCluster.units.length} primary units
                    </span>
                    <span className="px-3 py-1 rounded-full bg-white/10 text-white text-[10px] font-black uppercase tracking-widest">
                      {selectedCluster.units.reduce(
                        (total, unit) => total + (unit.children?.length ?? 0),
                        0
                      )} linked sections
                    </span>
                  </div>
                  <h2 className="text-3xl font-black tracking-tight max-w-3xl">{selectedCluster.name}</h2>
                  <p className="text-sm text-gray-300 mt-4 max-w-3xl leading-relaxed font-medium">
                    {selectedCluster.overview}
                  </p>
                </div>
              </div>

              <div className="glass-panel p-8">
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                      Core Units
                    </p>
                    <h3 className="text-2xl font-black text-gray-900 tracking-tight mt-2">
                      Offices, Directorates, Units, And Services
                    </h3>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-gray-100 text-gray-700 flex items-center justify-center">
                    <Landmark size={22} />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedCluster.units.map((unit) => {
                    const isSelected = unit.id === selectedUnit?.id;
                    return (
                      <button
                        key={unit.id}
                        onClick={() => setSelectedUnitId(unit.id)}
                        className={`p-5 rounded-3xl border text-left transition-all ${
                          isSelected
                            ? 'border-ucc-blue/20 bg-ucc-blue/5 shadow-sm'
                            : 'border-gray-100 bg-white hover:border-gray-200 hover:bg-gray-50/70'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                              {unit.kind}
                            </p>
                            <p className="text-base font-black text-gray-900 tracking-tight mt-3">
                              {unit.name}
                            </p>
                            <p className="text-[11px] text-gray-500 font-medium mt-3">
                              {unit.children?.length
                                ? `${unit.children.length} connected sections`
                                : 'Standalone unit within this division'}
                            </p>
                          </div>
                          <ArrowRight size={18} className={isSelected ? 'text-ucc-blue' : 'text-gray-300'} />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="glass-panel p-8">
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                      Linked Sub-Structure
                    </p>
                    <h3 className="text-2xl font-black text-gray-900 tracking-tight mt-2">
                      {selectedUnit?.name ?? 'Selected Unit'}
                    </h3>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center">
                    <Network size={22} />
                  </div>
                </div>
                {selectedUnit?.children?.length ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4">
                    {selectedUnit.children.map((child) => (
                      <div
                        key={child.id}
                        className="p-5 rounded-3xl border border-gray-100 bg-gray-50/60 hover:bg-white hover:border-ucc-blue/20 transition-all"
                      >
                        <p className="text-[10px] font-black text-ucc-blue uppercase tracking-widest">
                          Section / Service
                        </p>
                        <p className="text-base font-black text-gray-900 tracking-tight mt-3">
                          {child.name}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 rounded-3xl border border-dashed border-gray-200 bg-gray-50">
                    <p className="text-sm text-gray-500 font-medium leading-relaxed">
                      This unit has no subordinate sections in the current university structure map.
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {showRegisterModal && (
        <div className="modal-overlay animate-fade-in">
          <div className="modal-frame">
          <div className="modal-shell max-w-4xl animate-slide-up">
            <div className="modal-header bg-gradient-to-r from-ucc-blue to-ucc-blue-dark text-white overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 -mr-28 -mt-28 bg-white/10 rounded-full blur-3xl"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 rounded bg-white/20 text-white text-[9px] font-black uppercase tracking-widest backdrop-blur-md">
                    Structure Setup
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-ucc-gold animate-pulse"></span>
                </div>
                <h2 className="modal-title">
                  Register New <span className="text-ucc-gold">Department</span>
                </h2>
                <p className="text-[11px] text-blue-100 mt-3 font-medium max-w-xl leading-relaxed">
                  Add a new department, office, unit, or section to the university structure map.
                </p>
              </div>
              <button
                onClick={closeRegisterModal}
                className="p-3 bg-white/10 hover:bg-white/20 rounded-2xl transition-all group relative z-10"
              >
                <X size={24} className="group-hover:rotate-90 transition-transform duration-500" />
              </button>
            </div>

            <div className="modal-body">
              <form id="department-register-form" className="space-y-10" onSubmit={handleRegisterSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="md:col-span-2">
                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 ml-1">
                      Department / Unit Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter the official UCC structure name..."
                      value={registerForm.name}
                      onChange={(event) => handleRegisterInputChange('name', event.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 px-6 focus:bg-white focus:border-ucc-blue/30 outline-none text-sm font-bold"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 ml-1">
                      Structure Level
                    </label>
                    <select
                      value={registerForm.layer}
                      onChange={(event) =>
                        handleRegisterInputChange('layer', event.target.value as RegisterLayer)
                      }
                      className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 px-6 focus:bg-white focus:border-ucc-blue/30 outline-none text-sm font-bold appearance-none cursor-pointer"
                    >
                      {STRUCTURE_LAYERS.map((layer) => (
                        <option key={layer} value={layer}>
                          {layer}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 ml-1">
                      Parent Unit / Group
                    </label>
                    <select
                      value={registerForm.parent}
                      onChange={(event) => handleRegisterInputChange('parent', event.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 px-6 focus:bg-white focus:border-ucc-blue/30 outline-none text-sm font-bold appearance-none cursor-pointer"
                    >
                      {registerParentOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 ml-1">
                      Reference Code
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. CHLS-ENG or ADMIN-DICTS-WEB"
                      value={registerForm.code}
                      onChange={(event) => handleRegisterInputChange('code', event.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 px-6 focus:bg-white focus:border-ucc-blue/30 outline-none text-sm font-bold"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 ml-1">
                      Notes
                    </label>
                    <textarea
                      rows={5}
                      placeholder="Capture reporting line, restructuring instruction, or operational note..."
                      value={registerForm.notes}
                      onChange={(event) => handleRegisterInputChange('notes', event.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-[1.5rem] py-4 px-6 focus:bg-white focus:border-ucc-blue/30 outline-none text-sm font-medium resize-none"
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.25em] flex items-center gap-3">
                    <Upload size={18} className="text-ucc-blue" /> Supporting Files
                  </h3>
                  <div className="p-10 border-2 border-dashed border-gray-200 rounded-[2rem] bg-gray-50/60 flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 rounded-[1.5rem] bg-white shadow-lg flex items-center justify-center text-ucc-blue mb-4">
                      <Upload size={28} />
                    </div>
                    <p className="text-base font-black text-gray-900 tracking-tight">
                      Upload approval notes or structure memos
                    </p>
                    <p className="text-sm text-gray-500 mt-2 font-medium">
                      Add approval letters, change directives, or other supporting files for this draft.
                    </p>
                  </div>
                </div>
              </form>
            </div>

            <div className="modal-footer">
              <button
                onClick={closeRegisterModal}
                className="px-8 py-3.5 border border-gray-200 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-gray-900 transition-all rounded-2xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                form="department-register-form"
                className="px-10 py-3.5 bg-ucc-blue text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-black shadow-xl shadow-ucc-blue/20 transition-all"
              >
                Save Draft
              </button>
            </div>
          </div>
          </div>
        </div>
      )}
    </div>
  );
}
