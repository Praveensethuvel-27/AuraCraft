import React, { createContext, useContext, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success', duration = 4000) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      removeToast(id);
    }, duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3 pointer-events-none max-w-sm w-full px-4">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              className={`pointer-events-auto p-4 rounded-xl backdrop-blur-xl border shadow-2xl flex items-start space-x-3 text-sm font-medium ${
                toast.type === 'success'
                  ? 'bg-slate-900/90 border-emerald-500/30 text-emerald-400'
                  : toast.type === 'error'
                  ? 'bg-slate-900/90 border-red-500/30 text-red-400'
                  : toast.type === 'warning'
                  ? 'bg-slate-900/90 border-amber-500/30 text-amber-400'
                  : 'bg-slate-900/90 border-blue-500/30 text-blue-400'
              }`}
            >
              {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400 mt-0.5" />}
              {toast.type === 'error' && <AlertCircle className="w-5 h-5 shrink-0 text-red-400 mt-0.5" />}
              {toast.type === 'warning' && <AlertTriangle className="w-5 h-5 shrink-0 text-amber-400 mt-0.5" />}
              {toast.type === 'info' && <Info className="w-5 h-5 shrink-0 text-blue-400 mt-0.5" />}
              <div className="flex-1 text-slate-100">{toast.message}</div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-slate-400 hover:text-white transition"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
}
