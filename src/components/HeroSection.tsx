import { useEffect, useState } from 'react';
import { Asset } from '../types';
import { TrendingUp, TrendingDown, Bell, Globe } from 'lucide-react';
import { motion } from 'motion/react';
import { trackTelegramClick } from '../utils/pixel';

interface HeroSectionProps {
  assets: Asset[];
  activeAssetId: string;
  onSelectAsset: (id: string) => void;
  onOpenSignUp: () => void;
}

export default function HeroSection({
  assets,
  activeAssetId,
  onSelectAsset,
  onOpenSignUp,
}: HeroSectionProps) {
  return (
    <div className="flex flex-col gap-6">
      {/* Hero Header Text Card */}
      <div className="border-2 border-[#0A3D91] bg-white p-6 rounded-2xl relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#F5B400]/10 rounded-full blur-2xl pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0A3D91]/10 border border-[#0A3D91]/20 text-[#0A3D91] text-xs font-mono font-bold mb-4"
        >
          <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-ping" />
          <span>🟢 ACTIVE LIVE TRADING ROOM</span>
        </motion.div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight text-[#1F2937] leading-tight">
          Binary options signals, <br />
          <span className="text-[#0A3D91]">made simple for your success.</span>
        </h1>

        <div className="flex items-center gap-2 mt-3.5 pb-3 border-b border-gray-200">
          <h2 className="text-base font-display font-bold text-[#0A3D91]">
            BOA International Academy
          </h2>
          <span className="px-2 py-0.5 rounded bg-[#F5B400] text-[10px] font-mono text-[#1F2937] font-bold inline-flex items-center gap-1 shadow-sm">
            <span>GLOBAL</span>
            <Globe className="w-3 h-3 text-[#1F2937]" />
          </span>
        </div>

        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mt-4 max-w-xl">
          Join over 45,000 active traders across Manila, Cebu, Davao, and around the world. Get clear, reliable live signal checklists and direct premium alerts for major Forex pairs and OTC assets. Direct support for local payment channels including GCash, PayMaya, and online bank transfers.
        </p>

        <div className="mt-5 flex items-center gap-3">
          <a
            href="https://t.me/BOAInternational"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackTelegramClick('Hero Get Started Free')}
            className="px-6 py-3 rounded-full bg-[#F5B400] text-[#1F2937] font-display font-black text-xs uppercase tracking-wider hover:bg-[#e0a400] transition active:scale-95 shadow-md inline-flex items-center gap-2"
          >
            <span>Get Started For Free</span>
          </a>
          <a
            href="https://t.me/BOAInternational"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackTelegramClick('Hero Telegram Support')}
            className="px-5 py-3 rounded-full bg-[#0A3D91] text-white font-display font-bold text-xs uppercase tracking-wider hover:bg-[#062866] transition active:scale-95 shadow-md inline-flex items-center gap-2"
          >
            <span>Telegram Support</span>
          </a>
        </div>
      </div>

      {/* Grid of 4 Assets */}
      <div className="grid grid-cols-2 gap-4 mt-2">
        {assets.map((asset) => {
          const isSelected = asset.id === activeAssetId;
          const isPositive = asset.changePercent >= 0;

          const sparklinePoints = asset.priceHistory
            .slice(-15)
            .map((pt, i) => `${(i / 14) * 100},${40 - ((pt.close - pt.low) / (pt.high - pt.low || 1)) * 30}`)
            .join(' ');

          return (
            <motion.div
              key={asset.id}
              whileHover={{ scale: 1.02 }}
              onClick={() => onSelectAsset(asset.id)}
              className={`relative p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between overflow-hidden bg-white shadow-md ${
                isSelected
                  ? 'border-[#0A3D91] ring-2 ring-[#0A3D91]/20 shadow-lg'
                  : 'border-gray-200 hover:border-[#F5B400]'
              }`}
            >
              {isSelected && (
                <div className="absolute top-0 right-0 w-3 h-3 rounded-bl-lg bg-[#F5B400]" />
              )}

              <div>
                <span className="text-[10px] font-mono text-[#0A3D91] font-bold uppercase tracking-wider block">
                  {asset.symbol}
                </span>
                <h3 className="text-xs font-display font-bold text-[#1F2937] truncate mt-0.5">
                  {asset.name}
                </h3>
              </div>

              {/* Sparkline & Current Price */}
              <div className="my-3 flex items-center justify-between gap-2">
                <div>
                  <span className="text-lg font-mono font-bold text-[#0A3D91]">
                    ${asset.currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                  <div className="flex items-center gap-1 mt-0.5">
                    {isPositive ? (
                      <TrendingUp className="w-3.5 h-3.5 text-[#16A34A]" />
                    ) : (
                      <TrendingDown className="w-3.5 h-3.5 text-red-500" />
                    )}
                    <span className={`text-xs font-mono font-bold ${isPositive ? 'text-[#16A34A]' : 'text-red-500'}`}>
                      {isPositive ? '+' : ''}
                      {asset.changePercent.toFixed(2)}%
                    </span>
                  </div>
                </div>

                {/* SVG Sparkline */}
                <div className="w-16 h-8 flex-shrink-0">
                  <svg className="w-full h-full overflow-visible">
                    <polyline
                      fill="none"
                      stroke={isPositive ? '#16A34A' : '#ef4444'}
                      strokeWidth="2"
                      points={sparklinePoints}
                    />
                  </svg>
                </div>
              </div>

              {/* Action Button */}
              <a
                href="https://t.me/BOAInternational"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.stopPropagation();
                  trackTelegramClick(`Hero Asset Card Sign Up (${asset.symbol})`);
                }}
                className={`w-full py-1.5 rounded-lg text-xs font-bold font-display transition text-center block ${
                  isSelected
                    ? 'bg-[#F5B400] text-[#1F2937] hover:bg-[#e0a400]'
                    : 'bg-[#0A3D91] text-white hover:bg-[#062866]'
                }`}
              >
                Sign Up Now
              </a>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Alert Banner */}
      <div className="p-3 rounded-xl border border-[#F5B400] bg-[#FFFBEB] flex items-start gap-2.5 shadow-sm">
        <Bell className="w-5 h-5 text-[#0A3D91] flex-shrink-0 mt-0.5" />
        <div>
          <span className="text-[10px] font-mono text-[#0A3D91] uppercase tracking-widest block font-bold">
            LIVE SIGNAL BROADCAST
          </span>
          <p className="text-xs text-[#1F2937] mt-0.5">
            Tap on any asset to synchronize the real-time LiveChart, technical indicator feed, and trigger premium trade overlays.
          </p>
        </div>
      </div>
    </div>
  );
}
