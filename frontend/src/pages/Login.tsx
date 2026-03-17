import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FileText, Lock, Mail, Eye, EyeOff } from 'lucide-react';
import { useAuth, type UserRole } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simple role determination based on email for the demo
    // In a real app, this would be returned by the auth API
    const determinedRole: UserRole = email.includes('admin') ? 'Super Admin' : 
                                   email.includes('head') ? 'Department Head' : 
                                   email.includes('view') ? 'Viewer' : 'Records Clerk';

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      login(determinedRole);
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="w-full glass-panel p-8 md:p-10 animate-fade shadow-2xl relative overflow-hidden">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-ucc-blue via-ucc-red to-ucc-gold"></div>
      
      <div className="flex flex-col items-center justify-center space-y-4 mb-8">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-ucc-blue to-ucc-blue/80 flex items-center justify-center text-white shadow-lg animate-slide-up">
          <FileText size={32} />
        </div>
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight animate-slide-up" style={{ animationDelay: '100ms' }}>UCC DMS</h1>
          <p className="text-sm text-gray-500 mt-1 animate-slide-up" style={{ animationDelay: '150ms' }}>Document Management System</p>
        </div>
      </div>

      <form onSubmit={handleLogin} className="space-y-6">
        <div className="space-y-4">
          <div className="relative animate-slide-up" style={{ animationDelay: '200ms' }}>
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2 block">Email Address</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <Mail size={18} />
              </span>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-50/50 border border-gray-200 text-gray-900 rounded-xl focus:ring-2 focus:ring-ucc-blue focus:border-ucc-blue block pl-10 p-3 transition-colors"
                placeholder="admin@ucc.edu.gh"
              />
            </div>
          </div>

          <div className="relative animate-slide-up" style={{ animationDelay: '250ms' }}>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Password</label>
              <Link to="/forgot-password" className="text-xs font-medium text-ucc-blue hover:text-ucc-blue/80 transition-colors">Forgot password?</Link>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <Lock size={18} />
              </span>
              <input 
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-50/50 border border-gray-200 text-gray-900 rounded-xl focus:ring-2 focus:ring-ucc-blue focus:border-ucc-blue block pl-10 pr-10 p-3 transition-colors"
                placeholder="••••••••"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-ucc-blue transition-colors focus:outline-none"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full text-white bg-ucc-blue hover:bg-ucc-blue/90 focus:ring-4 focus:ring-ucc-blue/30 font-medium rounded-xl text-sm px-5 py-3.5 text-center transition-all duration-300 shadow-lg shadow-ucc-blue/20 hover:shadow-ucc-blue/40 hover:-translate-y-0.5 flex items-center justify-center gap-2 animate-slide-up"
          style={{ animationDelay: '300ms' }}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white px-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              Signing in...
            </>
          ) : (
            'Sign in to your account'
          )}
        </button>
      </form>

      <div className="mt-8 pt-6 border-t border-gray-100 text-center animate-slide-up" style={{ animationDelay: '400ms' }}>
        <p className="text-xs text-gray-500">
          By signing in, you agree to the <a href="#" className="font-medium text-ucc-blue hover:underline">Terms of Service</a> and <a href="#" className="font-medium text-ucc-blue hover:underline">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
}
