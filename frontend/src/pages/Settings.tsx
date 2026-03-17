import { Settings as SettingsIcon, Shield, Bell, Palette, Database, Save } from 'lucide-react';

export default function Settings() {
  return (
    <div className="space-y-6 animate-fade max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">System Settings</h1>
          <p className="text-sm text-gray-500 mt-1">Configure application preferences and global parameters.</p>
        </div>
        <button className="px-5 py-2.5 bg-ucc-blue hover:bg-ucc-blue/90 text-white rounded-xl shadow-lg shadow-ucc-blue/20 transition-all hover:-translate-y-0.5 font-medium text-sm flex items-center">
          <Save size={18} className="mr-2" /> Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <div className="md:col-span-1">
          <nav className="flex md:flex-col gap-2 overflow-x-auto pb-2 md:pb-0">
            <button className="flex items-center gap-3 px-4 py-3 bg-white text-ucc-blue shadow-sm border border-ucc-blue/20 rounded-xl font-medium text-sm w-full transition-all">
              <SettingsIcon size={18} /> General
            </button>
            <button className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-white/60 hover:text-gray-900 rounded-xl font-medium text-sm w-full transition-all whitespace-nowrap">
              <Shield size={18} /> Security & Access
            </button>
            <button className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-white/60 hover:text-gray-900 rounded-xl font-medium text-sm w-full transition-all whitespace-nowrap">
              <Bell size={18} /> Notifications
            </button>
            <button className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-white/60 hover:text-gray-900 rounded-xl font-medium text-sm w-full transition-all whitespace-nowrap">
              <Palette size={18} /> Branding
            </button>
            <button className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-white/60 hover:text-gray-900 rounded-xl font-medium text-sm w-full transition-all whitespace-nowrap">
              <Database size={18} /> Backup
            </button>
          </nav>
        </div>

        {/* Settings Form */}
        <div className="md:col-span-3 space-y-6">
          <div className="glass-card p-6 md:p-8">
            <h2 className="text-lg font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100 flex items-center">
              <SettingsIcon size={20} className="mr-2 text-ucc-blue" /> General Configuration
            </h2>
            
            <div className="space-y-6 max-w-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">System Name</label>
                  <input 
                    type="text" 
                    defaultValue="UCC DMS" 
                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-lg focus:ring-2 focus:ring-ucc-blue/30 focus:border-ucc-blue block p-2.5 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">System Version</label>
                  <input 
                    type="text" 
                    defaultValue="2.4.1" 
                    disabled 
                    className="w-full bg-gray-100 border border-gray-200 text-gray-500 rounded-lg p-2.5 cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Organization Name</label>
                <input 
                  type="text" 
                  defaultValue="University of Cape Coast" 
                  className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-lg focus:ring-2 focus:ring-ucc-blue/30 focus:border-ucc-blue block p-2.5 outline-none transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Contact Email</label>
                <input 
                  type="email" 
                  defaultValue="support@ucc.edu.gh" 
                  className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-lg focus:ring-2 focus:ring-ucc-blue/30 focus:border-ucc-blue block p-2.5 outline-none transition-all"
                />
              </div>

              <div className="pt-4 mt-6 border-t border-gray-100">
                <h3 className="text-sm font-bold text-gray-900 mb-4">Localization</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Date Format</label>
                    <select className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-lg focus:ring-2 focus:ring-ucc-blue/30 outline-none p-2.5">
                      <option>DD/MM/YYYY</option>
                      <option>MM/DD/YYYY</option>
                      <option>YYYY-MM-DD</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Timezone</label>
                    <select className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-lg focus:ring-2 focus:ring-ucc-blue/30 outline-none p-2.5">
                      <option>GMT (UTC+0)</option>
                      <option>CET (UTC+1)</option>
                      <option>EST (UTC-5)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
