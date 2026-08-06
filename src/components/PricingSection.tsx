import { useState } from 'react';
import { PricingPlan } from '../types';
import { Check, Sparkles, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PricingSectionProps {
  plans: PricingPlan[];
  onSelectPlan: (planName: string) => void;
}

type Currency = 'USD' | 'PHP' | 'THB' | 'NGN';

export default function PricingSection({ plans, onSelectPlan }: PricingSectionProps) {
  const [currency, setCurrency] = useState<Currency>('PHP');

  const getLocalizedPrice = (usdPrice: number, cur: Currency) => {
    if (usdPrice === 0) {
      return cur === 'PHP' ? 'LIBRE / FREE' : cur === 'THB' ? 'ฟรี' : 'FREE';
    }
    switch (cur) {
      case 'PHP':
        return `₱${(usdPrice * 56).toLocaleString()}`;
      case 'NGN':
        return `₦${(usdPrice * 1500).toLocaleString()}`;
      case 'THB':
        return `฿${(usdPrice * 35).toLocaleString()}`;
      case 'USD':
      default:
        return `$${usdPrice}`;
    }
  };

  return (
    <div id="pricing" className="p-5 rounded-2xl border-2 border-[#0A3D91] bg-white shadow-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-36 h-36 bg-[#F5B400]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="text-center pb-6 border-b border-gray-200 flex flex-col items-center">
        <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-[#0A3D91]">
          Flexible Pricing
        </h2>
        <h3 className="text-2xl font-display font-extrabold text-[#1F2937] mt-1">
          Select Your Academy Tier
        </h3>
        <p className="text-xs text-gray-600 mt-1.5 max-w-md mx-auto">
          Start receiving high-probability binary option entries with simple one-time lifetime purchases or low-cost licenses.
        </p>

        {/* Currency Switcher Pill */}
        <div className="mt-5 p-1 bg-slate-100 border border-[#0A3D91]/20 rounded-full flex gap-1 relative shadow-inner">
          {(['PHP', 'USD', 'THB', 'NGN'] as Currency[]).map((cur) => {
            const isActive = currency === cur;
            return (
              <button
                key={cur}
                onClick={() => setCurrency(cur)}
                className={`px-3.5 py-1.5 rounded-full text-[10px] font-mono font-black uppercase tracking-wider cursor-pointer transition-colors relative z-10 ${
                  isActive ? 'text-[#0A3D91]' : 'text-gray-500 hover:text-[#0A3D91]'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeCurrencyPill"
                    className="absolute inset-0 bg-[#F5B400] rounded-full -z-10 shadow-sm"
                    transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                  />
                )}
                {cur === 'PHP' ? 'PHP ₱' : cur === 'USD' ? 'USD $' : cur === 'NGN' ? 'NGN ₦' : 'THB ฿'}
              </button>
            );
          })}
        </div>
      </div>

      {/* Plans Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {plans.map((plan) => {
          const displayPrice = getLocalizedPrice(plan.price, currency);
          return (
            <motion.div
              key={plan.id}
              layout="position"
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="relative rounded-3xl border-2 border-[#F5B400] p-6 flex flex-col justify-between overflow-hidden bg-gradient-to-b from-[#FFFBEB] via-white to-slate-50 shadow-lg min-h-[420px]"
            >
              {/* Corner Rivets */}
              <div className="absolute top-2.5 left-2.5 w-1.5 h-1.5 rounded-full bg-[#0A3D91]" />
              <div className="absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-[#0A3D91]" />
              <div className="absolute bottom-2.5 left-2.5 w-1.5 h-1.5 rounded-full bg-[#0A3D91]" />
              <div className="absolute bottom-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-[#0A3D91]" />

              <div>
                <span className="text-[11px] font-sans font-black tracking-widest text-[#0A3D91] uppercase block">
                  {plan.name}
                </span>

                {/* Price block */}
                <div className="my-2 flex flex-col items-start min-h-[64px]">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={displayPrice}
                      initial={{ opacity: 0, y: -4, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 4, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="text-3xl font-display font-black text-[#0A3D91] leading-none select-none"
                    >
                      {displayPrice}
                    </motion.span>
                  </AnimatePresence>
                  <span className="text-[10px] text-gray-500 font-sans font-bold uppercase tracking-wider mt-1">
                    one-time access
                  </span>
                </div>

                {/* Divider Line */}
                <div className="border-t border-gray-200 my-4 w-full" />

                {/* Bullet points */}
                <ul className="space-y-3.5 my-4 pl-4 list-disc text-[#1F2937]">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="text-xs font-semibold text-[#1F2937] leading-tight pl-1">
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Call to Action Button */}
              <a
                href="https://affiliate.iqoption.net/redir/?aff=261925&aff_model=revenue&afftrack=BOAinter1"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-[#F5B400] text-[#1F2937] hover:bg-[#e0a400] rounded-full font-display font-black text-xs tracking-wider uppercase shadow-md transition active:scale-[0.98] cursor-pointer mt-4 text-center block"
              >
                Get Started for Free
              </a>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
