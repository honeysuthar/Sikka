import { create } from 'zustand';

interface Toast {
  id: string;
  title: string;
  description?: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}

interface UIStore {
  toasts: Toast[];
  isSidebarOpen: boolean;
  isMobileNavOpen: boolean;
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
  toggleSidebar: () => void;
  setMobileNav: (open: boolean) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  toasts: [],
  isSidebarOpen: true,
  isMobileNavOpen: false,

  addToast: (toast) => {
    const id = `toast-${Date.now()}`;
    set(state => ({ toasts: [...state.toasts, { ...toast, id }] }));
    setTimeout(() => {
      set(state => ({ toasts: state.toasts.filter(t => t.id !== id) }));
    }, toast.duration ?? 4000);
  },

  removeToast: (id) => {
    set(state => ({ toasts: state.toasts.filter(t => t.id !== id) }));
  },

  toggleSidebar: () => set(state => ({ isSidebarOpen: !state.isSidebarOpen })),
  setMobileNav: (isMobileNavOpen) => set({ isMobileNavOpen }),
}));
