import React, { createContext, useContext, useState, useEffect } from 'react';
import { EnquirySubmission, FilterState } from '../types';

interface Toast {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'error';
}

interface AppContextType {
  savedIds: string[];
  toggleSave: (id: string) => void;
  isSaved: (id: string) => boolean;
  compareIds: string[];
  toggleCompare: (id: string) => void;
  isInCompare: (id: string) => boolean;
  removeCompare: (id: string) => void;
  clearCompare: () => void;
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  dismissToast: (id: string) => void;
  lastEnquiry: EnquirySubmission | null;
  setLastEnquiry: (submission: EnquirySubmission) => void;
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
}

const initialFilters: FilterState = {
  searchQuery: '',
  budgetMax: 20000,
  distanceMax: 5,
  type: 'All',
  gender: 'All',
  facilities: [],
  sortBy: 'price-asc'
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('campusnest_saved_ids');
      return stored ? JSON.parse(stored) : ['srm-scholars-haven', 'loyola-residency-girls'];
    } catch {
      return ['srm-scholars-haven', 'loyola-residency-girls'];
    }
  });

  const [compareIds, setCompareIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('campusnest_compare_ids');
      return stored ? JSON.parse(stored) : ['srm-scholars-haven', 'loyola-residency-girls'];
    } catch {
      return ['srm-scholars-haven', 'loyola-residency-girls'];
    }
  });

  const [toasts, setToasts] = useState<Toast[]>([]);
  const [lastEnquiry, setLastEnquiryState] = useState<EnquirySubmission | null>(() => {
    try {
      const stored = localStorage.getItem('campusnest_last_enquiry');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [filters, setFilters] = useState<FilterState>(initialFilters);

  useEffect(() => {
    try {
      localStorage.setItem('campusnest_saved_ids', JSON.stringify(savedIds));
    } catch {
      // Ignore storage errors in restricted contexts
    }
  }, [savedIds]);

  useEffect(() => {
    try {
      localStorage.setItem('campusnest_compare_ids', JSON.stringify(compareIds));
    } catch {
      // Ignore storage errors in restricted contexts
    }
  }, [compareIds]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleSave = (id: string) => {
    setSavedIds((prev) => {
      if (prev.includes(id)) {
        showToast('Removed from saved list', 'info');
        return prev.filter((item) => item !== id);
      } else {
        showToast('Saved to your list! ❤️', 'success');
        return [...prev, id];
      }
    });
  };

  const isSaved = (id: string) => savedIds.includes(id);

  const toggleCompare = (id: string) => {
    setCompareIds((prev) => {
      if (prev.includes(id)) {
        showToast('Removed from comparison', 'info');
        return prev.filter((item) => item !== id);
      }
      if (prev.length >= 3) {
        showToast('You can compare up to 3 accommodations at once', 'info');
        return prev;
      }
      showToast('Added to comparison! ⚖️', 'success');
      return [...prev, id];
    });
  };

  const isInCompare = (id: string) => compareIds.includes(id);

  const removeCompare = (id: string) => {
    setCompareIds((prev) => prev.filter((item) => item !== id));
    showToast('Removed from comparison', 'info');
  };

  const clearCompare = () => {
    setCompareIds([]);
  };

  const setLastEnquiry = (submission: EnquirySubmission) => {
    setLastEnquiryState(submission);
    try {
      localStorage.setItem('campusnest_last_enquiry', JSON.stringify(submission));
    } catch {
      // Ignore storage errors
    }
  };

  const resetFilters = () => {
    setFilters(initialFilters);
  };

  return (
    <AppContext.Provider
      value={{
        savedIds,
        toggleSave,
        isSaved,
        compareIds,
        toggleCompare,
        isInCompare,
        removeCompare,
        clearCompare,
        toasts,
        showToast,
        dismissToast,
        lastEnquiry,
        setLastEnquiry,
        filters,
        setFilters,
        resetFilters
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
