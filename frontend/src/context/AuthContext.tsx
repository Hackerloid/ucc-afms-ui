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
  login: (role: UserRole) => void;
  logout: () => void;
  isAuthenticated: boolean;
  hasPermission: (permission: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('dms_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (role: UserRole) => {
    // Mock user generation based on role
    const mockUser: User = {
      name: role === 'Super Admin' ? 'Dr. Regina Gyampoh-Vidogah' : 
            role === 'Department Head' ? 'Prof. David Teye Doku' :
            role === 'Records Clerk' ? 'Akwasi Appiah' : 'Kofi Annan',
      email: role === 'Super Admin' ? 'rgyampoh@ucc.edu.gh' : 
             role === 'Department Head' ? 'ddoku@ucc.edu.gh' :
             role === 'Records Clerk' ? 'aappiah@ucc.edu.gh' : 'kannan@ucc.edu.gh',
      role,
      department: role === 'Super Admin' ? 'Directorate of ICT Services (DICTS)' : 
                  role === 'Department Head' ? 'Directorate of Research, Innovation and Consultancy (DRIC)' :
                  role === 'Records Clerk' ? 'Records Office' : 'General Administration Division',
    };
    
    setUser(mockUser);
    localStorage.setItem('dms_user', JSON.stringify(mockUser));
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
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, hasPermission }}>
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
