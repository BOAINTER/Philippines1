import { useState } from 'react';
import { FAQItem } from '../types';
import { ChevronDown, ChevronUp, MessageSquare, PhoneCall, Sparkles, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FAQSectionProps {
  faqs: FAQItem[];
  onOpenSignUp: () => void;
}

export default function FAQSection({ faqs, onOpenSignUp }: FAQSectionProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div id="faq" className="p-4 rounded-xl border-2 border-[#0A3D91] bg-white shadow-xl relative overflow-hidden flex flex-col gap-4">
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#F5B400]/10 rounded-full blur-3xl pointer-events-none" />

      {/* FAQ content */}
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-gray-200 mb-3">
          <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-[#0A3D91]">
            FAQ & Call to Action
          </h3>
          <span className="text-[10px] text-[#F5B400] bg-[#0A3D91] px-2 py-0.5 rounded font-mono font-bold inline-flex items-center gap-1">
            <span>ACADEMY FAQ</span>
            <Globe className="w-3 h-3 text-[#F5B400]" />
          </span>
        </div>

        {/* FAQ Accordion list */}
        <div className="space-y-2">
          {faqs.map((faq) => {
            const isExpanded = faq.id === expandedId;
            return (
              <div
                key={faq.id}
                className="relative rounded-xl border-2 border-[#0A3D91] bg-slate-50 overflow-hidden transition shadow-sm p-1"
              >
                {/* Corner Rivets */}
                <div className="absolute top-1.5 left-1.5 w-1.5 h-1.5 rounded-full bg-[#0A3D91] pointer-events-none" />
                <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#0A3D91] pointer-events-none" />
                <div className="absolute bottom-1.5 left-1.5 w-1.5 h-1.5 rounded-full bg-[#0A3D91] pointer-events-none" />
                <div className="absolute bottom-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#0A3D91] pointer-events-none" />

                <button
                  onClick={() => toggleExpand(faq.id)}
                  className="w-full px-4 py-2.5 flex items-center justify-between text-left hover:bg-slate-100 transition cursor-pointer z-10 relative"
                >
                  <span className="text-xs font-black text-[#0A3D91] pr-4">{faq.question}</span>
                  {isExpanded ? (
                    <ChevronUp className="w-3.5 h-3.5 text-[#0A3D91] flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5 text-[#0A3D91] flex-shrink-0" />
                  )}
                </button>

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-4 pb-3 pt-1 text-[11px] text-[#1F2937] leading-relaxed border-t border-gray-200 font-medium">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* Large Call to Action */}
      <div className="mt-2 pt-3 border-t border-gray-200">
        <motion.a
          href="https://t.me/boacademy_bot"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3.5 bg-[#F5B400] hover:bg-[#e0a400] text-[#1F2937] font-display font-black text-xs tracking-widest rounded-full transition shadow-md flex items-center justify-center gap-2 cursor-pointer uppercase text-center block"
        >
          <Sparkles className="w-4 h-4 text-[#1F2937]" />
          <span>JOIN BOA FOR FREE</span>
        </motion.a>
        <span className="text-[9px] text-[#0A3D91] uppercase block text-center mt-1.5 font-mono font-bold">
          Join 45,000+ Active Traders Worldwide Today
        </span>
      </div>
    </div>
  );
}
