import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      token: null,

      login: async (credentials) => {
        set({ isLoading: true });
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Mock login - in real app, this would call your API
          if (credentials.email === 'admin@yasira.com' && credentials.password === 'admin123') {
            const adminUser = {
              id: 1,
              name: 'Admin User',
              email: 'admin@yasira.com',
              role: 'admin',
              avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b371?w=150&h=150&fit=crop&crop=face'
            };
            const token = 'mock-admin-token-123';
            set({ user: adminUser, isAuthenticated: true, token, isLoading: false });
            return { success: true, user: adminUser };
          } else if (credentials.email === 'user@yasira.com' && credentials.password === 'user123') {
            const regularUser = {
              id: 2,
              name: 'Jane Doe',
              email: 'user@yasira.com',
              role: 'user',
              avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
            };
            const token = 'mock-user-token-456';
            set({ user: regularUser, isAuthenticated: true, token, isLoading: false });
            return { success: true, user: regularUser };
          } else {
            set({ isLoading: false });
            return { success: false, error: 'Invalid email or password' };
          }
        } catch (error) {
          set({ isLoading: false });
          return { success: false, error: 'Login failed' };
        }
      },

      register: async (userData) => {
        set({ isLoading: true });
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          const newUser = {
            id: Date.now(),
            name: userData.name,
            email: userData.email,
            role: 'user',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
          };
          const token = `mock-token-${Date.now()}`;
          
          set({ user: newUser, isAuthenticated: true, token, isLoading: false });
          return { success: true, user: newUser };
        } catch (error) {
          set({ isLoading: false });
          return { success: false, error: 'Registration failed' };
        }
      },

      loginWithGoogle: async () => {
        set({ isLoading: true });
        try {
          // Simulate Google OAuth
          await new Promise(resolve => setTimeout(resolve, 1500));
          
          const googleUser = {
            id: Date.now(),
            name: 'Google User',
            email: 'google@example.com',
            role: 'user',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
          };
          const token = `mock-google-token-${Date.now()}`;
          
          set({ user: googleUser, isAuthenticated: true, token, isLoading: false });
          return { success: true, user: googleUser };
        } catch (error) {
          set({ isLoading: false });
          return { success: false, error: 'Google login failed' };
        }
      },

      logout: () => {
        set({ user: null, isAuthenticated: false, token: null });
      },

      updateProfile: async (profileData) => {
        set({ isLoading: true });
        try {
          await new Promise(resolve => setTimeout(resolve, 500));
          const updatedUser = { ...get().user, ...profileData };
          set({ user: updatedUser, isLoading: false });
          return { success: true, user: updatedUser };
        } catch (error) {
          set({ isLoading: false });
          return { success: false, error: 'Update failed' };
        }
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        token: state.token
      })
    }
  )
);