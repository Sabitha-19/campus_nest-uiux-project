import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Scale, X, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ACCOMMODATIONS } from '../../data/accommodations';

export const FloatingCompareBar: React.FC = () => {
  const { compareIds, removeCompare, clearCompare } = useApp();

  if (compareIds.length === 0) return null;

  const comparedProperties = ACCOMMODATIONS.filter((item) => compareIds.includes(item.id));

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="fixed bottom-6 inset-x-4 sm:inset-x-auto sm:right-8 z-40 max-w-lg mx-auto sm:mx-0"
      >
        <div className="bg-[#FFFDF9] border border-[#B85C52] rounded-[24px] shadow-[0_16px_36px_rgba(45,36,33,0.18)] p-3.5 sm:p-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#B85C52]/10 border border-[#B85C52] flex items-center justify-center shrink-0">
              <Scale className="w-5 h-5 text-[#B85C52]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-sm font-bold text-[#2D2421]">
                  Compare Accommodations
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#B85C52] text-[#FFFDF9] font-medium font-sans">
                  {compareIds.length}/3
                </span>
              </div>
              <p className="text-[11px] text-[#756762] line-clamp-1">
                {comparedProperties.map((p) => p.title).join(' • ')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Link
              to="/compare"
              className="inline-flex items-center gap-1.5 h-10 px-4 rounded-full bg-[#B85C52] text-[#FFFDF9] text-xs font-semibold hover:bg-[#D99A8F] hover:text-[#2D2421] transition-colors"
            >
              <span>Compare</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <button
              type="button"
              onClick={clearCompare}
              className="w-8 h-8 rounded-full border border-[#D99A8F] text-[#756762] hover:text-[#2D2421] hover:bg-[#F7F1E8] flex items-center justify-center transition-colors"
              title="Clear comparison"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
