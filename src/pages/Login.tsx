import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Eye, EyeOff, Lock, Mail, User, CheckCircle2 } from 'lucide-react';
import { CampusNestLogo } from '../components/common/CampusNestLogo';
import { useApp } from '../context/AppContext';

export const Login: React.FC = () => {
  const { showToast } = useApp();
  const [mode, setMode] = useState<'login' | 'signup'>('login');

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!email.trim() || !email.includes('@')) {
      errors.email = 'Please enter a valid student email';
    }
    if (!password || password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    if (mode === 'signup') {
      if (!fullName.trim()) {
        errors.name = 'Full name is required';
      }
      if (password !== confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
      }
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    if (mode === 'login') {
      setSuccessMessage('Welcome back! Successfully logged into CampusNest.');
      showToast('Welcome back to your CampusNest account! 🎓', 'success');
    } else {
      setSuccessMessage('Your CampusNest student account has been created successfully!');
      showToast('Student account created successfully! 🎉', 'success');
    }
  };

  const handleForgotPassword = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      showToast('Please type your registered email address first', 'info');
      return;
    }
    showToast(`Password reset link sent to ${email}! 📧`, 'success');
  };

  return (
    <div className="min-h-screen bg-[#F7F1E8] text-[#2D2421] pt-28 pb-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          {/* Logo & Header */}
          <div className="text-center mb-8">
            <div className="inline-block mb-3">
              <CampusNestLogo variant="stacked" size="md" />
            </div>
            <p className="text-xs text-[#756762] mt-2">
              Safe • Affordable • Student-friendly
            </p>
          </div>

          {/* Form Card */}
          <div className="rounded-[24px] bg-[#FFFDF9] border border-[#D99A8F] p-6 sm:p-8 shadow-[0_12px_32px_rgba(45,36,33,0.08)]">
            {/* Two Tabs with Sliding Indicator */}
            <div className="relative flex rounded-full bg-[#F7F1E8] p-1 border border-[#D99A8F]/60 mb-6">
              <button
                type="button"
                onClick={() => {
                  setMode('login');
                  setFormErrors({});
                  setSuccessMessage('');
                }}
                className={`relative flex-1 py-2 text-xs font-semibold rounded-full transition-colors z-10 ${
                  mode === 'login' ? 'text-[#FFFDF9]' : 'text-[#2D2421]'
                }`}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode('signup');
                  setFormErrors({});
                  setSuccessMessage('');
                }}
                className={`relative flex-1 py-2 text-xs font-semibold rounded-full transition-colors z-10 ${
                  mode === 'signup' ? 'text-[#FFFDF9]' : 'text-[#2D2421]'
                }`}
              >
                Sign Up
              </button>

              {/* Sliding Indicator */}
              <motion.div
                layout
                className="absolute inset-y-1 bg-[#B85C52] rounded-full shadow-sm"
                style={{
                  left: mode === 'login' ? '4px' : '50%',
                  width: 'calc(50% - 4px)'
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            </div>

            {successMessage ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-[#B85C52]/10 border border-[#B85C52] flex items-center justify-center mx-auto text-[#B85C52]">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#2D2421]">Success!</h3>
                <p className="text-xs text-[#756762] leading-relaxed">{successMessage}</p>
                <div className="pt-2">
                  <a
                    href="/explore"
                    className="inline-block px-6 py-2 rounded-full bg-[#B85C52] text-[#FFFDF9] text-xs font-semibold"
                  >
                    Continue to Explore Rooms
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === 'signup' && (
                  <div>
                    <label className="block text-xs font-semibold text-[#2D2421] mb-1">Full Name</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-[#756762] absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Sabitha S"
                        className="w-full h-11 pl-10 pr-4 rounded-xl bg-[#FFFDF9] border border-[#D99A8F] text-xs sm:text-sm text-[#2D2421] focus:ring-2 focus:ring-[#B85C52]"
                      />
                    </div>
                    {formErrors.name && <p className="text-[10px] text-[#B85C52] mt-1">{formErrors.name}</p>}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-[#2D2421] mb-1">Student / College Email</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#756762] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="student@srmist.edu.in"
                      className="w-full h-11 pl-10 pr-4 rounded-xl bg-[#FFFDF9] border border-[#D99A8F] text-xs sm:text-sm text-[#2D2421] focus:ring-2 focus:ring-[#B85C52]"
                    />
                  </div>
                  {formErrors.email && <p className="text-[10px] text-[#B85C52] mt-1">{formErrors.email}</p>}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-[#2D2421]">Password</label>
                    {mode === 'login' && (
                      <button
                        type="button"
                        onClick={handleForgotPassword}
                        className="text-[11px] text-[#B85C52] hover:underline"
                      >
                        Forgot Password?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#756762] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full h-11 pl-10 pr-10 rounded-xl bg-[#FFFDF9] border border-[#D99A8F] text-xs sm:text-sm text-[#2D2421] focus:ring-2 focus:ring-[#B85C52]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#756762] hover:text-[#2D2421]"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {formErrors.password && <p className="text-[10px] text-[#B85C52] mt-1">{formErrors.password}</p>}
                </div>

                {mode === 'signup' && (
                  <div>
                    <label className="block text-xs font-semibold text-[#2D2421] mb-1">Confirm Password</label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-[#756762] absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full h-11 pl-10 pr-10 rounded-xl bg-[#FFFDF9] border border-[#D99A8F] text-xs sm:text-sm text-[#2D2421] focus:ring-2 focus:ring-[#B85C52]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#756762] hover:text-[#2D2421]"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {formErrors.confirmPassword && (
                      <p className="text-[10px] text-[#B85C52] mt-1">{formErrors.confirmPassword}</p>
                    )}
                  </div>
                )}

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full h-12 rounded-full bg-[#B85C52] text-[#FFFDF9] text-xs sm:text-sm font-semibold hover:bg-[#D99A8F] hover:text-[#2D2421] transition-all shadow-md active:scale-98"
                  >
                    {mode === 'login' ? 'Login to Account' : 'Create Student Account'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* ONE Dark Deep Brown section for rhythm */}
      <section className="mt-20 py-16 bg-[#2D2421] text-[#F7F1E8]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs uppercase tracking-widest text-[#D99A8F] font-semibold">
            Student Data Protection
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#F7F1E8]">
            Your Privacy is Strictly Safeguarded
          </h3>
          <p className="text-sm text-[#D99A8F] max-w-xl mx-auto">
            CampusNest never shares your personal mobile number or academic details with third-party advertisers or unverified brokers.
          </p>
        </div>
      </section>
    </div>
  );
};
