import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Mail, Phone, MapPin, ShieldCheck, Plus, Minus, Send, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Contact: React.FC = () => {
  const { showToast } = useApp();

  // Search help bar state
  const [helpSearch, setHelpSearch] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Contact form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSent, setIsSent] = useState(false);

  const contactFaqs = [
    {
      q: 'How does CampusNest ensure property safety for female students?',
      a: 'We enforce stringent safety checks: full-time female resident wardens, verified biometric security doors, visitor logs, and round-the-clock emergency assistance lines.'
    },
    {
      q: 'What should I do if a property owner asks for extra brokerage?',
      a: 'Report them immediately through our help desk. CampusNest operates under a strict zero-brokerage model. Any owner attempting to charge intermediary brokerage is delisted.'
    },
    {
      q: 'How quickly will a property respond after I submit an enquiry?',
      a: 'Most verified property wardens respond within 2 to 4 business hours to confirm room availability and coordinate visit timings.'
    },
    {
      q: 'Can I visit accommodations with my parents on weekends?',
      a: 'Yes, all our partnered student hostels and PGs encourage weekend campus visits with family members prior to room finalization.'
    }
  ];

  const filteredFaqs = useMemo(() => {
    if (!helpSearch.trim()) return contactFaqs;
    const q = helpSearch.toLowerCase();
    return contactFaqs.filter(
      (f) => f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q)
    );
  }, [helpSearch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (!name.trim()) errors.name = 'Full name is required';
    if (!email.trim() || !email.includes('@')) errors.email = 'Valid email is required';
    if (!subject.trim()) errors.subject = 'Subject is required';
    if (!message.trim() || message.length < 10) errors.message = 'Please provide more details in your message';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setIsSent(true);
    showToast('Your message has been sent to our student support team! 💌', 'success');
  };

  return (
    <div className="min-h-screen bg-[#F7F1E8] text-[#2D2421] pt-28 pb-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-widest text-[#B85C52] font-semibold">
            Student Support Desk
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#2D2421]">
            How Can We Help You?
          </h1>
          <p className="text-base text-[#756762]">
            Search our knowledge base or reach out to our dedicated student accommodation team.
          </p>

          {/* Search Help Bar */}
          <div className="pt-4 max-w-lg mx-auto">
            <div className="relative">
              <Search className="w-4 h-4 text-[#B85C52] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={helpSearch}
                onChange={(e) => setHelpSearch(e.target.value)}
                placeholder="Search FAQs: security, deposit, meals, booking..."
                className="w-full h-12 pl-11 pr-4 rounded-full bg-[#FFFDF9] border border-[#D99A8F] text-xs sm:text-sm text-[#2D2421] placeholder:text-[#756762]/70 focus:outline-none focus:ring-2 focus:ring-[#B85C52] shadow-xs"
              />
            </div>
          </div>
        </div>

        {/* Support & Safety Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Support Info Card with genuine contacts from attached assets */}
          <div className="rounded-[24px] bg-[#FFFDF9] border border-[#D99A8F] p-8 shadow-sm space-y-6">
            <div>
              <span className="text-xs uppercase tracking-wider text-[#B85C52] font-semibold">Contact Desk</span>
              <h2 className="font-serif text-2xl font-bold text-[#2D2421] mt-1">Direct Student Helpline</h2>
              <p className="text-xs text-[#756762] mt-1">Available Monday to Saturday, 9:00 AM – 7:00 PM IST</p>
            </div>

            <div className="space-y-4 text-sm text-[#756762]">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#F7F1E8] border border-[#D99A8F] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-[#B85C52]" />
                </div>
                <div>
                  <strong className="text-[#2D2421] block font-serif">Email Assistance</strong>
                  <span>hello@campusnest.co</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#F7F1E8] border border-[#D99A8F] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-[#B85C52]" />
                </div>
                <div>
                  <strong className="text-[#2D2421] block font-serif">Helpline Phone</strong>
                  <span>(555) 123-4567</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#F7F1E8] border border-[#D99A8F] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-[#B85C52]" />
                </div>
                <div>
                  <strong className="text-[#2D2421] block font-serif">Campus Headquarters</strong>
                  <span>4500 University Dr, Campus Town</span>
                </div>
              </div>
            </div>
          </div>

          {/* Safety Information Card */}
          <div className="rounded-[24px] bg-[#FFFDF9] border border-[#D99A8F] p-8 shadow-sm space-y-6">
            <div>
              <span className="text-xs uppercase tracking-wider text-[#B85C52] font-semibold">Student Protection</span>
              <h2 className="font-serif text-2xl font-bold text-[#2D2421] mt-1">CampusNest Safety Charter</h2>
              <p className="text-xs text-[#756762] mt-1">Our commitment to students and parents</p>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-[#756762]">
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-5 h-5 text-[#B85C52] shrink-0 mt-0.5" />
                <span>Physical inspection of all property locks, CCTV cameras, and electrical safety before listing.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-5 h-5 text-[#B85C52] shrink-0 mt-0.5" />
                <span>Zero Tolerance Policy for harassment, discrimination, or arbitrary eviction.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-5 h-5 text-[#B85C52] shrink-0 mt-0.5" />
                <span>Direct escalation line for student residents who experience maintenance delays.</span>
              </div>
            </div>
          </div>
        </div>

        {/* FAQs Accordion */}
        <div className="rounded-[24px] bg-[#FFFDF9] border border-[#D99A8F] p-8 shadow-sm space-y-6">
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#2D2421]">Popular Support Inquiries</h2>
            <p className="text-xs text-[#756762] mt-1">Frequently referenced policies and student assistance guides.</p>
          </div>

          <div className="space-y-3">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="rounded-xl border border-[#D99A8F]/60 bg-[#FFFDF9] overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 text-left flex items-center justify-between gap-4 font-serif text-base font-bold text-[#2D2421] hover:text-[#B85C52] transition-colors"
                  >
                    <span>{faq.q}</span>
                    <span className="p-1 rounded-full bg-[#F7F1E8] text-[#B85C52] shrink-0">
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </span>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-[#756762] leading-relaxed border-t border-[#D99A8F]/30">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* Contact Form with persistent success state */}
        <div className="max-w-2xl mx-auto rounded-[24px] bg-[#FFFDF9] border border-[#D99A8F] p-8 sm:p-12 shadow-[0_12px_32px_rgba(45,36,33,0.08)]">
          {isSent ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#B85C52]/10 border border-[#B85C52] text-[#B85C52] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2D2421]">
                Message Sent Successfully!
              </h2>
              <p className="text-sm text-[#756762] leading-relaxed">
                Thank you for contacting CampusNest. Our student accommodation support counselor will reply to <strong>{email}</strong> within 4 business hours.
              </p>
              <button
                type="button"
                onClick={() => setIsSent(false)}
                className="mt-4 px-6 py-2 rounded-full bg-[#F7F1E8] border border-[#D99A8F] text-xs font-semibold text-[#2D2421]"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="border-b border-[#D99A8F]/40 pb-4">
                <h2 className="font-serif text-2xl font-bold text-[#2D2421]">Send Us a Message</h2>
                <p className="text-xs text-[#756762] mt-1">Have an inquiry or need room recommendations? Write to us.</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2D2421] mb-1">Your Full Name *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (formErrors.name) setFormErrors((p) => ({ ...p, name: '' }));
                  }}
                  placeholder="e.g. Sabitha S"
                  className="w-full h-11 px-4 rounded-xl bg-[#FFFDF9] border border-[#D99A8F] text-xs sm:text-sm text-[#2D2421] focus:outline-none focus:ring-2 focus:ring-[#B85C52]"
                />
                {formErrors.name && <p className="text-[10px] text-[#B85C52] mt-1">{formErrors.name}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2D2421] mb-1">Your Email Address *</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (formErrors.email) setFormErrors((p) => ({ ...p, email: '' }));
                  }}
                  placeholder="student@college.edu"
                  className="w-full h-11 px-4 rounded-xl bg-[#FFFDF9] border border-[#D99A8F] text-xs sm:text-sm text-[#2D2421] focus:outline-none focus:ring-2 focus:ring-[#B85C52]"
                />
                {formErrors.email && <p className="text-[10px] text-[#B85C52] mt-1">{formErrors.email}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2D2421] mb-1">Subject *</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => {
                    setSubject(e.target.value);
                    if (formErrors.subject) setFormErrors((p) => ({ ...p, subject: '' }));
                  }}
                  placeholder="e.g. Enquiry about SRM Kattankulathur PG"
                  className="w-full h-11 px-4 rounded-xl bg-[#FFFDF9] border border-[#D99A8F] text-xs sm:text-sm text-[#2D2421] focus:outline-none focus:ring-2 focus:ring-[#B85C52]"
                />
                {formErrors.subject && <p className="text-[10px] text-[#B85C52] mt-1">{formErrors.subject}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2D2421] mb-1">Your Message *</label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (formErrors.message) setFormErrors((p) => ({ ...p, message: '' }));
                  }}
                  placeholder="How can we help you? Include your university name, budget, or preferred room type."
                  className="w-full p-3 rounded-xl bg-[#FFFDF9] border border-[#D99A8F] text-xs sm:text-sm text-[#2D2421] focus:outline-none focus:ring-2 focus:ring-[#B85C52]"
                />
                {formErrors.message && <p className="text-[10px] text-[#B85C52] mt-1">{formErrors.message}</p>}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 h-12 rounded-full bg-[#B85C52] text-[#FFFDF9] text-sm font-semibold hover:bg-[#D99A8F] hover:text-[#2D2421] transition-all shadow-md active:scale-98"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* ONE Dark Deep Brown section for rhythm */}
      <section className="mt-20 py-16 bg-[#2D2421] text-[#F7F1E8]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs uppercase tracking-widest text-[#D99A8F] font-semibold">
            Emergency SOS Line
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#F7F1E8]">
            Immediate Student Safety Escalation
          </h3>
          <p className="text-sm text-[#D99A8F] max-w-xl mx-auto">
            If you are currently resident at a CampusNest verified property and require immediate assistance, dial our dedicated 24/7 emergency dispatch line at (555) 123-4567.
          </p>
        </div>
      </section>
    </div>
  );
};
