import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Info, AlertCircle, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useApp();

  return (
    <div
      aria-live="polite"
      className="fixed top-20 right-4 sm:right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none"
    >
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto flex items-center justify-between gap-3 p-3.5 rounded-2xl bg-[#FFFDF9] border border-[#D99A8F] shadow-[0_12px_32px_rgba(45,36,33,0.14)] text-sm text-[#2D2421]"
          >
            <div className="flex items-center gap-2.5">
              {toast.type === 'info' ? (
                <Info className="w-4 h-4 text-[#B85C52] shrink-0" />
              ) : toast.type === 'error' ? (
                <AlertCircle className="w-4 h-4 text-[#B85C52] shrink-0" />
              ) : (
                <CheckCircle2 className="w-4 h-4 text-[#B85C52] shrink-0" />
              )}
              <span className="font-medium text-xs sm:text-sm text-[#2D2421]">{toast.message}</span>
            </div>

            <button
              type="button"
              onClick={() => dismissToast(toast.id)}
              className="p-1 text-[#756762] hover:text-[#2D2421] rounded-full hover:bg-[#F7F1E8] transition-colors"
              aria-label="Dismiss notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
