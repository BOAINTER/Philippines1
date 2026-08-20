import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import LiveChartComponent, { GoldCornerOrnate } from './components/LiveChartComponent';
import { ForexSignalsList, TopAssetsGrid } from './components/SignalsSection';
import PricingSection from './components/PricingSection';
import CommunitySection from './components/CommunitySection';
import SimpleSteps from './components/SimpleSteps';
import FAQSection from './components/FAQSection';
import FeaturesGrid from './components/FeaturesGrid';
import ActionModal from './components/ActionModal';
import LiveWinnersTicker from './components/LiveWinnersTicker';
import MasterBoFloat from './components/MasterBoFloat';

import {
  initialAssets,
  forexSignals as initialForexSignals,
  topSignals as initialTopSignals,
  featuresList,
  pricingPlans,
  initialChatMessages,
  faqList,
} from './data';
import { Asset, SignalItem } from './types';

export default function App() {
  const [assets, setAssets] = useState<Asset[]>(initialAssets);
  const [activeAssetId, setActiveAssetId] = useState<string>('f1');
  const [forexSignals, setForexSignals] = useState<SignalItem[]>(initialForexSignals);
  const [topSignals, setTopSignals] = useState<SignalItem[]>(initialTopSignals);

  // Modal controls
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlanName, setSelectedPlanName] = useState<string>('');

  const activeAsset = assets.find((a) => a.id === activeAssetId) || assets[0];

  // Tick simulation to make charts and signals feel alive
  useEffect(() => {
    const interval = setInterval(() => {
      // 1. Update left assets
      setAssets((prevAssets) =>
        prevAssets.map((asset) => {
          const changePct = (Math.random() * 0.003 - 0.0015) * 100;
          const newPrice = asset.currentPrice * (1 + changePct / 100);

          // Update price history (update last candlestick or append new one)
          const history = [...asset.priceHistory];
          if (history.length > 0) {
            const lastCandle = { ...history[history.length - 1] };
            lastCandle.close = newPrice;
            lastCandle.high = Math.max(lastCandle.high, newPrice);
            lastCandle.low = Math.min(lastCandle.low, newPrice);
            history[history.length - 1] = lastCandle;
          }

          return {
            ...asset,
            currentPrice: parseFloat(newPrice.toFixed(2)),
            changePercent: asset.changePercent + changePct * 0.2,
            priceHistory: history,
          };
        })
      );

      // 2. Update forex signals
      setForexSignals((prevSignals) =>
        prevSignals.map((sig) => {
          const offset = (Math.random() * 0.00010 - 0.00005);
          const newPrice = sig.price + offset;
          const isCall = offset >= 0;
          return {
            ...sig,
            price: parseFloat(newPrice.toFixed(5)),
            isCall,
            strength: Math.min(Math.max(sig.strength + Math.floor(Math.random() * 3 - 1), 70), 98),
          };
        })
      );

      // 3. Update top signals
      setTopSignals((prevSignals) =>
        prevSignals.map((sig) => {
          const offset = sig.price * (Math.random() * 0.0004 - 0.0002);
          const newPrice = sig.price + offset;
          const isCall = offset >= 0;
          return {
            ...sig,
            price: parseFloat(newPrice.toFixed(sig.price > 10 ? 2 : 5)),
            isCall,
            strength: Math.min(Math.max(sig.strength + Math.floor(Math.random() * 3 - 1), 70), 98),
          };
        })
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Set selected asset based on top symbol clicked
  const handleSelectSymbol = (symbol: string) => {
    // Find matching asset
    let targetId = 'f1';
    if (symbol.toLowerCase().includes('eur') || symbol.toLowerCase().includes('usd')) {
      // Set to currency signal
    } else if (symbol.toLowerCase().includes('aapl') || symbol.toLowerCase().includes('apple')) {
      targetId = 'aapl';
    } else if (symbol.toLowerCase().includes('gold') || symbol.toLowerCase().includes('xau')) {
      targetId = 'gold';
    } else if (symbol.toLowerCase().includes('oil') || symbol.toLowerCase().includes('crude')) {
      targetId = 'oil';
    } else if (symbol.toLowerCase().includes('f1') || symbol.toLowerCase().includes('formula')) {
      targetId = 'f1';
    }
    setActiveAssetId(targetId);
  };

  const handleOpenSignUp = () => {
    setSelectedPlanName('');
    setIsModalOpen(true);
  };

  const handleSelectPlan = (planName: string) => {
    setSelectedPlanName(planName);
    setIsModalOpen(true);
  };

  // Simulated tick for user clicks
  const handleManualRefresh = () => {
    setAssets((prevAssets) =>
      prevAssets.map((asset) => {
        if (asset.id !== activeAssetId) return asset;
        const changePct = (Math.random() * 0.006 - 0.003) * 100;
        const newPrice = asset.currentPrice * (1 + changePct / 100);

        const history = [...asset.priceHistory];
        const now = new Date();
        const newCandle = {
          time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          open: asset.currentPrice,
          close: newPrice,
          high: Math.max(asset.currentPrice, newPrice) + Math.random() * (newPrice * 0.002),
          low: Math.min(asset.currentPrice, newPrice) - Math.random() * (newPrice * 0.002),
          volume: Math.floor(Math.random() * 4000) + 1000,
        };

        return {
          ...asset,
          currentPrice: parseFloat(newPrice.toFixed(2)),
          priceHistory: [...history.slice(-39), newCandle],
        };
      })
    );
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1F2937] flex flex-col justify-between selection:bg-[#F5B400] selection:text-[#1F2937] font-sans">
      {/* Navigation Bar */}
      <Navbar onOpenModal={handleOpenSignUp} />

      {/* Main Container */}
      <main className="max-w-7xl lg:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 w-full flex-1">
        {/* Outer Royal Blue Frame */}
        <div className="border-2 border-[#0A3D91]/20 rounded-3xl bg-white p-4 sm:p-6 lg:p-8 pt-14 sm:pt-16 lg:pt-16 shadow-xl relative overflow-hidden">
          {/* Subtle frame corner accents */}
          <GoldCornerOrnate className="top-1.5 left-1.5 !w-16 !h-16 opacity-30" />
          <GoldCornerOrnate className="top-1.5 right-1.5 !w-16 !h-16 rotate-90 opacity-30" />
          <GoldCornerOrnate className="bottom-1.5 left-1.5 !w-16 !h-16 -rotate-90 opacity-30" />
          <GoldCornerOrnate className="bottom-1.5 right-1.5 !w-16 !h-16 rotate-180 opacity-30" />

          {/* High Energy Live cashouts and leaderboard ticker */}
          <LiveWinnersTicker />

          {/* Bento Grid Desktop Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column (Span 4/12): Hero + Core Stocks Grid */}
            <section className="lg:col-span-4 flex flex-col gap-6">
              <HeroSection
                assets={assets}
                activeAssetId={activeAssetId}
                onSelectAsset={setActiveAssetId}
                onOpenSignUp={handleOpenSignUp}
              />
              <SimpleSteps />
            </section>

            {/* Middle Column (Span 5/12): LiveChart Terminal + Currency Alerts */}
            <section className="lg:col-span-5 flex flex-col gap-6">
              <LiveChartComponent asset={activeAsset} onRefresh={handleManualRefresh} />
              <ForexSignalsList
                signals={forexSignals}
                activeSymbol={activeAsset.symbol}
                onSelectSymbol={handleSelectSymbol}
              />
            </section>

            {/* Right Column (Span 3/12): Live Signals Grid + Chat + FAQ */}
            <section className="lg:col-span-3 flex flex-col gap-6 h-full">
              <TopAssetsGrid
                signals={topSignals}
                activeSymbol={activeAsset.symbol}
                onSelectSymbol={handleSelectSymbol}
              />
              <CommunitySection initialMessages={initialChatMessages} />
            </section>
          </div>

          {/* Full-width Pricing Section */}
          <section className="mt-8 pt-8 border-t border-gray-200">
            <PricingSection plans={pricingPlans} onSelectPlan={handleSelectPlan} />
          </section>

          {/* Full-width Features Grid */}
          <section className="mt-8 pt-8 border-t border-gray-200">
            <FeaturesGrid features={featuresList} />
          </section>

          {/* Full-width FAQ Section */}
          <section className="mt-8 pt-8 border-t border-gray-200">
            <FAQSection faqs={faqList} onOpenSignUp={handleOpenSignUp} />
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t-2 border-[#F5B400] bg-[#0A3D91] py-8 text-center text-xs text-blue-100 font-mono">
        <div className="max-w-7xl lg:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <span className="font-display font-black text-xs px-2 py-0.5 rounded border border-[#F5B400] text-[#1F2937] bg-[#F5B400]">BOA 🇵🇭</span>
              <span className="text-white font-semibold">&copy; 2026 BOA International Academy. All rights reserved.</span>
            </div>
            <div className="flex gap-4 text-blue-200 font-sans">
              <span className="hover:text-[#F5B400] cursor-pointer transition">Risk Disclaimer</span>
              <span>&bull;</span>
              <span className="hover:text-[#F5B400] cursor-pointer transition">Privacy Policy</span>
              <span>&bull;</span>
              <a
                href="https://t.me/+EQM592BjHx42MmM1"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#F5B400] text-[#F5B400] font-bold cursor-pointer transition"
              >
                Telegram Support
              </a>
            </div>
          </div>
          <p className="mt-4 text-[10px] text-blue-200/80 max-w-3xl mx-auto leading-relaxed">
            Trading binary options involves high risk and may not be suitable for all investors. The high degree of leverage can work against you as well as for you. Past performance of AI models or signal metrics is not indicative of future success.
          </p>
        </div>
      </footer>

      {/* Floating Master Bo Widget (Fixed Bottom-Right) */}
      <MasterBoFloat />

      {/* Signup & Registration Modal popup */}
      <ActionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedPlanName={selectedPlanName}
      />
    </div>
  );
}
