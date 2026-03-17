import { BellOff, Globe, Database, Settings } from 'lucide-react';

export default function OfflineMode() {
  return (
    <div className="space-y-6 animate-fade max-w-4xl mx-auto py-8">
      {/* Hero Section */}
      <div className="glass-card p-10 text-center border-t-8 border-t-amber-500 overflow-hidden relative">
        <div className="absolute top-0 right-0 p-8 opacity-5">
           <BellOff size={160} />
        </div>
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-20 h-20 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center shadow-lg mb-6 animate-slide-up">
            <BellOff size={40} className="animate-pulse" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight animate-slide-up bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600" style={{ animationDelay: '100ms' }}>
            Offline Mode is Active
          </h1>
          <p className="text-lg text-gray-600 mt-4 max-w-xl animate-slide-up" style={{ animationDelay: '150ms' }}>
            The system is disconnected from the main server. You are working with a local synced copy of documents.
          </p>
          <div className="mt-8 flex gap-4 animate-slide-up" style={{ animationDelay: '200ms' }}>
            <button className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl shadow-lg shadow-amber-500/30 transition-all hover:-translate-y-0.5 font-medium flex items-center">
              <Globe size={18} className="mr-2" /> Attempt Reconnect
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Status */}
        <div className="glass-card p-6 border-l-4 border-l-ucc-blue">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center">
            <Database size={16} className="text-ucc-blue mr-2" /> Local Storage Status
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Storage Used</span>
                <span className="text-gray-900 font-bold">4.2 GB / 5.0 GB</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className="bg-amber-500 h-2 rounded-full" style={{ width: '84%' }}></div>
              </div>
              <p className="text-xs text-amber-600 mt-2 font-medium">Warning: Local storage is nearly full. Please reconnect soon.</p>
            </div>
            
            <div className="pt-4 mt-4 border-t border-gray-100">
               <ul className="text-sm space-y-2 text-gray-600 pb-2">
                 <li className="flex justify-between"><span>Unsynced Documents:</span> <span className="font-bold text-gray-900">14</span></li>
                 <li className="flex justify-between"><span>Pending Approvals:</span> <span className="font-bold text-gray-900">3</span></li>
                 <li className="flex justify-between"><span>Last successful sync:</span> <span className="font-bold text-gray-900">Today, 08:30 AM</span></li>
               </ul>
            </div>
          </div>
        </div>

        {/* Limitations info */}
        <div className="glass-card p-6 relative overflow-hidden">
          {/* Decorative gear */}
          <div className="absolute -bottom-4 -right-4 text-gray-100">
            <Settings size={120} className="opacity-50" />
          </div>
          
          <div className="relative z-10">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">What works in offline mode?</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 mt-0.5 mr-3 flex-shrink-0">✓</span>
                <span className="text-sm text-gray-700">Viewing recently cached documents and PDF renders</span>
              </li>
              <li className="flex items-start">
                <span className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 mt-0.5 mr-3 flex-shrink-0">✓</span>
                <span className="text-sm text-gray-700">Drafting new documents (saved locally)</span>
              </li>
              <li className="flex items-start">
                <span className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 mt-0.5 mr-3 flex-shrink-0">✓</span>
                <span className="text-sm text-gray-700">Approving waiting requests (queued for sync)</span>
              </li>
              <li className="flex items-start opacity-60">
                <span className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center text-red-600 mt-0.5 mr-3 flex-shrink-0">×</span>
                <span className="text-sm text-gray-700 line-through">Accessing un-cached historical archives</span>
              </li>
              <li className="flex items-start opacity-60">
                <span className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center text-red-600 mt-0.5 mr-3 flex-shrink-0">×</span>
                <span className="text-sm text-gray-700 line-through">Sending external correspondence</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
