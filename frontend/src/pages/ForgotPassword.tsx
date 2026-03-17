import { useState } from 'react';
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <div className="w-full max-w-md animate-fade">
        <div className="glass-panel p-8 text-center">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-100/50">
            <CheckCircle2 size={40} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Check your email</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            We've sent a password reset link to <br/>
            <span className="font-bold text-gray-900">{email}</span>
          </p>
          <Link 
            to="/login" 
            className="inline-flex items-center text-sm font-bold text-ucc-blue hover:underline"
          >
            <ArrowLeft size={16} className="mr-2" /> Back to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md animate-fade">
      <div className="glass-panel p-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Forgot Password?</h2>
          <p className="text-gray-500 mt-3 text-sm">
            Enter your email and we'll send you a link to reset your password.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-bold text-gray-700 ml-1">
              Email Address
            </label>
            <div className="relative group">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400 group-focus-within:text-ucc-blue transition-colors">
                <Mail size={18} />
              </span>
              <input 
                id="email"
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. jdoe@ucc.edu.gh"
                className="w-full pl-11 pr-4 py-3 bg-white/50 border border-gray-200 rounded-xl outline-none focus:ring-4 focus:ring-ucc-blue/10 focus:border-ucc-blue transition-all"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full py-3.5 bg-ucc-blue text-white rounded-xl shadow-xl shadow-ucc-blue/30 hover:bg-ucc-blue/90 font-bold transition-all disabled:opacity-70 disabled:cursor-not-allowed transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              "Send Reset Link"
            )}
          </button>
        </form>

        <div className="mt-8 text-center pt-8 border-t border-gray-100">
          <Link 
            to="/login" 
            className="inline-flex items-center text-sm font-bold text-gray-400 hover:text-ucc-blue transition-colors"
          >
            <ArrowLeft size={16} className="mr-2" /> Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
