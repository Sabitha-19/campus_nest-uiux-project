import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { FloatingCompareBar } from './components/common/FloatingCompareBar';
import { ToastContainer } from './components/common/ToastContainer';
import { LoadingScreen } from './components/common/LoadingScreen';
import { ScrollToTop } from './components/common/ScrollToTop';

// Pages
import { Home } from './pages/Home';
import { Explore } from './pages/Explore';
import { AccommodationDetail } from './pages/AccommodationDetail';
import { Compare } from './pages/Compare';
import { Saved } from './pages/Saved';
import { Roommates } from './pages/Roommates';
import { ListProperty } from './pages/ListProperty';
import { HowItWorks } from './pages/HowItWorks';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Login } from './pages/Login';
import { EnquiryConfirmation } from './pages/EnquiryConfirmation';
import { NotFound } from './pages/NotFound';

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="flex-1 flex flex-col"
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/accommodation/:id" element={<AccommodationDetail />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/roommates" element={<Roommates />} />
          <Route path="/list-property" element={<ListProperty />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/enquiry-confirmation" element={<EnquiryConfirmation />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

export default function App() {
  const [initialLoading, setInitialLoading] = useState(true);

  return (
    <AppProvider>
      <Router>
        <ScrollToTop />
        {initialLoading && <LoadingScreen onComplete={() => setInitialLoading(false)} />}
        <div className="min-h-screen flex flex-col bg-[#F7F1E8] text-[#2D2421]">
          <Navbar />
          <main className="flex-1 flex flex-col">
            <AnimatedRoutes />
          </main>
          <FloatingCompareBar />
          <ToastContainer />
          <Footer />
        </div>
      </Router>
    </AppProvider>
  );
}
