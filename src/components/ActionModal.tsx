import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, CheckCircle, Sparkles, Shield, Trophy, Globe } from 'lucide-react';
import { trackPixelEvent, trackTelegramClick } from '../utils/pixel';

interface ActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlanName?: string;
}

export default function ActionModal({ isOpen, onClose, selectedPlanName }: ActionModalProps) {
  const [email, setEmail] = useState('');
  const [telegram, setTelegram] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email || !telegram) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      // Track conversion in Meta Pixel
      trackPixelEvent('CompleteRegistration', {
        content_name: selectedPlanName || 'BOA VIP Free Access',
        status: true,
      });
      trackPixelEvent('Lead', {
        content_name: selectedPlanName || 'BOA VIP Free Access',
      });
    }, 1500);
  };

  const handleReset = () => {
    setEmail('');
    setTelegram('');
    setIsSuccess(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="action-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative w-full max-w-md overflow-hidden rounded-2xl border-2 border-[#0A3D91] bg-white p-6 md:p-8 shadow-2xl"
          >
            {/* Ambient gold glow decoration */}
            <div className="absolute -top-16 -left-16 w-32 h-32 rounded-full bg-[#F5B400]/10 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -right-16 w-32 h-32 rounded-full bg-[#0A3D91]/10 blur-3xl pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 rounded-full text-gray-500 hover:bg-slate-100 hover:text-[#0A3D91] transition"
            >
              <X className="w-5 h-5" />
            </button>

            {!isSuccess ? (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-lg bg-[#0A3D91]/10 border border-[#0A3D91]/20 text-[#0A3D91]">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-black text-[#0A3D91]">
                      {selectedPlanName ? `Unlock ${selectedPlanName}` : 'Get Started for Free'}
                    </h3>
                    <p className="text-xs text-[#F5B400] font-bold bg-[#0A3D91] px-2 py-0.5 rounded inline-flex items-center gap-1 mt-0.5">
                      <span>BOA International Academy</span>
                      <Globe className="w-3 h-3 text-[#F5B400]" />
                    </p>
                  </div>
                </div>

                <p className="text-sm text-[#1F2937] mb-6 font-medium leading-relaxed">
                  {selectedPlanName 
                    ? `You are unlocking instant premium VIP signals, checklists, and automated bot templates. Please register your access credentials below.`
                    : 'Get instantly connected to our public academy dashboard and test high-precision signals with up to 87% accuracy.'}
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-[#0A3D91] mb-1.5 uppercase tracking-wider">
                      Your Active Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. juan.delacruz@gmail.com"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-gray-300 rounded-lg text-[#1F2937] placeholder-gray-400 focus:outline-none focus:border-[#0A3D91] transition text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0A3D91] mb-1.5 uppercase tracking-wider">
                      Telegram Username (@username)
                    </label>
                    <input
                      type="text"
                      required
                      value={telegram}
                      onChange={(e) => setTelegram(e.target.value)}
                      placeholder="e.g. @juan_trader_ph"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-gray-300 rounded-lg text-[#1F2937] placeholder-gray-400 focus:outline-none focus:border-[#0A3D91] transition text-sm"
                    />
                  </div>

                  <div className="flex items-center gap-2 py-1 text-xs text-[#0A3D91] font-semibold">
                    <Shield className="w-4 h-4 flex-shrink-0 text-[#F5B400]" />
                    <span>Secure, instant connection. No password required.</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-2 py-3 px-4 bg-[#F5B400] text-[#1F2937] font-black rounded-lg hover:bg-[#e0a400] active:scale-[0.98] transition flex items-center justify-center gap-2 cursor-pointer shadow-md uppercase tracking-wider text-xs"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-[#1F2937] border-t-transparent rounded-full animate-spin" />
                        <span>Securing Connection...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Get Free Signals Access</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-4"
              >
                <div className="mx-auto w-16 h-16 bg-[#0A3D91] border-2 border-[#F5B400] rounded-full flex items-center justify-center text-[#F5B400] mb-4 animate-bounce shadow-md">
                  <Trophy className="w-8 h-8" />
                </div>

                <h3 className="text-2xl font-display font-black text-[#0A3D91] mb-2">
                  Mabuhay & Welcome!
                </h3>
                <p className="text-sm text-[#1F2937] mb-6 px-4 font-medium">
                  We sent a secure validation token to <strong className="text-[#0A3D91]">{email}</strong>. 
                  Tap below to launch your dedicated private Telegram portal.
                </p>

                <div className="bg-slate-100 border border-gray-300 rounded-xl p-4 mb-6 text-left">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#16A34A] flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-[#0A3D91]">BOA VIP TELEGRAM BOT (PH)</h4>
                      <p className="text-[11px] text-[#1F2937] mt-0.5 font-medium">Connected: {telegram}</p>
                      <p className="text-[11px] text-[#16A34A] font-bold">Account Tier: {selectedPlanName || 'Trial License'}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <a
                    href="https://t.me/BOAInternational"
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => trackTelegramClick('Modal Open VIP Telegram Bot')}
                    className="py-3 px-4 bg-[#0A3D91] hover:bg-[#083175] text-white font-bold rounded-lg transition active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <Send className="w-4 h-4 text-[#F5B400]" />
                    <span>Open VIP Telegram Bot</span>
                  </a>

                  <button
                    onClick={handleReset}
                    className="text-xs text-[#0A3D91] hover:text-[#F5B400] font-bold transition underline decoration-dotted underline-offset-4 cursor-pointer"
                  >
                    Return to Dashboard
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
