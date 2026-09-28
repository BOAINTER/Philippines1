import { useState } from 'react';
import { PricingPlan } from '../types';
import { Check, Sparkles, Clock, AlertTriangle, ArrowRight, Flame } from 'lucide-react';
import { motion } from 'motion/react';

interface PricingSectionProps {
  plans: PricingPlan[];
  onSelectPlan: (planName: string) => void;
}

export default function PricingSection({ plans }: PricingSectionProps) {
  const telegramUrl = 'https://t.me/BOAInternational';
  const plan = plans[0] || {
    id: 'plan_free',
    name: 'BOA VIP FREE ACCESS',
    price: 0,
    period: 'Free for first 100 traders/month',
    features: [
      '100% Free Lifetime Access (No Hidden Fees)',
      'Real-time High-Accuracy OTC & Forex Signals',
      'Instant Telegram Direct Push Alerts',
      'Automated Trading Bot Integration Support',
      'Complete Academy Training & Risk Management Course',
      '24/7 VIP Community Access & Master Bo Guidance'
    ]
  };

  // Quota calculation (e.g. 89 claimed out of 100)
  const claimedCount = 89;
  const totalSlots = 100;
  const remainingSlots = totalSlots - claimedCount;

  return (
    <div id="pricing" className="p-6 sm:p-8 rounded-3xl border-2 border-[#0A3D91] bg-white shadow-2xl relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#F5B400]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-[#0A3D91]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="text-center pb-6 flex flex-col items-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0A3D91] text-[#F5B400] text-[11px] font-mono font-bold tracking-widest uppercase mb-2 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#F5B400]" />
          <span>BOA ACADEMY MEMBERSHIP</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-[#1F2937] tracking-tight">
          100% Free VIP Access
        </h2>

        {/* Urgent Attention Notice for the 100 Free spots per month */}
        <div className="mt-3.5 w-full bg-amber-50 border-2 border-[#F5B400] rounded-2xl p-3 sm:p-4 shadow-sm flex flex-col sm:flex-row items-center gap-3 text-left">
          <div className="w-10 h-10 rounded-xl bg-[#F5B400] text-[#1F2937] flex items-center justify-center flex-shrink-0 shadow-sm">
            <Flame className="w-5 h-5 fill-current animate-pulse" />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span className="font-display font-black text-xs sm:text-sm text-[#0A3D91] uppercase tracking-wide">
                🔥 Exclusive Free Access for the First 100 Traders/Month!
              </span>
              <span className="px-2 py-0.5 rounded-full bg-red-500 text-white font-mono font-bold text-[10px] animate-pulse">
                Only {remainingSlots} spots left!
              </span>
            </div>
            <p className="text-xs text-gray-700 font-medium mt-1 leading-relaxed">
              100% Free VIP membership is strictly limited to the first 100 traders each month. Claim your free access now before quota is completely filled!
            </p>
          </div>
        </div>
      </div>

      {/* Single Featured Free Plan Card */}
      <div className="max-w-xl mx-auto mt-2">
        <motion.div
          layout="position"
          whileHover={{ y: -4 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="relative rounded-3xl border-2 border-[#0A3D91] p-6 sm:p-8 flex flex-col justify-between overflow-hidden bg-gradient-to-b from-[#FFFBEB] via-white to-slate-50 shadow-xl"
        >
          {/* Top Banner inside card */}
          <div className="absolute top-0 right-0 left-0 bg-[#0A3D91] text-[#F5B400] py-1.5 text-center text-[10px] sm:text-xs font-mono font-black uppercase tracking-widest flex items-center justify-center gap-1.5 shadow-sm">
            <Clock className="w-3.5 h-3.5 text-[#F5B400]" />
            <span>LIMITED QUOTA &bull; Free for First 100 Members/Month</span>
          </div>

          <div className="pt-4">
            <div className="flex items-center justify-between gap-2 mt-2">
              <span className="text-xs font-mono font-extrabold tracking-widest text-[#0A3D91] uppercase px-2.5 py-0.5 rounded bg-blue-100 border border-blue-200">
                {plan.name}
              </span>
              <span className="text-[11px] font-mono font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping" />
                ACTIVE SLOTS
              </span>
            </div>

            {/* Big Price Block */}
            <div className="my-4 flex flex-col items-start bg-white/80 border border-amber-200 rounded-2xl p-4 shadow-sm">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-display font-black text-[#0A3D91] leading-none">
                  100% FREE
                </span>
                <span className="text-xs text-gray-500 font-bold line-through">
                  ₱1,990 / mo
                </span>
              </div>
              <span className="text-[11px] text-[#0A3D91] font-mono font-bold uppercase tracking-wider mt-1.5 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#F5B400] fill-[#F5B400]" />
                Lifetime Free Access (Exclusively for first 100 traders/month)
              </span>

              {/* Progress bar of claimed spots */}
              <div className="w-full mt-3 pt-3 border-t border-amber-100">
                <div className="flex justify-between text-[11px] font-mono font-bold text-gray-700 mb-1">
                  <span>Claimed: <strong className="text-[#0A3D91]">{claimedCount}/{totalSlots} Traders</strong></span>
                  <span className="text-red-600 font-extrabold">Only {remainingSlots} spots left!</span>
                </div>
                <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#0A3D91] via-[#F5B400] to-red-500 rounded-full transition-all duration-500"
                    style={{ width: `${(claimedCount / totalSlots) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Divider Line */}
            <div className="border-t border-gray-200 my-4 w-full" />

            {/* Features list */}
            <h4 className="text-xs font-mono font-extrabold uppercase tracking-wider text-gray-700 mb-2">
              What you will receive with Free VIP Access:
            </h4>
            <ul className="space-y-3 my-3 text-[#1F2937]">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="text-xs font-medium text-[#1F2937] flex items-start gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-[#0A3D91] text-[#F5B400] flex items-center justify-center flex-shrink-0 mt-0.5 shadow-xs">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <span className="leading-snug">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Call to Action Button */}
          <div className="mt-6 pt-4 border-t border-gray-200 flex flex-col gap-2">
            <a
              id="claim-free-pricing-btn"
              href={telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 sm:py-4 bg-[#F5B400] hover:bg-[#e0a400] text-[#1F2937] rounded-full font-display font-black text-xs sm:text-sm tracking-wider uppercase shadow-lg transition active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 group"
            >
              <span>Claim Free Access on Telegram Now</span>
              <ArrowRight className="w-4 h-4 text-[#1F2937] group-hover:translate-x-1 transition" />
            </a>
            <p className="text-[10px] text-center text-gray-500 font-mono">
              ⚡ Instant Free Join &bull; No Hidden Fees &bull; Direct Access to Master Bo
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
