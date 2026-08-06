import { SignalItem } from '../types';
import { ArrowUp, ArrowDown, Shield, Percent, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface SignalsProps {
  signals: SignalItem[];
  activeSymbol: string;
  onSelectSymbol: (symbol: string) => void;
}

// 1. TopAssetsGrid - Used in the right column
export function TopAssetsGrid({ signals, activeSymbol, onSelectSymbol }: SignalsProps) {
  return (
    <div id="signals" className="p-4 rounded-xl border-2 border-[#0A3D91] bg-white shadow-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-24 h-24 bg-[#F5B400]/10 rounded-full blur-2xl pointer-events-none" />

      <div className="flex items-center justify-between pb-3 border-b border-gray-200 mb-3">
        <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-[#0A3D91] flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-[#F5B400]" />
          <span>Live Signals Feed</span>
        </h3>
        <span className="text-[10px] text-[#16A34A] font-mono font-bold animate-pulse">
          REAL-TIME
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2.5 max-h-[380px] overflow-y-auto pr-1">
        {signals.map((sig) => {
          const isActive = sig.symbol.toUpperCase() === activeSymbol.toUpperCase() ||
                           (activeSymbol.includes('F1') && sig.symbol.includes('F1')) ||
                           (activeSymbol.includes('AAPL') && sig.symbol.includes('AAPL')) ||
                           (activeSymbol.includes('XAU') && sig.symbol.includes('GOLD')) ||
                           (activeSymbol.includes('USOIL') && sig.symbol.includes('Crude'));

          const isPositive = sig.isCall;
          const numString = sig.price.toFixed(5).replace('.', '').slice(0, 5);

          return (
            <motion.div
              key={sig.id}
              whileHover={{ scale: 1.03 }}
              onClick={() => onSelectSymbol(sig.symbol)}
              className={`relative p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col items-center justify-center text-center overflow-hidden bg-gradient-to-b from-[#FFFBEB] via-white to-slate-50 shadow-md min-h-[145px] ${
                isActive
                  ? 'border-[#0A3D91] ring-2 ring-[#0A3D91]/30 shadow-lg'
                  : 'border-[#F5B400]/60 hover:border-[#0A3D91]'
              }`}
            >
              {/* Corner Rivets */}
              <div className="absolute top-1.5 left-1.5 w-1.5 h-1.5 rounded-full bg-[#0A3D91] pointer-events-none" />
              <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#0A3D91] pointer-events-none" />
              <div className="absolute bottom-1.5 left-1.5 w-1.5 h-1.5 rounded-full bg-[#0A3D91] pointer-events-none" />
              <div className="absolute bottom-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#0A3D91] pointer-events-none" />

              {/* Blue Badge with Chart Icon */}
              <div className="w-8 h-8 rounded-full bg-[#0A3D91] flex items-center justify-center text-[#F5B400] shadow-sm mb-1.5">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.281m5.94 2.28l-2.28 5.941" />
                </svg>
              </div>

              <span className="text-[10px] font-sans font-black text-[#0A3D91] uppercase tracking-wider block">
                {sig.symbol}
              </span>

              {/* Divider Line */}
              <div className="w-full border-t border-gray-200 my-1.5" />

              <span className={`text-2xl font-sans font-black leading-none tracking-tight ${isPositive ? 'text-[#16A34A]' : 'text-red-600'}`}>
                {numString}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// 2. ForexSignalsList - Used in the lower middle column
export function ForexSignalsList({ signals, activeSymbol, onSelectSymbol }: SignalsProps) {
  return (
    <div className="p-4 rounded-xl border-2 border-[#0A3D91] bg-white shadow-xl relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#F5B400]/10 rounded-full blur-2xl pointer-events-none" />

      <div className="flex items-center justify-between pb-3 border-b border-gray-200 mb-3">
        <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-[#0A3D91] flex items-center gap-1.5">
          <Shield className="w-4 h-4 text-[#F5B400]" />
          <span>Currency Option Alerts</span>
        </h3>
        <span className="text-[10px] text-[#16A34A] font-mono font-bold">
          STABILITY HASH ACTIVE
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 max-h-[320px] overflow-y-auto pr-1">
        {signals.map((sig) => {
          const isActive = sig.symbol.toUpperCase() === activeSymbol.toUpperCase() ||
                           (activeSymbol.includes('F1') && sig.symbol.includes('F1')) ||
                           (activeSymbol.includes('AAPL') && sig.symbol.includes('AAPL')) ||
                           (activeSymbol.includes('XAU') && sig.symbol.includes('GOLD')) ||
                           (activeSymbol.includes('USOIL') && sig.symbol.includes('Crude'));

          const isPositive = sig.isCall;
          const numString = sig.price.toFixed(5).replace('.', '').slice(0, 5);

          return (
            <motion.div
              key={sig.id}
              whileHover={{ scale: 1.02 }}
              onClick={() => onSelectSymbol(sig.symbol)}
              className={`relative p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between overflow-hidden bg-gradient-to-b from-[#FFFBEB] via-white to-slate-50 shadow-md text-center min-h-[145px] ${
                isActive
                  ? 'border-[#0A3D91] ring-2 ring-[#0A3D91]/30 shadow-lg'
                  : 'border-[#F5B400]/60 hover:border-[#0A3D91]'
              }`}
            >
              {/* Corner Rivets */}
              <div className="absolute top-1.5 left-1.5 w-1.5 h-1.5 rounded-full bg-[#0A3D91] pointer-events-none" />
              <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#0A3D91] pointer-events-none" />
              <div className="absolute bottom-1.5 left-1.5 w-1.5 h-1.5 rounded-full bg-[#0A3D91] pointer-events-none" />
              <div className="absolute bottom-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#0A3D91] pointer-events-none" />

              <div>
                <span className="text-[11px] font-sans font-black text-[#0A3D91] uppercase tracking-wider block">
                  {sig.symbol}
                </span>

                <div className={`text-2xl font-sans font-black mt-1 leading-none ${isPositive ? 'text-[#16A34A]' : 'text-red-600'}`}>
                  {numString}
                </div>

                {/* Divider */}
                <div className="w-full border-t border-gray-200 my-2" />

                <span className="text-[9px] font-sans font-bold text-gray-600 uppercase block mt-1 tracking-tight leading-relaxed max-w-[210px] mx-auto">
                  BOA International Academy<br />
                  <span className="font-semibold text-gray-500 text-[8px] lowercase block normal-case">High accuracy trading signals for Philippine traders.</span>
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
