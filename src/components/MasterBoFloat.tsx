import { motion } from 'motion/react';
import { MessageCircle, Sparkles } from 'lucide-react';
import masterBoImg from '../assets/images/master_bo_avatar_1787193443308.jpg';

export default function MasterBoFloat() {
  const telegramUrl = 'https://t.me/BOAInternational';

  return (
    <aside
      aria-label="Contact Master Bo on Telegram"
      className="fixed bottom-5 right-5 z-50 flex flex-col items-end pointer-events-auto"
    >
      <motion.a
        id="master-bo-float-btn"
        href={telegramUrl}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.5 }}
        whileHover={{ scale: 1.06, y: -4 }}
        whileTap={{ scale: 0.95 }}
        className="group relative flex items-center gap-3 p-1.5 sm:p-2 pr-3 sm:pr-4 rounded-full bg-white/95 backdrop-blur-md border-2 border-[#0A3D91] shadow-2xl hover:border-[#F5B400] transition-all duration-300 cursor-pointer text-left select-none"
        style={{
          boxShadow: '0 10px 30px -5px rgba(10, 61, 145, 0.35), 0 0 15px rgba(245, 180, 0, 0.25)',
        }}
      >
        {/* Floating Ambient Glow */}
        <div className="absolute -inset-1 bg-gradient-to-r from-[#0A3D91] via-[#F5B400] to-[#0A3D91] rounded-full blur-md opacity-30 group-hover:opacity-60 transition duration-500 pointer-events-none -z-10" />

        {/* Master Bo Avatar Image Frame */}
        <div className="relative flex-shrink-0">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-[#F5B400] shadow-md bg-[#0A3D91]">
            <img
              src={masterBoImg}
              alt="Master Bo"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center group-hover:scale-110 transition duration-300"
            />
          </div>

          {/* Telegram Online Indicator Icon */}
          <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#0A3D91] border-2 border-white flex items-center justify-center text-[#F5B400] shadow-md group-hover:bg-[#F5B400] group-hover:text-[#1F2937] transition">
            <MessageCircle className="w-3.5 h-3.5 fill-current" />
          </div>

          {/* Live Online Green Dot */}
          <span className="absolute top-0 right-0 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white" />
          </span>
        </div>

        {/* Text Callout */}
        <div className="flex flex-col pr-1">
          <div className="flex items-center gap-1">
            <span className="text-xs sm:text-sm font-display font-black text-[#0A3D91] tracking-wide leading-none uppercase">
              Master Bo
            </span>
            <Sparkles className="w-3 h-3 text-[#F5B400] fill-[#F5B400]" />
          </div>

          <span className="text-[10px] sm:text-[11px] font-bold text-[#1F2937] leading-tight mt-0.5">
            Talk on Telegram
          </span>

          <span className="inline-flex items-center gap-1 text-[9px] font-mono font-bold text-[#16A34A] leading-none mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] animate-pulse" />
            Online &bull; VIP Room
          </span>
        </div>
      </motion.a>
    </aside>
  );
}
