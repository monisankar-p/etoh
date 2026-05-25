import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Role = 'patient' | 'doctor' | 'nurse' | 'admin' | 'executive' | null;

interface AuthState {
  role: Role;
  isAuthenticated: boolean;
  user: {
    id: string;
    name: string;
    avatar?: string;
  } | null;
  login: (role: Role) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      role: null,
      isAuthenticated: false,
      user: null,
      login: (role) => set({ 
        role, 
        isAuthenticated: true,
        user: { id: 'usr_1', name: role === 'patient' ? 'Alex Mercer' : role === 'executive' ? 'Agent Marcus' : 'Dr. Sarah Chen' }
      }),
      logout: () => set({ role: null, isAuthenticated: false, user: null }),
    }),
    { name: 'emr-auth-storage' }
  )
);
