import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'Super Admin' | 'Department Head' | 'Records Clerk' | 'Viewer';

interface User {
  name: string;
  email: string;
  role: UserRole;
  department: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
  hasPermission: (permission: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('dms_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (email: string, password: string): boolean => {
    // Hardcoded test users
    const testUsers: Record<string, { password: string, name: string, role: UserRole, department: string }> = {
      'admin@ucc.edu.gh': { password: 'uccAdmin2025', name: 'Dr. Regina Gyampoh-Vidogah', role: 'Super Admin', department: 'Directorate of Information & Communication Technology Services (DICTS)' },
      'head@ucc.edu.gh': { password: 'uccHead2025', name: 'Prof. David Teye Doku', role: 'Department Head', department: 'Directorate of Research, Innovation & Consultancy (DRIC)' },
      'clerk@ucc.edu.gh': { password: 'uccClerk2025', name: 'Akwasi Appiah', role: 'Records Clerk', department: "Registrar's Office" },
      'viewer@ucc.edu.gh': { password: 'uccView2025', name: 'Kofi Annan', role: 'Viewer', department: 'Finance Office' },
    };

    const foundUser = testUsers[email];
    if (foundUser && foundUser.password === password) {
      const authUser: User = {
        name: foundUser.name,
        email: email,
        role: foundUser.role,
        department: foundUser.department,
      };
      setUser(authUser);
      localStorage.setItem('dms_user', JSON.stringify(authUser));
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('dms_user');
  };

  const hasPermission = (feature: string): boolean => {
    if (!user) return false;
    
    const permissions: Record<UserRole, string[]> = {
      'Super Admin': ['dashboard', 'documents', 'workflows', 'reports', 'users', 'departments', 'correspondence', 'templates', 'settings', 'offline'],
      'Department Head': ['dashboard', 'documents', 'workflows', 'reports', 'users', 'correspondence', 'templates', 'settings', 'offline'],
      'Records Clerk': ['dashboard', 'documents', 'workflows', 'correspondence', 'settings', 'offline'],
      'Viewer': ['dashboard', 'documents', 'settings', 'offline'],
    };

    return permissions[user.role].includes(feature);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, loading, hasPermission }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
