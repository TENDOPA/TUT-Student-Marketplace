import React, { createContext, useContext, useState, useEffect } from 'react';

// Demo/mock authentication for the JGA prototype. This intentionally does
// NOT call any real backend — it stores a fake session in localStorage so
// the dashboard/profile/messages pages have something to render, without
// making the public landing page or marketplace depend on it in any way.
const AuthContext = createContext(null);
const STORAGE_KEY = 'edutrade_demo_user';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {
      // corrupted/blocked storage should never crash the app
    }
    setReady(true);
  }, []);

  function login({ email, role = 'student' }) {
    const demoUser = {
      name: email.split('@')[0].replace(/[._]/g, ' ') || 'TUT Student',
      email,
      role,
      verified: /@tut4life\.ac\.za$|@tut\.ac\.za$/i.test(email),
    };
    setUser(demoUser);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(demoUser)); } catch { /* ignore */ }
    return demoUser;
  }

  function register(details) {
    return login(details);
  }

  function logout() {
    setUser(null);
    try { localStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
  }

  return (
    <AuthContext.Provider value={{ user, ready, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
