import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Trophy, TrendingUp } from 'lucide-react';

interface WinnerAlert {
  id: string;
  name: string;
  location: string;
  asset: string;
  amount: number;
  isCall: boolean;
  time: string;
}

const initialWinners: WinnerAlert[] = [
  { id: 'w1', name: 'MARCO M.', location: 'Manila, PH', asset: 'EUR/USD', amount: 270.00, isCall: true, time: 'Just now' },
  { id: 'w2', name: 'ANGELO R.', location: 'Cebu, PH', asset: 'AUD/JPY', amount: 45.00, isCall: true, time: 'Just now' },
  { id: 'w3', name: 'REYES A.', location: 'Davao, PH', asset: 'GBP/JPY', amount: 116.00, isCall: true, time: '1s ago' },
  { id: 'w4', name: 'MARICAR S.', location: 'Makati, PH', asset: 'NZD/USD', amount: 29.00, isCall: false, time: '3s ago' },
  { id: 'w5', name: 'JUN P.', location: 'Baguio, PH', asset: 'USD/JPY', amount: 580.00, isCall: true, time: '5s ago' },
  { id: 'w6', name: 'KRISTINE C.', location: 'Quezon City, PH', asset: 'EUR/CAD', amount: 15.00, isCall: false, time: '7s ago' },
  { id: 'w7', name: 'BENJAMIN L.', location: 'Cagayan de Oro, PH', asset: 'USD/CHF', amount: 195.00, isCall: true, time: '10s ago' },
  { id: 'w8', name: 'CHERRY V.', location: 'Iloilo, PH', asset: 'GBP/JPY', amount: 340.00, isCall: true, time: '12s ago' }
];

const phNames = ['MARCO M.', 'ANGELO R.', 'REYES A.', 'MARICAR S.', 'JUN P.', 'KRISTINE C.', 'BENJAMIN L.', 'PAOLO D.', 'CHERRY V.', 'DANIEL S.'];
const phCities = ['Manila, PH', 'Cebu, PH', 'Davao, PH', 'Makati, PH', 'Quezon City, PH', 'Baguio, PH', 'Cagayan de Oro, PH', 'Iloilo, PH', 'Pampanga, PH'];
const assetsList = ['EUR/USD', 'GBP/JPY', 'USD/JPY', 'AUD/USD', 'USD/CAD', 'NZD/USD', 'EUR/JPY'];

export default function LiveWinnersTicker() {
  const [payoutVolume, setPayoutVolume] = useState(1482930.50);
  const [alerts, setAlerts] = useState<WinnerAlert[]>(initialWinners);

  useEffect(() => {
    // Steadily increase the payout volume
    const volumeInterval = setInterval(() => {
      setPayoutVolume((prev) => prev + parseFloat((Math.random() * 45 + 5).toFixed(2)));
    }, 1500);

    // Periodically insert new payout alert at the start
    const alertInterval = setInterval(() => {
      const name = phNames[Math.floor(Math.random() * phNames.length)];
      const location = phCities[Math.floor(Math.random() * phCities.length)];
      const asset = assetsList[Math.floor(Math.random() * assetsList.length)];
      const amount = Math.random() > 0.8 
        ? Math.floor(Math.random() * 800 + 200) 
        : Math.floor(Math.random() * 180 + 20);
      const isCall = Math.random() > 0.3;

      const newAlert: WinnerAlert = {
        id: `alert_${Date.now()}`,
        name,
        location,
        asset,
        amount,
        isCall,
        time: 'Just now'
      };

      setAlerts((prev) => {
        const updated = [newAlert, ...prev.map(a => ({ ...a, time: parseInt(a.time) ? `${parseInt(a.time) + 2}s ago` : '2s ago' }))];
        return updated.slice(0, 12);
      });
    }, 3500);

    return () => {
      clearInterval(volumeInterval);
      clearInterval(alertInterval);
    };
  }, []);

  return (
    <div className="w-full bg-[#0A3D91] border-2 border-[#F5B400] rounded-2xl p-3 sm:p-4 shadow-lg shadow-[#0A3D91]/20 relative overflow-hidden mb-6 text-white">
      {/* Golden spotlight radial background */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-64 h-24 bg-[#F5B400]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Dynamic Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2.5 border-b border-white/15 mb-3">
        <div className="flex items-center gap-2">
          <div className="relative flex items-center justify-center">
            <span className="absolute inline-flex h-2.5 w-2.5 rounded-full bg-[#16A34A] opacity-75 animate-ping" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#16A34A]" />
          </div>
          <div>
            <h4 className="text-xs font-display font-extrabold text-[#F5B400] tracking-wider uppercase flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5 text-[#F5B400] animate-bounce" />
              <span>BOA Live Cashouts & Wins</span>
            </h4>
            <p className="text-[9px] text-blue-100 font-mono uppercase tracking-widest">Real-time withdrawal updates & trading achievements in PH</p>
          </div>
        </div>

        {/* Live payout volume ticker */}
        <div className="flex items-center gap-2 bg-[#062866] border border-[#F5B400]/40 px-3 py-1 rounded-full shadow-inner">
          <TrendingUp className="w-3.5 h-3.5 text-[#F5B400]" />
          <span className="text-[10px] text-blue-200 font-mono font-bold">TOTAL WITHDRAWALS TODAY:</span>
          <motion.span 
            key={Math.floor(payoutVolume / 100)}
            className="text-xs text-[#F5B400] font-mono font-black tracking-wider"
          >
            ${payoutVolume.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} (₱{(payoutVolume * 56).toLocaleString(undefined, { maximumFractionDigits: 0 })})
          </motion.span>
        </div>
      </div>

      {/* Infinite Horizontal Marquee Track */}
      <div className="relative w-full overflow-hidden py-1">
        {/* Left & Right gradient masks for smooth fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#0A3D91] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#0A3D91] to-transparent z-10 pointer-events-none" />

        <div className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth py-1 px-2">
          {alerts.map((alert) => (
            <motion.div
              layout
              key={alert.id}
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="flex-shrink-0 flex items-center gap-3 bg-[#062866] border border-white/20 rounded-xl p-2.5 shadow-md relative overflow-hidden group hover:border-[#F5B400] transition-all duration-300 min-w-[240px]"
            >
              {/* Highlight background glowing lines */}
              <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-[#F5B400] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              {/* Action type visual ribbon */}
              <div className={`w-1.5 h-10 rounded-full ${alert.isCall ? 'bg-[#16A34A]' : 'bg-red-500'} flex-shrink-0`} />

              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-display font-black text-white tracking-wide">{alert.name}</span>
                  <span className="text-[8px] bg-[#0A3D91] text-[#F5B400] px-1 py-0.2 rounded border border-[#F5B400]/30 text-[7px] font-mono font-bold">{alert.location}</span>
                </div>
                <div className="text-[9px] text-blue-200 mt-0.5 font-mono flex items-center gap-1">
                  <span>{alert.asset}</span>
                  <span className={`px-1 py-0.1 text-[7px] font-bold rounded ${alert.isCall ? 'bg-[#16A34A]/20 text-[#22c55e]' : 'bg-red-500/20 text-red-300'}`}>
                    {alert.isCall ? 'CALL' : 'PUT'}
                  </span>
                  <span className="text-blue-300/80">&bull; {alert.time}</span>
                </div>
              </div>

              {/* Profit payout badge */}
              <div className="ml-auto flex flex-col items-end pl-2">
                <span className="text-[11px] font-mono font-black text-[#16A34A] bg-[#16A34A]/20 px-1.5 py-0.5 rounded border border-[#16A34A]/40">
                  +${alert.amount.toFixed(2)}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
