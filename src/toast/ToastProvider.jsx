import { useCallback, useMemo, useRef, useState } from 'react';
import { ToastContext } from './context';

const DEFAULT_DURATION = 2800;

const toneClasses = {
  success: 'bg-green-600/95 text-white border-green-400/40',
  error: 'bg-red-600/95 text-white border-red-400/40',
  info: 'bg-gray-800/95 text-white border-gray-600/60',
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const idRef = useRef(0);

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const show = useCallback(
    (message, { tone = 'info', duration = DEFAULT_DURATION } = {}) => {
      const id = ++idRef.current;
      setToasts((prev) => [...prev, { id, message, tone }]);
      if (duration > 0) {
        setTimeout(() => dismiss(id), duration);
      }
      return id;
    },
    [dismiss],
  );

  const value = useMemo(
    () => ({
      show,
      success: (msg, opts) => show(msg, { ...opts, tone: 'success' }),
      error: (msg, opts) => show(msg, { ...opts, tone: 'error' }),
      info: (msg, opts) => show(msg, { ...opts, tone: 'info' }),
      dismiss,
    }),
    [show, dismiss],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        className="fixed inset-x-0 bottom-4 sm:bottom-6 z-[60] flex flex-col items-center gap-2 px-4 pointer-events-none"
        aria-live="polite"
        aria-atomic="true"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            role={toast.tone === 'error' ? 'alert' : 'status'}
            className={`pointer-events-auto max-w-sm w-fit rounded-lg border px-4 py-2.5 text-sm font-medium shadow-xl backdrop-blur-sm animate-[toast-in_180ms_ease-out] ${toneClasses[toast.tone] ?? toneClasses.info}`}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
